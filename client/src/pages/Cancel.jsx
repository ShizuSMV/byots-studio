export default function Cancel() {
  return (
    <div className="result-page">
      <div className="result-page__card">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="20" stroke="#484846" strokeWidth="1.5"/>
          <path d="M15 29l14-14M29 29L15 15" stroke="#484846" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        <h1>Paiement annulé</h1>
        <p>
          Aucun montant n'a été débité.
          Vous pouvez recommencer quand vous le souhaitez.
        </p>

        <div className="result-page__actions">
          <a href="/#services" className="result-page__btn-primary">
            Voir les offres
          </a>
          <a href="/" className="result-page__btn-ghost">
            Accueil
          </a>
        </div>
      </div>
    </div>
  )
}
