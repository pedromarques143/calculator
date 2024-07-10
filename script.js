let firstNumber = "";
let selectedOperator;
let secondNumber = "";

let displayValue = 0;
let calculatorScreen = document.querySelector(".calculator-screen");

let firstNumberExists = false;
let secondNumberExists = false;
let dotExists = false;
let resultExists = false;
let isOperatorSelected = false;

//get first number
const calculatorNumbers = document.querySelectorAll(".calculator-button-number");

for (let button of calculatorNumbers) {
    button.addEventListener("click", () => {
        if (firstNumber.length < 9 && !isOperatorSelected) {
            if (button.textContent == "." && !dotExists && !firstNumberExists) {
                firstNumber = "0.";
                dotExists = true;
                firstNumberExists = true;
                calculatorScreen.textContent = firstNumber;
            } else if (button.textContent == "." && !dotExists) {
                firstNumber += button.textContent;
                dotExists = true;
                calculatorScreen.textContent = firstNumber;
            } else if (button.textContent == ".") {
                firstNumber.slice(0, -1);
            } else {
                firstNumber += button.textContent;
                calculatorScreen.textContent = firstNumber;
                firstNumberExists = true;
            }
        }
    });
}

//get operator
const calculatorOperators = document.querySelectorAll(".calculator-button-operator");

for (let button of calculatorOperators) {
    button.addEventListener("click", () => {
        if (firstNumberExists && !isOperatorSelected) {
            selectedOperator = button.textContent;
            button.style.backgroundColor = "darkolivegreen";
            isOperatorSelected = true;
            dotExists = false;
        }
    });
}

//get second number
for (let button of calculatorNumbers) {
    button.addEventListener("click", () => {
        if (isOperatorSelected == true) {
            if (button.textContent == "." && !dotExists && !secondNumberExists) {
                secondNumber = "0.";
                dotExists = true;
                calculatorScreen.textContent = secondNumber;
                secondNumberExists = true;
            } else if (button.textContent == "." && !dotExists) {
                secondNumber += button.textContent;
                dotExists = true;
                calculatorScreen.textContent = secondNumber;
            } else if (button.textContent == ".") {
                secondNumber.slice(0, -1);
            } else {
                secondNumber += button.textContent;
                calculatorScreen.textContent = secondNumber;
                secondNumberExists = true;
            }

            for (let buttonTwo of calculatorOperators) {
                buttonTwo.style.backgroundColor = "darkseagreen";
            }
        }
        isOperatorSelected = false;
    });
}

//equals button
const equalsButton = document.querySelector(".calculator-button-equals");

equalsButton.addEventListener("click", () => {
    operate(firstNumber, secondNumber, selectedOperator);
});


//get result
function operate(first, second, operator) {
    let numberOne = Number(first);
    let numberTwo = Number(second);
    let result;

    if (operator == "+") {
        result = numberOne + numberTwo;
        calculatorScreen.textContent = result;
        secondNumberExists = false;
        firstNumber = result;
    }

    return result;
}


//subtract

//muiltiply

//divide

//reset button
