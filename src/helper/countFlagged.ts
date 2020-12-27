import { Board } from "./helper"

export const countFlagged = (board: Board[][]) => {
    let flagged = 0
    let correctFlagged = 0
    board.forEach(row =>
        row.forEach(cell => {
            if (cell.flagged) {
                flagged++
                if (cell.isBomb) {
                    correctFlagged++
                }
            }
        })
    );
    return [flagged, correctFlagged]
}