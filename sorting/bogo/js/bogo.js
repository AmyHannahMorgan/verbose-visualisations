import {DeltaTime, deltaTimeEvent} from '/assets/js/modules/deltaTime.js'

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const lines = [];

for(let i = 0; i < canvas.width; i++) {
    lines.push(canvas.height * Math.random());
}

renderAllLines();


async function animate() {
    while(!sorted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderAllLines();
        sorted = true;
        for(let i = 0; i < lines.length; i++) {
            ctx.beginPath()
            ctx.moveTo(i, canvas.height - lines[i]);
            ctx.lineTo(i, canvas.height);
            if(lines[i] > lines[i + 1]) {
                ctx.strokeStyle = 'red';
                sorted = false;
                break;
            }
            else ctx.strokeStyle = 'green';

            ctx.stroke()

            await listnerPromise();
        }

        if(!sorted) {
            let sacrificalLines = [...lines];
            let newOrder = []
            while(sacrificalLines.length !== 0) {
                newOrder.push(sacrificalLines.splice(nonInclusiveRNG(0, sacrificalLines.length)));
                highlightLines(newOrder, 'black');

                await listnerPromise();
            }

            
        }
    }
}

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

function nonInclusiveRNG(min, max) {
    min = Math.ciel(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}