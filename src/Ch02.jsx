import React from 'react'

/* ============================================================
   CH 02 — Matrices as System Operators
   Content will be added by the user.
   ============================================================ */

const MATRIX_KEY_CONCEPTS = [
  {
    icon: 'fa-solid fa-arrows-left-right',
    title: 'Linear Transformations',
    desc: 'Matrices represent functions that map vectors to vectors while preserving addition and scaling. Every linear map T: Rⁿ → Rᵐ has a matrix representation.',
  },
  {
    icon: 'fa-solid fa-rotate',
    title: 'Rotation & Scaling',
    desc: 'Rotation matrices spin vectors around the origin. Scaling matrices stretch or compress. Together they form the language of 2D/3D graphics transformations.',
  },
  {
    icon: 'fa-solid fa-sitemap',
    title: 'Composition Pipeline',
    desc: 'Multiplying matrices chains transformations. If A applies shear and B applies rotation, BA applies shear-then-rotation in a single computation.',
  },
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Matrix Multiplication',
    desc: 'The (i, j) entry of AB is the dot product of row i of A and column j of B. This structure enables massively parallel computation in GPUs.',
  },
  {
    icon: 'fa-solid fa-arrow-rotate-left',
    title: 'Inverse Matrices',
    desc: 'A⁻¹ undoes the transformation A applies. If A⁻¹ exists, the transformation is bijective — every output maps back to a unique input.',
  },
  {
    icon: 'fa-solid fa-calculator',
    title: 'Determinant',
    desc: 'The determinant measures how much a matrix scales area (2D) or volume (3D). det = 0 means the transformation collapses space to lower dimensions.',
  },
]

export default function Ch02Page() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
        <section className="la-hero" style={{ background: 'var(--black)', color: 'var(--white)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--yellow)', color: 'var(--black)' }}>
            <i className="fa-solid fa-table-cells" /> CH 02 · Matrices as System Operators
          </div>
          <h1 className="la-hero-title" style={{ color: 'var(--white)' }}>
            MATRICES AS <br />
            <span className="la-highlight">OPERATORS</span>
          </h1>
          <p className="la-hero-sub" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'var(--yellow)' }}>
            Linear transformations, pipelines, and the machines of computation. Matrices are the engines that move, rotate, and scale data through multidimensional space.
          </p>
        </section>

        {/* TICKER */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {['MATRICES', 'LINEAR MAPS', 'DETERMINANT', 'ROTATION', 'SCALING', 'MATRIX MULTIPLICATION', 'INVERSE', 'COMPOSITION', 'TRANSFORMATIONS', 'MATRICES'].map((t, i) => (
              <span key={i} className="ticker-item">{t}</span>
            ))}
          </div>
        </div>

        {/* KEY CONCEPTS */}
        <section className="la-section">
          <div className="la-section-header">
            <span className="la-section-number">02</span>
            <h2 className="la-section-title">Key Concepts</h2>
          </div>
          <div className="la-info-grid" style={{ padding: '0 4rem 4rem' }}>
            {MATRIX_KEY_CONCEPTS.map((c, i) => (
              <div key={i} className="la-info-card">
                <div className="la-info-icon"><i className={c.icon} /></div>
                <h3 className="la-info-title">{c.title}</h3>
                <p className="la-info-body">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMING SOON PLACEHOLDER */}
        <section className="la-section" style={{ borderBottom: 'none' }}>
          <div className="la-section-header">
            <span className="la-section-number">→</span>
            <h2 className="la-section-title">Interactive Experiments</h2>
          </div>
          <div style={{ padding: '2rem 4rem 4rem' }}>
            <div className="la-coming-soon-card">
              <i className="fa-solid fa-flask" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
              <div className="la-coming-soon-title">Content Coming Soon</div>
              <div className="la-coming-soon-sub">Interactive matrix transformation visualizers, rotation playgrounds, and determinant explorers will be added here.</div>
            </div>
          </div>
        </section>

    </div>
  )
}
