import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

const STEPS = [
  {
    number: '01',
    title: 'Brief & Découverte',
    description: 'On échange sur votre projet, vos objectifs, votre audience et vos contraintes. Je prends le temps de comprendre votre univers.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Devis & Acompte',
    description: 'Je vous envoie une proposition détaillée. Vous validez et payez l\'acompte de 30% pour officialiser le démarrage.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <circle cx="18" cy="17" r="4" fill="#C87840"/>
        <path d="M16.5 17l1 1 2-2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Design & Développement',
    description: 'Je conçois et développe votre site en vous partageant des aperçus réguliers. Vous suivez l\'avancement en temps réel.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 4l-4 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Livraison & Suivi',
    description: 'Après validation et paiement du solde, je déploie votre site. Je reste disponible pour le suivi et les ajustements.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

function Step({ step, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`process-step${visible ? ' process-step--visible' : ''}`}
      style={{ '--delay': `${index * 150}ms` }}
    >
      <div className="process-step__num">{step.number}</div>
      <div className="process-step__icon">{step.icon}</div>
      <h3 className="process-step__title">{step.title}</h3>
      <p className="process-step__desc">{step.description}</p>
    </div>
  )
}

export default function Process() {
  const [headerRef, headerVisible] = useInView()

  return (
    <section id="process" className="process">
      <div className="section__inner">
        <div className="section__header section__header--light" ref={headerRef}>
          <span
            className={`section__eyebrow${headerVisible ? ' is-visible' : ''}`}
            data-slide="up"
          >
            Processus
          </span>
          <h2
            className={`section__title${headerVisible ? ' is-visible' : ''}`}
            data-slide="up"
            data-delay="1"
          >
            Comment ça se passe ?
          </h2>
          <p
            className={`section__subtitle${headerVisible ? ' is-visible' : ''}`}
            data-slide="up"
            data-delay="2"
          >
            Un processus transparent et structuré pour que votre projet avance sereinement,
            du premier échange à la mise en ligne.
          </p>
        </div>

        <div className="process__grid">
          {STEPS.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
