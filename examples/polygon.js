// Polygon -- draw a polygon of n sides of length m

// draw a polygon with n sides of length m
function polygon(sides,side) {
  repeat(sides, function () {
    forward(side);
    right(360/sides);
  });
}

// draw a random polygon
function demo() {
   reset();
   side = maxY()
   if (maxX() < side) {
     side = maxX()
   }
   side = .4 *side
   goto(-.4 * side, -.5 * side)
   hideTurtle();
   polygon( random( 3,10), side);
}
