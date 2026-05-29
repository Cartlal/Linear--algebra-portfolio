import React, { useState, useEffect, useRef } from 'react'

/* ============================================================
   CH 06 — Eigenvalues & Eigenvectors
   (Neo-Brutalist Styling)
   ============================================================ */

function EigenvectorWidget() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0,0,800,250)
    
    const ox = 400, oy = 125
    const scale = 30
    
    // Draw Grid
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let i = 0; i <= 800; i += scale) { ctx.moveTo(i, 0); ctx.lineTo(i, 250) }
    for (let i = 0; i <= 250; i += scale) { ctx.moveTo(0, i); ctx.lineTo(800, i) }
    ctx.stroke()
    
    // Draw Axes
    ctx.strokeStyle = 'var(--black)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(ox, 0); ctx.lineTo(ox, 250)
    ctx.moveTo(0, oy); ctx.lineTo(800, oy)
    ctx.stroke()

    const drawVec = (vx, vy, color, label, width=4) => {
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.beginPath()
      ctx.moveTo(ox, oy)
      ctx.lineTo(ox + vx*scale, oy - vy*scale)
      ctx.stroke()
      ctx.fillStyle = color
      ctx.beginPath(); ctx.arc(ox + vx*scale, oy - vy*scale, 5, 0, Math.PI*2); ctx.fill()
      ctx.font = 'bold 14px var(--font-mono)'
      ctx.fillText(label, ox + vx*scale + 10, oy - vy*scale + 5)
    }

    // A random vector that changes direction
    drawVec(1, 2, '#aaa', 'v')
    drawVec(3, -1, '#aaa', 'Av')

    // An eigenvector (stays on same line)
    // Line spanning the eigenvector
    ctx.strokeStyle = 'rgba(255, 102, 163, 0.3)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(ox - 6*scale, oy - (-3)*scale)
    ctx.lineTo(ox + 6*scale, oy - (3)*scale)
    ctx.stroke()

    drawVec(2, 1, 'var(--blue)', 'x (Eigenvector)')
    drawVec(4, 2, 'var(--green)', 'Ax = λx (Scaled)')

  }, [])

  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--yellow)' }}>1. What is an Eigenvector?</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>An <strong>eigenvector</strong> is a vector that does not change direction under a linear transformation. It only gets scaled by a factor called the <strong>eigenvalue (λ)</strong>.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="neo-equation-box" style={{ background: '#f5f0e8', display: 'inline-block' }}>
            A <span style={{ color: 'var(--blue)' }}>v</span> = <span style={{ color: 'var(--green)' }}>λ</span> <span style={{ color: 'var(--blue)' }}>v</span>
          </div>
        </div>

        <div className="neo-canvas-container">
          <canvas ref={canvasRef} width={800} height={250} style={{ width: '100%', display: 'block' }} />
        </div>
        
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Most vectors (gray) get knocked off their original span. Eigenvectors (blue) stay on their line and just stretch (green).
        </div>
      </div>
    </div>
  )
}

function CharacteristicWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--blue)', color: 'white' }}>2. Characteristic Equation</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>To find the eigenvalues of a matrix A, we solve the characteristic equation: <strong>det(A − λI) = 0</strong>.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <div style={{ background: '#f0f0f0', padding: '1rem', border: '3px solid black', width: '100%', textAlign: 'center' }}>
            det<span style={{ fontSize: '1.5rem', margin: '0 0.5rem' }}>([</span>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem' }}><span>2-λ</span><span>0</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>0</span><span>3-λ</span></div>
            </div>
            <span style={{ fontSize: '1.5rem', margin: '0 0.5rem' }}>])</span> = 0
          </div>

          <div>↓</div>

          <div style={{ background: 'white', padding: '1rem', border: '3px solid black', width: '100%', textAlign: 'center' }}>
            (2 - λ)(3 - λ) - (0)(0) = 0
          </div>

          <div>↓</div>

          <div style={{ background: 'var(--yellow)', padding: '1rem', border: '3px solid black', width: '100%', textAlign: 'center' }}>
            λ₁ = 2, λ₂ = 3
          </div>
        </div>
        
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Once we have λ, we plug it back into (A - λI)v = 0 to find the corresponding eigenvectors!
        </div>
      </div>
    </div>
  )
}

function DiagonalizationWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--green)' }}>3. Diagonalization</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>If a matrix has enough independent eigenvectors, it can be diagonalized as <strong>A = PDP⁻¹</strong>. This makes raising a matrix to a high power incredibly fast!</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold', margin: '2rem 0', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div>A</div>
            <div style={{ border: '3px solid black', padding: '1rem', background: 'white', marginTop: '0.5rem', fontSize: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}><span>2</span><span>1</span></div>
              <div style={{ display: 'flex', gap: '1.5rem' }}><span>0</span><span>3</span></div>
            </div>
          </div>
          <div style={{ fontSize: '2rem' }}>=</div>
          <div style={{ textAlign: 'center' }}>
            <div>P (Eigenvectors)</div>
            <div style={{ border: '3px solid black', padding: '1rem', background: 'var(--blue)', color: 'white', marginTop: '0.5rem', fontSize: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}><span>1</span><span>1</span></div>
              <div style={{ display: 'flex', gap: '1.5rem' }}><span>0</span><span>1</span></div>
            </div>
          </div>
          <div style={{ fontSize: '2rem' }}>×</div>
          <div style={{ textAlign: 'center' }}>
            <div>D (Eigenvalues)</div>
            <div style={{ border: '3px solid black', padding: '1rem', background: 'var(--yellow)', marginTop: '0.5rem', fontSize: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}><span>2</span><span>0</span></div>
              <div style={{ display: 'flex', gap: '1.5rem' }}><span>0</span><span>3</span></div>
            </div>
          </div>
          <div style={{ fontSize: '2rem' }}>×</div>
          <div style={{ textAlign: 'center' }}>
            <div>P⁻¹</div>
            <div style={{ border: '3px solid black', padding: '1rem', background: 'white', marginTop: '0.5rem', fontSize: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}><span>1</span><span>-1</span></div>
              <div style={{ display: 'flex', gap: '1.5rem' }}><span>0</span><span>1</span></div>
            </div>
          </div>
        </div>

        <div style={{ background: '#f0f0f0', border: '2px dashed black', padding: '1rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
          <strong>A¹⁰⁰ = P · D¹⁰⁰ · P⁻¹</strong> <br />
          (D¹⁰⁰ is just 2¹⁰⁰ and 3¹⁰⁰ on the diagonal!)
        </div>
      </div>
    </div>
  )
}

function PowerMethodWidget() {
  const [iteration, setIteration] = useState(0)
  
  const vecs = [
    [1.0, 1.0],     // iter 0
    [3.0, 3.0],     // iter 1
    [6.0, 9.0],     // iter 2
    [12.0, 27.0],   // iter 3
    [24.0, 81.0],   // iter 4
    [48.0, 243.0]   // iter 5
  ]

  // normalized direction approximation
  const n = vecs[iteration]
  const maxVal = Math.max(n[0], n[1])
  const approx = [n[0]/maxVal, n[1]/maxVal]

  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: '#c175ff', color: 'white' }}>4. The Power Method</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>An iterative method to find the dominant eigenvalue. By repeatedly multiplying a random vector by A, it gets pulled towards the eigenvector with the largest eigenvalue!</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', gap: '2rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', marginBottom: '0.5rem' }}>v_{iteration}</div>
            <div style={{ border: '3px solid black', padding: '1rem', background: 'white', fontSize: '1.5rem', fontFamily: 'var(--font-mono)' }}>
              <div>{vecs[iteration][0]}</div>
              <div>{vecs[iteration][1]}</div>
            </div>
          </div>
          
          <div style={{ fontSize: '2rem' }}>→</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Normalized Approx</div>
            <div style={{ border: '3px solid black', padding: '1rem', background: 'var(--yellow)', fontSize: '1.5rem', fontFamily: 'var(--font-mono)' }}>
              <div>{approx[0].toFixed(2)}</div>
              <div>{approx[1].toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
          <button className="la-btn-sm" style={{ background: 'white' }} onClick={() => setIteration(Math.max(0, iteration - 1))} disabled={iteration === 0}>◀ Prev Iter</button>
          <div style={{ fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>Iter {iteration} / 5</div>
          <button className="la-btn-sm" style={{ background: 'white' }} onClick={() => setIteration(Math.min(5, iteration + 1))} disabled={iteration === 5}>Next Iter ▶</button>
        </div>
        
        <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '1rem' }}>
          The vector aligns closer and closer to [0, 1] (the dominant eigenvector).
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
        <p className="la-concept-text" style={{ margin: 0 }}>Eigenvalues are the hidden backbone of modern network analysis and physics.</p>
        
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div className="neo-toggle-btn" style={{ background: 'var(--white)', color: 'black', flex: 1, padding: '2rem 1rem' }}>
            <i className="fa-brands fa-google" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--blue)' }}></i>
            <div className="neo-toggle-btn-title">Google PageRank</div>
            <div className="neo-toggle-btn-sub">The entire internet is a matrix. PageRank finds the dominant eigenvector of the web graph to rank search results.</div>
          </div>

          <div className="neo-toggle-btn" style={{ background: 'var(--white)', color: 'black', flex: 1, padding: '2rem 1rem' }}>
            <i className="fa-solid fa-diagram-project" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--green)' }}></i>
            <div className="neo-toggle-btn-title">Markov Chains</div>
            <div className="neo-toggle-btn-sub">Eigenvalues predict the long-term "steady state" of probabilistic systems, like weather or stock markets.</div>
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
          <li>I learned that eigenvectors represent stable directions in transformations.</li>
          <li>I understood how eigenvalues scale vectors, which helps analyze system behavior.</li>
          <li>The characteristic equation helped me systematically find eigenvalues.</li>
          <li>I realized how diagonalization simplifies complex matrix computations.</li>
          <li>The power method showed how iterative techniques can solve large problems.</li>
          <li>I understood real-world applications like PageRank and Markov chains, which made the topic more interesting.</li>
          <li>This chapter connects strongly with machine learning, networks, and dynamic systems.</li>
        </ul>
      </div>
    </div>
  )
}

export default function Ch06Page() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
      <section className="la-hero" style={{ background: '#ff7b54', color: 'var(--black)' }}>
        <div className="la-hero-badge" style={{ background: 'var(--white)', color: 'var(--black)' }}>
          CH 06
        </div>
        <h1 className="la-hero-title">
          Eigenvalues & <br/><span style={{ color: 'var(--white)' }}>Eigenvectors</span>
        </h1>
        <p className="la-hero-sub" style={{ borderColor: 'transparent', color: 'var(--black)', fontWeight: 'bold', paddingLeft: 0 }}>
          Invariant directions, the characteristic equation, diagonalization, and PageRank.
        </p>
      </section>

      {/* EXPERIMENTS */}
      <section className="la-section" style={{ padding: '4rem 2rem', background: '#fafafa' }}>
        <div className="la-section-inner" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <EigenvectorWidget />
          <CharacteristicWidget />
          <DiagonalizationWidget />
          <PowerMethodWidget />
          <ApplicationsWidget />
          <ReflectionsWidget />
        </div>
      </section>

    </div>
  )
}
