//Base class of Shape, should hold default color of black, a function to set the color and if rendered will return an empty string
class Shape {
    constructor() {
        this.color = "black"
    }
    //Method to call to set the object's color.
    setColor(color) {
        this.color = color
    }
    //Default render method for base Shape class
    render(){
        return ""
    }
}

class Triangle extends Shape {
    constructor (color) {
        super(color)
        this.points = `<polygon points="150, 18 244, 182 56, 182"`
    }
    render(){
        return `${this.points} fill="${this.color}" />`
    }
}

class Circle extends Shape {
    constructor (color) {
        super(color)
        this.points = `<circle cx="150" cy="100" r="80"`
    }
    render(){
        return `${this.points} fill="${this.color}" />`
    }
}

class Square extends Shape {
    constructor (color) {
        super(color)
        this.points = `<rect x="50" y="50" width="200" height="200"`
    }
    render(){
        return `${this.points} fill="${this.color}" />`
    }
}

module.exports = { Shape, Triangle, Circle, Square }