let balloon;

function preload() {
    balloon = loadModel('assets/balloon.stl');
}

function setup() {
    createCanvas(1920, 1080, WEBGL);
}

function draw() {
    background(200);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    scale(90);
    model(balloon);
}