function WeddingBanner() {
  return (
    <section className="wedding-banner">
      <div className="wedding-img-wrap">
        <img
          src="/assets/wedding/wedding1.jpeg"
          alt="Wedding Collection 2026"
          className="wedding-banner-img"
        />
        <div className="wedding-img-overlay" />
      </div>

      <div className="wedding-content">
        <p className="eyebrow">❖ Bridal &amp; Festive</p>
        <h2>Wedding Collection 2026</h2>
        <p>Timeless outfits for your most precious moments.</p>
        <a href="/wedding-collection" className="btn-primary">Explore Now</a>
      </div>
    </section>
  );
}

export default WeddingBanner;