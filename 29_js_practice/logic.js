// Global Variables

const canvas = document.getElementById('game');
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

let radius = 32;
let x = radius + 10;
let y = radius + 10;
let speed = 250;
let dx = speed;
let dy = speed;

function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    const dt = (timestamp - start) / 1000;
    start = timestamp;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

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