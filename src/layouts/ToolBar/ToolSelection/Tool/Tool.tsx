import { ReactNode } from 'react';
import './Tool.css';
import { useAppDispatch } from '../../../../redux/hooks';
import { AvailableToolId, setTool } from '../redux/toolSelectionSlice';

interface ToolProps {
  icon: ReactNode;
  id: string;
  active: boolean;
}

const Tool: React.FC<ToolProps> = ({ id, icon, active }) => {
  const dispatch = useAppDispatch();

  function handleToolOptionClick() {
    dispatch(setTool(id as AvailableToolId));
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
