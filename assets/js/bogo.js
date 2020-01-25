import {DeltaTime, deltaTimeEvent} from '/assets/js/modules/deltaTime.js';
import {renderAllLines, highlightLines} from '/assets/js/modules/lineDrawing.js';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const dt = new DeltaTime(1, animCallback);

dt.start();

const lines = [];

for(let i = 0; i < canvas.width; i++) {
    lines.push(canvas.height * Math.random());
}

renderAllLines(lines, ctx, canvas);

animate();

async function animate() {
    let sorted = false;
    while(!sorted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderAllLines(lines, ctx, canvas);
        sorted = true;
        for(let i = 0; i < lines.length; i++) {
            ctx.beginPath()
            ctx.moveTo(i, canvas.height - lines[i]);
            ctx.lineTo(i, canvas.height);
            if(lines[i] > lines[i + 1]) {
                ctx.strokeStyle = 'red';
                sorted = false;
            }
            else ctx.strokeStyle = 'green';

            ctx.stroke()

            await listnerPromise();
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if(!sorted) {
            let sacrificalLines = [...lines];
            let newOrder = []
            while(sacrificalLines.length !== 0) {
                newOrder.push(sacrificalLines.splice(nonInclusiveRNG(0, sacrificalLines.length), 1));
                highlightLines(sacrificalLines, 'red', ctx, canvas);
                highlightLines(newOrder, 'black', ctx, canvas);

                await listnerPromise();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            
        }

        await listnerPromise();
    }
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
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}