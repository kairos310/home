var particles = [];
var flowfield = [];

var inc = 0.1;
var scl = 30;
var row,col;
var zoff = 0;
var r,g,b;

function setup(){
  var c = createCanvas(window.innerWidth -18,window.innerHeight);
  c.parent("body")
  c.class("flow");
  col = floor(width/scl);
  row = floor(height/scl);
  fr = createP('');
  flowfield = new Array(col*row);

  fill(180, 100, 71)
  for(var i = 0; i < window.innerWidth / 10; i++){
    let position = createVector(random(316) + window.width / 2 - 158 ,random(288) + window.height / 2 - 144)
    particles[i] = new Particle(position);
  }
  background(50)
}

function windowResized(){
	resizeCanvas(window.innerWidth - 18, window.innerHeight)
  background(50)
}

function draw(){
  background(1,1,16,3);
  var yoff = 0;
  for(var y = 0; y < row; y++) {
    var xoff = 0;
    for(var x = 0; x < col; x++) {
      var index = x + y * col;
      flowfield[index] = v;
      var r = noise(xoff, yoff, zoff) * TWO_PI*4;
      var v = p5.Vector.fromAngle(r);
      v.setMag(0.05);
      strokeWeight(0.05)
      stroke(255, 223, 120)
      xoff += inc;
    }
    yoff += inc;
    zoff += 0.00003;
  }
  for(var i= 0; i < particles.length; i++){
    particles[i].show();
    particles[i].update();
    particles[i].edges();
    particles[i].follow(flowfield);
    particles[i].avoid();
  }
}


function Particle(p){
  this.pos = p
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxspeed = 1;
  this.size = random(10)
  this.repulsiveForce = 10


  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }


  this.follow = function(vectors){
    var x = floor(this.pos.x/scl);
    var y = floor(this.pos.y/scl);
    var index = x+y*col;
    var force = vectors[index];
    this.applyForce(force);
  }

  this.avoid = function(){
    for(var p of particles){
      let dist = p.pos.dist(this.pos);
      if(dist < this.repulsiveForce && dist > 0){
        let force = p5.Vector.sub(this.pos, p.pos)
        force.normalize()
        force.mult(1/dist * 2)
        this.applyForce(force)
      }
    }
  }

  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.show = function() {
    stroke(r,g,b,50);
    strokeWeight(this.size);
    if(this.pos.y > height/2-144 && this.pos.y < height/2+144 && this.pos.x > width/2-158 && this.pos.x < width/2+158){
      strokeWeight(this.size * 0.2)
    }
    point(this.pos.x, this.pos.y);
  }

  this.edges = function() {
    if(this.pos.x > width){
      this.pos.x = 0
      //this.pos.y = random(0, height);
    }
    if(this.pos.x < 0) {
      this.pos.x = width
      //this.pos.y = random(0, height);
    };
    if(this.pos.y > height) this.pos.y = 0;
    if(this.pos.y < 0) this.pos.y = height;
  }


}
function mousePressed(){
	if(mouseY < window.innerHeight){	
	  r = random(0,255);
	  g = random(0,255);
	  b = random(0,255);
	  for(var i = 0; i < 10; i++){
	    let position = createVector(mouseX, mouseY)
	    particles.push(new Particle(position));
	  }
	}
}

function mouseMoved(){

}
