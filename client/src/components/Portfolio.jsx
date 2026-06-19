import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

const PROJECTS = [
  {
    id: 1,
    name: 'Vite & Gourmand',
    category: 'Restauration',
    tags: ['React', 'Vite', 'SASS'],
    description: 'Site vitrine pour un restaurant gastronomique avec menu interactif, réservation en ligne et galerie photo.',
    gradient: 'linear-gradient(135deg, #1A1A2E 0%, #2E2A4A 50%, #7A6AAE 100%)',
    accent: '#A898E0',
    image: '/projects/vite-et-gourmand.jpg',
  },
  {
    id: 2,
    name: 'VilaThai Lounge',
    category: 'Restauration',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: 'Identité visuelle digitale et site pour un restaurant thaïlandais, avec carte en ligne et ambiance immersive.',
    gradient: 'linear-gradient(135deg, #0E1A2A 0%, #1A3050 50%, #6AAACE 100%)',
    accent: '#A0C8F0',
    image: '/projects/vilathai-lounge.jpg',
  },
  {
    id: 3,
    name: 'ODAR',
    category: 'Associatif',
    tags: ['React', 'Node.js', 'Express'],
    description: 'Plateforme web pour une association culturelle : agenda, publications, formulaires d\'adhésion et back-office.',
    gradient: 'linear-gradient(135deg, #101E1A 0%, #1A3430 50%, #4A9480 100%)',
    accent: '#80C4B0',
    image: '/projects/odar.jpg',
  },
  {
    id: 4,
    name: 'Prochain projet',
    category: 'Bientôt',
    tags: ['Votre projet'],
    description: 'Ce slot pourrait être votre projet. Parlons-en et construisons quelque chose de mémorable ensemble.',
    gradient: 'linear-gradient(135deg, #1B1B19 0%, #2E2E2C 100%)',
    accent: '#4A7858',
    image: null,
    placeholder: true,
  },
]

function Lightbox({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Fermer">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      <div className="lightbox__panel" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox__img-wrap">
          {project.image
            ? <img src={project.image} alt={project.name} className="lightbox__img" />
            : (
              <div className="lightbox__placeholder" style={{ background: project.gradient }}>
                <span>Image bientôt disponible</span>
              </div>
            )
          }
        </div>
        <div className="lightbox__info">
          <div className="lightbox__tags">
            {project.tags.map(t => (
              <span key={t} className="project-card__tag">{t}</span>
            ))}
          </div>
          <h3 className="lightbox__name">{project.name}</h3>
          <p className="lightbox__desc">{project.description}</p>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index, isActive, onOpen }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className={[
        'project-card',
        visible   ? 'project-card--visible'     : '',
        isActive  ? 'project-card--active'      : '',
        project.placeholder ? 'project-card--placeholder' : '',
      ].filter(Boolean).join(' ')}
      style={{ '--delay': `${index * 120}ms`, '--accent': project.accent }}
      onClick={() => !project.placeholder && onOpen(project)}
      role={project.placeholder ? undefined : 'button'}
      tabIndex={project.placeholder ? undefined : 0}
      onKeyDown={(e) => { if (!project.placeholder && e.key === 'Enter') onOpen(project) }}
    >
      <div className="project-card__thumb" style={{ background: project.gradient }}>
        <div className="project-card__thumb-inner">
          {!project.placeholder && (
            <>
              <span className="project-card__category">{project.category}</span>
              <div className="project-card__zoom">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 3h4v4M7 15H3v-4M3 3l5 5M15 15l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </>
          )}
          {project.placeholder && (
            <div className="project-card__plus">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 6v20M6 16h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="project-card__body">
        <div className="project-card__tags">
          {project.tags.map(t => (
            <span key={t} className="project-card__tag">{t}</span>
          ))}
        </div>
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__desc">{project.description}</p>
      </div>
    </article>
  )
}

export default function Portfolio() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [headerRef, headerVisible] = useInView()
  const [lightboxProject, setLightboxProject] = useState(null)

  // Drag state
  const isDragging = useRef(false)
  const didDrag    = useRef(false)
  const dragStart  = useRef({ x: 0, scrollLeft: 0 })
  const velocity   = useRef(0)
  const prevX      = useRef(0)
  const rafId      = useRef(null)

  const snapToNearest = () => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children)
    const pad = parseInt(getComputedStyle(track).paddingLeft) || 0
    let closest = 0, minDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - pad - track.scrollLeft)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    track.style.scrollSnapType = 'x mandatory'
    track.scrollTo({ left: cards[closest].offsetLeft - pad, behavior: 'smooth' })
    setActiveIndex(closest)
  }

  const goTo = (index) => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children)
    const card = cards[index]
    if (!card) return
    const pad = parseInt(getComputedStyle(track).paddingLeft) || 0
    track.scrollTo({ left: card.offsetLeft - pad, behavior: 'smooth' })
    setActiveIndex(index)
  }

  // Drag + momentum (souris desktop uniquement)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return
      isDragging.current = true
      didDrag.current    = false
      dragStart.current  = { x: e.clientX, scrollLeft: track.scrollLeft }
      prevX.current      = e.clientX
      velocity.current   = 0
      track.style.scrollSnapType = 'none'
      track.style.cursor = 'grabbing'
      track.setPointerCapture(e.pointerId)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }

    const onPointerMove = (e) => {
      if (!isDragging.current) return
      const dx = e.clientX - dragStart.current.x
      if (Math.abs(dx) > 5) didDrag.current = true
      track.scrollLeft = dragStart.current.scrollLeft - dx
      velocity.current = prevX.current - e.clientX
      prevX.current    = e.clientX
    }

    const applyMomentum = () => {
      velocity.current *= 0.88
      track.scrollLeft += velocity.current
      if (Math.abs(velocity.current) > 0.6) {
        rafId.current = requestAnimationFrame(applyMomentum)
      } else {
        snapToNearest()
      }
    }

    const onPointerUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      track.style.cursor = 'grab'
      rafId.current = requestAnimationFrame(applyMomentum)
    }

    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup',   onPointerUp)
    track.addEventListener('pointercancel', onPointerUp)

    return () => {
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup',   onPointerUp)
      track.removeEventListener('pointercancel', onPointerUp)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Sync dots on native scroll (touch)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const cards = Array.from(track.children)
      const trackLeft = track.getBoundingClientRect().left
      let closest = 0, minDist = Infinity
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - trackLeft)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setActiveIndex(closest)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const handleOpen = (project) => {
    if (didDrag.current) return
    setLightboxProject(project)
  }

  return (
    <section id="portfolio" className="portfolio">
      <div className="section__inner">
        <div className="section__header" ref={headerRef}>
          <span className={`section__eyebrow${headerVisible ? ' is-visible' : ''}`} data-slide="up">
            Réalisations
          </span>
          <h2 className={`section__title${headerVisible ? ' is-visible' : ''}`} data-slide="up" data-delay="1">
            Mes projets récents
          </h2>
          <p className={`section__subtitle${headerVisible ? ' is-visible' : ''}`} data-slide="up" data-delay="2">
            Chaque projet est unique — conçu et développé sur mesure pour répondre
            aux besoins spécifiques de chaque client.
          </p>
        </div>
      </div>

      <div className="portfolio__track" ref={trackRef}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} isActive={activeIndex === i} onOpen={handleOpen} />
        ))}
      </div>

      <div className="section__inner">
        <div className="portfolio__nav">
          <div className="portfolio__nav-dots">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                className={`portfolio__nav-dot${activeIndex === i ? ' portfolio__nav-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Aller au projet ${i + 1}`}
              />
            ))}
          </div>
          <div className="portfolio__nav-buttons">
            <button className="portfolio__nav-btn" onClick={() => goTo(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label="Projet précédent">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="portfolio__nav-btn" onClick={() => goTo(Math.min(PROJECTS.length - 1, activeIndex + 1))} disabled={activeIndex === PROJECTS.length - 1} aria-label="Projet suivant">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {lightboxProject && (
        <Lightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />
      )}
    </section>
  )
}
