
import { useState } from "react"
import { Link } from "react-router-dom"
import { BookOpen, Menu, X } from "lucide-react"
import "../styles/navbar.css"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <BookOpen className="navbar-logo-icon" />
          <span className="navbar-logo-text">Online Library</span>
        </Link>

        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className={`navbar-links ${mobileMenuOpen ? "active" : ""}`}>
          <Link to="/" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/books" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
            Browse Books
          </Link>
          <Link to="/add-book" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
            Add Book
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
