import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import { algorithmArray, datastructureArray, featureData } from "../data/cardData";
import FeatureCard from "./Card/FeatureCard";
import FunctionCard from "./Card/FunctionCard";

export default function HomePage() {
  useEffect(() => {
    document.title = "AlgoSpectra - Visualize DSA Like Never Before";
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AlgoSpectra - Visualize DSA Like Never Before";
  }, []);

  const handleJsonCardClick = () => {
    navigate("algoSpectra/json-visualizer");
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
        {featureData?.map((feature, index) => (
          <FeatureCard name={feature?.name} description={feature?.description}/>
        ))}
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
         {datastructureArray?.map((data, index) => (
            <FunctionCard
            name={data?.name}
            description={data?.description}
            footer={data?.footer}
            routepath={data?.routePath}
            key={index}
            />
          ))}
        </div>
      </section>

       {/* Section 3: Algorith */}
       <section className="modern-section">
        <h2 className="section-title">Algorithm</h2>
        <div className="card-grid">
         {algorithmArray?.map((data, index) => (
            <FunctionCard
            name={data?.name}
            description={data?.description}
            footer={data?.footer}
            routepath={data?.routePath}
            key={index}
            />
          ))}
        </div>
      </section>

      <footer>
        Made with ❤️ for learners • © 2025 AlgoSpectra
      </footer>
    </main>
  );
}
