import React, { useState } from "react";
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

// Grouped Object Node Transformer
const transformJsonToNodes = (json, parentId = null, level = 0, prefix = "node", yOffset = 0) => {
  let nodes = [];
  let edges = [];
  const nodeId = `${prefix}-${level}-${Math.random().toString(36).substr(2, 5)}`;
  let labelLines = [];

  let childYOffset = yOffset;
  let childNodes = [];
  let childEdges = [];

  Object.entries(json).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      labelLines.push(`${key}: {...}`);

      const {
        nodes: cNodes,
        edges: cEdges
      } = transformJsonToNodes(value, nodeId, level + 1, prefix, childYOffset);

      const childRootNode = cNodes[0];
      childEdges.push({
        id: `e-${nodeId}-${childRootNode.id}-${key}`,
        source: nodeId,
        target: childRootNode.id,
        animated: true,
        style: {
          stroke: "#00d4ff",
          strokeWidth: 2,
          strokeDasharray: "6 4"
        },
      });

      childYOffset += cNodes.length * 150;
      childNodes = [...childNodes, ...cNodes];
      childEdges = [...childEdges, ...cEdges];
    } else {
      labelLines.push(`${key}: ${value}`);
    }
  });

  nodes.push({
    id: nodeId,
    data: { label: labelLines.join('\n') },
    position: { x: level * 300, y: yOffset },
    style: {
      background: "linear-gradient(to right, #1c1c1c, #292929)",
      color: "#e0e0e0",
      padding: 12,
      borderRadius: 12,
      border: "1px solid #444",
      fontWeight: 600,
      fontSize: 15,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
      width: 220,
      whiteSpace: "pre-line",
      textAlign: "left"
    }
  });

  return {
    nodes: [...nodes, ...childNodes],
    edges: [...edges, ...childEdges]
  };
};

export default function JsonVisualizer() {
  const [jsonInput, setJsonInput] = useState(`{
  "name": "AlgoSpectra",
  "features": {
    "visualizer": true,
    "editor": false
  },
  "address": {
    "city": "Pune",
    "zip": 411001
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

      <div className="visual-subheader">

      <DataModelSelector />

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