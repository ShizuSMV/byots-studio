import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, onRequestClick }) {
  return (
    <>
      <Header onRequestClick={onRequestClick} />
      {children}
      <Footer onRequestClick={onRequestClick} />
    </>
  )
}
