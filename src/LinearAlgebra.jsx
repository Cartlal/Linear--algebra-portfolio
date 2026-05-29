import React, { useState, useEffect, useRef } from 'react'
import { LANav, LAChapterBar } from './LANav'

/* ========================================================
   0. HOUSE FEATURE VECTOR VISUALIZER
   ======================================================== */
function HouseVectorVisualizer() {
  const [price, setPrice] = useState(250) // in Lakhs/Thousands
  const [size, setSize] = useState(1500)  // sqft
  const [age, setAge] = useState(10)      // years

  // Calculate scaling factor for house drawing
  const houseScale = Math.min(Math.max(size / 1500, 0.6), 1.6)
  
  // Decide house color based on age
  // Modern = sleek dark gray/white, Old = rustic orange/brown
  const houseColor = age < 5 ? '#2A2A2A' : age < 15 ? '#D35400' : '#8D4925'
  
  // Luxury indicators (roof styling or gold accents) based on price
  const priceColor = price > 400 ? '#FFD600' : price > 200 ? '#FF3B3B' : '#1A1AFF'

  return (
    <div className="la-subcard">
      <div className="subcard-header">0. High-Dimensional Feature Vectors</div>
      <div className="subcard-grid">
        <div className="subcard-controls">
          <p className="la-concept-text">
            In computer science, a vector represents structured data. Real-world objects are converted into arrays of numbers called <strong>feature vectors</strong>:
          </p>
          <div className="vector-display-box">
            <code>v = [Price, Size, Age]</code>
            <div className="vector-brackets">
              [ <span style={{ color: 'var(--yellow)' }}>{price}</span>, <span style={{ color: 'var(--green)' }}>{size}</span>, <span style={{ color: 'var(--red)' }}>{age}</span> ]
            </div>
          </div>

          <div className="visualizer-inputs">
            <div className="slider-group">
              <label>Price (₹ Lakhs): <strong>{price}</strong></label>
              <input type="range" min="50" max="500" step="10" value={price} onChange={e => setPrice(parseInt(e.target.value))} />
            </div>
            <div className="slider-group">
              <label>Size (sqft): <strong>{size}</strong></label>
              <input type="range" min="500" max="3000" step="100" value={size} onChange={e => setSize(parseInt(e.target.value))} />
            </div>
            <div className="slider-group">
              <label>Age (years): <strong>{age}</strong></label>
              <input type="range" min="0" max="30" step="1" value={age} onChange={e => setAge(parseInt(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="subcard-display-right">
          {/* Dynamic SVG house based on the feature vector */}
          <div className="house-svg-wrapper" style={{ transform: `scale(${houseScale})` }}>
            <svg width="160" height="160" viewBox="0 0 160 160">
              {/* Ground */}
              <line x1="10" y1="140" x2="150" y2="140" stroke="#0a0a0a" strokeWidth="4" />
              {/* Walls */}
              <rect x="35" y="65" width="90" height="75" fill={houseColor} stroke="#0a0a0a" strokeWidth="4" />
              {/* Door */}
              <rect x="65" y="95" width="30" height="45" fill="#f5f0e8" stroke="#0a0a0a" strokeWidth="4" />
              {/* Door handle */}
              <circle cx="88" cy="118" r="3" fill="#000" />
              {/* Roof (Changes color based on price) */}
              <polygon points="25,65 80,20 135,65" fill={priceColor} stroke="#0a0a0a" strokeWidth="4" />
              {/* Age/Rust Indicator (only if old) */}
              {age > 15 && (
                <>
                  <path d="M 40 80 Q 45 90 40 100" stroke="#8D4925" strokeWidth="2" fill="none" />
                  <path d="M 115 75 Q 120 85 115 95" stroke="#8D4925" strokeWidth="2" fill="none" />
                </>
              )}
              {/* Modern Windows if young age */}
              {age <= 5 && (
                <>
                  <rect x="45" y="75" width="16" height="16" fill="#1A1AFF" stroke="#0a0a0a" strokeWidth="3" />
                  <rect x="99" y="75" width="16" height="16" fill="#1A1AFF" stroke="#0a0a0a" strokeWidth="3" />
                </>
              )}
            </svg>
          </div>
          <div className="house-badge" style={{ border: '2px solid var(--black)', background: priceColor, color: price > 350 ? '#000' : '#fff' }}>
            {price > 350 ? '💎 Premium Estate' : age > 20 ? '🪵 Heritage Cabin' : '🏠 Modern Suburb'}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ========================================================
   1. ADDITION & SCALING VISUALIZER
   ======================================================== */
function AdditionScalingVisualizer() {
  const [scaleV, setScaleV] = useState(1.0)
  const [scaleW, setScaleW] = useState(1.0)

  // Standard vectors
  const v = { x: 2, y: 1 }
  const w = { x: -1, y: 2 }

  const scaledV = { x: v.x * scaleV, y: v.y * scaleV }
  const scaledW = { x: w.x * scaleW, y: w.y * scaleW }
  const sumVec = { x: scaledV.x + scaledW.x, y: scaledV.y + scaledW.y }

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    ctx.fillStyle = '#f5f0e8'
    ctx.fillRect(0, 0, width, height)

    const center = { x: width / 2, y: height / 2 }
    const scale = 35

    // Draw Grid
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

    // Axes
    ctx.strokeStyle = '#0a0a0a'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, center.y)
    ctx.lineTo(width, center.y)
    ctx.moveTo(center.x, 0)
    ctx.lineTo(center.x, height)
    ctx.stroke()

    // Draw cv (Blue)
    drawVector(scaledV.x, scaledV.y, '#1A1AFF', 'cv')
    // Draw dw (Green) - drawn starting at end of cv to show addition chain
    drawVectorChain(scaledV.x, scaledV.y, scaledW.x, scaledW.y, '#00C853', 'dw')
    // Draw Resultant sumVec (Red)
    drawVector(sumVec.x, sumVec.y, '#FF3B3B', 'cv + dw')

    function drawVector(vx, vy, color, label) {
      const px = center.x + vx * scale
      const py = center.y - vy * scale
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(center.x, center.y)
      ctx.lineTo(px, py)
      ctx.stroke()

      // Arrowhead
      const angle = Math.atan2(center.y - py, px - center.x)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(px - 10 * Math.cos(angle - Math.PI/8), py + 10 * Math.sin(angle - Math.PI/8))
      ctx.lineTo(px - 10 * Math.cos(angle + Math.PI/8), py + 10 * Math.sin(angle + Math.PI/8))
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = '#0a0a0a'
      ctx.font = 'bold 9px Space Mono'
      ctx.fillText(label, px + 5, py - 5)
    }

    function drawVectorChain(sx, sy, vx, vy, color, label) {
      const spx = center.x + sx * scale
      const spy = center.y - sy * scale
      const epx = spx + vx * scale
      const epy = spy - vy * scale

      ctx.strokeStyle = color
      ctx.lineWidth = 2.5
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(spx, spy)
      ctx.lineTo(epx, epy)
      ctx.stroke()
      ctx.setLineDash([])

      // Arrowhead
      const angle = Math.atan2(spy - epy, epx - spx)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(epx, epy)
      ctx.lineTo(epx - 8 * Math.cos(angle - Math.PI/8), epy + 8 * Math.sin(angle - Math.PI/8))
      ctx.lineTo(epx - 8 * Math.cos(angle + Math.PI/8), epy + 8 * Math.sin(angle + Math.PI/8))
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = '#0a0a0a'
      ctx.font = 'bold 9px Space Mono'
      ctx.fillText(label, epx + 5, epy - 5)
    }

  }, [scaleV, scaleW])

  return (
    <div className="la-subcard">
      <div className="subcard-header">1. Addition &amp; Scaling</div>
      <div className="subcard-grid">
        <div className="subcard-controls">
          <p className="la-concept-text">
            <strong>Vector Addition</strong> represents data combination:
            <code style={{ display: 'block', margin: '8px 0' }}>v + w = [v₁ + w₁, v₂ + w₂]</code>
            <strong>Scalar Scaling</strong> stretches or shrinks vectors:
            <code style={{ display: 'block', margin: '8px 0' }}>cv = [cv₁, cv₂]</code>
          </p>

          <div className="visualizer-inputs">
            <div className="slider-group">
              <label>Scale Vector v (c): <strong>{scaleV.toFixed(1)}</strong></label>
              <input type="range" min="-2.0" max="2.0" step="0.2" value={scaleV} onChange={e => setScaleV(parseFloat(e.target.value))} />
            </div>
            <div className="slider-group">
              <label>Scale Vector w (d): <strong>{scaleW.toFixed(1)}</strong></label>
              <input type="range" min="-2.0" max="2.0" step="0.2" value={scaleW} onChange={e => setScaleW(parseFloat(e.target.value))} />
            </div>
          </div>

          <div className="la-formula-pill">
            <code>Result = [{sumVec.x.toFixed(1)}, {sumVec.y.toFixed(1)}]</code>
          </div>
        </div>

        <div className="subcard-display-right">
          <canvas ref={canvasRef} width={260} height={260} style={{ border: '2px solid var(--black)', background: '#fff' }} />
        </div>
      </div>
    </div>
  )
}

/* ========================================================
   2. DOT PRODUCT (SIMILARITY) VISUALIZER
   ======================================================== */
function DotProductVisualizer() {
  const [angle, setAngle] = useState(45) // in degrees

  const rad = (angle * Math.PI) / 180
  const v = { x: 3, y: 0 } // Fixed on x-axis
  const w = { x: Math.cos(rad) * 3, y: Math.sin(rad) * 3 }

  // Dot product calculation
  const dotVal = v.x * w.x + v.y * w.y

  // Similarity text
  const similarityText = dotVal > 1.5
    ? '🔥 HIGHLY SIMILAR (Pointing same direction)'
    : dotVal < -1.5
    ? '❄️ OPPOSING DIRECTION (Opposite correlation)'
    : '⚖️ ORTHOGONAL / NEUTRAL (90° Independent)'

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    ctx.fillStyle = '#f5f0e8'
    ctx.fillRect(0, 0, width, height)

    const center = { x: width / 2, y: height / 2 }
    const scale = 30

    // Grid
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

    // Axes
    ctx.strokeStyle = '#0a0a0a'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, center.y)
    ctx.lineTo(width, center.y)
    ctx.moveTo(center.x, 0)
    ctx.lineTo(center.x, height)
    ctx.stroke()

    // Draw Vector v (Green, static)
    drawVector(v.x, v.y, '#00C853', 'v')
    // Draw Vector w (Blue, rotatable)
    drawVector(w.x, w.y, '#1A1AFF', 'w')

    function drawVector(vx, vy, color, label) {
      const px = center.x + vx * scale
      const py = center.y - vy * scale
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(center.x, center.y)
      ctx.lineTo(px, py)
      ctx.stroke()

      // Arrowhead
      const ang = Math.atan2(center.y - py, px - center.x)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(px - 10 * Math.cos(ang - Math.PI/8), py + 10 * Math.sin(ang - Math.PI/8))
      ctx.lineTo(px - 10 * Math.cos(ang + Math.PI/8), py + 10 * Math.sin(ang + Math.PI/8))
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = '#0a0a0a'
      ctx.font = 'bold 10px Space Mono'
      ctx.fillText(label, px + 5, py - 5)
    }

  }, [angle])

  return (
    <div className="la-subcard">
      <div className="subcard-header">2. Dot Product (Similarity)</div>
      <div className="subcard-grid">
        <div className="subcard-controls">
          <p className="la-concept-text">
            The <strong>Dot Product</strong> measures alignment or cosine similarity. Used in AI recommendations:
            <code style={{ display: 'block', margin: '8px 0' }}>v · w = ||v|| ||w|| cos(θ)</code>
          </p>

          <div className="visualizer-inputs">
            <div className="slider-group">
              <label>Rotate Vector w (θ): <strong>{angle}°</strong></label>
              <input type="range" min="-180" max="180" step="5" value={angle} onChange={e => setAngle(parseInt(e.target.value))} />
            </div>
          </div>

          <div className="similarity-rating-box" style={{ background: dotVal > 1.5 ? 'var(--yellow)' : dotVal < -1.5 ? 'var(--red)' : '#1A1AFF', color: dotVal < -1.5 || dotVal === 0 ? '#fff' : '#000', border: '2px solid var(--black)', padding: '10px', fontSize: '0.8rem', fontWeight: 'bold', fontFamily: 'Space Mono' }}>
            {similarityText}
          </div>

          <div className="la-formula-pill" style={{ marginTop: '1.2rem' }}>
            <code>v · w = {dotVal.toFixed(2)}</code>
          </div>
        </div>

        <div className="subcard-display-right">
          <canvas ref={canvasRef} width={260} height={260} style={{ border: '2px solid var(--black)', background: '#fff' }} />
        </div>
      </div>
    </div>
  )
}

/* ========================================================
   3. NORM, DISTANCE & PROJECTION playground
   ======================================================== */
function DistanceProjectionVisualizer() {
  const [u, setU] = useState({ x: 3, y: 3 })
  const [v, setV] = useState({ x: 4, y: 0 })

  // Distance computation
  const dist = Math.sqrt(Math.pow(u.x - v.x, 2) + Math.pow(u.y - v.y, 2))

  // Projection of u onto v: (u . v) / ||v||^2 * v
  const uDotV = u.x * v.x + u.y * v.y
  const vNormSq = v.x * v.x + v.y * v.y
  const projFactor = vNormSq > 0 ? uDotV / vNormSq : 0
  const projVec = { x: v.x * projFactor, y: v.y * projFactor }

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    ctx.fillStyle = '#f5f0e8'
    ctx.fillRect(0, 0, width, height)

    const center = { x: width / 2, y: height / 2 }
    const scale = 25

    // Grid
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

    // Axes
    ctx.strokeStyle = '#0a0a0a'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, center.y)
    ctx.lineTo(width, center.y)
    ctx.moveTo(center.x, 0)
    ctx.lineTo(center.x, height)
    ctx.stroke()

    // Draw Vector v (Static on x-axis to make projection easy to see)
    drawVector(0, 0, v.x, v.y, '#00C853', 'v')
    // Draw Vector u
    drawVector(0, 0, u.x, u.y, '#1A1AFF', 'u')

    // Distance line (Red dashed line connecting u and v)
    ctx.strokeStyle = '#FF3B3B'
    ctx.lineWidth = 2.5
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(center.x + u.x * scale, center.y - u.y * scale)
    ctx.lineTo(center.x + v.x * scale, center.y - v.y * scale)
    ctx.stroke()
    ctx.setLineDash([])

    // Projection shadow (Grey dashed projection line from u tip down to x-axis)
    ctx.strokeStyle = '#777'
    ctx.lineWidth = 1.5
    ctx.setLineDash([2, 2])
    ctx.beginPath()
    ctx.moveTo(center.x + u.x * scale, center.y - u.y * scale)
    ctx.lineTo(center.x + projVec.x * scale, center.y - projVec.y * scale)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw Projection Vector (Gold/Orange highlighted line on x-axis)
    drawVector(0, 0, projVec.x, projVec.y, '#FFD600', 'proj_v(u)')

    function drawVector(sx, sy, vx, vy, color, label) {
      const spx = center.x + sx * scale
      const spy = center.y - sy * scale
      const epx = center.x + vx * scale
      const epy = center.y - vy * scale

      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(spx, spy)
      ctx.lineTo(epx, epy)
      ctx.stroke()

      const ang = Math.atan2(spy - epy, epx - spx)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(epx, epy)
      ctx.lineTo(epx - 8 * Math.cos(ang - Math.PI/8), epy + 8 * Math.sin(ang - Math.PI/8))
      ctx.lineTo(epx - 8 * Math.cos(ang + Math.PI/8), epy + 8 * Math.sin(ang + Math.PI/8))
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = '#0a0a0a'
      ctx.font = 'bold 9px Space Mono'
      ctx.fillText(label, epx + 5, epy - 5)
    }

  }, [u, v])

  return (
    <div className="la-subcard">
      <div className="subcard-header">3. Norm, Distance &amp; Projection</div>
      <div className="subcard-grid">
        <div className="subcard-controls">
          <p className="la-concept-text">
            <strong>Norm:</strong> Vector magnitude length. <br />
            <strong>Distance:</strong> Fundamental similarity/clustering metric. <br />
            <strong>Projection:</strong> Extracting the component of a vector acting in another's direction.
          </p>

          <div className="visualizer-inputs">
            <div className="slider-group">
              <label>u x-coord: <strong>{u.x}</strong></label>
              <input type="range" min="-4" max="4" step="1" value={u.x} onChange={e => setU({ ...u, x: parseInt(e.target.value) })} />
            </div>
            <div className="slider-group">
              <label>u y-coord: <strong>{u.y}</strong></label>
              <input type="range" min="-4" max="4" step="1" value={u.y} onChange={e => setU({ ...u, y: parseInt(e.target.value) })} />
            </div>
          </div>

          <div className="la-formula-pill" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <code>Distance ||u - v|| = {dist.toFixed(2)}</code>
            <code>Projection factor = {projFactor.toFixed(2)}</code>
          </div>
        </div>

        <div className="subcard-display-right">
          <canvas ref={canvasRef} width={260} height={260} style={{ border: '2px solid var(--black)', background: '#fff' }} />
        </div>
      </div>
    </div>
  )
}

/* ========================================================
   4. LINEAR COMBINATIONS & SPAN (RGB COLOR MIXER)
   ======================================================== */
function RGBSpanVisualizer() {
  const [r, setR] = useState(120)
  const [g, setG] = useState(80)
  const [b, setB] = useState(250)

  return (
    <div className="la-subcard">
      <div className="subcard-header">4. Linear Combinations &amp; Span (RGB Experiment)</div>
      <div className="subcard-grid">
        <div className="subcard-controls">
          <p className="la-concept-text">
            A <strong>Linear Combination</strong> mixes base vectors together. The <strong>Span</strong> is the entire space of outputs.
            <br /><br />
            <strong>RGB Screen Analogy:</strong> The base vectors are Pure Red [255, 0, 0], Pure Green [0, 255, 0], and Pure Blue [0, 0, 255]. Scaling and adding them spans every color visible on screen!
          </p>

          <div className="visualizer-inputs">
            <div className="slider-group">
              <label style={{ color: 'var(--red)' }}>Red factor (x): <strong>{r}</strong></label>
              <input type="range" min="0" max="255" value={r} onChange={e => setR(parseInt(e.target.value))} />
            </div>
            <div className="slider-group">
              <label style={{ color: 'var(--green)' }}>Green factor (y): <strong>{g}</strong></label>
              <input type="range" min="0" max="255" value={g} onChange={e => setG(parseInt(e.target.value))} />
            </div>
            <div className="slider-group">
              <label style={{ color: 'var(--blue)' }}>Blue factor (z): <strong>{b}</strong></label>
              <input type="range" min="0" max="255" value={b} onChange={e => setB(parseInt(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="subcard-display-right" style={{ flexDirection: 'column', gap: '15px' }}>
          {/* Spanned Color Card */}
          <div
            className="color-span-swatch"
            style={{
              width: '100%',
              height: '140px',
              backgroundColor: `rgb(${r}, ${g}, ${b})`,
              border: '3px solid var(--black)',
              boxShadow: '6px 6px 0 var(--black)'
            }}
          />
          <div className="color-span-label" style={{ fontFamily: 'Space Mono', fontWeight: 'bold', fontSize: '0.82rem', textTransform: 'uppercase', background: '#000', color: '#fff', padding: '6px 12px', border: '2px solid #000' }}>
            rgb({r}, {g}, {b})
          </div>
        </div>
      </div>

      <div className="la-think-box" style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--yellow)', border: '2px solid var(--black)' }}>
        <h4 style={{ fontFamily: 'Space Grotesk', textTransform: 'uppercase', marginBottom: '8px' }}>💡 Think About It:</h4>
        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: '1.6' }}>
          <li><strong>Can every color be created?</strong> Yes! The span of these 3 linearly independent primary vectors covers the entire 3D RGB color coordinate space.</li>
          <li><strong>Why can't red-only bases produce blue?</strong> Because the blue vector lies outside the 1D span (a straight line) of the red vector.</li>
        </ul>
      </div>
    </div>
  )
}

/* ========================================================
   5. BASIS & DIMENSION (REDUNDANCY DEMO)
   ======================================================== */
function BasisDimensionVisualizer() {
  const [collinear, setCollinear] = useState(false)

  // Vector base 1
  const v1 = { x: 2, y: 1 }
  // Vector base 2 (Linear dependent/collinear if collinear state is true)
  const v2 = collinear ? { x: 4, y: 2 } : { x: -1, y: 2 }

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    ctx.fillStyle = '#f5f0e8'
    ctx.fillRect(0, 0, width, height)

    const center = { x: width / 2, y: height / 2 }
    const scale = 28

    // Grid
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

    // Axes
    ctx.strokeStyle = '#0a0a0a'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, center.y)
    ctx.lineTo(width, center.y)
    ctx.moveTo(center.x, 0)
    ctx.lineTo(center.x, height)
    ctx.stroke()

    // Draw Vector 1 (Blue)
    drawVector(v1.x, v1.y, '#1A1AFF', 'v1')
    // Draw Vector 2 (Red or Green depending on dependency)
    drawVector(v2.x, v2.y, collinear ? '#FF3B3B' : '#00C853', 'v2')

    function drawVector(vx, vy, color, label) {
      const px = center.x + vx * scale
      const py = center.y - vy * scale
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(center.x, center.y)
      ctx.lineTo(px, py)
      ctx.stroke()

      const ang = Math.atan2(center.y - py, px - center.x)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(px - 10 * Math.cos(ang - Math.PI/8), py + 10 * Math.sin(ang - Math.PI/8))
      ctx.lineTo(px - 10 * Math.cos(ang + Math.PI/8), py + 10 * Math.sin(ang + Math.PI/8))
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = '#0a0a0a'
      ctx.font = 'bold 9px Space Mono'
      ctx.fillText(label, px + 5, py - 5)
    }

  }, [collinear])

  return (
    <div className="la-subcard" style={{ borderBottom: 'none' }}>
      <div className="subcard-header">5. Basis &amp; Dimension (Redundancy Detection)</div>
      <div className="subcard-grid">
        <div className="subcard-controls">
          <p className="la-concept-text">
            A <strong>Basis</strong> is a set of vectors that are <em>linearly independent</em> and span the space. The <strong>Dimension</strong> is the size of the basis.
            <br /><br />
            <strong>Redundancy:</strong> If a new feature can be constructed perfectly by existing features, it adds zero new information (Collinear/Dependent).
          </p>

          <div className="visualizer-inputs">
            <button
              className="preset-btn"
              style={{ width: '100%', marginBottom: '10px', background: collinear ? 'var(--red)' : 'var(--green)', color: collinear ? '#fff' : '#000' }}
              onClick={() => setCollinear(!collinear)}
            >
              {collinear ? 'Make Independent (2D Space)' : 'Force Dependent (1D Line)'}
            </button>
          </div>

          <div className="la-formula-pill" style={{ background: collinear ? 'var(--red)' : 'var(--green)', color: collinear ? '#fff' : '#000' }}>
            <code>Space Dimension = {collinear ? '1D (Collinear / Redundant)' : '2D (Spans Full Plane)'}</code>
          </div>
        </div>

        <div className="subcard-display-right">
          <canvas ref={canvasRef} width={260} height={260} style={{ border: '2px solid var(--black)', background: '#fff' }} />
        </div>
      </div>
    </div>
  )
}

/* ========================================================
   MAIN COMPONENT — CH 01
   ======================================================== */
export default function LinearAlgebraPage() {
  return (
    <div className="la-layout">
      <LANav currentPage="la-ch01" />

      <main className="la-main">
        {/* HERO SECTION */}
        <section className="la-hero">
          <div className="la-hero-badge">
            <i className="fa-solid fa-compass-drafting" /> CH 01: Data as a Vector
          </div>
          <h1 className="la-hero-title">
            DATA AS A <br />
            <span className="la-highlight">VECTOR</span>
          </h1>
          <p className="la-hero-sub">
            Structured representations of data and basic metrics. Explore how computer science converts real-world entities into vector coordinates to analyze similarity, dimensions, and spans.
          </p>
        </section>

        {/* TICKER */}
        <div className="ticker la-ticker" aria-hidden="true">
          <div className="ticker-track">
            {['FEATURE VECTORS', 'SCALAR SCALING', 'DOT PRODUCT', 'EUCLIDEAN DISTANCE', 'RGB SPAN', 'LINEAR COMBINATIONS', 'REDUNDANCY DETECTION', 'BASIS & DIMENSION', 'FEATURE VECTORS', 'DOT PRODUCT'].map((t, i) => (
              <span key={i} className="ticker-item">{t}</span>
            ))}
          </div>
        </div>

        {/* CORE EXPERIMENTS SECTION */}
        <section className="la-section">
          <div className="la-section-header">
            <span className="la-section-number">01</span>
            <h2 className="la-section-title">Interactive Mappings &amp; Playgrounds</h2>
          </div>
          <div className="la-section-content" style={{ padding: '0 4rem 4rem' }}>
            <HouseVectorVisualizer />
            <AdditionScalingVisualizer />
            <DotProductVisualizer />
            <DistanceProjectionVisualizer />
            <RGBSpanVisualizer />
            <BasisDimensionVisualizer />
          </div>
        </section>

        <LAChapterBar currentPage="la-ch01" />
      </main>
    </div>
  )
}

