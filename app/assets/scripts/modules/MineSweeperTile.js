import $ from 'jquery';

class MineSweeperTile {
    constructor(value) {
        this.hiddenValue = value;
        this.status = 0;
        this.template = '<div class="minesweeper-board__tile">' + this.hiddenValue + '</div>';
    } 
}

export default MineSweeperTile;