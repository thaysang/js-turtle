circle_eyeString ='\
// Circle Eye Example\n\
// this draws a set of n circles\n\
// inscribed between the center and\n\
// outside of a containing circle\n\
\n\
function circleEye (x, y, n, outerRadius) {\n\
  goto (x, y);\n\
  circle (outerRadius); //outer circle\n\
\n\
  for (i=0; i<n; i++) {\n\
    goto (x, y);\n\
    angle (i/n * 360);\n\
    penup();\n\
    forward (outerRadius/2);\n\
    pendown();\n\
    circle(outerRadius/2); // one inscribed circle\n\
  }\n\
}\n\
\n\
\n\
\n\
function demo () {\n\
  clear();\n\
  circleEye (0,0,16,120);\n\
}\n\
'
