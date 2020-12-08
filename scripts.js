const symbols = document.querySelectorAll('.symbol');
const input = document.querySelector('#input');
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

function operate(task, firstNum, secondNum) {
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
  return input.textContent;
}

function clearSymbols(task) {
  if (task === 'clear') {
    input.textContent = '';
    num1 = 0;
    num2 = 0;
  } else if (task === 'back') {
    input.textContent = input.textContent.slice(0, -1);
  }
}

function listenButtons() {
  symbols.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('number')) {
        input.textContent += button.textContent;
      } else if (button.classList.contains('operator')) {
        action = button.id;
        num1 = input.textContent;
        input.textContent = '';
      } else if (button.id === 'equals') {
        num2 = input.textContent;
        operate(action, num1, num2);
      } else if (button.id === 'clear') {
        clearSymbols('clear');
      } else if (button.id === 'back') {
        clearSymbols('back');
      }
    });
  });
}
listenButtons();
