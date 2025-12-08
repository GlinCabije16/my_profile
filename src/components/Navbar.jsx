import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="logo">My Portfolio</div>

      <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`links ${isOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About Me</Link>
        <Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
        <Link to="/certificates" onClick={() => setIsOpen(false)}>Certificates</Link>
        <Link to="/tours" onClick={() => setIsOpen(false)}>Tours</Link>
        <Link to="/journal" onClick={() => setIsOpen(false)}>Journal</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
     
      </div>
    </nav>
  );
}
