const history = document.querySelector('#calcHistory');
const input = document.querySelector('#calcInput');
const symbols = document.querySelectorAll('.symbol');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const decimal = document.querySelector('#decimal');
let calcHistory = '';
let calcAnswer = '';
let action = '';
let num1 = '';
let num2 = '';

// CALCULATIONS
function power(a, b) {
  let answer = 1;
  for (let i = 0; i < b; i += 1) {
    answer *= a;
  }
  return answer;
}
function divide(a, b) {
  if (b === 0) {
    return 'NOPE🙈';
  }
  return a / b;
}
function multiply(arr) {
  let answer = 1;
  for (let i = 0; i < arr.length; i += 1) {
    answer *= arr[i];
  }
  return answer;
}
function subtract(a, b) {
  return a - b;
}
function add(a, b) {
  return a + b;
}

// ROUND NUMBER TO THREE DECIMAL PLACES
function roundNumber(calculation) {
  const rounded = Math.round(calculation * 1000) / 1000;
  return rounded;
}

function calculate(task, firstNum, secondNum) {
  if (task === 'power') {
    calcAnswer = power(+firstNum, +secondNum);
  } else if (task === 'divide') {
    calcAnswer = divide(+firstNum, +secondNum);
  } else if (task === 'multiply') {
    calcAnswer = multiply([+firstNum, +secondNum]);
  } else if (task === 'subtract') {
    calcAnswer = subtract(+firstNum, +secondNum);
  } else if (task === 'add') {
    calcAnswer = add(+firstNum, +secondNum);
  }
  action = '';
  num1 = '';
  num2 = '';
  if (calcAnswer !== 'NOPE🙈') {
    return roundNumber(calcAnswer);
  }
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

function setOperatorsState(state) {
  operators.forEach((operator) => {
    if (state === 'disable' || calcAnswer === 'NOPE🙈' || calcAnswer === Infinity) {
      operator.setAttribute('disabled', '');
    } else if (state === 'enable') {
      operator.removeAttribute('disabled', '');
    }
  });
}

function setEqualsButtonState(state) {
  if (action === '' || state === 'disable') {
    equals.setAttribute('disabled', '');
  } else {
    equals.removeAttribute('disabled', '');
  }
}

function operate(button) {
  decimal.removeAttribute('disabled', '');
  if (num1 === '') {
    num1 = input.textContent;
    action = button.id;
  } else if (num1 !== '' && action !== '') {
    num2 = input.textContent;
    history.textContent = showCalculation(action);
    num1 = calculate(action, num1, num2);
    action = button.id;
  }
  setOperatorsState('disable');
  setEqualsButtonState('disable');
  input.textContent = '';
}

function clearSymbols(task) {
  if (task === 'clear') {
    setOperatorsState('enable');
    decimal.removeAttribute('disabled', '');
    equals.removeAttribute('disabled', '');
    history.textContent = '';
    input.textContent = '';
    calcHistory = '';
    calcAnswer = '';
    action = '';
    num1 = '';
    num2 = '';
  } else if (task === 'back') {
    input.textContent = input.textContent.slice(0, -1);
    if (!input.textContent.includes('.')) {
      decimal.removeAttribute('disabled', '');
    }
  }
}

function showNumber(button) {
  if (action === 'equals' || calcAnswer === 'NOPE🙈' || calcAnswer === Infinity) {
    clearSymbols('clear');
  }
  if (input.textContent === '0') {
    input.textContent = button.textContent;
  } else {
    input.textContent += button.textContent;
  }
  setEqualsButtonState();
  setOperatorsState('enable');
}

function showDecimal(button) {
  if (calcAnswer !== '' && action === 'equals') {
    clearSymbols('clear');
    input.textContent += button.textContent;
  } else if (input.textContent === '' || input.textContent === '.') {
    input.textContent = button.textContent;
  } else if (input.textContent !== '' && input.textContent.includes('.')) {
    button.setAttribute('disabled', '');
  } else {
    input.textContent += button.textContent;
  }
}

function listenButtons() {
  symbols.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('number')) {
        showNumber(button);
      } else if (button.classList.contains('operator')) {
        operate(button);
      } else if (button.id === 'decimal') {
        showDecimal(button);
      } else if (button.id === 'equals') {
        operate(button);
        setOperatorsState('enable');
      } else if (button.id === 'clear') {
        clearSymbols('clear');
      } else if (button.id === 'back') {
        clearSymbols('back');
      }
    });
  });
  // KEYBOARD SUPPORT
  const operatorsObj = {
    '^': 'power',
    '/': 'divide',
    '*': 'multiply',
    '-': 'subtract',
    '+': 'add',
  };
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.getElementById('clear').click();
    } else if (event.key === 'Backspace') {
      document.getElementById('back').click();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('equals').click();
    } else if (event.key === '.') {
      document.getElementById('decimal').click();
    } else if (event.key in operatorsObj) {
      document.getElementById(operatorsObj[event.key]).click();
    } else if (!Number.isNaN(event.key)) {
      document.getElementById(`number-${event.key}`).click();
    }
  });
}
listenButtons();
