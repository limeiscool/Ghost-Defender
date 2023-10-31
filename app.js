class GhostGame {
  constructor() {
    this.canvas = document.querySelector('#gameCanvas')
    this.canvasWidth = this.canvas.getAttribute('width')
    this.canvasHeight = this.canvas.getAttribute('height')
    console.log(this.canvasWidth)

    this.idleSheet = "./assets/ghost-Sheet.png"
    this.hitSheet = "./assets/ghostHurt-Sheet.png"
    this.deadSheet = "./assets/ghostDead-Sheet.png"

    this.startButton = document.querySelector('#start-btn')
    this.resetButton = document.querySelector('#reset')

    this.startButton.addEventListener('click', this.startGame)
    this.resetButton.addEventListener('click', this.resetGame)
  }

  startGame() {
    console.log('Game was Started')
  }

  resetGame() {
    console.log('Game was reset!')
  }

}

const myGame = new GhostGame;
