import ProductCard from './ProductCard';
import { useCategory } from '../hooks/useProducts';

function WesternApparels() {
  const { products: westernApparels, loading } = useCategory('western');

  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2>Western Apparels</h2>
        <div className="divider"><span className="diamond"></span></div>
        <p>Modern silhouettes, effortless style</p>
      </div>
      <div className="products-grid products-grid-3col">
        {loading
          ? <p>Loading...</p>
          : westernApparels.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
}

export default WesternApparels;