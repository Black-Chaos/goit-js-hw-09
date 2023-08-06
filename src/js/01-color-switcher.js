import { getRandomHexColor } from "./partials/randomfn";

const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
let ID = null

start.addEventListener('click', startChangeColor)
stop.addEventListener('click', stopChangeColor)

function startChangeColor() {
    ID = setInterval(() => document.body.style.backgroundColor = getRandomHexColor(), 1000)
    start.disabled = true;
    stop.disabled = false;
}

function stopChangeColor() {
    clearInterval(ID);
    start.disabled = false;
    stop.disabled = true;
}