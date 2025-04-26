import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Import axios
import "../styles/Authentication.css";

export default function Authentication({ show, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await axios.post(
          "https://algospectra.onrender.com/api/auth/login",
          {
            email,
            password,
          }
        );
        alert("Login Successful: " + JSON.stringify(response.data));
      } catch (error) {
        if (error.response) {
          // Server responded with a status outside of 2xx
          alert("Login Failed: " + (error.response.data.message || "Server error"));
        } else if (error.request) {
          // No response received
          alert("Login Failed: No response from server");
        } else {
          // Error setting up the request
          alert("Login Failed: " + error.message);
        }
      }
    } else {
      alert("Register API not implemented yet.");
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
                  disabled
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
                  <button
                    type="button"
                    onClick={() => alert("Forgot password clicked")}
                  >
                    Forgot?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="auth-submit-btn"
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
            </form>

            <p className="auth-toggle">
              {isLogin ? (
                <>
                  New user?{" "}
                  <span onClick={toggleMode}>
                    Register now
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span onClick={toggleMode}>
                    Login now
                  </span>
                </>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
