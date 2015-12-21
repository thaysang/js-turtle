// Squiggle -- draw a random squiggle

function squiggle(steps,angle) {
  widthInc = 5 / steps;
  distInc = 10 / steps;
  w = 0.1;
  repeat (steps, function () {
    width(w);
    forward(random(1,10));
    right(angle);
    angle = angle - 1;
    w = w + widthInc;
  })
}

function drawRandomSquiggle() {
  colour(random(16));
  goto(random(-150,150), random(-150, 150));
  angle(random(0,360));
  squiggle(random(100,1000), random(5,90));
}

function demo() {
  hideTurtle();
  drawRandomSquiggle();
}
