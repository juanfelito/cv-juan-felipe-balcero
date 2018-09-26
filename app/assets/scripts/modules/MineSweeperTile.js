import $ from 'jquery';

class MineSweeperTile {
    constructor(value) {
        this.hiddenValue = value;
        this.status = 0;
        this.template = '<div class="minesweeper-tile">' + this.hiddenValue + '</div>';
    } 
}

export default MineSweeperTile;