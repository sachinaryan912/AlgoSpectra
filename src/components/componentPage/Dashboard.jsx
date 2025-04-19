import React from 'react';
import { algorithmArray, datastructureArray } from "../../data/cardData";
import FunctionCard from "../../components/Card/FunctionCard";
import "../../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";

const features = [
    ...algorithmArray.map((algorithm) => ({
        id: algorithm.id,
        title: algorithm.name,
        description: algorithm.description,
    })),
    ...datastructureArray.map((datastructure) => ({
        id: datastructure.id,
        title: datastructure.name,
        description: datastructure.description,
    })),
];

const Dashboard = () => {

     const navigate = useNavigate();
     const handleJsonCardClick = () => {
        navigate("/algoSpectra/json-visualizer");
      };

    return (
        <div className="dashboard">
            {/* Section 1: Data Models */}
        <section className="modern-section">
          <h2 className="section-title">Data Models</h2>
          <div className="card-grid">
            <div className="modern-card clickable-card" onClick={handleJsonCardClick}>
          <div className="card-icon">{`{ }`}</div>
          <h3>JSON Visualizer</h3>
          <p>
            Convert and explore complex JSON structures in an intuitive, visual
            format. See nested objects come alive with collapsible trees and
            animations.
          </p>
          <div className="card-footer">DATA • JSON • TREE</div>
            </div>
          </div>
         
        </section>
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
                  </section>
        </div>
    );
};

export default Dashboard;