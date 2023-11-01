const canvas = document.getElementById('spriteContainer');
const ctx = canvas.getContext('2d');

// Load sprite sheets for different animations
const spriteSheets = {
  idle: new Image(),
  hurt: new Image(),
  dead: new Image(),
};

spriteSheets.idle.src = 'Ghost/ghost-Sheet.png';
spriteSheets.hurt.src = 'Ghost/ghostHurt-Sheet.png';
spriteSheets.dead.src = 'Ghost/ghostDead-Sheet.png';

const frameWidth = 32; // Assuming each frame is 32px wide
const frameHeight = 32; // Assuming each frame is 32px high

// Define the number of frames for each animation
const totalFrames = {
  idle: 4,
  hurt: 4,
  dead: 9,
};

const frameDelay = 150; // Adjust the delay to control animation speed (in milliseconds)

const ghostDelay = 5500; // Delay for adding new ghosts in milliseconds
const ghosts = []; // Empty array to store ghosts

// Function to add a new ghost to the array
function addNewGhost() {
  ghosts.push({ x: Math.random() * (canvas.width - frameWidth), y: 0, currentFrame: 0, animation: 'idle' });
}

// Initialize by adding the first ghost
addNewGhost();

// Black box properties
const boxWidth = 25;
const boxHeight = 25;
let boxX = (canvas.width - boxWidth) / 2; // Initial X position
const boxY = canvas.height - boxHeight; // Y position at the bottom of the canvas

// Fired cube properties
const cubeSize = 10;
const firedCubes = []; // Array to store fired cubes
let canFire = true;

// Store the timestamp of the previous frame
let lastTimestamp;

// Function to draw a single frame for a sprite
function drawSingleGhost(ghost) {
  const spriteSheet = spriteSheets[ghost.animation];
  ctx.drawImage(
    spriteSheet,
    ghost.currentFrame * frameWidth,
    0,
    frameWidth,
    frameHeight,
    ghost.x,
    ghost.y,
    frameWidth,
    frameHeight
  );

  // Increment the frame or loop back to the first frame
  ghost.currentFrame = (ghost.currentFrame + 1) % totalFrames[ghost.animation];
}

function updateGhosts() {
  for (const ghost of ghosts) {
    ghost.y += 5; // Move the ghost down

    if (ghost.y > canvas.height) {
      // Ghost reached the bottom, remove it from the array
      const index = ghosts.indexOf(ghost);
      if (index > -1) {
        ghosts.splice(index, 1);
      }
    }
  }
}

// Function to draw the black box
function drawBox() {
  ctx.fillStyle = 'black';
  ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
}

// Function to draw the fired cubes
function drawCubes() {
  ctx.fillStyle = 'white';
  for (const cube of firedCubes) {
    ctx.fillRect(cube.x, cube.y, cubeSize, cubeSize);
  }
}

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Handle user input for moving the box and firing the cube
document.addEventListener('keydown', (event) => {
  if (event.key === 'D' || event.key === 'd' || event.key === 'ArrowRight') {
    // Move the box to the right within canvas bounds
    boxX = Math.min(boxX + 5, canvas.width - boxWidth);
  } else if (event.key === 'A' || event.key === 'a' || event.key === 'ArrowLeft') {
    // Move the box to the left within canvas bounds
    boxX = Math.max(boxX - 5, 0);
  } else if (event.key === ' ' && canFire) {
    // Fire a cube (spacebar) if not already firing
    const cubeX = boxX + boxWidth / 2 - cubeSize / 2;
    const cubeY = boxY;
    firedCubes.push({ x: cubeX, y: cubeY });

    canFire = false;
    setTimeout(() => {
      canFire = true;
    }, 1500);
  }
});

// Global animation loop using requestAnimationFrame
function animate(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  const elapsed = timestamp - lastTimestamp;

  if (elapsed >= frameDelay) {
    clearCanvas();

    // Update and draw sprites
    for (const ghost of ghosts) {
      drawSingleGhost(ghost);
    }

    // Draw the black box
    drawBox();

    // Draw and move the fired cubes
    drawCubes();
    for (let i = 0; i < firedCubes.length; i++) {
      firedCubes[i].y -= 5; // Move the cube upwards
      if (firedCubes[i].y < 0) {
        // Cube reached the top, remove it from the array
        firedCubes.splice(i, 1);
        i--; // Decrement index to account for the removed element
      }
    }

    updateGhosts();

    lastTimestamp = timestamp;
  }

  requestAnimationFrame(animate);
}

// Start the global animation loop
animate();

setInterval(() => {
  addNewGhost();
}, ghostDelay);
