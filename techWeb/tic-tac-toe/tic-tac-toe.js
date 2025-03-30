function setupGame(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // pulizia per restart

  const status = document.createElement("p");
  status.id = "status";
  const table = document.createElement("table");
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "🔄 Restart";
  restartBtn.className = "restart-btn";

  container.appendChild(status);
  container.appendChild(table);
  container.appendChild(restartBtn);

  const PLAYER_X = "x";
  const PLAYER_O = "o";

  const IMAGES = {
    x: "x.png",
    o: "o.png"
  };

  let currentPlayer = PLAYER_X;
  let gameOver = false;
  const board = Array.from({ length: 3 }, () => Array(3).fill(null));

  status.textContent = `✨ Current move: ${currentPlayer.toUpperCase()}`;

  function createSymbolImage(player) {
    const img = document.createElement("img");
    img.src = IMAGES[player];
    img.alt = player;
    img.className = "symbol-img";
    return img;
  }

  function checkWin() {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2])
        return board[i][0];
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i])
        return board[0][i];
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2])
      return board[0][0];
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0])
      return board[0][2];
    return null;
  }

  function checkDraw() {
    return board.flat().every(cell => cell !== null);
  }

  function handleClick(row, col, cell) {
    if (gameOver || board[row][col]) return;

    board[row][col] = currentPlayer;
    const img = createSymbolImage(currentPlayer);
    cell.appendChild(img);

    const winner = checkWin();
    if (winner) {
      status.innerHTML = `🎉 Player <strong>${winner.toUpperCase()}</strong> wins!`;
      gameOver = true;
    } else if (checkDraw()) {
      status.textContent = `🤝 It's a draw!`;
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      status.textContent = `✨ Current move: ${currentPlayer.toUpperCase()}`;
    }
  }

  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("td");
      cell.addEventListener("click", () => handleClick(i, j, cell));
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  // Restart
  restartBtn.addEventListener("click", () => setupGame(containerId));
}