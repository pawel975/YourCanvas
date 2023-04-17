import './ColorSelection.css';
import colorCodes from '../../../data/colorCodes.json';
import Color from './Color/Color';
import { useAppSelector } from '../../../redux/hooks';

const ColorSelection: React.FC = () => {
  const currentColorHex = useAppSelector((state) => state.colorSelection.color);

  const colors = colorCodes.map((color) => {
    return (
      <Color
        key={color.id}
        hexCode={color.hex}
        id={color.hex}
      />
    );
  });
  return (
    <fieldset className="color-selection">
      <legend>Colors</legend>
      <div
        style={{ backgroundColor: currentColorHex }}
        className="color-selection__picked-color"
      ></div>
      <div className="color-selection__colors-container">{colors}</div>
    </fieldset>
  );
};

export default ColorSelection;
