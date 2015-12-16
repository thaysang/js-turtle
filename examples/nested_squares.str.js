nested_squaresString ='\
//draw a square\n\
function square(side) {\n\
   repeat(4, function () {\n\
      forward(side);\n\
      right(90);\n\
   });\n\
}\n\
\n\
\n\
// draw some nested squares\n\
function nestedSquares(count) {\n\
  clear();\n\
  hideturtle();\n\
  for (s=1; s<count*4; s=s+4) {\n\
    penup();\n\
    // move down and back 2 spaces\n\
    left(90);\n\
    forward(2);\n\
    left(90);\n\
    forward(2);\n\
    left(180);\n\
    pendown();\n\
    color (random(16));\n\
    square (s);\n\
  }\n\
}\n\
\n\
function demo1() {\n\
  function nest25 () {\n\
    nestedSquares (25);\n\
  }\n\
  // animate a simple parameterless function\n\
  animate( nest25 ,100);\n\
}\n\
\n\
function demo() {\n\
  // animate with function needing a parameter passed\n\
  animate( function () { nestedSquares(25)} ,100);\n\
}\n\
'
