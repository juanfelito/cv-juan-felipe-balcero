import $ from 'jquery';

class MineSweeperTile {
    constructor(x, y, value) {
        this.status = 0;
        this.hiddenValue = value;
        this.tile = $("#"+x+"-"+y);
        this.events();
    }

    events() {
        this.tile.click(this.handleClick.bind(this));
    }

    handleClick() {
        if(this.status != 1) {
            this.tile.html(this.hiddenValue);
            this.status = 1;
        }
    }
}

export default MineSweeperTile;