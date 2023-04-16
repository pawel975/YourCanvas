import './Color.css';

interface ColorProps {
  id: string;
  hexCode: string;
  handleToolbarColorClick: Function;
}

const Color: React.FC<ColorProps> = ({ id, hexCode, handleToolbarColorClick }) => {
  return (
    <button
      onClick={(e) => handleToolbarColorClick(e)}
      style={{ backgroundColor: hexCode }}
      className="color"
      id={id}
    ></button>
  );
};

export default Color;
