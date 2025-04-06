// Global Variables

const canvas = document.getElementById('game');
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete
const width = canvas.width;
const height = canvas.height;
const context = canvas.getContext('2d');

// Draw Circle

function fullCircle(context, x, y, radius, colour = 'green') {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = colour;
    context.fill();
}

// Animation Frames - Event Loop

let start;
let x = width / 2;
let y = height / 2;
let radius = 32;
let dx = 100;
let dy = 100;

function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    const dt = (timestamp - start) / 1000;
    start = timestamp;

    // Bounce physics

    if (x + radius >= width || x - radius <= 0) {
        dx = dx * -1;
    }

    if (y + radius >= height || y - radius <= 0) {
        dy = dy * -1;
    }

    // Position update logic

    x += dx * dt;
    y += dy * dt;

    // Makes BG transparent - BG colour can now be changed in CSS
    context.clearRect(0, 0, width, height);

    // console.log(elapsed);

    fullCircle(context, x, y, radius, 'royalblue');

    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);
