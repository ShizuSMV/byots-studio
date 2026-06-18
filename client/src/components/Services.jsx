import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

const SERVICES = [
  {
    id: 'vitrine',
    num: '01',
    name: 'Site Vitrine',
    tagline: 'Votre présence en ligne, soignée.',
    price: '499',
    deposit: '149',
    featured: false,
    color: '#10B981',
    features: [
      'Jusqu\'à 5 pages sur mesure',
      'Design responsive & mobile-first',
      'Optimisation SEO de base',
      'Formulaire de contact',
      'Hébergement guidé',
      'Livraison sous 3 semaines',
    ],
  },
  {
    id: 'ecommerce',
    num: '02',
    name: 'E-commerce',
    tagline: 'Vendez en ligne, sans friction.',
    price: '1 299',
    deposit: '389',
    featured: true,
    color: '#3B82F6',
    features: [
      'Boutique en ligne complète',
      'Paiement sécurisé intégré',
      'Gestion des stocks & commandes',
      'Fiches produits optimisées',
      'Tableau de bord vendeur',
      'Support 3 mois inclus',
    ],
  },
  {
    id: 'application',
    num: '03',
    name: 'Application Web',
    tagline: 'Sur mesure, sans limite.',
    price: 'Sur devis',
    deposit: '599',
    featured: false,
    color: '#8B5CF6',
    features: [
      'Fonctionnalités avancées',
      'Authentification utilisateurs',
      'Base de données & API',
      'Back-office personnalisé',
      'Tests & documentation',
      'Maintenance & évolutions',
    ],
  },
]

function ServiceCard({ service, onCta, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className={`svc${service.featured ? ' svc--featured' : ''}${visible ? ' svc--visible' : ''}`}
      style={{ '--delay': `${index * 100}ms`, '--sa': service.color }}
    >
      <div className="svc__header">
        <span className="svc__num">{service.num}</span>
        <div>
          <h3 className="svc__name">{service.name}</h3>
          <p className="svc__tagline">{service.tagline}</p>
        </div>
      </div>

      <div className="svc__price">
        {service.price === 'Sur devis'
          ? <span className="svc__price-text">Sur devis</span>
          : <><span className="svc__price-from">À partir de</span><span className="svc__price-amount">{service.price}€</span></>
        }
      </div>

      <ul className="svc__features">
        {service.features.map(f => (
          <li key={f}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <button className="svc__cta" onClick={() => onCta(service.id)}>
        {service.price === 'Sur devis' ? 'Demander un devis' : `Commander — acompte ${service.deposit}€`}
      </button>
    </article>
  )
}

export default function Services({ onServiceClick }) {
  const [headerRef, headerVisible] = useInView()

  return (
    <section id="services" className="services">
      <div className="section__inner">
        <div className="section__header" ref={headerRef}>
          <span
            className={`section__eyebrow${headerVisible ? ' is-visible' : ''}`}
            data-slide="up"
          >
            Services
          </span>
          <h2
            className={`section__title${headerVisible ? ' is-visible' : ''}`}
            data-slide="up"
            data-delay="1"
          >
            Ce que je propose
          </h2>
        </div>
        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} onCta={onServiceClick} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
