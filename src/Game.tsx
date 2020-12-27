import React, { useState } from "react";
import Box, { EventType } from "./components/Box/Box";
import PopupContainer from "./components/PopupContainer/PopupContainer";
import { createGameBoard, countFlagged, reveal } from "./helper/helper";

const Saper = () => {
  const [maxBombs] = useState(5);
  const [board, setBoard] = useState(createGameBoard(15, 15, maxBombs));
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

  const [flaggedCount, correctFlagged] = countFlagged(board);

  const gameOver = () => {
    const newBoard = [...board];
    newBoard.map(row =>
      // ^ Set Wrong Flagged
      row.map(col => (col.isBomb ? (col.flagged ? null : (col.clicked = true)) : null))
    );
    setBoard(newBoard);
    setPlayable(false);
  };

  if (playable && correctFlagged === maxBombs) {
    gameOver();
  }

  const newGame = () => {
    setBoard(createGameBoard(15, 15, maxBombs));
    setPlayable(true);
  };

  return (
    <>
      <div className='head'>
        <h3>00:01 ⏲ </h3>
        <h2>Mine Swipper</h2>
        <h3> {maxBombs - flaggedCount} 💣 </h3>
      </div>
      <div className='board-container'>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <Box key={x + 1 * y + 1} x={x} y={y} cell={cell} handleClick={handleClick} />
          ))
        )}
        {!playable && <PopupContainer newGame={newGame} />}
      </div>
    </>
  );
};

export default Saper;
