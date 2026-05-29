import React from 'react'

/* ============================================================
   Asteria Fest Website
   (Neo-Brutalist Styling)
   ============================================================ */

export default function AsteriaFest() {
  return (
    <div className="la-embed-page" style={{ background: '#f5f0e8', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* NAVIGATION */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 2rem', background: 'var(--white)', borderBottom: '4px solid black' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '2px', fontFamily: 'var(--font-mono)' }}>
          ASTERIA<span style={{ color: 'var(--blue)' }}>.FEST</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 'bold' }}>
          <a href="#about" style={{ textDecoration: 'none', color: 'var(--black)' }}>About</a>
          <a href="#events" style={{ textDecoration: 'none', color: 'var(--black)' }}>Events</a>
          <a href="#register" className="la-btn-sm" style={{ textDecoration: 'none', background: 'var(--yellow)' }}>Register Now</a>
          <a href="/" style={{ textDecoration: 'none', color: 'var(--black)', marginLeft: '1rem' }}>← Back to Portfolio</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '6rem 2rem', background: 'var(--blue)', color: 'var(--white)', borderBottom: '4px solid black', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <h1 style={{ fontSize: '6rem', fontWeight: '900', margin: '0', textTransform: 'uppercase', lineHeight: '1', textShadow: '6px 6px 0 var(--black)' }}>
          Asteria <span style={{ color: 'var(--yellow)' }}>Fest</span> 2025
        </h1>
        <p style={{ fontSize: '1.5rem', marginTop: '2rem', fontWeight: 'bold', maxWidth: '800px', margin: '2rem auto 0 auto' }}>
          The biggest and most vibrant college technical and cultural festival. Innovation meets entertainment.
        </p>
        <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          <a href="#events" className="la-btn" style={{ background: 'var(--yellow)', color: 'var(--black)', fontSize: '1.2rem', padding: '1rem 3rem' }}>Explore Events</a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="neo-widget-wrapper" style={{ background: 'var(--white)' }}>
          <div className="neo-widget-title" style={{ background: 'var(--red)', color: 'white' }}>ABOUT THE FEST</div>
          <div className="neo-widget-container" style={{ padding: '3rem' }}>
            <h2 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>Where Tech Meets Art</h2>
            <p className="la-concept-text">
              Asteria Fest is the flagship annual festival driving development, experimental projects, and cultural spectacles. Our mission is to build real-world solutions under pressure and showcase the brightest minds to industry professionals.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              <div style={{ background: 'var(--yellow)', padding: '2rem', border: '3px solid black', textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', boxShadow: '6px 6px 0 black' }}>
                <i className="fa-solid fa-users" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i><br/>5,000+<br/>Attendees
              </div>
              <div style={{ background: 'var(--green)', padding: '2rem', border: '3px solid black', textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', boxShadow: '6px 6px 0 black' }}>
                <i className="fa-solid fa-laptop-code" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i><br/>50+<br/>Tech Events
              </div>
              <div style={{ background: '#c175ff', padding: '2rem', border: '3px solid black', textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', boxShadow: '6px 6px 0 black' }}>
                <i className="fa-solid fa-trophy" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i><br/>₹5L+<br/>Prize Pool
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '4rem', textTransform: 'uppercase', marginBottom: '3rem', textAlign: 'center', textShadow: '4px 4px 0 var(--yellow)' }}>Featured Events</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          <div className="neo-widget-wrapper">
            <div className="neo-widget-title" style={{ background: 'var(--yellow)' }}>DTSI PROJECT EXPO</div>
            <div className="neo-widget-container" style={{ padding: '2rem' }}>
              <i className="fa-solid fa-microchip" style={{ fontSize: '4rem', marginBottom: '1rem' }}></i>
              <h3 style={{ fontSize: '1.5rem' }}>Technical Exhibition</h3>
              <p>Showcase your hardware and software innovations to top industry professionals and investors. Compete for the grand prize!</p>
              <button className="la-btn-sm" style={{ marginTop: '1rem', width: '100%' }}>View Details</button>
            </div>
          </div>

          <div className="neo-widget-wrapper">
            <div className="neo-widget-title" style={{ background: 'var(--blue)', color: 'white' }}>HACKATHON</div>
            <div className="neo-widget-container" style={{ padding: '2rem' }}>
              <i className="fa-solid fa-code" style={{ fontSize: '4rem', marginBottom: '1rem' }}></i>
              <h3 style={{ fontSize: '1.5rem' }}>24-Hour Codefest</h3>
              <p>Build real-world solutions under pressure. Open to web, app, AI/ML, and blockchain developers.</p>
              <button className="la-btn-sm" style={{ marginTop: '1rem', width: '100%' }}>View Details</button>
            </div>
          </div>

          <div className="neo-widget-wrapper">
            <div className="neo-widget-title" style={{ background: 'var(--green)' }}>BATTLE OF BANDS</div>
            <div className="neo-widget-container" style={{ padding: '2rem' }}>
              <i className="fa-solid fa-guitar" style={{ fontSize: '4rem', marginBottom: '1rem' }}></i>
              <h3 style={{ fontSize: '1.5rem' }}>Cultural Spectacle</h3>
              <p>The ultimate musical showdown. Bring your instruments, bring your energy, and electrify the crowd.</p>
              <button className="la-btn-sm" style={{ marginTop: '1rem', width: '100%' }}>View Details</button>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section id="register" style={{ padding: '6rem 2rem', background: 'var(--yellow)', borderTop: '4px solid black', borderBottom: '4px solid black', textAlign: 'center', marginTop: '4rem' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: '900', textTransform: 'uppercase', margin: '0' }}>Ready to Join?</h2>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0 3rem 0' }}>Tickets are selling fast. Secure your spot at Asteria Fest today.</p>
        <button className="la-btn" style={{ background: 'var(--black)', color: 'var(--white)', fontSize: '1.5rem', padding: '1.5rem 4rem' }}>Buy Tickets</button>
      </section>

    </div>
  )
}
