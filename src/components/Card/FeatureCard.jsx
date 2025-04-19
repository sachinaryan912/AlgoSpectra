import React from 'react';

function FeatureCard({ name, description,image_name }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <img src={`/${image_name}.jpeg`} alt={`${image_name} icon`} />
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;