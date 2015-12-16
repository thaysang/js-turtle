nested_hexagonsString ='\
// draw a polygon with number of sides of length side\n\
function polygon(sides,side) {\n\
  repeat(sides, function () {\n\
    forward(side);\n\
    right(360/sides);\n\
  });\n\
}\n\
\n\
// draw a set of nested hexagons\n\
function demo() {\n\
   clear();\n\
   goto(0,0);\n\
   hideTurtle();\n\
   for(step=1; step<10; step=step+1) {\n\
      color (random(16));\n\
      polygon(6,step*10);\n\
      penup();\n\
      left(120)\n\
      forward (10);\n\
      right(120);\n\
      pendown();\n\
   }\n\
}\n\
'
