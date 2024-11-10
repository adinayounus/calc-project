//save
//save
//on click, the number that is pressed will display in the viewfinder. after typing out the equation, pressing the equals button will also display the result in the viewfinder 


let display = document.getElementById('display');
const operators = ['+','-','/','*']
var appendedNumber = '';
let displayArray = [];

function buttonDisplay(input) {
    appendedNumber+=input.toString();
    display.value+=input;
}

function clearDisplay() {
    display.value = '';
    displayArray = [];
    appendedNumber = '';
} 

// function for removing last add by one charachter.
function deleteButton(input) {
    let lastDisplayIndex = displayArray[displayArray.length-1]
    console.log(lastDisplayIndex)

    if (appendedNumber !== '') {
        appendedNumber = appendedNumber.slice(0, -1)
        newDisplay = displayArray.join(' ').toString();
        display.value = newDisplay.length > 0 ? `${newDisplay} ${appendedNumber}` : `${appendedNumber}`;
    } else if (operators.includes(lastDisplayIndex)) {
        displayArray.pop()
        createDisplay()
    } else {
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

// const divide = document.getElementById('#division');
// let pressNum = document.querySelector('#number');
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

function calculate() {

}

function createDisplay() {
    displayArray = displayArray.filter(num => num !== '')
    let newDisplay = displayArray.join(' ').toString();
    console.log({'newDisplay': newDisplay, 'displayArray': displayArray})
    if (operators.includes(displayArray[displayArray.length-1])){
        display.value = (`${newDisplay} `);
    } else {
        display.value = (`${newDisplay}`);
        appendedNumber = displayArray[displayArray.length-1];
        displayArray.pop()
    }
    
    if (display.value[display.value.length-1] === '') {
        console.log(display.value)
        display.value = display.value.slice(1, display.value.length-1)
    }
}


//function for calculating 
// let calculation = document.getElementById
// function 