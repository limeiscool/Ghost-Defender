class GhostGame {
  constructor() {

    //canavas
    this.canvas = document.querySelector('#gameCanvas')
    const canvasStyle = getComputedStyle(this.canvas);
    this.canvasWidth = parseInt(canvasStyle.width, 10);
    this.canvasHeight = parseInt(canvasStyle.height, 10);
    console.log(this.canvasHeight)

    //use to animate sprites within sprite div
    this.idleSheet = "./assets/ghost-Sheet.png"
    this.hitSheet = "./assets/ghostHurt-Sheet.png"
    this.deadSheet = "./assets/ghostDead-Sheet.png"

    // Get the game over message div
    this.gameOverMessage = document.querySelector('#game-over');

    // get buttons
    this.startButton = document.querySelector('#start-btn')
    this.resetButton = document.querySelector('#reset')

    // button clicks
    this.startButton.addEventListener('click', this.startGame.bind(this))
    this.resetButton.addEventListener('click', this.resetGame.bind(this))
    
    // Get the sprite container div
    this.spriteContainer = document.querySelector('#spriteContainer');
  }

  divMove() {
    const spriteContainer = this.spriteContainer;
    const canvasHeight = this.canvasHeight; // Store canvasHeight in a variable
    const cubeWidth = 25;
    const canvasWidth = this.canvasWidth - cubeWidth;
    const gameOverMessage = this.gameOverMessage;

    let top = 0;
    const moveSpeed = 2;

    // Set a random left position for spriteContainer
    spriteContainer.style.left = Math.floor(Math.random() * (canvasWidth - 10)) + 'px';

    function moveDiv() {
      top += moveSpeed;
      spriteContainer.style.top = top + 'px';

      if (top < canvasHeight) { // Use the stored canvasHeight
        requestAnimationFrame(moveDiv);
      } else {
        gameOverMessage.style.display = 'block';
        console.log('Game Over');
      }
    }

    requestAnimationFrame(moveDiv.bind(this));
  }

  startGame() {
    console.log('Game was Started')
    this.divMove();
  }

  resetGame() {
    console.log('Game was reset!')
    this.gameOverMessage.style.display = 'none';
    // Remove the moving elements from the sprite container on reset
    this.spriteContainer.style.top = '0';
  }
}

const myGame = new GhostGame();
