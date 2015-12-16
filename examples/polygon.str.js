polygonString ='\
// draw a polygon with number of sides of length side\n\
function polygon(sides,side) {\n\
  repeat(sides, function () {\n\
    forward(side);\n\
    right(360/sides);\n\
  });\n\
}\n\
\n\
// draw a random polygon\n\
function demo() {\n\
   reset();\n\
   hideTurtle();\n\
   polygon(random(3,10),20);\n\
}\n\
'
