import React, { useState } from 'react'

/* ============================================================
   CH 07 — Singular Value Decomposition
   (Neo-Brutalist Styling)
   ============================================================ */

function SVDEquationWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--yellow)' }}>1. The SVD Equation</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>Every matrix can be decomposed into three fundamental geometric transformations: a rotation, a scaling, and another rotation. <strong>A = UΣVᵀ</strong></p>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold', margin: '2rem 0', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div>A</div>
            <div style={{ background: 'white', border: '3px solid black', padding: '1.5rem', marginTop: '0.5rem', fontSize: '1.5rem' }}>Data Matrix</div>
          </div>
          <div style={{ fontSize: '2rem' }}>=</div>
          <div style={{ textAlign: 'center' }}>
            <div>U</div>
            <div style={{ background: 'var(--blue)', color: 'white', border: '3px solid black', padding: '1rem', marginTop: '0.5rem' }}>Left Singular<br/>Vectors</div>
          </div>
          <div style={{ fontSize: '2rem' }}>×</div>
          <div style={{ textAlign: 'center' }}>
            <div>Σ</div>
            <div style={{ background: 'var(--yellow)', border: '3px solid black', padding: '1rem', marginTop: '0.5rem' }}>Singular<br/>Values</div>
          </div>
          <div style={{ fontSize: '2rem' }}>×</div>
          <div style={{ textAlign: 'center' }}>
            <div>Vᵀ</div>
            <div style={{ background: 'var(--red)', color: 'white', border: '3px solid black', padding: '1rem', marginTop: '0.5rem' }}>Right Singular<br/>Vectors</div>
          </div>
        </div>

      </div>
    </div>
  )
}

function SingularValuesWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--blue)', color: 'white' }}>2. Singular Values & Rank</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>Singular values represent the "importance" of each component. The number of non-zero singular values equals the <strong>rank</strong> of the matrix.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '1.2rem', margin: '2rem 0' }}>
          <div style={{ background: '#f0f0f0', padding: '1rem', border: '3px solid black', width: '100%', textAlign: 'center' }}>
            Σ = <span style={{ fontSize: '1.5rem', margin: '0 0.5rem' }}>[</span>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', textAlign: 'center', background: 'var(--yellow)' }}>
              <div style={{ display: 'flex', gap: '1.5rem', padding: '0.5rem' }}><span>3</span><span>0</span></div>
              <div style={{ display: 'flex', gap: '1.5rem', padding: '0.5rem' }}><span>0</span><span>2</span></div>
            </div>
            <span style={{ fontSize: '1.5rem', margin: '0 0.5rem' }}>]</span>
          </div>

          <div style={{ background: 'white', padding: '1rem', border: '3px solid black', width: '100%', textAlign: 'center' }}>
            2 Non-Zero Singular Values (3 and 2)
          </div>

          <div>↓</div>

          <div style={{ background: 'var(--green)', padding: '1rem', border: '3px solid black', width: '100%', textAlign: 'center' }}>
            Rank = 2
          </div>
        </div>
      </div>
    </div>
  )
}

function LowRankWidget() {
  const [rank, setRank] = useState(2)

  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--green)' }}>3. Low-Rank Approximation</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>We can compress a matrix by dropping the smallest singular values. This keeps the most important information while saving massive amounts of space!</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem 0', gap: '2rem', fontFamily: 'var(--font-mono)' }}>
          <div style={{ textAlign: 'center' }}>
            <div>Original Matrix (Rank 2)</div>
            <div style={{ border: '3px solid black', background: 'white', padding: '1rem', fontSize: '1.5rem', margin: '0.5rem 0' }}>
              <div style={{ display: 'flex', gap: '1rem' }}><span>3</span><span>0</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>0</span><span>2</span></div>
            </div>
          </div>

          <div style={{ fontSize: '2rem' }}>→</div>

          <div style={{ textAlign: 'center' }}>
            <div>Approximation (Rank {rank})</div>
            <div style={{ border: '3px solid black', background: 'var(--yellow)', padding: '1rem', fontSize: '1.5rem', margin: '0.5rem 0' }}>
              {rank === 2 ? (
                <>
                  <div style={{ display: 'flex', gap: '1rem' }}><span>3</span><span>0</span></div>
                  <div style={{ display: 'flex', gap: '1rem' }}><span>0</span><span>2</span></div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: '1rem' }}><span>3</span><span>0</span></div>
                  <div style={{ display: 'flex', gap: '1rem', opacity: 0.3 }}><span>0</span><span>0</span></div>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          <button className={`la-btn-sm ${rank === 1 ? 'active' : ''}`} onClick={() => setRank(1)}>Rank 1 Approximation</button>
          <button className={`la-btn-sm ${rank === 2 ? 'active' : ''}`} onClick={() => setRank(2)}>Full Rank (Rank 2)</button>
        </div>
      </div>
    </div>
  )
}

function PseudoinverseWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: '#c175ff', color: 'white' }}>4. The Pseudoinverse</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>What if a matrix isn't square or has no inverse? SVD allows us to compute the <strong>Pseudoinverse (A⁺)</strong> to solve least-squares problems like Ax ≈ b.</p>
        
        <div style={{ background: '#f5f0e8', border: '3px solid black', padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', margin: '1rem 0' }}>
          <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>A⁺ = V Σ⁺ Uᵀ</div>
          <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>(Σ⁺ is formed by taking the reciprocal of non-zero singular values)</div>
        </div>
      </div>
    </div>
  )
}

function ApplicationsWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: '#ff66a3' }}>5. Real-Life Applications</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>SVD is the driving force behind modern data compression and recommendation engines.</p>
        
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div className="neo-toggle-btn" style={{ background: 'var(--white)', color: 'black', flex: 1, padding: '2rem 1rem' }}>
            <i className="fa-regular fa-image" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--blue)' }}></i>
            <div className="neo-toggle-btn-title">Image Compression</div>
            <div className="neo-toggle-btn-sub">Images are huge matrices of pixels. By dropping small singular values, we compress images massively while keeping visual quality!</div>
          </div>

          <div className="neo-toggle-btn" style={{ background: 'var(--white)', color: 'black', flex: 1, padding: '2rem 1rem' }}>
            <i className="fa-solid fa-cart-shopping" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--yellow)' }}></i>
            <div className="neo-toggle-btn-title">Recommendation Systems</div>
            <div className="neo-toggle-btn-sub">Netflix and Amazon build user-item matrices. SVD finds "hidden patterns" to predict what movies or products you will like!</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReflectionsWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--black)', color: 'white' }}>6. Reflections (What I Learned)</div>
      
      <div className="neo-widget-container" style={{ background: '#f5f0e8' }}>
        <ul style={{ margin: 0, paddingLeft: '2rem', fontFamily: 'var(--font-main)', lineHeight: '1.8', fontWeight: '500' }}>
          <li>I learned how SVD breaks a matrix into simpler meaningful components.</li>
          <li>I understood how singular values represent importance of features.</li>
          <li>I realized how low-rank approximation helps in compressing data efficiently.</li>
          <li>The concept of pseudoinverse helped in solving systems without exact solutions.</li>
          <li>I saw how SVD is widely used in machine learning and data science.</li>
          <li>Applications like image compression and recommendation systems made the concept practical and interesting.</li>
          <li>This chapter helped me understand how to extract useful information from large datasets.</li>
        </ul>
      </div>
    </div>
  )
}

export default function Ch07Page() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
      <section className="la-hero" style={{ background: '#00e5ff', color: 'var(--black)' }}>
        <div className="la-hero-badge" style={{ background: 'var(--white)', color: 'var(--black)' }}>
          CH 07
        </div>
        <h1 className="la-hero-title">
          Singular Value <br/>Decomposition
        </h1>
        <p className="la-hero-sub" style={{ borderColor: 'transparent', color: 'var(--black)', fontWeight: 'bold', paddingLeft: 0 }}>
          SVD, pseudoinverse, data compression, and recommendation systems.
        </p>
      </section>

      {/* EXPERIMENTS */}
      <section className="la-section" style={{ padding: '4rem 2rem', background: '#fafafa' }}>
        <div className="la-section-inner" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <SVDEquationWidget />
          <SingularValuesWidget />
          <LowRankWidget />
          <PseudoinverseWidget />
          <ApplicationsWidget />
          <ReflectionsWidget />
        </div>
      </section>

    </div>
  )
}
