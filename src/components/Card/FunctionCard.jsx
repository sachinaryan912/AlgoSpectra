import React from "react";
import { useNavigate } from "react-router-dom";
import { FcBullish,FcGenericSortingAsc } from "react-icons/fc";
import { FaCubesStacked } from "react-icons/fa6";
import { MdOutlineDataArray } from "react-icons/md";

function FunctionCard({ name, description, footer, routepath,status }) {
  const naigate = useNavigate();
  const handleClick = () => {
    naigate(routepath);
  };

  return (
    <>
      <div className="modern-card" onClick={handleClick}>
        {status && <div className={`ribbon ${status.toLowerCase().replace(' ', '-')}`}>{status}</div>}
        <div className="card-icon">
          {name.toLowerCase().includes("sort") && <FcGenericSortingAsc />}
          {name.toLowerCase().includes("graph") && <FcBullish />}
          {name.toLowerCase().includes("stack") && <FaCubesStacked />}
          {name.toLowerCase().includes("search") && <span role="img" aria-label="search">🔍</span>}
          {name.toLowerCase().includes("array") && <span role="img" aria-label="array"><MdOutlineDataArray /></span>}
          {name.toLowerCase().includes("queue") && <span role="img" aria-label="queue">📥</span>}
        </div>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="card-footer">{footer}</div>
      </div>
    </>
  );
}

export default FunctionCard;
