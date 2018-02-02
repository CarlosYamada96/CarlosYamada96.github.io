
console.log("WELCOME TO PIANO QWERTY");


var canvas;
var osc;
var octave = 0;
var env;
var slider;
var cirlce;
var vol;

//SETUP FUNCTION
function setup() {
  //CANVAS
  canvas = createCanvas(700,500);
  centerCanvas();
  background(160,160,160);
  //ENVELOPE
  env = new p5.Env();
  env.setADSR(0.001,0.5, 0.8, 0.9);
  //OSCILLATOR
  osc = new p5.Oscillator("triangle");
  /*osc.amp(env)*/
  osc.amp(0.5);
  /*osc.start();*/
  
  //MASTER VOLUME
  slider = createSlider(0, 1, 50);
  slider.position(455, 193);
}

//CENTER CANVAS
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

//RESIZED WINDOW
function windowResized() {
  centerCanvas();
}

//DRAW FUNCTION
function draw(){

  vol = slider.value();
  /*env.setRange(slider.value(),0);*/  
  strokeWeight(4);

  //SLIDER
  var title;
  fill(160,160,160);
  title = rect(50, 20, 225,60);

  //Octave  
  fill(0,0,0);
  rect(575,20,75,60);
  rect(478,20,75,60)
  //UP
  textSize(50);
  fill(225,225,225);
  text("O", 495, 67);
  //DOWN
  textSize(50);
  fill(225,225,225);
  text("P", 598, 67);

  //WHITE KEYS
  fill(255,255,255);
  rect(50,100,75,350);
  rect(125,100,75,350);
  rect(200,100,75,350);
  rect(275,100,75,350);
  rect(350,100,75,350);
  rect(425,100,75,350);
  rect(500,100,75,350);
  rect(575,100,75,350);

  //BLACK KEYS
  fill(0,0,0);
  rect(97.5,100,50,200);
  rect(172.5,100,50,200);
  rect(322.5,100,50,200);
  rect(397.5,100,50,200);
  rect(472.5,100,50,200);

}

//KEY SOUND
function keyPressed(){

  //ASSIGN FREQ TO A KEY 
  var freq = 0;
  switch(key){
      case "Q":
          freq = 261.63;
      break;
      case "2":
          freq = 277.18;
      break;
      case "W":
          freq = 293.66;
      break;
      case "3":
          freq = 311.13;
      break;
      case "E":
          freq = 329.63;
      break;
      case "R":
          freq = 349.23;
      break;
      case "5":
          freq = 369.99;
      break;
      case "T":
          freq = 392.00;
      break;
      case "6":
          freq = 415.30;
      break;
      case "Y":
          freq = 440.00;
      break;
      case "7":
          freq = 466.16;
      break;
      case "U":
          freq = 493.88;
      break;
      case "I":
          freq = 523.25;
      break;
      case "O":
          octave = 0;
      break;
      case "P":
          octave = 1;
      break;
  }   
  
  // CHANGE OCTAVE
  if(octave == 1){
      freq = freq*2;
  }
  
  osc.freq(freq);
  osc.start();
  osc.amp(vol);
  /*env.triggerAttack();*/

  //CIRCLE
  fill(0,200,0);
  cirlce = ellipse( 430 ,50 ,50, 50);
}

function keyReleased(){
  osc.amp(0);
  /*env.triggerRelease();*/
  cirlce.clear();
  background(160,160,160);

}



