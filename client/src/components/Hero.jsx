const MARQUEE_ITEMS = [
  'React', 'Node.js', 'Design UI/UX', 'E-commerce',
  'SASS', 'Express', 'Sites Vitrine', 'Applications Web',
  'SEO', 'TypeScript', 'MongoDB', 'Stripe',
]

export default function Hero({ onRequestClick, loaded }) {
  const scrollToPortfolio = () =>
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className={`hero${loaded ? ' hero--loaded' : ''}`}>
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      <div className="hero__title-circle" />

      <div className="hero__inner">
        <div className="hero__top">
          <span className="hero__label">
            <span className="hero__dot" />
            Développeur web indépendant
          </span>
          <span className="hero__year">© 2025</span>
        </div>

        <div className="hero__heading-wrap">
          <div className="hero__title-wrap">
            <h1 className="hero__title">
              <span className="hero__title-row">Création</span>
              <span className="hero__title-row hero__title-row--indent">
                web <em>sur</em>
              </span>
              <span className="hero__title-row hero__title-row--mesure">mesure</span>
            </h1>
          </div>
          <div className="hero__side-text">
            <p>
              Sites, e-commerce<br />& applications<br />qui font la différence.
            </p>
          </div>
        </div>

        <div className="hero__bottom">
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">10+</span>
              <span className="hero__stat-lbl">Projets livrés</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">3</span>
              <span className="hero__stat-lbl">Ans d'expérience</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">100%</span>
              <span className="hero__stat-lbl">Clients satisfaits</span>
            </div>
          </div>

          <div className="hero__actions">
            <button className="hero__btn-primary" onClick={onRequestClick}>
              Démarrer un projet
            </button>
            <button className="hero__btn-ghost" onClick={scrollToPortfolio}>
              Voir les projets
            </button>
          </div>
        </div>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="hero__marquee-item">
              {item}<span className="hero__marquee-sep">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
