function createDivXAmount(container, row, column, rowClassIdentifier="row", columnClassIdentifier="column",textContent){
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

const keysDiv = document.querySelector(".keys");
const contents = [7,8,9,"%",4,5,6,"x",1,2,3,"-",0,".","=","+"];

createDivXAmount(keysDiv,4,4,"row","column",contents);