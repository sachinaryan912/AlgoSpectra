import React, { useState } from "react";
import "../../styles/Navbar.css"; // Adjust the path as necessary
import { Menu, X } from "lucide-react";
import logo from "../../assets/images/logo512.png"; // Adjust the path as necessary

const Navbar = ({ title = "AlgoSpectra" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setPopupOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-title">
          <img src={logo} alt="Logo" className="logo" />
          <span className="title">{title}</span>
        </div>

        <div className={`nav-right ${menuOpen ? "active" : ""}`}>
          <div className="signin-container">
            <button
              className="signin-button"
              onClick={() => setPopupOpen(!popupOpen)}
            >
              Sign In
            </button>
            {popupOpen && (
              <div className="signin-popup">
                <button onClick={() => alert("Login clicked")}>Login</button>
                <button onClick={() => alert("Continue clicked")}>Continue as Guest</button>
              </div>
            )}
          </div>
        </div>

        <div className={`menu-icon ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
