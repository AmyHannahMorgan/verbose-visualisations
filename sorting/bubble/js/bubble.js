import {DeltaTime, deltaTimeEvent} from '/assets/js/modules/deltaTime.js'

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const dt = new DeltaTime(1000, animCallback);

dt.start();

canvas.addEventListener('deltaTime', () => console.log('fired'));

const lines = [];

for(let i = 0; i < canvas.width; i++) {
    lines.push(canvas.height * Math.random());
}

lines.map((line, i) => {
    ctx.beginPath();
    ctx.moveTo(i, canvas.height - line);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
});

function animCallback() {
    canvas.dispatchEvent(deltaTimeEvent);
}