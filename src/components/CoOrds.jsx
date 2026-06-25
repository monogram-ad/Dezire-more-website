import ProductCard from './ProductCard';
import { useCategory } from '../hooks/useProducts';

function CoOrds() {
  const { products: coords, loading } = useCategory('coords');

  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2>Co-ords</h2>
        <div className="divider"><span className="diamond"></span></div>
        <p>Modern sets for effortless style</p>
      </div>
      <div className="products-grid products-grid-3col">
        {loading
          ? <p>Loading...</p>
          : coords.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
}

export default CoOrds;