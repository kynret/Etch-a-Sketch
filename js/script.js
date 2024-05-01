const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let mouseDown = false;
let colorR;
let colorG;
let colorB;
let randomMode = false;

const board = document.querySelector(".board");
const displaySize = document.querySelector(".gridSize");
const slider = document.querySelector(".gridSlider");
const resetBtn = document.querySelector(".reset");
const colorPicker = document.querySelector(".colorPicker");
const randomColor = document.querySelector(".randomColor");

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

resetBtn.addEventListener("click", () =>{
    reset();
});

slider.addEventListener("change", () =>{
    board.innerHTML = "";
    currentSize = slider.value;
    displaySize.innerHTML = currentSize + "px";
    return  generate(currentSize);
});

colorPicker.addEventListener("change", () =>{
    randomMode = false;
    currentColor = colorPicker.value;
    return currentColor;
});

randomColor.addEventListener("click", ()=>{
    randomMode = true;
});

function generate(size){
    for(let i = 1; i <= (size*size); i++){
        let div = document.createElement("div");

        div.style.width = 512/size + "px";
        div.style.height = 512/size+ "px";
        div.addEventListener("mouseover", changeColor);
        div.addEventListener("mousedown",changeColor);

        board.appendChild(div);
    }
}

function randomizeColor(){
    colorR = Math.floor(Math.random()*256);
    colorG = Math.floor(Math.random()*256);
    colorB = Math.floor(Math.random()*256);
    return currentColor = "rgb("+colorR+", " + colorG +", "+ colorB+")";
}

function changeColor(e){
    if(e.type == "mouseover" &&  !mouseDown) return
    e.target.style.backgroundColor = currentColor;
    if(randomMode == true) return e.target.style.backgroundColor = randomizeColor();
}

function reset(){
    board.innerHTML = "";
    generate(currentSize);
}


window.onload = () =>{
    generate(DEFAULT_SIZE);
    slider.value  = DEFAULT_SIZE;
    displaySize.innerHTML = DEFAULT_SIZE + "px";
    colorPicker.value = DEFAULT_COLOR;
}