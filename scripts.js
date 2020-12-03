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
  for (let i = 0; i < arr.length; i++) {
    answer = answer * arr[i];
  }
  return answer;
}
function divide(a, b) {
  return a / b;
}
function power(a, b) {
  let i = 0;
  let answer = 1;
  while (i < b) {
    answer = answer * a;
    i++;
  }
  return answer;
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

function operate(action, num1, num2) {
  if (action === 'add') {
    display.textContent = add(+num1, +num2);
  } else if (action === 'subtract') {
    display.textContent = subtract(+num1, +num2);
  } else if (action === 'multiply') {
    display.textContent = multiply([+num1, +num2]);
  } else if (action === 'divide') {
    display.textContent = divide(+num1, +num2);
  } else if (action === 'power') {
    display.textContent = power(+num1, +num2);
  }
}

function listenButtons() {
  symbols.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('number')) {
        display.textContent = display.textContent + button.textContent;
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
    })
  })
}
listenButtons();
