import {DeltaTime, deltaTimeEvent} from '/assets/js/modules/deltaTime.js'

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const dt = new DeltaTime(1000, animCallback);

dt.start();

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

animate();

lines.map((line, i) => {
    ctx.beginPath();
    ctx.moveTo(i, canvas.height - line);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
});

async function animate() {
    let sorted = false;
    while(!sorted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

            ctx.strokeStyle = 'black';
        }

        if(!sorted) {
            for(let i = 0; i < lines.length; i++) {
                if(lines[i] > lines[i + 1]) {
                    let swap = lines[i + 1];
                    lines[i + 1] = lines[i];
                    lines[i] = swap;
                }
            }
        }
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