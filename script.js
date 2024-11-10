//save
//on click, the number that is pressed will display in the viewfinder. after typing out the equation, pressing the equals button will also display the result in the viewfinder 
alert("Hello, and welcome to Adina and BK's Calculator! Percentage and the BK button are still a work in progress, so stay tuned! We worked very hard to not use the eval() function as it is bad practice. Happy calculating!")
let display = document.getElementById('display');
const operators = ['+','-','/','*']
var appendedNumber = '';
let displayArray = [];

//to display onclick into input box 
function buttonDisplay(input) {
    appendedNumber+=input.toString();
    display.value+=input;
}

//setting display to empty 
function clearDisplay() {
    display.value = '';
    displayArray = [];
    appendedNumber = '';
} 

// function for removing last add by one charachter.
function deleteButton(input) {
    let lastDisplayIndex = displayArray[displayArray.length-1]
    console.log(lastDisplayIndex)
//if appended number is not empty, slice 1, or delete by 1
    if (appendedNumber !== '') {
        appendedNumber = appendedNumber.slice(0, -1)
        let newDisplay = displayArray.join(' ').toString();
        //trying to work with refactoring
        display.value = newDisplay.length > 0 ? `${newDisplay} ${appendedNumber}` : `${appendedNumber}`;
    } else if (operators.includes(lastDisplayIndex)) {
        displayArray.pop()
        createDisplay()
    } else {
        //remove last element if less than 2 and return 
        if (lastDisplayIndex.length < 2 ) {
            displayArray.pop()
        } else {
            let newInput = lastDisplayIndex.slice(0, lastDisplayIndex.length-1)
            console.log(newInput)
            displayArray.pop()
            displayArray.push(newInput)
            createDisplay()
            appendedNumber = newInput;
            displayArray.pop()
        }
    }
}

// const divide = document.getElementById('division');
// let pressNum = document.querySelector('number');

//subtract button 
function subDisplay() {
    let lastDisplayIndex = displayArray[displayArray.length-1]
    console.log(appendedNumber)
    if(operators.includes(lastDisplayIndex) && appendedNumber === '') {
        createDisplay()
        return;
    } else {
        displayArray.push(appendedNumber)
        appendedNumber = '';
        displayArray.push('-')
        createDisplay()
    }
}

//addition button 
function addDisplay() {
    let lastDisplayIndex = displayArray[displayArray.length-1]
    console.log(appendedNumber)
    if(operators.includes(lastDisplayIndex) && appendedNumber === '') {
        createDisplay()
        return;
    } else {
        displayArray.push(appendedNumber)
        appendedNumber = '';
        displayArray.push('+')
        createDisplay()
    }
}

//division
function diviDisplay() {
    let lastDisplayIndex = displayArray[displayArray.length-1]
    console.log(appendedNumber)
    if(operators.includes(lastDisplayIndex) && appendedNumber === '') {
        createDisplay()
        return;
    } else {
        displayArray.push(appendedNumber)
        appendedNumber = '';
        displayArray.push('/')
        createDisplay()
    }
}

//multiplication
function multiDisplay() {
    let lastDisplayIndex = displayArray[displayArray.length-1]
    console.log(appendedNumber)
    if(operators.includes(lastDisplayIndex) && appendedNumber === '') {
        createDisplay()
        return;
    } else {
        displayArray.push(appendedNumber)
        appendedNumber = '';
        displayArray.push('*')
        createDisplay()
    }
}
//calculating 
function calculate() {
    let opperand = '';
    let lastDisplayIndex = displayArray[displayArray.length-1]
    //making sure you cant calculate without putting a number after an operator 
    if(operators.includes(lastDisplayIndex) && appendedNumber === '') {
        display.value = 'ERROR'
        return
    //accounting for if just a single number is in the display
    } else if (displayArray.length < 1 && appendedNumber.length > 0){
        return
    //acounting for if just an operator is in the display
    } else if (displayArray.length === 1 && operators.includes(displayArray[0])) {
        display.value = 'ERROR'
        return
    }

    function getOpperand(findOpp) {
        //for loop for if what is entered is multiplication, division, add or subtract. MDAS named respectively 
        for (let i = 0; i < displayArray.length-1; i++) {
            let opp = displayArray[i]
            if (findOpp === 'MD') {
                if(opp === '*' || opp === '/') {
                    return opp;
                }
            }
            if (findOpp === 'AS') {
                if(opp === '+' || opp === '-') {
                    return opp;
                }
            }
        }
    }

    displayArray.push(appendedNumber)
    appendedNumber = '';
    //stopping the loop if it is inclusive of one of the operators. 
    let stop = false;
    while (!stop) {
    if (displayArray.includes('*') || displayArray.includes('/')) {

        opperand = getOpperand('MD');
    //this is messy but i am trying refactoring here too. it looks for M or D, and acounting for spacing
        let indexOfSign = displayArray.indexOf(opperand)
        let newValue = opperand === '*' ? displayArray[indexOfSign-1] * displayArray[indexOfSign+1] : displayArray[indexOfSign-1] / displayArray[indexOfSign+1]
        //first time working with ... operator, makes sure the computer is looking at the individual elements
        displayArray = [...displayArray.slice(0, indexOfSign-1), newValue, ...displayArray.slice(indexOfSign+2)]
    } else if (displayArray.includes('+') || displayArray.includes('-')) {
        opperand = getOpperand('AS');
        let indexOfSign = displayArray.indexOf(opperand)
        console.log({displayArray})
        //had to use parse for + and - as the + was keeping the string as a number. parseFloat to handle longer numbers and decimals
        let newValue = opperand === '+' ? parseFloat(displayArray[indexOfSign-1]) + parseFloat(displayArray[indexOfSign+1]) : parseFloat(displayArray[indexOfSign-1]) - parseFloat(displayArray[indexOfSign+1])
        displayArray = [...displayArray.slice(0, indexOfSign-1), newValue, ...displayArray.slice(indexOfSign+2)] //not sure why it doesnt work with +1 the same as MD but it works the same with +2 
    }
    if (displayArray.length == 1) stop = true;
    }   
    // displayArray.forEach(number, index) {

    // }
    createDisplay();
}

//spacing
function createDisplay() {
    
    displayArray = displayArray.filter(num => num !== '')
    let newDisplay = displayArray.join(' ').toString();
    //error for dividing by 0
    if (newDisplay == "Infinity") {
        display.value = 'ERROR'
        return;
    }
    console.log({'newDisplay': newDisplay, 'displayArray': displayArray})
    if (operators.includes(displayArray[displayArray.length-1])){
        display.value = (`${newDisplay} `); //space at the end 
    } else {
        display.value = (`${newDisplay}`);
        appendedNumber = displayArray[displayArray.length-1];
        displayArray.pop()
    }
    
    if (display.value[display.value.length-1] === '') {
        console.log(display.value)
        display.value = display.value.slice(1, display.value.length-1)
    }
    console.log(displayArray)
}


//function for calculating 
// let calculation = document.getElementById
// function 