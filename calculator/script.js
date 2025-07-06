const prev = document.querySelector('.prev');
const curr = document.querySelector('.curr');
let current = '0',
    previous = '',
    op = null,
    reset = false;

function update() {
    curr.textContent = current;
    prev.textContent = op ? `${previous} ${op}` : '';
}

function calculate() {
    const a = parseFloat(previous),
        b = parseFloat(current);
    if (isNaN(a) || isNaN(b)) return;
    switch (op) {
        case '+':
            current = a + b;
            break;
        case '−':
            current = a - b;
            break;
        case '×':
            current = a * b;
            break;
        case '÷':
            current = b ? a / b : 'ERROR';
            break;
        case '%':
            current = a % b;
            break;
    }
    current = current.toString();
    op = null;
    previous = '';
    reset = true;
    update();
}

document.querySelectorAll('button').forEach(btn => {
    btn.onclick = () => {
        const val = btn.textContent;

        if (!isNaN(val) || val === '.') {
            if (reset || current === '0') current = '';
            reset = false;
            if (val === '.' && current.includes('.')) return;
            current += val;
        } else if (btn.classList.contains('op')) {
            if (op && !reset) calculate();
            previous = current;
            op = val;
            reset = true;
        } else if (btn.classList.contains('equals')) {
            calculate();
        } else if (btn.classList.contains('clear')) {
            current = '0';
            previous = '';
            op = null;
        } else if (btn.classList.contains('delete')) {
            current = current.length > 1 ? current.slice(0, -1) : '0';
        }
        update();
    };
});