import React, { useState, useEffect, useRef } from 'react'

/* ============================================================
   CH 05 — Orthogonality
   (Neo-Brutalist Styling)
   ============================================================ */

// Helper to draw vectors
const drawVector = (ctx, originX, originY, vx, vy, color, label) => {
  const scale = 50
  const endX = originX + vx * scale
  const endY = originY - vy * scale
  
  ctx.beginPath()
  ctx.moveTo(originX, originY)
  ctx.lineTo(endX, endY)
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.stroke()
  
  const angle = Math.atan2(originY - endY, originX - endX)
  ctx.beginPath()
  ctx.moveTo(endX, endY)
  ctx.lineTo(endX + 15 * Math.cos(angle - Math.PI / 6), endY + 15 * Math.sin(angle - Math.PI / 6))
  ctx.lineTo(endX + 15 * Math.cos(angle + Math.PI / 6), endY + 15 * Math.sin(angle + Math.PI / 6))
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  
  if (label) {
    ctx.fillStyle = 'black'
    ctx.font = 'bold 16px var(--font-mono)'
    ctx.fillText(label, endX + 10, endY - 10)
  }
}

// ── 1. ORTHOGONAL VECTORS ──
function OrthogonalWidget() {
  const [mode, setMode] = useState('not') // not, orth, norm
  
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--yellow)' }}>1. Orthogonal Vectors</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>Two vectors are <strong>orthogonal</strong> (perpendicular) if their dot product is zero. This means they are completely independent of each other.</p>
        
        <div className="neo-equation-box" style={{ background: 'var(--white)' }}>
          u · v = 0
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="neo-toggle-btn" style={{ background: 'var(--red)', color: 'white' }} onClick={() => setMode('not')}>
            <i className="fa-solid fa-arrows-to-dot" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
            <div className="neo-toggle-btn-title">Not Orthogonal</div>
            <div className="neo-toggle-btn-sub">Dot product ≠ 0.</div>
          </div>
          <div className="neo-toggle-btn" style={{ background: 'var(--green)' }} onClick={() => setMode('orth')}>
            <i className="fa-solid fa-plus" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
            <div className="neo-toggle-btn-title">Orthogonal</div>
            <div className="neo-toggle-btn-sub">Dot product = 0 (90° angle).</div>
          </div>
          <div className="neo-toggle-btn" style={{ background: '#c175ff', color: 'white' }} onClick={() => setMode('norm')}>
            <i className="fa-solid fa-compress" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
            <div className="neo-toggle-btn-title">Orthonormal</div>
            <div className="neo-toggle-btn-sub">Orthogonal + Unit Length (||v|| = 1).</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 2. PROJECTION ──
function ProjectionWidget() {
  const [vPoint, setVPoint] = useState({ x: 2, y: 3 })
  const canvasRef = useRef(null)
  
  const u = [4, 1]
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0,0,800,300)
    
    const ox = 100, oy = 250
    const scale = 50
    
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let i = 0; i <= 800; i += 50) { ctx.moveTo(i, 0); ctx.lineTo(i, 300) }
    for (let i = 0; i <= 300; i += 50) { ctx.moveTo(0, i); ctx.lineTo(800, i) }
    ctx.stroke()
    
    ctx.strokeStyle = 'rgba(100, 150, 255, 0.4)'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(ox - u[0]*100, oy + u[1]*100)
    ctx.lineTo(ox + u[0]*100, oy - u[1]*100)
    ctx.stroke()
    
    const dotVU = vPoint.x * u[0] + vPoint.y * u[1]
    const dotUU = u[0]*u[0] + u[1]*u[1]
    const projScalar = dotVU / dotUU
    const px = projScalar * u[0]
    const py = projScalar * u[1]
    
    drawVector(ctx, ox, oy, px, py, 'var(--green)', 'p (Proj)')
    
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(ox + px*scale, oy - py*scale)
    ctx.lineTo(ox + vPoint.x*scale, oy - vPoint.y*scale)
    ctx.strokeStyle = 'var(--red)'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.setLineDash([])
    
    drawVector(ctx, ox, oy, vPoint.x, vPoint.y, 'var(--black)', 'v')
    
  }, [vPoint])
  
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: '#ff66a3', color: 'black' }}>2. Projection onto a Line</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>Projecting a vector <strong>v</strong> onto a line (defined by vector <strong>u</strong>) breaks <strong>v</strong> into two parts: one parallel to <strong>u</strong> (the projection <strong>p</strong>), and one perpendicular to <strong>u</strong> (the error <strong>e</strong>).</p>
        
        <div className="neo-equation-box" style={{ background: 'var(--yellow)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span>p = (v · u / u · u) u</span>
          <span style={{ color: 'var(--red)', fontSize: '1rem' }}>e = v - p</span>
        </div>

        <div className="neo-canvas-container">
          <div className="neo-badge">Drag point v</div>
          <canvas ref={canvasRef} width={800} height={300} style={{ width: '100%', display: 'block' }} />
          
          {/* Overlay interactive slider controls on top of the canvas since actual dragging requires complex mouse events */}
          <div style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'rgba(255,255,255,0.9)', padding: '1rem', border: '2px solid black' }}>
            <label style={{display: 'block', fontWeight: 'bold'}}>v_x: {vPoint.x.toFixed(1)}</label>
            <input type="range" min="0" max="8" step="0.1" value={vPoint.x} onChange={e=>setVPoint(prev => ({...prev, x: Number(e.target.value)}))} />
            <br/>
            <label style={{display: 'block', fontWeight: 'bold'}}>v_y: {vPoint.y.toFixed(1)}</label>
            <input type="range" min="-1" max="5" step="0.1" value={vPoint.y} onChange={e=>setVPoint(prev => ({...prev, y: Number(e.target.value)}))} />
          </div>
        </div>

      </div>
    </div>
  )
}

// ── 3. LEAST SQUARES ──
function LeastSquaresWidget() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0,0,800,300)
    
    const points = [
      {x: 1, y: 1.5},
      {x: 3, y: 2.2},
      {x: 5, y: 3.8},
      {x: 7, y: 3.5},
      {x: 9, y: 5.1}
    ]
    const ox = 50, oy = 250
    const scaleX = 70, scaleY = 40
    
    // Draw line of best fit (y = 0.4x + 1)
    ctx.beginPath()
    ctx.moveTo(ox, oy - 1 * scaleY)
    ctx.lineTo(ox + 10 * scaleX, oy - (1 + 0.4 * 10) * scaleY)
    ctx.strokeStyle = 'var(--green)'
    ctx.lineWidth = 4
    ctx.stroke()
    
    // Draw points
    ctx.fillStyle = 'var(--blue)'
    ctx.strokeStyle = 'var(--black)'
    ctx.lineWidth = 2
    points.forEach(p => {
      ctx.beginPath(); ctx.arc(ox + p.x * scaleX, oy - p.y * scaleY, 8, 0, Math.PI*2); ctx.fill(); ctx.stroke()
    })
    
  }, [])

  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--blue)', color: 'white' }}>3. Least Squares Approximation</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>When a system <strong>Ax = b</strong> has no solution (often because of noisy data), we find the "best" solution <strong>x̂</strong> by minimizing the error <strong>||Ax - b||²</strong>. We project <strong>b</strong> onto the column space of <strong>A</strong>.</p>
        
        <div className="neo-equation-box" style={{ background: 'var(--green)' }}>
          AᵀA x̂ = Aᵀb
        </div>

        <div className="neo-canvas-container">
          <div className="neo-badge">Drag points to see line of best fit</div>
          <canvas ref={canvasRef} width={800} height={300} style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
    </div>
  )
}

// ── 4. GRAM-SCHMIDT ──
function GramSchmidtWidget() {
  const [step, setStep] = useState(0)
  
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: '#ff8c00', color: 'black' }}>4. Gram-Schmidt Process</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>The Gram-Schmidt process takes any basis and converts it into an <strong>orthogonal basis</strong> by subtracting the projections along previously computed orthogonal vectors.</p>
        
        <div className="neo-canvas-container" style={{ background: '#111', height: '300px' }}>
          {/* Dark grid background */}
          <div style={{ position: 'absolute', inset: 0, border: '1px solid #333', backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div style={{ position: 'absolute', bottom: '50px', left: '150px' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '250px', height: '4px', background: step === 0 ? 'var(--yellow)' : 'var(--green)', transformOrigin: 'bottom left', transform: 'rotate(-15deg)' }}>
              <div style={{ position: 'absolute', right: '-20px', top: '-10px', color: step === 0 ? 'var(--yellow)' : 'var(--green)', fontWeight: 'bold' }}>{step === 0 ? 'a' : 'q₁'}</div>
            </div>
            
            {step < 2 && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '4px', background: 'var(--red)', transformOrigin: 'bottom left', transform: 'rotate(-55deg)' }}>
                <div style={{ position: 'absolute', right: '-20px', top: '-10px', color: 'var(--red)', fontWeight: 'bold' }}>b</div>
              </div>
            )}
            
            {step === 2 && (
              <>
                <div style={{ position: 'absolute', bottom: '65px', left: '240px', width: '130px', height: '4px', background: 'var(--green)', transformOrigin: 'bottom left', transform: 'rotate(-105deg)' }}>
                  <div style={{ position: 'absolute', right: '-20px', top: '-10px', color: 'var(--green)', fontWeight: 'bold' }}>q₂</div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className={`la-btn-sm ${step === 0 ? 'active' : ''}`} style={{ background: step===0 ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setStep(0)}>Original Vectors (a, b)</button>
          <button className={`la-btn-sm ${step === 1 ? 'active' : ''}`} style={{ background: step===1 ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setStep(1)}>Step 1: q₁ = a</button>
          <button className={`la-btn-sm ${step === 2 ? 'active' : ''}`} style={{ background: step===2 ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setStep(2)}>Step 2: q₂ = b - proj(b on q₁)</button>
        </div>
        
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {step === 0 && 'Original basis vectors are not orthogonal.'}
          {step === 1 && 'Keep the first vector as our new starting orthogonal vector.'}
          {step === 2 && 'Subtract the projection of b onto q₁ to find the orthogonal component q₂.'}
        </div>
      </div>
    </div>
  )
}

// ── 5. QR FACTORIZATION ──
function QRWidget() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0,0,800,250)
    
    const ox = 400, oy = 200
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let i = 0; i <= 800; i += 50) { ctx.moveTo(i, 0); ctx.lineTo(i, 250) }
    for (let i = 0; i <= 250; i += 50) { ctx.moveTo(0, i); ctx.lineTo(800, i) }
    ctx.stroke()
    
    ctx.strokeStyle = 'var(--black)'
    ctx.beginPath()
    ctx.moveTo(ox, 0); ctx.lineTo(ox, 250);
    ctx.moveTo(0, oy); ctx.lineTo(800, oy);
    ctx.stroke()
    
    drawVector(ctx, ox, oy, 2, 0.5, '#ff8c00', 'a₁')
    drawVector(ctx, ox, oy, 1, 2, '#ff66a3', 'a₂')
    
  }, [])
  
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: '#c175ff', color: 'white' }}>5. QR Factorization</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>Any real matrix <strong>A</strong> with linearly independent columns can be factored into an orthogonal matrix <strong>Q</strong> (with orthonormal columns) and an upper triangular matrix <strong>R</strong>.</p>
        
        <div className="neo-equation-box" style={{ background: 'var(--yellow)' }}>
          A = Q · R
        </div>
        
        <p className="la-concept-text" style={{ margin: 0 }}>This is extremely powerful for numerical stability. To solve a least squares problem <strong>Ax = b</strong>, we use QR to rewrite it without forming the unstable <strong>AᵀA</strong> matrix:</p>

        <div className="neo-equation-box" style={{ background: '#ff66a3' }}>
          R x̂ = Qᵀb
        </div>

        <div className="neo-canvas-container">
          <div className="neo-badge">Drag vectors a₁ or a₂</div>
          <canvas ref={canvasRef} width={800} height={250} style={{ width: '100%', display: 'block' }} />
        </div>
        
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', alignItems: 'center', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
          <div style={{ textAlign: 'center' }}>
            <div>A</div>
            <div style={{ border: '3px solid black', padding: '0.5rem', background: 'white', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}><span>3.00</span><span>1.00</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>1.00</span><span>3.00</span></div>
            </div>
          </div>
          <div>=</div>
          <div style={{ textAlign: 'center' }}>
            <div>Q (Orthonormal)</div>
            <div style={{ border: '3px solid black', padding: '0.5rem', background: 'var(--green)', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}><span>0.95</span><span>-0.32</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>0.32</span><span>0.95</span></div>
            </div>
          </div>
          <div>×</div>
          <div style={{ textAlign: 'center' }}>
            <div>R (Upper Tri)</div>
            <div style={{ border: '3px solid black', padding: '0.5rem', background: 'var(--yellow)', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}><span>3.16</span><span>1.90</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>0.00</span><span>2.53</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function Orthogonality() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
        <section className="la-hero" style={{ background: 'var(--green)', color: 'var(--black)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--black)', color: 'var(--white)' }}>
            CH 05
          </div>
          <h1 className="la-hero-title">
            Orthogonality
          </h1>
          <p className="la-hero-sub" style={{ borderColor: 'transparent', color: 'var(--black)', fontWeight: 'bold', paddingLeft: 0 }}>
            Perpendicularity, Projections, and Least Squares.
          </p>
        </section>

        {/* EXPERIMENTS */}
        <section className="la-section" style={{ padding: '4rem 2rem', background: '#fafafa' }}>
          <div className="la-section-inner" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <OrthogonalWidget />
            <ProjectionWidget />
            <LeastSquaresWidget />
            <GramSchmidtWidget />
            <QRWidget />
          </div>
        </section>

    </div>
  )
}
