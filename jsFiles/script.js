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
    return firstNum/secondNum;
}

function power(firstNum, secondNum){
    return firstNum**secondNum;
}

function remainder(firstNum, secondNum){
    return firstNum%secondNum;
}

function operate(firstNum, secondNum, operator){
    const ans = operator === '+' ? add(firstNum, secondNum) :
                operator === '-' ? subtract(firstNum, secondNum) :
                operator === 'X' ? multiply(firstNum, secondNum) :
                operator === '÷' ? divide(firstNum, secondNum) :
                operator === '^' ? power(firstNum, secondNum) :
                operator === '%' ? remainder(firstNum, secondNum) : 'invalid operator'; 
    return ans;
}

const buttonNodelist = document.querySelectorAll('button');

buttonNodelist.forEach(button => button.addEventListener('click', display));
let firstNum, secondNum, operator, secondNumStart, clickedAfterResult;
const operatorsArray = ['add', 'subtract', 'multiply', 'divide', 'power', 'remainder'];

function clear(){
    firstNum = undefined;
    secondNum = undefined;
    operator = '';
    secondNumStart = undefined;
    document.querySelector('.display').textContent = '';
}

function isTargetClassOperator(str){
    return operatorsArray.includes(str);
}

function display(e){
    const text = e.target.innerText;
    const targetClass = e.target.className;
    if(targetClass==='clear' || targetClass==='erase'){
        if(targetClass==='clear'){
            clear();
        }
        return;
    } 

    const displayDiv = document.querySelector('.display');
    if(clickedAfterResult === true && !isTargetClassOperator(targetClass)){
        clickedAfterResult = false;
        displayDiv.textContent = '';
        clear();
    }
    if(isTargetClassOperator(targetClass)){
        if(firstNum==undefined) firstNum = parseInt(displayDiv.textContent);
        operator = text;
        secondNumStart = displayDiv.textContent.length+1;
    }else if(targetClass==='equals'){
        const secondString = displayDiv.textContent.substring(secondNumStart, displayDiv.textContent.length);
        secondNum = parseInt(secondString);
        const ans = operate(firstNum, secondNum, operator);
        firstNum = ans;
        displayDiv.textContent = ans;
        clickedAfterResult = true;
    }
    if(targetClass!=='equals') displayDiv.textContent += text;
}