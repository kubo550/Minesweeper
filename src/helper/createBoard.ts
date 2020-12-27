import { Board } from "./helper"

export const createGameBoard = (
    rows: number,
    cols: number,
    maxBombs: number = 10
): Board[][] => {
    const board = Array(cols)
        .fill(null)
        .map((_, y) =>
            Array(rows)
                .fill(null)
                .map((_, x) => ({
                    y,
                    x,
                    active: false,
                    clicked: false,
                    isBomb: false,
                    flagged: false,
                    neighbors: 0
                }))
        );
    setBombs(board, maxBombs, cols, rows)
    board.forEach((row, y) =>
        row.forEach((cell, x) => {
            cell.neighbors = countNeighbors(board, y, x);
        })
    );

    return board;
};

const random = (num: number) => Math.floor(Math.random() * num);

const setBombs = (board: Board[][], maxBombs: number, height: number, width: number) => {
    while (maxBombs) {
        const current = board[random(height)][random(width)];
        if (!current.isBomb) {
            current.isBomb = true;
            maxBombs--;
        }
    }
}

const countNeighbors = (arr: Board[][], currentY: number, currentX: number) => {
    if (arr[currentY][currentX].isBomb) return 0;
    let neighborCount = 0;
    for (let y = currentY - 1; y <= currentY + 1; y++) {
        for (let x = currentX - 1; x <= currentX + 1; x++) {
            if (y >= 0 && y < arr.length && x >= 0 && x < arr[0].length) {
                if (arr[y][x].isBomb) neighborCount++;
            }
        }
    }
    return neighborCount;
};
