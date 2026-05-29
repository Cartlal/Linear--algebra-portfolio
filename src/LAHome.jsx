import React from 'react'
import { LANav, LAChapterBar } from './LANav'

/* ============================================================
   LA HOME — "About Linear Algebra" landing page
   ============================================================ */

const OVERVIEW_CARDS = [
  {
    num: 'CH 01',
    title: 'Data as Vectors',
    desc: 'Structured representations of data. Feature vectors, dot products, norms, spans, and basis — the language of data.',
    icon: 'fa-solid fa-arrow-right-arrow-left',
    hash: 'la-ch01',
    color: 'var(--yellow)',
    textColor: 'var(--black)',
  },
  {
    num: 'CH 02',
    title: 'Matrices as System Operators',
    desc: 'Linear transformations, pipelines, and the machines of computation. How matrices encode transformations.',
    icon: 'fa-solid fa-table-cells',
    hash: 'la-ch02',
    color: 'var(--black)',
    textColor: 'var(--yellow)',
  },
  {
    num: 'CH 03',
    title: 'Solving Linear Systems',
    desc: 'Gaussian elimination, row reduction, and the algorithms that solve Ax = b. The engine behind modern computation.',
    icon: 'fa-solid fa-equals',
    hash: 'la-ch03',
    color: 'var(--blue)',
    textColor: 'var(--white)',
  },
  {
    num: 'CH 04',
    title: 'Vector Spaces',
    desc: 'Degrees of freedom, null spaces, column spaces, rank, and the true shape of data in high dimensions.',
    icon: 'fa-solid fa-cubes',
    hash: 'la-ch04',
    color: 'var(--red)',
    textColor: 'var(--white)',
  },
  {
    num: 'CH 05',
    title: 'Orthogonality',
    desc: 'Right angles in multidimensional space. Projections, Gram-Schmidt, and QR decomposition.',
    icon: 'fa-solid fa-ruler-combined',
    hash: 'la-ch05',
    color: 'var(--green)',
    textColor: 'var(--black)',
  },
]

const LA_CORE_POINTS = [
  { icon: '🔢', title: 'What is Linear Algebra?', body: 'A branch of mathematics dealing with vectors, matrices, and linear transformations. It provides a mathematical framework to represent and manipulate data in both geometric and algebraic forms — enabling algorithms to analyze, compare, and act on real-world information.' },
  { icon: '💡', title: 'Why I Like This Subject', body: 'Linear Algebra perfectly bridges abstract mathematics with visual, real-world outputs. Every equation corresponds directly to movement, rotation, or scaling in space. The logical rigor combined with its central role in machine learning, gaming, and signal processing makes it endlessly engaging.' },
  { icon: '⚙️', title: 'Importance in Engineering', body: 'Linear Algebra is foundational across all engineering disciplines — from circuit analysis (Kirchhoff s matrices) and control systems (state-space models) to structural mechanics and signal processing. It enables engineers to model complex multi-variable phenomena efficiently.' },
  { icon: '💻', title: 'Linear Algebra in Computer Science', body: 'Used in ML (weight matrices, backprop), computer graphics (transformation matrices), data science (SVD, PCA), image processing (convolution), and algorithms (graph adjacency matrices). It is the computational backbone of modern CS.' },
]

export default function LAHomePage() {
  return (
    <div className="la-layout">
      <LANav currentPage="la-home" />

      <main className="la-main">
        {/* HERO */}
        <section className="la-hero" style={{ background: 'var(--black)', color: 'var(--white)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--yellow)', color: 'var(--black)' }}>
            <i className="fa-solid fa-graduation-cap" /> B.E. Semester 2 · KLE Technological University
          </div>
          <h1 className="la-hero-title" style={{ color: 'var(--white)' }}>
            ABOUT <br />
            <span className="la-highlight">LINEAR ALGEBRA</span>
          </h1>
          <p className="la-hero-sub" style={{ borderColor: 'var(--yellow)', color: 'var(--white)', opacity: 0.85 }}>
            A structured study of vectors, matrices, and transformations. Explore five chapters of interactive mathematics — from feature vectors to orthogonal projections.
          </p>
        </section>

        {/* TICKER */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {['LINEAR ALGEBRA', 'VECTORS', 'MATRICES', 'EIGENVALUES', 'SYSTEMS', 'ORTHOGONALITY', 'SPANS', 'PROJECTIONS', 'MACHINE LEARNING', 'COMPUTER GRAPHICS', 'LINEAR ALGEBRA'].map((t, i) => (
              <span key={i} className="ticker-item">{t}</span>
            ))}
          </div>
        </div>

        {/* CORE INFORMATION */}
        <section className="la-section">
          <div className="la-section-header">
            <span className="la-section-number">00</span>
            <h2 className="la-section-title">Overview</h2>
          </div>
          <div className="la-info-grid">
            {LA_CORE_POINTS.map((pt, i) => (
              <div key={i} className="la-info-card">
                <div className="la-info-icon">{pt.icon}</div>
                <h3 className="la-info-title">{pt.title}</h3>
                <p className="la-info-body">{pt.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPTER NAVIGATOR */}
        <section className="la-section" style={{ borderBottom: 'none' }}>
          <div className="la-section-header">
            <span className="la-section-number">01</span>
            <h2 className="la-section-title">Browse Chapters</h2>
          </div>
          <div className="la-chapters-list">
            {OVERVIEW_CARDS.map((ch, i) => (
              <div
                key={i}
                className="la-chapter-overview-card"
                onClick={() => { window.location.hash = ch.hash }}
                style={{ '--card-bg': ch.color, '--card-text': ch.textColor }}
              >
                <div className="la-chov-left" style={{ background: ch.color, color: ch.textColor }}>
                  <div className="la-chov-num">{ch.num}</div>
                  <i className={ch.icon} style={{ fontSize: '2rem' }} />
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
        </section>

        <LAChapterBar currentPage="la-home" />
      </main>
    </div>
  )
}
