// Spinning Squares -- draw some square of increasing size and angle.

function square (side) {
  var i=0
  while (i<4) {
    forward( side)
    turn(90)
    i=i+1
  }
}

function spinningSquare2() {
   hideTurtle();
   color("blue");
   for(s = 100; s > 0; s -= 10) {
      square(s);
      right(36);
   }
}

function spinningSquare() {
  reset()
  var steps = 100
  stepSize = 2 * maxX()
  if (1.5 * maxY() < stepSize) {
    stepSize = 1.5 * maxY()
  }
  stepSize = .5 * stepSize/steps
  //var stepSize = 200/steps
  color("blue");
  for (var i=0; i<steps; i=i+1) {
    square(stepSize*i);
    right(360/steps)
  }
}

demo = spinningSquare
