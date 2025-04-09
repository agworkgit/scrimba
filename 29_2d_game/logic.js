// Global Variables

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
let globalWidth = window.innerWidth;
let globalHeight = window.innerHeight;

let x = 0;
let y = 0;

// Colour Class

class Colour {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toRgba() {
        return `rgba(${this.r * 255}, ${this.g * 255}, ${this.b * 255}, ${this.a})`; // this.a is an exception (works on 0 to 1)
    }

    withAlhpa(a) {
        return new Colour(this.r, this.g, this.b, a);
    }

    grayScale() {
        let sourceColour = Math.max(this.r, this.g, this.b);
        return new Colour(sourceColour, sourceColour, sourceColour, this.a);
    }

    static hex(hexcolour) {
        let matches = hexcolour.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i); // returns 3 groups of 2
        if (matches) {
            let [, r, g, b] = matches;
            return new Colour(parseInt(r, 16) / 255,
                parseInt(g, 16) / 255,
                parseInt(b, 16) / 255,
                1.0);
        } else {
            throw new Error(`Could not parse ${hexcolour} as colour`, console.error);
        }
    }
}

const playerColour = Colour.hex('#72b1e5');
const playerRadius = 48;
const playerSpeed = 600;
const bulletColour = Colour.hex('#ffd760');
const bulletRadius = 10;
const bulletSpeed = playerSpeed * 3;
const bulletLifetime = 5; // important - prevents memory overflow
const enemyColour = Colour.hex('#df7171');
const enemyRadius = playerRadius - 12;
const enemySpeed = playerSpeed / 3;
const enemySpawnCooldown = 1;
const enemySpawnDistance = 500;
const particleCount = 50;
const particleRadius = 5;
const particleMagnitude = bulletSpeed;
const particleLifetime = 1;
const particleColour = Colour.hex('#ffedb8');

// Handle Window Resize

function handleWindowResize() {
    globalWidth = window.innerWidth;
    globalHeight = window.innerHeight;
}

window.onresize = handleWindowResize;

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

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalise() {
        const n = this.len();
        return new v2(this.x / n, this.y / n);
    }

    dist(that) {
        return this.sub(that).len();
    }
}

// Polar Coordinates

function polarCoord(mag, dir) {
    return new v2(Math.cos(dir) * mag, Math.sin(dir) * mag);
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

// Particles - colour comes from rgba + particleAlpha (replaced by Colour class methods)

class Particle {
    constructor(pos, vel, lifetime, radius) {
        this.pos = pos;
        this.vel = vel;
        this.lifetime = lifetime;
        this.radius = radius;
    }

    render(context) {
        const particleAlpha = this.lifetime / particleLifetime;
        fullCircle(context, this.pos, this.radius, particleColour.withAlhpa(particleAlpha));
    }

    update(dt) {
        this.pos = this.pos.add(this.vel.scale(dt));
        this.lifetime -= dt;
    }
}

function particleBurst(particles, centre) {
    const particleLength = Math.random() * particleCount;
    for (let i = 0; i < particleLength; i++) {
        particles.push(new Particle(
            centre,
            polarCoord(
                Math.random() * particleMagnitude,
                Math.random() * 2 * Math.PI),
            Math.random() * particleLifetime,
            (Math.random() * particleRadius) + 1
        ));
    }
}

// Draw Circle

function fullCircle(context, center, playerRadius, colour) {
    context.beginPath();
    context.arc(center.x, center.y, playerRadius, 0, 2 * Math.PI, false);
    context.fillStyle = colour.toRgba();
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
        context.font = '24px VT323';
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

// Enemies

class Enemy {
    constructor(pos) {
        this.pos = pos;
        this.dead = false;
    }

    update(dt, followPos) {
        let vel = followPos
            .sub(this.pos)
            .normalise()
            .scale(enemySpeed * dt);
        this.pos = this.pos.add(vel);
    }

    render(context) {
        fullCircle(context, this.pos, enemyRadius, enemyColour);
    }
}

// Bullets

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
        fullCircle(context, this.pos, bulletRadius, bulletColour);
    }
}

// Render Entities

function renderEntities(context, entities) {
    for (let entity of entities) {
        entity.render(context);
    }
}

// Game

class Game {
    constructor() {
        this.playerPos = new v2(globalWidth / 2, globalHeight / 2);
        this.mousePos = new v2(0, 0);
        this.vel = new v2(0, 0);
        this.tutorial = new Tutorial();
        this.playerLearntToMove = false;
        this.bullets = [];
        this.enemies = [];
        this.particles = [];
        this.enemySpawnRate = enemySpawnCooldown;
        this.enemySpawnCooldown = this.enemySpawnRate;
        this.paused = false;

        canvas.addEventListener('keydown', (event) => this.keyDown(event));
        canvas.addEventListener('keyup', (event) => this.keyUp(event));
    }

    update(dt) {
        if (this.paused) {
            return;
        }

        this.playerPos = this.playerPos.add(this.vel.scale(dt));
        this.tutorial.update(dt);

        for (let bullet of this.bullets) {
            bullet.update(dt);
        }

        this.bullets = this.bullets.filter((bullet) => bullet.lifetime > 0.0);

        for (let particle of this.particles) {
            particle.update(dt);
        }

        this.particles = this.particles.filter((particle) => particle.lifetime > 0.0);

        for (let enemy of this.enemies) {
            for (let bullet of this.bullets) {
                if (!enemy.dead && enemy.pos.dist(bullet.pos) <= bulletRadius + enemyRadius) {
                    enemy.dead = true;
                    bullet.lifetime = 0;
                    particleBurst(this.particles, enemy.pos);
                }
            }
        }

        for (let enemy of this.enemies) {
            enemy.update(dt, this.playerPos);
        }

        this.enemies = this.enemies.filter(enemy => !enemy.dead);

        // Spawning Enemies

        if (this.tutorial.state == tutorialState.finishedLearning) {
            this.enemySpawnCooldown -= dt;
            if (this.enemySpawnCooldown <= 0) {
                this.spawnEnemy();
                this.enemySpawnCooldown = this.enemySpawnRate;
                this.enemySpawnRate = Math.max(0.01, this.enemySpawnRate - 0.01);
            }
        }
    }

    render(context) {
        const width = context.canvas.width;
        const height = context.canvas.height;

        // Makes BG transparent - BG colour can now be changed in CSS
        context.clearRect(0, 0, width, height);

        renderEntities(context, this.bullets);
        renderEntities(context, this.particles);
        renderEntities(context, this.enemies);

        // for (let bullet of this.bullets) {
        //     bullet.render(context);
        // }

        // Draw Circle
        fullCircle(context, this.playerPos, playerRadius, playerColour);

        // Instructions
        this.tutorial.render(context);
    }

    spawnEnemy() {
        let dir = Math.random() * 2 * Math.PI;
        this.enemies.push(new Enemy(this.playerPos.add(polarCoord(enemySpawnDistance, dir))));
    }

    togglePause() {
        this.paused = !this.paused;
    }

    keyDown(event) {
        if (event.code in directionMap && !keyState[event.code]) {
            keyState[event.code] = true; // Set key state to pressed
            this.vel = this.vel.add(directionMap[event.code].scale(playerSpeed));
            this.tutorial.playerMoved();
        } else if (event.code === 'Space') {
            this.togglePause();
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
        const bulletDir = mousePos
            .sub(this.playerPos)
            .normalise();
        const bulletVel = bulletDir.scale(bulletSpeed);
        const bulletPos = this.playerPos.add(bulletDir.scale(playerRadius + bulletRadius));

        this.bullets.push(new Bullet(bulletPos, bulletVel)); // create new bullet instance, add it to bullets
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