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

function operate(firstNum, secondNum, operator){
    const ans = operator === '+' ? add(firstNum, secondNum) :
                operator === '-' ? subtract(firstNum, secondNum) :
                operator === '*' ? multiply(firstNum, secondNum) :
                operator === '/' ? divide(firstNum, secondNum) : 'invalid operator'; 

    return ans;
}