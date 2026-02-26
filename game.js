let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let scoreElement = document.getElementById("score");
let startButton = document.getElementById("startButton");

let player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 60,
  width: 50,
  height: 50,
  speed: 5,
  color: 'red',
  dx: 0,
};

let obstacles = [];
let score = 0;
let gameInterval;
let gameRunning = false;

canvas.width = 600;
canvas.height = 300;

startButton.addEventListener("click", startGame);
document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopPlayer);

function startGame() {
  if (gameRunning) return;
  
  gameRunning = true;
  score = 0;
  scoreElement.textContent = score;
  player.x = canvas.width / 2 - 25;
  player.y = canvas.height - 60;
  player.dx = 0;
  obstacles = [];

  startButton.style.display = 'none'; // Hide start button after game starts
  gameInterval = setInterval(gameLoop, 1000 / 60); // 60 FPS
}

function movePlayer(e) {
  if (e.key === "ArrowLeft") {
    player.dx = -player.speed;
  } else if (e.key === "ArrowRight") {
    player.dx = player.speed;
  }
}

function stopPlayer(e) {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    player.dx = 0;
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function generateObstacles() {
  if (Math.random() < 0.02) {
    let width = Math.random() * (canvas.width / 4) + 20;
    let x = Math.random() * (canvas.width - width);
    obstacles.push({ x: x, y: -20, width: width, height: 20 });
  }
}

function drawObstacles() {
  ctx.fillStyle = "black";
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function moveObstacles() {
  obstacles.forEach(obstacle => {
    obstacle.y += 2; // Speed of obstacles
  });
  
  obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

function detectCollisions() {
  obstacles.forEach(obstacle => {
    if (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    ) {
      endGame();
    }
  });
}

function updateScore() {
  score++;
  scoreElement.textContent = score;
}

function endGame() {
  clearInterval(gameInterval);
  gameRunning = false;
  startButton.style.display = 'block'; // Show start button again
  alert("Fim de jogo! Seu Score: " + score);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawPlayer();
  generateObstacles();
  drawObstacles();
  moveObstacles();
  detectCollisions();
  updateScore();
  
  player.x += player.dx;
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}
