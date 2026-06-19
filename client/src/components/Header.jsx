import { useState, useEffect } from 'react'

const NAV_LINKS = [
  ['portfolio', 'Projets'],
  ['services', 'Services'],
  ['process', 'Processus'],
  ['contact', 'Contact'],
]

export default function Header({ onRequestClick }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = NAV_LINKS.map(([id]) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleCta = () => {
    if (onRequestClick) {
      onRequestClick()
    } else {
      window.location.href = '/#contact'
    }
    setMenuOpen(false)
  }

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">

        <a href="/" className="header__logo">
          <span className="header__logo-by">By</span> OT's
        </a>

        <ul className={`header__links${menuOpen ? ' header__links--open' : ''}`}>
          {NAV_LINKS.map(([id, label]) => (
            <li key={id}>
              <button
                className={active === id ? 'header__link--active' : ''}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button className="header__cta" onClick={handleCta}>
          Démarrer un projet
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          className={`header__burger${menuOpen ? ' header__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>

      </div>
    </header>
  )
}
