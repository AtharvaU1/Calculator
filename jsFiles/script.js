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
    console.log(firstNum, secondNum, operator);       //
    const ans = operator === '+' ? add(firstNum, secondNum) :
                operator === '-' ? subtract(firstNum, secondNum) :
                operator === 'X' ? multiply(firstNum, secondNum) :
                operator === '÷' ? divide(firstNum, secondNum) :
                operator === '^' ? power(firstNum, secondNum) :
                operator === '%' ? remainder(firstNum, secondNum) : 'Invalid operator';
    console.log(ans);
    return ans;
}

const buttonNodelist = document.querySelectorAll('button');

buttonNodelist.forEach(button => button.addEventListener('click', display));
//let firstNum, secondNum, operator, secondNumStart, clickedAfterResult;
let clickedAfterResult;
const operatorsArray = ['add', 'subtract', 'multiply', 'divide', 'power', 'remainder'];
const actualOperators = ['+', '-', 'X', '÷', '^', '%'];
// let operatorObject = {
//     '+': 'add',
//     '-': 'subtract', 
//     'X': 'multiply', 
//     '÷': 'divide', 
//     '^':'power', 
//     '%': 'remainder',
// };

function clear(){
    // firstNum = undefined;
    // secondNum = undefined;
    // operator = '';
    // secondNumStart = undefined;
    document.querySelector('.display').textContent = '';
    clickedAfterResult = false;
}

function isTargetClassOperator(str){
    return (actualOperators.includes(str) || operatorsArray.includes(str));
}

function evaluateExpression(expression){
    console.log(expression);

    let ans = 0;
    let numOne, numTwo, expLen = expression.length, operator, secondStart;

    if(isTargetClassOperator(expression[0]) || isTargetClassOperator(expression[expLen-1])){
        clear();
        return "Invalid Input."
    }

    for(let i = 0 ; i < expLen ; i++){
        if(isTargetClassOperator(expression[i])){
            if(numOne==undefined){
                numOne = parseInt(expression.substring(0, i));
                secondStart = i+1;
            }
            else{
                numTwo = parseInt(expression.substring(secondStart, i));
                console.log(numTwo, operator);
                numOne = operate(numOne, numTwo, operator);
                secondStart = i+1;
            }
            operator = expression[i];
            console.log(numOne, numTwo, operator);
        }
    }
    console.log(numOne, numTwo, operator);          //
    return operate(numOne, parseInt(expression.substring(secondStart, expLen)), operator);

    //return ans;
}

function display(e){
    const text = e.target.innerText;
    const targetClass = e.target.className;
    if(targetClass==='clear' || targetClass==='erase'){ // yet to implement erase()
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
    }else{
        clickedAfterResult = false;
    }
    if(targetClass==='equals'){
        console.log(displayDiv.textContent);        //
        displayDiv.textContent = evaluateExpression(displayDiv.textContent);
        clickedAfterResult = true;
    }
    if(targetClass!=='equals') displayDiv.textContent += text;
}

// if(isTargetClassOperator(targetClass)){
    //     if(firstNum==undefined) firstNum = parseInt(displayDiv.textContent);
    //     operator = text;
    //     secondNumStart = displayDiv.textContent.length+1;
    // }else if(targetClass==='equals'){
    //     const secondString = displayDiv.textContent.substring(secondNumStart, displayDiv.textContent.length);
    //     secondNum = parseInt(secondString);
    //     const ans = operate(firstNum, secondNum, operator);
    //     firstNum = ans;
    //     displayDiv.textContent = ans;
    //     clickedAfterResult = true;
    // }