import { ReactNode } from 'react';
import './Tool.css';
import { useAppDispatch } from '../../../../redux/hooks';
import { AvailableToolId, setTool } from '../redux/toolSelectionSlice';
import { setToolSize } from '../../ToolSizeSelection/redux/toolSizeSelectionSlice';
import toolsSchemeData from '../../toolsSchemeData';

interface ToolProps {
  icon: ReactNode;
  id: string;
  active: boolean;
}

const Tool: React.FC<ToolProps> = ({ id, icon, active }) => {
  const dispatch = useAppDispatch();
  const toolSizes = toolsSchemeData.find((tool) => tool.id === id)?.sizesInPx;

  function handleToolOptionClick() {
    dispatch(setTool(id as AvailableToolId));
    if (toolSizes) dispatch(setToolSize(toolSizes[0]));
  }

  return (
    <button
      key={id}
      className={`tool-icon ${active && 'active'}`}
      onClick={handleToolOptionClick}
      id={id}
    >
      {icon}
    </button>
  );
};

export default Tool;
