import { BaseEdge, getBezierPath } from 'reactflow';

function CustomEdge(props) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition,  targetPosition } = props;
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,  targetPosition,
    targetX,
    targetY,
  });

  return <BaseEdge path={edgePath} {...props} />;
}

export default CustomEdge;