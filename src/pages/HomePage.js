import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import { algorithmArray, datastructureArray, featureData } from "../data/cardData";
import { contributors } from "../data/contributionData";
import FeatureCard from "../components/Card/FeatureCard";
import FunctionCard from "../components/Card/FunctionCard";
import ContributorCard from "../components/Card/ContributorCard";
import { SlArrowDown } from "react-icons/sl";
import { FcBullish } from "react-icons/fc";

export default function HomePage() {
  useEffect(() => {
    document.title = "AlgoSpectra - Visualize DSA Like Never Before";
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AlgoSpectra - Visualize DSA Like Never Before";
  }, []);

  const handleJsonCardClick = () => {
    navigate("/algoSpectra/json-visualizer");
  };

  // const handleGetStartedClick = () => {
  //   navigate("/algoSpectra/newdashboard");
  // };

  return (
    <main className="homepage">
      <section className="hero enhanced-hero">
        <div className="big-brand-heading">
          <span className="brand-text">AlgoSpectra</span>
        </div>
        <p className="tagline">
          Visualizing Data Structures & Algorithms in a Futuristic Way.
        </p>
        {/* <div className="cta-button" onClick={handleGetStartedClick}>
          Get Started
        </div> */}
      </section>

      <section className="features">
        {featureData?.map((feature, index) => (
          <FeatureCard
            name={feature?.name}
            description={feature?.description}
            
          />
        ))}
      </section>

      {/* Section 1: Data Models */}
      <section className="modern-section">
        <h2 className="section-title">Data Models</h2>
        <div className="card-grid">
          <div className="modern-card clickable-card" onClick={handleJsonCardClick}>
            <div className="card-icon">🔍</div>
            <h3>DATA Visualizer</h3>
            <p>
              Convert and explore complex Data Model structures in an intuitive, visual
              format. See nested objects come alive with collapsible trees and
              animations.
            </p>
            <div className="card-footer">JSON • XML • YAML</div>
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
              status={data?.status}
            />
          ))}
        </div>
        <div className="see-more-button">
          <button className="cta-button" onClick={() => navigate('/algoSpectra/data-structures')}>
            See More <SlArrowDown className="button-icon" />
          </button>
        </div>
      </section>

      {/* Section 3: Algorithm */}
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
              status={index === 0 ? "New" : "Coming Soon"}
            />
          ))}
        </div>
        <div className="see-more-button">
          <button className="cta-button" onClick={() => navigate('/algoSpectra/algorithms')}>
            See More <SlArrowDown className="button-icon" />
          </button>
        </div>
      </section>

      <section style={{ padding: "2rem", textAlign: "center" }}>
        <h2 style={{ color: "#fff", marginBottom: "1.5rem" }}>Contributors</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          {contributors.map((c, i) => (
            <ContributorCard key={i} {...c} />
          ))}
        </div>
      </section>

      <footer>
        Made with ❤️ for learners • © 2025 AlgoSpectra
      </footer>
    </main>
  );
}
