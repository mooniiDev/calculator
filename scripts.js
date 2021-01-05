const symbols = document.querySelectorAll('.symbol');
const history = document.querySelector('#calcHistory');
const input = document.querySelector('#calcInput');
let action = '';
let num1 = '';
let num2 = '';

// CALCULATIONS
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(arr) {
  let answer = 1;
  for (let i = 0; i < arr.length; i += 1) {
    answer *= arr[i];
  }
  return answer;
}
function divide(a, b) {
  if (b === 0) {
    return 'ERROR';
  }
  return a / b;
}
function power(a, b) {
  let answer = 1;
  for (let i = 0; i < b; i += 1) {
    answer *= a;
  }
  return answer;
}

function showNumber(button) {
  if (num1 !== '' && history.textContent !== '') {
    input.textContent = '';
    input.textContent += button.textContent;
  } else {
    input.textContent += button.textContent;
  }
}

function showCalculation(symbol) {
  let calcHistory = '';
  if (symbol === 'power') {
    calcHistory = `${num1}^${num2}=`;
  } else if (symbol === 'divide') {
    calcHistory = `${num1}÷${num2}=`;
  } else if (symbol === 'multiply') {
    calcHistory = `${num1}×${num2}=`;
  } else if (symbol === 'subtract') {
    calcHistory = `${num1}−${num2}=`;
  } else if (symbol === 'add') {
    calcHistory = `${num1}+${num2}=`;
  }
  return calcHistory;
}

function calculate(task, firstNum, secondNum) {
  if (task === 'add') {
    input.textContent = add(+firstNum, +secondNum);
  } else if (task === 'subtract') {
    input.textContent = subtract(+firstNum, +secondNum);
  } else if (task === 'multiply') {
    input.textContent = multiply([+firstNum, +secondNum]);
  } else if (task === 'divide') {
    input.textContent = divide(+firstNum, +secondNum);
  } else if (task === 'power') {
    input.textContent = power(+firstNum, +secondNum);
  }
  action = '';
  num1 = '';
  num2 = '';
  return input.textContent;
}

function operate(button) {
  if (num1 === '') {
    num1 = input.textContent;
    action = button.id;
    input.textContent = '';
  } else if (num1 !== '') {
    num2 = input.textContent;
    history.textContent = showCalculation(action);
    num1 = calculate(action, num1, num2);
    input.textContent = num1;
    action = button.id;
  }
}

function clearSymbols(task) {
  if (task === 'clear') {
    history.textContent = '';
    input.textContent = '';
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
