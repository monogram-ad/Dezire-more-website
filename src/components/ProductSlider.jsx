import { useRef, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductSlider({ products }) {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  // Render the product list TWICE back-to-back.
  // This is what makes the loop possible — once we scroll past
  // the first full set, the second set looks identical, so we
  // can snap back invisibly.
  const loopProducts = [...products, ...products];

  const getSetWidth = () => {
    const slider = sliderRef.current;
    return slider ? slider.scrollWidth / 2 : 0;
  };

  const startAutoScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      const setWidth = getSetWidth();
      if (!setWidth) return;

      slider.scrollLeft += 1;

      // Once we've scrolled past one full set, snap back by exactly
      // one set-width. No animation here on purpose — this is the
      // "invisible" jump that makes it feel like a continuous cycle.
      if (slider.scrollLeft >= setWidth) {
        slider.scrollLeft -= setWidth;
      }
    }, 20);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    stopAutoScroll();

    const card = slider.querySelector('.product-card');
    const cardWidth = card ? card.getBoundingClientRect().width + 16 : 296;
    slider.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 3000);
  };

  return (
    <div className="products-slider-wrapper">
      <button className="slider-btn" onClick={() => scroll(-1)} aria-label="Previous">‹</button>
      <div className="products-slider" ref={sliderRef}>
        {loopProducts.map((product, i) => (
          <ProductCard key={`${product.id}-${i}`} product={product} />
        ))}
      </div>
      <button className="slider-btn" onClick={() => scroll(1)} aria-label="Next">›</button>
    </div>
  );
}

export default ProductSlider;