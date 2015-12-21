// Graphitti -- draw randomly placed coloured stripes

function plotOne() {
  goto(random(-150, 150),random(-150, 150));
  color(random(16));
  angle(random(0, 180));
  width(random(1, 10));
  forward(random(10, 30));
}

function demo () {
  animate (plotOne, 100);
}
