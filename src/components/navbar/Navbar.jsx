import React, { useState } from "react";
import "../../styles/Navbar.css";
import { Menu, X } from "lucide-react";
import Authentication from "../Authentication";

const Navbar = ({ title = "" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setPopupOpen(false);
  };

  const openAuthModal = () => {
    setShowAuth(true);
    setPopupOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-title">
            <img src="/logo512.png" alt="Logo" className="logo" />
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
                  <button onClick={openAuthModal}>Login</button>
                  <button onClick={() => alert("Continue as Guest clicked")}>
                    Continue as Guest
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className={`menu-icon ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </div>
        </div>
      </nav>

      <Authentication show={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default Navbar;
