// Graphitti -- draw randomly placed coloured stripes

//** Globals **

var maxX =  imageContext.canvas.width/2;
var maxY =  imageContext.canvas.height/2;
var minX =  -maxX;
var minY =  -maxY;
var maxVelocity = 12;


function plotOne() {
  goto(random(minX, maxX), random(minY, maxY));
  color(random(16));
  angle(random(0, 180));
  width(random(1, 20));
  forward(random(10, 30));
}

function demo () {
  animate (plotOne, 20);
}
