import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DataModelSelector.css"; // Optional for custom styles
import { setMenuSelected } from "../redux/HomeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DataModelSelector() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuSelect = useSelector((state) => state?.Visualizer?.value); // Get the current selected value from Redux state

  const handleChange = (event) => {

    console.log("menu selected", menuSelect);
    
    const selected = event.target.value;
    dispatch(setMenuSelected(selected)); // Update the Redux state with the selected value
    switch (selected) {
      case "json":
        navigate("/algoSpectra/json-visualizer");
        break;
      case "xml":
        navigate("/algoSpectra/xml-visualizer");
        break;
      case "yaml":
        navigate("/algoSpectra/yaml-visualizer");
        break;
      default:
        break;
    }
  };

  return (
    <div className="data-model-selector">
      <select id="model-select" onChange={handleChange} value={menuSelect}>
        <option value="json">JSON</option>
        <option value="xml">XML</option>
        <option value="yaml">YAML</option>
      </select>
    </div>
  );
}
