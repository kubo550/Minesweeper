import { countFlagged } from "./countFlagged"
import { createGameBoard } from "./createBoard"
import { reveal } from "./reveal"

export interface Board {
    y: number;
    x: number;
    active: boolean;
    clicked: boolean;
    isBomb: boolean;
    flagged: boolean;
    neighbors: number;
}
export { createGameBoard, countFlagged, reveal }