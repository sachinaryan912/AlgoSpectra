import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import CustomModal from "../Model/CustomModel";
import LoginForm from "../Login/LoginForm";

const HomeNav = ({ title = "" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setPopupOpen(false);
  };

  return (
    <nav className="home-nav">
      <CustomModal children={<LoginForm/>} open={open} onClose={handleClose}/>
      <div className="home-nav-container">
        <div className="logo-title">
          <img src="/logo512.png" alt="Logo" className="logo" />
          <span className="title">{title}</span>
        </div>

        <div className={`nav-right ${menuOpen ? "active" : ""}`}>
          <div className="signin-container">
            <button
              className="signin-button"
              onClick={() => {handleOpen()}}
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

export default HomeNav;
