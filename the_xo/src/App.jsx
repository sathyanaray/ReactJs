import React, { useState } from 'react';
import Player from './components/Player';
import Board from './components/Board';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { Winning_Combo } from './winning_combo';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  return gameTurns.length % 2 === 0 ? 'X' : 'O';
}

function deriveGameBoard(gameTurns) {
  const gameBoard = Array.from({ length: 3 }, () => Array(3).fill(null));

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}


function deriveWinner(board, players) {
  const symbols = ['X', 'O'];

  for (const symbol of symbols) {
    for (const combo of Winning_Combo) {
      const [firstSqr, secondSqr, thirdSqr] = combo;
      const firstSqrSymbol = board[firstSqr.row][firstSqr.col];
      const secondSqrSymbol = board[secondSqr.row][secondSqr.col];
      const thirdSqrSymbol = board[thirdSqr.row][thirdSqr.col];

      if (
        firstSqrSymbol === symbol &&
        firstSqrSymbol === secondSqrSymbol &&
        firstSqrSymbol === thirdSqrSymbol
      ) {
        return players[symbol]; 
      }
    }
  }
  const isDraw = board.every((row) => row.every((cell) => cell !== null));
  if (isDraw) {
    return "it's a draw";
  }
  return null;
}




function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurns.length === 9 && !winner;



  function deriveGameBoard(gameTurns) {
    let gameBoard = [...initialBoard.map((array) => [...array])];
    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
    return gameBoard;
  }

  function handleSelectSquare(rowIndex, colIndex) {
    if (!winner && !isDraw && gameBoard[rowIndex][colIndex] === null) {
      const curPlayer = activePlayer;
      setGameTurns((prevTurns) => [
        ...prevTurns,
        { square: { row: rowIndex, col: colIndex }, player: curPlayer },
      ]);
    }
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={players.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && <GameOver Winner={winner} onRestart={handleRestart} />}
        <Board onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
