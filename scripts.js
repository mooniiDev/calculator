const symbols = document.querySelectorAll('.symbol');
const history = document.querySelector('#calcHistory');
const input = document.querySelector('#calcInput');
let calcHistory = '';
let calcAnswer = '';
let action = '';
let num1 = '';
let num2 = '';

// ROUND TO THREE DECIMAL PLACES
function roundNumber(calculation) {
  const rounded = Math.round(calculation * 1000) / 1000;
  return rounded;
}

// CALCULATIONS
function add(a, b) {
  return roundNumber(a + b);
}
function subtract(a, b) {
  return roundNumber(a - b);
}
function multiply(arr) {
  let answer = 1;
  for (let i = 0; i < arr.length; i += 1) {
    answer *= arr[i];
  }
  return roundNumber(answer);
}
function divide(a, b) {
  if (b === 0) {
    return 'NOPE🙈';
  }
  return roundNumber(a / b);
}
function power(a, b) {
  let answer = 1;
  for (let i = 0; i < b; i += 1) {
    answer *= a;
  }
  return roundNumber(answer);
}

function showNumber(button) {
  input.textContent += button.textContent;
}

function calculate(task, firstNum, secondNum) {
  if (task === 'add') {
    calcAnswer = add(+firstNum, +secondNum);
  } else if (task === 'subtract') {
    calcAnswer = subtract(+firstNum, +secondNum);
  } else if (task === 'multiply') {
    calcAnswer = multiply([+firstNum, +secondNum]);
  } else if (task === 'divide') {
    calcAnswer = divide(+firstNum, +secondNum);
  } else if (task === 'power') {
    calcAnswer = power(+firstNum, +secondNum);
  }
  action = '';
  num1 = '';
  num2 = '';
  return calcAnswer;
}

function showCalculation(symbol) {
  if (symbol === 'power') {
    calcHistory = `${num1}^${num2}=${calculate(action, num1, num2)}`;
  } else if (symbol === 'divide') {
    calcHistory = `${num1}÷${num2}=${calculate(action, num1, num2)}`;
  } else if (symbol === 'multiply') {
    calcHistory = `${num1}×${num2}=${calculate(action, num1, num2)}`;
  } else if (symbol === 'subtract') {
    calcHistory = `${num1}−${num2}=${calculate(action, num1, num2)}`;
  } else if (symbol === 'add') {
    calcHistory = `${num1}+${num2}=${calculate(action, num1, num2)}`;
  }
  return calcHistory;
}

function operate(button) {
  if (num1 === '') {
    num1 = input.textContent;
    action = button.id;
  } else if (num1 !== '') {
    num2 = input.textContent;
    history.textContent = showCalculation(action);
    num1 = calculate(action, num1, num2);
    action = button.id;
  }
  input.textContent = '';
}

function clearSymbols(task) {
  if (task === 'clear') {
    history.textContent = '';
    input.textContent = '';
    calcHistory = '';
    calcAnswer = '';
    action = '';
    num1 = '';
    num2 = '';
  } else if (task === 'back') {
    input.textContent = input.textContent.slice(0, -1);
  }
}

function listenButtons() {
  symbols.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('number')) {
        showNumber(button);
      } else if (button.classList.contains('operator')) {
        operate(button);
      } else if (button.id === 'clear') {
        clearSymbols('clear');
      } else if (button.id === 'back') {
        clearSymbols('back');
      }
    });
  });
}
listenButtons();
