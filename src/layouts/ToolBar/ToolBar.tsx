import { useAppSelector } from '../../redux/hooks';
import ColorSelection from './ColorSelection/ColorSelection';
import NextStepButton from './OperationsOnHistory/NextStepButton/NextStepButton';
import UndoStepButton from './OperationsOnHistory/UndoStepButton/UndoStepButton';
import './ToolBar.css';
import ToolSelection from './ToolSelection/ToolSelection';
import ToolSizeSelection from './ToolSizeSelection/ToolSizeSelection';

const ToolBar: React.FC = () => {
  const currentToolId = useAppSelector((state) => state.toolSelection.tool);

  return (
    <div className="tool-bar">
      <UndoStepButton />
      <NextStepButton />
      <ToolSelection />
      {currentToolId.length > 0 && <ToolSizeSelection />}
      <ColorSelection />
    </div>
  );
};

export default ToolBar;
