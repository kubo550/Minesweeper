import { Board } from "./helper"

export const reveal = (board: Board[][], y: number, x: number) => {
    const currentBox = board[y][x];
    currentBox.clicked = true;
    currentBox.active = true;

    if (currentBox.neighbors === 0 && !currentBox.isBomb) {
        floodFilled(board, y, x);
    }
};

const floodFilled = (board: Board[][], currentY: number, currentX: number) => {
    for (let y = currentY - 1; y <= currentY + 1; y++) {
        for (let x = currentX - 1; x <= currentX + 1; x++) {
            if (y >= 0 && y < board.length && x >= 0 && x < board[0].length) {
                const neighbor = board[y][x];
                if (!neighbor.isBomb && !neighbor.clicked) {
                    reveal(board, y, x);
                }
            }
        }
    }
};
