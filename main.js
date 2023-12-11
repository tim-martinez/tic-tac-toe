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
  const arrow = document.querySelector('.arrow');
  const score = document.querySelector('.scoreText');

  //reset page when arrow clicked
  arrow.addEventListener('click', () => {
    window.location.reload(true);
  });

  o.addEventListener('click', function () {
    const players = createPlayer('o');
    console.log(`selected ${players.player}`);
    renderGameBoard();
    selectBox(players);
    arrow.style.display = 'flex';
    score.style.display = 'block';
  });

  x.addEventListener('click', function () {
    const players = createPlayer('x');
    console.log(`selected ${players.player}`);
    renderGameBoard();
    selectBox(players);
    arrow.style.display = 'block';
    score.style.display = 'block';
  });
})();

//click events for squares
const selectBox = function (players) {
  const tile = document.querySelectorAll('.tile');

  tile.forEach(function (element) {
    element.addEventListener('click', function () {
      //count as a move if the square is empty
      if (gameBoard[element.dataset.row][element.dataset.col] === '') {
        players.moves++;
      }
      console.log(`moves: ${players.moves}`);
      const row = element.dataset.row;
      const col = element.dataset.col;
      playGame(row, col, players);
    });
  });
};

//play round of tic tac toe
const playGame = function (row, col, players) {
  //player one selects square
  if (gameBoard[row][col] === '') {
    gameBoard[row][col] = players.player;
  } else {
    return 'choose another square';
  }

  if (checkWin(players)) {
    return;
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
  }

  //computer plays at random empty index
  if (gameBoard[randomRow][randomColumn] === '') {
    gameBoard[randomRow][randomColumn] = players.computer;
  }

  renderGameBoard();

  if (checkWin(players)) {
    return;
  }

  selectBox(players);
};

//check if there is a winner
const checkWin = function (players) {
  let winner = null;

  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    // Row win
    if (
      gameBoard[i][0] !== '' &&
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][0] === gameBoard[i][2]
    ) {
      winner = gameBoard[i][0];
      break;
    }
    // Column win
    if (
      gameBoard[0][i] !== '' &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[0][i] === gameBoard[2][i]
    ) {
      winner = gameBoard[0][i];
      break;
    }
  }

  // Check diagonals
  if (
    gameBoard[0][0] !== '' &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[0][0] === gameBoard[2][2]
  ) {
    winner = gameBoard[0][0];
  }
  if (
    gameBoard[0][2] !== '' &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[0][2] === gameBoard[2][0]
  ) {
    winner = gameBoard[0][2];
  }

  // Handle tie
  if (players.moves === 5 && winner === null) {
    renderGameBoard();
    declareWinner('tie', players);
    return true;
  }

  if (winner !== null) {
    // Add to winner's score
    if (winner === players.player) {
      players.playerScore++;
    } else if (winner === players.computer) {
      players.computerScore++;
    }

    players.moves = 0;
    renderGameBoard();
    declareWinner(winner, players);
    return true;
  }

  return false;
};

//declare winner in results div
const declareWinner = function (winner, players) {
  // const body = document.body;
  const winnerText = document.createElement('h2');
  const btn = document.createElement('button');
  const results = document.querySelector('.results');
  const scoreText = document.querySelector('.scoreText');

  btn.addEventListener('click', () => {
    //reset game board / start new round
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard.length; j++) {
        gameBoard[i][j] = '';
      }
    }

    //clear out the results div
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }

    renderGameBoard();
    selectBox(players);
  });

  btn.textContent = 'Play again';
  if (winner === 'tie') {
    winnerText.textContent = `Tie Game!`;
  } else {
    winnerText.textContent = `${winner} wins!`;
  }

  scoreText.textContent = `Player: ${players.playerScore} Bot: ${players.computerScore}`;

  results.classList.add('winner');
  results.append(winnerText);
  results.append(btn);
};
