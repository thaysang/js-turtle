spinning_squaresString ='\
// Define helper functions here.\n\
// For example:\n\
\n\
function square(side) {\n\
   repeat(4, function () {\n\
      forward(side);\n\
      right(90);\n\
   });\n\
}\n\
\n\
function demo() {\n\
   hideTurtle();\n\
   color("blue");\n\
   for(s = 100; s > 0; s -= 10) {\n\
      square(s);\n\
      right(36);\n\
   }\n\
}\n\
'
