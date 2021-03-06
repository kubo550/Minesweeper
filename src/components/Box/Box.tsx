import { Board } from "../../helper/helper";
// import Bomb from "../Bomb/Bomb";
export type EventType = React.MouseEvent<HTMLDivElement, MouseEvent>;
interface BoxProps {
  cell: Board;
  handleClick: (x: number, y: number, event: EventType) => void;
  x: number;
  y: number;
}
const bomb = "💣";
const flag = "🚩";

const Box: React.FC<BoxProps> = ({
  cell: { clicked, isBomb, neighbors, flagged, active },
  handleClick,
  x,
  y,
}) => {
  // prettier-ignore
  const content = clicked ? (isBomb ? bomb : neighbors ? neighbors : "") : flagged ? flag : ""
  return (
    <div
      className={clicked ? (isBomb && active ? "box active red" : "box active") : "box"}
      onClick={e => handleClick(x, y, e)}
    >
      {content}
    </div>
  );
};

export default Box;
