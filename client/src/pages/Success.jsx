import { useSearchParams } from 'react-router-dom'

export default function Success() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')

  return (
    <div className="result-page">
      <div className="result-page__card result-page__card--success">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="20" stroke="#7A9E87" strokeWidth="1.5"/>
          <path d="M13 22l6.5 6.5L31 16" stroke="#7A9E87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <h1>Paiement confirmé</h1>
        <p>
          Votre acompte a bien été reçu. Je vous contacterai dans les
          24h pour démarrer votre projet.
        </p>

        {sessionId && (
          <p className="result-page__ref">
            Réf. <code>{sessionId.substring(0, 24)}…</code>
          </p>
        )}

        <div className="result-page__next">
          <h3>Prochaines étapes</h3>
          <ol>
            <li>Email de confirmation dans votre boîte</li>
            <li>Appel de démarrage planifié ensemble</li>
            <li>Définition des détails du projet</li>
            <li>Le développement commence</li>
          </ol>
        </div>

        <a href="/" className="result-page__btn-primary">
          Retour à l'accueil
        </a>
      </div>
    </div>
  )
}
