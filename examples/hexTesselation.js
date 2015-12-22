// Hexagon Tessalation -- tile a surface with hexagons

function hexagon (side) {
  penup();
  forward(side);
  right(120);
  pendown();
  repeat (6, function () {
    forward(side);
    right(60);
  })
}

function repeatToRight (side) {
  while (turtle.pos.x < maxX()) {
    hexagon(side);
    penup();
    forward(side * 2);
    left(120);
    pendown();
  }
}

function repeatToLeft(side) {
  while (turtle.pos.x > minX())
   {
    hexagon(side);
    penup();
    forward(side * 2);
    left(120);
    pendown();
  }
}

function demo() {
  
  side = 50;
  
  
  reset();
  wrap(false);
  width(1);
  goto(minX()-1, maxY()-1);
  
  while (turtle.pos.y > minY()) {
    repeatToRight(side); // draw a row of hexagons
  
    //advance to next row on right side
    penup();
    left(120);
    forward(side);
    left(60);
    forward(side)
    pendown();
  
    repeatToLeft (side);  // draw a row of hexagons
  
    //advance on next row on left side
    penup();
    left(60);
    forward(side);
    right(60);
    forward(side);
    right(180);
    pendown();
    draw();
  }
}
