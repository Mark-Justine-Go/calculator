function createDivXAmount(container, row, column, rowClassIdentifier, columnClassIdentifier,textContent){
    let currCount = 0;
    for(let i = 0; i < row; i++){
        const rowDiv = document.createElement("div");
        rowDiv.classList.add(rowClassIdentifier);
        for(let j = 0; j < column; j++){
            const columnDiv = document.createElement("div");
            columnDiv.classList.add(columnClassIdentifier);
            columnDiv.textContent = textContent[currCount];
            currCount++
            rowDiv.appendChild(columnDiv);
        }
        container.appendChild(rowDiv);
    }
}

function display(displayContainer, value){
    if(isAValidInput(value))displayContainer.textContent += value;
}

function assignListeners(nodes,displayDiv){
    nodes.forEach(function(node){
        const assignedValue = node.textContent;
        if(arithmeticOperations.includes(node.textContent)){
            node.addEventListener("click",(e)=>operate(assignedValue));
        }else{
            node.addEventListener("click",(e)=>display(displayDiv,assignedValue));
        }
    })
}

function calculate(expression){
    const operand1 = Number(expression[0]);
    const operand2 = Number(expression[2]);
    const operator = expression[1];
    switch(operator){
        case "+":
            result = operand1 + operand2;
            break
        case "-":
            result = operand1 - operand2;
            break
        case "x":
            result = operand1 * operand2;
            break
        case "/":
            result = operand1 / operand2;
            break
    }

    return result;
}

function isAValidExpression(expression){
    if(expression.length === 3 && typeof(Number(expression[2])) === "number" && expression[2] != "") {
        return true
    }
    return false
}

function isAValidInput(value){
    const expression = displayDiv.textContent.split(" ").filter(item => item != "");
    switch(value){
        case "0":
            return (expression.length === 0 || expression.length === 2) ? false : true 
        case ".":
            return (expression.length === 0 || expression.length === 2) ? false : 
            ((expression.length === 1 && expression[0].includes(".")) || 
             (expression.length === 3 && expression[2].includes("."))) ? false : true
        default:
            return true
    }
}

function operate(operator){
    const expression = displayDiv.textContent.split(" ").filter(item => item != "");
    if(isAValidExpression(expression)){
        displayDiv.textContent = (operator != "=") ? `${calculate(expression)} ${operator} ` : `${calculate(expression)}`;
    }else{
        if(arithmeticOperations.includes(expression[expression.length-1]) || expression[expression.length-1] === ""){
            const original = displayDiv.textContent.slice(0,-2);
            if(operator != "=")displayDiv.textContent = `${original} ${operator} `;
        }else{
            if(operator != "=")displayDiv.textContent += ` ${operator} `
        }
    }
}


const keyContents = [7,8,9,"/",4,5,6,"x",1,2,3,"-",0,".","=","+"];
const arithmeticOperations = ["+","/","x","-","="];
const keysDiv = document.querySelector(".keys");
const displayDiv = document.querySelector(".screen");

createDivXAmount(keysDiv,4,4,"row","column",keyContents);

const keys = document.querySelectorAll(".column");
assignListeners(keys,displayDiv);

//clear and delete