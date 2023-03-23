let balloonObj; //3D model

let balloonCount = 3;
let balloons = [];
let gravity = 1;

let lives = 3;
let heart;
let score = 0;



function preload() {
    balloonObj = loadModel('assets/balloon.stl', true); // 3D model currently unused
    heart = loadImage('assets/heart.png');
}

function setup() {
    createCanvas(1920, 1080);

    for (i = 0; i < balloonCount; i++) {
        balloons[i] = new Balloon;
    }
}

function draw() {
    background(0);
    printScore();
    if (balloons.length < balloonCount) { // maintains proper # of balloons on screen
        balloons.push(new Balloon);
    }

    for (i = 0; i < balloons.length; i++) {
        balloons[i].display();
        balloons[i].move();

        if (balloons[i].y > height + balloons[i].h) { // life lost & balloon spliced if off screen
            lives--;
            balloons.splice(i, 1);
        }

        //Attempt at collision detection between balloons
        // for (j = 0; j < balloons.length; j++) {
        //     if (dist(balloons[i].x, balloons[i].y, balloons[j].x, balloons[j].x) < balloons[i].w) {
        //         balloons[i].x += 1;
        //     }
        // }
    }
}

function mouseClicked() {
    for (i = 0; i < balloonCount; i++) {
        if (dist(mouseX, mouseY, balloons[i].x, balloons[i].y) < balloons[i].h / 2) { // if clicking balloon
            balloons[i].hit();
        }
    }
}

function printScore() { // prints the current score on screen 
    stroke(255);
    fill(255);
    textSize(64);
    text(score, 50, 100);
}

class Balloon {
    constructor() {
        this.w = random(190, 210); // width variation
        this.h = random(210, 230); // height variation
        this.x = random(this.w, width - this.w); // x startign pos
        this.y = random(0, -100); // y starting pos
        this.rotation;
        this.velocity = {
            x: 0, y: 0
        }
        this.hitVector; // vector from mouse/hand to balloon
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
        score++;
        this.hitVector = new p5.Vector(this.x - mouseX, this.y - mouseY);
        this.hitVector.setMag(1); // normalizing 
        print("HIT");
    }
}

function ballonModel() { // calling spawns 3d model
    background(200);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    scale(90);
    normalMaterial();
    model(balloon);
}