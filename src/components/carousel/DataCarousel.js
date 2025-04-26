import React from 'react';

const generateGlossyColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsla(${hue}, 85%, 65%, 0.4)`;
};

const DataCarousel = ({ items }) => {
  const mid = Math.ceil(items.length / 2);
  const firstRow = items.slice(0, mid);
  const secondRow = items.slice(mid);

  const renderRow = (rowItems, directionClass) => {
    const duplicatedItems = [...rowItems, ...rowItems];

    return (
      <div className="carousel-row-wrapper">
        <div className={`carousel-row ${directionClass}`}>
          {duplicatedItems.map((item, index) => {
            const bgColor = generateGlossyColor();
            const gradientOverlay = `linear-gradient(135deg, ${bgColor} 0%, rgba(255, 255, 255, 0.32) 100%)`;

            return (
              <div
                className="carousel-item glossy"
                key={index}
                style={{
                  background: gradientOverlay,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="carousel-section">
      {renderRow(firstRow, 'moving-left')}
      {renderRow(secondRow, 'moving-right')}
    </div>
  );
};

export default DataCarousel;
