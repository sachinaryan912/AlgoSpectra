import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DataModelSelector.css"; // Optional for custom styles

export default function DataModelSelector() {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selected = event.target.value;
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
      <select id="model-select" onChange={handleChange}>
        <option value="json">JSON</option>
        <option value="xml">XML</option>
        <option value="yaml">YAML</option>
      </select>
    </div>
  );
}
