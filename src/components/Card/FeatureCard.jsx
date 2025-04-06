import React from 'react';

function FeatureCard({ name, description }) {
  return (
    <div className="feature-card">
      
      <div className="icon">📊</div>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;