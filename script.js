let firstNumber = "";
let selectedOperator;
let secondNumber;

let displayValue = 0;
let calculatorScreen = document.querySelector(".calculator-screen");

let firstNumberExists = false;
let dotExists = false;

//get first number
const calculatorNumbers = document.querySelectorAll(".calculator-button-number");

for (let button of calculatorNumbers) {
    button.addEventListener("click", () => {
        if (firstNumber.length < 9) {
            if (button.textContent == "." && !dotExists && firstNumberExists == false) {
                firstNumber = "0.";
                dotExists = true;
                firstNumberExists = true;
                calculatorScreen.textContent = firstNumber;
            } else if (button.textContent == "." && dotExists && firstNumberExists) {
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
const calculatorOperator = document.querySelectorAll(".rABC")

function operate(firstNumber, operator, secondNumber) {

}