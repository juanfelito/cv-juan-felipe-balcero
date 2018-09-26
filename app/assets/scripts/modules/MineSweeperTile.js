import $ from 'jquery';

class MineSweeperTile {
    constructor() {
        this.startButton = $('#start-game');
        this.events();
    }

    events() {
        this.startButton.click(this.startGame);
    }

    startGame() {
        console.log('Funciona');
    }
}

export default MineSweeperTile;