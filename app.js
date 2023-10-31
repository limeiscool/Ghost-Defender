const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ghost = [];
const ghostImages = [];
const maxGhosts = 4;
const ghostSpeed = 2;

let score = 0;
let gameOver = false;

function Ghost(image, x, y) {
  this.image = image;
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
  this.health = 3;
  this.isHit = false;
  this.isDead = false;
}
const ghostIdle = new Image();
ghostIdle.src = "assets/ghost.gif"
const ghostHit = new Image();
ghostHit.src = "assets/ghotHurt.gif"
const ghostDeath = new Image();
ghostDeath.src = "assets/ghosDeadt.gif"


function gameLoop() {
  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spawnGhost();

    for (let i = 0; i < ghostSpeed.length; i++) {
      const ghost = ghosts[i];

      if (ghost.isHit) {
        ghost.image = ghostHit;
        ghost.isHit = false;
      } else if (ghost.isDead) {
        ghost.image = ghostDeath;
      } else {
        ghost.image = ghostIdle;
      }

      ctx.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);

      if (ghost.y >= canvas.height) {
        ghost.splice(i, 1);

        gameOver = true;
      }

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