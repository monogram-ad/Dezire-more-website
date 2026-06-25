import { useEffect, useRef } from 'react';

function WeddingBanner() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 300,
      size: 0.8 + Math.random() * 2,
      speed: 0.1 + Math.random() * 0.2,
      opacity: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    function frame() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      particles.forEach((p, i) => {
        p.y -= p.speed;
        p.x += Math.sin(t + p.phase) * 0.3;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,144,45,${p.opacity * (0.6 + Math.sin(t * 2 + i) * 0.4)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="wedding-banner">
      <canvas ref={canvasRef} className="wedding-canvas" />

      <div className="wedding-img-wrap">
        <img
          src="/assets/wedding/wedding1.jpeg"
          alt="Wedding Collection 2026"
          className="wedding-banner-img"
        />
        <div className="wedding-img-overlay" />
      </div>

      <div className="wedding-content">
        <div className="wedding-top-ornament">
          <span className="orn-line" />
          <span className="orn-diamond">◆</span>
          <span className="orn-line" />
        </div>

        <p className="wedding-eyebrow">❖ Bridal &amp; Festive</p>

        <h2 className="wedding-title">
          Wedding Collection
          <span className="wedding-year"> 2026</span>
        </h2>

        <div className="wedding-divider">
          <span className="div-line" />
          <span className="div-icon">✦</span>
          <span className="div-line" />
        </div>

        <p className="wedding-subtitle">
          Timeless outfits crafted for your most precious moments.<br />
          Where every thread tells a story of love.
        </p>

        <div className="wedding-features">
          <div className="wedding-feat">
            <svg className="feat-svg" viewBox="0 0 24 24">
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
            </svg>
            <span>Bridal Lehengas</span>
          </div>
          <div className="wedding-feat-divider">|</div>
          <div className="wedding-feat">
            <svg className="feat-svg" viewBox="0 0 24 24">
              <path d="M12 2L9.5 8.5H3l5.5 4-2 6.5L12 15l5.5 3.5-2-6.5L21 8.5h-6.5L12 2z"/>
            </svg>
            <span>Designer Sarees</span>
          </div>
          <div className="wedding-feat-divider">|</div>
          <div className="wedding-feat">
            <svg className="feat-svg" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Festive Kurtas</span>
          </div>
        </div>

        <div className="wedding-btns">
          <a href="/wedding-collection" className="wedding-btn-primary">
            Explore Collection →
          </a>
          <a href="/lehengas" className="wedding-btn-outline">
            View Lehengas
          </a>
        </div>

        <div className="wedding-bottom-ornament">
          <span className="orn-line" />
          <span className="orn-diamond">◆</span>
          <span className="orn-line" />
        </div>
      </div>
    </section>
  );
}

export default WeddingBanner;