// Triangle Tunnel -- animate a set of mesmerizing nested triangle for a tunnel effect
// this uses an array to hold the colors of the current triangles

// GLOBALS
var sides = 80;


function triangle (side) {
  if (side < maxSide) {
    home()
    penup();
    forward (side/2);
    right(150);
    pendown();
    for (var i=0; i<3; i++) {
      forward(side);
      right(120);
    }
  }
}


function nestTri () {
  console.log("one more" + tColor + " sides:"+ sides)
  tColor.push(random (15));
  tColor.shift();
  for (var i=0; i<sides; i++) {
    color (tColor[i]);
    triangle (i*15);
  }
}


function demo () {
  reset()
  hideTurtle()

  maxSide = 1.8* Math.min( maxX(), maxY())
  tColor = []
  for (var i=0; i<sides; i++) {
    tColor [i] = random (15)
  }
  animate (nestTri,1);
}

