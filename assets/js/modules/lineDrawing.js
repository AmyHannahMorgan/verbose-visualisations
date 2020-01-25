function renderAllLines(array, context, canvas) {
    array.map((line, i) => {
        context.beginPath();
        context.moveTo(i, canvas.height - line);
        context.lineTo(i, canvas.height);
        context.stroke();
    });
}

function highlightLines(array, color, context, canvas) {
    context.strokeStyle = color !== undefined ? color : 'blue';
    array.map((line, i) => {
        context.beginPath();
        context.moveTo(i, canvas.height - line);
        context.lineTo(i, canvas.height);
        context.stroke();
    });
    context.strokeStyle = 'black';
}

export {renderAllLines, highlightLines};