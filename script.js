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
    resetCalculator();
});

//backspace button
if (firstNumber == "0" || secondNumber == "0") {
    calculatorScreen.style.justifyContent = "flex-end";
    backspaceButton.style.visibility = "hidden";
}

backspaceButton.addEventListener("click", () => {
    backspaceNumber();
});

//get first number
for (let button of calculatorNumbers) {
    button.addEventListener("click", () => {
        let buttonValue = button.textContent;
        getFirstNumber(buttonValue);
    });
}

//get operator
for (let button of calculatorOperators) {
    button.addEventListener("click", () => {
        let buttonValue = button.textContent;
        getOperator(buttonValue);
    });    
}

//get second number
for (let button of calculatorNumbers) {
    button.addEventListener("click", () => {
        let buttonValue = button.textContent;
        getSecondNumber(buttonValue);
    });
}

//equals button
const equalsButton = document.querySelector(".calculator-button-equals");

equalsButton.addEventListener("click", () => {
    if (secondNumber != "-") {
        operate(firstNumber, secondNumber, selectedOperator);
        calculatorScreen.style.justifyContent = "flex-end";
        backspaceButton.style.visibility = "hidden";
    }
});


//get first number function
function getFirstNumber(value) {
    if (resultExists && !isOperatorSelected) {
        firstNumber.toString();
        if (value == ".") {
            firstNumber = "0";
            calculatorScreen.style.justifyContent = "space-between";
        } else {
            firstNumber = ""; 
        }
        firstNumber += value;
        resultExists = false;
    }
    
    if (firstNumber.length < 9 && !isOperatorSelected) {
        if (value == "." && !dotExists && !firstNumberExists) {
            firstNumber = "0.";
            dotExists = true;
            firstNumberExists = true;
            displayedNumber.textContent = `${firstNumber}`;
            backspaceButton.style.visibility = "visible";
            calculatorScreen.style.justifyContent = "space-between";
        } else if (value == "." && !dotExists) {
            firstNumber += value;
            dotExists = true;
            backspaceButton.style.visibility = "visible";
            displayedNumber.textContent = `${firstNumber}`;
        } else if (value == "." || firstNumber.length == 9) {
            firstNumber.slice(0, -1);
        } else {
            if (firstNumber == "0") {
                firstNumber = value;
            }  else {
                firstNumber += value;
            }
            backspaceButton.style.visibility = "visible";
            displayedNumber.textContent = `${firstNumber}`;
            calculatorScreen.style.justifyContent = "space-between";
            firstNumberExists = true;
        }
    }
}

//get second number function
function getSecondNumber(value) {
    if (isOperatorSelected == true) {
        if (secondNumber.length < 9 && isOperatorSelected) {
            if (value == "." && !dotExists && !secondNumberExists) {
                secondNumber = "0.";
                dotExists = true;
                displayedNumber.textContent = `${secondNumber}`;
                backspaceButton.style.visibility = "visible";
                calculatorScreen.style.justifyContent = "space-between";
                secondNumberExists = true;
            } else if (value == "." && !dotExists) {
                secondNumber += value;
                dotExists = true;
                displayedNumber.textContent = `${secondNumber}`;
                backspaceButton.style.visibility = "visible";
                calculatorScreen.style.justifyContent = "space-between";
            } else if (value == "." || secondNumber.length == 9) {
                secondNumber.slice(0, -1);
            } else {
                if (secondNumber == "0") {
                    secondNumber = value;
                }  else {
                    secondNumber += value;
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
}

//get operator function
function getOperator(value) {
    let isMinus = false;
    if (firstNumberExists && !isOperatorSelected && firstNumber != "-") {
        selectedOperator = value;
        isOperatorSelected = true;
        dotExists = false;
        backspaceButton.style.visibility = "hidden";
        for (let button of calculatorOperators) {
            if (button.textContent == value) {
                button.style.backgroundColor = "darkolivegreen";
            }
        }
        if (value == "-") {
            isMinus = true;
        }
    }

    if (firstNumberExists && secondNumberExists && secondNumber != "-") {
        operate (firstNumber, secondNumber, selectedOperator);
        isOperatorSelected = true;
        selectedOperator = value;
        dotExists = false;
        backspaceButton.style.visibility = "hidden";
        for (let button of calculatorOperators) {
            if (button.textContent == value) {
                button.style.backgroundColor = "darkolivegreen";
            }
        }
    }

    //use minus operator to create negative numbers
    if (value == "-" && !firstNumberExists) {
        firstNumber = "-";
        firstNumberExists = true;
        displayedNumber.textContent = `${firstNumber}`;
        backspaceButton.style.visibility = "visible";
        calculatorScreen.style.justifyContent = "space-between";
    }

    if (value == "-" && firstNumberExists && !isMinus && !secondNumberExists && isOperatorSelected) {
        secondNumber = "-";
        secondNumberExists = true;
        displayedNumber.textContent = `${secondNumber}`;
        backspaceButton.style.visibility = "visible";
        calculatorScreen.style.justifyContent = "space-between";
    }
}

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

    if (result > 999999999 || result < -999999999) {
        displayedNumber.textContent = "TOOBIG4ME";
        result = 0;
    } else if (resultLength == 10 && result[0] != "-") {
        displayedNumber.textContent = result;
    } else if (resultLength > 9) {
        let integerNumber = Math.round(result);
        let integerLength = integerNumber.toString().length;
        let decimalPlaces = 9 - integerLength - 1;
        result = roundNumber(result, decimalPlaces);
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

//reset function
function resetCalculator() {
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
            button.style.backgroundColor = "darkseagreen";
        }
        isOperatorSelected = false;
    }
    backspaceButton.style.visibility = "hidden";
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

//backspace function
function backspaceNumber(){
    if (!secondNumberExists) {
        firstNumber = firstNumber.slice(0, -1);
        if (firstNumber == "") {
            firstNumber = "0";
            calculatorScreen.style.justifyContent = "flex-end";
            backspaceButton.style.visibility = "hidden";
        }
        displayedNumber.textContent = `${firstNumber}`;
    } else {
        secondNumber = secondNumber.slice(0, -1);
        if (secondNumber == "") {
            secondNumber = "0";
            calculatorScreen.style.justifyContent = "flex-end";
            backspaceButton.style.visibility = "hidden";
        }
        displayedNumber.textContent = `${secondNumber}`;
    }
}


//keyboard functionality
window.addEventListener("keydown", function (event) {
    const key = event.key;
    if (!isNaN(key) || key == ".") {
        getFirstNumber(key);
        getSecondNumber(key);
    } else if (key === "Backspace") {
        backspaceNumber();
        event.preventDefault();
    } else if (key === "/" || key === "*" || key === "-" || key === "+") {
        getOperator(key);
    }
    else if (key === "Enter") {
        operate(firstNumber, secondNumber, selectedOperator);
        calculatorScreen.style.justifyContent = "flex-end";
        backspaceButton.style.visibility = "hidden";
    } else if (key === "Delete") {
        resetCalculator();
    }
})