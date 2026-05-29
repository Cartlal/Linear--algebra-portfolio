import React, { useState, useEffect, useRef } from 'react'

function VectorVisualizer() {
  const [matrix, setMatrix] = useState({ a: 1, b: 0, c: 0, d: 1 })
  const [vector, setVector] = useState({ x: 2, y: 2 })
  const [preset, setPreset] = useState('identity')

  const handlePreset = (type) => {
    setPreset(type)
    if (type === 'identity') {
      setMatrix({ a: 1, b: 0, c: 0, d: 1 })
    } else if (type === 'rotate45') {
      const rad = Math.PI / 4 // 45 deg
      setMatrix({
        a: parseFloat(Math.cos(rad).toFixed(2)),
        b: parseFloat((-Math.sin(rad)).toFixed(2)),
        c: parseFloat(Math.sin(rad).toFixed(2)),
        d: parseFloat(Math.cos(rad).toFixed(2))
      })
    } else if (type === 'shear') {
      setMatrix({ a: 1, b: 1.2, c: 0, d: 1 })
    } else if (type === 'scale') {
      setMatrix({ a: 1.5, b: 0, c: 0, d: 1.5 })
    } else if (type === 'reflection') {
      setMatrix({ a: -1, b: 0, c: 0, d: 1 })
    } else if (type === 'projection') {
      setMatrix({ a: 1, b: 0, c: 0, d: 0 }) // project onto x-axis
    }
  }

  const transformedVector = {
    x: matrix.a * vector.x + matrix.b * vector.y,
    y: matrix.c * vector.x + matrix.d * vector.y
  }

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Background color
    ctx.fillStyle = '#f5f0e8'
    ctx.fillRect(0, 0, width, height)

    const center = { x: width / 2, y: height / 2 }
    const scale = 35 // Pixels per unit

    // 1. Draw static grid lines (light grey)
    ctx.strokeStyle = '#e6dfd3'
    ctx.lineWidth = 1
    for (let x = center.x % scale; x < width; x += scale) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = center.y % scale; y < height; y += scale) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // 2. Draw transformed grid space (light blue lines showing the shear/rotation!)
    ctx.strokeStyle = 'rgba(26, 26, 255, 0.15)'
    ctx.lineWidth = 1.5
    const step = 1
    // Vertical grid lines (transformed)
    for (let i = -10; i <= 10; i++) {
      ctx.beginPath()
      const xVal = i
      // Line from y = -10 to y = 10
      const pt1 = transformPoint(xVal, -10)
      const pt2 = transformPoint(xVal, 10)
      ctx.moveTo(center.x + pt1.x * scale, center.y - pt1.y * scale)
      ctx.lineTo(center.x + pt2.x * scale, center.y - pt2.y * scale)
      ctx.stroke()
    }
    // Horizontal grid lines (transformed)
    for (let j = -10; j <= 10; j++) {
      ctx.beginPath()
      const yVal = j
      // Line from x = -10 to x = 10
      const pt1 = transformPoint(-10, yVal)
      const pt2 = transformPoint(10, yVal)
      ctx.moveTo(center.x + pt1.x * scale, center.y - pt1.y * scale)
      ctx.lineTo(center.x + pt2.x * scale, center.y - pt2.y * scale)
      ctx.stroke()
    }

    function transformPoint(px, py) {
      return {
        x: matrix.a * px + matrix.b * py,
        y: matrix.c * px + matrix.d * py
      }
    }

    // 3. Draw standard cartesian axes
    ctx.strokeStyle = '#0a0a0a'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(0, center.y)
    ctx.lineTo(width, center.y)
    ctx.moveTo(center.x, 0)
    ctx.lineTo(center.x, height)
    ctx.stroke()

    // 4. Axis markings / labels
    ctx.fillStyle = '#0a0a0a'
    ctx.font = 'bold 9px Space Mono'
    ctx.textAlign = 'center'
    for (let i = -6; i <= 6; i++) {
      if (i === 0) continue
      // X ticks
      ctx.fillRect(center.x + i * scale - 1, center.y - 4, 2, 8)
      ctx.fillText(i, center.x + i * scale, center.y + 15)
      // Y ticks
      ctx.fillRect(center.x - 4, center.y - i * scale - 1, 8, 2)
      ctx.fillText(i, center.x - 14, center.y - i * scale + 3)
    }

    // 5. Draw vector lines
    // Original Vector (Green)
    drawVector(vector.x, vector.y, '#00C853', 'v (Original)')

    // Transformed Vector (Red)
    drawVector(transformedVector.x, transformedVector.y, '#FF3B3B', 'M*v (Transformed)')

    function drawVector(vx, vy, color, label) {
      const px = center.x + vx * scale
      const py = center.y - vy * scale

      ctx.strokeStyle = color
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(center.x, center.y)
      ctx.lineTo(px, py)
      ctx.stroke()

      // Arrowhead
      const angle = Math.atan2(center.y - py, px - center.x)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(px - 12 * Math.cos(angle - Math.PI / 8), py + 12 * Math.sin(angle - Math.PI / 8))
      ctx.lineTo(px - 12 * Math.cos(angle + Math.PI / 8), py + 12 * Math.sin(angle + Math.PI / 8))
      ctx.closePath()
      ctx.fill()

      // Label text
      ctx.fillStyle = '#0a0a0a'
      ctx.font = 'bold 11px Space Mono'
      ctx.fillText(`${label} [${vx.toFixed(1)}, ${vy.toFixed(1)}]`, px, py - 12)
    }
  }, [matrix, vector])

  return (
    <div className="la-visualizer-card">
      <div className="la-visualizer-left">
        <h3 className="la-visualizer-title">
          <i className="fa-solid fa-chart-line" /> INTERACTIVE VECTOR TRANSFORMER
        </h3>
        <p className="la-visualizer-subtitle">
          Manipulate the values of matrix <strong style={{ fontFamily: 'monospace' }}>M</strong> and base vector <strong style={{ fontFamily: 'monospace' }}>v</strong> to observe linear transformations in action.
        </p>

        {/* Preset buttons */}
        <div className="preset-grid">
          {[
            { id: 'identity', label: 'Identity Matrix' },
            { id: 'rotate45', label: 'Rotate 45°' },
            { id: 'shear', label: 'Shear Space' },
            { id: 'scale', label: 'Scale Up' },
            { id: 'reflection', label: 'X-Reflection' },
            { id: 'projection', label: 'X-Projection' },
          ].map(p => (
            <button
              key={p.id}
              className={`preset-btn ${preset === p.id ? 'active' : ''}`}
              onClick={() => handlePreset(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Matrix Controls */}
        <div className="matrix-control-box">
          <div className="matrix-bracket-label">Transformation Matrix (M)</div>
          <div className="matrix-input-grid">
            <div className="matrix-cell">
              <label>a (Scale X)</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={matrix.a}
                onChange={e => { setMatrix({ ...matrix, a: parseFloat(e.target.value) }); setPreset('') }}
              />
              <span className="matrix-val">{matrix.a}</span>
            </div>
            <div className="matrix-cell">
              <label>b (Shear X)</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={matrix.b}
                onChange={e => { setMatrix({ ...matrix, b: parseFloat(e.target.value) }); setPreset('') }}
              />
              <span className="matrix-val">{matrix.b}</span>
            </div>
            <div className="matrix-cell">
              <label>c (Shear Y)</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={matrix.c}
                onChange={e => { setMatrix({ ...matrix, c: parseFloat(e.target.value) }); setPreset('') }}
              />
              <span className="matrix-val">{matrix.c}</span>
            </div>
            <div className="matrix-cell">
              <label>d (Scale Y)</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={matrix.d}
                onChange={e => { setMatrix({ ...matrix, d: parseFloat(e.target.value) }); setPreset('') }}
              />
              <span className="matrix-val">{matrix.d}</span>
            </div>
          </div>
        </div>

        {/* Vector Controls */}
        <div className="vector-control-box">
          <div className="matrix-bracket-label">Base Vector (v)</div>
          <div className="matrix-input-grid">
            <div className="matrix-cell">
              <label>x position</label>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.2"
                value={vector.x}
                onChange={e => setVector({ ...vector, x: parseFloat(e.target.value) })}
              />
              <span className="matrix-val" style={{ color: '#00C853' }}>{vector.x}</span>
            </div>
            <div className="matrix-cell">
              <label>y position</label>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.2"
                value={vector.y}
                onChange={e => setVector({ ...vector, y: parseFloat(e.target.value) })}
              />
              <span className="matrix-val" style={{ color: '#00C853' }}>{vector.y}</span>
            </div>
          </div>
        </div>

        {/* Equation preview */}
        <div className="equation-preview-box">
          <div className="equation-math">
            <span className="math-matrix-box">
              <span className="bracket">[</span>
              <span className="vals">
                <span>{matrix.a.toFixed(1)}</span>
                <span>{matrix.c.toFixed(1)}</span>
              </span>
              <span className="vals">
                <span>{matrix.b.toFixed(1)}</span>
                <span>{matrix.d.toFixed(1)}</span>
              </span>
              <span className="bracket">]</span>
            </span>
            <span className="math-operator">×</span>
            <span className="math-matrix-box" style={{ color: '#00C853' }}>
              <span className="bracket">[</span>
              <span className="vals">
                <span>{vector.x.toFixed(1)}</span>
                <span>{vector.y.toFixed(1)}</span>
              </span>
              <span className="bracket">]</span>
            </span>
            <span className="math-operator">=</span>
            <span className="math-matrix-box" style={{ color: '#FF3B3B' }}>
              <span className="bracket">[</span>
              <span className="vals">
                <span>{transformedVector.x.toFixed(1)}</span>
                <span>{transformedVector.y.toFixed(1)}</span>
              </span>
              <span className="bracket">]</span>
            </span>
          </div>
        </div>
      </div>

      <div className="la-visualizer-right">
        <div className="canvas-wrapper">
          <canvas ref={canvasRef} width={400} height={400} className="visualizer-canvas" />
        </div>
        <div className="canvas-legend">
          <div className="legend-item"><span className="legend-dot color-green" /> Original Vector (v)</div>
          <div className="legend-item"><span className="legend-dot color-red" /> Transformed Vector (Mv)</div>
          <div className="legend-item"><span className="legend-dot color-blue" /> Grid Shear (Linear Map)</div>
        </div>
      </div>
    </div>
  )
}

export default function LinearAlgebraPage() {
  return (
    <div className="la-page-wrapper">
      {/* 1. HERO SECTION */}
      <section className="la-hero">
        <div className="la-hero-badge">
          <i className="fa-solid fa-compass-drafting" /> B.E. Semester 2 Mathematics
        </div>
        <h1 className="la-hero-title">
          LINEAR <br />
          <span className="la-highlight">ALGEBRA</span>
        </h1>
        <p className="la-hero-sub">
          Exploring vectors, matrices, and space transformations. A fundamental pillar of modern Computer Science, Machine Learning, and Graphics Engineering.
        </p>
      </section>

      {/* 2. TICKER SECTION */}
      <div className="ticker la-ticker" aria-hidden="true">
        <div className="ticker-track">
          {['VECTORS', 'MATRICES', 'EIGENVALUES', 'VECTOR SPACES', 'DIMENSION', 'SVD', 'ROTATION', 'SHEAR SPACE', 'COMPUTER GRAPHICS', 'MACHINE LEARNING', 'VECTORS', 'MATRICES', 'EIGENVALUES'].map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* 3. INTERACTIVE VISUALIZATION PLAYGROUND */}
      <section className="la-section">
        <div className="la-section-header">
          <span className="la-section-number">01</span>
          <h2 className="la-section-title">Linear Map Visualizer</h2>
        </div>
        <div className="la-section-content">
          <VectorVisualizer />
        </div>
      </section>

      {/* 4. THE CORE INFORMATION */}
      <section className="la-section">
        <div className="la-section-header">
          <span className="la-section-number">02</span>
          <h2 className="la-section-title">Core Concepts &amp; Insights</h2>
        </div>
        <div className="la-concepts-grid">
          
          {/* Card 1: What is Linear Algebra */}
          <div className="la-concept-card card-yellow">
            <div className="la-concept-num">#01</div>
            <h3 className="la-concept-title">What is Linear Algebra?</h3>
            <p className="la-concept-text">
              Linear Algebra is a core branch of mathematics that deals with <strong>vectors</strong>, <strong>matrices</strong>, and <strong>linear transformations</strong>. It focuses on representing multi-dimensional spaces and solving complex systems of linear equations.
            </p>
            <p className="la-concept-text">
              By defining conceptual building blocks like <em>vector spaces, basis, dimensions, determinants, and eigenvalues</em>, Linear Algebra gives engineers and computational scientists a structured framework to map, manipulate, and analyze high-dimensional data in both algebraic and geometric systems.
            </p>
            <div className="la-formula-pill">
              <code>M × v = v' (Transformation Map)</code>
            </div>
          </div>

          {/* Card 2: Why I Like This Subject */}
          <div className="la-concept-card card-black">
            <div className="la-concept-num">#02</div>
            <h3 className="la-concept-title">Why I Like This Subject</h3>
            <p className="la-concept-text">
              I am highly drawn to Linear Algebra because it perfectly <strong>bridges abstract theoretical equations with instant, visual outputs</strong>. Instead of static formulas, every linear equation corresponds directly to movement, rotation, scaling, and shear of graphical spaces.
            </p>
            <p className="la-concept-text">
              The pure logical structure, systematic matrix reduction algorithms (such as Gaussian Elimination), and how it seamlessly underpins advanced technologies like deep neural network architectures and high-speed computer gaming matrices make studying it highly engaging, practical, and meaningful.
            </p>
            <div className="la-formula-pill" style={{ background: '#333', color: 'var(--yellow)' }}>
              <code>det(A - λI) = 0 (Characteristic Eq)</code>
            </div>
          </div>

          {/* Card 3: Importance in Engineering */}
          <div className="la-concept-card card-white">
            <div className="la-concept-num">#03</div>
            <h3 className="la-concept-title">Importance in Engineering</h3>
            <p className="la-concept-text">
              Modern engineering is fundamentally built upon the computational power of matrices. Engineers rely on Linear Algebra to model physical forces, manage structural distributions, and perform rapid optimizations.
            </p>
            <ul className="la-bullets">
              <li><strong>Circuit Analysis:</strong> Setting up state vectors to solve network node voltages using Kirchhoff's laws.</li>
              <li><strong>Signal Processing:</strong> Applying Fourier transforms and filter matrices to convert analog waves to digital signals.</li>
              <li><strong>Control Systems:</strong> Modeling multi-variable state equations to control robotic arms and flight dynamics.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. HOW IT IS USED IN COMPUTER SCIENCE */}
      <section className="la-section" style={{ borderBottom: 'none' }}>
        <div className="la-section-header">
          <span className="la-section-number">03</span>
          <h2 className="la-section-title">Applications in Computer Science Engineering</h2>
        </div>
        <div className="la-cs-grid">
          {[
            {
              icon: 'fa-solid fa-brain',
              title: 'Machine Learning & AI',
              desc: 'High-dimensional data is represented as massive vectors. Matrix multiplication forms the basis of forward/backward propagation in Deep Neural Networks. Algorithms like SVD (Singular Value Decomposition) and PCA compress large datasets without losing features.',
              color: 'var(--yellow)'
            },
            {
              icon: 'fa-solid fa-gamepad',
              title: 'Computer Graphics & Engines',
              desc: 'Everything you see in a 3D game environment is a matrix transformation. When a character moves, scales, or rotates, graphic shader cards multiply the vertex coordinates by 4x4 homogenous transformation matrices in real-time.',
              color: 'var(--green)'
            },
            {
              icon: 'fa-solid fa-database',
              title: 'Data Science & Analytics',
              desc: 'Enables high-performance processing of large tabular datasets. Recommender systems (like Netflix or Spotify recommendations) leverage matrix factorization techniques to predict user preferences based on multi-dimensional sparse matrices.',
              color: 'var(--blue)'
            },
            {
              icon: 'fa-solid fa-bezier-curve',
              title: 'Image & Signal Processing',
              desc: 'An image is simply a 2D matrix of pixels. Applying filters (like blurring, edge detection, or sharpen) is done by performing a mathematical convolution matrix operation. SVD is also heavily used to compress image files.',
              color: 'var(--red)'
            }
          ].map((app, i) => (
            <div key={i} className="la-app-card">
              <div className="la-app-icon-box" style={{ background: app.color }}>
                <i className={app.icon} />
              </div>
              <h3 className="la-app-title">{app.title}</h3>
              <p className="la-app-desc">{app.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
