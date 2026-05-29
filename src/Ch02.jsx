import React, { useState, useEffect, useRef } from 'react'

/* ============================================================
   CH 02 — Matrices as System Operators
   ============================================================ */

function drawGridAndShape(ctx, width, height, matrix, shape = 'house') {
  ctx.clearRect(0, 0, width, height)
  ctx.save()
  
  // Move origin to center
  ctx.translate(width / 2, height / 2)
  
  // Flip Y so positive is up
  ctx.scale(1, -1)
  
  const scale = 40 // pixels per unit
  
  // Draw Grid
  ctx.strokeStyle = 'rgba(0,0,0,0.1)'
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let i = -10; i <= 10; i++) {
    ctx.moveTo(i * scale, -10 * scale)
    ctx.lineTo(i * scale, 10 * scale)
    ctx.moveTo(-10 * scale, i * scale)
    ctx.lineTo(10 * scale, i * scale)
  }
  ctx.stroke()
  
  // Draw Axes
  ctx.strokeStyle = 'rgba(0,0,0,0.8)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, -10 * scale)
  ctx.lineTo(0, 10 * scale)
  ctx.moveTo(-10 * scale, 0)
  ctx.lineTo(10 * scale, 0)
  ctx.stroke()
  
  // Apply Transformation Matrix
  // DOMMatrix: a c e
  //            b d f
  // ctx.transform(a, b, c, d, e, f)
  // matrix is [m00, m01, m10, m11] -> [a, c, b, d]
  ctx.transform(matrix[0], matrix[2], matrix[1], matrix[3], 0, 0)
  
  // Draw Shape
  ctx.lineWidth = 3
  if (shape === 'house') {
    ctx.fillStyle = 'rgba(255, 214, 0, 0.5)'
    ctx.strokeStyle = '#0a0a0a'
    ctx.beginPath()
    ctx.moveTo(0 * scale, 0 * scale)
    ctx.lineTo(2 * scale, 0 * scale)
    ctx.lineTo(2 * scale, 2 * scale)
    ctx.lineTo(1 * scale, 3 * scale)
    ctx.lineTo(0 * scale, 2 * scale)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  } else if (shape === 'F') {
    ctx.fillStyle = 'rgba(26, 26, 255, 0.5)'
    ctx.strokeStyle = '#0a0a0a'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(1 * scale, 0)
    ctx.lineTo(1 * scale, 1.5 * scale)
    ctx.lineTo(2 * scale, 1.5 * scale)
    ctx.lineTo(2 * scale, 2.5 * scale)
    ctx.lineTo(1 * scale, 2.5 * scale)
    ctx.lineTo(1 * scale, 3.5 * scale)
    ctx.lineTo(2.5 * scale, 3.5 * scale)
    ctx.lineTo(2.5 * scale, 4.5 * scale)
    ctx.lineTo(0, 4.5 * scale)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }
  
  ctx.restore()
}

// ── 1. DUAL VIEWS ──
function DualViewsWidget() {
  const [view, setView] = useState('row')
  const [vx, setVx] = useState(2)
  const [vy, setVy] = useState(1)
  
  const m = [[2, 1], [1, 3]]
  const outX = m[0][0] * vx + m[0][1] * vy
  const outY = m[1][0] * vx + m[1][1] * vy

  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 className="la-exp-title">1. Multiplication: The Dual Views</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>A matrix is more than a grid of numbers; it's a machine that takes a vector as input and produces a new vector as output.</p>
      </div>
      
      <div className="subcard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button className={`la-btn ${view === 'row' ? 'active' : ''}`} onClick={() => setView('row')}>Row View (Dot Products)</button>
          <button className={`la-btn ${view === 'col' ? 'active' : ''}`} onClick={() => setView('col')}>Column View (Basis Expansion)</button>
        </div>

        <div className="matrix-equation" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '1.5rem', fontFamily: 'var(--font-mono)' }}>
          {/* Matrix */}
          <div className="matrix-bracket">
            <div className="matrix-col">
              <span className={view === 'col' ? 'highlight-yellow' : (view === 'row' ? 'highlight-blue' : '')}>{m[0][0]}</span>
              <span className={view === 'col' ? 'highlight-yellow' : ''}>{m[1][0]}</span>
            </div>
            <div className="matrix-col">
              <span className={view === 'col' ? 'highlight-red' : (view === 'row' ? 'highlight-blue' : '')}>{m[0][1]}</span>
              <span className={view === 'col' ? 'highlight-red' : ''}>{m[1][1]}</span>
            </div>
          </div>
          
          <div>×</div>
          
          {/* Vector input */}
          <div className="matrix-bracket">
            <div className="matrix-col">
              <input type="number" value={vx} onChange={e => setVx(Number(e.target.value))} className={`matrix-input ${view === 'col' ? 'highlight-yellow' : ''}`} />
              <input type="number" value={vy} onChange={e => setVy(Number(e.target.value))} className={`matrix-input ${view === 'col' ? 'highlight-red' : ''}`} />
            </div>
          </div>
          
          <div>=</div>
          
          {/* Output */}
          <div className="matrix-bracket">
            <div className="matrix-col">
              <span className={view === 'row' ? 'highlight-blue' : ''}>{outX}</span>
              <span>{outY}</span>
            </div>
          </div>
        </div>

        <div className="explanation-box" style={{ background: 'rgba(0,0,0,0.05)', padding: '1.5rem', border: '2px solid var(--black)', width: '100%', maxWidth: '600px' }}>
          {view === 'row' ? (
            <div>
              <strong>Row View:</strong> The output is the dot product of each matrix row with the vector.<br/><br/>
              y₁ = <span className="highlight-blue">[{m[0][0]}, {m[0][1]}]</span> · [{vx}, {vy}] = {m[0][0]*vx} + {m[0][1]*vy} = {outX} <br/>
              y₂ = [{m[1][0]}, {m[1][1]}] · [{vx}, {vy}] = {m[1][0]*vx} + {m[1][1]*vy} = {outY}
            </div>
          ) : (
            <div>
              <strong>Column View:</strong> The output is a linear combination of the matrix columns scaled by the vector components.<br/><br/>
              Result = <span className="highlight-yellow">{vx}</span> * <span className="highlight-yellow">[{m[0][0]}, {m[1][0]}]</span> + <span className="highlight-red">{vy}</span> * <span className="highlight-red">[{m[0][1]}, {m[1][1]}]</span><br/>
              Result = [{m[0][0]*vx}, {m[1][0]*vx}] + [{m[0][1]*vy}, {m[1][1]*vy}] = [{outX}, {outY}]
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── 2. TRANSFORMATION PLAYGROUND ──
function TransformationWidget() {
  const canvasRef = useRef(null)
  const [matrix, setMatrix] = useState([1, 0, 0, 1]) // [m00, m01, m10, m11]
  
  useEffect(() => {
    if (canvasRef.current) {
      drawGridAndShape(canvasRef.current.getContext('2d'), 600, 400, matrix, 'house')
    }
  }, [matrix])

  const determinant = (matrix[0] * matrix[3] - matrix[1] * matrix[2]).toFixed(2)

  const presets = {
    'Identity': [1, 0, 0, 1],
    'Scale 2x': [2, 0, 0, 2],
    'Rotate 45°': [0.707, -0.707, 0.707, 0.707],
    'Shear': [1, 1, 0, 1],
    'Reflect X': [1, 0, 0, -1],
    'Collapse (Det=0)': [1, 1, 1, 1]
  }

  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 className="la-exp-title">2. The Transformation Playground</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>A matrix warps space. Every point in the grid is moved to a new position. We call this a Linear Transformation.</p>
      </div>
      <div className="subcard-content" style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '2rem' }}>
        <canvas ref={canvasRef} width={600} height={400} style={{ width: '100%', background: '#fff', border: '3px solid var(--black)' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '0.5rem' }}>Presets</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Object.entries(presets).map(([name, m]) => (
              <button key={name} className="la-btn-sm" onClick={() => setMatrix(m)}>{name}</button>
            ))}
          </div>
          
          <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>Current Matrix</div>
          <div className="matrix-bracket" style={{ alignSelf: 'flex-start' }}>
            <div className="matrix-col">
              <input type="number" step="0.1" value={matrix[0]} onChange={e=>setMatrix([Number(e.target.value), matrix[1], matrix[2], matrix[3]])} className="matrix-input-sm" />
              <input type="number" step="0.1" value={matrix[2]} onChange={e=>setMatrix([matrix[0], matrix[1], Number(e.target.value), matrix[3]])} className="matrix-input-sm" />
            </div>
            <div className="matrix-col">
              <input type="number" step="0.1" value={matrix[1]} onChange={e=>setMatrix([matrix[0], Number(e.target.value), matrix[2], matrix[3]])} className="matrix-input-sm" />
              <input type="number" step="0.1" value={matrix[3]} onChange={e=>setMatrix([matrix[0], matrix[1], matrix[2], Number(e.target.value)])} className="matrix-input-sm" />
            </div>
          </div>
          
          <div style={{ marginTop: '0.5rem', background: determinant == 0 ? '#ffcccc' : '#e6ffe6', padding: '0.5rem', border: '1px solid black' }}>
            <strong>Determinant:</strong> {determinant}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 3. PIPELINE ──
function CompositionWidget() {
  const canvasRef = useRef(null)
  const [order, setOrder] = useState('AB') // 'A', 'B', 'AB', 'BA', 'I'
  
  const A = [1, 1, 0, 1] // Shear X
  const B = [0, -1, 1, 0] // Rotate 90
  
  // Multiply M1 * M2
  const multiply = (m1, m2) => [
    m1[0]*m2[0] + m1[1]*m2[2], // 00
    m1[0]*m2[1] + m1[1]*m2[3], // 01
    m1[2]*m2[0] + m1[3]*m2[2], // 10
    m1[2]*m2[1] + m1[3]*m2[3]  // 11
  ]

  useEffect(() => {
    let finalMatrix = [1, 0, 0, 1]
    if (order === 'A') finalMatrix = A
    else if (order === 'B') finalMatrix = B
    else if (order === 'AB') finalMatrix = multiply(A, B) // Apply B then A
    else if (order === 'BA') finalMatrix = multiply(B, A) // Apply A then B

    if (canvasRef.current) {
      drawGridAndShape(canvasRef.current.getContext('2d'), 600, 400, finalMatrix, 'F')
    }
  }, [order])

  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 className="la-exp-title">3. Matrix Composition: The Pipeline</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>When you apply multiple matrices in sequence, you are creating a computational pipeline. IMPORTANT: Matrix Multiplication is NOT Commutative. AB ≠ BA.</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', gap: '2rem' }}>
        <canvas ref={canvasRef} width={500} height={400} style={{ width: '100%', maxWidth: '500px', background: '#fff', border: '3px solid var(--black)' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          <div style={{ padding: '1rem', background: 'var(--yellow)', border: '2px solid black' }}>
            <strong>Matrix A:</strong> Shear X<br/>
            <strong>Matrix B:</strong> Rotate 90°
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className={`la-btn ${order === 'I' ? 'active' : ''}`} onClick={() => setOrder('I')}>Original (Identity)</button>
            <button className={`la-btn ${order === 'A' ? 'active' : ''}`} onClick={() => setOrder('A')}>Apply A only</button>
            <button className={`la-btn ${order === 'B' ? 'active' : ''}`} onClick={() => setOrder('B')}>Apply B only</button>
            <button className={`la-btn ${order === 'AB' ? 'active' : ''}`} onClick={() => setOrder('AB')} style={{ border: '2px solid blue' }}>Apply B then A (A × B)</button>
            <button className={`la-btn ${order === 'BA' ? 'active' : ''}`} onClick={() => setOrder('BA')} style={{ border: '2px solid red' }}>Apply A then B (B × A)</button>
          </div>
          
          <div style={{ color: 'var(--red)', fontWeight: 'bold' }}>
            Watch how the "F" ends up in a different place depending on the order!
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 4. INVERSE ──
function InverseWidget() {
  const canvasRef = useRef(null)
  const [state, setState] = useState('I') // I, Warp
  
  const warpMatrix = [1.5, 0.5, 0.5, 1.2]
  const det = warpMatrix[0]*warpMatrix[3] - warpMatrix[1]*warpMatrix[2]
  const invMatrix = [
    warpMatrix[3]/det, -warpMatrix[1]/det,
    -warpMatrix[2]/det, warpMatrix[0]/det
  ]

  useEffect(() => {
    if (canvasRef.current) {
      drawGridAndShape(canvasRef.current.getContext('2d'), 600, 300, state === 'I' ? [1,0,0,1] : warpMatrix, 'house')
    }
  }, [state])

  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>4. Inverse: Undoing Computation</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>If a matrix A transforms data, the Inverse A⁻¹ is the machine that reverses it. It's the mathematical "Undo" button.</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
        <canvas ref={canvasRef} width={600} height={300} style={{ width: '100%', maxWidth: '600px', background: '#fff', border: '3px solid var(--black)' }} />
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className={`la-btn ${state === 'Warp' ? 'active' : ''}`} onClick={() => setState('Warp')}>Apply Warp (A)</button>
          <button className={`la-btn ${state === 'I' ? 'active' : ''}`} onClick={() => setState('I')}>Apply Inverse (A⁻¹)</button>
        </div>
        
        <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold', marginTop: '1rem' }}>
          A × A⁻¹ = I
        </div>
      </div>
    </div>
  )
}

// ── 5. DATA IN ACTION (TECH FACTORY) ──
function TechFactoryWidget() {
  const [laptops, setLaptops] = useState(5)
  const [phones, setPhones] = useState(10)
  const [watches, setWatches] = useState(3)
  
  // Matrix rows: [Microchips, Screens, Batteries]
  // Columns: [Laptops, Phones, Watches]
  const m = [
    [2, 1, 1], // Chips
    [1, 1, 1], // Screens
    [2, 1, 0]  // Batteries (watches might not need huge custom battery packs in this simplified model, or 0 just for math demo)
  ]
  
  const chips = m[0][0]*laptops + m[0][1]*phones + m[0][2]*watches
  const screens = m[1][0]*laptops + m[1][1]*phones + m[1][2]*watches
  const batteries = m[2][0]*laptops + m[2][1]*phones + m[2][2]*watches

  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>5. Data in Action: Tech Factory Matrix</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>Matrices allow us to perform many calculations at once. A tech factory uses a matrix to track components needed for different devices.</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        
        <table style={{ borderCollapse: 'collapse', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr>
              <th style={{ border: '2px solid black', padding: '8px' }}>Device →<br/>Parts ↓</th>
              <th style={{ border: '2px solid black', padding: '8px', color: 'blue' }}>Laptops</th>
              <th style={{ border: '2px solid black', padding: '8px', color: 'red' }}>Phones</th>
              <th style={{ border: '2px solid black', padding: '8px', color: 'green' }}>Watches</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '2px solid black', padding: '8px', fontWeight: 'bold' }}>Chips</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{m[0][0]}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{m[0][1]}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{m[0][2]}</td>
            </tr>
            <tr>
              <td style={{ border: '2px solid black', padding: '8px', fontWeight: 'bold' }}>Screens</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{m[1][0]}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{m[1][1]}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{m[1][2]}</td>
            </tr>
            <tr>
              <td style={{ border: '2px solid black', padding: '8px', fontWeight: 'bold' }}>Batteries</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{m[2][0]}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{m[2][1]}</td>
              <td style={{ border: '2px solid black', padding: '8px' }}>{m[2][2]}</td>
            </tr>
          </tbody>
        </table>

        <div className="matrix-equation" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
          <div className="matrix-bracket">
            <div className="matrix-col"><span>{m[0][0]}</span><span>{m[1][0]}</span><span>{m[2][0]}</span></div>
            <div className="matrix-col"><span>{m[0][1]}</span><span>{m[1][1]}</span><span>{m[2][1]}</span></div>
            <div className="matrix-col"><span>{m[0][2]}</span><span>{m[1][2]}</span><span>{m[2][2]}</span></div>
          </div>
          <div>×</div>
          <div className="matrix-bracket">
            <div className="matrix-col">
              <input type="number" value={laptops} onChange={e=>setLaptops(Number(e.target.value))} className="matrix-input-sm" style={{ color: 'blue' }} />
              <input type="number" value={phones} onChange={e=>setPhones(Number(e.target.value))} className="matrix-input-sm" style={{ color: 'red' }} />
              <input type="number" value={watches} onChange={e=>setWatches(Number(e.target.value))} className="matrix-input-sm" style={{ color: 'green' }} />
            </div>
          </div>
          <div>=</div>
          <div className="matrix-bracket">
            <div className="matrix-col" style={{ fontWeight: 'bold' }}>
              <span>{chips} Chips</span>
              <span>{screens} Screens</span>
              <span>{batteries} Batteries</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default function Ch02Page() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
        <section className="la-hero" style={{ background: 'var(--black)', color: 'var(--white)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--yellow)', color: 'var(--black)' }}>
            <i className="fa-solid fa-table-cells" /> CH 02 · Matrices as System Operators
          </div>
          <h1 className="la-hero-title">
            MATRICES AS<br/><span style={{ color: 'var(--yellow)' }}>SYSTEM OPERATORS</span>
          </h1>
          <p className="la-hero-sub" style={{ borderColor: 'var(--yellow)' }}>
            Linear transformations, pipelines, and the machines of computation.
          </p>
        </section>

        {/* EXPERIMENTS */}
        <section className="la-section" style={{ padding: '4rem 2rem', background: 'var(--cream)' }}>
          <div className="la-section-inner" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <DualViewsWidget />
            <TransformationWidget />
            <CompositionWidget />
            <InverseWidget />
            <TechFactoryWidget />
          </div>
        </section>

    </div>
  )
}
