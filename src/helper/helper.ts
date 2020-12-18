// ^ Types
export interface BoardType {
    clicked: boolean;
    isBomb: boolean;
    flagged: boolean;
    x: number;
    y: number;
    neighbors: number;
}



// - Functions
const countNeighbors = (b: BoardType[][], j: number, i: number) => {
    if (b[j][i].isBomb) return -1;
    let neighborCount = 0;
    for (let y = i - 1; y <= i + 1; y++) {
        for (let x = j - 1; x <= j + 1; x++) {
            if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
                const neighbor = b[x][y];
                if (neighbor.isBomb) neighborCount++;
            }
        }
    }
    return neighborCount;
};

export const newBoard = (width: number, height: number): BoardType[][] => {
    const board = Array(height)
        .fill(null)
        .map((_, y) =>
            new Array(width).fill(null).map((_, x) => ({
                clicked: false,
                flagged: false,
                isBomb: Math.random() > 0.84,
                x,
                y,
                neighbors: 0,
            }))
        );
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            board[j][i].neighbors = countNeighbors(board, j, i);
        }
    }
    return board;
};


export const reveal = (board: BoardType[][], y: number, x: number) => {
    const currentBox = board[y][x];
    currentBox.clicked = true;
    if (currentBox.neighbors === 0) {
        floodFilled(board, y, x);
    }
};

const floodFilled = (board: BoardType[][], y: number, x: number) => {
    for (let i = y - 1; i <= y + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
            if (i >= 0 && i <= 9 && j >= 0 && j <= 9) {
                const neighbor = board[i][j];
                if (!neighbor.isBomb && !neighbor.clicked) {
                    reveal(board, i, j);
                }
            }
        }
    }
};
