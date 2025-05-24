import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import Authentication from "../Authentication";
import { useNavigate } from "react-router-dom";

const HomeNav = ({ title = "" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const userData = localStorage.getItem("userProfile");
    console.log("Token:", storedToken);
    console.log("user:", localStorage.getItem("userProfile"));
    
    setUser(userData ? JSON.parse(userData) : null);
    setToken(storedToken);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setPopupOpen(false);
  };

  const openAuthModal = () => {
    setShowAuth(true);
    setPopupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    setToken(null);
    setUser(null);
    console.log("You have been logged out successfully.");
    navigate("/"); // Optional redirect
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="home-nav">
        <div className="home-nav-container">
          <div className="logo-title">
            <img src="/logo512.png" alt="Logo" className="logo" />
            <span className="title">{title}</span>
          </div>

          <div className={`nav-right ${menuOpen ? "active" : ""}`}>
            {token ? (
              <div className="profile-container">
                <button
                className="profile-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                Welcome, {user?.profile?.username || "Guest"} ⌄
                </button>

                {dropdownOpen && (
                  <div className="profile-dropdown">
                    <button onClick={() => alert("See profile clicked")}>
                      <User size={16} style={{ marginRight: "8px" }} />
                      See Profile
                    </button>
                    <button onClick={handleLogout}>
                      <LogOut size={16} style={{ marginRight: "8px" }} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
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
            )}
          </div>

          <div className={`menu-icon ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </div>
        </div>
      </nav>

      <Authentication
        show={showAuth}
        onClose={() => {
          setShowAuth(false);
          // Re-check token on modal close in case login just happened
          const updatedToken = localStorage.getItem("token");
          setToken(updatedToken);
        }}
      />
    </>
  );
};

export default HomeNav;
