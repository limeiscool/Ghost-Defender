const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ghostIdle = new Image();
ghostIdle.src = "./assets/ghost.gif";
const ghostHit = new Image();
ghostHit.src = "./assets/ghotHurt.gif";
const ghostDeath = new Image();
ghostDeath.src = "./assets/ghosDeadt.gif";

const ghost = new Ghost(ghostIdle);
const ghostSpeed = 0.1;

let score = 0;
let gameOver = false;

const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset");

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

function Ghost(image) {
  this.image = image;
  this.x = 0;
  this.y = 0;
  this.width = 50;
  this.height = 50;
  this.health = 3;
  this.isHit = false;
  this.isDead = false;
}

function startGame() {
  gameOver = false;
  score = 0;
  // Initialize the ghost position, health, and other properties
  ghost.x = Math.random() * (canvas.width - ghost.width);
  ghost.y = -ghost.height;
  ghost.health = 3;
  ghost.isHit = false;
  ghost.isDead = false;
  gameLoop();
}

function resetGame() {
  gameOver = false;
  score = 0;
  // Reset the ghost and other game state as needed
  ghost.x = Math.random() * (canvas.width - ghost.width);
  ghost.y = -ghost.height;
  ghost.health = 3;
  ghost.isHit = false;
  ghost.isDead = false;
}

function spawnGhost() {
  if (!ghost.isDead && ghost.y >= canvas.height) {
    // Respawn the ghost if it's not dead and has reached the bottom
    ghost.x = Math.random() * (canvas.width - ghost.width); // Randomize the X position
    ghost.y = -ghost.height; // Start from the top of the canvas
    ghost.health = 3; // Reset the health
  }
}


function gameLoop() {
  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spawnGhost();

    if (ghost.isHit) {
      ghost.image = ghostHit;
      ghost.isHit = false;
    } else if (ghost.isDead) {
      ghost.image = ghostDeath;
    } else {
      ghost.image = ghostIdle;
    }

    ctx.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);

    ghost.y += ghostSpeed;

    if (ghost.y >= canvas.height) {
      gameOver = true;
    }

    

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 20, 30);

    requestAnimationFrame(gameLoop)

  } else {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "36px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 18);
    ctx.font = "24px Arial";
    ctx.fillText("Final Score: " + score, canvas.width / 2 - 80, canvas.height / 2 + 18);
  }
}

function checkClickOnGhost(clickX, clickY) {
  if (
    clickX >= ghost.x &&
    clickX <= ghost.x + ghost.width &&
    clickY >= ghost.y &&
    clickY <= ghost.y + ghost.height
  ) {
    if (ghost.health > 0) {
      ghost.health--; // Decrease the ghost's health
      ghost.isHit = true; // Trigger the hit animation
    }

    if (ghost.health === 0) {
      ghost.isDead = true; // Mark the ghost as dead if health reaches 0
      score += 10; // Increase the score
    }
  }
}

canvas.addEventListener("click", function (e) {
  if (gameOver) return;

  const clickX = e.clientX - canvas.getBoundingClientRect().left;
  const clickY = e.clientY - canvas.getBoundingClientRect().top;

  checkClickOnGhost(clickX, clickY);
});
