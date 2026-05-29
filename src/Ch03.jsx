import React from 'react'
import { LANav, LAChapterBar } from './LANav'

/* ============================================================
   CH 03 — Solving Systems of Linear Equations
   ============================================================ */

const KEY_CONCEPTS = [
  {
    icon: 'fa-solid fa-list-ol',
    title: 'Systems of Equations',
    desc: 'A system Ax = b represents multiple simultaneous equations. The goal is to find the vector x that satisfies all equations at once — the intersection of hyperplanes.',
  },
  {
    icon: 'fa-solid fa-table',
    title: 'Augmented Matrices',
    desc: 'Writing [A|b] as an augmented matrix lets us apply row operations to both the coefficient matrix and the right-hand side simultaneously.',
  },
  {
    icon: 'fa-solid fa-arrow-down',
    title: 'Gaussian Elimination',
    desc: 'Systematically eliminates variables by creating zeros below pivots using row operations. Transforms the matrix to row echelon form.',
  },
  {
    icon: 'fa-solid fa-arrow-up',
    title: 'Back Substitution',
    desc: 'After Gaussian elimination, we solve from the bottom up — substituting known values back into earlier equations to find the full solution.',
  },
  {
    icon: 'fa-solid fa-diagram-project',
    title: 'Types of Solutions',
    desc: 'Systems can have: one unique solution (full rank), infinitely many solutions (underdetermined), or no solution (inconsistent / overdetermined).',
  },
  {
    icon: 'fa-solid fa-microchip',
    title: 'LU Decomposition',
    desc: 'Factoring A = LU (lower × upper triangular) enables efficient repeated solves for different b vectors — critical in engineering simulations.',
  },
]

export default function Ch03Page() {
  return (
    <div className="la-layout">
      <LANav currentPage="la-ch03" />

      <main className="la-main">
        {/* HERO */}
        <section className="la-hero" style={{ background: 'var(--blue)', color: 'var(--white)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--white)', color: 'var(--blue)' }}>
            <i className="fa-solid fa-equals" /> CH 03 · Solving Systems of Linear Equations
          </div>
          <h1 className="la-hero-title" style={{ color: 'var(--white)' }}>
            SOLVING <br />
            <span style={{ color: 'var(--yellow)', textShadow: '4px 4px 0 rgba(0,0,0,0.3)' }}>LINEAR SYSTEMS</span>
          </h1>
          <p className="la-hero-sub" style={{ color: 'rgba(255,255,255,0.85)', borderColor: 'var(--white)' }}>
            Gaussian elimination, row reduction, and the algorithms that solve Ax = b. The computational engine behind engineering simulations, machine learning, and scientific computing.
          </p>
        </section>

        {/* TICKER */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {['GAUSSIAN ELIMINATION', 'ROW REDUCTION', 'PIVOTS', 'BACK SUBSTITUTION', 'LU DECOMPOSITION', 'AUGMENTED MATRIX', 'UNIQUE SOLUTION', 'INFINITE SOLUTIONS', 'Ax = b', 'GAUSSIAN ELIMINATION'].map((t, i) => (
              <span key={i} className="ticker-item">{t}</span>
            ))}
          </div>
        </div>

        {/* KEY CONCEPTS */}
        <section className="la-section">
          <div className="la-section-header">
            <span className="la-section-number">03</span>
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
              <div className="la-coming-soon-sub">Step-by-step Gaussian elimination visualizer, row operation playground, and solution type explorer will be added here.</div>
            </div>
          </div>
        </section>

        <LAChapterBar currentPage="la-ch03" />
      </main>
    </div>
  )
}
