spiralString ='\
// draw a random spiral\n\
\n\
function spiral(steps,angle) {\n\
  widthInc = 5 / steps;\n\
  distInc = 10 / steps;\n\
  w = 0.1;\n\
  repeat (steps, function () {\n\
    width(w);\n\
    forward(random(1,10));\n\
    right(angle);\n\
    angle = angle - 1;\n\
    w = w + widthInc;\n\
  })\n\
}\n\
\n\
function drawRandomSpiral() {\n\
  colour(random(16));\n\
  goto(random(-150,150), random(-150, 150));\n\
  angle(random(0,360));\n\
  spiral(random(100,1000), random(5,90));\n\
}\n\
\n\
function demo() {\n\
  hideTurtle();\n\
  drawRandomSpiral();\n\
}\n\
'
