import $ from 'jquery';

class MineSweeperTile {
    constructor(x, y, value, xSize, ySize) {
        this.status = 0;
        this.hiddenValue = value;
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
        this.tile = $("#"+x+"-"+y);
        this.events();
        this.flagIcon = '<i class="fas fa-flag"></i>';
        this.bombIcon = '<i class="fas fa-bomb"></i>';
        this.questionIcon = '<i class="fas fa-question"></i>';
    }

    events() {
        this.tile.click(this.handleClick.bind(this));
        this.tile.contextmenu(this.handleRightClick.bind(this));
        this.tile.dblclick(this.handleDblClick.bind(this));
    }

    handleClick() {
        if(this.status === 0) {
            if(this.hiddenValue === 0) {
                this.handleZeroClick();
            } else if(this.hiddenValue !== 9) {
                this.tile.html(this.hiddenValue);
            } else {
                this.tile.html(this.bombIcon);
            }
            this.status = 1;
            this.tile.removeClass('minesweeper-board__tile--closed');
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

    handleDblClick() {
        console.log(this.hiddenValue);
    }

    handleZeroClick() {
        this.tile.html(this.hiddenValue);
        this.status = 1;
        if((this.x === 0 && this.y === 0) || (this.x === 0 && this.y === this.ySize - 1) || (this.x === this.xSize - 1 && this.y === 0) || (this.x === this.xSize - 1 && this.y === this.ySize - 1)) {
            this.zeroCorner(this.x, this.y);                     
        } else if(this.x === 0 || this.y === 0 || this.x === this.xSize - 1 || this.y === this.ySize - 1) {
            this.zeroSides(this.x, this.y, this.xSize);
        } else {
            this.zeroCenter(this.x, this.y);
        }
    }

    zeroCorner(x, y) {
        let arr_toClick = new Array();

        if(x === 0) {
            arr_toClick.push($('#'+(x+1)+"-"+y));
            
            if(y === 0) {
                arr_toClick.push($('#'+(x+1)+"-"+(y+1)));
            } else {
                arr_toClick.push($('#'+(x+1)+"-"+(y-1)));                
            }
        } else {
            arr_toClick.push($('#'+(x-1)+"-"+y));
            if(y === 0) {
                arr_toClick.push($('#'+(x-1)+"-"+(y+1)));
            } else {
                arr_toClick.push($('#'+(x-1)+"-"+(y-1)));
            }
        }

        if(y === 0) {
            arr_toClick.push($('#'+x+"-"+(y+1)));
        } else {
            arr_toClick.push($('#'+x+"-"+(y-1)));
        }

        arr_toClick.forEach(function(celda) {
            celda.click();
        });
    }

    zeroSides(x, y, xSize) {
        let arr_toClick = new Array();

        if(x === 0) {
            for(var i = y - 1; i <= y + 1; i++) {
                arr_toClick.push($('#'+(x+1)+"-"+i));
            }
            arr_toClick.push($('#'+x+"-"+(y-1)));
            arr_toClick.push($('#'+x+"-"+(y+1)));
        } else if(y === 0) {
            for(var i = x - 1; i <= x + 1; i++) {
                arr_toClick.push($('#'+i+"-"+(y+1)));
            }
            arr_toClick.push($('#'+(x-1)+"-"+y));
            arr_toClick.push($('#'+(x+1)+"-"+y));
        } else if(x === xSize - 1) {
            for(var i = y - 1; i <= y + 1; i++) {
                arr_toClick.push($('#'+(x-1)+"-"+i));
            }
            arr_toClick.push($('#'+x+"-"+(y-1)));
            arr_toClick.push($('#'+x+"-"+(y+1)));
        } else {
            for(var i = x - 1; i <= x + 1; i++) {
                arr_toClick.push($('#'+i+"-"+(y-1)));
            }
            arr_toClick.push($('#'+(x-1)+"-"+y));
            arr_toClick.push($('#'+(x+1)+"-"+y));
        }

        arr_toClick.forEach(function(celda) {
            celda.click();
        });
    }

    zeroCenter(x, y) {
        let arr_toClick = new Array();

        for(var i = y - 1; i <= y + 1; i++) {
            arr_toClick.push($('#'+(x-1)+"-"+i));
            arr_toClick.push($('#'+(x+1)+"-"+i));
        }
        arr_toClick.push($('#'+x+"-"+(y-1)));
        arr_toClick.push($('#'+x+"-"+(y+1)));

        arr_toClick.forEach(function(celda) {
            celda.click();
        });
    }
}

export default MineSweeperTile;