import {DeltaTime, deltaTimeEvent} from '/assets/js/modules/deltaTime.js'

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const lines = [];

for(let i = 0; i < canvas.width; i++) {
    lines.push(canvas.height * Math.random());
}

renderAllLines();

function renderAllLines() {
    lines.map((line, i) => {
        ctx.beginPath();
        ctx.moveTo(i, canvas.height - line);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    });
}

function highlightLines(ar, color) {
    ctx.strokeStyle = color !== undefined ? color : 'blue';
    ar.map((line, i) => {
        ctx.beginPath();
        ctx.moveTo(i, canvas.height - line);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    });
    ctx.strokeStyle = 'black';
}

function listnerPromise() {
    return new Promise((res, reg) => {
        canvas.addEventListener('deltaTime', function foo() {
            res();
            canvas.removeEventListener('deltaTime', foo);
        });
    })
}

function animCallback() {
    canvas.dispatchEvent(deltaTimeEvent);
}