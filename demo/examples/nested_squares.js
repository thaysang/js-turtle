// Nested Squares -- draw a set of nested squares

//draw a square
function square(side) {
   repeat(4, function () {
      forward(side);
      right(90);
   });
}


// draw some nested squares
function nestedSquares(count) {
  clear();
  goto(0,0);
  hideturtle();
  for (s=1; s<count*4; s=s+4) {
    penup();
    // move down and back 2 spaces
    left(90);
    forward(2);
    left(90);
    forward(2);
    left(180);
    pendown();
    color (random(16));
    square (s);
  }
}

function demo1() {
  reset()
  size = 2* maxY()
  if (2* maxX() < size) {
    size = 2*maxX()
  }
  number = .9 * size /4  // 4 is the difference in square size
  function nest25 () {
    nestedSquares (size);
  }
  // animate a simple parameterless function
  animate( nest25, 200);
}

function demo() {
  // animate with function needing a parameter passed
  reset()
  size = 2* maxY()
  if (2* maxX() < size) {
    size = 2*maxX()
  }
  number = .9 * size /4  // 4 is the difference in square size
  animate( function () { nestedSquares(number)} ,200);
}
