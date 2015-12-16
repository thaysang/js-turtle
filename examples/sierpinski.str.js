sierpinskiString ='\
/* A Sierpinski curve is a symmetric\n\
fractal that covers a plane.  This\n\
demo draws a set of Sierpinski curves.\n\
Note how each level is similar to the\n\
preceding level\n\
\n\
This also demonstrates the use of the\n\
delay function and powerful concepts\n\
of function redefinition and\n\
recursion.\n\
*/\n\
function halfSierpinski(size, level) {\n\
  if (level == 0)\n\
    forward(size);\n\
  else {\n\
    function part() {\n\
      halfSierpinski(size, level - 1);\n\
      left(45);\n\
      forward(size * Math.sqrt(2));\n\
      left(45);\n\
      halfSierpinski(size, level - 1);\n\
    }\n\
    part();\n\
    right(90);\n\
    forward(size);\n\
    right(90);\n\
    part();\n\
  }\n\
}\n\
\n\
function sierpinski(size, level) {\n\
  function part () {\n\
    halfSierpinski(size, level);\n\
    right(90);\n\
    forward(size);\n\
    right(90);\n\
  }\n\
  part ();\n\
  part ();\n\
}\n\
\n\
var i = 1; // a global variable used for each iteration of delayed\n\
\n\
function delayed() {\n\
  if (i<7) {\n\
    clear();\n\
    hideTurtle();\n\
    redrawOnMove(true);\n\
    goto(0,-120);\n\
\n\
    // move start point so figure stays centered\n\
    penup();\n\
    angle(0);\n\
    var side = 64/Math.pow(2,i);\n\
    left(45);\n\
    forward(side * Math.sqrt(2) / 2);\n\
    right(45);\n\
    forward(side);\n\
    pendown();\n\
\n\
    sierpinski(side, i);\n\
    goto (-150,-150);\n\
    angle(90);\n\
    write ("Sierpinski curve of order "+ i);\n\
    draw();\n\
    i = i + 1;\n\
    delay(delayed,3000)\n\
  }\n\
}\n\
\n\
function demo () {\n\
  i = 1;\n\
  delayed ();\n\
}\n\
'
