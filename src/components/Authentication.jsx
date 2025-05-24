import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "../styles/Authentication.css";
import { useNavigate } from "react-router-dom";

export default function Authentication({ show, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(""); // For registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const toggleMode = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const endpoint = isLogin
      ? "https://algospectra.onrender.com/api/auth/login"
      : "https://algospectra.onrender.com/api/auth/register";
  
    const body = isLogin
      ? { email, password }
      : { name, email, password };
  
    try {
      const response = await axios.post(endpoint, body);
  
      const token = response.data.access_token;
      console.log(`Token received: ${token}`);
      
  
      if (isLogin) {
        const profileRes = await axios.get(
          `https://algospectra.onrender.com/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              emailId: email,
            },

          }
        );
  
        const profile = profileRes.data;
        localStorage.setItem("userProfile", JSON.stringify(profile));
        localStorage.setItem("token", token);

        navigate("/");

        console.log("Login Successful. Profile stored:", profile);
      } else {
        
        console.log("Registration Successful. Token stored.");
      }
  
      onClose(); // Close modal
    } catch (error) {
      handleError(isLogin ? "Login" : "Registration", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleError = (action, error) => {
    if (error.response) {
      console.log(`${action} Failed: ${error.response.data.message || "Server error"}`);
    } else if (error.request) {
      console.log(`${action} Failed: No response from server`);
    } else {
      console.log(`${action} Failed: ${error.message}`);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="auth-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="auth-modal"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <button className="auth-close-btn" onClick={onClose}>
              &times;
            </button>

            <h2 className="auth-title">
              {isLogin ? "Login to your account" : "Create a new account"}
            </h2>

            <form className="auth-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                  required
                />
                <button
                  type="button"
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {isLogin && (
                <div className="auth-options">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <button type="button" onClick={() => console.log("Forgot password clicked")}>
                    Forgot?
                  </button>
                </div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? (
                  <motion.div
                    className="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    ↺
                  </motion.div>
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="auth-toggle">
              {isLogin ? (
                <>
                  New user? <span onClick={toggleMode}>Register now</span>
                </>
              ) : (
                <>
                  Already have an account? <span onClick={toggleMode}>Login now</span>
                </>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
