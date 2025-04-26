let currentEntry = "";
let num1 = null;
let num2 = null;
let operator = null;

function add(a, b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}  

function divide(a, b) {
    return a/b;
}

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

let currentText = document.querySelector("#currentText");
let summaryScreen = document.querySelector("#summaryText");
let gridContainer = document.querySelector("#grid-container");

gridContainer.addEventListener("click", function(event) {
    const clicked = event.target;
    const value = clicked.value;
    console.log(value);

    if(clicked.classList.contains("clearEntry")) {
        currentEntry = "";
        currentText.textContent = "";
    }

    if(clicked.classList.contains("clearAll")) {
        currentEntry = "";
        currentText.textContent = "";
        summaryScreen.textContent = "";
        operator = null;
        num1 = null;
        num2 = null;
    }

    if(clicked.classList.contains("number")) {
        currentEntry += value;
    }
    
    currentText.textContent = currentEntry;

    if(clicked.classList.contains("operator")) {
        if (currentEntry !== "") {
            num1 = parseInt(currentEntry);
            operator = value;
            currentEntry = "";
            currentText.textContent = "";
            summaryScreen.textContent = `${num1} ${operator}`;
        }
    }

    if(clicked.classList.contains("equals")) {
        if(currentText !== "") {
            num2 = parseInt(currentEntry);
            currentEntry = "";
            summaryScreen.textContent = `${num1} ${operator} ${num2}`;
            let result = operate(operator, num1, num2);
            currentText.textContent = result;
            // Allows chaining operations each time we press equal.
            currentEntry = result;
        }
    }

});
