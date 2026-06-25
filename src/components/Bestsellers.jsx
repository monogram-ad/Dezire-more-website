import ProductCard from './ProductCard';
import { useTag } from '../hooks/useProducts';

function Bestsellers() {
  const { products: bestsellers, loading } = useTag('bestseller');

  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2>Bestsellers</h2>
        <div className="divider"><span className="diamond"></span></div>
        <p>Loved by our customers</p>
      </div>
      <div className="products-grid products-grid-3col">
        {loading
          ? <p>Loading...</p>
          : bestsellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
}

export default Bestsellers;