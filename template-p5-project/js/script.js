let balloonObj;

let balloonCount = 3;
let balloons = [];
let gravity = 1;


function preload() {
    balloonObj = loadModel('assets/balloon.stl', true);
}

function setup() {
    createCanvas(1920, 1080);
    for (i = 0; i < balloonCount; i++) {
        balloons[i] = new Balloon;
    }
}

function draw() {
    background(0);
    if (balloons.length < balloonCount) {
        balloons.push(new Balloon);
    }

    for (i = 0; i < balloonCount; i++) {
        balloons[i].display();
        balloons[i].move();
    }
}

function mouseClicked() {
    for (i = 0; i < balloonCount; i++) {
        if (dist(mouseX, mouseY, balloons[i].x, balloons[i].y) < balloons[i].h / 2) {
            balloons[i].hit();
        }
    }
}

class Balloon {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.w = random(190, 210);
        this.h = random(210, 230);
        this.rotation;
    }

    display() {
        noStroke();
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.w, this.h);
    }

    move() {
        this.y += gravity;
    }

    hit() {
        print('HIT');
    }
}

function ballonModel() {
    background(200);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    scale(90);
    normalMaterial();
    model(balloon);
}