let firstNumber = "";
let selectedOperator;
let secondNumber = "";

let calculatorScreen = document.querySelector(".calculator-screen");
let displayedNumber = document.querySelector(".displayed-number");

let firstNumberExists = false;
let secondNumberExists = false;
let dotExists = false;
let resultExists = false;
let isOperatorSelected = false;

const calculatorNumbers = document.querySelectorAll(".calculator-button-number");
const calculatorOperators = document.querySelectorAll(".calculator-button-operator");
const backspaceButton = document.getElementById("backspace-button");

//AC button
const acButton = document.querySelector(".calculator-button-reset");
acButton.addEventListener("click", () => {
    firstNumber = "";
    firstNumberExists = false;
    secondNumber = "";
    secondNumberExists = false;
    dotExists = false;
    resultExists = false;
    displayedNumber.textContent = "0";
    calculatorScreen.style.justifyContent = "flex-end";
    if (isOperatorSelected) {
        for (let button of calculatorOperators) {
            button.style.backgroundColor = "darkkhaki";
        }
        isOperatorSelected = false;
    }
    backspaceButton.style.visibility = "hidden";
});

//backspace button
let defaultBackspaceStyle;

if (!firstNumberExists || !secondNumberExists) {
    calculatorScreen.style.justifyContent = "flex-end";
    backspaceButton.style.visibility = "hidden";
}


backspaceButton.addEventListener("click", () => {
    if (!secondNumberExists) {
        firstNumber = firstNumber.slice(0, -1);
        if (firstNumber == "") {
            firstNumber = "0";
        }
        displayedNumber.textContent = `${firstNumber}`;
    } else {
        secondNumber = secondNumber.slice(0, -1);
        if (secondNumber == "") {
            secondNumber = "0";
        }
        displayedNumber.textContent = `${secondNumber}`;
    }
});

//get first number
for (let button of calculatorNumbers) {
    button.addEventListener("click", () => {
        if (resultExists && !isOperatorSelected) {
            firstNumber.toString();
            if (button.textContent == ".") {
                firstNumber = "0";
                calculatorScreen.style.justifyContent = "space-between";
            } else {
                firstNumber = ""; 
            }
            resultExists = false;
        }
        
        if (firstNumber.length < 9 && !isOperatorSelected) {
            if (button.textContent == "." && !dotExists && !firstNumberExists) {
                firstNumber = "0.";
                dotExists = true;
                firstNumberExists = true;
                displayedNumber.textContent = `${firstNumber}`;
                backspaceButton.style.visibility = "visible";
                calculatorScreen.style.justifyContent = "space-between";
            } else if (button.textContent == "." && !dotExists) {
                firstNumber += button.textContent;
                dotExists = true;
                backspaceButton.style.visibility = "visible";
                displayedNumber.textContent = `${firstNumber}`;
            } else if (button.textContent == "." || firstNumber.length == 9) {
                firstNumber.slice(0, -1);
            } else {
                if (firstNumber == "0") {
                    firstNumber = button.textContent;
                }  else {
                    firstNumber += button.textContent;
                }
                
                backspaceButton.style.visibility = "visible";
                displayedNumber.textContent = `${firstNumber}`;
                calculatorScreen.style.justifyContent = "space-between";
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
            backspaceButton.style.visibility = "hidden";
        }

        if (firstNumberExists && secondNumberExists) {
            operate (firstNumber, secondNumber, selectedOperator);
            isOperatorSelected = true;
            button.style.backgroundColor = "darkolivegreen";
            selectedOperator = button.textContent;
            dotExists = false;
            backspaceButton.style.visibility = "hidden";
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
                    displayedNumber.textContent = `${secondNumber}`;
                    backspaceButton.style.visibility = "visible";
                    calculatorScreen.style.justifyContent = "space-between";
                    secondNumberExists = true;
                } else if (button.textContent == "." && !dotExists) {
                    secondNumber += button.textContent;
                    dotExists = true;
                    displayedNumber.textContent = `${secondNumber}`;
                    backspaceButton.style.visibility = "visible";
                    calculatorScreen.style.justifyContent = "space-between";
                } else if (button.textContent == "." || secondNumber.length == 9) {
                    secondNumber.slice(0, -1);
                } else {
                    if (secondNumber == "0") {
                        secondNumber = button.textContent;
                    }  else {
                        secondNumber += button.textContent;
                    }

                    displayedNumber.textContent = `${secondNumber}`;
                    backspaceButton.style.visibility = "visible";
                    calculatorScreen.style.justifyContent = "space-between";
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
    calculatorScreen.style.justifyContent = "flex-end";
    backspaceButton.style.visibility = "hidden";
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
        displayedNumber.textContent = "TOOBIG4ME";
        result = 0;
    } else if (resultLength > 9) {
        let integerNumber = Math.round(result);
        let integerLength = integerNumber.toString().length;
        let decimalPlaces = 9 - integerLength - 1;
        console.log(decimalPlaces);
        result = roundNumber(result, decimalPlaces);
        console.log(result);
        displayedNumber.textContent = result;
    } else {
        displayedNumber.textContent = result;
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
    calculatorScreen.style.justifyContent = "flex-end";

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

//add keyboard functionality