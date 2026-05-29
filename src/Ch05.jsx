import React from 'react'

/* ============================================================
   CH 05 — Orthogonality
   ============================================================ */

const KEY_CONCEPTS = [
  {
    icon: 'fa-solid fa-ruler-combined',
    title: 'Orthogonality',
    desc: 'Two vectors are orthogonal when their dot product is zero — they are geometrically perpendicular. Orthogonal sets are linearly independent and well-conditioned.',
  },
  {
    icon: 'fa-solid fa-arrows-to-dot',
    title: 'Orthogonal Projection',
    desc: 'Projecting vector b onto subspace W gives the closest point in W to b. The error (b - proj) is perpendicular to W — the "best approximation" principle.',
  },
  {
    icon: 'fa-solid fa-stairs',
    title: 'Gram-Schmidt Process',
    desc: 'Transforms any basis into an orthonormal basis step-by-step by subtracting the projection components. The algorithm behind QR decomposition.',
  },
  {
    icon: 'fa-solid fa-table-columns',
    title: 'QR Decomposition',
    desc: 'Factoring A = QR where Q is orthogonal and R is upper triangular. Enables stable numerical solutions to least squares problems and eigenvalue algorithms.',
  },
  {
    icon: 'fa-solid fa-chart-line',
    title: 'Least Squares',
    desc: 'When Ax = b has no solution (overdetermined), least squares finds x̂ that minimizes ||Ax - b||². The normal equations: AᵀAx̂ = Aᵀb.',
  },
  {
    icon: 'fa-solid fa-compress',
    title: 'Orthonormal Bases',
    desc: 'A basis where all vectors are unit length and mutually perpendicular. They simplify coordinate calculations: the coordinates of v are just the dot products with each basis vector.',
  },
]

export default function Ch05Page() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
        <section className="la-hero" style={{ background: 'var(--green)', color: 'var(--black)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--black)', color: 'var(--green)' }}>
            <i className="fa-solid fa-ruler-combined" /> CH 05 · Orthogonality
          </div>
          <h1 className="la-hero-title" style={{ color: 'var(--black)' }}>
            ORTHO<br />
            <span style={{ color: 'var(--white)', textShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}>GONALITY</span>
          </h1>
          <p className="la-hero-sub" style={{ color: 'rgba(0,0,0,0.8)', borderColor: 'var(--black)' }}>
            Right angles in multidimensional space. Projections, Gram-Schmidt, QR decomposition, and least squares — the tools for finding the best possible approximations.
          </p>
        </section>

        {/* TICKER */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {['ORTHOGONALITY', 'GRAM-SCHMIDT', 'QR DECOMPOSITION', 'LEAST SQUARES', 'PROJECTION', 'ORTHONORMAL BASIS', 'NORMAL EQUATIONS', 'PERPENDICULAR', 'BEST APPROXIMATION', 'ORTHOGONALITY'].map((t, i) => (
              <span key={i} className="ticker-item">{t}</span>
            ))}
          </div>
        </div>

        {/* KEY CONCEPTS */}
        <section className="la-section">
          <div className="la-section-header">
            <span className="la-section-number">05</span>
            <h2 className="la-section-title">Key Concepts</h2>
          </div>
          <div className="la-info-grid" style={{ padding: '0 4rem 4rem' }}>
            {KEY_CONCEPTS.map((c, i) => (
              <div key={i} className="la-info-card">
                <div className="la-info-icon"><i className={c.icon} /></div>
                <h3 className="la-info-title">{c.title}</h3>
                <p className="la-info-body">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMING SOON */}
        <section className="la-section" style={{ borderBottom: 'none' }}>
          <div className="la-section-header">
            <span className="la-section-number">→</span>
            <h2 className="la-section-title">Interactive Experiments</h2>
          </div>
          <div style={{ padding: '2rem 4rem 4rem' }}>
            <div className="la-coming-soon-card">
              <i className="fa-solid fa-flask" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
              <div className="la-coming-soon-title">Content Coming Soon</div>
              <div className="la-coming-soon-sub">Gram-Schmidt visualizer, least squares fitting playground, and QR decomposition step-by-step explorer will be added here.</div>
            </div>
          </div>
        </section>

    </div>
  )
}
