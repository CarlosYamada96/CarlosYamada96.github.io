var playButton, stopButton;
var osc;
var sounds = ['kick','snare','hh'];

var soundFile;
var amplitude;
var backgroundColor;
var rectRotate = true;
var rectMin = 15;
var rectOffset = 20;
var numRects = 10;
var beatHoldFrames = 30;
var beatThreshold = 0.11; 
var beatCutoff = 0;
var beatDecayRate = 0.98; 
var framesSinceLastBeat = 0; 

function preload(){
    sounds[0] = loadSound('audios/kick.mp3');
    sounds[1] = loadSound('audios/snare.mp3');
    sounds[2] = loadSound('audios/hh.mp3');
}

function setup() {
    osc = new p5.Oscillator();
    osc.setType('sine');

    c = createCanvas(700, 500);
    c.style("float", "right");
    noStroke();
    rectMode(CENTER);
    backgroundColor = color( random(0,255), random(0,255), random(0,255) );
  
    amplitude = new p5.Amplitude();
    amplitude.setInput(sounds.value);
    amplitude.smooth(0.9);
}

function playStep(v){
    for(i=0; i<v.length; i++){
        if(v[i] == 1){
            sounds[i].play();
        }
    }
}

function draw() {
  background(backgroundColor);

  var level = amplitude.getLevel();
  detectBeat(level);

  var distortDiam = map(level, 0, 1, 0, 1200);
  var w = rectMin;
  var h = rectMin;

  if (rectRotate) {
    var rotation = PI/ 2;
  } else {
    var rotation = PI/ 3;
  }
  var rectCenter = createVector(width/3, height/2);

  push();

    for (var i = 0; i < numRects; i++) {
      var x = rectCenter.x + rectOffset * i;
      var y = rectCenter.y + distortDiam/2;
      translate(x, y); 
      rotate(rotation);
      rect(0, 0, rectMin, rectMin + distortDiam);
    }
  pop();
}

function detectBeat(level) {
  if (level  > beatCutoff && level > beatThreshold){
    onBeat();
    beatCutoff = level *1.2;
    framesSinceLastBeat = 0;
  } else{
    if (framesSinceLastBeat <= beatHoldFrames){
      framesSinceLastBeat ++;
    }
    else{
      beatCutoff *= beatDecayRate;
      beatCutoff = Math.max(beatCutoff, beatThreshold);
    }
  }
}

function onBeat() {
  backgroundColor = color( random(0,255), random(0,255), random(0,255) );
  rectRotate = !rectRotate;
}










