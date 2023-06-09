let balloon = []; // array storing balloon sprites
let balloonCount = 3;
let diameter = 150; // balloon diameter

let leftWall, rightWall; // sprite collision walls;

let lives = 3;
let heart; // heart/life sprite
let heartW = 100; // width of heart sprite

let score = 0;



function preload() {
    heart = loadImage('assets/heart.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);

    world.gravity.y = 1;

    for (i = 0; i < balloonCount; i++) { // initial array population & balloon spawning
        balloon[i] = new Sprite();
        balloon[i].diameter = 150;
        balloon[i].y = random(-balloon[i].diameter / 2, -balloon[i].diameter);
        balloon[i].x = random(balloon[i].diameter / 2, width - balloon[i].diameter / 2);
    }

    rightWall = new Sprite();
    rightWall.x = width + 10;
    rightWall.h = height;
    rightWall.y = rightWall.h / 2;
    rightWall.w = 10;
    rightWall.collider = 'static';

    leftWall = new Sprite();
    leftWall.x = -10;
    leftWall.h = height;
    leftWall.w = 10;
    leftWall.collider = 'static';

}

function draw() {
    background(100);

    for (i = 0; i < balloon.length; i++) { //manages active balloon sprite
        if (balloon[i].y > height + balloon[i].diameter) { // sprites deleted if off the screen 
            balloon.splice(i, 1);
            lives--;
        }
    }

    if (balloon.length < balloonCount) { //respawns balloons if array isn't fully populated
        respawn();
    }

    printScore();
    printLives();
}

//this is the temporary method of registering a hit while motion detection is not implemented
function mouseClicked() { // registers when the balloon is being clicked on
    for (i = 0; i < balloonCount; i++) {
        if (dist(mouseX, mouseY, balloon[i].x, balloon[i].y) < balloon[i].diameter / 2) { // if clicking balloon
            balloon[i].vel.y = -5; // will alter this to make it directionally accurate once motion controls are added
            balloon[i].vel.x = random(-5, 5);
            print('HIT');
            score++;
        }
    }
}

function printScore() { // prints the current score on screen
    stroke(255);
    fill(255);
    textSize(64);
    text(score, width - 70, 100);
}

function printLives() { // prints the current number of lives on screen 
    for (i = 0; i < lives; i++) {
        image(heart, heartW * i + 10, 0, heartW, heartW);
    }
}

function respawn() { // adds a new balloon sprite to the array
    balloon.push(new Sprite(random(diameter / 2, width - diameter / 2), random(-diameter / 2, -diameter / 2), 150));
}