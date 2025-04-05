import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import "../styles/jsonVisualizer.css";

// Recursive function to transform JSON into flow nodes
const transformJsonToNodes = (json, parentId = null, level = 0, prefix = "node") => {
  let nodes = [];
  let edges = [];

  if (Array.isArray(json)) {
    json.forEach((item, index) => {
      const nodeId = `${prefix}-${level}-${index}`;
      const label = `Item ${index}`;

      nodes.push({
        id: nodeId,
        data: { label },
        position: { x: level * 240, y: index * 120 },
        style: {
          background: "linear-gradient(to right, #1c1c1c, #292929)",
          color: "#e0e0e0",
          padding: 12,
          borderRadius: 12,
          border: "1px solid #444",
          fontWeight: 600,
          fontSize: 15,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          width: 200,
          textAlign: "center",
        },
      });

      if (parentId) {
        edges.push({
          id: `e-${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          animated: true,
          style: { stroke: "#00d4ff", strokeWidth: 2, strokeDasharray: "5 5" },
        });
      }

      if (typeof item === "object" && item !== null) {
        const child = transformJsonToNodes(item, nodeId, level + 1, prefix);
        nodes = nodes.concat(child.nodes);
        edges = edges.concat(child.edges);
      }
    });
  } else {
    Object.entries(json).forEach(([key, value], index) => {
      const nodeId = `${prefix}-${level}-${index}`;
      const label = typeof value === "object" && value !== null ? key : `${key}: ${value}`;

      nodes.push({
        id: nodeId,
        data: { label },
        position: { x: level * 240, y: index * 120 },
        style: {
          background: "linear-gradient(to right, #1c1c1c, #292929)",
          color: "#e0e0e0",
          padding: 12,
          borderRadius: 12,
          border: "1px solid #444",
          fontWeight: 600,
          fontSize: 15,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          width: 200,
          textAlign: "center",
        },
      });

      if (parentId) {
        edges.push({
          id: `e-${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          animated: true,
          style: { stroke: "#00d4ff", strokeWidth: 2, strokeDasharray: "5 5" },
        });
      }

      if (typeof value === "object" && value !== null) {
        const child = transformJsonToNodes(value, nodeId, level + 1, prefix);
        nodes = nodes.concat(child.nodes);
        edges = edges.concat(child.edges);
      }
    });
  }

  return { nodes, edges };
};

export default function JsonVisualizer() {
  const [jsonInput, setJsonInput] = useState(`{
  "name": "AlgoSpectra",
  "features": {
    "visualizer": true,
    "editor": false
  }
}`);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleVisualize = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const { nodes: newNodes, edges: newEdges } = transformJsonToNodes(parsedJson);
      setNodes(newNodes);
      setEdges(newEdges);
    } catch (err) {
      alert("Invalid JSON");
    }
  };

  return (
    <div>
        <div className="visualizer-header">
          <h2>JsonVisualizer</h2>
          <button className="visualize-button" onClick={handleVisualize}>
            Visualize
          </button>
        </div>
        <div className="json-visualizer-container">
        
      <div className="left-panel">
        
        <textarea
          className="json-input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={10}
        />
      </div>

      <div className="flow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <MiniMap nodeColor={() => "#00d4ff"} />
          <Controls />
          <Background color="#303030" gap={18} />
        </ReactFlow>
      </div>
    </div>
    </div>
    
  );
}
