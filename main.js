//create game board with empty array
const createGameBoard = (function () {
  const array = new Array(9).fill('');
  return { array };
})();

//player selects x or o
const createPlayer = function (symbol) {
  const player = symbol;
  let computer = '';

  if (symbol === 'x') {
    computer = 'o';
  } else {
    computer = 'x';
  }

  return { player, computer };
};

//default player selects x
const players = createPlayer('x');
console.log(players);

//play 1 round of tic tac toe
const playGame = function (square) {
  //declare game board
  const gameBoard = createGameBoard.array;
  //player one selects square
  if (gameBoard[square] === '') {
    gameBoard[square] = players.player;
  } else {
    return 'choose another square';
  }

  //computer selects square
  //generate random number
  function getRandomIndex() {
    return Math.floor(Math.random() * gameBoard.length);
  }
  let randomIndex = getRandomIndex();
  console.log(`random index: ${randomIndex}`);

  //check if index is occupied if so check another index
  while (
    gameBoard[randomIndex] === players.player ||
    gameBoard[randomIndex] === players.computer
  ) {
    randomIndex = getRandomIndex();
    console.log(`changed to: ${randomIndex}`);
  }

  //computer plays at empty index
  if (gameBoard[randomIndex] === '') {
    gameBoard[randomIndex] = players.computer;
  }

  //top row
  console.log(createGameBoard.array.slice(0, 3));
  //middle row
  console.log(createGameBoard.array.slice(3, 6));
  //bottom row
  console.log(createGameBoard.array.slice(6, 9));
};

playGame(4);
