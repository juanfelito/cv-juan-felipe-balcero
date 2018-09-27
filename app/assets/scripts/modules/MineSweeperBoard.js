import $ from 'jquery';
import Array2D from './Array2D';
import MineSweeperTile from './MineSweeperTile';

class MineSweeperBoard {
    constructor() {
        this.startButton = $('#start-game');
        this.numberOfMines = 20;
        this.gridSize = [8, 10];
        this.minesweeperBoard = $('#minesweeper-board');
        this.events();        
    }

    events() {
        this.startButton.click(this.startGame.bind(this));
    }

    setBoardwidth() {
        let height = 54 * this.gridSize[0];
        let width = 54 * this.gridSize[1];
        this.minesweeperBoard.css("width", width+'px');
        this.minesweeperBoard.css("height", height+'px');
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
        this.setBoardwidth();
        this.printBoard();
    }

    countSurroundingMines() {
        for (var i = 0; i < this.minesPosition.xSize; i++) {
            for (var j = 0; j < this.minesPosition.ySize; j++) {
                if(this.minesPosition.getAt(i, j) !== 9) {
                    let mines = 0;
                    
                    // Corners
                    if((i === 0 && j === 0) || (i === 0 && j === this.minesPosition.ySize - 1) || (i === this.minesPosition.xSize - 1 && j === 0) || (i === this.minesPosition.xSize - 1 && j === this.minesPosition.ySize - 1)) {
                        mines = this.countCornerMines(i, j);                     
                    } else if(i === 0 || j === 0 || i === this.minesPosition.xSize - 1 || j === this.minesPosition.ySize - 1) {
                        mines = this.countSideMines(i, j);
                    } else {
                        mines = this.countCenterMines(i, j);
                    }
                    
                    this.minesPosition.setAt(i, j, mines);
                }
            }
        }
    }
    countCornerMines(x, y) {
        let mines = 0;
        if(x === 0) {
            if(this.minesPosition.getAt(x + 1, y) === 9) {
                mines += 1;
            }
            if(y === 0) {                
                if(this.minesPosition.getAt(x + 1, y + 1) === 9) {
                    mines += 1;
                } 
            } else {                
                if(this.minesPosition.getAt(x + 1, y - 1) === 9) {
                    mines += 1;
                } 
            }
        } else {
            if(this.minesPosition.getAt(x - 1, y) === 9) {
                mines += 1;
            }
            if(y === 0) {
                if(this.minesPosition.getAt(x - 1, y + 1) === 9) {
                    mines += 1;
                }
            } else {
                if(this.minesPosition.getAt(x - 1, y - 1) === 9) {
                    mines += 1;
                } 
            }
        }

        if(y === 0) {
            if(this.minesPosition.getAt(x, y + 1) === 9) {
                mines += 1;
            }
        } else {
            if(this.minesPosition.getAt(x, y - 1) === 9) {
                mines += 1;
            }
        }
        return mines;
    }

    countSideMines(x, y) {
        let mines = 0;
        if(x === 0) {
            for(var i = y - 1; i <= y + 1; i++) {
                if(this.minesPosition.getAt(x + 1, i) === 9) {
                    mines += 1;
                }
            }
            if(this.minesPosition.getAt(x, y - 1) === 9) {
                mines += 1;
            }
            if(this.minesPosition.getAt(x, y + 1) === 9) {
                mines += 1;
            }
        } else if(y === 0) {
            for(var i = x - 1; i <= x + 1; i++) {
                if(this.minesPosition.getAt(i, y + 1) === 9) {
                    mines += 1;
                }
            }
            if(this.minesPosition.getAt(x - 1, y) === 9) {
                mines += 1;
            }
            if(this.minesPosition.getAt(x + 1, y) === 9) {
                mines += 1;
            }
        } else if(x === this.minesPosition.xSize - 1) {
            for(var i = y - 1; i <= y + 1; i++) {
                if(this.minesPosition.getAt(x - 1, i) === 9) {
                    mines += 1;
                }
            }
            if(this.minesPosition.getAt(x, y - 1) === 9) {
                mines += 1;
            }
            if(this.minesPosition.getAt(x, y + 1) === 9) {
                mines += 1;
            }
        } else {
            for(var i = x - 1; i <= x + 1; i++) {
                if(this.minesPosition.getAt(i, y - 1) === 9) {
                    mines += 1;
                }
            }
            if(this.minesPosition.getAt(x - 1, y) === 9) {
                mines += 1;
            }
            if(this.minesPosition.getAt(x + 1, y) === 9) {
                mines += 1;
            }
        }
        return mines;
    }

    countCenterMines(x, y) {
        let mines = 0;
        for(var i = y - 1; i <= y + 1; i++) {
            if(this.minesPosition.getAt(x - 1, i) === 9) {
                mines += 1;
            }
            if(this.minesPosition.getAt(x + 1, i) === 9) {
                mines += 1;
            }
        }
        if(this.minesPosition.getAt(x, y - 1) === 9) {
            mines += 1;
        }
        if(this.minesPosition.getAt(x, y + 1) === 9) {
            mines += 1;
        }
        return mines;
    }

    printBoard() {
        this.minesweeperBoard.html('');
        for (var i = 0; i < this.minesPosition.xSize; i++) {
            for (var j = 0; j < this.minesPosition.ySize; j++) {
                let tileTemplate = '<div class="minesweeper-board__tile" id="' + i + '-' + j +'" oncontextmenu="return false;"></div>';
                this.minesweeperBoard.append(tileTemplate);
                let tile = new MineSweeperTile(i, j, this.minesPosition.getAt(i, j));
            }
        }
    }
}

export default MineSweeperBoard;