let firstNumber = "";
let selectedOperator;
let secondNumber = "";

let calculatorScreen = document.querySelector(".calculator-screen");

let firstNumberExists = false;
let secondNumberExists = false;
let dotExists = false;
let resultExists = false;
let isOperatorSelected = false;

const calculatorNumbers = document.querySelectorAll(".calculator-button-number");
const calculatorOperators = document.querySelectorAll(".calculator-button-operator");

//AC button
const acButton = document.querySelector(".calculator-button-reset");
acButton.addEventListener("click", () => {
    firstNumber = "";
    firstNumberExists = false;
    secondNumber = "";
    secondNumberExists = false;
    dotExists = false;
    resultExists = false;
    calculatorScreen.textContent = "0";
    if (isOperatorSelected) {
        for (let button of calculatorOperators) {
            button.style.backgroundColor = "darkkhaki";
        }
        isOperatorSelected = false;
    }
});

//get first number
for (let button of calculatorNumbers) {
    button.addEventListener("click", () => {
        if (resultExists && !isOperatorSelected) {
            firstNumber.toString();
            firstNumber = "";  
            resultExists = false;
        }
        
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
            } else if (button.textContent == "." || firstNumber.length == 9) {
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
for (let button of calculatorOperators) {
    button.addEventListener("click", () => {
        if (firstNumberExists && !isOperatorSelected) {
            selectedOperator = button.textContent;
            isOperatorSelected = true;
            dotExists = false;
            button.style.backgroundColor = "darkolivegreen";
        }

        if (firstNumberExists && secondNumberExists) {
            operate (firstNumber, secondNumber, selectedOperator);
            isOperatorSelected = true;
            button.style.backgroundColor = "darkolivegreen";
            selectedOperator = button.textContent;
            dotExists = false;
        }
    });
}

//get second number
for (let button of calculatorNumbers) {
    button.addEventListener("click", () => {
        if (isOperatorSelected == true) {
            if (secondNumber.length < 9 && isOperatorSelected) {
                if (button.textContent == "." && !dotExists && !secondNumberExists) {
                    secondNumber = "0.";
                    dotExists = true;
                    calculatorScreen.textContent = secondNumber;
                    secondNumberExists = true;
                } else if (button.textContent == "." && !dotExists) {
                    secondNumber += button.textContent;
                    dotExists = true;
                    calculatorScreen.textContent = secondNumber;
                } else if (button.textContent == "." || secondNumber.length == 9) {
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
        }

    });
}

//equals button
const equalsButton = document.querySelector(".calculator-button-equals");

equalsButton.addEventListener("click", () => {
    operate(firstNumber, secondNumber, selectedOperator);
});


//get result function
function operate(first, second, operator) {
    let numberOne = Number(first);
    let numberTwo = Number(second);
    let result;

    if (operator == "+") {
        result = numberOne + numberTwo;
    } else if (operator == "-") {
        result = numberOne - numberTwo;
    } else if (operator == "*") {
        let operationArray = [numberOne, numberTwo];
        result = muiltiply(operationArray); 
    } else if (operator == "/") {
        let operationArray = [numberOne, numberTwo];
        result = divide(operationArray); 
    }

    let resultLength = result.toString().length;

    if (result > 999999999) {
        calculatorScreen.textContent = "TOOBIG4ME";
        result = 0;
    } else if (resultLength > 9) {
        let integerNumber = Math.round(result);
        let integerLength = integerNumber.toString().length;
        let decimalPlaces = 9 - integerLength - 1;
        console.log(decimalPlaces);
        result = roundNumber(result, decimalPlaces);
        console.log(result);
        calculatorScreen.textContent = result;
    } else {
        calculatorScreen.textContent = result;
    }

    secondNumber.toString();
    secondNumber = "";
    secondNumberExists = false;
    firstNumber = result;
    firstNumber.toString();
    selectedOperator = "";
    isOperatorSelected = false;
    resultExists = true;
    dotExists = false;

    return result;
}

//muiltiply
function muiltiply(array) {
    return array.reduce((total, current) => total * current);
}
//divide
function divide(array) {
    return array.reduce((total, current) => total / current);
}

//round
function roundNumber(num, decimals) {
    return Number(num.toFixed(decimals));
}

//backspace button

//add keyboard functionality