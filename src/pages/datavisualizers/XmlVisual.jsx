import { useCallback, useEffect, useLayoutEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useReactFlow,
  Panel,
} from "reactflow";
import { shallow } from "zustand/shallow";
import "./Visual.css";
import ELK from "elkjs/lib/elk.bundled.js";

import Sidebar from "./custom/json/Sidebar";
import useStore from "./store";
import convertXmlToTree from "./custom/convertXmlToTree";
import convertTreeToNodes from "./custom/json/convertTreeToNodes";

import "reactflow/dist/style.css";
import CustomNodes from "./custom/CustomNodes";
import CustomEdge from "./custom/CustomEdge";

const nodeTypes = { xmlVis: CustomNodes };
const edgeTypes = { xmlVis: CustomEdge };

const defaultEdgeOpt = { type: "xmlVis" };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  viewport: state.viewport,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  setViewport: state.setViewport,
  needToRenderXml: state.needToRenderXml,
});

const elk = new ELK();

const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "200",
  "elk.spacing.nodeNode": "150",
  "elk.edgeRouting": "SPLINES",
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        position: { x: node.x, y: node.y },
      })),
      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function XmlVisual() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    needToRenderXml,
  } = useStore(selector, shallow);

  const { fitView } = useReactFlow();

  const onLayout = useCallback(
    ({ direction }, initialNodes = null) => {
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = initialNodes === null ? nodes : initialNodes[0];
      const es = initialNodes === null ? edges : initialNodes[1];
      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
        }
      );
    },
    [nodes, edges]
  );

  useLayoutEffect(() => {
    const nodeTree = convertXmlToTree(needToRenderXml);
    let convertedNodes = convertTreeToNodes(nodeTree, true);
    onLayout({ direction: "DOWN" }, convertedNodes);
  }, [needToRenderXml]);

  useEffect(() => {
    fitView({ nodes: [nodes[0], nodes[0]?.id], minZoom: 0.1, padding: 8 });
  }, [nodes, edges, fitView]);

  return (
    <>
      <div className="app-cont">
        <div className="react-flow-cont">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOpt}
          >
            <MiniMap nodeColor={() => "#00d4ff"} />
            <Controls showInteractive={false}></Controls>
            <Background gap={30} color={"#c4c4c4"}></Background>
            <Panel position="top-right" className="react-flow__panel-1">
              <button onClick={() => onLayout({ direction: "DOWN" })}>
                Vertical Layout
              </button>
              <button onClick={() => onLayout({ direction: "RIGHT" })}>
                Horizontal Layout
              </button>
            </Panel>
          </ReactFlow>
        </div>
        <Sidebar dataType="xml" />
      </div>
    </>
  );
}

export default XmlVisual;