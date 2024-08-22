// Author: Abuabkr batalvi
var z = 1 / 4;
var i, j, x, y;
let isDragging = false;
var mathX, mathY;
let n = 1000 / z;
var spacingX, spacingY;
let startX, startY;
const viewport = {
    xMin: -10 / z,
    xMax: 10 / z,
    yMin: -10 / z,
    yMax: 10 / z
}
xMin = -10 / z, xMax = 10 / z, yMin = -10 / z, yMax = 10 / z;
let xShift = 0;
let yShift = 0;

const math = window.math;
expr = 'sin(x)*x/2',
    scope = { x: 0 },
    tree = math.parse(expr, scope);


const c = document.getElementById("myCanvas");
const ctc = c.getContext("2d");



ctc.fillStyle = "grey";
ctc.fillRect(0, 0, 1920, 1080);


// initial landing page for users
drawCurve();

document.getElementById("myTextbox").addEventListener("input", (e) => {
    expr = e.target.value;
    try {
        tree = math.parse(expr, scope);
        drawCurve(expr);
    } catch (err) {
        console.error("Invalid expression");
    }
    // center the view of the canvas where the graph is drawn
    // some heuristic for what part fo the graph to center on
    // ideally, this center should be representative of the graph
    // from a conceptual viewpoint
});


function adjustLimits() {
    let xRange = xMax - xMin;
    let yRange = yMax - yMin;
    xMin -= ((xShift / c.width) * xRange) / z;
    xMax -= ((xShift / c.width) * xRange) / z;
    yMin -= ((yShift / c.height) * yRange) / z;
    yMax -= ((yShift / c.height) * yRange) / z;
}

function drawCurve() {
    var k = -210;

    ctc.fillStyle = "grey";
    ctc.fillRect(0, 0, 1920, 1080);

    ctc.beginPath();
    for (let j = -5; j <= n - k; j++) {
        spacingX = j / (n);
        mathX = spacingX * (xMax - xMin) + xMin;
        mathY = evaluate(mathX);
        spacingY = (-1 * mathY - yMin) / (yMax - yMin);

        x = spacingX * (c.width);
        y = spacingY * (c.height);

        ctc.lineTo(x + k, y);

        if (j === 0) {
            ctc.moveTo(x + k, y);
        } else {
            ctc.lineTo(x + k, y);
        }
    }
    ctc.strokeStyle = "red"
    ctc.lineWidth = 5
    ctc.stroke();
    // update the user view based on the function
}

function evaluate(mathX) {
    scope.x = mathX
    return tree.evaluate(scope);
}

c.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

c.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let x_1 = e.clientX - startX;
        let y_1 = e.clientY - startY;
        xShift = x_1 * z;
        yShift = y_1 * z;
        ctc.clearRect(0, 0, c.width, c.height);
        adjustLimits();
        drawCurve();
        startX = e.clientX;
        startY = e.clientY;
    }
});

c.addEventListener('mouseup', () => {
    isDragging = false;
    xShift = 0;
    yShift = 0;
});

c.addEventListener('mouseleave', () => {
    isDragging = false;
    xShift = 0;
    yShift = 0;
});

function tabSize() {
    setInterval(function () { console.log(window.innerWidth) }, 100);
}