// Board.js
import React, { useState } from 'react';

export default function Board({ onSelectSquare, board }) {
  const [clickedSquare, setClickedSquare] = useState(null);

  function handleClick(rowIndex, colIndex) {
    if (board[rowIndex][colIndex] === null) {
      onSelectSquare(rowIndex, colIndex);
      setClickedSquare(`${rowIndex}-${colIndex}`);
      setTimeout(() => setClickedSquare(null), 500);
    }
  }

  return (
    <ol id="board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleClick(rowIndex, colIndex)}
                  disabled={col !== null}
                  className={clickedSquare === `${rowIndex}-${colIndex}` ? 'clicked' : ''}
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
