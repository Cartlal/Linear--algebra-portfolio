import React from 'react'

/* ============================================================
   CH 04 — Vector Spaces: Degrees of Freedom
   ============================================================ */

const KEY_CONCEPTS = [
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Vector Spaces',
    desc: 'A set V with vector addition and scalar multiplication, satisfying closure, identity, and distributive axioms. R² and R³ are the most familiar examples.',
  },
  {
    icon: 'fa-solid fa-filter',
    title: 'Subspaces',
    desc: 'A subspace is a subset of a vector space that is itself a vector space. It must contain the zero vector and be closed under addition and scaling.',
  },
  {
    icon: 'fa-solid fa-columns',
    title: 'Column Space',
    desc: 'The column space of A (Col A) is the set of all possible outputs Ax — the span of A\'s columns. It tells us which b vectors can be reached by the system.',
  },
  {
    icon: 'fa-solid fa-ban',
    title: 'Null Space',
    desc: 'The null space (kernel) of A contains all x where Ax = 0. Its dimension is the nullity of A, related to rank by the Rank-Nullity theorem.',
  },
  {
    icon: 'fa-solid fa-ruler',
    title: 'Rank & Dimension',
    desc: 'Rank is the number of linearly independent columns (= dimension of column space). The Rank-Nullity theorem: rank(A) + nullity(A) = n.',
  },
  {
    icon: 'fa-solid fa-infinity',
    title: 'Change of Basis',
    desc: 'Different bases give different coordinate systems for the same space. Change of basis matrices transform coordinates between representations.',
  },
]

export default function Ch04Page() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
        <section className="la-hero" style={{ background: 'var(--red)', color: 'var(--white)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--white)', color: 'var(--red)' }}>
            <i className="fa-solid fa-cubes" /> CH 04 · Vector Spaces
          </div>
          <h1 className="la-hero-title" style={{ color: 'var(--white)' }}>
            VECTOR <br />
            <span style={{ color: 'var(--yellow)', textShadow: '4px 4px 0 rgba(0,0,0,0.3)' }}>SPACES</span>
          </h1>
          <p className="la-hero-sub" style={{ color: 'rgba(255,255,255,0.85)', borderColor: 'var(--white)' }}>
            Degrees of freedom, null spaces, column spaces, rank, and the true shape of data in high dimensions. Understanding the geometry of solution sets.
          </p>
        </section>

        {/* TICKER */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {['VECTOR SPACES', 'SUBSPACES', 'COLUMN SPACE', 'NULL SPACE', 'RANK', 'NULLITY', 'DIMENSION', 'CHANGE OF BASIS', 'KERNEL', 'DEGREES OF FREEDOM', 'VECTOR SPACES'].map((t, i) => (
              <span key={i} className="ticker-item">{t}</span>
            ))}
          </div>
        </div>

        {/* KEY CONCEPTS */}
        <section className="la-section">
          <div className="la-section-header">
            <span className="la-section-number">04</span>
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
              <div className="la-coming-soon-sub">Column space visualizer, null space explorer, rank-nullity theorem demonstrator, and basis transformation playground will be added here.</div>
            </div>
          </div>
        </section>

    </div>
  )
}
