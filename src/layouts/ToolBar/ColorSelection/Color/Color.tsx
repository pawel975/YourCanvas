import { useAppDispatch } from '../../../../redux/hooks';
import { setToolColor } from '../redux/colorSelectionSlice';
import './Color.css';

interface ColorProps {
  id: string;
  hexCode: string;
}

const Color: React.FC<ColorProps> = ({ id, hexCode }) => {
  const dispatch = useAppDispatch();

  function handleColorOptionClick() {
    dispatch(setToolColor(hexCode));
  }
  return (
    <button
      onClick={handleColorOptionClick}
      style={{ backgroundColor: hexCode }}
      className="color"
      id={id}
    ></button>
  );
};

export default Color;
