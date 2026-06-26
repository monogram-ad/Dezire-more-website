import ProductCard from './ProductCard';
import { useTag } from '../hooks/useProducts';

function Sale() {
  const { products: sale, loading } = useTag('sale');

  return (
    <>
      <section className="sale-banner">
        <div className="sale-content">
          <p className="eyebrow">❖ Limited Time</p>
          <h2>The Sale</h2>
          <div className="sale-percent-frame">
            <span className="sale-percent">Up to 50% Off</span>
          </div>
          <p>On select sarees, lehengas &amp; festive sets — while stocks last.</p>
          <a href="#sale-products" className="btn-gold">Shop the Sale</a>
        </div>
        <div className="sale-photo-stack">
          <div className="sale-photo-card sale-photo-card-back" />
          <img
            src="/assets/sarees/sale-banner.jpg"
            alt="Festive Sale"
            className="sale-photo-card sale-photo-card-front"
          />
        </div>
      </section>

      <section className="new-arrivals" id="sale-products">
        <div className="section-header">
          <p className="eyebrow">❖ Premium Styles, Special Prices</p>
          <h2> Sale </h2>
          <div className="divider"><span className="diamond"></span></div>
        </div>
        <div className="products-grid products-grid-3col">
          {loading
            ? <p>Loading...</p>
            : sale.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      </section>
    </>
  );
}

export default Sale;