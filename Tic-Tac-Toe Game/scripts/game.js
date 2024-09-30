function resetGameStatus(winnerId) {
  if (winnerId == 1) activePlayer = 0;
  else if (winnerId == 2) activePlayer = 1;
  else {
    activePlayer = activePlayer;
  }
  currentRound = 1;
  winnerNameElement.innerHTML =
    '<h2>You Won <span id="winner-name">PLAYER NAME</span></h2>';
  gameOverElement.style.display = "none";
  for (gameFieldElement of gameFieldElements) {
    gameFieldElement.innerText = "";
    gameFieldElement.classList.remove("disabled");
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
    }
  }
  gameIsOver = false;
  gameAreaElement.children[1].style.display = "block";
  activePlayerName.innerText = players[activePlayer].name.toUpperCase();
}

function startNewGame() {
  if (players[0].name && players[1].name) {
    gameAreaElement.style.display = "block";
    activePlayerName.innerText = players[0].name.toUpperCase();
    startNewGameBtnElement.style.display = "none";
  } else alert("Please set custom player names for both players !");
  resetGameStatus();
}

function switchPlayer() {
  if (activePlayer === 0) activePlayer = 1;
  else activePlayer = 0;
}

function selectGameField(event) {
  const selectedField = event.target;

  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0 || gameIsOver) {
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  let winnerId = checkGameOver();
  endGame(winnerId);
  currentRound++;
  switchPlayer();
  activePlayerName.innerText = players[activePlayer].name.toUpperCase();
}

function checkGameOver() {
  // check the rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    )
      return gameData[i][0];
  }

  // check the columns for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    )
      return gameData[0][i];
  }

  //   Diagonal : Top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  )
    return gameData[0][0];

  //   Diagonal : Top right to bottom left
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  )
    return gameData[0][2];

  if (currentRound === 9) return -1;

  return 0;
}

function endGame(winnerId) {
  if (winnerId > 0) {
    gameOverElement.style.display = "block";
    winnerNameElement.innerText = players[winnerId - 1].name.toUpperCase();
    gameIsOver = true;
    gameAreaElement.children[1].style.display = "none";
    if (winnerId === 1) firstPlayerWinsNumber++;
    else if (winnerId === 2) secondPlayerWinsNumber++;
  } else if (winnerId === -1) {
    gameOverElement.style.display = "block";
    gameOverElement.firstElementChild.innerText = "It's a DRAW";
    gameIsOver = true;
    gameAreaElement.children[1].style.display = "none";
  }
  gameOverElement.children[1].innerText =
    firstPlayerWinsNumber + " - " + secondPlayerWinsNumber;
}
