// DOM elements
const display = document.getElementById("display");
const output = document.getElementById("output");
const buttons = document.querySelectorAll("button");

// State variables
let previousNumber = null;
let currentNumber = null;
let operator = null;
let result = null;

// Math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
    if (b === 0) {
      return NaN;
    } else {
      return Number(a) / Number(b);
    }
  }
  
  
// Handle button clicks
function handleClick(event) {
  const button = event.target;
  const value = button.textContent;

  if (!isNaN(value)) {
    if (currentNumber === null) {
      currentNumber = value;
    } else {
      currentNumber += value;
    }
    display.value = currentNumber;
  }

  if (value === "+" || value === "-" || value === "*" || value === "/") {
    if (previousNumber === null) {
      previousNumber = currentNumber;
      currentNumber = null;
    } else if (currentNumber !== null) {
      result = operate(previousNumber, currentNumber, operator);
      previousNumber = result;
      currentNumber = null;
      display.value = result;
    }
    operator = value;
  }

  if (value === "=") {
    if (previousNumber !== null && currentNumber !== null) {
      result = operate(previousNumber, currentNumber, operator);
      previousNumber = null;
      currentNumber = result;
      operator = null;
      display.value = result;
    }
  }

  if (value === "C") {
    previousNumber = null;
    currentNumber = null;
    operator = null;
    result = null;
    display.value = "";
  }
}

// Calculate result based on operator
function operate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "Infinity";
      } else {
        return divide(a, b);
      }
  }
}

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener("click", handleClick);
});
