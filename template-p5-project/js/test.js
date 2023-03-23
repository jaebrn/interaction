let balloon = [];
let balloonCount = 3;

let lives = 3;
let heart;
let heartW = 100;
let score = 0;

let diameter = 150;

function preload() {
    heart = loadImage('assets/heart.png');
}

function setup() {
    createCanvas(1000, 1000);
    background(100);

    world.gravity.y = 2;

    for (i = 0; i < balloonCount; i++) {
        balloon[i] = new Sprite();
        balloon[i].diameter = 150;
        balloon[i].y = random(-balloon[i].diameter / 2, -balloon[i].diameter);
        balloon[i].x = random(balloon[i].diameter / 2, width - balloon[i].diameter / 2);
    }
}

function draw() {
    background(100);

    for (i = 0; i < balloon.length; i++) {
        if (balloon[i].y > height + balloon[i].diameter) {
            balloon.splice(i, 1);
            lives--;
        }
    }

    if (balloon.length < balloonCount) {
        respawn();
    }

    printScore();
    printLives();
}

function printScore() { // prints the current score on screen
    stroke(255);
    fill(255);
    textSize(64);
    text(score, width - 70, 100);
}

function printLives() {
    for (i = 0; i < lives; i++) {
        image(heart, heartW * i + 10, 0, heartW, heartW);
    }
}

function respawn() {
    balloon.push(new Sprite(random(diameter / 2, width - diameter / 2), random(-diameter / 2, -diameter / 2), 150));
}