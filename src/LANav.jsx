import React from 'react'

/* ============================================================
   SHARED NAVIGATION for the Linear Algebra section
   Usage: <LANav currentPage="la-home" />
   ============================================================ */

const LA_CHAPTERS = [
  { id: 'la-home', label: 'About Linear Algebra', icon: 'fa-solid fa-house-chimney', short: 'Home' },
  { id: 'la-ch01', label: 'CH 01 — Data as Vectors', icon: 'fa-solid fa-arrow-right-arrow-left', short: 'CH 01' },
  { id: 'la-ch02', label: 'CH 02 — Matrices as Operators', icon: 'fa-solid fa-table-cells', short: 'CH 02' },
  { id: 'la-ch03', label: 'CH 03 — Solving Linear Systems', icon: 'fa-solid fa-equals', short: 'CH 03' },
  { id: 'la-ch04', label: 'CH 04 — Vector Spaces', icon: 'fa-solid fa-cubes', short: 'CH 04' },
  { id: 'la-ch05', label: 'CH 05 — Orthogonality', icon: 'fa-solid fa-ruler-combined', short: 'CH 05' },
]

export function LANav({ currentPage }) {
  const navigate = (id) => { window.location.hash = id }

  return (
    <nav className="la-nav">
      {/* Logo / Back to portfolio */}
      <div className="la-nav-logo" onClick={() => { window.location.hash = '' }}>
        <span className="la-nav-logo-kh">K<span>H</span></span>
        <span className="la-nav-logo-tag">← Portfolio</span>
      </div>

      {/* Chapter links */}
      <ul className="la-nav-links">
        {LA_CHAPTERS.map(ch => (
          <li key={ch.id}>
            <button
              className={`la-nav-link ${currentPage === ch.id ? 'la-nav-link-active' : ''}`}
              onClick={() => navigate(ch.id)}
            >
              <i className={ch.icon} />
              <span className="la-nav-link-short">{ch.short}</span>
              <span className="la-nav-link-full">{ch.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* Chapter progress "breadcrumb" bar */
export function LAChapterBar({ currentPage }) {
  const currentIdx = LA_CHAPTERS.findIndex(ch => ch.id === currentPage)
  const prev = currentIdx > 0 ? LA_CHAPTERS[currentIdx - 1] : null
  const next = currentIdx < LA_CHAPTERS.length - 1 ? LA_CHAPTERS[currentIdx + 1] : null

  return (
    <div className="la-chapter-bar">
      <div className="la-chapter-bar-inner">
        {prev ? (
          <button className="la-chapter-nav-btn" onClick={() => { window.location.hash = prev.id }}>
            <i className="fa-solid fa-arrow-left" /> {prev.short}
          </button>
        ) : <div />}

        <div className="la-chapter-bar-progress">
          {LA_CHAPTERS.map((ch, i) => (
            <div
              key={ch.id}
              className={`la-progress-dot ${ch.id === currentPage ? 'active' : ''} ${i < currentIdx ? 'done' : ''}`}
              onClick={() => { window.location.hash = ch.id }}
              title={ch.label}
            />
          ))}
        </div>

        {next ? (
          <button className="la-chapter-nav-btn" onClick={() => { window.location.hash = next.id }}>
            {next.short} <i className="fa-solid fa-arrow-right" />
          </button>
        ) : (
          <button className="la-chapter-nav-btn" style={{ opacity: 0.4 }} disabled>
            End of Chapters
          </button>
        )}
      </div>
    </div>
  )
}

export { LA_CHAPTERS }
export default LANav
