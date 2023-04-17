import ColorSelection from './ColorSelection/ColorSelection';
import './ToolBar.css';
import ToolSelection from './ToolSelection/ToolSelection';

const ToolBar: React.FC = () => {
  return (
    <div className="tool-bar">
      <ToolSelection />
      <ColorSelection />
    </div>
  );
};

export default ToolBar;
