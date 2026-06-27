import { useState } from 'react';
import ProductCard from './ProductCard';
import { useCategory } from '../hooks/useProducts';

const FILTERS = [
  { label: 'All',          value: '' },
  { label: 'New Arrivals', value: 'new-arrival' },
  { label: 'Bestsellers',  value: 'bestseller' },
  { label: 'On Sale',      value: 'sale' },
];

const SORT_OPTIONS = [
  { label: 'Featured',           value: '' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest First',       value: 'newest' },
  { label: 'Top Rated',          value: 'rating' },
];

function Kurtas() {
  const [activeFilter, setActiveFilter] = useState('');
  const [sort,         setSort]         = useState('');

  const filters = {};
  if (sort)         filters.sort = sort;
  if (activeFilter) filters.tag  = activeFilter;

  const { products, total, loading, error } = useCategory('kurtas', filters);

  return (
    <section className="sarees-page">

      <div className="sarees-page-header">
        <h1>Kurtas</h1>
        <div className="divider"><span className="diamond"></span></div>
        <p>Showing {loading ? '…' : total} styles</p>
      </div>

      <div className="sarees-filter-bar">
        <div className="sarees-filters">
          <span className="filter-label">Filter:</span>
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="sarees-sort">
          <span className="filter-label">Sort By</span>
          <select
            className="sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="page-loading">Loading kurtas…</p>}
      {error   && <p className="page-error">Could not load products. Is the backend running?</p>}

      {!loading && !error && (
        products.length === 0
          ? <p className="page-empty">No kurtas found. Add some from the admin panel!</p>
          : (
            <div className="products-grid products-grid-3col">
              {products.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )
      )}

    </section>
  );
}

export default Kurtas;