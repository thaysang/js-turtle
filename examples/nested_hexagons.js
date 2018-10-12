// Nested Hexagons -- draw a set of nested hexagons

// draw a polygon of n sides of length m
function polygon(sides,side) {
  repeat(sides, function () {
    forward(side);
    right(360/sides);
  });
}

// draw a set of nested hexagons
function demo() {
   size = maxY()
   if (maxX() < size) {
     size = maxX()
   }
   steps = size/10 // 10 is the step size
   reset();
   hideTurtle();
   for(step=1; step < steps; step=step+1) {
      color (random(16));
      polygon(6,step*10);
      penup();
      left(120)
      forward (10);
      right(120);
      pendown();
   }
}
