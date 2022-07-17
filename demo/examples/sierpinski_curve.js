// Sierpinski Curve -- draw a set of Sierpinski curves

/* A Sierpinski curve is a symmetric
fractal that covers a plane.  
Note how each level is similar to the
preceding level

This also demonstrates the use of the
delay function and powerful concepts
of function redefinition and
recursion.
Function redefinition is a function
defined within a function so that each
time the outer function is invoked a new
copy of the inner function is created.
In this example, a part() function is
created when either the sierpinski or
halfSierpinski functions are invoked.
Recursion is a function that calls
itself. Recursive functions must include
some test to stop the recursion to
prevent the dreaded infinite loop.
*/
function halfSierpinski(size, level) {
  if (level == 0)
    forward(size);
  else {
    function part() {
      halfSierpinski(size, level - 1);
      left(45);
      forward(size * Math.sqrt(2));
      left(45);
      halfSierpinski(size, level - 1);
    }
    part();
    right(90);
    forward(size);
    right(90);
    part();
  }
}

function sierpinski(size, level) {
  function part () {
    halfSierpinski(size, level);
    right(90);
    forward(size);
    right(90);
  }
  part ();
  part ();
}

var i = 1; // a global variable used for each iteration of delayed

function delayed() {
  if (i<7) {
    clear();
    hideTurtle();
    redrawOnMove(true);
    goto(0,.9*minY());

    // move start point so figure stays centered
    penup();
    angle(0);

    size = 1.8 * Math.min( maxX(), maxY())
    var sides = 4 * 2**i -3 // number of sides
    var side = size/sides;
    left(90)
    forward(side/2)
    right(90)

    pendown();

    sierpinski(side, i);
    goto (minX(),minY());
    angle(90);
    setfont("bold 12pt Ariel,sans-serif")
    write ("Sierpinski curve of order "+ i);
    draw();
    i = i + 1;
    delay(delayed,3000)
  }
}

function demo () {
  i = 0;
  delayed ();
}
