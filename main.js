//create game board with empty array
const gameBoard = (function () {
  return [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
})();

//player selects x or o. stores player and computer score
const createPlayer = function (symbol) {
  const player = symbol;
  let computer = '';

  if (symbol === 'x') {
    computer = 'o';
  } else {
    computer = 'x';
  }

  let playerScore = 0;
  let computerScore = 0;

  return { player, playerScore, computer, computerScore };
};

//default player selects x
const players = createPlayer('x');
console.log(players);

//play 1 round of tic tac toe
const playGame = function (row, col) {
  //declare game board
  console.log(gameBoard);

  //player one selects square
  if (gameBoard[row][col] === '') {
    gameBoard[row][col] = players.player;
  } else {
    return 'choose another square';
  }

  //declare random indices
  function getRandomIndex() {
    return Math.floor(Math.random() * gameBoard.length);
  }
  let randomRow = getRandomIndex();
  let randomColumn = getRandomIndex();

  //check if index is occupied if so check another index
  while (
    gameBoard[randomRow][randomColumn] === players.player ||
    gameBoard[randomRow][randomColumn] === players.computer
  ) {
    randomRow = getRandomIndex();
    randomColumn = getRandomIndex();
    console.log(`row changed to: ${randomRow}`);
    console.log(`column changed to ${randomColumn}`);
  }

  //computer plays at empty index
  if (gameBoard[randomRow][randomColumn] === '') {
    gameBoard[randomRow][randomColumn] = players.computer;
  }

  checkWin();
  console.log(checkWin());
};

function checkWin() {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i][0] !== '' &&
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][0] === gameBoard[i][2]
    ) {
      return `${gameBoard[i][0]} wins!`; // Row win
    }
    if (
      gameBoard[0][i] !== '' &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[0][i] === gameBoard[2][i]
    ) {
      return `${gameBoard[0][i]} wins!`; // Column win
    }
  }

  // Check diagonals
  if (
    gameBoard[0][0] !== '' &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[0][0] === gameBoard[2][2]
  ) {
    return `${gameBoard[0][0]} wins!`; // Diagonal from top-left to bottom-right
  }
  if (
    gameBoard[0][2] !== '' &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[0][2] === gameBoard[2][0]
  ) {
    return `${gameBoard[0][2]} wins!`; // Diagonal from top-right to bottom-left
  }

  return 'no win'; // No win
}

playGame(1, 1);
