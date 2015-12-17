arc_testString ='\
// test of arcs and curves\n\
// this draws three figures\n\
\n\
\n\
function radialArc (x, y, startRadius, armAngle, tangentAngle, arcRadius, extent, dir) {\n\
  goto(x,y);\n\
  penup();\n\
  angle(armAngle);\n\
  forward(startRadius);\n\
  right(tangentAngle);\n\
  pendown();\n\
  circle(arcRadius,extent, dir);\n\
}\n\
\n\
\n\
function turbine(x,y, radius, pedals, dir) {\n\
  for (i=0; i<pedals; i++) {\n\
    if (dir) {\n\
      radialArc (x,y, radius, 360*i/pedals, -135, 10, 90, dir);\n\
    } else {\n\
      radialArc (x,y, radius, 360*i/pedals, 45, 10, 90, !dir);\n\
    }\n\
  }\n\
}\n\
\n\
function roundedOctogon (side, radius) {\n\
  repeat((8), function () {\n\
    forward (side);\n\
    curveright(radius,45);\n\
  })\n\
}\n\
\n\
\n\
function roundedOctogonL (side, radius) {\n\
  repeat((8), function () {\n\
    forward (side);\n\
    curveleft(radius,45);\n\
  })\n\
}\n\
\n\
\n\
function demo () {\n\
  var CW = true;\n\
  var CCW = false;\n\
\n\
  reset();\n\
  hideturtle();\n\
\n\
  turbine (-80, 30, 10, 8, CW);\n\
  turbine (-80, 30, 25, 16, CCW);\n\
  turbine (-80, 30, 40, 32, CW);\n\
  turbine (-80, 30, 55, 64, CCW);\n\
\n\
\n\
  var x= 60;\n\
  var y=30;\n\
  var pedals = 8;\n\
  for (i=0; i<pedals; i++) {\n\
    radialArc (x, y, 10, 360*i/pedals, -45, 10, 180, CW);\n\
    radialArc (x, y, 40, 360*i/pedals, -125, 15, 110, CCW);\n\
    radialArc (x, y, 40, 360*i/pedals, -85, 18, 170, CW);\n\
    radialArc (x, y, 41, 360*i/pedals, 0, 10, 360, CW);\n\
  }\n\
\n\
  goto(x, y);\n\
  circle(60);\n\
\n\
  goto (-110,-100);\n\
  angle(0);\n\
  roundedOctogon (10,20);\n\
  goto (-40,-100);\n\
  angle(0);\n\
  roundedOctogonL (15,20);\n\
\n\
  goto (-35,-125);\n\
  angle(22.5);\n\
  roundedOctogonL (25,20);\n\
  goto (-115,-120);\n\
  angle(-22.5);\n\
  roundedOctogon (20,20);\n\
}\n\
'
