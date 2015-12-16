// draw a polygon with number of sides of length side
function polygon(sides,side) {
  repeat(sides, function () {
    forward(side);
    right(360/sides);
  });
}

// draw a random polygon
function demo() {
   reset();
   hideTurtle();
   polygon(random(3,10),20);
}
