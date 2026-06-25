import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Dezire More</h3>
          <p className="tagline">Ethnic Elegance. Modern You.</p>
          <p>
            Curated ethnic fashion for the modern Indian woman. Timeless
            silhouettes, contemporary spirit.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/sarees">Sarees</Link></li>
            <li><Link to="/dress-materials">Dress Materials</Link></li>
            <li><Link to="/ready-to-wear">Ready to Wear</Link></li>
            <li><Link to="/western-apparels">Western Apparels</Link></li>
            <li><Link to="/bestsellers">Bestsellers</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
            <li><Link to="/sale">Sale</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li><Link to="/size-guide">Size Guide</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
            <li><Link to="/exchange-policy">Exchange Policy</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li>
              <a href="https://wa.me/918171761948" target="_blank" rel="noreferrer">
                Track order on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@deziremore.in">hello@deziremore.in</a></li>
            <li><a href="tel:+918171761948">+91 81717 61948</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a></li>
            <li><a href="https://wa.me/918171761948" target="_blank" rel="noreferrer">WhatsApp</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Dezire More. All rights reserved.</p>
        <p>Ethnic Elegance. Modern You. ◆</p>
      </div>
    </footer>
  );
}

export default Footer;