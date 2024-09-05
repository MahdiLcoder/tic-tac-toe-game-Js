const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let currentPlayer = 'X';
startGame();

function startGame() {
    clickCell();
}

restartBtn.addEventListener("click", initializeGame);

function clickCell() {
    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (cell.innerHTML === "" && !checkWin()) {
                cell.innerHTML = currentPlayer;
                cell.classList.add(currentPlayer.toLowerCase());
                cell.classList.remove(currentPlayer === 'X' ? 'o' : 'x');
                changePlayer();
                checkWin();
            }
        });
    });
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerHTML = `${currentPlayer}'s turn`;
}

function initializeGame() {
    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("x");
        cell.classList.remove("o");
    });
    currentPlayer = 'X';
    statusText.innerHTML = `${currentPlayer}'s turn`;
}

function checkWin() {
    let hasWinner = false;

    winConditions.forEach((condition) => {
        const [a, b, c] = condition;
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];

        if (cellA.innerHTML && cellA.innerHTML === cellB.innerHTML && cellA.innerHTML === cellC.innerHTML) {
            statusText.innerHTML = `Game Over! The winner is ${cellA.innerHTML}`;
            hasWinner = true;
            cells.forEach(cell => cell.removeEventListener("click", clickCell));
        }
    });

    if (!hasWinner && [...cells].every(cell => cell.innerHTML !== "")) {
			 statusText.innerHTML = "the result of the game is a draw";
        hasWinner = true;
    }

    return hasWinner;
}
