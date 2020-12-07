const symbols = document.querySelectorAll('.symbol');
const display = document.querySelector('#display');
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
    display.textContent = add(+firstNum, +secondNum);
  } else if (task === 'subtract') {
    display.textContent = subtract(+firstNum, +secondNum);
  } else if (task === 'multiply') {
    display.textContent = multiply([+firstNum, +secondNum]);
  } else if (task === 'divide') {
    display.textContent = divide(+firstNum, +secondNum);
  } else if (task === 'power') {
    display.textContent = power(+firstNum, +secondNum);
  }
  return display.textContent;
}

function clearSymbols(task) {
  if (task === 'clear') {
    display.textContent = '';
    num1 = 0;
    num2 = 0;
  } else if (task === 'back') {
    display.textContent = display.textContent.slice(0, -1);
  }
}

function listenButtons() {
  symbols.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('number')) {
        display.textContent += button.textContent;
      } else if (button.classList.contains('operator')) {
        action = button.id;
        num1 = display.textContent;
        display.textContent = '';
      } else if (button.id === 'equals') {
        num2 = display.textContent;
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
