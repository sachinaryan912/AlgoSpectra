import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import JsonVisualizer from "./components/JsonVisualizer";
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
