import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JsonVisualizer from "./pages/datavisualizers/JsonVisualizer";
import XmlVisualizer from "./pages/datavisualizers/XmlVisualizer";
import YamlVisualizer from "./pages/datavisualizers/YamlVisualizer";
import ArrayPage from "./page/ArrayPage";
import StackPage from "./page/StackPage";
import QueuePage from "./page/QueuePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /algoSpectra */}
        <Route path="/" element={<Navigate to="/algoSpectra" replace />} />

        <Route path="/algoSpectra" element={<HomePage />} />
        <Route path="/algoSpectra/json-visualizer" element={<JsonVisualizer />} />
        <Route path="/algoSpectra/xml-visualizer" element={<XmlVisualizer />} />
        <Route path="/algoSpectra/yaml-visualizer" element={<YamlVisualizer />} />
        <Route path="/algoSpectra/array" element={<ArrayPage />} />
        <Route path="/algoSpectra/stack" element={<StackPage />} />
        <Route path="/algoSpectra/queue" element={<QueuePage />} />

        {/* Optional: catch-all redirect to /algoSpectra */}
        <Route path="*" element={<Navigate to="/algoSpectra" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
