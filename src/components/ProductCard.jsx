import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const SIZE_CHART = [
  { size: 'S',   bust: 38, waist: 35, shoulder: 14.4, sleeve: 17, hip: 42 },
  { size: 'M',   bust: 40, waist: 37, shoulder: 14.8, sleeve: 17, hip: 44 },
  { size: 'L',   bust: 42, waist: 39, shoulder: 15.2, sleeve: 17, hip: 46 },
  { size: 'XL',  bust: 44, waist: 41, shoulder: 15.6, sleeve: 17, hip: 48 },
  { size: 'XXL', bust: 46, waist: 43, shoulder: 16.0, sleeve: 17, hip: 50 },
];

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(star => {
        const filled = rating >= star;
        const half   = !filled && rating >= star - 0.5;
        return (
          <span key={star} className={`star ${filled ? 'filled' : half ? 'half' : 'empty'}`}>★</span>
        );
      })}
    </div>
  );
}

// ─── Normalise a product from MongoDB into the shape the UI expects ───────────
function normalise(p) {
  // Images: MongoDB stores [{ url, publicId }], old data had a plain string
  const imageUrls =
    p.images && p.images.length > 0
      ? p.images.map(img => (typeof img === 'string' ? img : img.url))
      : p.image
      ? [p.image]
      : [];

  return {
    ...p,
    // Stable id regardless of source
    id:           p._id  || p.id,
    // Always a plain-string URL for the primary image
    image:        imageUrls[0] || '',
    // Always an array of plain-string URLs
    images:       imageUrls,
    // Booleans from tags (MongoDB) or legacy booleans (local data)
    isNew:        p.tags?.includes('new-arrival') ?? p.isNew        ?? false,
    isBestseller: p.tags?.includes('bestseller')  ?? p.isBestseller ?? false,
    // Fabric field maps to material display
    material:     p.fabric || p.material || '',
    // MongoDB stores colors as array; old data had a single 'colour' string
    colour:       p.colors?.[0] || p.colour || '',
    // Reviews count
    reviews:      p.reviewCount ?? p.reviews ?? 0,
  };
}

function ProductCard({ product: rawProduct }) {
  const product = normalise(rawProduct);

  const [hovered,       setHovered]       = useState(false);
  const [modalOpen,     setModalOpen]     = useState(false);
  const [activeImg,     setActiveImg]     = useState(0);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart }                    = useCart();
  const wishlisted = isWishlisted(product.id);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const openModal = () => { setActiveImg(0); setModalOpen(true); };

  return (
    <>
      <div
        className="product-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="product-img-wrap">
          {product.image
            ? <img src={product.image} alt={product.name} />
            : <div className="product-img-placeholder" />}

          {product.isNew        && <span className="product-badge badge-new">New</span>}
          {product.isBestseller && <span className="product-badge badge-best">Bestseller</span>}

          <button
            className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
            aria-label="Add to wishlist"
            onClick={() => toggleWishlist(product)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {hovered && (
            <div className="view-details-overlay" onClick={openModal}>
              <span>View Details</span>
            </div>
          )}
        </div>

        <div className="product-info">
          <p className="brand-tag">{product.material || 'Dezire More'}</p>
          <p className="product-name">{product.name}</p>
          <div className="price-row">
            <span className="price-now">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice > 0 && (
              <span className="price-was">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
            {discount > 0 && <span className="price-discount">{discount}% off</span>}
          </div>
          <button className="add-to-bag" onClick={() => addToCart(product)}>Add to Bag</button>
        </div>
      </div>

      {/* ── Product Detail Modal ── */}
      {modalOpen && (
        <div className="pd-overlay" onClick={() => setModalOpen(false)}>
          <div className="pd-modal" onClick={e => e.stopPropagation()}>
            <button className="pd-close" onClick={() => setModalOpen(false)}>✕</button>

            {/* Left — Images */}
            <div className="pd-left">
              <div className="pd-main-img-wrap">
                <img
                  src={product.images[activeImg] || product.image}
                  alt={product.name}
                  className="pd-main-img"
                />
              </div>
              {product.images.length > 1 && (
                <div className="pd-thumbs">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      className={`pd-thumb ${i === activeImg ? 'active' : ''}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={img} alt={`${product.name} view ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right — Info */}
            <div className="pd-right">
              {product.isNew        && <div className="pd-badge">New Arrival</div>}
              {product.isBestseller && <div className="pd-badge pd-badge-gold">Bestseller</div>}

              <h2 className="pd-title">{product.name}</h2>
              <p className="pd-material">{product.material || 'Dezire More'}</p>

              {product.rating > 0 && (
                <div className="pd-rating-row">
                  <StarRating rating={product.rating} />
                  <span className="pd-rating-num">{product.rating}</span>
                  <span className="pd-reviews">({product.reviews} reviews)</span>
                </div>
              )}

              <div className="pd-price-row">
                <span className="pd-price-now">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice > 0 && (
                  <span className="pd-price-was">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
                {discount > 0 && <span className="pd-discount">{discount}% off</span>}
              </div>

              <button className="size-chart-link" onClick={() => setSizeChartOpen(true)}>
                📏 Size Chart
              </button>

              <hr className="pd-divider" />

              {product.description && (
                <p className="pd-description">{product.description}</p>
              )}

              <div className="pd-details">
                {product.colour && (
                  <div className="pd-detail-row">
                    <span className="pd-detail-label">Colour</span>
                    <span className="pd-detail-value">{product.colour}</span>
                  </div>
                )}
                {/* MongoDB: colors array — show all */}
                {!product.colour && product.colors?.length > 0 && (
                  <div className="pd-detail-row">
                    <span className="pd-detail-label">Colours</span>
                    <span className="pd-detail-value">{product.colors.join(', ')}</span>
                  </div>
                )}
                {product.sizes?.length > 0 && (
                  <div className="pd-detail-row">
                    <span className="pd-detail-label">Sizes</span>
                    <span className="pd-detail-value">{product.sizes.join(', ')}</span>
                  </div>
                )}
                {product.length && (
                  <div className="pd-detail-row">
                    <span className="pd-detail-label">Length</span>
                    <span className="pd-detail-value">{product.length}</span>
                  </div>
                )}
                {product.occasion?.length > 0 && (
                  <div className="pd-detail-row">
                    <span className="pd-detail-label">Occasion</span>
                    <span className="pd-detail-value">
                      {Array.isArray(product.occasion)
                        ? product.occasion.join(', ')
                        : product.occasion}
                    </span>
                  </div>
                )}
                {product.care && (
                  <div className="pd-detail-row">
                    <span className="pd-detail-label">Care</span>
                    <span className="pd-detail-value">{product.care}</span>
                  </div>
                )}
                {product.sku && (
                  <div className="pd-detail-row">
                    <span className="pd-detail-label">SKU</span>
                    <span className="pd-detail-value">{product.sku}</span>
                  </div>
                )}
              </div>

              <button className="pd-add-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
              <button className="pd-add-wishlist" onClick={() => toggleWishlist(product)}>
                {wishlisted ? '♥ Added to Wishlist' : '♡ Add to Wishlist'}
              </button>

              <p className="pd-footer-note">
                ✦ Free shipping above ₹1699 &nbsp;|&nbsp; Easy 7-day returns
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Size Chart Modal ── */}
      {sizeChartOpen && (
        <div className="size-chart-overlay" onClick={() => setSizeChartOpen(false)}>
          <div className="size-chart-modal" onClick={e => e.stopPropagation()}>
            <div className="size-chart-header">
              <h3>Size Chart</h3>
              <button className="size-chart-close" onClick={() => setSizeChartOpen(false)}>✕</button>
            </div>
            <p className="size-chart-note">All measurements are in inches</p>
            <div className="size-chart-table-wrap">
              <table className="size-chart-table">
                <thead>
                  <tr>
                    <th>Size</th><th>Bust</th><th>Waist</th>
                    <th>Shoulder</th><th>Sleeve Length</th><th>Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map(row => (
                    <tr key={row.size}>
                      <td>{row.size}</td><td>{row.bust}</td><td>{row.waist}</td>
                      <td>{row.shoulder}</td><td>{row.sleeve}</td><td>{row.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;