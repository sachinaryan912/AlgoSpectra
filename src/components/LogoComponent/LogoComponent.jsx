import React from "react"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";
function LogoComponent({title}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }
  return (
    <div className="logo-title" style={{cursor:'pointer'}} onClick={handleClick}>
      <img src="/logo512.png" alt="Logo" className="logo" />
      <span className="title">{title}</span>
    </div>
  );
}

export default LogoComponent;
