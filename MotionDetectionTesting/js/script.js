var capture;
let poseNet;
var poseList = [];

var handList = new Array(0);

//test stuff for collision
var testball;

//NTS: you can probably mitigate the jank by limiting the distance between spawnpoints
//ex: store the X and Y pos of leftWrist index 2 in an array
//then when leftWrist index 2 is drawn again, her new position cant be farther away than the distance limit
//kind of a bitch to implement tho, how about lerping maybye? would that help out?
//maybye make it so it can only change the XY position by 1 at a time, sorta like those vibrating effects we do
//i am a great soft jelly thing

function setup() {
  
  capture = createCapture(VIDEO);
  createCanvas(500, 500);
  //capture.hide();
  poseNet = ml5.poseNet(capture,  modelLoaded, {outputStride:4 ,quantBytes:1, inputResolution:161});
  poseNet.on('pose', getPose);
  testball = new Sprite(random(0, width), 0, 100);
  world.gravity.y = 10;
  //testball.bounciness = 5;
  //testball.friction = 10;
 // testball.dynamic = true;
}

function draw() {
  background(220);
  testballThreshold();
//  print(poseList.length);
if(handList.length > 0){
  for(var j = 0; j < handList.length; j++){
    //handList.removeSprites();
    if(handList[j] != undefined){
      handList[j].remove();
    }
    
   //print(handList[j]);
   }
 }

  if(poseList.length > 0){
   // console.log('poses returned');
   //handList.splice(0, handList.length);
   
   handList = new Array(poseList.length * 2);
    for(var i = 0; i < poseList.length; i++){
      var thisPose = poseList[i].pose;
      if(thisPose.score >= 0.3){
      //  print('running pose ' + thisPose);
      //draw left wrist;
      fill(255, 0, 0);
      thisLeftWrist = new Sprite(thisPose['leftWrist'].x, thisPose['leftWrist'].y, 10);
      thisLeftWrist.color = 'red';
     // thisLeftWrist.dynamic = false;
     thisLeftWrist.collider = 'static';
     thisLeftWrist.friction = 0;
      handList.push(thisLeftWrist);
    //  thisLeftWrist.remove();
      //circle(thisPose['leftWrist'].x, thisPose['leftWrist'].y, 10);
      
      //draw right wrist;
      fill(0, 0, 255);
      thisRightWrist = new Sprite(thisPose['rightWrist'].x, thisPose['rightWrist'].y, 10);
      thisRightWrist.color = 'blue';
      //thisRightWrist.dynamic = false;
      thisRightWrist.collider = 'static';
      thisRightWrist.friction = 0;
      handList.push(thisRightWrist);
      //circle(thisPose['rightWrist'].x, thisPose['rightWrist'].y, 10);
      
      /*
      //draw nose
      fill(0, 255, 0);
      circle(thisPose['nose'].x, thisPose['nose'].y, 10);*/
        
      }
      
    }
  }
  //console.log(frameRate());
}

function modelLoaded(){
  print("model loaded!");
}

function getPose(poses){
  //print(poses);
  //console.log(poses)
  poseList = poses;
}

function testballThreshold(){
  if(testball.y >= height){
    testball.y = 0;
    testball.x = random(0, width);
  }

  if(testball.x > width){
    testball.x = 0;
  }

  if(testball.x < 0){
    testball.x = width;
  }
}