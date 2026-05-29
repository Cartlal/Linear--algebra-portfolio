import React, { useState, useEffect, useRef } from 'react'

/* ============================================================
   CH 05 — Orthogonality
   ============================================================ */

// Helper to draw vectors
const drawVector = (ctx, originX, originY, vx, vy, color, label) => {
  const scale = 50
  const endX = originX + vx * scale
  const endY = originY - vy * scale // -vy because canvas y is down
  
  // Line
  ctx.beginPath()
  ctx.moveTo(originX, originY)
  ctx.lineTo(endX, endY)
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.stroke()
  
  // Arrow head
  const angle = Math.atan2(originY - endY, originX - endX)
  ctx.beginPath()
  ctx.moveTo(endX, endY)
  ctx.lineTo(endX + 15 * Math.cos(angle - Math.PI / 6), endY + 15 * Math.sin(angle - Math.PI / 6))
  ctx.lineTo(endX + 15 * Math.cos(angle + Math.PI / 6), endY + 15 * Math.sin(angle + Math.PI / 6))
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  
  // Label
  if (label) {
    ctx.fillStyle = 'black'
    ctx.font = 'bold 16px var(--font-mono)'
    ctx.fillText(label, endX + 10, endY - 10)
  }
}

// ── 1. ORTHOGONAL VECTORS ──
function OrthogonalWidget() {
  const [mode, setMode] = useState('not') // not, orth, norm
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0,0,400,300)
    
    // Draw Axes
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, 150); ctx.lineTo(400, 150)
    ctx.moveTo(200, 0); ctx.lineTo(200, 300)
    ctx.stroke()
    
    const ox = 200, oy = 150
    let u = [2, 1]
    let v = [-1, 1]
    
    if (mode === 'not') { v = [1, 2] }
    else if (mode === 'orth') { v = [-1, 2] }
    else if (mode === 'norm') { 
      // normalize
      const magU = Math.sqrt(u[0]*u[0] + u[1]*u[1])
      const magV = Math.sqrt(v[0]*v[0] + v[1]*v[1])
      u = [u[0]/magU, u[1]/magU]
      v = [-1/magV, 2/magV]
    }
    
    const dot = (u[0]*v[0] + u[1]*v[1]).toFixed(2)
    
    // Draw 90 deg box if orthogonal
    if (mode === 'orth' || mode === 'norm') {
      ctx.strokeStyle = 'rgba(0,0,0,0.3)'
      ctx.lineWidth = 2
      ctx.beginPath()
      const boxSize = 15
      // The box follows the vectors
      const uAngle = Math.atan2(u[1], u[0])
      const vAngle = Math.atan2(v[1], v[0])
      // Calculate box corners
      ctx.moveTo(ox + Math.cos(uAngle)*boxSize, oy - Math.sin(uAngle)*boxSize)
      ctx.lineTo(ox + Math.cos(uAngle)*boxSize + Math.cos(vAngle)*boxSize, oy - Math.sin(uAngle)*boxSize - Math.sin(vAngle)*boxSize)
      ctx.lineTo(ox + Math.cos(vAngle)*boxSize, oy - Math.sin(vAngle)*boxSize)
      ctx.stroke()
    }
    
    drawVector(ctx, ox, oy, u[0], u[1], 'var(--blue)', 'u')
    drawVector(ctx, ox, oy, v[0], v[1], 'var(--red)', 'v')
    
    // Text output
    ctx.fillStyle = 'var(--black)'
    ctx.font = 'bold 20px var(--font-mono)'
    ctx.fillText(`u · v = ${dot}`, 20, 30)
    if (mode === 'norm') ctx.fillText(`||u|| = 1, ||v|| = 1`, 20, 60)

  }, [mode])
  
  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>1. Orthogonal Vectors</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>Two vectors are orthogonal if their dot product is zero.</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
        <canvas ref={canvasRef} width={400} height={300} style={{ border: '3px solid var(--black)', background: '#fff' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className={`la-btn ${mode === 'not' ? 'active' : ''}`} onClick={()=>setMode('not')}>Not Orthogonal</button>
          <button className={`la-btn ${mode === 'orth' ? 'active' : ''}`} onClick={()=>setMode('orth')}>Orthogonal</button>
          <button className={`la-btn ${mode === 'norm' ? 'active' : ''}`} onClick={()=>setMode('norm')}>Orthonormal</button>
        </div>
      </div>
    </div>
  )
}

// ── 2. PROJECTION ──
function ProjectionWidget() {
  const [vPoint, setVPoint] = useState({ x: 2, y: 3 })
  const canvasRef = useRef(null)
  
  const u = [4, 1] // fixed line direction
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0,0,500,400)
    
    const ox = 100, oy = 300
    const scale = 50
    
    // Draw Axes
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, oy); ctx.lineTo(500, oy)
    ctx.moveTo(ox, 0); ctx.lineTo(ox, 400)
    ctx.stroke()
    
    // Line defined by u
    ctx.strokeStyle = 'rgba(255, 214, 0, 0.5)'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(ox - u[0]*100, oy + u[1]*100)
    ctx.lineTo(ox + u[0]*100, oy - u[1]*100)
    ctx.stroke()
    
    // Projection Math: p = (v·u / u·u) * u
    const dotVU = vPoint.x * u[0] + vPoint.y * u[1]
    const dotUU = u[0]*u[0] + u[1]*u[1]
    const projScalar = dotVU / dotUU
    const px = projScalar * u[0]
    const py = projScalar * u[1]
    
    // Error vector: e = v - p
    const ex = vPoint.x - px
    const ey = vPoint.y - py
    
    // Draw projection p
    drawVector(ctx, ox, oy, px, py, 'var(--green)', 'p')
    
    // Draw error e (from end of p to v)
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(ox + px*scale, oy - py*scale)
    ctx.lineTo(ox + vPoint.x*scale, oy - vPoint.y*scale)
    ctx.strokeStyle = 'var(--red)'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.setLineDash([])
    
    // Draw v
    drawVector(ctx, ox, oy, vPoint.x, vPoint.y, 'var(--blue)', 'v')
    
  }, [vPoint])
  
  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>2. Projection onto a Line</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>Projecting breaks v into two parts: parallel (p) and perpendicular (e).</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', gap: '2rem', padding: '2rem', alignItems: 'center' }}>
        <canvas ref={canvasRef} width={500} height={400} style={{ border: '3px solid var(--black)', background: '#fff' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '250px' }}>
          <div style={{ fontWeight: 'bold' }}>Move Vector v:</div>
          <label>v_x: {vPoint.x.toFixed(1)}</label>
          <input type="range" min="0" max="6" step="0.1" value={vPoint.x} onChange={e=>setVPoint(prev => ({...prev, x: Number(e.target.value)}))} />
          <label>v_y: {vPoint.y.toFixed(1)}</label>
          <input type="range" min="0" max="6" step="0.1" value={vPoint.y} onChange={e=>setVPoint(prev => ({...prev, y: Number(e.target.value)}))} />
          
          <div style={{ padding: '1rem', background: 'var(--black)', color: 'white', marginTop: '1rem' }}>
            <span style={{ color: 'var(--green)' }}>p = (v·u / u·u) u</span><br/>
            <span style={{ color: 'var(--red)' }}>e = v - p</span><br/>
            <span>v = p + e</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 3. LEAST SQUARES ──
function LeastSquaresWidget() {
  const [slopeOffset, setSlopeOffset] = useState(0) // Simulate minimizing error
  const canvasRef = useRef(null)
  
  // Data points
  const points = [
    {x: 1, y: 1.5},
    {x: 2, y: 2.2},
    {x: 3, y: 3.8},
    {x: 4, y: 3.5},
    {x: 5, y: 5.1}
  ]
  
  // True Best fit slope = 0.88, intercept = 0.4
  const trueSlope = 0.88
  const intercept = 0.4
  
  const currentSlope = trueSlope + slopeOffset
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0,0,500,300)
    
    const ox = 50, oy = 250
    const scaleX = 80, scaleY = 40
    
    // Draw line
    ctx.beginPath()
    ctx.moveTo(ox, oy - intercept * scaleY)
    ctx.lineTo(ox + 6 * scaleX, oy - (intercept + currentSlope * 6) * scaleY)
    ctx.strokeStyle = 'var(--blue)'
    ctx.lineWidth = 4
    ctx.stroke()
    
    // Draw errors
    let totalError = 0
    ctx.strokeStyle = 'var(--red)'
    ctx.lineWidth = 2
    points.forEach(p => {
      const lineY = intercept + currentSlope * p.x
      const err = p.y - lineY
      totalError += err * err
      
      ctx.beginPath()
      ctx.moveTo(ox + p.x * scaleX, oy - p.y * scaleY)
      ctx.lineTo(ox + p.x * scaleX, oy - lineY * scaleY)
      ctx.stroke()
    })
    
    // Draw points
    ctx.fillStyle = 'var(--black)'
    points.forEach(p => {
      ctx.beginPath(); ctx.arc(ox + p.x * scaleX, oy - p.y * scaleY, 6, 0, Math.PI*2); ctx.fill()
    })
    
    // Print Error
    ctx.fillStyle = 'var(--red)'
    ctx.font = 'bold 20px var(--font-mono)'
    ctx.fillText(`Error ||Ax-b||² = ${totalError.toFixed(2)}`, 20, 30)
    
  }, [slopeOffset])

  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>3. Least Squares Approximation</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>When Ax=b has no solution, minimize the error by projecting onto the column space.</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', gap: '2rem', padding: '2rem', alignItems: 'center' }}>
        <canvas ref={canvasRef} width={500} height={300} style={{ border: '3px solid var(--black)', background: '#fff' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '250px' }}>
          <label style={{ fontWeight: 'bold' }}>Tilt Line (Adjust Slope):</label>
          <input type="range" min="-1" max="1" step="0.05" value={slopeOffset} onChange={e=>setSlopeOffset(Number(e.target.value))} />
          
          <button className="la-btn" onClick={() => setSlopeOffset(0)}>Solve Normal Eq</button>
          
          <div style={{ padding: '1rem', background: 'var(--yellow)', border: '2px solid black' }}>
            <strong>AᵀA x̂ = Aᵀb</strong>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Solving this finds the exact slope that minimizes the red error lines.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 4. GRAM-SCHMIDT ──
function GramSchmidtWidget() {
  const [step, setStep] = useState(0) // 0: Original, 1: Step 1, 2: Step 2
  
  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>4. Gram-Schmidt Process</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>Converts any basis into an orthogonal basis.</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className={`la-btn ${step === 0 ? 'active' : ''}`} onClick={() => setStep(0)}>Original (a, b)</button>
          <button className={`la-btn ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>Step 1: q₁ = a</button>
          <button className={`la-btn ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}>Step 2: q₂ = b - p</button>
        </div>
        
        <div style={{ width: '400px', height: '300px', border: '3px solid var(--black)', background: '#fff', position: 'relative' }}>
          {/* Base visual representation using divs instead of canvas for variety */}
          <div style={{ position: 'absolute', bottom: '50px', left: '100px' }}>
            {/* Vector a / q1 */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '6px', background: step === 0 ? 'var(--blue)' : 'var(--green)', transformOrigin: 'bottom left', transform: 'rotate(-20deg)' }}>
              <div style={{ position: 'absolute', right: '-10px', top: '-25px', fontWeight: 'bold' }}>{step === 0 ? 'a' : 'q₁'}</div>
            </div>
            
            {/* Vector b */}
            {step < 2 && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '150px', height: '6px', background: 'var(--red)', transformOrigin: 'bottom left', transform: 'rotate(-60deg)' }}>
                <div style={{ position: 'absolute', right: '-10px', top: '-25px', fontWeight: 'bold' }}>b</div>
              </div>
            )}
            
            {/* Projection p */}
            {step === 2 && (
               <div style={{ position: 'absolute', bottom: 0, left: 0, width: '120px', height: '6px', background: 'var(--red)', opacity: 0.3, transformOrigin: 'bottom left', transform: 'rotate(-20deg)' }} />
            )}
            
            {/* Vector q2 */}
            {step === 2 && (
              <>
                <div style={{ position: 'absolute', bottom: '40px', left: '110px', width: '100px', height: '6px', background: 'var(--green)', transformOrigin: 'bottom left', transform: 'rotate(-110deg)' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-25px', fontWeight: 'bold' }}>q₂</div>
                </div>
                {/* Dotted line showing subtraction */}
                <div style={{ position: 'absolute', bottom: '40px', left: '110px', width: '100px', borderBottom: '3px dashed var(--black)', transformOrigin: 'bottom left', transform: 'rotate(180deg)' }} />
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── 5. QR FACTORIZATION ──
function QRWidget() {
  const [a1, setA1] = useState(3)
  const [a2, setA2] = useState(1)
  
  // A = [[a1, 1], [a2, 3]]
  // Compute QR manually for 2x2
  // u1 = a1_vec = [a1, a2]
  const magU1 = Math.sqrt(a1*a1 + a2*a2)
  const q1 = [a1/magU1, a2/magU1]
  
  // u2 = a2_vec - (a2_vec . q1) q1
  const a2_vec = [1, 3]
  const dot = a2_vec[0]*q1[0] + a2_vec[1]*q1[1]
  const u2 = [a2_vec[0] - dot*q1[0], a2_vec[1] - dot*q1[1]]
  const magU2 = Math.sqrt(u2[0]*u2[0] + u2[1]*u2[1])
  const q2 = [u2[0]/magU2, u2[1]/magU2]
  
  // R = [[q1.a1, q1.a2], [0, q2.a2]]
  const r11 = magU1 // q1.a1
  const r12 = dot   // q1.a2
  const r22 = magU2 // q2.a2
  
  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>5. QR Factorization</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>A = Q · R. Decompose A into an orthonormal matrix Q and upper triangular R.</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div>
            <label style={{ fontWeight: 'bold' }}>a₁ (Col 1, Row 1):</label>
            <input type="range" min="1" max="5" step="0.1" value={a1} onChange={e=>setA1(Number(e.target.value))} />
          </div>
          <div>
            <label style={{ fontWeight: 'bold' }}>a₂ (Col 1, Row 2):</label>
            <input type="range" min="1" max="5" step="0.1" value={a2} onChange={e=>setA2(Number(e.target.value))} />
          </div>
        </div>

        <div className="matrix-equation" style={{ fontSize: '1.2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <strong>A</strong>
            <div className="matrix-bracket" style={{ marginTop: '0.5rem', background: 'var(--yellow)' }}>
              <div className="matrix-col"><span>{a1.toFixed(2)}</span><span>{a2.toFixed(2)}</span></div>
              <div className="matrix-col"><span>1.00</span><span>3.00</span></div>
            </div>
          </div>
          
          <div>=</div>
          
          <div style={{ textAlign: 'center' }}>
            <strong>Q (Orthonormal)</strong>
            <div className="matrix-bracket" style={{ marginTop: '0.5rem', background: 'var(--blue)', color: 'white' }}>
              <div className="matrix-col"><span>{q1[0].toFixed(2)}</span><span>{q1[1].toFixed(2)}</span></div>
              <div className="matrix-col"><span>{q2[0].toFixed(2)}</span><span>{q2[1].toFixed(2)}</span></div>
            </div>
          </div>
          
          <div>×</div>
          
          <div style={{ textAlign: 'center' }}>
            <strong>R (Upper Tri)</strong>
            <div className="matrix-bracket" style={{ marginTop: '0.5rem', background: 'var(--green)' }}>
              <div className="matrix-col"><span>{r11.toFixed(2)}</span><span>0.00</span></div>
              <div className="matrix-col"><span>{r12.toFixed(2)}</span><span>{r22.toFixed(2)}</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


export default function Ch05Page() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
        <section className="la-hero" style={{ background: 'var(--green)', color: 'var(--black)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--black)', color: 'var(--white)' }}>
            <i className="fa-solid fa-ruler-combined" /> CH 05 · Orthogonality
          </div>
          <h1 className="la-hero-title">
            ORTHOGONALITY
          </h1>
          <p className="la-hero-sub" style={{ borderColor: 'var(--black)', color: 'var(--black)', fontWeight: 'bold' }}>
            Perpendicularity, Projections, and Least Squares.
          </p>
        </section>

        {/* EXPERIMENTS */}
        <section className="la-section" style={{ padding: '4rem 2rem', background: 'var(--cream)' }}>
          <div className="la-section-inner" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
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
