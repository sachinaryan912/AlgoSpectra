import { applyEdgeChanges, applyNodeChanges } from "reactflow";

import { create } from "zustand";

const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 0 },
  needToRenderJson: {
    "name": "AlgoSpectra",
    "features": {
      "visualizer": true,
      "editor": false
    },
    "address": {
      "city": "Pune",
      "zip": 411001
    }
  },
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  setNodes: (nodes) => {
    set({ nodes: [...nodes] });
  },
  setEdges: (edges) => {
    set({ edges: [...edges] });
  },
  setNeedToRenderJson: (json) => {
    console.log(json);
    set({nodes:[], edges: [], needToRenderJson: { ...json } });
  },
}));

export default useStore;