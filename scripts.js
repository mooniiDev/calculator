const symbols = document.querySelectorAll('.symbol');
const display = document.querySelector('#display');
let number1 = '';

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

function operate() {
  symbols.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.id === 'clear') {
        display.textContent = ''
      }
      else if (button.id === 'back') {
        display.textContent = display.textContent.slice(0, -1);
      } else if (button.classList.contains('number')) {
        display.textContent = display.textContent + button.textContent;
      }
      number1 = display.textContent;
    })
  })
}
operate();
