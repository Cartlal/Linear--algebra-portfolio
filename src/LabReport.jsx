import React from 'react'

/* ============================================================
   Final Lab Report & Presentation
   (Neo-Brutalist Styling)
   ============================================================ */

function DocumentCard({ title, desc, icon, color, link, isPlaceholder }) {
  return (
    <div className="neo-widget-wrapper" style={{ flex: 1, minWidth: '300px' }}>
      <div className="neo-widget-title" style={{ background: color, color: color === 'var(--yellow)' ? 'black' : 'white' }}>{title}</div>
      
      <div className="neo-widget-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <i className={icon} style={{ fontSize: '5rem', color: 'var(--black)' }}></i>
        </div>
        
        <p className="la-concept-text" style={{ flex: 1, textAlign: 'center' }}>
          {desc}
        </p>
        
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          {isPlaceholder ? (
            <button className="la-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              Link Pending...
            </button>
          ) : (
            <a href={link} target="_blank" rel="noreferrer" className="la-btn" style={{ textDecoration: 'none' }}>
              View Document
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LabReportPage() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
      <section className="la-hero" style={{ background: '#b366ff', color: 'var(--white)' }}>
        <div className="la-hero-badge" style={{ background: 'var(--black)', color: 'var(--yellow)' }}>
          FINAL PROJECT
        </div>
        <h1 className="la-hero-title">
          Lab Report &<br/><span style={{ color: 'var(--yellow)' }}>Presentation</span>
        </h1>
        <p className="la-hero-sub" style={{ borderColor: 'transparent', color: 'var(--white)', fontWeight: 'bold', paddingLeft: 0 }}>
          Comprehensive documentation and presentation slides for the Linear Algebra course.
        </p>
      </section>

      {/* CONTENT */}
      <section className="la-section" style={{ padding: '4rem 2rem', background: '#fafafa' }}>
        <div className="la-section-inner" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <DocumentCard 
              title="Lab Report (PDF)"
              desc="The complete Linear Algebra Lab report detailing the experiments, mathematical foundations, and applications explored throughout the semester."
              icon="fa-regular fa-file-pdf"
              color="var(--red)"
              link="https://drive.google.com/file/d/1sEud3PjZOyH9t6kJktLbJXbEg2-0eW2p/view?usp=sharing"
              isPlaceholder={false}
            />
            
            <DocumentCard 
              title="Final Presentation (PPTX)"
              desc="The final presentation slides summarizing key linear algebra concepts, visualizations, and project outcomes."
              icon="fa-regular fa-file-powerpoint"
              color="var(--yellow)"
              link="https://docs.google.com/presentation/d/16d3568bgmoyDesedazwYEUm0jNWpgZeX/edit?usp=sharing&ouid=107495198968867915274&rtpof=true&sd=true"
              isPlaceholder={false}
            />
          </div>

          <div style={{ marginTop: '4rem', background: 'var(--white)', border: '4px solid black', padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 'bold', boxShadow: '8px 8px 0 black' }}>
            <i className="fa-solid fa-check-circle" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--green)' }}></i>
            <div>Documents are live! Click the buttons above to view them on Google Drive.</div>
          </div>

        </div>
      </section>

    </div>
  )
}
