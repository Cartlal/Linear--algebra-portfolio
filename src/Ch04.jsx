import React, { useState, useEffect, useRef } from 'react'

/* ============================================================
   CH 04 — Vector Spaces: Degrees of Freedom
   ============================================================ */

// ── 1. WHAT IS A VECTOR SPACE? ──
function VectorSpaceWidget() {
  const [scalar, setScalar] = useState(1)
  
  // Example: {(x,y,0) | x>=0, y>=0}
  // Vector v = (2, 2, 0)
  const v = [2, 2, 0]
  const scaledV = [v[0]*scalar, v[1]*scalar, v[2]*scalar]
  
  const inSet = scaledV[0] >= 0 && scaledV[1] >= 0
  
  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>1. What is a Vector Space?</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>A subspace must pass three tests: Contains Zero, Closed under Addition, Closed under Scaling.</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, border: '2px solid black', padding: '1rem', background: 'var(--white)' }}>
            <strong>Valid Subspace:</strong> A line through the origin in 2D space.
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>✅ Contains (0,0)</li>
              <li>✅ u + v stays on the line</li>
              <li>✅ c * v stays on the line</li>
            </ul>
          </div>
          
          <div style={{ flex: 1, border: `3px solid ${inSet ? 'var(--black)' : 'var(--red)'}`, padding: '1rem', background: inSet ? 'var(--white)' : '#ffe6e6' }}>
            <strong>Counter-Example:</strong> First Quadrant only `(x≥0, y≥0)`
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>✅ Contains (0,0)</li>
              <li>✅ u + v stays in First Quadrant</li>
              <li style={{ color: inSet ? 'black' : 'red', fontWeight: inSet ? 'normal' : 'bold' }}>
                {inSet ? '❓ c * v ... let\'s test it' : '❌ Escaped the subset! Scaling by negative failed.'}
              </li>
            </ul>
            
            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ fontWeight: 'bold' }}>Scale Vector v(2,2) by c = {scalar.toFixed(1)}</label>
              <input type="range" min="-2" max="2" step="0.1" value={scalar} onChange={e=>setScalar(Number(e.target.value))} style={{ width: '100%', marginTop: '0.5rem' }} />
              
              <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '1.2rem' }}>
                Result = [{scaledV[0].toFixed(1)}, {scaledV[1].toFixed(1)}] 
                {inSet ? <span style={{ color: 'green', marginLeft: '1rem' }}>✓ Valid</span> : <span style={{ color: 'red', marginLeft: '1rem' }}>✗ Invalid</span>}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── 2. SPAN ──
function SpanWidget() {
  const [mode, setMode] = useState('1v') // 1v, 2v, 2dep
  
  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>2. Span: The Generative Model</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>The span of a set of vectors is every possible linear combination. It's the "reach" of your vectors.</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', gap: '2rem', padding: '2rem', alignItems: 'center' }}>
        
        <div style={{ flex: 1, height: '300px', background: '#fafafa', border: '3px solid var(--black)', position: 'relative', overflow: 'hidden' }}>
          {/* Isometric projection simulation via CSS transform */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotateX(60deg) rotateZ(-45deg)', width: '400px', height: '400px' }}>
            
            {/* Grid */}
            <div style={{ position: 'absolute', inset: 0, border: '1px solid #ddd', backgroundImage: 'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Axes */}
            <div style={{ position: 'absolute', top: '200px', left: 0, right: 0, height: '2px', background: 'var(--black)' }} />
            <div style={{ position: 'absolute', left: '200px', top: 0, bottom: 0, width: '2px', background: 'var(--black)' }} />
            
            {/* Shapes based on mode */}
            {mode === '1v' && (
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '200px', width: '4px', background: 'var(--blue)', transform: 'rotate(30deg)', transformOrigin: 'center center' }} />
            )}
            
            {mode === '2v' && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 214, 0, 0.4)' }} />
            )}
            
            {mode === '2dep' && (
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '200px', width: '4px', background: 'var(--red)', transform: 'rotate(60deg)', transformOrigin: 'center center' }} />
            )}
            
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '200px' }}>
          <button className={`la-btn ${mode === '1v' ? 'active' : ''}`} onClick={() => setMode('1v')}>1 Vector</button>
          <button className={`la-btn ${mode === '2v' ? 'active' : ''}`} onClick={() => setMode('2v')}>2 Vectors</button>
          <button className={`la-btn ${mode === '2dep' ? 'active' : ''}`} onClick={() => setMode('2dep')}>2 Dependent</button>
          
          <div style={{ marginTop: '1rem', padding: '1rem', border: '2px solid var(--black)', background: 'var(--white)' }}>
            <strong>Result:</strong><br/>
            {mode === '1v' && 'Spans a 1D Line through the origin.'}
            {mode === '2v' && 'Spans the entire 2D Plane.'}
            {mode === '2dep' && 'Redundant! Still only spans a 1D Line.'}
          </div>
        </div>
        
      </div>
    </div>
  )
}

// ── 3. BASIS & DIMENSION ──
function BasisWidget() {
  const [space, setSpace] = useState('R2')
  
  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>3. Basis & Dimension</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>A basis is the minimum set of vectors needed to span the entire space. The number of basis vectors is the dimension.</p>
      </div>
      <div className="subcard-content" style={{ padding: '2rem' }}>
        
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '3px solid var(--black)', paddingBottom: '1rem' }}>
          <button className={`la-btn-sm ${space === 'R2' ? 'active' : ''}`} onClick={() => setSpace('R2')}>R² (2D)</button>
          <button className={`la-btn-sm ${space === 'R3' ? 'active' : ''}`} onClick={() => setSpace('R3')}>R³ (3D)</button>
          <button className={`la-btn-sm ${space === 'Rn' ? 'active' : ''}`} onClick={() => setSpace('Rn')}>Rⁿ (n-D)</button>
        </div>
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ flex: 1, fontSize: '1.5rem', fontFamily: 'var(--font-mono)' }}>
            <strong>Dimension:</strong> {space === 'R2' ? '2' : space === 'R3' ? '3' : 'n'} <br/><br/>
            <strong>Basis Vectors:</strong><br/>
            {space === 'R2' && <span className="highlight-yellow">{'{ [1,0], [0,1] }'}</span>}
            {space === 'R3' && <span className="highlight-blue">{'{ [1,0,0], [0,1,0], [0,0,1] }'}</span>}
            {space === 'Rn' && <span className="highlight-red">{'{ e₁, e₂, ..., eₙ }'}</span>}
          </div>
          
          <div style={{ flex: 1, padding: '1.5rem', background: 'var(--black)', color: 'var(--white)', border: '4px solid var(--yellow)' }}>
            {space === 'R2' && "Exactly 2 vectors are needed to reach everywhere on a flat plane."}
            {space === 'R3' && "Exactly 3 vectors are needed to reach everywhere in physical space."}
            {space === 'Rn' && "Exactly n vectors are needed. No more (they'd be dependent), no less (they wouldn't span)."}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── 4. RANK-NULLITY THEOREM ──
function RankNullityWidget() {
  const [matrixType, setMatrixType] = useState('full') // full, rank2, rank1
  
  let cols = 3
  let rank = 3
  let nullity = 0
  
  if (matrixType === 'rank2') { cols = 4; rank = 2; nullity = 2; }
  else if (matrixType === 'rank1') { cols = 3; rank = 1; nullity = 2; }
  
  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>4. Rank-Nullity Theorem</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>For any matrix A, the information splits perfectly: rank(A) + nullity(A) = n (number of columns).</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className={`la-btn ${matrixType === 'full' ? 'active' : ''}`} onClick={() => setMatrixType('full')}>Full Rank (3×3)</button>
          <button className={`la-btn ${matrixType === 'rank2' ? 'active' : ''}`} onClick={() => setMatrixType('rank2')}>Rank 2 (3×4)</button>
          <button className={`la-btn ${matrixType === 'rank1' ? 'active' : ''}`} onClick={() => setMatrixType('rank1')}>Rank 1 (2×3)</button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
          <div style={{ background: 'var(--yellow)', padding: '1rem', border: '3px solid var(--black)', textAlign: 'center' }}>
            RANK<br/><span style={{ fontSize: '3rem' }}>{rank}</span>
          </div>
          <div>+</div>
          <div style={{ background: 'var(--blue)', color: 'white', padding: '1rem', border: '3px solid var(--black)', textAlign: 'center' }}>
            NULLITY<br/><span style={{ fontSize: '3rem' }}>{nullity}</span>
          </div>
          <div>=</div>
          <div style={{ background: 'var(--black)', color: 'var(--yellow)', padding: '1rem', border: '3px solid var(--black)', textAlign: 'center' }}>
            COLUMNS<br/><span style={{ fontSize: '3rem' }}>{cols}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── 5. FUNDAMENTAL SUBSPACES ──
function SubspacesWidget() {
  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>5. The Four Fundamental Subspaces</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>Every matrix A defines four subspaces — the complete "information architecture" of a transformation.</p>
      </div>
      <div className="subcard-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem' }}>
        
        <div style={{ border: '3px solid var(--black)', padding: '1.5rem', background: 'var(--yellow)' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. Column Space C(A)</h4>
          <p>What outputs are reachable in the target space.</p>
          <strong style={{ fontFamily: 'var(--font-mono)' }}>dim = rank(A)</strong>
        </div>
        
        <div style={{ border: '3px solid var(--black)', padding: '1.5rem', background: 'var(--blue)', color: 'white' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Null Space N(A)</h4>
          <p>Inputs that are crushed to the zero vector.</p>
          <strong style={{ fontFamily: 'var(--font-mono)' }}>dim = n - rank(A)</strong>
        </div>

        <div style={{ border: '3px solid var(--black)', padding: '1.5rem', background: 'var(--red)', color: 'white' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>3. Row Space C(Aᵀ)</h4>
          <p>The "active" inputs that actually matter and map to C(A).</p>
          <strong style={{ fontFamily: 'var(--font-mono)' }}>dim = rank(A)</strong>
        </div>

        <div style={{ border: '3px solid var(--black)', padding: '1.5rem', background: 'var(--white)' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>4. Left Null Space N(Aᵀ)</h4>
          <p>Constraints on outputs (unreachable parts of target space).</p>
          <strong style={{ fontFamily: 'var(--font-mono)' }}>dim = m - rank(A)</strong>
        </div>

      </div>
    </div>
  )
}

// ── 6. ROBOT ARM ──
function RobotArmWidget() {
  const [fails, setFails] = useState(false)
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0,0,600,300)
    
    // Base
    ctx.fillStyle = 'var(--black)'
    ctx.fillRect(280, 250, 40, 50)
    
    // Arm 1
    ctx.strokeStyle = 'var(--yellow)'
    ctx.lineWidth = 15
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(300, 250)
    ctx.lineTo(250, 150)
    ctx.stroke()
    
    // Arm 2
    ctx.strokeStyle = 'var(--blue)'
    ctx.beginPath()
    ctx.moveTo(250, 150)
    ctx.lineTo(350, 100)
    ctx.stroke()
    
    // Arm 3
    if (fails) {
      // Locked, stuck in a straight line with arm 2
      ctx.strokeStyle = 'var(--red)'
      ctx.beginPath()
      ctx.moveTo(350, 100)
      ctx.lineTo(450, 50)
      ctx.stroke()
      
      // Draw red X
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(340, 90)
      ctx.lineTo(360, 110)
      ctx.moveTo(360, 90)
      ctx.lineTo(340, 110)
      ctx.stroke()
      
    } else {
      // Free to move
      ctx.strokeStyle = 'var(--green)'
      ctx.beginPath()
      ctx.moveTo(350, 100)
      ctx.lineTo(320, 40)
      ctx.stroke()
    }
    
    // Joints
    ctx.fillStyle = 'var(--white)'
    ctx.strokeStyle = 'var(--black)'
    ctx.lineWidth = 3
    const drawJoint = (x,y) => {
      ctx.beginPath(); ctx.arc(x,y, 10, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    }
    drawJoint(300,250); drawJoint(250,150); drawJoint(350,100);
    drawJoint(fails ? 450 : 320, fails ? 50 : 40); // End effector

  }, [fails])
  
  return (
    <div className="la-subcard">
      <div className="subcard-header">
        <h3 style={{margin: 0, fontSize: '1.2rem', textTransform: 'uppercase'}}>6. Application: Robot Arm Workspace</h3>
        <p className="la-concept-text" style={{marginTop: '10px', fontSize: '0.85rem'}}>The column space tells us where the gripper can reach. The null space reveals redundant motor combinations.</p>
      </div>
      <div className="subcard-content" style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
        
        <canvas ref={canvasRef} width={600} height={300} style={{ border: '3px solid var(--black)', background: '#fafafa', width: '100%', maxWidth: '500px' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          <button className={`la-btn ${!fails ? 'active' : ''}`} onClick={() => setFails(false)}>All 3 Motors</button>
          <button className={`la-btn ${fails ? 'active' : ''}`} style={{ borderColor: fails ? 'red' : '' }} onClick={() => setFails(true)}>Motor 3 Fails</button>
          
          <div style={{ marginTop: '1rem', padding: '1rem', background: fails ? '#ffe6e6' : '#e6ffe6', border: '2px solid var(--black)' }}>
            {fails ? 
              "Motor 3 is locked (dependent on M2). The robot loses a degree of freedom. It can still reach a plane, but cannot maneuver around obstacles as effectively." : 
              "3 independent motors. The workspace is a full 3D volume (or a highly flexible 2D plane with redundancy to avoid obstacles)."}
          </div>
        </div>
        
      </div>
    </div>
  )
}


export default function Ch04Page() {
  return (
    <div className="la-embed-page">

      {/* HERO */}
        <section className="la-hero" style={{ background: 'var(--red)', color: 'var(--white)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--black)', color: 'var(--white)' }}>
            <i className="fa-solid fa-cube" /> CH 04 · Vector Spaces
          </div>
          <h1 className="la-hero-title">
            VECTOR SPACES:<br/><span style={{ color: 'var(--black)' }}>DEGREES OF FREEDOM</span>
          </h1>
          <p className="la-hero-sub" style={{ borderColor: 'var(--black)', color: 'var(--black)', fontWeight: 'bold' }}>
            Span, basis, dimension, and the architecture of data.
          </p>
        </section>

        {/* EXPERIMENTS */}
        <section className="la-section" style={{ padding: '4rem 2rem', background: 'var(--cream)' }}>
          <div className="la-section-inner" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <VectorSpaceWidget />
            <SpanWidget />
            <BasisWidget />
            <RankNullityWidget />
            <SubspacesWidget />
            <RobotArmWidget />
          </div>
        </section>

    </div>
  )
}
