import React from 'react'

/* ============================================================
   LA HOME — "About Linear Algebra"
   Full-width, sidebar-free — designed for Google Sites embed
   ============================================================ */

const OVERVIEW_CARDS = [
  {
    num: 'CH 01', title: 'Data as Vectors',
    desc: 'Structured representations of data. Feature vectors, dot products, norms, spans, and basis — the language of data.',
    icon: 'fa-solid fa-arrow-right-arrow-left', hash: 'data-as-vectors',
    color: '#FFD600', textColor: '#0a0a0a',
  },
  {
    num: 'CH 02', title: 'Matrices as System Operators',
    desc: 'Linear transformations, pipelines, and the machines of computation. How matrices encode transformations.',
    icon: 'fa-solid fa-table-cells', hash: 'matrices-as-system-operators',
    color: '#0a0a0a', textColor: '#FFD600',
  },
  {
    num: 'CH 03', title: 'Solving Linear Systems',
    desc: 'Gaussian elimination, row reduction, and the algorithms that solve Ax = b. The engine behind modern computation.',
    icon: 'fa-solid fa-equals', hash: 'solving-linear-systems',
    color: '#1A1AFF', textColor: '#fff',
  },
  {
    num: 'CH 04', title: 'Vector Spaces: Degrees of Freedom',
    desc: 'Null spaces, column spaces, rank, and the true shape of data in high dimensions.',
    icon: 'fa-solid fa-cubes', hash: 'vector-spaces',
    color: '#FF3B3B', textColor: '#fff',
  },
  {
    num: 'CH 05', title: 'Orthogonality',
    desc: 'Right angles in multidimensional space. Projections, Gram-Schmidt, and QR decomposition.',
    icon: 'fa-solid fa-ruler-combined', hash: 'orthogonality',
    color: '#00C853', textColor: '#0a0a0a',
  },
  {
    num: 'CH 06', title: 'Eigenvalues & Eigenvectors',
    desc: 'Invariant directions, the characteristic equation, diagonalization, and PageRank.',
    icon: 'fa-solid fa-bolt', hash: 'eigenvalues-and-eigenvectors',
    color: '#ff7b54', textColor: '#0a0a0a',
  },
  {
    num: 'CH 07', title: 'Singular Value Decomposition',
    desc: 'SVD, pseudoinverse, data compression, and recommendation systems.',
    icon: 'fa-solid fa-layer-group', hash: 'singular-value-decomposition',
    color: '#00e5ff', textColor: '#0a0a0a',
  },
]

const CSE_USES = [
  { icon: 'fa-solid fa-brain', label: 'Machine Learning & AI', detail: 'Data representation, training models, dimensionality reduction (SVD, PCA).' },
  { icon: 'fa-solid fa-cube', label: 'Computer Graphics', detail: 'Rotation, scaling, projection — every pixel transformation uses matrices.' },
  { icon: 'fa-solid fa-chart-bar', label: 'Data Science', detail: 'Analyze and process large datasets using matrix operations.' },
  { icon: 'fa-solid fa-magnifying-glass', label: 'Algorithms', detail: 'Optimization and search algorithms rely on matrix computations.' },
  { icon: 'fa-solid fa-image', label: 'Image & Signal Processing', detail: 'Convolution, filtering, and frequency analysis are matrix operations.' },
]

export default function LAHomePage() {
  return (
    <div className="la-embed-page">

      {/* ── HERO ── */}
      <section className="laemb-hero">
        <div className="laemb-hero-inner">
          <div className="laemb-hero-badge">
            <i className="fa-solid fa-graduation-cap" />
            B.E. Semester 2 · KLE Technological University
          </div>
          <h1 className="laemb-hero-title">
            ABOUT <span className="laemb-hero-accent">LINEAR ALGEBRA</span>
          </h1>
          <p className="laemb-hero-sub">
            A branch of mathematics that provides the language for vectors, matrices, and transformations — the mathematical backbone of modern engineering and computer science.
          </p>
          <div className="laemb-hero-pills">
            <span className="laemb-pill">Vectors</span>
            <span className="laemb-pill">Matrices</span>
            <span className="laemb-pill">Eigenvalues</span>
            <span className="laemb-pill">Transformations</span>
            <span className="laemb-pill">Subspaces</span>
          </div>
        </div>
        <div className="laemb-hero-matrix" aria-hidden="true">
          <div className="laemb-matrix-box">
            <span className="laemb-mb-bracket">[</span>
            <div className="laemb-mb-cols">
              <div className="laemb-mb-col"><span>a</span><span>c</span><span>e</span></div>
              <div className="laemb-mb-col"><span>b</span><span>d</span><span>f</span></div>
            </div>
            <span className="laemb-mb-bracket">]</span>
          </div>
          <div className="laemb-hero-formula">Ax = λx</div>
          <div className="laemb-hero-formula" style={{ fontSize: '1.1rem', opacity: 0.6 }}>v · w = ‖v‖‖w‖cos θ</div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {['LINEAR ALGEBRA', 'VECTORS', 'MATRICES', 'EIGENVALUES', 'SYSTEMS', 'ORTHOGONALITY', 'SPANS', 'PROJECTIONS', 'MACHINE LEARNING', 'COMPUTER GRAPHICS', 'DATA SCIENCE', 'LINEAR ALGEBRA'].map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* ── SECTION 1: WHAT IS LINEAR ALGEBRA ── */}
      <section className="laemb-section laemb-alt">
        <div className="laemb-section-tag">01</div>
        <div className="laemb-section-inner laemb-two-col">
          <div className="laemb-col-label">
            <div className="laemb-icon-circle" style={{ background: '#FFD600' }}>
              <i className="fa-solid fa-square-root-variable" />
            </div>
            <h2 className="laemb-section-title">What is Linear Algebra?</h2>
          </div>
          <div className="laemb-col-body">
            <p className="laemb-body-text">
              Linear Algebra is a branch of mathematics that deals with <strong>vectors</strong>, <strong>matrices</strong>, and <strong>linear transformations</strong>. It focuses on solving systems of linear equations and understanding concepts like vector spaces, basis, dimension, and eigenvalues.
            </p>
            <p className="laemb-body-text">
              It provides a mathematical framework to represent and manipulate data in both geometric and algebraic forms — enabling algorithms to analyze, compare, and act on real-world information.
            </p>
            <div className="laemb-key-terms">
              {['Vectors', 'Matrices', 'Linear Maps', 'Eigenvalues', 'Vector Spaces', 'Basis', 'Dimension'].map((t, i) => (
                <span key={i} className="laemb-key-term">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHY I LIKE IT ── */}
      <section className="laemb-section">
        <div className="laemb-section-tag">02</div>
        <div className="laemb-section-inner laemb-two-col">
          <div className="laemb-col-label">
            <div className="laemb-icon-circle" style={{ background: '#0a0a0a' }}>
              <i className="fa-solid fa-heart" style={{ color: '#FFD600' }} />
            </div>
            <h2 className="laemb-section-title">Why I Like This Subject</h2>
          </div>
          <div className="laemb-col-body">
            <p className="laemb-body-text">
              I like Linear Algebra because it <strong>connects abstract mathematical concepts with real-world applications</strong>. It helps in understanding how data can be represented efficiently using vectors and matrices.
            </p>
            <p className="laemb-body-text">
              The problem-solving aspect — especially solving systems of equations and working with transformations — is interesting and logical. It also plays a key role in modern technologies like <strong>machine learning</strong> and <strong>graphics</strong>, which makes it more engaging and relevant.
            </p>
            <div className="laemb-quote-block">
              <i className="fa-solid fa-quote-left" />
              <span>Every equation is a geometric truth in disguise.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: IMPORTANCE IN ENGINEERING ── */}
      <section className="laemb-section laemb-alt">
        <div className="laemb-section-tag">03</div>
        <div className="laemb-section-inner laemb-two-col">
          <div className="laemb-col-label">
            <div className="laemb-icon-circle" style={{ background: '#1A1AFF' }}>
              <i className="fa-solid fa-gears" style={{ color: '#fff' }} />
            </div>
            <h2 className="laemb-section-title">Importance in Engineering</h2>
          </div>
          <div className="laemb-col-body">
            <p className="laemb-body-text">
              Linear Algebra is <strong>extremely important in engineering</strong> because it helps in modeling and solving complex problems. Engineers use it to analyze systems, design structures, and optimize processes.
            </p>
            <div className="laemb-eng-cards">
              <div className="laemb-eng-card">
                <i className="fa-solid fa-bolt" style={{ color: '#FFD600' }} />
                <div>
                  <div className="laemb-eng-card-title">Circuit Analysis</div>
                  <div className="laemb-eng-card-desc">Kirchhoff's laws expressed as matrix equations to solve complex networks.</div>
                </div>
              </div>
              <div className="laemb-eng-card">
                <i className="fa-solid fa-sliders" style={{ color: '#FFD600' }} />
                <div>
                  <div className="laemb-eng-card-title">Control Systems</div>
                  <div className="laemb-eng-card-desc">State-space models use matrices to represent dynamic system behaviour.</div>
                </div>
              </div>
              <div className="laemb-eng-card">
                <i className="fa-solid fa-wave-square" style={{ color: '#FFD600' }} />
                <div>
                  <div className="laemb-eng-card-title">Signal Processing</div>
                  <div className="laemb-eng-card-desc">Fourier transforms, filters, and convolutions are all linear operations.</div>
                </div>
              </div>
              <div className="laemb-eng-card">
                <i className="fa-solid fa-building" style={{ color: '#FFD600' }} />
                <div>
                  <div className="laemb-eng-card-title">Structural Analysis</div>
                  <div className="laemb-eng-card-desc">Stiffness matrices solve for forces and displacements in structures.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: HOW USED IN CSE ── */}
      <section className="laemb-section">
        <div className="laemb-section-tag">04</div>
        <div className="laemb-section-inner">
          <div className="laemb-cse-header">
            <div className="laemb-icon-circle" style={{ background: '#00C853' }}>
              <i className="fa-solid fa-laptop-code" />
            </div>
            <h2 className="laemb-section-title">Linear Algebra in Computer Science</h2>
          </div>
          <p className="laemb-body-text" style={{ maxWidth: '700px', marginBottom: '2.5rem' }}>
            Linear Algebra forms the <strong>backbone of many modern computational technologies</strong> and is widely used across all core areas of Computer Science Engineering.
          </p>
          <div className="laemb-cse-grid">
            {CSE_USES.map((u, i) => (
              <div key={i} className="laemb-cse-card">
                <div className="laemb-cse-card-icon">
                  <i className={u.icon} />
                </div>
                <div className="laemb-cse-card-label">{u.label}</div>
                <div className="laemb-cse-card-detail">{u.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTER NAVIGATOR ── */}
      <section className="laemb-section laemb-alt" style={{ borderBottom: 'none' }}>
        <div className="laemb-section-tag">→</div>
        <div className="laemb-section-inner">
          <h2 className="laemb-section-title" style={{ marginBottom: '2rem' }}>Browse Chapters</h2>
          <div className="la-chapters-list">
            {OVERVIEW_CARDS.map((ch, i) => (
              <div
                key={i}
                className="la-chapter-overview-card"
                onClick={() => {
                  window.history.pushState({}, '', '/' + ch.hash)
                  window.dispatchEvent(new Event('popstate'))
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="la-chov-left" style={{ background: ch.color, color: ch.textColor }}>
                  <div className="la-chov-num">{ch.num}</div>
                  <i className={ch.icon} style={{ fontSize: '1.8rem' }} />
                </div>
                <div className="la-chov-right">
                  <div className="la-chov-title">{ch.title}</div>
                  <div className="la-chov-desc">{ch.desc}</div>
                </div>
                <div className="la-chov-arrow">
                  <i className="fa-solid fa-arrow-right" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
