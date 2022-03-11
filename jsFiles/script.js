function add(firstNum, secondNum){
    return firstNum+secondNum;
}

function subtract(firstNum, secondNum){
    return firstNum-secondNum;
}

function multiply(firstNum, secondNum){
    return firstNum*secondNum;
}

function divide(firstNum, secondNum){
    if(secondNum == 0) return "Invalid Operation";
    return firstNum/secondNum;
}

function power(firstNum, secondNum){
    return firstNum**secondNum;
}

function remainder(firstNum, secondNum){
    return firstNum%secondNum;
}

function operate(firstNum, secondNum, operator){
    console.log(firstNum, secondNum, operator);
    const ans = operator === '+' ? add(firstNum, secondNum) :
                operator === '-' ? subtract(firstNum, secondNum) :
                (operator === 'X'  || operator === 'x' || operator ==='*') ? multiply(firstNum, secondNum) :
                (operator === '÷' || operator ==='/') ? divide(firstNum, secondNum) :
                operator === '^' ? power(firstNum, secondNum) :
                operator === '%' ? remainder(firstNum, secondNum) : 'Invalid operator';
    console.log(ans);
    return ans;
}

const buttonNodelist = document.querySelectorAll('button');
buttonNodelist.forEach(button => button.addEventListener('click', display));

let clickedAfterResult, isDecimal = false;
const operatorsArray = ['add', 'subtract', 'multiply', 'divide', 'power', 'remainder', ''];
const actualOperators = ['+', '-', 'X', 'x', '*', '÷', '/', '^', '%', '.', '='];
const keyToClass = {
    '0': 'zero',
    '1': 'one', 
    '2': 'two', 
    '3': 'three', 
    '4': 'four', 
    '5': 'five',
    '6': 'six', 
    '7': 'seven', 
    '8': 'eight', 
    '9': 'nine', 
    '+': 'add', 
    '-': 'subtract', 
    '*': 'multiply', 
    'X': 'multiply', 
    'x': 'multiply', 
    '/': 'divide', 
    '^': 'power',
    '%': 'remainder', 
    '.': 'decimal',
    'Backspace': 'erase',
    '=': 'equals', 
};

function clear(){
    console.log("clearing display");
    document.querySelector('.display').textContent = '';
    clickedAfterResult = false;
    enableDecimal();
}

function isTargetClassOperator(str){
    return (actualOperators.includes(str) || operatorsArray.includes(str));
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function evaluateExpression(expression){
    console.log(expression);

    if(isTargetClassOperator(expression[0]) || isTargetClassOperator(expression[expression.length-1])){
        clear();
        return "Invalid Input";
    }
    if(expression[0]==='.'){
        expression = '0' + expression;
    }
    if(expression[expression.length-1]==='.'){
        expression += '0';
    }

    let numOne, numTwo, expLen = expression.length, operator, secondStart;

    for(let i = 0 ; i < expLen ; i++){
        if(isTargetClassOperator(expression[i])){
            if(numOne==undefined){
                numOne = parseFloat(expression.substring(0, i));
                secondStart = i+1;
            }
            else{
                numTwo = parseFloat(expression.substring(secondStart, i));
                console.log(numTwo, operator);
                numOne = operate(numOne, numTwo, operator);
                if(isNaN(numOne)) return "Invalid Operation";
                secondStart = i+1;
            }
            operator = expression[i];
            console.log(numOne, numTwo, operator);
        }
    }
    console.log(numOne, numTwo, operator);          
    const ans = operate(numOne, parseFloat(expression.substring(secondStart, expLen)), operator);
    const finalAns = roundToTwo(ans);
    return (isNaN(finalAns)) ? "Invalid Operation" : finalAns;  
}

function enableDecimal(){
    document.querySelector('.decimal').disabled = false;
    isDecimal = false;
}
function disableDecimal(){
    document.querySelector('.decimal').disabled = true;
    isDecimal = true;
}

function display(e){
    const text = e.target.innerText;
    const targetClass = e.target.className;
    const displayDiv = document.querySelector('.display');
    const displayDivContent = displayDiv.textContent;

    if(targetClass==='clear' || targetClass==='erase'){
        if(targetClass==='clear'){
            clear();
        }
        else if(targetClass==='erase'){
            const len = displayDivContent.length;
            if(displayDivContent[len-1]==='.') enableDecimal();
            if(len!==0) displayDiv.textContent = displayDivContent.slice(0, len-1);
        }
        return;
    }

    if(targetClass==='decimal' && !isDecimal){
        disableDecimal();               
    }
    if(isTargetClassOperator(targetClass) && isDecimal){
        enableDecimal();     
    }

    if(clickedAfterResult === true && !isTargetClassOperator(targetClass)){
        console.log('removing after result');
        clickedAfterResult = false;
        displayDiv.textContent = '';
        clear();
    }else clickedAfterResult = false;

    if(targetClass==='equals'){
        console.log(displayDiv.textContent);
        displayDiv.textContent = evaluateExpression(displayDiv.textContent);
        clickedAfterResult = true;
        enableDecimal();
    }
    else displayDiv.textContent += text;
}

document.addEventListener('keydown', whichKey);
function whichKey(e){
    const key = e.key;
    console.log(key);
    if(key in keyToClass) document.querySelector(`.${keyToClass[key]}`).click();
}