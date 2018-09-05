class Person {

    constructor(fullName, faveColor) {
        this.name = fullName;
        this.favColor = faveColor;
    }

    greet() {
        console.log('Hola, mi nombre es ' + this.name + ' y mi color favorito es ' + this.favColor + '.');
    }
}

export default Person;