import { ReactNode } from 'react';
import './Tool.css';

interface ToolProps {
  icon: ReactNode;
  id: string;
  active: boolean;
  handleToolbarToolClick: Function;
}

const Tool: React.FC<ToolProps> = ({ id, icon, active, handleToolbarToolClick }) => {
  return (
    <button
      key={id}
      className={`tool-bar__tool-icon ${active && 'active'}`}
      onClick={(e) => handleToolbarToolClick(e)}
      id={id}
    >
      {icon}
    </button>
  );
};

export default Tool;
