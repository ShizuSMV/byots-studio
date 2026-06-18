export default function Footer({ onRequestClick }) {
  const year = new Date().getFullYear()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Wordmark + CTA */}
        <div className="footer__hero">
          <div className="footer__hero-left">
            <div className="footer__wordmark">
              <span className="footer__wordmark-by">By</span> OT's
            </div>
            <p className="footer__tagline">
              Création web sur mesure.<br />
              Design, code & performance.
            </p>
          </div>
          <div className="footer__hero-right">
            <span className="footer__status">
              <span className="footer__status-dot" />
              Disponible pour de nouveaux projets
            </span>
            <button className="footer__cta" onClick={onRequestClick}>
              Démarrer un projet
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="footer__sep" />

        {/* Navigation */}
        <div className="footer__nav">
          <div className="footer__nav-col">
            <h4>Navigation</h4>
            <ul>
              {[['portfolio','Projets'],['services','Services'],['process','Processus'],['contact','Contact']].map(([id, label]) => (
                <li key={id}><button onClick={() => scrollTo(id)}>{label}</button></li>
              ))}
            </ul>
          </div>
          <div className="footer__nav-col">
            <h4>Services</h4>
            <ul>
              {['Site Vitrine', 'E-commerce', 'Application Web', 'Maintenance'].map(s => (
                <li key={s}><button onClick={onRequestClick}>{s}</button></li>
              ))}
            </ul>
          </div>
          <div className="footer__nav-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:Byots.smv@gmail.com">Byots.smv@gmail.com</a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p>© {year} By OT's — Tous droits réservés</p>
          <p className="footer__bottom-right">Fait avec soin en France 🇫🇷</p>
        </div>

      </div>
    </footer>
  )
}
