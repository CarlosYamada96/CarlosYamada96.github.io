console.log("Hello World");

var osc;
var kick;
var snare;
var sounds = ["kick", "snare", "hh"];

function preLoad(){
    snare = 
    loadSound("audios/snare.mp3");
}

function setup(){
    osc = new p5.Oscillator();
    osc.setType('sine');
}

function playsounds(x){
   snare.play();
}


