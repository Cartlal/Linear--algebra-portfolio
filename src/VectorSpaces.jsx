import React, { useState, useEffect, useRef } from 'react'

/* ============================================================
   CH 04 — Vector Spaces: Degrees of Freedom
   (Neo-Brutalist Styling)
   ============================================================ */

// ── 1. WHAT IS A VECTOR SPACE? ──
function VectorSpaceWidget() {
  const [scalar, setScalar] = useState(1)
  
  const v = [2, 2, 0]
  const scaledV = [v[0]*scalar, v[1]*scalar, v[2]*scalar]
  const inSet = scaledV[0] >= 0 && scaledV[1] >= 0
  
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--yellow)' }}>1. What is a Vector Space?</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>A <strong>vector space</strong> is any set where you can add vectors and scale them, and the result stays in the set. A <strong>subspace</strong> must pass three tests:</p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="neo-toggle-btn" style={{ background: 'var(--green)' }}>
            <i className="fa-regular fa-circle-check" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
            <div className="neo-toggle-btn-title">Contains Zero</div>
            <div className="neo-toggle-btn-sub">The zero vector must be in the set.</div>
          </div>
          <div className="neo-toggle-btn" style={{ background: 'var(--green)' }}>
            <i className="fa-solid fa-plus" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
            <div className="neo-toggle-btn-title">Closed Under Addition</div>
            <div className="neo-toggle-btn-sub">u + v stays in the set.</div>
          </div>
          <div className="neo-toggle-btn" style={{ background: 'var(--green)' }}>
            <i className="fa-solid fa-arrows-left-right-to-line" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', transform: 'rotate(45deg)' }}></i>
            <div className="neo-toggle-btn-title">Closed Under Scaling</div>
            <div className="neo-toggle-btn-sub">c · v stays in the set.</div>
          </div>
        </div>

        <div className="neo-equation-box" style={{ background: 'var(--red)', color: 'white', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'var(--font-main)' }}>Counter-example: The set {'{ (x,y) | x ≥ 0, y ≥ 0 }'} is NOT a subspace. Scaling by -1 leaves the set!</span>
        </div>
      </div>
    </div>
  )
}

// ── 2. SPAN ──
function SpanWidget() {
  const [mode, setMode] = useState('1v') // 1v, 2v, 2dep
  
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--red)', color: 'white' }}>2. Span: The Generative Model</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>The <strong>span</strong> of a set of vectors is every possible linear combination. It's the "reach" of your vectors — every point you can generate.</p>
        
        <div className="neo-canvas-container" style={{ height: '300px' }}>
          {/* Isometric projection simulation via CSS transform */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotateX(60deg) rotateZ(-45deg)', width: '400px', height: '400px' }}>
            
            {/* Grid */}
            <div style={{ position: 'absolute', inset: 0, border: '1px solid #ddd', backgroundImage: 'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Axes */}
            <div style={{ position: 'absolute', top: '200px', left: 0, right: 0, height: '2px', background: 'var(--black)' }} />
            <div style={{ position: 'absolute', left: '200px', top: 0, bottom: 0, width: '2px', background: 'var(--black)' }} />
            
            {/* Shapes based on mode */}
            {mode === '1v' && (
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '200px', width: '6px', background: 'var(--blue)', transform: 'rotate(30deg)', transformOrigin: 'center center' }} />
            )}
            
            {mode === '2v' && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 214, 0, 0.4)' }} />
            )}
            
            {mode === '2dep' && (
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '200px', width: '6px', background: 'var(--red)', transform: 'rotate(60deg)', transformOrigin: 'center center' }} />
            )}
            
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className={`la-btn-sm ${mode === '1v' ? 'active' : ''}`} style={{ background: mode==='1v' ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setMode('1v')}>1 Vector (Line)</button>
          <button className={`la-btn-sm ${mode === '2v' ? 'active' : ''}`} style={{ background: mode==='2v' ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setMode('2v')}>2 Vectors (Plane)</button>
          <button className={`la-btn-sm ${mode === '2dep' ? 'active' : ''}`} style={{ background: mode==='2dep' ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setMode('2dep')}>2 Dependent (Line)</button>
        </div>
        
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {mode === '1v' && 'One vector spans a line through the origin.'}
          {mode === '2v' && 'Two independent vectors span the entire 2D plane.'}
          {mode === '2dep' && 'Two dependent vectors (collinear) only span a 1D line.'}
        </div>
      </div>
    </div>
  )
}

// ── 3. BASIS & DIMENSION ──
function BasisWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--blue)', color: 'white' }}>3. Basis & Dimension</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>A <strong>basis</strong> is the minimum set of vectors needed to span the entire space. The number of basis vectors is the <strong>dimension</strong>.</p>
        
        <div className="neo-equation-box" style={{ background: '#fafafa' }}>
          Basis = Linearly Independent + Spans the Space
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div className="neo-toggle-btn" style={{ background: 'var(--yellow)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>R²</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Dimension: 2</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Basis: {'{ [1,0], [0,1] }'}</div>
          </div>

          <div className="neo-toggle-btn" style={{ background: 'var(--blue)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>R³</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Dimension: 3</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Basis: {'{ e₁, e₂, e₃ }'}</div>
          </div>

          <div className="neo-toggle-btn" style={{ background: '#c175ff', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>Rⁿ</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Dimension: n</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>n vectors needed, no more, no less</div>
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
  
  const rankPercent = (rank / cols) * 100
  
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: 'var(--green)' }}>4. Rank-Nullity Theorem</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>For any matrix A (m × n), the information splits perfectly:</p>
        
        <div className="neo-equation-box" style={{ background: 'var(--yellow)' }}>
          rank(A) + nullity(A) = n (number of columns)
        </div>

        <div style={{ background: 'var(--black)', padding: '2rem', border: '3px solid var(--black)', textAlign: 'center' }}>
          <div style={{ color: 'white', marginBottom: '1rem', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
            {matrixType === 'full' ? '3×3 Full Rank: rank=3, nullity=0' : matrixType === 'rank2' ? '3×4 Rank 2: rank=2, nullity=2' : '2×3 Rank 1: rank=1, nullity=2'}
          </div>
          
          <div style={{ display: 'flex', height: '40px', width: '80%', margin: '0 auto', border: '2px solid white' }}>
            <div style={{ width: `${rankPercent}%`, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--black)' }}>
              Rank: {rank}
            </div>
            {nullity > 0 && (
              <div style={{ width: `${100 - rankPercent}%`, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
                Nullity: {nullity}
              </div>
            )}
          </div>
          
          <div style={{ color: 'white', marginTop: '1rem', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
            n = {cols} columns
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className={`la-btn-sm ${matrixType === 'full' ? 'active' : ''}`} style={{ background: matrixType==='full' ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setMatrixType('full')}>Full Rank (3×3)</button>
          <button className={`la-btn-sm ${matrixType === 'rank2' ? 'active' : ''}`} style={{ background: matrixType==='rank2' ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setMatrixType('rank2')}>Rank 2 (3×4)</button>
          <button className={`la-btn-sm ${matrixType === 'rank1' ? 'active' : ''}`} style={{ background: matrixType==='rank1' ? 'var(--yellow)' : 'var(--white)'}} onClick={() => setMatrixType('rank1')}>Rank 1 (2×3)</button>
        </div>
      </div>
    </div>
  )
}

// ── 5. FUNDAMENTAL SUBSPACES ──
function SubspacesWidget() {
  return (
    <div className="neo-widget-wrapper">
      <div className="neo-widget-title" style={{ background: '#ff8c00', color: 'black' }}>5. The Four Fundamental Subspaces</div>
      
      <div className="neo-widget-container">
        <p className="la-concept-text" style={{ margin: 0 }}>Every matrix A defines four subspaces — the complete "information architecture" of a transformation:</p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          
          <div className="neo-toggle-btn" style={{ background: 'var(--blue)', color: 'white', flex: 1, padding: '2rem 1rem' }}>
            <div className="neo-toggle-btn-title">Column Space</div>
            <div className="neo-toggle-btn-sub" style={{ fontFamily: 'var(--font-mono)', margin: '0.5rem 0' }}>C(A) — what outputs are reachable</div>
            <div className="neo-toggle-btn-sub" style={{ fontWeight: 'bold' }}>dim = rank</div>
          </div>

          <div className="neo-toggle-btn" style={{ background: 'var(--green)', color: 'black', flex: 1, padding: '2rem 1rem' }}>
            <div className="neo-toggle-btn-title">Row Space</div>
            <div className="neo-toggle-btn-sub" style={{ fontFamily: 'var(--font-mono)', margin: '0.5rem 0' }}>C(Aᵀ) — what inputs matter</div>
            <div className="neo-toggle-btn-sub" style={{ fontWeight: 'bold' }}>dim = rank</div>
          </div>

          <div className="neo-toggle-btn" style={{ background: 'var(--red)', color: 'white', flex: 1, padding: '2rem 1rem' }}>
            <div className="neo-toggle-btn-title">Null Space</div>
            <div className="neo-toggle-btn-sub" style={{ fontFamily: 'var(--font-mono)', margin: '0.5rem 0' }}>N(A) — inputs that produce zero</div>
            <div className="neo-toggle-btn-sub" style={{ fontWeight: 'bold' }}>dim = nullity</div>
          </div>

          <div className="neo-toggle-btn" style={{ background: 'var(--yellow)', color: 'black', flex: 1, padding: '2rem 1rem' }}>
            <div className="neo-toggle-btn-title">Left Null Space</div>
            <div className="neo-toggle-btn-sub" style={{ fontFamily: 'var(--font-mono)', margin: '0.5rem 0' }}>N(Aᵀ) — constraints on outputs</div>
            <div className="neo-toggle-btn-sub" style={{ fontWeight: 'bold' }}>dim = m - rank</div>
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
        <section className="la-hero" style={{ background: '#c175ff', color: 'var(--white)' }}>
          <div className="la-hero-badge" style={{ background: 'var(--white)', color: 'var(--black)' }}>
            CH 04
          </div>
          <h1 className="la-hero-title">
            Vector Spaces: Degrees of Freedom
          </h1>
          <p className="la-hero-sub" style={{ borderColor: 'transparent', color: 'var(--white)', fontWeight: 'bold', paddingLeft: 0 }}>
            Span, basis, dimension, and the architecture of data.
          </p>
        </section>

        {/* EXPERIMENTS */}
        <section className="la-section" style={{ padding: '4rem 2rem', background: '#fafafa' }}>
          <div className="la-section-inner" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <VectorSpaceWidget />
            <SpanWidget />
            <BasisWidget />
            <RankNullityWidget />
            <SubspacesWidget />
          </div>
        </section>

    </div>
  )
}
