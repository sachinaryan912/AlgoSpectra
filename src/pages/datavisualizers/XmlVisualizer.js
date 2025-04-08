// src/components/XmlVisualizer.js
import React, { useEffect, useState } from "react";
import { xml2json } from "xml-js";
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

const transformXmlToNodes = (json, parentId = null, level = 0, yOffset = 0, prefix = "xml") => {
  let nodes = [];
  let edges = [];

  const nodeId = `${prefix}-${level}-${Math.random().toString(36).substr(2, 5)}`;
  nodes.push({
    id: nodeId,
    data: { label: JSON.stringify(json.name || "Element", null, 2) },
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
      style: { stroke: "#0ff", strokeWidth: 2, strokeDasharray: "4 4" },
    });
  }

  if (json.elements) {
    json.elements.forEach((child, index) => {
      const { nodes: cNodes, edges: cEdges } = transformXmlToNodes(
        child,
        nodeId,
        level + 1,
        yOffset + index * 160,
        prefix
      );
      nodes = [...nodes, ...cNodes];
      edges = [...edges, ...cEdges];
    });
  }

  return { nodes, edges };
};

export default function XmlVisualizer() {
  const [xmlInput, setXmlInput] = useState(`<root><item>A</item><item>B</item></root>`);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleVisualize = () => {
    try {
      const parsedJson = JSON.parse(xml2json(xmlInput, { compact: false }));
      const { nodes: newNodes, edges: newEdges } = transformXmlToNodes(parsedJson);
      setNodes(newNodes);
      setEdges(newEdges);
    } catch (err) {
      alert("Invalid XML");
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(setMenuSelected('xml'));
  },[])

  return (
    <div>
      <div className="visualizer-header">
        <h2>XmlVisualizer</h2>
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
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            rows={10}
          />
        </div>

        <div className="flow-wrapper">
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView>
            <MiniMap nodeColor={() => "#00d4ff"} />
            <Controls />
            <Background color="#2c2c2c" gap={18} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
