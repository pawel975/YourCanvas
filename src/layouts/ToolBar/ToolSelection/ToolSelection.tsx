import Tool from './Tool/Tool';
import toolsSchemeData from './toolsSchemeData';
import './ToolSelections.css';

interface ToolSelectionProps {
  currentToolId: string;
  handleToolbarToolClick: Function;
}

const ToolSelection: React.FC<ToolSelectionProps> = ({ currentToolId, handleToolbarToolClick }) => {
  const tools = toolsSchemeData.map((tool) => {
    const { id, icon } = tool;
    console.log(id, currentToolId);

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

  return <section className="tool-selection">{tools}</section>;
};

export default ToolSelection;
