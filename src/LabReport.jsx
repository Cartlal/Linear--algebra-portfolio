import React from 'react'

/* ============================================================
   Final Lab Report & Presentation
   (Neo-Brutalist Styling)
   ============================================================ */

function DocumentCard({ title, desc, color, embedUrl }) {
  return (
    <div className="neo-widget-wrapper" style={{ width: '100%' }}>
      <div className="neo-widget-title" style={{ background: color, color: color === 'var(--yellow)' ? 'black' : 'white' }}>{title}</div>
      
      <div className="neo-widget-container" style={{ display: 'flex', flexDirection: 'column' }}>
        <p className="la-concept-text" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {desc}
        </p>
        
        <div style={{ width: '100%', height: '600px', border: '4px solid black', background: '#e0e0e0', position: 'relative', overflow: 'hidden' }}>
          <iframe 
            src={embedUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 'none', display: 'block' }} 
            allowFullScreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          />
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
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <DocumentCard 
              title="Lab Report (PDF)"
              desc="The complete Linear Algebra Lab report detailing the experiments, mathematical foundations, and applications explored throughout the semester."
              color="var(--red)"
              embedUrl="https://drive.google.com/file/d/1sEud3PjZOyH9t6kJktLbJXbEg2-0eW2p/preview"
            />
            
            <DocumentCard 
              title="Final Presentation (PPTX)"
              desc="The final presentation slides summarizing key linear algebra concepts, visualizations, and project outcomes."
              color="var(--yellow)"
              embedUrl="https://docs.google.com/presentation/d/16d3568bgmoyDesedazwYEUm0jNWpgZeX/embed?start=false&loop=false&delayms=3000"
            />
          </div>

        </div>
      </section>

    </div>
  )
}
