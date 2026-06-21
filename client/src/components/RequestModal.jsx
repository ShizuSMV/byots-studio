import { useState, useEffect } from 'react'

const SERVICES = [
  { id: 'vitrine',     label: 'Site Vitrine',    price: '499€',     deposit: '149€' },
  { id: 'ecommerce',  label: 'Site E-commerce',  price: '1 299€',   deposit: '389€' },
  { id: 'application',label: 'Application Web',  price: 'Sur devis',deposit: '599€' },
]

const BUDGETS = [
  'Moins de 500€',
  '500€ — 1 000€',
  '1 000€ — 2 000€',
  '2 000€ — 5 000€',
  '5 000€+',
]

const INITIAL = { serviceType: '', projectName: '', description: '', budget: '', name: '', email: '', phone: '' }

export default function RequestModal({ onClose, preselectedService }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ ...INITIAL, serviceType: preselectedService || '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    if (step === 3) {
      document.body.classList.add('panier-mode')
    } else {
      document.body.classList.remove('panier-mode')
    }
    return () => document.body.classList.remove('panier-mode')
  }, [step])

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const canNext1 = form.serviceType !== ''
  const canNext2 = form.projectName.trim() !== '' && form.description.trim() !== ''
  const canSubmit = form.name.trim() !== '' && form.email.trim() !== ''

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: form.serviceType,
          projectName: form.projectName,
          description: form.description,
          budget: form.budget,
          email: form.email,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Une erreur est survenue.')
        setLoading(false)
      }
    } catch {
      setError('Impossible de joindre le serveur. Réessayez plus tard.')
      setLoading(false)
    }
  }

  const selectedService = SERVICES.find(s => s.id === form.serviceType)

  if (step === 3) {
    return (
      <button className="modal__close modal__close--floating" onClick={onClose} aria-label="Fermer">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>
    )
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Fermer">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal__progress">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`modal__progress-step${step >= s ? ' modal__progress-step--active' : ''}${step > s ? ' modal__progress-step--done' : ''}`}
            >
              {step > s
                ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : s
              }
            </div>
          ))}
          <div className="modal__progress-bar">
            <div className="modal__progress-fill" style={{ width: `${(step - 1) * 50}%` }} />
          </div>
        </div>

        {step === 1 && (
          <div className="modal__step">
            <h2 className="modal__title">Type de projet</h2>
            <p className="modal__subtitle">Quel service correspond à votre besoin ?</p>

            <div className="modal__service-grid">
              {SERVICES.map(s => (
                <button
                  key={s.id}
                  className={`modal__service-card${form.serviceType === s.id ? ' modal__service-card--selected' : ''}`}
                  onClick={() => set('serviceType', s.id)}
                >
                  <strong>{s.label}</strong>
                  <span className="modal__service-price">À partir de {s.price}</span>
                  <span className="modal__service-deposit">Acompte : {s.deposit}</span>
                </button>
              ))}
            </div>

            <div className="modal__actions">
              <button className="modal__btn-primary" disabled={!canNext1} onClick={() => setStep(2)}>
                Continuer
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="modal__step">
            <h2 className="modal__title">Votre projet</h2>
            <p className="modal__subtitle">Plus vous êtes précis, meilleure sera la proposition.</p>

            <div className="form-group">
              <label>Nom du projet</label>
              <input type="text" placeholder="Ex : Site pour ma boutique"
                value={form.projectName} onChange={e => set('projectName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows={4}
                placeholder="Votre activité, les fonctionnalités souhaitées..."
                value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Budget estimé (optionnel)</label>
              <select value={form.budget} onChange={e => set('budget', e.target.value)}>
                <option value="">Sélectionner</option>
                {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="modal__actions">
              <button className="modal__btn-ghost" onClick={() => setStep(1)}>Retour</button>
              <button className="modal__btn-primary" disabled={!canNext2} onClick={() => setStep(3)}>
                Continuer
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="modal__step">
            <h2 className="modal__title">Vos coordonnées</h2>
            <p className="modal__subtitle">
              Pour finaliser avec l'acompte de <strong>{selectedService?.deposit}</strong> via Stripe.
            </p>

            <div className="modal__summary">
              <span>{selectedService?.label}</span>
              <span>Acompte : {selectedService?.deposit}</span>
            </div>

            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" placeholder="Jean Dupont"
                value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="jean@exemple.com"
                value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Téléphone (optionnel)</label>
              <input type="tel" placeholder="+33 6 00 00 00 00"
                value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>

            {error && <p className="modal__error">{error}</p>}

            <div className="modal__actions">
              <button className="modal__btn-ghost" onClick={() => setStep(2)} disabled={loading}>Retour</button>
              <button className="modal__btn-primary" disabled={!canSubmit || loading} onClick={handleSubmit}>
                {loading
                  ? <span className="modal__spinner" />
                  : <>Payer — {selectedService?.deposit}<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1.5" y="3" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1.5 5.5h10" stroke="currentColor" strokeWidth="1.3"/></svg></>
                }
              </button>
            </div>

            <p className="modal__stripe-note">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 4v3M6 8.5v.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Paiement sécurisé Stripe. Le solde est réglé à la livraison.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
