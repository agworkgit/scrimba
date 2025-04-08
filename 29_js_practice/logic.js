// Global Variables

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const globalWidth = window.innerWidth;
const globalHeight = window.innerHeight;

const radius = 48;
const speed = 600;
let x = 0;
let y = 0;
const bulletRadius = 10;
const bulletSpeed = speed * 3;
const bulletLifetime = 5; // important - prevents memory overflow

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

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalise() {
        const n = this.length();
        return new v2(this.x / n, this.y / n);
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
sfxBounce.setAttribute('src', './assets/sfx/m4_suppressed.mp3');
document.body.append(sfxBounce);

// Game State Class

const tutorialState = Object.freeze({
    learningToMove: 0,
    learningToShoot: 1,
    finishedLearning: 2
});

const tutorialMessages = Object.freeze([
    "'W', 'S', 'A' or 'D' to move around.",
    "'LEFT MOUSE CLICK' to shoot.",
    ""
]);

class Tutorial {
    constructor() {
        this.state = 0;
        this.popup = new TutorialPopup(tutorialMessages[this.state]);
        this.popup.fadeIn();

        this.popup.onFadedOut = () => {
            this.popup.text = tutorialMessages[this.state];
            this.popup.fadeIn();
        };
    }

    update(dt) {
        this.popup.update(dt);
    }

    render(context) {
        this.popup.render(context);
    }

    playerMoved() {
        if (this.state == tutorialState.learningToMove) {
            this.popup.fadeOut();
            this.state += 1;
        }
    }

    playerShot() {
        if (this.state == tutorialState.learningToShoot) {
            this.popup.fadeOut();
            this.state += 1;
        }
    }
};

// Classes

class TutorialPopup {
    constructor(text) {
        this.alpha = 0.0;
        this.dalpha = 0.0;
        this.text = text;
        this.onFadedOut = undefined;
        this.onFadedIn = undefined;
    }

    update(dt) {
        this.alpha += this.dalpha * dt;

        if (this.dalpha < 0.0 && this.alpha <= 0.0) {
            this.dalpha = 0.0;
            this.alpha = 0.0;

            if (this.onFadedOut !== undefined) {
                this.onFadedOut();
            }

        } else if (this.dalpha > 0.0 && this.alpha >= 1.0) {
            this.dalpha = 0.0;
            this.alpha = 1.0;

            if (this.onFadedIn !== undefined) {
                this.onFadedIn();
            }
        }
    }

    render(context) {
        context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        context.font = '18px VT323';
        context.textAlign = 'center';
        context.fillText(this.text, globalWidth / 2, globalHeight / 2 + 5);
    }

    fadeIn() {
        this.dalpha = 1.0;
    }

    fadeOut() {
        this.dalpha = -1.0;
    }
}

class Bullet {
    constructor(pos, vel) {
        this.pos = pos;
        this.vel = vel;
        this.lifetime = bulletLifetime;
    }

    update(dt) {
        this.pos = this.pos.add(this.vel.scale(dt));
        this.lifetime -= dt;
    }

    render(context) {
        fullCircle(context, this.pos, bulletRadius, 'rgb(255, 215, 96)');
    }
}

class Game {
    constructor() {
        this.playerPos = new v2(globalWidth / 2, globalHeight / 2);
        this.mousePos = new v2(0, 0);
        // this.pos = new v2(radius + 10, radius + 10);
        this.vel = new v2(0, 0);
        this.tutorial = new Tutorial();
        this.playerLearntToMove = false;
        this.bullets = [];

        canvas.addEventListener('keydown', (event) => this.keyDown(event));
        canvas.addEventListener('keyup', (event) => this.keyUp(event));
    }

    update(dt) {
        this.playerPos = this.playerPos.add(this.vel.scale(dt));
        this.tutorial.update(dt);

        for (let bullet of this.bullets) {
            bullet.update(dt);
        }

        this.bullets = this.bullets.filter((bullet) => bullet.lifetime > 0.0);
    }

    render(context) {
        const width = context.canvas.width;
        const height = context.canvas.height;

        // Makes BG transparent - BG colour can now be changed in CSS
        context.clearRect(0, 0, width, height);

        // Draw Circle
        fullCircle(context, this.playerPos, radius, 'royalblue');

        // Instructions
        this.tutorial.render(context);

        for (let bullet of this.bullets) {
            bullet.render(context);
        }
    }

    keyDown(event) {
        if (event.code in directionMap && !keyState[event.code]) {
            keyState[event.code] = true; // Set key state to pressed
            this.vel = this.vel.add(directionMap[event.code].scale(speed));
            this.tutorial.playerMoved();
        }
    }

    keyUp(event) {
        if (event.code in directionMap) {
            keyState[event.code] = false; // Set key state to not pressed
            this.vel = this.vel.sub(directionMap[event.code]);
            this.tutorial.playerMoved();

            // Reset the corresponding velocity component to zero else it compounds
            if (event.code === 'KeyW' || event.code === 'KeyS') {
                this.vel.y = 0; // Reset vertical velocity
            } else if (event.code === 'KeyA' || event.code === 'KeyD') {
                this.vel.x = 0; // Reset horizontal velocity
            }
        }
    }

    // Not required
    // mouseMove(event) {
    // }

    mouseDown(event) {
        this.tutorial.playerShot();
        const mousePos = new v2(event.clientX, event.clientY); // client works better than screen
        const bulletVel = mousePos
            .sub(this.playerPos)
            .normalise()
            .scale(bulletSpeed);

        this.bullets.push(new Bullet(this.playerPos, bulletVel)); // create new bullet instance, add it to bullets
        sfxBounce.pause();
        sfxBounce.currentTime = 0; // reset playhead
        sfxBounce.play();
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

// Not required
// document.addEventListener('mousemove', (event) => {
//     game.mouseMove(event);
// });

document.addEventListener('mousedown', (event) => {
    game.mouseDown(event);
});

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