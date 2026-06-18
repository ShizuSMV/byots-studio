import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('visible')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 1600)
    const t2 = setTimeout(() => { setPhase('done'); onDone?.() }, 2300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`loader${phase === 'exit' ? ' loader--exit' : ''}`} aria-hidden="true">
      <div className="loader__logo">
        <span className="loader__by">By</span> OT's
      </div>
      <div className="loader__bar">
        <div className="loader__bar-fill" />
      </div>
    </div>
  )
}
