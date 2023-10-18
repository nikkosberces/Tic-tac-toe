import React, { useState } from "react";
import "./App.css";

function App() {
  // Initialize the game state: board, player turn, and game status
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // Handle a square click event
  const handleClick = (i) => {
    if (gameOver || board[i]) return; // Ignore clicks if the game is over or the square is already filled

    const newBoard = [...board]; // Create a copy of the current board
    newBoard[i] = xIsNext ? "X" : "O"; // Place 'X' or 'O' on the clicked square
    setBoard(newBoard); // Update the board state
    setXIsNext(!xIsNext); // Toggle the player turn

    // Check if there's a winner or if it's a draw
    const winner = calculateWinner(newBoard);
    if (winner || newBoard.every((square) => square !== null)) {
      setGameOver(true); // Set the game status to over
    }
  };

  // Render a square button
  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  // Handle the reset button click event
  const handleReset = () => {
    // Reset the board, player turn, and game status
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  // Determine the game status (winner, draw, or next player)
  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (gameOver) {
    status = "It's a draw!";
  } else {
    status = "Player: " + (xIsNext ? "X" : "O");
  }

  // Game Interface
  return (
    <div className="container">
      <div className="title">Tic Tac Toe</div>
      <div className="board">
        <div className="status">{status}</div>
        <div className="row1">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row2">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row3">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="reset" onClick={handleReset}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

// Function to calculate the winner based on the current board
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return 'X' or 'O' if there's a winner
    }
  }
  return null; // Return null if there's no winner
};

export default App;
