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
    url: null,
  },
  {
    id: 2,
    name: 'VilaThai Lounge',
    category: 'Restauration',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: 'Identité visuelle digitale et site pour un restaurant thaïlandais, avec carte en ligne et ambiance immersive.',
    gradient: 'linear-gradient(135deg, #0E1A2A 0%, #1A3050 50%, #6AAACE 100%)',
    accent: '#A0C8F0',
    url: null,
  },
  {
    id: 3,
    name: 'ODAR',
    category: 'Associatif',
    tags: ['React', 'Node.js', 'Express'],
    description: 'Plateforme web pour une association culturelle : agenda, publications, formulaires d\'adhésion et back-office.',
    gradient: 'linear-gradient(135deg, #101E1A 0%, #1A3430 50%, #4A9480 100%)',
    accent: '#80C4B0',
    url: null,
  },
  {
    id: 4,
    name: 'Prochain projet',
    category: 'Bientôt',
    tags: ['Votre projet'],
    description: 'Ce slot pourrait être votre projet. Parlons-en et construisons quelque chose de mémorable ensemble.',
    gradient: 'linear-gradient(135deg, #1B1B19 0%, #2E2E2C 100%)',
    accent: '#4A7858',
    url: null,
    placeholder: true,
  },
]

function ProjectCard({ project, index }) {
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
      className={`project-card${visible ? ' project-card--visible' : ''}${project.placeholder ? ' project-card--placeholder' : ''}`}
      style={{ '--delay': `${index * 120}ms`, '--accent': project.accent }}
    >
      <div
        className="project-card__thumb"
        style={{ background: project.gradient }}
      >
        <div className="project-card__thumb-inner">
          {!project.placeholder && (
            <span className="project-card__category">{project.category}</span>
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
        {!project.placeholder && project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card__link">
            Voir le site
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
      </div>
    </article>
  )
}

export default function Portfolio() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [headerRef, headerVisible] = useInView()

  const goTo = (index) => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children)
    const card = cards[index]
    if (!card) return
    const paddingLeft = parseInt(getComputedStyle(track).paddingLeft) || 0
    track.scrollTo({ left: card.offsetLeft - paddingLeft, behavior: 'smooth' })
    setActiveIndex(index)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => {
      const cards = Array.from(track.children)
      const trackLeft = track.getBoundingClientRect().left
      let closest = 0
      let minDist = Infinity
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - trackLeft)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setActiveIndex(closest)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="portfolio" className="portfolio">
      <div className="section__inner">
        <div className="section__header" ref={headerRef}>
          <span
            className={`section__eyebrow${headerVisible ? ' is-visible' : ''}`}
            data-slide="up"
          >
            Réalisations
          </span>
          <h2
            className={`section__title${headerVisible ? ' is-visible' : ''}`}
            data-slide="up"
            data-delay="1"
          >
            Mes projets récents
          </h2>
          <p
            className={`section__subtitle${headerVisible ? ' is-visible' : ''}`}
            data-slide="up"
            data-delay="2"
          >
            Chaque projet est unique — conçu et développé sur mesure pour répondre
            aux besoins spécifiques de chaque client.
          </p>
        </div>
      </div>

      <div className="portfolio__track" ref={trackRef}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
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
            <button
              className="portfolio__nav-btn"
              onClick={() => goTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Projet précédent"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="portfolio__nav-btn"
              onClick={() => goTo(Math.min(PROJECTS.length - 1, activeIndex + 1))}
              disabled={activeIndex === PROJECTS.length - 1}
              aria-label="Projet suivant"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
