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
  input.textContent += button.textContent;
}

function showCalculation(symbol) {
  if (symbol === 'power') {
    history.textContent = `${num1}^${num2}`;
  } else if (symbol === 'divide') {
    history.textContent = `${num1}÷${num2}`;
  } else if (symbol === 'multiply') {
    history.textContent = `${num1}×${num2}`;
  } else if (symbol === 'subtract') {
    history.textContent = `${num1}−${num2}`;
  } else if (symbol === 'add') {
    history.textContent = `${num1}+${num2}`;
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
  if (num1 === '' && input.textContent !== '') {
    num1 = input.textContent;
    action = button.id;
    input.textContent = '';
    showCalculation(action);
  } else if (num1 !== '') {
    num2 = input.textContent;
    showCalculation(action);
    num1 = calculate(action, num1, num2);
    input.textContent = num1;
    action = button.id;
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
