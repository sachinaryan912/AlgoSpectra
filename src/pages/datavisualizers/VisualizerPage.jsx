import { ReactFlowProvider } from 'reactflow';
import JsonVisual from './JsonVisual';

function VisualizerPage() {
  return (
    <ReactFlowProvider>
      <JsonVisual />
    </ReactFlowProvider>
  );
}

export default VisualizerPage;
