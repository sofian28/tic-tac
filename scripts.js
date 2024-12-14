const board = document.getElementById("board");
const resetButton = document.getElementById("reset");
const statusText = document.getElementById("status");

let cells = [];
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

// Inicializar Tabuleiro
function createBoard() {
  board.innerHTML = ""; // Limpa o tabuleiro
  cells = [];
  boardState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Player turn: X";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
    cells.push(cell);

    cell.addEventListener("click", handleClick);
  }
}

// Lógica do Clique
function handleClick(e) {
  const index = e.target.dataset.index;

  if (boardState[index] === "") {
    boardState[index] = currentPlayer;
    e.target.classList.add("taken");
    e.target.textContent = currentPlayer;

    // Adicionar classes visuais
    e.target.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} won!`;
      endGame();
    } else if (boardState.every(cell => cell !== "")) {
      statusText.textContent = "Draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player turn: ${currentPlayer}`;
    }
  }
}

// Verificar vitória
function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombos.some(combo => {
    return (
      boardState[combo[0]] !== "" &&
      boardState[combo[0]] === boardState[combo[1]] &&
      boardState[combo[1]] === boardState[combo[2]]
    );
  });
}

// Finalizar o jogo
function endGame() {
  cells.forEach(cell => cell.classList.add("taken"));
}

// Reiniciar o jogo
resetButton.addEventListener("click", () => {
  currentPlayer = "X";
  createBoard();
});

// Inicializar o tabuleiro na primeira carga
createBoard();
