// Triangle Tunnel -- animate a set of mesmerizing nested triangle for a tunnel effect
reset()
hideTurtle()

function triangle (side) {
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

var sides = 40;
var tColor = [];

for (var i=0; i<sides; i++) {
  tColor [i] = random (15)
}

function nestTri () {
  tColor.push(random (15));
  tColor.shift();
  for (var i=0; i<sides; i++) {
    color (tColor[i]);
    triangle (i*15);
  }
}

function demo () {
  animate (nestTri,1);
}
