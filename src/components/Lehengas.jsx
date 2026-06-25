import ProductCard from './ProductCard';
import { useCategory } from '../hooks/useProducts';

function Lehengas() {
  const { products: lehengas, loading } = useCategory('lehengas');

  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2>Lehengas</h2>
        <div className="divider"><span className="diamond"></span></div>
        <p>Bridal &amp; festive grandeur</p>
      </div>
      <div className="products-grid products-grid-3col">
        {loading
          ? <p>Loading...</p>
          : lehengas.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
}

export default Lehengas;