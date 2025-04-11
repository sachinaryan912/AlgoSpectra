// src/components/YamlVisualizer.js
import React, { useEffect, useState } from "react";
import yaml from "js-yaml";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import "../../styles/jsonVisualizer.css";
import DataModelSelector from "../../components/DataModelSelector";
import { useDispatch } from "react-redux";
import { setMenuSelected } from "../../redux/HomeSlice";

const transformYamlToNodes = (json, parentId = null, level = 0, yOffset = 0, prefix = "yaml") => {
  let nodes = [];
  let edges = [];

  const nodeId = `${prefix}-${level}-${Math.random().toString(36).substr(2, 5)}`;
  let label = typeof json === "object" ? Object.keys(json).join(", ") : String(json);

  nodes.push({
    id: nodeId,
    data: { label },
    position: { x: level * 280, y: yOffset },
    style: {
      background: "#1e1e1e",
      color: "#e0e0e0",
      padding: 12,
      borderRadius: 12,
      border: "1px solid #555",
      fontWeight: 500,
      fontSize: 14,
      width: 220,
      whiteSpace: "pre-line",
    },
  });

  if (parentId) {
    edges.push({
      id: `e-${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId,
      animated: true,
      style: { stroke: "#ff0", strokeWidth: 2, strokeDasharray: "4 4" },
    });
  }

  if (typeof json === "object") {
    Object.entries(json).forEach(([key, value], i) => {
      const child = { [key]: value };
      const { nodes: cNodes, edges: cEdges } = transformYamlToNodes(child, nodeId, level + 1, yOffset + i * 160, prefix);
      nodes = [...nodes, ...cNodes];
      edges = [...edges, ...cEdges];
    });
  }

  return { nodes, edges };
};

export default function YamlVisualizer() {
  const [yamlInput, setYamlInput] = useState(`name: AlgoSpectra\nfeatures:\n  visualizer: true\n  editor: false`);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleVisualize = () => {
    try {
      const parsed = yaml.load(yamlInput);
      const { nodes: newNodes, edges: newEdges } = transformYamlToNodes(parsed);
      setNodes(newNodes);
      setEdges(newEdges);
    } catch (err) {
      alert("Invalid YAML");
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(setMenuSelected('yaml'));
  },[])

  return (
    <div>
      <div className="visualizer-header">
        <h2>YamlVisualizer</h2>
        <button className="visualize-button" onClick={handleVisualize}>
          Visualize
        </button>
      </div>
      <div className="visual-subheader">
      
            <DataModelSelector />
      
            </div>
      <div className="json-visualizer-container">
        <div className="left-panel">
          <textarea
            className="json-input"
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
            rows={10}
          />
        </div>

        <div className="flow-wrapper">
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView>
            <MiniMap nodeColor={() => "#ffcc00"} />
            <Controls />
            <Background color="#2c2c2c" gap={18} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
