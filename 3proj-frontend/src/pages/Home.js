import React from 'react'
import '../style/pages/home.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SignIn from './SignIn';
export default function Home() {

  return (
    <div className="Home">
      <header className="navigation">
        <Navigation />
      </header>
      <div className="Home-content">
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  )
}
