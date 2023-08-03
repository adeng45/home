let displayVal = '0';
let exp = '0';
let display = document.querySelector('#display > .no-overflow > span');

const operators = ['+', '-', '*', '÷', '^', '%', '.'];

const setDisplay = (val) => {
    displayVal = val;
    display.textContent = displayVal;
}

const setExp = (val) => {
    exp = val;
}

// Delete values.
const del = (clearAll) => {
    if (displayVal === '') {
        return;
    }

    if (displayVal === 'Infinity' || displayVal === 'NaN' || clearAll || displayVal.length === 1) {
        setDisplay('0');
        setExp('0');
        return;
    }

    setDisplay(displayVal.slice(0, -1));
    setExp(exp.slice(0, -1));
}

// Evaluate expression.
const evaluate = () => {
    let value = eval(exp).toString();
    setDisplay(value);
    setExp(value);
}


const update = (value) => {

    //Don't want to start off with an operator.
    if (displayVal === '' && operators.includes(value))  {
        return;
    }

    //No consecutive operators.
    if (operators.includes(value) && operators.includes(displayVal.slice(-1))) {
        return;
    }

    //Special case of '÷'
    if (value === '÷') {
        setDisplay(displayVal + value);
        setExp(exp + '/');
        return;
    }

    //Leading 0
    if (displayVal === '0' && !operators.includes(value)) {
        setDisplay(value);
        setExp(value);
        return;
    }

    setDisplay(displayVal + value);
    setExp(exp + value);

}

document.querySelectorAll('.buttons > button').forEach((button) => {
    let func;
    if (button.textContent === 'C') {
        func = () => {
            del(true);
        }
    }
    else if (button.textContent === 'DEL') {
        func = () => {
            del(false);
        }
    }
    else if (button.textContent === '=') {
        func = () => {
            evaluate();
        }
    }
    else {
        func = () => {
            update(button.textContent);
        }
    }
    button.addEventListener('click', func);
})
