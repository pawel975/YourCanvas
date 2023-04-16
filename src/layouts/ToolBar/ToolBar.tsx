import Tool from './Tool/Tool';
import './ToolBar.css';
import toolsSchemeData from './toolsSchemeData';

interface ToolBarProps {
  currentToolId: string;
  handleToolbarToolClick: Function;
}

const ToolBar: React.FC<ToolBarProps> = ({ currentToolId, handleToolbarToolClick }) => {
  const allTools = toolsSchemeData.map((tool) => {
    const { id, icon } = tool;

    return (
      <Tool
        key={id}
        icon={icon}
        id={id}
        active={id === currentToolId}
        handleToolbarToolClick={handleToolbarToolClick}
      />
    );
  });

  return <div className="tool-bar">{allTools}</div>;
};

export default ToolBar;
