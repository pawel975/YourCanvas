import './ColorSelection.css';
import colorCodes from '../../../data/colorCodes.json';
import Color from './Color/Color';

interface ColorSelectionProps {
  pickedColorId: string;
  handleToolbarColorClick: Function;
}

const ColorSelection: React.FC<ColorSelectionProps> = ({
  pickedColorId,
  handleToolbarColorClick,
}) => {
  const colors = colorCodes.map((color) => {
    return (
      <Color
        key={color.id}
        hexCode={color.hex}
        id={color.id}
        handleToolbarColorClick={handleToolbarColorClick}
      />
    );
  });
  return (
    <fieldset className="color-selection">
      <legend>Colors</legend>
      <div
        style={{ backgroundColor: pickedColorId }}
        className="color-selection__picked-color"
      ></div>
      <div className="color-selection__colors-container">{colors}</div>
    </fieldset>
  );
};

export default ColorSelection;
