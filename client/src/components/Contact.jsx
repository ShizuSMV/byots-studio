import { useState } from 'react'
import { useInView } from '../hooks/useInView'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [headerRef, headerVisible] = useInView()
  const [layoutRef, layoutVisible] = useInView({ threshold: 0.08 })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contact — ${form.name}`)
    const body = encodeURIComponent(`Nom : ${form.name}\nEmail : ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:Byots.smv@gmail.com?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <section id="contact" className="contact">
      <div className="section__inner">
        <div className="section__header" ref={headerRef}>
          <span
            className={`section__eyebrow${headerVisible ? ' is-visible' : ''}`}
            data-slide="up"
          >
            Contact
          </span>
          <h2
            className={`section__title${headerVisible ? ' is-visible' : ''}`}
            data-slide="up"
            data-delay="1"
          >
            Parlons de votre projet
          </h2>
        </div>

        <div
          className={`contact__layout${layoutVisible ? ' contact__layout--visible' : ''}`}
          ref={layoutRef}
        >
          <div
            className={`contact__info${layoutVisible ? ' is-visible' : ''}`}
            data-slide="left"
          >
            <h3 className="contact__heading">
              Une idée ?<br />Discutons-en.
            </h3>
            <p className="contact__text">
              Que vous ayez un projet précis ou simplement une envie à explorer,
              je suis disponible pour en parler sans engagement.
            </p>

            <ul className="contact__details">
              <li>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 4a1 1 0 011-1h12a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M2 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <a href="mailto:Byots.smv@gmail.com">Byots.smv@gmail.com</a>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M9 17s-6-5-6-9.5a6 6 0 1112 0C15 12 9 17 9 17z" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
                <span>France — 100% remote</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M9 5.5V9l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <span>Réponse sous 24h</span>
              </li>
            </ul>
          </div>

          <form
            className={`contact__form${layoutVisible ? ' is-visible' : ''}`}
            data-slide="right"
            data-delay="1"
            onSubmit={handleSubmit}
          >
            {status === 'sent' ? (
              <div className="contact__success">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11 18l4.5 4.5L25 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Message envoyé.<br />Je vous réponds sous 24h.</p>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="c-name">Nom</label>
                  <input id="c-name" name="name" type="text" placeholder="Jean Dupont"
                    value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" placeholder="jean@exemple.com"
                    value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" name="message" rows={5}
                    placeholder="Décrivez votre projet..."
                    value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="contact__submit">
                  Envoyer
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
