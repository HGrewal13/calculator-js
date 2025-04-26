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

function modular(a, b) {
    return a % b;
}

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            if(b == 0) {
                return "ERROR";
            }
            return divide(a, b);
        case "%":
            return modular(a, b);
    }
}

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

let currentText = document.querySelector("#currentText");
let summaryScreen = document.querySelector("#summaryText");
let gridContainer = document.querySelector("#grid-container");

gridContainer.addEventListener("click", function(event) {
    const clicked = event.target;
    const value = clicked.value;
    console.log(value);

    if(currentText.textContent === "ERROR") {
        clearAll();
    }

    if(clicked.classList.contains("clearEntry")) {
        clearEntry();
    }

    if(clicked.classList.contains("clearAll")) {
        clearAll();
    }

    if(clicked.classList.contains("number")) {
        currentEntry += value;
    }
    
    currentText.textContent = currentEntry;

    if(clicked.classList.contains("operator")) {
        if(currentEntry !== "") {
            if(num1 == null) {
                num1 = parseInt(currentEntry);
            } else {
                num1 = operate(operator, num1, parseInt(currentEntry));
                if(num1 == "ERROR") {
                    clearAll();
                    currentText.textContent = "ERROR";
                    return;
                }
            }
            operator = value;
            clearEntry();
            summaryScreen.textContent = `${num1} ${operator}`;
        } else if (currentEntry == "") {
            if(num1 == null) {
                num1 = 0;
            }
            operator = value;
            clearEntry();
            summaryScreen.textContent = `${num1} ${operator}`;
        }
    }

    if(clicked.classList.contains("equals")) {
        if(currentEntry !== "") {
            num2 = parseInt(currentEntry);
            currentEntry = "";
            summaryScreen.textContent = `${num1} ${operator} ${num2}`;
            let result = operate(operator, num1, num2);
            if(result == "ERROR") {
                clearAll();
                currentText.textContent = "ERROR";
                return;
            }
            currentText.textContent = result;
            // Allows chaining operations each time we press equals.
            currentEntry = result;
            num1 = null;
            num2 = null;
        }
    }
});
