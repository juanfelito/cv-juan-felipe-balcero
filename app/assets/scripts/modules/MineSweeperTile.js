import $ from 'jquery';

class MineSweeperTile {
    constructor(x, y, value) {
        this.status = 0;
        this.hiddenValue = value;
        this.x = x;
        this.y = y;
        this.tile = $("#"+x+"-"+y);
        this.events();
        this.flagIcon = '<i class="fas fa-flag"></i>';
        this.bombIcon = '<i class="fas fa-bomb"></i>';
        this.questionIcon = '<i class="fas fa-question"></i>';
    }

    events() {
        this.tile.click(this.handleClick.bind(this));
        this.tile.contextmenu(this.handleRightClick.bind(this));
    }

    handleClick() {
        if(this.status === 0) {
            if(this.hiddenValue === 0) {
                this.handleZeroClick.bind(this);
            } else if(this.hiddenValue !== 9) {
                this.tile.html(this.hiddenValue);
            } else {
                this.tile.html(this.bombIcon);
            }
            this.status = 1;
        }
    }

    handleRightClick() {
        switch (this.status) {
            case 0:
                this.tile.html(this.flagIcon);
                this.status = 2;
                break;
            case 2:
                this.tile.html(this.questionIcon);
                this.status = 3;
                break;
            case 3:
                this.tile.html('');
                this.status = 0;
                break;
            default:
                break;
        }
    }

    handleZeroClick() {
        
    }
}

export default MineSweeperTile;