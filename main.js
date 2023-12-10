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

//need to fix logic to determine if there is a tie
//play round of tic tac toe
const playGame = function (row, col, players) {
  //player one selects square
  if (gameBoard[row][col] === '') {
    gameBoard[row][col] = players.player;
  } else {
    return 'choose another square';
  }

  //check to handle tie game
  //else if needs more actions to trigger tie event
  const isWinner = checkWin(players);

  if (isWinner) {
    players.moves = 0;
    return;
  } else if (!isWinner && players.moves === 5) {
    players.moves = 0;
    console.log('tie game!');
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

  //computer plays at empty index
  if (gameBoard[randomRow][randomColumn] === '') {
    gameBoard[randomRow][randomColumn] = players.computer;
  }

  renderGameBoard();

  if (checkWin(players) === true) {
    return 'someone won!';
  }

  selectBox(players);
};

//check if there is a winner
const checkWin = function (players) {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    // Row win
    if (
      gameBoard[i][0] !== '' &&
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][0] === gameBoard[i][2]
    ) {
      const winner = gameBoard[i][0];
      //add to winner's score
      if (winner === players.player) {
        players.playerScore++;
      } else {
        players.computerScore++;
      }

      renderGameBoard();
      declareWinner(winner, players);
      return true;
    }
    // column win
    if (
      gameBoard[0][i] !== '' &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[0][i] === gameBoard[2][i]
    ) {
      const winner = gameBoard[0][i];
      //add to winner's score
      if (winner === players.player) {
        players.playerScore++;
      } else {
        players.computerScore++;
      }
      renderGameBoard();
      declareWinner(winner, players);
      return true;
    }
  }

  // Check diagonals
  // Diagonal from top-left to bottom-right
  if (
    gameBoard[0][0] !== '' &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[0][0] === gameBoard[2][2]
  ) {
    const winner = gameBoard[0][0];
    //add to winner's score
    if (winner === players.player) {
      players.playerScore++;
    } else {
      players.computerScore++;
    }
    renderGameBoard();
    declareWinner(winner, players);
    return true;
  }
  // Diagonal from top-right to bottom-left
  if (
    gameBoard[0][2] !== '' &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[0][2] === gameBoard[2][0]
  ) {
    const winner = gameBoard[0][2];
    //add to winner's score
    if (winner === players.player) {
      players.playerScore++;
    } else {
      players.computerScore++;
    }
    renderGameBoard();
    declareWinner(winner, players);
    return true;
  }

  return false; // No win
};

//declare winner in results div
const declareWinner = function (winner, players) {
  const body = document.body;
  const div = document.createElement('div');
  const winnerText = document.createElement('h2');
  const btn = document.createElement('button');
  const results = document.querySelector('.results');
  // const scoreDiv = document.querySelector('.score');
  const scoreText = document.querySelector('.scoreText');

  btn.addEventListener('click', () => {
    //reset game board / start new round
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard.length; j++) {
        gameBoard[i][j] = '';
      }
    }
    //this works at removing the announcement div
    //will be a problem if this div is no longer the first child
    body.removeChild(body.firstChild);
    renderGameBoard();
    selectBox(players);
  });

  btn.textContent = 'Play again';
  winnerText.textContent = `${winner} wins!`;
  scoreText.textContent = `Player: ${players.playerScore} Bot: ${players.computerScore}`;

  results.classList.add('winner');
  results.append(winnerText);
  results.append(btn);
};

//winner announce doesn't clear out after every game. it just keeps stacking after every round
//need to work on better responsive layout for the results announcement
//add announcement for tie game situation
