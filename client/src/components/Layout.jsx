import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, onRequestClick, isPanier, onPanierClose }) {
  return (
    <>
      <Header onRequestClick={onRequestClick} isPanier={isPanier} onPanierClose={onPanierClose} />
      {children}
      <Footer onRequestClick={onRequestClick} />
    </>
  )
}
