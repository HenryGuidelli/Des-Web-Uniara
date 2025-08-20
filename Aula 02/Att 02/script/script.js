function appendValue(value) {
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function calculateResult() {
  try {
    const result = eval(document.getElementById('display').value);
    document.getElementById('display').value = result;
  } catch (error) {
    alert('Expressão inválida');
  }
}

document.addEventListener('keydown', function (event) {
  const display = document.getElementById('display');
  const key = event.key;

  const allowedKeys = '0123456789+-*/().';

  if (allowedKeys.includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculateResult();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
