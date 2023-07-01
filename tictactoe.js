// Initialize the board
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

// Select all the cells on the board
const cells = document.querySelectorAll('.cell');

// Add a click event listener to each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Select the reset button
const resetButton = document.querySelector('.reset-button');

// Add a click event listener to the reset button
resetButton.addEventListener('click', handleResetButtonClick);

// Handle cell click events
function handleCellClick(event) {
  // Get the index of the clicked cell
  const cellIndex = event.target.id;

  // If the cell is already occupied or the game is over, do nothing
  if (board[cellIndex] || isGameOver(board)) {
    return;
  }

  // Update the board with the current player's move
  board[cellIndex] = currentPlayer;

  // Update the cell with the current player's mark (X or O)
  event.target.textContent = currentPlayer;

  // Check if the game is over
  if (isGameOver(board)) {
    // Display the winner or a tie message
    const winner = getWinner(board);
    if (winner) {
      alert(`Player ${winner} wins!`);
    } else {
      alert("It's a tie!");
    }
  } else {
    // Switch to the other player's turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Handle reset button click event
function handleResetButtonClick() {
  // Clear the board
  board.fill('');

  // Clear the cells on the board
  cells.forEach(cell => {
    cell.textContent = '';
  });

  // Reset the current player to X
  currentPlayer = 'X';
}

// Check if the game is over
function isGameOver(board) {
  return getWinner(board) || board.every(cell => cell !== '');
}

// Get the winner of the game
function getWinner(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}
