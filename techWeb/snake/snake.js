const CELL_SIZE = 20; // numero di celle per riga/colonna
const DELAY = 100; // ms
let direction = "right";
let gameInterval;
let gameStarted = false;

function createGrid(container, size) {
  const table = document.createElement("table");
  const cells = [];
  for (let y = 0; y < size; y++) {
    const row = document.createElement("tr");
    const rowCells = [];
    for (let x = 0; x < size; x++) {
      const cell = document.createElement("td");
      row.appendChild(cell);
      rowCells.push(cell);
    }
    table.appendChild(row);
    cells.push(rowCells);
  }
  container.appendChild(table);
  return cells;
}

function randomPosition(size) {
  return {
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size)
  };
}

function setupGame(containerId) {
  const container = document.getElementById(containerId);
  document.getElementById("game-over").textContent = "";
  container.innerHTML = ""; // reset
  const grid = createGrid(container, CELL_SIZE);

  let snake = [
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 }
  ];

  let food = generateFood();
  let score = 0;
  let gameOver = false;

  function generateFood() {
    let newFood;
    do {
      newFood = randomPosition(CELL_SIZE); // ✅ usa la funzione giusta
    } while (snake.some(part => part.x === newFood.x && part.y === newFood.y));
    return newFood;
  }  

  function draw() {
    for (let row of grid) {
      for (let cell of row) {
        cell.innerHTML = "";
      }
    }
  
    // Cibo
    const foodImg = document.createElement("img");
    foodImg.src = "fish.png";
    foodImg.style.width = "100%";
    foodImg.style.height = "100%";
    foodImg.style.objectFit = "contain";
    foodImg.style.display = "block";
    grid[food.y][food.x].appendChild(foodImg);
  
    // Serpente
    for (let i = 0; i < snake.length; i++) {
      const part = snake[i];
      const img = document.createElement("img");
      img.src = i === 0 ? "cat-head.png" : "cat-body.png";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.display = "block";
      grid[part.y][part.x].appendChild(img);
    }
  }  

  function move() {
    const head = { ...snake[0] };
    switch (direction) {
      case "up": head.y -= 1; break;
      case "down": head.y += 1; break;
      case "left": head.x -= 1; break;
      case "right": head.x += 1; break;
    }

    // Check collisioni con pareti
    if (
      head.x < 0 || head.x >= CELL_SIZE ||
      head.y < 0 || head.y >= CELL_SIZE
    ) {
      endGame("You hit the wall!");
      return;
    }

    // Check collisioni con se stesso
    if (snake.some(part => part.x === head.x && part.y === head.y)) {
      endGame("You ran into yourself!");
      return;
    }

    // Movimento: aggiungo testa
    snake.unshift(head);

    // Check cibo
    if (head.x === food.x && head.y === food.y) {
      score++;
      food = generateFood();
    } else {
      snake.pop();
    }    

    draw();
  }

  function endGame(message) {
    if (gameOver) return;
    gameOver = true;
    clearInterval(gameInterval);
    const msg = document.getElementById("game-over");
    msg.textContent = `💀 Game Over: ${message} | Score: ${score}`;
  }  

  document.addEventListener("keydown", (e) => {
    const keyMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right"
    };
    const newDirection = keyMap[e.key];
    if (newDirection) {
      // Previeni inversioni
      if (
        (direction === "up" && newDirection === "down") ||
        (direction === "down" && newDirection === "up") ||
        (direction === "left" && newDirection === "right") ||
        (direction === "right" && newDirection === "left")
      ) {
        return;
      }
      direction = newDirection;
    }
  });

  draw();
  gameInterval = setInterval(move, DELAY);
}

document.getElementById("start-btn").addEventListener("click", () => {
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  direction = "right";
  gameStarted = true;
  setupGame("snake-container");
});