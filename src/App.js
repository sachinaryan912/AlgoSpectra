import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VisualizerPage from "./pages/datavisualizers/VisualizerPage";
import VisualizerXmlPage from "./pages/datavisualizers/VisualizerXmlPage";
import YamlVisualizer from "./pages/datavisualizers/YamlVisualizer";
import ArrayPage from "./pages/algorithms/ArrayPage";
import StackPage from "./pages/algorithms/StackPage";
import QueuePage from "./pages/algorithms/QueuePage";
import LinkedListPage from "./pages/algorithms/LinkedListPage";
import InfixToPostfix from "./pages/queueAlgorithm/InfixToPostfix";
import DashboardPage from "./pages/DashboardPage";
import axios from "axios";
import { useEffect } from "react";

function App() {
  let callApiHealth = async () => {
    try {
      const response = await axios.get("https://algospectra.onrender.com/algohealth");
      console.log("API Health Check:", response.data);
    } catch (error) {
      console.error("Error checking API health:", error);
    }
  }
  useEffect(() => {
    callApiHealth();
 }, []);
  return (
    <>
    {/* <Navbar/> */}
    <Router>
      <Routes>
        {/* Redirect root to /algoSpectra */}
        <Route path="/" element={<Navigate to="/algoSpectra" replace />} />

        <Route path="/algoSpectra" element={<HomePage />} />
        <Route path="/algoSpectra/json-visualizer" element={<VisualizerPage />} />
        <Route path="/algoSpectra/xml-visualizer" element={<VisualizerXmlPage />} />
        <Route path="/algoSpectra/yaml-visualizer" element={<YamlVisualizer />} />
        <Route path="/algoSpectra/array" element={<ArrayPage />} />
        <Route path="/algoSpectra/dashboard" element={<DashboardPage />} />
        <Route path="/algoSpectra/stack" element={<StackPage />} />
        <Route path="/algoSpectra/queue" element={<QueuePage />} />
        <Route path="/algoSpectra/linkedlist" element={<LinkedListPage />} />
        <Route path="/algoSpectra/queue/infixToPostfix" element={<InfixToPostfix />} />

        {/* Optional: catch-all redirect to /algoSpectra */}
        <Route path="*" element={<Navigate to="/algoSpectra" replace />} />
      </Routes>
    </Router>
    </>
  );
   
}

export default App;
