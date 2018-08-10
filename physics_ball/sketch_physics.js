var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];
var x = 0;
var old_vol = 0;
var vol;
var soundFile;
var off;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('../files/LA-1-Jazz');
}

function setup() {

	createCanvas(window.innerWidth, window.innerHeight);
	noStroke();
    fill(254, 159, 139, 255);
    colorMode(HSB,360,100,100);
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
        fill(x%360,55,noise(off)*100);

        ellipse(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);

    }
    
    vol = analyzer.getLevel();
    //vol = mic.getLevel();
    var new_vol = vol;
    if(new_vol-old_vol>0.03){
        addNewParticle(); 
        addNewParticle();        
    }

    old_vol = new_vol;
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


