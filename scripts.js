// ------------------------ Define variables for calculator -------------------
let currentEntry = "";
let num1 = null;
let num2 = null;
let operator = null;

// ------------------------ Define DOM Elements ------------------------------
let currentText = document.querySelector("#currentText");
let summaryScreen = document.querySelector("#summaryText");
let gridContainer = document.querySelector("#grid-container");

// ------------------------ Basic Math Functions -----------------------------
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

function modular(a, b) {
    return a % b;
}

// ----------------------- Main Operation Function ----------------------------
function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            if(b === 0) {
                return "ERROR";
            }
            return divide(a, b);
        case "%":
            return modular(a, b);
        default:
            return "ERROR";
    }
}

// --------------------- Secondary Functions --------------------------------
function clearEntry() {
    currentEntry = "";
    currentText.textContent = "";
}

function clearAll() {
    currentEntry = "";
    currentText.textContent = "";
    summaryScreen.textContent = "";
    operator = null;
    num1 = null;
    num2 = null;
}

function handleError() {
    clearAll();
    currentText.textContent = "ERROR";
}

function roundAnswer(n) {
    return Math.round(n * 100000) / 100000;
}

// ------------------------- Handle Functions -> Main Logic on Button Presses ------------------
function handleOperatorClick(value) {
    if(currentEntry !== "") {
        if(num1 === null) {
            num1 = parseFloat(currentEntry);
        } else {
            num1 = operate(operator, num1, parseFloat(currentEntry));
            if(num1 === "ERROR") {
                handleError();
                return;
            }
            // Done after checking for error to avoid NaN value by running roundAnswer on ERROR
            num1 = roundAnswer(num1);
        }
    } else if (currentEntry === "") {
        if(num1 === null) {
            num1 = 0;
        }
    }
    operator = value;
    clearEntry();
    summaryScreen.textContent = `${num1} ${operator}`;
}

function handleEquals() {
    if(currentEntry !== "") {
        // Error handling for when user only clicks one number then equals
        // it will store that number as num1 then clear input field
        if(num1 === null || operator === null) {
            num1 = parseFloat(currentEntry);
            clearEntry();
            return summaryScreen.textContent = `${num1}`;
        }

        num2 = parseFloat(currentEntry);
        currentEntry = "";
        summaryScreen.textContent = `${num1} ${operator} ${num2}`;
        let result = operate(operator, num1, num2);
        if(result === "ERROR") {
            handleError();
            return;
        }
        // Done after checking for error to avoid NaN value by running roundAnswer on ERROR
        result = roundAnswer(result);
        currentText.textContent = result;
        // Allows chaining operations each time we press equals.
        currentEntry = result;
        num1 = null;
        num2 = null;
    }
}

function handleDecimal(value) {
    // If currentEntry doesn't contain a decimal, add in a decimal
    // Convert to string before checking because a computation will turn currentEntry into a float
    if(!String(currentEntry).includes(".")) {
        // First case is error handling for avoiding NaN entry
        if(currentEntry === "") {
            currentEntry = "0.";
            currentText.textContent = currentEntry;
        } else {
            currentEntry += ".";
            currentText.textContent = currentEntry;
        }
    } else {
        return;
    }
}

// ------------------------ EventListener Function. Runs Handle Functions ------
gridContainer.addEventListener("click", function(event) {
    const clicked = event.target;
    const value = clicked.value;

    if(currentText.textContent === "ERROR") {
        clearAll();
    } else if(clicked.classList.contains("clearEntry")) {
        clearEntry();
    } else if(clicked.classList.contains("clearAll")) {
        clearAll();
    } else if(clicked.classList.contains("number")) {
        currentEntry += value;
        currentText.textContent = currentEntry;
    } else if(clicked.classList.contains("operator")) {
        handleOperatorClick(value);
    } else if(clicked.classList.contains("equals")) {
        handleEquals();
    } else if(clicked.classList.contains("decimal")) {
        handleDecimal(value);
    }
});
