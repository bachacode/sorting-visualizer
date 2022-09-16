let randomizeArray = document.getElementById("randomize-array__btn");
let sortBtn = document.getElementById("sort__btn");
let barsContainer = document.getElementById("bars-container");
let minRange = 1;
let maxRange = 20;
let barAmount = 20;
let unsortedArray = new Array(barAmount);

function randomNum(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray(){
    for (let i = 0; i < barAmount; i++){
        unsortedArray[i] = randomNum(minRange, maxRange);
    }
    return unsortedArray;
}

document.addEventListener("DOMContentLoaded", function(){
    createRandomArray();
    renderBars(unsortedArray);
});

function renderBars(array){
    for (let i = 0; i < array.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * 10 + "px";
        barsContainer.appendChild(bar);
    }
}

randomizeArray.addEventListener("click", function(){
    createRandomArray();
    barsContainer.innerHTML = "";
    renderBars(unsortedArray);
});

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(array){
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if(array[j] > array[j + 1]){
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "white";
                    }                    
                }
                let temp = array[j];
                array[j] = array[j +1];
                array[j + 1] = temp;
                bars[j].style.height = array[j] * 10 + "px";
                bars[j].style.backgroundColor = "lightgreen";
                //bars[j].innerText = array[j];
                bars[j + 1].style.height = array[j + 1] * 10 + "px";
                bars[j + 1].style.backgroundColor = "lightgreen";
                //bars[j + 1].innerText = array[j + 1];
                await sleep(30);
            }
        }
        await sleep(30);        
    }
    return array;
}

sortBtn.addEventListener("click", function(){
    let sortedArray = bubbleSort(unsortedArray);
    console.log(sortedArray);
})