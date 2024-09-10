//Import the modules filesystem and inquirer, as well as the shape classes from shapes.js
const inquirer = require('inquirer')
const fs = require('fs')
const {Triangle, Circle, Square } = require("./lib/shapes")
//Create function to declare the prompts we want to use with inquirer, and return the entered data when finished
function promptUserInput() {
    return inquirer.prompt([
        {
            type: "input",
            name: "acronym",
            message: "Enter your logo's acronym, up to 3 characters."
        },
        {
            type: "input",
            name: "textColor",
            message: "Enter your logo's text color as a keyword or hexadecimal number."
        },
        {
            type: "list",
            name: "shape",
            message: "Choose your logo's shape!",
            choices: ["circle", "triangle", "square"]
        },
        {
            type: "input",
            name: "shapeColor",
            message: "Enter your logo's shape color as a keyword or hexadecimal number"
        },
    ])
}

//Create a function to generate the logo when the data has been collected
function generateLogo(text, textColor, shape, shapeColor){
    //Declare a chosenShape, and turn the incoming shape var to a string instead of an array
    let chosenShape;
    let shapeString = shape.toString()
    //Then switch on the string and create the proper object based on the case
    switch(shapeString) {
        case "triangle":
            chosenShape = new Triangle()
            break
        case "circle":
            chosenShape = new Circle()
            break
        case "square":
            chosenShape = new Square()
            break
    }
    //Now that we have created our object, we can call setColor on it and pass in the chosen color
    chosenShape.setColor(shapeColor)
    //We then construct our .svg data with the provided values and return the string
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">\n\n${chosenShape.render()}\n\n  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}" dominant-baseline="middle">${text}</text>\n\n</svg>` 
}

//This function should write our data and return the promise when finished, printing an error if rejected.
function writeFileAsync(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {err ? reject(err) : resolve()})
    })
}

//Main code block runs each component, prompting user input, then constructing an svgData object fromt he returned user selections.

promptUserInput()
    .then((userInput) => {
        const svgData = generateLogo(
            userInput.acronym,
            userInput.textColor,
            userInput.shape,
            userInput.shapeColor
        )
        //run writefileasync with the data and save it to the /examples folder as logo.svgm and wait for the promise to return
        return writeFileAsync('./examples/logo.svg', svgData)
    })
    //Log to the console if the process was successful, and if unsuccessful, log the error out for easy debug
    .then(() => {
        console.log("Generated a new logo at 'logo.svg")
    })
    .catch((error) =>{
        console.log("An Error has occured! : ", error)
    })

//Export the two functions we need to test with jest.
module.exports = {generateLogo, writeFileAsync}
