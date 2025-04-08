// Global Variables

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const radius = 48;
const speed = 600;
let x = 0;
let y = 0;

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

// Tracking Key State - prevents object flying off the screen

const keyState = {
    'KeyW': false,
    'KeyS': false,
    'KeyA': false,
    'KeyD': false,
};

// Object Direction

const directionMap = {
    'KeyW': new v2(0, -1),
    'KeyS': new v2(0, 1),
    'KeyA': new v2(-1, 0),
    'KeyD': new v2(1, 0),
    // 'Space': new v2()
};

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

class TutorialPopup {
    constructor(text) {
        this.alpha = 0.0;
        this.dalpha = 0.0;
        this.text = text;
    }

    update(dt) {

    }

    render(context) {
        const width = context.canvas.width;
        const height = context.canvas.height;

        context.translate(width / 2, height / 2);
        context.fillStyle = 'white';
        context.font = '18px VT323';
        context.textAlign = 'center';
        context.fillText(this.text, 0, height / 3);
    }

    fadeIn() {
        this.dalpha = 1.0;
        this.alpha = 0.0;
    }

    fadeOut() {
        this.dalpha = -1.0;
        this.alpha = 1.0;
    }
}

class Game {
    constructor() {
        this.pos = new v2(radius + 10, radius + 10);
        this.popup = new TutorialPopup("Press 'W', 'S', 'A' or 'D' to move around.");
        this.vel = new v2(0, 0);

        canvas.addEventListener('keydown', (event) => this.keyDown(event));
        canvas.addEventListener('keyup', (event) => this.keyUp(event));
    }

    update(dt) {
        this.pos = this.pos.add(this.vel.scale(dt));
        this.popup.update(dt);
    }

    render(context) {
        const width = context.canvas.width;
        const height = context.canvas.height;

        // Makes BG transparent - BG colour can now be changed in CSS
        context.clearRect(0, 0, width, height);

        // Draw Circle
        fullCircle(context, this.pos, radius, 'royalblue');

        // Instructions
        this.popup.render(context);
    }

    keyDown(event) {
        if (event.code in directionMap && !keyState[event.code]) {
            keyState[event.code] = true; // Set key state to pressed
            this.vel = this.vel.add(directionMap[event.code].scale(speed));
        }
    }

    keyUp(event) {
        if (event.code in directionMap) {
            keyState[event.code] = false; // Set key state to not pressed
            this.vel = this.vel.sub(directionMap[event.code]);

            // Reset the corresponding velocity component to zero else it compounds
            if (event.code === 'KeyW' || event.code === 'KeyS') {
                this.vel.y = 0; // Reset vertical velocity
            } else if (event.code === 'KeyA' || event.code === 'KeyD') {
                this.vel.x = 0; // Reset horizontal velocity
            }
        }
    }
}

const game = new Game();

// Animation Frames - Event Loop

let start;

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

    game.update(dt);
    game.render(context);

    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

// Audio Calls

/*     if (x + radius >= width || x - radius <= 0) {
        // dx = dx * -1;
        sfxBounce.pause();
        sfxBounce.currentTime = 0; // reset playhead
        sfxBounce.play();
    }
 
    if (y + radius >= height || y - radius <= 0) {
        // dy = dy * -1;
        sfxBounce.pause();
        sfxBounce.currentTime = 0; // reset playhead
        sfxBounce.play();
    } */