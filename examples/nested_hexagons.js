// draw a polygon with number of sides of length side
function polygon(sides,side) {
  repeat(sides, function () {
    forward(side);
    right(360/sides);
  });
}

// draw a set of nested hexagons
function demo() {
   clear();
   goto(0,0);
   hideTurtle();
   for(step=1; step<10; step=step+1) {
      color (random(16));
      polygon(6,step*10);
      penup();
      left(120)
      forward (10);
      right(120);
      pendown();
   }
}
