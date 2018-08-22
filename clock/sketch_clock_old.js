let walker;
let noise_offset = 0;
let colors = [[ '#fff', '#111' ],[ '#e37169', '#26282a' ],[ '#eed87b', '#28292b' ],[ '#0d5b5c', '#e6e6e6' ],[ '#d4e8e1', '#e24c68' ],[ '#fbfc65', '#1666bd' ],[ '#4f3a4b', '#e55256' ],[ '#f3c8ed', '#1790d0' ],[ '#111', '#fff' ]];
let color_off = 0;
let clocks = [];
let clocks_radi = 120;
let width_objects_num;
let height_objects_num;
let distance = 1.4;
let frame = 1;
let clockwise = 1;
let is_frame = true;
let is_rect= false;
var soundFile;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('files/ggp-1');
}


function setup(){

    createCanvas(window.innerWidth, window.innerHeight);
    width_objects_num = Math.floor(window.innerWidth / (clocks_radi * distance)) - frame;
    height_objects_num = Math.floor(window.innerHeight / (clocks_radi * distance)) - frame;
    left_offset_margin = (window.innerWidth - width_objects_num * clocks_radi*distance + clocks_radi*distance)/2;
    upside_offset_margin = (window.innerHeight - height_objects_num * clocks_radi*distance + clocks_radi*distance)/2;

    
    for(let j=0; j<height_objects_num; j++){
        for(let i=0; i<width_objects_num; i++){
            noise_offset = noise_offset+ 1;
            clocks[j*width_objects_num+i] = new Clock_clockwise(i * clocks_radi*distance + left_offset_margin, j * clocks_radi*distance + upside_offset_margin, -90 + noise(noise_offset)*360, clocks_radi);
    }
    }
    bg = colorAlpha(colors[color_off][0],1);
    angleMode(DEGREES);
}

function draw(){
    background(bg);
    for(let i=0; i<clocks.length; i++){ 
            clocks[i].update();
            clocks[i].display();
    }
   
}

function mousePressed() {
   color_off = (color_off + 1) % colors.length;
   bg = colorAlpha(colors[color_off][0],1);	
}

function Clock(pos_x, pos_y, starting_time,radi) {
    this.pos = createVector(pos_x, pos_y);
    this.end1 = starting_time;
    this.end1_float = starting_time;
    this.end2 = starting_time;
    this.end2_float = starting_time;


    this.update = function(){
        this.end1_float = this.end1_float + 0.2;
        this.end2_float = this.end2_float + 0.03;
        this.end1 = Math.floor(this.end1_float % 30) * 12;
        this.end2 = Math.floor(this.end2_float % 360);
        }

    this.display = function(){
        push();
        translate(pos_x, pos_y);
        push();
        strokeWeight(4);
        stroke(colorAlpha(colors[color_off][1],1));
        rotate(this.end2);
        line(0, 0, radi /4 , 0);
        pop();
        push();
        strokeWeight(4);
        stroke(colorAlpha(colors[color_off][1],1));
        rotate(this.end1);
        line(0, 0, radi / 2.5 , 0);
        pop();
        strokeWeight(4);
        stroke(colorAlpha(colors[color_off][1],1));
        noFill();
        ellipse(0, 0, radi,radi);
        pop();
    }

}

function Clock_clockwise(pos_x, pos_y, starting_time,radi) {
    this.pos = createVector(pos_x, pos_y);
    this.end1 = starting_time;
    this.end1_float = starting_time;
    this.end2 = starting_time;
    this.end2_float = starting_time;


    this.update = function(){
        this.end1_float = this.end1_float + 4;
        this.end2_float = this.end2_float + 1;
        this.end1 = Math.floor(this.end1_float % 180) * 2;
        this.end2 = Math.floor(this.end2_float % 360);
        }

    this.display = function(){
        push();
        translate(pos_x, pos_y);
        push();
        strokeWeight(5);
        stroke(colorAlpha(colors[color_off][1],1));
        rotate(clockwise*this.end2);
        line(0, 0, radi /4 , 0);
        pop();
        push();
        strokeWeight(5);
        stroke(colorAlpha(colors[color_off][1],1));
        rotate(clockwise*this.end1);
        line(0, 0, radi / 2.5 , 0);
        pop();
        strokeWeight(5);
        stroke(colorAlpha(colors[color_off][1],1));
        noFill();
        if (is_frame){
        if (is_rect){
            rect(0-radi/2, 0-radi/2, radi,radi,5);
        }
        else{
            ellipse(0, 0, radi,radi);
        }
        }
        pop();
    }

}




function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
}
