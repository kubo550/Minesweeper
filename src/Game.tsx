import React, { useState } from "react";
import Box, { EventType } from "./components/Box/Box";
import { newBoard, reveal } from "./helper/helper";

const Saper = () => {
  const [board, setBoard] = useState(newBoard(10, 10));
  const [playable, setPlayable] = useState(true);

  const handleClick = (x: number, y: number, event: EventType) => {
    if (!playable) return;
    const newBoard = [...board];
    const currentCell = newBoard[y][x];

    if (!currentCell.clicked) {
      if (event.ctrlKey) {
        currentCell.flagged = !currentCell.flagged;
      } else if (!currentCell.flagged) {
        reveal(newBoard, y, x);
        if (currentCell.isBomb) {
          gameOver();
        }
      }
    }
    setBoard(newBoard);
  };
  const gameOver = () => {
    const newBoard = [...board];
    newBoard.map(row =>
      row.map(col => (col.isBomb ? (col.flagged ? null : (col.clicked = true)) : null))
    );
    setBoard(newBoard);
    setPlayable(false);
  };
  return (
    <div className='board-container'>
      {board.map((row, y) =>
        row.map((cell, x) => (
          <Box key={x + 1 * y + 1} x={x} y={y} cell={cell} handleClick={handleClick} />
        ))
      )}
      {/* {!playable && <PopupContainer newGame={newGame} />} */}
    </div>
  );
};

export default Saper;
