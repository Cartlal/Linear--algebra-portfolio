import React, { useState, useEffect, useRef } from 'react'

/* ============================================================
   CH 03 — Solving Systems of Linear Equations
   (Neo-Brutalist Styling)
   ============================================================ */

// ── 1. ROW VS COLUMN PICTURE ──
function PictureWidget() {
  const [view, setView] = useState('row') // 'row' or 'col'
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

    if (view === 'row') {
      // Line 1: x + y = 4  => y = 4 - x
      ctx.strokeStyle = 'var(--blue)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(ox - 5*scale, oy - (4 - (-5))*scale)
      ctx.lineTo(ox + 5*scale, oy - (4 - 5)*scale)
      ctx.stroke()
      ctx.fillStyle = 'var(--blue)'
      ctx.fillText('x + y = 4', ox + 3.5*scale, oy - 1*scale)

      // Line 2: x - y = 2  => y = x - 2
      ctx.strokeStyle = '#ff66a3'
      ctx.beginPath()
      ctx.moveTo(ox - 3*scale, oy - (-3 - 2)*scale)
      ctx.lineTo(ox + 5*scale, oy - (5 - 2)*scale)
      ctx.stroke()
      ctx.fillStyle = '#ff66a3'
      ctx.fillText('x - y = 2', ox + 3.5*scale, oy - 2*scale)

      // Intersection (3, 1)
      ctx.fillStyle = 'var(--black)'
      ctx.beginPath(); ctx.arc(ox + 3*scale, oy - 1*scale, 6, 0, Math.PI*2); ctx.fill()
      ctx.font = 'bold 14px var(--font-mono)'
      ctx.fillText('(3, 1)', ox + 3.5*scale, oy - 1.2*scale)

    } else {
      // Column picture
      const drawVec = (vx, vy, color, label) => {
        ctx.strokeStyle = color
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(ox, oy)
        ctx.lineTo(ox + vx*scale, oy - vy*scale)
        ctx.stroke()
        // arrow head... simplified for now
        ctx.fillStyle = color
        ctx.beginPath(); ctx.arc(ox + vx*scale, oy - vy*scale, 5, 0, Math.PI*2); ctx.fill()
        ctx.fillText(label, ox + vx*scale + 5, oy - vy*scale - 5)
      }
      
      // Vector 1: x[1, 1] -> 3*[1, 1] = [3, 3]
      drawVec(3, 3, 'var(--blue)', '3 * col₁')
      
      // Vector 2 starting from end of Vector 1: y[1, -1] -> 1*[1, -1] = [1, -1]
      ctx.strokeStyle = '#ff66a3'
      ctx.beginPath()
      ctx.moveTo(ox + 3*scale, oy - 3*scale)
      ctx.lineTo(ox + (3+1)*scale, oy - (3-1)*scale)
      ctx.stroke()
      ctx.fillStyle = '#ff66a3'
      ctx.beginPath(); ctx.arc(ox + 4*scale, oy - 2*scale, 5, 0, Math.PI*2); ctx.fill()
      ctx.fillText('1 * col₂', ox + 4*scale + 5, oy - 2*scale - 5)

      // Result b = [4, 2]
      drawVec(4, 2, 'var(--green)', 'b')
    }
  }, [view])

  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--yellow)' }}>1. Row Picture vs Column Picture</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>Every system <strong>Ax = b</strong> can be viewed two ways:</p>
        <ul style={{ margin: 0, paddingLeft: '2rem', fontFamily: 'var(--font-main)', lineHeight: '1.6' }}>
          <li><strong>Row Picture:</strong> Each equation is a line (or plane). The solution is where they intersect.</li>
          <li><strong>Column Picture:</strong> Can we combine the columns of A to reach b?</li>
        </ul>

        <div className="neo-canvas-container">
          <canvas ref={canvasRef} width={800} height={250} style={{ width: '100%', display: 'block' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className={`la-btn-sm ${view === 'row' ? 'active' : ''}`} style={{ background: view==='row' ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setView('row')}>Row Picture</button>
          <button className={`la-btn-sm ${view === 'col' ? 'active' : ''}`} style={{ background: view==='col' ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setView('col')}>Column Picture</button>
        </div>
        
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {view === 'row' ? 'Each line is one equation. The intersection point is the solution.' : 'Scaling and adding column vectors to reach the target vector b.'}
        </div>
      </div>
    </div>
  )
}

// ── 2. GAUSSIAN ELIMINATION ──
function GaussianWidget() {
  const [step, setStep] = useState(0)
  
  const steps = [
    { m: [[3, 2, 1, 610], [2, 3, 2, 720], [1, 1, 1, 280]], desc: "Original augmented matrix [A|b]" },
    { m: [[3, 2, 1, 610], [0, 1.67, 1.33, 313.33], [0, 0.33, 0.67, 76.67]], desc: "Eliminate x from Rows 2 and 3 using Pivot 1" },
    { m: [[3, 2, 1, 610], [0, 1.67, 1.33, 313.33], [0, 0, 0.4, 14]], desc: "Eliminate y from Row 3 using Pivot 2 (Row Echelon Form)" },
    { m: [[1, 0, 0, 40], [0, 1, 0, 160], [0, 0, 1, 35]], desc: "Back-substitution (Reduced Row Echelon Form) => Solution found!" }
  ]
  
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: '#ff66a3' }}>2. Gaussian Elimination: Step-by-Step</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>We use <strong>elementary row operations</strong> to reduce an augmented matrix to Row Echelon Form (REF), then solve by back-substitution.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <div style={{ border: '3px solid var(--black)', padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', gap: '5px', background: 'var(--white)' }}>
            {steps[step].m.map((row, ri) => 
              row.map((val, ci) => (
                <div key={`${ri}-${ci}`} style={{ 
                  height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  border: '2px solid var(--black)', 
                  background: ci === 3 ? '#f0f0f0' : 'white',
                  fontWeight: 'bold', fontFamily: 'var(--font-mono)'
                }}>
                  {Number.isInteger(val) ? val : val.toFixed(1)}
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
          <button className="la-btn-sm" style={{ background: 'white' }} onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>◀ Prev</button>
          <div style={{ fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>Step {step} / 3</div>
          <button className="la-btn-sm" style={{ background: 'white' }} onClick={() => setStep(Math.min(3, step + 1))} disabled={step === 3}>Next ▶</button>
        </div>
        
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {steps[step].desc}
        </div>
      </div>
    </div>
  )
}

// ── 3. RANK CLASSIFICATION ──
function RankClassificationWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--blue)', color: 'white' }}>3. Rank & Solution Classification</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>The <strong>rank</strong> of a matrix tells us how many independent equations we actually have. This determines whether a system has <strong>one solution, infinitely many, or no solution.</strong></p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          
          <div className="neo-toggle-btn" style={{ background: 'var(--green)', color: 'black', flex: 1, padding: '2rem 1rem' }}>
            <i className="fa-solid fa-xmark" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
            <div className="neo-toggle-btn-title">Unique Solution</div>
            <div className="neo-toggle-btn-sub" style={{ fontFamily: 'var(--font-mono)' }}>rank(A) = rank([A|b]) = n</div>
          </div>

          <div className="neo-toggle-btn" style={{ background: 'var(--yellow)', color: 'black', flex: 1, padding: '2rem 1rem' }}>
            <i className="fa-solid fa-infinity" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
            <div className="neo-toggle-btn-title">Infinite Solutions</div>
            <div className="neo-toggle-btn-sub" style={{ fontFamily: 'var(--font-mono)' }}>rank(A) = rank([A|b]) &lt; n</div>
          </div>

          <div className="neo-toggle-btn" style={{ background: '#ff66a3', color: 'black', flex: 1, padding: '2rem 1rem' }}>
            <i className="fa-solid fa-equals" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
            <div className="neo-toggle-btn-title">No Solution</div>
            <div className="neo-toggle-btn-sub" style={{ fontFamily: 'var(--font-mono)' }}>rank(A) &lt; rank([A|b])</div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── 4. PIVOT VS FREE VARIABLES ──
function PivotFreeWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: '#c175ff', color: 'white' }}>4. Pivot vs Free Variables</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>After reducing to RREF, columns with leading 1s give <span style={{ background: 'var(--yellow)', padding: '0 5px', border: '1px solid black' }}>pivot variables</span> (determined). Columns without are <span style={{ background: '#c175ff', color: 'white', padding: '0 5px', border: '1px solid black' }}>free variables</span> (can be anything).</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
          <table style={{ borderCollapse: 'collapse', border: '3px solid black', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: '#f0f0f0', borderBottom: '2px solid black' }}>
                <th style={{ padding: '0.5rem 1rem', borderRight: '1px solid black' }}>x₁</th>
                <th style={{ padding: '0.5rem 1rem', borderRight: '1px solid black' }}>x₂</th>
                <th style={{ padding: '0.5rem 1rem', borderRight: '3px solid black' }}>x₃</th>
                <th style={{ padding: '0.5rem 1rem' }}>b</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem 1rem', background: 'var(--yellow)', borderRight: '1px solid black', fontWeight: 'bold' }}>1</td>
                <td style={{ padding: '0.5rem 1rem', borderRight: '1px solid black' }}>0</td>
                <td style={{ padding: '0.5rem 1rem', background: '#c175ff', color: 'white', borderRight: '3px solid black' }}>2</td>
                <td style={{ padding: '0.5rem 1rem' }}>3</td>
              </tr>
              <tr style={{ borderTop: '1px solid black' }}>
                <td style={{ padding: '0.5rem 1rem', borderRight: '1px solid black' }}>0</td>
                <td style={{ padding: '0.5rem 1rem', background: 'var(--yellow)', borderRight: '1px solid black', fontWeight: 'bold' }}>1</td>
                <td style={{ padding: '0.5rem 1rem', background: '#c175ff', color: 'white', borderRight: '3px solid black' }}>1</td>
                <td style={{ padding: '0.5rem 1rem' }}>2</td>
              </tr>
              <tr style={{ borderTop: '1px solid black' }}>
                <td style={{ padding: '0.5rem 1rem', borderRight: '1px solid black' }}>0</td>
                <td style={{ padding: '0.5rem 1rem', borderRight: '1px solid black' }}>0</td>
                <td style={{ padding: '0.5rem 1rem', background: '#c175ff', color: 'white', borderRight: '3px solid black' }}>0</td>
                <td style={{ padding: '0.5rem 1rem' }}>0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
          x₃ is free (can be any value t). Then: x₁ = 3 - 2t, x₂ = 2 - t → Infinitely many solutions.
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="la-btn-sm" style={{ background: 'var(--yellow)' }}>Pivot column</button>
          <button className="la-btn-sm" style={{ background: '#c175ff', color: 'white' }}>Free column</button>
        </div>
      </div>
    </div>
  )
}

// ── 5. LU FACTORIZATION ──
function LUWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--green)' }}>5. LU Factorization: Solve Once, Reuse Forever</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>Instead of re-doing elimination for every new <strong>b</strong>, we factor <strong>A = LU</strong> once. Then solving <strong>Ax = b</strong> becomes two easy triangular solves:</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
          <div style={{ background: 'var(--blue)', color: 'white', padding: '0.5rem 1rem', border: '3px solid black' }}>Ly = b</div>
          <span>→</span>
          <div style={{ background: 'var(--green)', padding: '0.5rem 1rem', border: '3px solid black' }}>Ux = y</div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', fontFamily: 'var(--font-mono)', fontWeight: 'bold', margin: '2rem 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div>A</div>
            <div style={{ border: '3px solid black', padding: '0.5rem', background: 'white', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}><span>1</span><span>1</span><span>1</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>2</span><span>3</span><span>2</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>1</span><span>1</span><span>1</span></div>
            </div>
          </div>
          <div>=</div>
          <div style={{ textAlign: 'center' }}>
            <div>L</div>
            <div style={{ border: '3px solid black', padding: '0.5rem', background: 'var(--blue)', color: 'white', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}><span>1</span><span>0</span><span>0</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>2</span><span>1</span><span>0</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>1</span><span>0</span><span>1</span></div>
            </div>
          </div>
          <div>×</div>
          <div style={{ textAlign: 'center' }}>
            <div>U</div>
            <div style={{ border: '3px solid black', padding: '0.5rem', background: 'var(--green)', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}><span>1</span><span>1</span><span>1</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>0</span><span>1</span><span>0</span></div>
              <div style={{ display: 'flex', gap: '1rem' }}><span>0</span><span>0</span><span>0</span></div>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          <i className="fa-solid fa-triangle-exclamation"></i> L stores the multipliers used during elimination. U is the REF result.
        </div>
      </div>
    </div>
  )
}

// ── 6. NETWORK BANDWIDTH ──
function NetworkWidget() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0,0,800,200)
    
    const w = 800
    const nodeY = 100
    
    // Edges
    ctx.strokeStyle = 'var(--black)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(200, 150); ctx.lineTo(400, 50); // y to x
    ctx.moveTo(400, 50); ctx.lineTo(600, 150); // x to z
    ctx.moveTo(200, 150); ctx.lineTo(600, 150); // y to z
    ctx.stroke()
    
    // Label for y-z edge
    ctx.fillStyle = 'black'
    ctx.font = '12px var(--font-mono)'
    ctx.fillText('Total: 100 Mbps', 360, 165)
    
    const drawNode = (x, y, val, label, color) => {
      ctx.fillStyle = color
      ctx.beginPath(); ctx.arc(x, y, 30, 0, Math.PI*2); ctx.fill()
      ctx.strokeStyle = 'var(--black)'
      ctx.lineWidth = 3
      ctx.stroke()
      
      ctx.fillStyle = color === 'var(--blue)' ? 'white' : 'black'
      ctx.font = 'bold 16px var(--font-mono)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${label} = ${val}`, x, y)
    }
    
    drawNode(400, 50, 40, 'x', 'var(--blue)')
    drawNode(200, 150, 30, 'y', '#ff66a3')
    drawNode(600, 150, 30, 'z', '#c175ff')
    
  }, [])

  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--yellow)' }}>6. Application: Network Bandwidth</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>Data packets flow through three router nodes <strong>x, y, z</strong>. We know:</p>
        <ul style={{ margin: 0, paddingLeft: '2rem', fontFamily: 'var(--font-main)', lineHeight: '1.6' }}>
          <li>Total bandwidth: x + y + z = 100 Mbps</li>
          <li>Node x processes 10 Mbps more than y: x - y = 10</li>
          <li>Combined y and z: y + z = 60</li>
        </ul>

        <div className="neo-canvas-container">
          <canvas ref={canvasRef} width={800} height={200} style={{ width: '100%', display: 'block' }} />
        </div>
        
        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
          Solution: x = 40, y = 30, z = 30 Mbps
        </div>
      </div>
    </div>
  )
}

export default function Ch03Page() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
        <section className="la-hero" style={{ background: 'var(--green)', color: 'var(--black)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--white)', color: 'var(--black)' }}>
            CH 03
          </div>
          <h1 className="la-hero-title">
            Solving Systems of Linear Equations
          </h1>
          <p className="la-hero-sub" style={{ borderColor: 'transparent', color: 'var(--black)', fontWeight: 'bold', paddingLeft: 0 }}>
            Gaussian elimination, rank, pivots, and the geometry of solutions.
          </p>
        </section>

        {/* EXPERIMENTS */}
        <section className="la-section" style={{ padding: '4rem 2rem', background: '#fafafa' }}>
          <div className="la-section-inner" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <PictureWidget />
            <GaussianWidget />
            <RankClassificationWidget />
            <PivotFreeWidget />
            <LUWidget />
            <NetworkWidget />
          </div>
        </section>

    </div>
  )
}
