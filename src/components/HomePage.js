import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

export default function HomePage() {
  useEffect(() => {
    document.title = "AlgoSpectra - Visualize DSA Like Never Before";
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AlgoSpectra - Visualize DSA Like Never Before";
  }, []);

  const handleJsonCardClick = () => {
    navigate("/json-visualizer");
  };

  return (
    <main className="homepage">
      <section className="hero enhanced-hero">
        <div className="big-brand-heading">
          <span className="brand-text">AlgoSpectra</span>
        </div>
        <p className="tagline">
          Visualizing Data Structures & Algorithms in a Futuristic Way.
        </p>
        <a href="#visualizer" className="cta-button">
          Get Started
        </a>
      </section>

      <section className="features">
        <div className="modern-card">
          <div className="icon">📊</div>
          <h3>Interactive Visualizations</h3>
          <p>Step-by-step algorithm animations in real time.</p>
        </div>
        <div className="modern-card">
          <div className="icon">🧠</div>
          <h3>Multiple Algorithms</h3>
          <p>Sort, search, traverse — all in one place.</p>
        </div>
        <div className="modern-card">
          <div className="icon">📱</div>
          <h3>Responsive Design</h3>
          <p>Looks great on mobile, tablet, and desktop.</p>
        </div>
      </section>

      {/* Section 1: Data Models */}
      <section className="modern-section">
        <h2 className="section-title">Data Models</h2>
        <div className="card-grid">
        <div className="modern-card clickable-card" onClick={handleJsonCardClick}>
            <div className="card-icon">🔍</div>
            <h3>JSON Visualizer</h3>
            <p>
              Convert and explore complex JSON structures in an intuitive, visual
              format. See nested objects come alive with collapsible trees and
              animations.
            </p>
            <div className="card-footer">Live Editable • Tree View • Highlight Keys</div>
          </div>
        </div>
      </section>

      {/* Section 2: Data Structures */}
      <section className="modern-section">
        <h2 className="section-title">Data Structures</h2>
        <div className="card-grid">
          <div className="modern-card">
            <div className="card-icon">📦</div>
            <h3>Arrays</h3>
            <p>
              Learn array operations like insert, delete, and traverse through
              interactive animations.
            </p>
            <div className="card-footer">Ordered • Indexed • Efficient Access</div>
          </div>

          <div className="modern-card">
            <div className="card-icon">📤</div>
            <h3>Queue</h3>
            <p>
              Visualize FIFO behavior, enqueue/dequeue operations with smooth,
              real-time transitions.
            </p>
            <div className="card-footer">FIFO • Scheduling • Print Queue</div>
          </div>

          <div className="modern-card">
            <div className="card-icon">📥</div>
            <h3>Stack</h3>
            <p>
              Understand LIFO operations, recursion stack behavior, and browser
              history simulation.
            </p>
            <div className="card-footer">LIFO • Undo Mechanism • Call Stack</div>
          </div>
        </div>
      </section>

      <footer>
        Made with ❤️ for learners • © 2025 AlgoSpectra
      </footer>
    </main>
  );
}
