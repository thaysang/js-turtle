randstripeString ='\
// draw some randomly placed coloured stripes\n\
\n\
function plotOne() {\n\
  goto(random(-150, 150),random(-150, 150));\n\
  color(random(16));\n\
  angle(random(0, 180));\n\
  width(random(1, 10));\n\
  forward(random(10, 30));\n\
}\n\
\n\
function demo () {\n\
  hideTurtle();\n\
  repeat (50, plotOne)\n\
}\n\
'
