function SizeGuide() {
  const sizes = [
    { label: 'Brand Size', xs: 'XS', s: 'S', m: 'M', l: 'L', xl: 'XL', xxl: 'XXL' },
    { label: 'IN Size',    xs: 'XS', s: 'S', m: 'M', l: 'L', xl: 'XL', xxl: 'XXL' },
    { label: 'Bust',       xs: '34', s: '36', m: '40', l: '42', xl: '44', xxl: '46' },
    { label: 'Top Waist',  xs: '28', s: '30', m: '37', l: '39', xl: '41', xxl: '43' },
    { label: 'Shoulder',   xs: '13.5', s: '14', m: '14.8', l: '15.2', xl: '15.6', xxl: '16' },
    { label: 'Sleeve Length', xs: '16', s: '16.5', m: '17', l: '17', xl: '17.5', xxl: '17.5' },
    { label: 'Hip',        xs: '38', s: '40', m: '44', l: '46', xl: '48', xxl: '50' },
  ];

  return (
    <div className="policy-page">
      <div className="policy-hero">
        <span className="policy-eyebrow">Fit Perfectly</span>
        <h1>Size Guide</h1>
        <p>All measurements are in inches. When between sizes, we recommend sizing up for a comfortable fit.</p>
      </div>

      <div className="policy-content">
        <div className="size-guide-section">
          <h2>How to Measure</h2>
          <div className="measure-grid">
            <div className="measure-item">
              <div className="measure-icon">◉</div>
              <h3>Bust</h3>
              <p>Measure around the fullest part of your chest, keeping the tape parallel to the floor.</p>
            </div>
            <div className="measure-item">
              <div className="measure-icon">◉</div>
              <h3>Waist</h3>
              <p>Measure around your natural waistline, the narrowest part of your torso.</p>
            </div>
            <div className="measure-item">
              <div className="measure-icon">◉</div>
              <h3>Hip</h3>
              <p>Measure around the fullest part of your hips, about 8 inches below your waist.</p>
            </div>
            <div className="measure-item">
              <div className="measure-icon">◉</div>
              <h3>Shoulder</h3>
              <p>Measure from the edge of one shoulder to the edge of the other across your back.</p>
            </div>
          </div>
        </div>

        <div className="size-table-section">
          <h2>Size Chart</h2>
          <div className="size-table-wrapper">
            <table className="size-table">
              <thead>
                <tr>
                  <th>Measurement</th>
                  <th>XS</th>
                  <th>S</th>
                  <th>M</th>
                  <th>L</th>
                  <th>XL</th>
                  <th>XXL</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((row) => (
                  <tr key={row.label}>
                    <td className="measure-label">{row.label}</td>
                    <td>{row.xs}</td>
                    <td>{row.s}</td>
                    <td>{row.m}</td>
                    <td>{row.l}</td>
                    <td>{row.xl}</td>
                    <td>{row.xxl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="size-note">
          <div className="note-icon">✦</div>
          <p>
            For sarees, lehengas, and dress materials, size does not typically apply as they are
            unstitched or come with a standard blouse piece. For stitched items (kurtas, co-ords,
            ready-to-wear), please refer to the chart above.
          </p>
        </div>

        <div className="size-cta">
          <p>Still unsure about your size?</p>
          <a
            href="https://wa.me/918171761948"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default SizeGuide;