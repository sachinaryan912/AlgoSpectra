import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Authentication.css"; // Optional for custom styles

export default function Authentication({ show, onClose }) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = useState(false);  // state for toggling password visibility
  const toggleMode = () => setIsLogin(!isLogin);

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
            <button
              className="auth-close-btn"
              onClick={onClose}
            >
              &times;
            </button>

            <h2 className="auth-title">
              {isLogin ? "Login to your account" : "Create a new account"}
            </h2>

            <form className="auth-form">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Username"
                />
              )}
              <input
                type="email"
                placeholder="Email"
              />
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}  // toggle password visibility
                  placeholder="Password"
                  className="password-input"
                />
                <button
                  type="button"
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)} // toggle showPassword state
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
