import ProductCard from './ProductCard';
import { useCategory } from '../hooks/useProducts';

function Kurtas() {
  const { products: kurtas, loading } = useCategory('kurtas');

  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2>Kurtas</h2>
        <div className="divider"><span className="diamond"></span></div>
        <p>Everyday elegance, effortlessly styled</p>
      </div>
      <div className="products-grid products-grid-3col">
        {loading
          ? <p>Loading...</p>
          : kurtas.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
}

export default Kurtas;