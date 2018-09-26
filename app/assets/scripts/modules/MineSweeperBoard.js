import $ from 'jquery';
import Array2D from './Array2D';

class MineSweeperBoard {
    constructor() {
        this.startButton = $('#start-game');
        this.numberOfMines = 4;
        this.gridSize = [5, 5];

        this.events();
    }

    events() {
        this.startButton.click(this.startGame.bind(this));
    }

    startGame() {
        this.minesPosition = new Array2D(this.gridSize[0], this.gridSize[1]);

        for (var i = 0; i < this.numberOfMines; i++) {
            let x = Math.floor((Math.random() * this.gridSize[0]));
            let y = Math.floor((Math.random() * this.gridSize[1]));
            this.minesPosition.setAt(x, y, 9);
        }
        this.countSurroundingMines();
        this.minesPosition.printArray();
    }

    countSurroundingMines() {
        for (var i = 0; i < this.minesPosition.xSize; i++) {
            for (var j = 0; j < this.minesPosition.ySize; j++) {
                if(this.minesPosition.getAt(i, j) !== 9) {
                    let mines = 0;
                    // Top-left corner
                    if(i === 0 && j === 0) {
                        if(this.minesPosition.getAt(i, j + 1) === 9) {
                            mines += 1;
                        }
                        if(this.minesPosition.getAt(i + 1, j) === 9) {
                            mines += 1;
                        }
                        if(this.minesPosition.getAt(i + 1, j + 1) === 9) {
                            mines += 1;
                        }                        
                    }
                    // Top-right corner
                    if(i === 0 && j === this.minesPosition.ySize - 1) {
                        if(this.minesPosition.getAt(i, j - 1) === 9) {
                            mines += 1;
                        }
                        if(this.minesPosition.getAt(i + 1, j) === 9) {
                            mines += 1;
                        }
                        if(this.minesPosition.getAt(i + 1, j - 1) === 9) {
                            mines += 1;
                        }                        
                    }
                    // Bottom-left corner
                    if(i === this.minesPosition.xSize - 1 && j === 0) {
                        if(this.minesPosition.getAt(i, j + 1) === 9) {
                            mines += 1;
                        }
                        if(this.minesPosition.getAt(i - 1, j) === 9) {
                            mines += 1;
                        }
                        if(this.minesPosition.getAt(i - 1, j + 1) === 9) {
                            mines += 1;
                        }                        
                    }
                    // Bottom-right corner
                    if(i === this.minesPosition.xSize - 1 && j === this.minesPosition.ySize - 1) {
                        if(this.minesPosition.getAt(i, j - 1) === 9) {
                            mines += 1;
                        }
                        if(this.minesPosition.getAt(i - 1, j) === 9) {
                            mines += 1;
                        }
                        if(this.minesPosition.getAt(i - 1, j - 1) === 9) {
                            mines += 1;
                        }                        
                    }
                    this.minesPosition.setAt(i, j, mines);
                }
            }
        }
    }
}

export default MineSweeperBoard;