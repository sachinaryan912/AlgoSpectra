import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import JsonVisualizer from "./components/JsonVisualizer"; // <-- Make sure this exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/json-visualizer" element={<JsonVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;
