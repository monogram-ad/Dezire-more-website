// ─────────────────────────────────────────────────────────────────
// NewArrivals.jsx  — fetches products tagged 'new-arrival'
// ─────────────────────────────────────────────────────────────────
import { useState } from 'react';
import ProductCard from './ProductCard';
import { useTag } from '../hooks/useProducts';

const SORT_OPTIONS = [
  { label: 'Newest First',       value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Top Rated',          value: 'rating' },
];

export function NewArrivals() {
  const [sort, setSort] = useState('newest');
  const { products, total, loading, error } = useTag('new-arrival', { sort });

  return (
    <section className="sarees-page">
      <div className="sarees-page-header">
        <h1>New Arrivals</h1>
        <div className="divider"><span className="diamond"></span></div>
        <p>Showing {loading ? '…' : total} styles</p>
      </div>

      <div className="sarees-filter-bar">
        <div className="sarees-sort" style={{ marginLeft: 'auto' }}>
          <span className="filter-label">Sort By</span>
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="page-loading">Loading new arrivals…</p>}
      {error   && <p className="page-error">Could not load products. Is the backend running?</p>}

      {!loading && !error && (
        products.length === 0
          ? <p className="page-empty">No new arrivals yet. Add some from the admin panel!</p>
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

// ─────────────────────────────────────────────────────────────────
// Bestsellers.jsx — fetches products tagged 'bestseller'
// ─────────────────────────────────────────────────────────────────
export function Bestsellers() {
  const [sort, setSort] = useState('rating');
  const { products, total, loading, error } = useTag('bestseller', { sort });

  return (
    <section className="sarees-page">
      <div className="sarees-page-header">
        <h1>Bestsellers</h1>
        <div className="divider"><span className="diamond"></span></div>
        <p>Showing {loading ? '…' : total} styles</p>
      </div>

      <div className="sarees-filter-bar">
        <div className="sarees-sort" style={{ marginLeft: 'auto' }}>
          <span className="filter-label">Sort By</span>
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="page-loading">Loading bestsellers…</p>}
      {error   && <p className="page-error">Could not load products. Is the backend running?</p>}

      {!loading && !error && (
        products.length === 0
          ? <p className="page-empty">No bestsellers yet. Add some from the admin panel!</p>
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

// ─────────────────────────────────────────────────────────────────
// Sale.jsx — fetches products tagged 'sale'
// ─────────────────────────────────────────────────────────────────
export function Sale() {
  const [sort, setSort] = useState('discount');
  const { products, total, loading, error } = useTag('sale', { sort });

  return (
    <section className="sarees-page">
      <div className="sarees-page-header">
        <h1>Sale</h1>
        <div className="divider"><span className="diamond"></span></div>
        <p>Showing {loading ? '…' : total} styles</p>
      </div>

      <div className="sarees-filter-bar">
        <div className="sarees-sort" style={{ marginLeft: 'auto' }}>
          <span className="filter-label">Sort By</span>
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            {[...SORT_OPTIONS, { label: 'Biggest Discount', value: 'discount' }].map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="page-loading">Loading sale items…</p>}
      {error   && <p className="page-error">Could not load products. Is the backend running?</p>}

      {!loading && !error && (
        products.length === 0
          ? <p className="page-empty">No sale items yet. Add some from the admin panel!</p>
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