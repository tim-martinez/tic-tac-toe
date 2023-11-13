//create game board with empty array
const createGameBoard = (function() {
    const array = new Array(9).fill(undefined);
    return {array};
})();

//player selects x or o
const createPlayer = function(symbol) {
    const player = symbol;
    let computer = '';

    if (symbol === 'x'){
        computer = 'o';
    }else {
        computer = 'x';
    }

    return {player, computer};
};

//default player selects x
const players = createPlayer('x');

const playGame = function(square) {

    //player one selects square 
    const gameBoard = createGameBoard.array;
    gameBoard[square] = players.player;

    //computer selects square
    const randomIndex = Math.floor(Math.random() * gameBoard.length);
    if (gameBoard[randomIndex] === undefined){
        gameBoard[randomIndex] = players.computer;
    };
};

console.log(createGameBoard.array);
console.log(players);
