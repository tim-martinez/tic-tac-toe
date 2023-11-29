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

  let moves = 0;

  return { player, playerScore, computer, computerScore, moves };
};

//display the game board
const renderGameBoard = function () {
  const container = document.querySelector('.container');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.classList.add('gameboard');

  gameBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.row = `${rowIndex}`;
      tile.dataset.col = `${colIndex}`;
      tile.innerText = cell;
      container.append(tile);
    });
  });
};

//player selects symbol
const playerSelect = (function () {
  const x = document.querySelector('.x');
  const o = document.querySelector('.o');

  o.addEventListener('click', function () {
    const players = createPlayer('o');
    console.log(`selected ${players.player}`);
    renderGameBoard();
    selectBox(players);
  });

  x.addEventListener('click', function () {
    const players = createPlayer('x');
    console.log(`selected ${players.player}`);
    renderGameBoard();
    selectBox(players);
  });
})();

//click events for squares
const selectBox = function (players) {
  const tile = document.querySelectorAll('.tile');

  tile.forEach(function (element) {
    element.addEventListener('click', function () {
      players.moves++;
      console.log(`moves: ${players.moves}`);
      const row = element.dataset.row;
      const col = element.dataset.col;
      playGame(row, col, players, players.moves);
    });
  });
};
//continue working on storing moves and determining a tie game
//play round of tic tac toe
const playGame = function (row, col, players, moves) {
  //player one selects square
  if (gameBoard[row][col] === '') {
    gameBoard[row][col] = players.player;
  } else {
    return 'choose another square';
  }

  if (checkWin(players) === false && moves === 9) {
    return 'tie game!';
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

  if (checkWin() === true) {
    // checkWin();
    console.log('winner stop game!  - 2nd check');
    renderGameBoard();
    return true;
  }
  console.log(checkWin());
  const container = document.querySelector('.container');

  //erase contents of container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  renderGameBoard();
  if (checkWin() === true) {
    return;
  }
  selectBox(players);
};

//check if there is a winner
const checkWin = function (players) {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i][0] !== '' &&
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][0] === gameBoard[i][2]
    ) {
      const winner = gameBoard[i][0];
      if (winner === players.player) {
        players.playerScore++;
      }
      renderGameBoard();
      declareWinner(winner, players); // Row win
      return true;
    }
    if (
      gameBoard[0][i] !== '' &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[0][i] === gameBoard[2][i]
    ) {
      const winner = gameBoard[0][i];
      renderGameBoard();
      declareWinner(winner, players); // column win
      return true;
    }
  }

  // Check diagonals
  if (
    gameBoard[0][0] !== '' &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[0][0] === gameBoard[2][2]
  ) {
    const winner = gameBoard[0][0];
    renderGameBoard();
    declareWinner(winner, players);
    return true; // Diagonal from top-left to bottom-right
  }
  if (
    gameBoard[0][2] !== '' &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[0][2] === gameBoard[2][0]
  ) {
    const winner = gameBoard[0][2];
    renderGameBoard();
    declareWinner(winner, players);
    return true; // Diagonal from top-right to bottom-left
  }

  return false; // No win
};

//declare winner

const declareWinner = function (winner, players) {
  const body = document.body;
  const div = document.createElement('div');
  const winnerText = document.createElement('h2');
  winnerText.textContent = `${winner} wins! player score: ${players.playerScore} computer score: ${players.computerScore}`;

  console.log(`player score ${players.playerScore}`);
  console.log(`computer score: ${players.computerScore}`);

  div.classList = 'winner';
  div.append(winnerText);
  body.insertBefore(div, body.firstChild);
};
