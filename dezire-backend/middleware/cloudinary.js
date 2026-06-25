const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary with your credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage: images go directly to Cloudinary (not your server disk)
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const category = req.body.category || 'general';
    return {
      folder: `dezire-more/${category}`,      // organised by category in Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [
        { width: 800, height: 1000, crop: 'limit', quality: 'auto:good' }, // resize + optimise
      ],
    };
  },
});

// Only allow image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed'), false);
  }
};

// Max 5 images per product, 5MB each
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { upload, cloudinary };
