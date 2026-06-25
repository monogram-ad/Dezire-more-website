import ProductCard from './ProductCard';
import { useCategory } from '../hooks/useProducts';

function DressMaterials() {
  const { products: dressMaterials, loading } = useCategory('dress-materials');

  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2>Dress Materials</h2>
        <div className="divider"><span className="diamond"></span></div>
        <p>Unstitched elegance, ready for your tailor</p>
      </div>
      <div className="products-grid products-grid-3col">
        {loading
          ? <p>Loading...</p>
          : dressMaterials.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
}

export default DressMaterials;