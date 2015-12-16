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
  function nest25 () {
    nestedSquares (25);
  }
  // animate a simple parameterless function
  animate( nest25 ,100);
}

function demo() {
  // animate with function needing a parameter passed
  animate( function () { nestedSquares(25)} ,100);
}
