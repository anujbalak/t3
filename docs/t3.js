let winner = String;
const gameContainer = document.querySelector('#board-container');
const changeTurn = document.querySelector('div>.turn');
let currentPlayer = document.querySelector('.turn');


function Player(name) {
    this.name = name;
}

const players = [];
// get player names
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
})

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getPlayerNames.close(player1Name.value, player2Name.value);
})

const changeCurrentPlayer = function(lastChoice) {
    if (lastChoice === 'X') {
        currentPlayer.textContent = players[1].name;
    } else if (lastChoice === 'O') {
        currentPlayer.textContent = players[0].name;
    } else {
        currentPlayer.textContent = players[0].name;
    }
}



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
            if (lastChoice === 'X' && xOrO.textContent == '') {
                xOrO.textContent = 'O';
                board[i] = 'O';
                lastChoice = 'O'
                console.log(lastChoice);
            } else if (lastChoice === 'O' && xOrO.textContent == '') {
                xOrO.textContent = 'X';
                board[i] = 'X';
                lastChoice = 'X'
                console.log(lastChoice);
            } else if (xOrO.textContent == '') {
                lastChoice = 'X'
                xOrO.textContent = 'X'
                board[i] = 'X';
                console.log(lastChoice);
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

// function setChoices() {
//     b.getBoard()[0] = 'X';
//     b.getBoard()[1] = 'O';
//     b.getBoard()[2] = 'O';
//     b.getBoard()[3] = 'X';
//     b.getBoard()[4] = 'X';
//     b.getBoard()[5] = 'O';
//     b.getBoard()[6] = 'X';
//     b.getBoard()[7] = 'X';
// }
// setChoices();
console.log(b.getBoard())

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
const arr = indexes();
console.log(arr.indexesOfXs());
console.log(arr.indexesOfOs());
function checkForResult() {
    if (b.getBoard().length > 4) {
        for (let i = 0; i < 9; i++) {
            if ( winCombo[i] != undefined) {
            const indexesMathcesWinComboForX = winCombo[i].every(e => arr.indexesOfXs().includes(e));
            const indexesMathcesWinComboForO = winCombo[i].every(e => arr.indexesOfOs().includes(e));
            if (indexesMathcesWinComboForX) {
                winner = 'X is the winner';
                return winner;
            } else if (indexesMathcesWinComboForO) {
                winner = 'O is the winner';
                return winner;
            } //else if ((b.getBoard().every((x) => x != '')) ) {
              //  return 'Its a draw'; 
            //}
            }
        } 
    }
}

