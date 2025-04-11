import { ReactFlowProvider } from "reactflow";
import XmlVisual from "./XmlVisual";

function VisualizerXmlPage() {
  return (
    <ReactFlowProvider>
      <XmlVisual />
    </ReactFlowProvider>
  );
}

export default VisualizerXmlPage;
