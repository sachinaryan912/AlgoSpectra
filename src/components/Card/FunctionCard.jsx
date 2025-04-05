import React from "react";
import { useNavigate } from "react-router-dom";

function FunctionCard({ name, description, footer, routepath }) {
  const naigate = useNavigate();
  const handleClick = () => {
    naigate(routepath);
  };

  return (
    <>
      <div className="modern-card" onClick={handleClick}>
        <div className="card-icon">📤</div>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="card-footer">{footer}</div>
      </div>
    </>
  );
}

export default FunctionCard;
