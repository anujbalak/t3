let winner = String;
let winMsg = String;
let gameFinished = false;
const gameContainer = document.querySelector('#board-container');
const changeTurn = document.querySelector('div>.turn');
let currentPlayer = document.querySelector('.turn');

function startGame() {
    gameboard();
}

function Player(name) {
    this.name = name;
}

const players = [];
// get player names /////////////////////////////
const getPlayerNames = document.querySelector('dialog.player-names');
const player1Name = document.querySelector('input#player1');
const player2Name = document.querySelector('input#player2');
const confirmBtn = document.querySelector('div.confirmBtn>button');

window.addEventListener('load', () => {
    getPlayerNames.showModal();
})


getPlayerNames.addEventListener('close', (e) => {
    if(player1Name.value == '' || player1Name.value == undefined) {
        player1Name.value = 'Player 1'
        const player1 = new Player(player1Name.value);
        players.push(player1);
    } else {
        const player1 = new Player(player1Name.value);
        players.push(player1);
    } 
    if ( player2Name.value == '' || player2Name.value == undefined) {
        player2Name.value = 'Player 2'
        const player2 = new Player(player2Name.value);
        players.push(player2);
    } else {
        const player2 = new Player(player2Name.value);
        players.push(player2);
    }
    if (players.length != 0) {
        currentPlayer.textContent = `${players[0].name} turn [X]`;
    }
});

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getPlayerNames.close(player1Name.value, player2Name.value);
})
 ////////////////////////////////////////////////////////////////

function gameboard() {
    const board = [];
    const cells = 9;
    let lastChoice = String;
    for (let i = 0; i < cells; i++) {
        const cell = document.createElement('div')
        const xOrO = document.createElement('div');
        // board[i] = '';
        cell.className = 'cell';
        xOrO.className = 'xOrO';
        gameContainer.appendChild(cell)
        cell.appendChild(xOrO);
        cell.addEventListener('click', (e) => {
            if (gameFinished === false) {
            if (lastChoice === 'X' && xOrO.textContent == '') {
                xOrO.textContent = 'O';
                board[i] = 'O';
                lastChoice = 'O'
            } else if (lastChoice === 'O' && xOrO.textContent == '') {
                xOrO.textContent = 'X';
                board[i] = 'X';
                lastChoice = 'X'
            } else if (xOrO.textContent == '') {
                lastChoice = 'X'
                xOrO.textContent = 'X'
                board[i] = 'X';
            }
            if (players.length > 0) {
                if (lastChoice == 'X') {
                    currentPlayer.textContent = `${players[1].name} turn [O]`;
                } else {
                    currentPlayer.textContent = `${players[0].name} turn [X]`;
                }
            }
            checkForResult(xOrO);
            }
        });
        
    }
    const getBoard= () => board;
    return {
        getBoard,
    }
}

const winCombo = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3 ,6],
    [2, 5, 8],
    [1, 4, 7],
    [6, 7, 8],
    [3, 4, 5],
    [2, 4, 6]
]


const b = gameboard();

function indexes() {
    const indexesOfXs = function() {
        indexes = b.getBoard().reduce((r, n, i) => {
            n === 'X' && r.push(i);
            return r;
        }, [])
        return indexes;
    }

    const indexesOfOs = function() {
        indexes = b.getBoard().reduce((r, n, i) => {
            n === 'O' && r.push(i);
            return r;
        }, [])
        return indexes;
    }

    return {
        indexesOfXs, indexesOfOs
    }
}
function checkForResult(w) {
    const arr = indexes();
    if (b.getBoard().length > 4) {
        for (let i = 0; i < 9; i++) {
            if ( winCombo[i] != undefined) {
            const indexesMathcesWinComboForX = winCombo[i].every(e => arr.indexesOfXs().includes(e));
            const indexesMathcesWinComboForO = winCombo[i].every(e => arr.indexesOfOs().includes(e));
            let win = String;
            if (indexesMathcesWinComboForX) {
                gameFinished = true;
                win = 'X';
                winner = players[0].name;
                coloredCell(win)
                setTimeout(finishedDialog, 1000 * 1.5);
                winMsg = `${players[0].name} win the game`;
                currentPlayer.textContent = winMsg;
            } else if (indexesMathcesWinComboForO) {
                winMsg = `${players[1].name} win the game`;
                gameFinished = true;
                winner = players[1].name;
                win = 'O';
                coloredCell(win)
                currentPlayer.textContent = winMsg;
            } else if (Object.keys(b.getBoard()).length > 8) {
                gameFinished = true;
                currentPlayer.textContent = 'Its a draw'; 
            }
            }
        } 
    }
}

const coloredCell = function(win) {
    const cellArray = document.querySelectorAll('div.xOrO');
    cellArray.forEach((cell) => {
        if (cell.textContent == win) {
            cell.style.color = '#ffe3cb';
            cell.style.textDecoration = 'line-through'
        } else {
            cell.style.opacity = '20%';
        }
    });
}

function checkForEmpty() {
    if ([1,2,,3].some((element) => element == undefined)) {
        console.log('anun')
    }
}
const p = Object.getPrototypeOf(b.getBoard)
const checkUndefined = function() {
    for (let i; i < b.getBoard().length; i++) {
            b.getBoard()[i];
    }
}

function finishedDialog() {
    const finishMessageContainer = document.querySelector('dialog.win-message');
    const finishMessage = document.querySelector('div.winner-text');
    if (gameFinished === true) {
        finishMessageContainer.showModal()
        finishMessage.textContent = `${winner} has won this match. Would you like to play again?`
    }
}