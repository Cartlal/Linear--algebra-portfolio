import { useState, useEffect, useRef } from 'react'
import './App.css'
import karthikPhoto from './assets/karthik photo.jpeg'
import LinearAlgebraPage from './DataAsVectors'
import LAHomePage from './LAHome'
import Ch02Page from './MatricesAsSystemOperators'
import Ch03Page from './SolvingLinearSystems'
import Ch04Page from './VectorSpaces'
import Ch05Page from './Orthogonality'

/* ──────────────────────────────
   DATA
────────────────────────────── */
const SKILLS = [
  {
    icon: 'fa-solid fa-globe',
    name: 'Web & CMS',
    items: [
      { label: 'Web Dev', stars: 4 },
      { label: 'WordPress', stars: 4 },
      { label: 'HTML / CSS', stars: 4 },
    ]
  },
  {
    icon: 'fa-solid fa-code',
    name: 'Languages',
    items: [
      { label: 'Java', stars: 5 },
      { label: 'C++', stars: 4 },
      { label: 'Dart', stars: 5 },
      { label: 'Python', stars: 3 },
      { label: 'JavaScript', stars: 4 },
    ]
  },
  {
    icon: 'fa-solid fa-mobile-screen',
    name: 'Frameworks',
    items: [
      { label: 'Flutter', stars: 5 },
      { label: 'React', stars: 4 },
      { label: 'Node.js', stars: 3 },
      { label: 'Android Dev', stars: 2 },
    ]
  },
  {
    icon: 'fa-solid fa-microchip',
    name: 'Hardware & IoT',
    items: [
      { label: 'Embedded Sys', stars: 3 },
      { label: 'IoT / Sensors', stars: 3 },
      { label: 'Arduino', stars: 3 },
    ]
  },
]

const PROJECTS = [
  {
    num: '#01',
    title: 'VictoryPath AI',
    type: 'React · Node.js · MongoDB · AI',
    desc: 'An intelligent academic analytics platform to detect early student disengagement with AI-powered insights, real-time analytics, and centralized monitoring.',
    link: 'https://github.com/Sarvadnya-Patil/VictoryPath',
    featured: true,
  },
  {
    num: '#02',
    title: 'Invento 2026 MockPress',
    type: 'React · Vite · Socket.io · MongoDB',
    desc: 'Cinematic real-time voting & live projector display system for Invento 2026 Mock Press event with cyber-spy UI, triple-layer anti-fraud protection, and ultra-fast sync.',
    link: 'https://github.com/Cartlal/invento26mockpress',
    featured: true,
  },
  {
    num: '#03',
    title: 'Desktop Voice Assistant',
    type: 'Python · Ollama · OpenCV · Tkinter',
    desc: 'Fully offline AI-powered desktop assistant for Windows — voice commands, local LLM via Ollama, camera automation, GUI, and complete desktop control.',
    link: null,
    featured: true,
  },
  {
    num: '#04',
    title: 'Bulk Emailing (Internal Use)',
    type: 'JavaScript · Internal Tool',
    desc: 'Internal bulk email dispatch tool built for college use, streamlining mass communication workflows.',
    link: 'https://github.com/Cartlal/BULK-EMAILING-INTERNAL-USE',
    featured: false,
  },
  {
    num: '#05',
    title: 'Gemini Proxy',
    type: 'Node.js · Express · API',
    desc: 'Scalable backend proxy for secure and efficient Gemini API communication with optimized routing and API abstraction.',
    link: 'https://github.com/Cartlal/gemini-proxy',
    featured: false,
  },
  {
    num: '#06',
    title: 'Sugarcane Pest Detection App',
    type: 'Flutter · AI · Teachable Machine',
    desc: 'AI-powered mobile app identifying sugarcane leaf diseases from images, providing instant analysis with preventive solutions for farmers.',
    link: null,
    featured: false,
  },
  {
    num: '#07',
    title: 'Temple Website',
    type: 'WordPress · PHP · Hosting',
    desc: 'Developed and deployed a live website for temple information, schedules, and community engagement.',
    link: 'https://toravilaxminarasimha.org',
    featured: false,
  },
  {
    num: '#08',
    title: 'Smart Goggles for Blind People',
    type: 'Embedded Systems · IoT',
    desc: 'Wearable obstacle-detection device delivering real-time audio alerts for independent navigation of visually impaired individuals.',
    link: null,
    featured: false,
  },
  {
    num: '#09',
    title: 'Smart Pond Cleaning Device',
    type: 'IoT · Hardware',
    desc: 'Automated floating waste collection system — a low-cost, sustainable solution for cleaner water bodies.',
    link: null,
    featured: false,
  },
]

const EXPERIENCE = [
  {
    role: 'Development Team Member',
    event: 'Web & Software Division',
    org: 'KLE Technological University',
    loc: 'Belagavi, India',
    period: '2025 — Present',
    color: 'var(--yellow)',
    textColor: 'var(--black)',
    points: [
      'Member of the official KLE Tech Belagavi development team',
      'Building websites for college internal use and administrative tools',
      'Developed the Invento 2026 official fest website and MockPress event system',
      'Collaborated with faculty and student leads on digital infrastructure projects',
      'Shipped a bulk emailing internal tool for college-wide communication',
    ],
  },
  {
    role: 'Club Member',
    event: 'Technical & Coding Club',
    org: 'ArcStack KLE Tech',
    loc: 'Belagavi, India',
    period: '2025 — Present',
    color: 'var(--blue)',
    textColor: 'var(--white)',
    points: [
      'Active member of ArcStack, the official technical and coding club of KLE Tech',
      'Engaging in regular competitive programming challenges, codathons, and hackathons',
      'Collaborating with fellow club members on development projects and learning technical concepts',
    ],
  },
  {
    role: 'Technology Head',
    event: 'School Inter-College Event',
    org: 'KLS Public School',
    loc: 'Belagavi, India',
    period: 'School',
    color: 'var(--black)',
    textColor: 'var(--yellow)',
    points: [
      'Led the technology division for a large-scale inter-school event',
      'Ensured smooth execution of all technical operations throughout the event',
      'Handled real-time troubleshooting and coordination across multiple teams',
    ],
  },
]

const EDUCATION = [
  {
    year: '2025 — Present',
    level: 'University',
    degree: 'B.E. Computer Science Engineering',
    school: 'KLE Technological University, Belagavi',
    detail: 'Bachelor of Engineering in Computer Science Engineering',
  },
  {
    year: '2023 — 2025',
    level: 'Pre-University',
    degree: 'PUC-II (Class 12)',
    school: 'Gogte College of Science & Commerce, Belgaum, India',
    detail: 'Class 12 PUC II',
  },
  {
    year: 'High School',
    level: 'School',
    degree: 'SSLC',
    school: 'KLS Public School, Belgaum, India',
    detail: 'Captain of "Autumn House" · Headed Technology Division for inter-school events',
  },
]

const CERTS = [
  { icon: '📱', name: 'Flutter & Dart', status: 'done' },
  { icon: '🌐', name: 'Fullstack Development', status: 'ongoing' },
  { icon: '🔗', name: 'CCNA — Cisco Networking', status: 'ongoing' },
]

const TICKER_ITEMS = [
  'Flutter Developer', 'Full Stack Dev', 'IoT Builder', 'Android Dev',
  'AI Enthusiast', 'CS Engineering', 'KLE Tech Dev Team', 'React Developer',
  '1,012 GitHub Contributions',
  'Flutter Developer', 'Full Stack Dev', 'IoT Builder', 'Android Dev',
  'AI Enthusiast', 'CS Engineering', 'KLE Tech Dev Team', 'React Developer',
  '1,012 GitHub Contributions',
]

const GITHUB_REPOS = [
  { name: 'invento26mockpress', lang: 'JavaScript', desc: 'Cinematic real-time voting system for Invento 2026', stars: 1, public: true },
  { name: 'BULK-EMAILING-INTERNAL-USE', lang: 'JavaScript', desc: 'Internal college bulk email tool', stars: 0, public: false },
  { name: 'gemini-proxy', lang: 'JavaScript', desc: 'Proxy backend for Gemini API', stars: 0, public: true },
  { name: 'openai-proxy', lang: 'JavaScript', desc: 'AI backend communication system for OpenAI', stars: 0, public: true },
  { name: 'sugarcane-backend', lang: 'JavaScript', desc: 'Agriculture-focused backend platform', stars: 0, public: true },
  { name: 'recruitment-backend', lang: 'JavaScript', desc: 'Recruitment management backend platform', stars: 0, public: true },
]

/* ──────────────────────────────
   HELPERS
────────────────────────────── */
function Stars({ count, max = 5 }) {
  return (
    <span className="skill-stars">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`star${i < count ? '' : ' empty'}`}>★</span>
      ))}
    </span>
  )
}

function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function FadeIn({ children, className = '' }) {
  const ref = useFadeIn()
  return <div ref={ref} className={`fade-in ${className}`}>{children}</div>
}

/* ──────────────────────────────
   NAV
────────────────────────────── */
function Nav() {
  const links = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Github', 'Contact']
  return (
    <nav className="nav">
      <div className="nav-logo">K<span>H</span></div>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}>{l}</a>
          </li>
        ))}
        <li>
          <a href="#la-home" className="nav-highlight">Linear Algebra</a>
        </li>
      </ul>
    </nav>
  )
}

function MathTechBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const symbols = [
      '0', '1', 'λ', 'π', '∑', '∫', 'dy/dx', 'Ax=λx', 'u·v',
      '[]', 'M', 'v', '+', '−', '=', '√', 'θ', 'CSE', 'JS', 'Java', 'IoT',
      '0101', 'matrix', 'vector', 'basis', 'span', 'norm', 'dim', 'RGB'
    ]
    const particles = []
    const particleCount = 18

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * 300,
        y: Math.random() * 400,
        text: symbols[Math.floor(Math.random() * symbols.length)],
        fontSize: Math.floor(Math.random() * 6) + 11, // 11px to 17px
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 0.4 + 0.2), // upward
        opacity: Math.random() * 0.4 + 0.15
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = '#0a0a0a'
        ctx.font = `bold ${p.fontSize}px Space Mono`
        ctx.fillText(p.text, p.x, p.y)

        p.x += p.speedX
        p.y += p.speedY

        if (p.y < -20) {
          p.y = canvas.height + 20
          p.x = Math.random() * canvas.width
          p.opacity = Math.random() * 0.4 + 0.15
        }
        if (p.x < -20 || p.x > canvas.width + 20) {
          p.x = Math.random() * canvas.width
        }
      })

      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.28
      }}
    />
  )
}

/* ──────────────────────────────
   HERO
   ────────────────────────────── */
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Available for Opportunities
        </div>
        <h1 className="hero-name">
          KARTHIK<br />
          <span className="highlight">HIRENARTI</span>
        </h1>
        <p className="hero-subtitle">
          Computer Science Student · KLE Technological University<br />
          Full Stack Developer · Flutter · Java · AI Enthusiast<br />
          KLE Tech Dev Team Member · Belagavi, India
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            <i className="fa-solid fa-arrow-down" /> View Projects
          </a>
          <a href="mailto:karthik.hirenarti@gmail.com" className="btn btn-secondary">
            <i className="fa-solid fa-envelope" /> Get In Touch
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-photo-zone">
          <MathTechBackground />
          <div className="geo-deco deco-1" />
          <div className="geo-deco deco-2" />
          <div className="geo-deco deco-3" />
          <div className="photo-frame">
            <img src={karthikPhoto} alt="Karthik Hirenarti" />
          </div>
        </div>

        <div className="hero-stats">
          {[
            { icon: 'fa-solid fa-envelope', title: 'Email', value: 'karthik.hirenarti@gmail.com', href: 'mailto:karthik.hirenarti@gmail.com' },
            { icon: 'fa-solid fa-phone', title: 'Phone', value: '+91 7204404872', href: 'tel:+917204404872' },
            { icon: 'fa-brands fa-linkedin', title: 'LinkedIn', value: 'karthikhirenarti', href: 'https://www.linkedin.com/in/karthikhirenarti/' },
            { icon: 'fa-brands fa-github', title: 'GitHub', value: 'Cartlal', href: 'https://github.com/Cartlal' },
          ].map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="stat-box hero-contact-box"
              style={{
                borderLeft: i % 2 === 1 ? 'var(--border)' : undefined,
                borderTop: i >= 2 ? 'var(--border)' : undefined,
              }}
            >
              <div className="stat-number">
                <i className={c.icon} />
                {c.title}
              </div>
              <div className="stat-label">{c.value}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────
   TICKER
────────────────────────────── */
function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {TICKER_ITEMS.map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────
   ABOUT
────────────────────────────── */
function About() {
  return (
    <section className="section" id="about">
      <div className="section-header">
        <span className="section-number">01</span>
        <h2 className="section-title">About Me</h2>
      </div>
      <div className="about-content">
        <div className="about-left">
          <FadeIn>
            <p className="about-text">
              I am Karthik Hirenarti, a first year Computer Science undergraduate at KLE Technological University, Belagavi.
            </p>
            <p className="about-text">
              My journey with technology began early — from learning basic computer tools as a child to building my first website in school and managing technical teams during inter-school events. Over time, I became known as the "tech guy" who could solve problems, build solutions, and bring ideas to reality.
            </p>
            <p className="about-text">
              I am particularly interested in software development, web development, app development, AI & machine learning, and cybersecurity. I enjoy transforming ideas into impactful products through development, experimentation, and collaboration. My goal is to build impactful, reliable, and meaningful technology.
            </p>
            <div className="interest-chips">
              {['📱 Mobile Dev', '🌐 Full Stack Web', '🤖 AI & ML', '🔌 Embedded / IoT', '🎨 UI/UX Design', '⚡ Backend APIs'].map(chip => (
                <span key={chip} className="interest-chip">{chip}</span>
              ))}
            </div>
          </FadeIn>
        </div>
        <div className="about-right">
          <FadeIn>
            <div className="personal-grid">
              {[
                { label: 'Date of Birth', value: '10-09-2007' },
                { label: 'Nationality', value: 'Indian' },
                { label: 'Gender', value: 'Male' },
                { label: 'Religion', value: 'Hindu' },
                { label: 'Location', value: 'Belagavi, India 560001' },
                { label: 'University', value: 'KLE Tech University' },
              ].map(p => (
                <div key={p.label} className="personal-item">
                  <div className="personal-label">{p.label}</div>
                  <div className="personal-value">{p.value}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────
   SKILLS
────────────────────────────── */
function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-header">
        <span className="section-number">02</span>
        <h2 className="section-title">Skills &amp; Tech Stack</h2>
      </div>
      <div className="skills-grid">
        {SKILLS.map((sk, i) => (
          <FadeIn key={i} className="skill-card">
            <div className="skill-icon"><i className={sk.icon} /></div>
            <div className="skill-name">{sk.name}</div>
            <div className="skill-items">
              {sk.items.map(it => (
                <div key={it.label} className="skill-row">
                  <div className="skill-row-label">
                    <span>{it.label}</span>
                    <Stars count={it.stars} />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────
   PROJECTS
────────────────────────────── */
function Projects() {
  const [showAll, setShowAll] = useState(false)
  const featured = PROJECTS.filter(p => p.featured)
  const rest = PROJECTS.filter(p => !p.featured)
  const displayed = showAll ? PROJECTS : featured

  return (
    <section className="section" id="projects">
      <div className="section-header">
        <span className="section-number">03</span>
        <h2 className="section-title">Projects</h2>
        <span className="section-tag">21+ Repositories on GitHub</span>
      </div>

      {/* Featured label */}
      <div className="projects-label">
        <span>Featured</span>
      </div>
      <div className="projects-grid">
        {featured.map((p, i) => (
          <FadeIn key={i} className={`project-card${p.featured ? ' project-featured' : ''}`}>
            <div className="project-num">{p.num}</div>
            {p.featured && <span className="project-badge">Featured</span>}
            <h3 className="project-title">{p.title}</h3>
            <span className="project-type">{p.type}</span>
            <p className="project-desc">{p.desc}</p>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="project-link">
                <i className="fa-brands fa-github" /> View on GitHub
              </a>
            )}
          </FadeIn>
        ))}
      </div>

      {/* Other projects */}
      {showAll && (
        <>
          <div className="projects-label" style={{ borderTop: 'var(--border)' }}>
            <span>Other Projects</span>
          </div>
          <div className="projects-grid">
            {rest.map((p, i) => (
              <FadeIn key={i} className="project-card">
                <div className="project-num">{p.num}</div>
                <h3 className="project-title">{p.title}</h3>
                <span className="project-type">{p.type}</span>
                <p className="project-desc">{p.desc}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="project-link">
                    <i className={p.link.includes('github') ? 'fa-brands fa-github' : 'fa-solid fa-arrow-up-right-from-square'} /> {p.link.includes('github') ? 'View on GitHub' : 'Live Site'}
                  </a>
                )}
              </FadeIn>
            ))}
          </div>
        </>
      )}

      <div style={{ padding: '2rem 4rem', borderTop: 'var(--border)' }}>
        <button className="btn btn-primary" onClick={() => setShowAll(!showAll)}>
          <i className={`fa-solid fa-${showAll ? 'chevron-up' : 'chevron-down'}`} />
          {showAll ? 'Show Less' : `Show All ${PROJECTS.length} Projects`}
        </button>
      </div>
    </section>
  )
}

/* ──────────────────────────────
   EXPERIENCE
────────────────────────────── */
function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section-header">
        <span className="section-number">04</span>
        <h2 className="section-title">Experience</h2>
      </div>
      <div className="exp-content">
        {EXPERIENCE.map((ex, i) => (
          <FadeIn key={i} style={{ marginBottom: i < EXPERIENCE.length - 1 ? '2rem' : 0 }}>
            <div className="exp-card">
              <div className="exp-left" style={{ background: ex.color, color: ex.textColor }}>
                <div>
                  <div className="exp-role">{ex.role}</div>
                  <div className="exp-event" style={{ opacity: 0.75 }}>{ex.event}</div>
                  <div className="exp-period">{ex.period}</div>
                </div>
                <div>
                  <div className="exp-org" style={{ borderColor: ex.textColor }}>{ex.org}</div>
                  <div className="exp-loc">
                    <i className="fa-solid fa-location-dot" /> {ex.loc}
                  </div>
                </div>
              </div>
              <div className="exp-right">
                <ul className="exp-list">
                  {ex.points.map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────
   EDUCATION
────────────────────────────── */
function Education() {
  return (
    <section className="section" id="education">
      <div className="section-header">
        <span className="section-number">05</span>
        <h2 className="section-title">Education</h2>
      </div>
      <div className="edu-grid">
        {EDUCATION.map((e, i) => (
          <FadeIn key={i} className="edu-card">
            <div className="edu-year">{e.year}</div>
            <div className="edu-level">{e.level}</div>
            <div className="edu-degree">{e.degree}</div>
            <div className="edu-school">{e.school}</div>
            {e.detail && <div className="edu-detail">{e.detail}</div>}
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────
   ACHIEVEMENTS
────────────────────────────── */
function Achievements() {
  return (
    <section className="achievements-section" id="achievements">
      <div className="section-header">
        <span className="section-number">06</span>
        <h2 className="section-title">Achievements</h2>
      </div>
      <div className="achievements-grid">
        <FadeIn className="ach-card ach-card-gold">
          <div className="ach-icon">🥇</div>
          <div>
            <div className="ach-title">1st Prize — IEEE ITS Software Hackathon</div>
            <div className="ach-desc">Won first place at the IEEE Information Technology Society (ITS) Software Hackathon, earning a cash prize of <strong>₹2,000</strong>.</div>
          </div>
        </FadeIn>
        <FadeIn className="ach-card">
          <div className="ach-icon">🏆</div>
          <div>
            <div className="ach-title">Top 25 Teams — Code Bharat 2025</div>
            <div className="ach-desc">Recognized at IIT Dharwad in one of India's most competitive national coding challenges.</div>
          </div>
        </FadeIn>
        <FadeIn className="ach-card">
          <div className="ach-icon">⭐</div>
          <div>
            <div className="ach-title">Captain — Autumn House</div>
            <div className="ach-desc">Led Autumn House at KLS Public School, demonstrating strong leadership and team coordination skills.</div>
          </div>
        </FadeIn>
        <FadeIn className="ach-card">
          <div className="ach-icon">🚀</div>
          <div>
            <div className="ach-title">1,012 GitHub Contributions</div>
            <div className="ach-desc">Consistent open-source and project activity across 21+ repositories in the last year.</div>
          </div>
        </FadeIn>
        <FadeIn className="ach-card">
          <div className="ach-icon">🎯</div>
          <div>
            <div className="ach-title">KLE Tech Dev Team Member</div>
            <div className="ach-desc">Selected as a member of KLE Technological University's official web and software development team.</div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ──────────────────────────────
   GITHUB SECTION
────────────────────────────── */
function Github() {
  return (
    <section className="section github-section" id="github">
      <div className="section-header">
        <span className="section-number">07</span>
        <h2 className="section-title">GitHub Activity</h2>
        <a href="https://github.com/Cartlal" target="_blank" rel="noreferrer" className="section-link">
          <i className="fa-brands fa-github" /> @Cartlal
        </a>
      </div>

      {/* Stats row */}
      <div className="github-stats-row">
        <FadeIn className="github-stat-card github-stat-highlight">
          <div className="github-stat-num">1,012</div>
          <div className="github-stat-label">Contributions (Last Year)</div>
        </FadeIn>
        <FadeIn className="github-stat-card">
          <div className="github-stat-num">21</div>
          <div className="github-stat-label">Repositories</div>
        </FadeIn>
        <FadeIn className="github-stat-card">
          <div className="github-stat-num">6</div>
          <div className="github-stat-label">Followers</div>
        </FadeIn>
        <FadeIn className="github-stat-card">
          <div className="github-stat-num">55</div>
          <div className="github-stat-label">Following</div>
        </FadeIn>
        <FadeIn className="github-stat-card">
          <div className="github-stat-num">3</div>
          <div className="github-stat-label">Achievements</div>
        </FadeIn>
      </div>

      {/* Achievements badges */}
      <div className="github-badges-row">
        <FadeIn>
          <div className="github-badges-label">GitHub Achievements</div>
          <div className="github-badges">
            {[
              { icon: '🦈', name: 'Pull Shark ×3' },
              { icon: '⚡', name: 'Quickdraw' },
              { icon: '🎯', name: 'YOLO' },
            ].map(b => (
              <div key={b.name} className="github-badge">
                <span className="github-badge-icon">{b.icon}</span>
                <span className="github-badge-name">{b.name}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Recent repos */}
      <div className="github-repos-label">Popular Repositories</div>
      <div className="github-repos-grid">
        {GITHUB_REPOS.map((repo, i) => (
          <FadeIn key={i} className="github-repo-card">
            <div className="repo-header">
              <i className="fa-solid fa-book-open" />
              <a
                href={`https://github.com/Cartlal/${repo.name}`}
                target="_blank"
                rel="noreferrer"
                className="repo-name"
              >
                {repo.name}
              </a>
              <span className={`repo-visibility ${repo.public ? 'pub' : 'priv'}`}>
                {repo.public ? 'Public' : 'Private'}
              </span>
            </div>
            <p className="repo-desc">{repo.desc}</p>
            <div className="repo-footer">
              <span className="repo-lang"><span className="repo-lang-dot" />{repo.lang}</span>
              {repo.stars > 0 && <span className="repo-stars">⭐ {repo.stars}</span>}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────
   CERTIFICATIONS
────────────────────────────── */
function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="section-header">
        <span className="section-number">08</span>
        <h2 className="section-title">Certifications</h2>
      </div>
      <div className="cert-scroll">
        {CERTS.map((c, i) => (
          <FadeIn key={i} className="cert-card">
            <span className={`cert-status ${c.status}`}>
              {c.status === 'done' ? 'Completed' : 'Ongoing'}
            </span>
            <div className="cert-icon">{c.icon}</div>
            <div className="cert-name">{c.name}</div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────
   EXTRACURRICULAR
────────────────────────────── */
function Extra() {
  return (
    <section className="section" id="extra">
      <div className="section-header">
        <span className="section-number">09</span>
        <h2 className="section-title">Extracurricular</h2>
      </div>
      <div className="extra-content">
        <FadeIn className="extra-card">
          <i className="fa-solid fa-flask" />
          <div>
            <div className="extra-card-title">Technical Events &amp; Exhibitions (DTSI)</div>
            <p className="extra-card-desc">Active participant in technical events and exhibitions, showcasing projects and innovations to industry professionals.</p>
          </div>
        </FadeIn>
        <FadeIn className="extra-card">
          <i className="fa-solid fa-rocket" />
          <div>
            <div className="extra-card-title">College Fest Development</div>
            <p className="extra-card-desc">Drives development and experimental projects during college fests, building real-world solutions under pressure.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ──────────────────────────────
   CONTACT
────────────────────────────── */
function Contact() {
  const items = [
    { icon: 'fa-solid fa-envelope', label: 'karthik.hirenarti@gmail.com', href: 'mailto:karthik.hirenarti@gmail.com' },
    { icon: 'fa-solid fa-phone', label: '+91 7204404872', href: 'tel:+917204404872' },
    { icon: 'fa-solid fa-location-dot', label: 'Belagavi, India 560001', href: '#contact' },
    { icon: 'fa-brands fa-linkedin', label: 'linkedin.com/in/karthikhirenarti', href: 'https://www.linkedin.com/in/karthikhirenarti/' },
    { icon: 'fa-brands fa-github', label: 'github.com/Cartlal', href: 'https://github.com/Cartlal' },
    { icon: 'fa-solid fa-globe', label: 'toravilaxminarasimha.org', href: 'https://toravilaxminarasimha.org' },
  ]
  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <div className="contact-left">
          <h2 className="contact-title">LET'S <span>TALK</span></h2>
          <p className="contact-sub">Have a project idea, collaboration offer, or just want to say hi? My inbox is always open.</p>
        </div>
        <div className="contact-right">
          {items.map((it, i) => (
            <a key={i} href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-item">
              <i className={it.icon} />
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────
   FOOTER
────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">KARTHIK <span>HIRENARTI</span></div>
      <div className="footer-copy">© 2026 Karthik Hirenarti. All rights reserved.</div>
    </footer>
  )
}

/* ──────────────────────────────
   APP
────────────────────────────── */
export default function App() {
  const [view, setView] = useState('portfolio')

  useEffect(() => {
    const handlePath = () => {
      // Remove leading slash, e.g. "/data-as-vectors" -> "data-as-vectors"
      const path = window.location.pathname.replace(/^\/+/, '')
      
      const LA_VIEWS = ['la-home', 'data-as-vectors', 'matrices-as-system-operators', 'solving-linear-systems', 'vector-spaces', 'orthogonality']
      
      if (LA_VIEWS.includes(path)) {
        setView(path)
      } else {
        setView('portfolio')
      }
    }
    handlePath()
    window.addEventListener('popstate', handlePath)
    return () => window.removeEventListener('popstate', handlePath)
  }, [])

  /* LA Section — each chapter is a full self-contained page with its own sidebar nav */
  const LA_PAGES = {
    'la-home': <LAHomePage />,
    'data-as-vectors': <LinearAlgebraPage />,
    'matrices-as-system-operators': <Ch02Page />,
    'solving-linear-systems': <Ch03Page />,
    'vector-spaces': <Ch04Page />,
    'orthogonality': <Ch05Page />,
  }

  if (LA_PAGES[view]) {
    return (
      <>
        {LA_PAGES[view]}
        <footer className="footer" style={{ background: '#ede8dc' }}>
          <div className="footer-logo">KARTHIK <span>HIRENARTI</span></div>
          <div className="footer-copy">© 2026 Karthik Hirenarti · Linear Algebra Academic Project</div>
        </footer>
      </>
    )
  }

  return (
    <>
      <Hero />
      <Ticker />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Achievements />
      <Github />
      <Certifications />
      <Extra />
      <Contact />
      <Footer />
    </>
  )
}
