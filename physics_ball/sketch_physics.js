var mass = [];

var mass0 = [];
var mass1 = [];
var mass2 = [];
var mass3 = [];
var mass4 = [];
var mass5 = [];

var color_init = [];
var color0 = [];
var color1 = [];
var color2 = [];
var color3 = [];
var color4 = [];
var color5 = [];

var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];

var position0X = [];
var position0Y = [];
var position1X = [];
var position1Y = [];
var position2X = [];
var position2Y = [];
var position3X = [];
var position3Y = [];
var position4X = [];
var position4Y = [];
var position5X = [];
var position5Y = [];
var position6X = [];
var position6Y = [];
var position7X = [];
var position7Y = [];
var position8X = [];
var position8Y = [];
var position9X = [];
var position9Y = [];
var position10X = [];
var position10Y = [];
var position11X = [];
var position11Y = [];

var x = 0;
var old_vol = 0;
var vol;
var soundFile;
var off;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('files/Mallrat');
}

function setup() {

	createCanvas(window.innerWidth, window.innerHeight);
	noStroke();
    fill(254, 159, 139, 255);
    colorMode(HSB,360,100,100,1.0);
    //mic = new p5.AudioIn();
    //mic.start();

    soundFile.loop();

    textAlign(CENTER);

  	var p = text('Press any key to play.');

    //fft = new p5.FFT();
    analyzer = new p5.Amplitude();
    analyzer.setInput(soundFile);

}

function draw() {
    background(0);
    
	for (var particleA = 0; particleA < mass.length; particleA++) {
		var accelerationX = 0, accelerationY = 0;
		
		for (var particleB = 0; particleB < mass.length; particleB++) {
			if (particleA != particleB) {
				var distanceX = positionX[particleB] - positionX[particleA];
				var distanceY = positionY[particleB] - positionY[particleA];

				var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
				if (distance < 1) distance = 1;

				var force = (distance - Math.min(window.innerWidth, window.innerHeight)/2.5) * mass[particleB] / distance;
				accelerationX += force * distanceX;
				accelerationY += force * distanceY;
			}
		}
		
		velocityX[particleA] = velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
		velocityY[particleA] = velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
	}
	
	for (var particle = 0; particle < mass.length; particle++) {
		positionX[particle] += velocityX[particle];
        positionY[particle] += velocityY[particle];
        off+10;
        color_init = [x%360,35,100,1];
        fill(color1[0] - 40,color1[1],color1[2],0.8);
        ellipse(positionX[particle], positionY[particle], mass[particle] * 500, mass[particle] * 500);
        fill(color0[0] - 20,color0[1],color[2],0.9);
        ellipse(position0X[particle], position0Y[particle], mass0[particle] * 700, mass0[particle] * 700);
        fill(color_init[0],color_init[1],color_init[2],color_init[3]);
        ellipse(position1X[particle], position1Y[particle], mass1[particle] * 1000, mass1[particle] * 1000);
        fill(color2[0] - 60,color2[1],color2[2],0.5);
        ellipse(position2X[particle], position2Y[particle], mass2[particle] * 900, mass2[particle] * 900);
        fill(color3[0] - 80 ,color3[1],color3[2],0.45);
        ellipse(position3X[particle], position3Y[particle], mass3[particle] * 700, mass3[particle] * 700);
        fill(color4[0] - 100,color4[1],color4[2],0.4);
        ellipse(position4X[particle], position4Y[particle], mass4[particle] * 500, mass4[particle] * 500);
        fill(color5[0] - 120,color5[1],color5[2],0.35);
        ellipse(position5X[particle], position5Y[particle], mass5[particle] * 400, mass5[particle] * 400);
        fill(color5[0] - 120,color5[1],color5[2],0.3);
        ellipse(position6X[particle], position6Y[particle], mass5[particle] * 300, mass5[particle] * 300);
        fill(color5[0] - 120,color5[1],color5[2],0.25);
        ellipse(position7X[particle], position7Y[particle], mass5[particle] * 350, mass5[particle] * 350);
        fill(color5[0] - 120,color5[1],color5[2],0.2);
        ellipse(position8X[particle], position8Y[particle], mass5[particle] * 550, mass5[particle] * 550);
        fill(color5[0] - 120,color5[1],color5[2],0.15);
        ellipse(position9X[particle], position9Y[particle], mass5[particle] * 650, mass5[particle] * 650);
        fill(color5[0] - 120,color5[1],color5[2],0.1);
        ellipse(position10X[particle], position10Y[particle], mass5[particle] * 700, mass5[particle] * 700);
        fill(color5[0] - 120,color5[1],color5[2],0.05);
        ellipse(position11X[particle], position11Y[particle], mass5[particle] * 750, mass5[particle] * 750);
                

    }

    



    vol = analyzer.getLevel();
    //vol = mic.getLevel();
    var new_vol = vol;
    if(new_vol-old_vol>0.1){
        addNewParticle(); 
        addNewParticle();        
    }

    old_vol = new_vol;

    
    color5 = color4.slice(0);
    color4 = color3.slice(0);
    color3 = color2.slice(0);
    color2 = color1.slice(0);
    color1 = color0.slice(0);
    color0 = color_init.slice(0);

    mass5 = mass4.slice(0);
    mass4 = mass3.slice(0);
    mass3 = mass2.slice(0);
    mass2 = mass1.slice(0);
    mass1 = mass0.slice(0);
    mass0 = mass.slice(0);

    position11X = position10X.slice(0);
    position11Y = position10Y.slice(0);
    position10X = position9X.slice(0);
    position10Y = position9Y.slice(0);
    position9X = position8X.slice(0);
    position9Y = position8Y.slice(0);
    position8X = position7X.slice(0);
    position8Y = position7Y.slice(0);
    position7X = position6X.slice(0);
    position7Y = position6Y.slice(0);
    position6X = position5X.slice(0);
    position6Y = position5Y.slice(0);

    position5X = position4X.slice(0);
    position5Y = position4Y.slice(0);
    position4X = position3X.slice(0);
    position4Y = position3Y.slice(0);
    position3X = position2X.slice(0);
    position3Y = position2Y.slice(0);
    position2X = position1X.slice(0);
    position2Y = position1Y.slice(0);
    position1X = position0X.slice(0);
    position1Y = position0Y.slice(0);
    position0X = positionX.slice(0);
    position0Y = positionY.slice(0);

   
    

}

function addNewParticle() {    
    x = x + 10;
    fill(x%360,55,100);
    mass.push(random(0.06, 0.008));
    if (mass.length > 25){
        mass.splice(0,1);
        positionX.splice(0,1);
        positionY.splice(0,1);
        velocityX.splice(0,1);
        velocityY.splice(0,1);
    }


    positionX.push(width/2 + random(-vol*width*2, vol*width*2));
	positionY.push(random(height));
	velocityX.push(0);
    velocityY.push(0);
	

}

function keyPressed() {
  if (soundFile.isPlaying()){
    soundFile.pause();
  } else {
    soundFile.loop();
  }
}


