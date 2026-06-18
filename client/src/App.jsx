import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import RequestModal from './components/RequestModal'
import LoadingScreen from './components/LoadingScreen'
import Success from './pages/Success'
import Cancel from './pages/Cancel'

function HomePage({ loaded }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState(null)

  const openModal = (service = null) => {
    setPreselectedService(service)
    setModalOpen(true)
  }

  return (
    <>
      <Navbar onRequestClick={() => openModal()} />
      <main>
        <Hero onRequestClick={() => openModal()} loaded={loaded} />
        <Portfolio />
        <Services onServiceClick={openModal} />
        <Process />
        <Contact />
      </main>
      <Footer onRequestClick={() => openModal()} />
      {modalOpen && (
        <RequestModal
          preselectedService={preselectedService}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <Routes>
        <Route path="/" element={<HomePage loaded={loaded} />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </>
  )
}
