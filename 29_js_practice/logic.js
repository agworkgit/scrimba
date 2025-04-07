// Global Variables

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// Draw Circle

function fullCircle(context, center, radius, colour = 'green') {
    context.beginPath();
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = colour;
    context.fill();
}

// Sounds

let sfxBounce = document.createElement('audio');
sfxBounce.setAttribute('id', 'bounce-sfx');
sfxBounce.setAttribute('src', './assets/sfx/wall-bounce.mp3');
document.body.append(sfxBounce);

// Classes

class v2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(that) {
        return new v2(this.x + that.x, this.y + that.y);
    }

    sub(that) {
        return new v2(this.x - that.x, this.y - that.y);
    }

    scale(scalar) {
        return new v2(this.x * scalar, this.y * scalar);
    }
}

// Animation Frames - Event Loop

let start;

let radius = 32;
let x = radius + 10;
let y = radius + 10;
let pos = new v2(x, y);
let vel = new v2(0, 0);
let speed = 500;
// let dx = speed;
// let dy = speed;

// Object Direction

let directionMap = {
    'KeyW': new v2(0, -speed),
    'KeyS': new v2(0, speed),
    'KeyA': new v2(-speed, 0),
    'KeyD': new v2(speed, 0),
    // 'Space': new v2()
};

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
        sfxBounce.pause();
        sfxBounce.currentTime = 0; // reset playhead
        // sfxBounce.play();
    }

    if (y + radius >= height || y - radius <= 0) {
        dy = dy * -1;
        sfxBounce.pause();
        sfxBounce.currentTime = 0; // reset playhead
        // sfxBounce.play();
    }

    // Position update logic

    pos = pos.add(vel.scale(dt)); // equal to below
    // x += dx * dt;
    // y += dy * dt;

    // Makes BG transparent - BG colour can now be changed in CSS
    context.clearRect(0, 0, width, height);

    // console.log(elapsed);

    fullCircle(context, pos, radius, 'royalblue');

    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

// Key press events

canvas.addEventListener('keydown', (event) => {
    // console.log('You pressed', event);
    if (event.code in directionMap) {
        vel = vel.add(directionMap[event.code]);
    }
});

canvas.addEventListener('keyup', (event) => {
    // console.log('You pressed', event);
    if (event.code in directionMap) {
        vel = vel.sub(directionMap[event.code]);
    }
});