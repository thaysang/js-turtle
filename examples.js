arc_test ='\
// Arc and Curve Test -- test of arcs and curves\n\
// this draws three figures\n\
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
bounce ='\
// Bouncing Rectangles -- rectagles which bounce off the side of the canvas\n\
function init_drops(n) {\n\
   var drops = new Array(n);\n\
   for (var i = 0; i < n; i++) {\n\
      drops[i] = { // each drop is an object with a set of properties\n\
         x: random(-150, 150),\n\
         y: random(-150, 150),\n\
         velocityX: random(-6,6),\n\
         velocityY: random(-6,6),\n\
         size: random(20,300),\n\
         red:random(0,255),\n\
         green:random(0,255),\n\
         blue: random(0,255),\n\
         alpha: Math.random(),\n\
         width: random(1,15)\n\
      };\n\
   }\n\
   return drops;\n\
}\n\
\n\
function rain (drops, n) {\n\
   clear();\n\
   for (var i = 0; i < n; i++) {\n\
      // access each drop object\n\
      var d = drops[i]; // access each drop object and react with it\n\
      // if the drop hits a wall, reverse its motion direction (velocity)\n\
      if (d.y < -150) {\n\
         d.velocityY = -d.velocityY;\n\
      }\n\
      else if (d.y + d.size > 150 && d.velocityY > 0) {\n\
         d.velocityY = -d.velocityY;\n\
      }\n\
      if (d.x - d.width/2 < -150) {\n\
         d.velocityX = -d.velocityX;\n\
      }\n\
      else if (d.x + d.width/2 > 150) {\n\
         d.velocityX = -d.velocityX;\n\
      }\n\
      // paint the drop\n\
      color ("rgba(" +d.red+ "," +d.green+ "," +d.blue+ "," +d.alpha +")");\n\
      width(d.width);\n\
      goto(d.x, d.y);\n\
      forward(d.size);\n\
      // move the drop for the next time\n\
      d.y = d.y + d.velocityY;\n\
      d.x = d.x + d.velocityX;\n\
   }\n\
}\n\
\n\
function let_them_drop (n) {\n\
   wrap(false);\n\
   hideTurtle();\n\
   drops = init_drops(n);\n\
   animate(function () { rain(drops, n)}, 100);\n\
}\n\
\n\
function demo() {\n\
  let_them_drop (5);\n\
}\n\
'
circle_eye ='\
// Circle Eye -- draws a set of n inscribedcircles within circle\n\
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
  reset();\n\
  hideturtle();\n\
  color(random(16));\n\
  circleEye (0,0,16,120);\n\
}\n\
'
clock ='\
// Clock -- draw and animate an analog clock\n\
\n\
//draw the tick marks around the edge of the clock\n\
function ticks(x, y, radius) {\n\
   var tickLen = 7;\n\
   var gap = radius - tickLen;\n\
   color("blue");\n\
   width(1);\n\
   for (var theta = 0; theta < 360; theta += 6) {\n\
      // Thicken hour marks\n\
      if (theta % 30 != 0) {\n\
         width(1);\n\
      } else {\n\
         width(3);\n\
      }\n\
      penup();\n\
      goto(0,0);\n\
      angle(theta);\n\
      forward(gap);\n\
      pendown();\n\
      forward(tickLen);\n\
   }\n\
}\n\
\n\
\n\
// draw the hour numbers on the clock face\n\
function numbers(x, y, radius) {\n\
   penup();\n\
   setFont("20px sans-serif");\n\
   for (var hour = 1; hour <= 12; hour++) {\n\
      goto(x,y);\n\
      angle(hour * 30);\n\
      forward(radius); // to center of digit\n\
      angle(180);\n\
      forward(5); // vertical correction to baseline\n\
      right(90);\n\
      forward(4); // horizontal correction to lower left corner\n\
      right(180);\n\
      write(hour);\n\
   }\n\
   pendown();\n\
}\n\
\n\
// draw one of the clock hands\n\
function hand (theta, w, length, col) {\n\
   var stepSize = 5;\n\
   var widthDelta = w / (length / stepSize);\n\
   goto(0, 0);\n\
   angle(theta);\n\
   color(col);\n\
   for (var step = 0; step < length; step += stepSize) {\n\
      width(w);\n\
      forward(stepSize);\n\
      w -= widthDelta;\n\
   }\n\
}\n\
\n\
function hands(hours, minutes, seconds) {\n\
    // draw seconds hand\n\
    var secDegreesPerSecond = 6;	// = 360 degrees/60 seconds /minute\n\
    hand(seconds * secDegreesPerSecond, 4, 100, "red");\n\
    // draw minutes hand \n\
    var minDegreePerSecond = 0.1;	// = 360 degrees /3600 seconds /hour\n\
    var minutesInSeconds = minutes * 60 + seconds;\n\
    hand(minutesInSeconds * minDegreePerSecond, 10, 100, "blue");\n\
    // draw hours hand\n\
    var hourDegreePerSecond = .1/12;	// = 360 degrees /3600 seconds per hour /12 hours per half day /half day\n\
    var hoursInSeconds = ((hours % 12) * 3600) + minutesInSeconds;\n\
    hand(hoursInSeconds * hourDegreePerSecond, 10, 60, "blue");\n\
}\n\
\n\
// refresh the entire clock\n\
function clock() {\n\
   clear();\n\
   numbers(0, 0, 110);\n\
   color("lightgreen");\n\
   goto (0,0);\n\
   circle(130);\n\
   ticks(0, 0, 130);\n\
   var d = new Date();\n\
   hands(d.getHours(), d.getMinutes(), d.getSeconds());\n\
}\n\
\n\
function demo() {\n\
   hideTurtle();\n\
   // refresh the clock every second\n\
   animate(clock,1000);\n\
}\n\
'
koch_snowflake ='\
// Koch Snowflakes -- draw an animated set of Koch snowflakes\n\
\n\
\n\
function kochLine (length, order) {\n\
  //assume drawn on the current angle\n\
  if (order == 0) {\n\
    forward (length);\n\
  } else {\n\
    //break line and bump out to the left\n\
    kochLine (length/3, order-1);\n\
    left(60); \n\
    kochLine (length/3, order-1);\n\
    right(120); \n\
    kochLine (length/3, order-1);\n\
    left(60); \n\
    kochLine (length/3, order-1);\n\
  }\n\
}\n\
\n\
function kochSnowflake (length, order) {\n\
  angle (150);\n\
  goto (0,120);\n\
  kochLine (length, order);\n\
  right(120);\n\
  kochLine (length, order);\n\
  right(120);\n\
  kochLine (length, order);\n\
  right(120);\n\
}\n\
  \n\
\n\
reset();\n\
\n\
var steps = 6;\n\
var span = 240;\n\
var i = 0;\n\
\n\
function kochLines () {\n\
  for (i=0; i<steps; i++) {\n\
    goto (span/2 - i*span/steps, - span/2);\n\
    kochLine (span,i);\n\
  }\n\
}\n\
\n\
function demo() {\n\
  hideturtle();\n\
  i = 0;\n\
  kochSnowflakeDelay();\n\
}\n\
\n\
function kochSnowflakeDelay() {\n\
   var maxX = imageContext.canvas.width / 2;\n\
   var minX = -imageContext.canvas.width / 2;\n\
   var maxY = imageContext.canvas.height / 2;\n\
   var minY = -imageContext.canvas.height / 2;\n\
\n\
  clear();\n\
  var side = maxY - minY;\n\
  if (side > maxX - minX) {\n\
    side = maxX - minX\n\
  }\n\
  kochSnowflake (.8 * side,i);\n\
  goto(minX,minY);\n\
  angle(90);\n\
  setfont("Helvetica,san-serif 12pt")\n\
  write ("Koch snowflake of order " +i);\n\
  draw();\n\
  i = i+1;\n\
  if (i < steps) {\n\
    delay (kochSnowflakeDelay, 2000);\n\
  }\n\
}\n\
'
nested_hexagons ='\
// Nested Hexagons -- draw a set of nested hexagons\n\
\n\
// draw a polygon of n sides of length m\n\
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
nested_squares ='\
// Nested Squares -- draw a set of nested squares\n\
\n\
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
  home();\n\
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
polygon ='\
// Polygon -- draw a polygon of n sides of length m\n\
\n\
// draw a polygon with n sides of length m\n\
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
random_stick_men ='\
//Random Stick Men -- draw stick men randomly on the canvas\n\
\n\
// stick man\n\
function stickMan (height) {\n\
  var headDiameter = height/4;\n\
  var torsoLength = height/3;\n\
  var neckLength = torsoLength/3\n\
  var armLength = height/3;\n\
  var legLength = height/2;\n\
\n\
  //assume center of man is center of torso and up is in the pointed direction\n\
  penup();\n\
  forward (torsoLength/2 + neckLength + headDiameter/2); \n\
  pendown();\n\
  circle (headDiameter/2); //draw head\n\
  penup();\n\
  right (180); //down\n\
  forward (headDiameter/2);\n\
  pendown()\n\
  forward (neckLength); //neck\n\
  right(120);\n\
  forward (armLength); //left arm\n\
  penup();\n\
  backward (armLength);\n\
  right(120);\n\
  pendown();\n\
  forward (armLength); //right arm\n\
  penup();\n\
  backward (armLength);\n\
  right(120);\n\
  pendown();\n\
  forward(torsoLength); // torso\n\
  right(30);\n\
  forward(legLength); //left leg\n\
  penup();\n\
  backward(legLength);\n\
  left(60);\n\
  pendown();\n\
  forward(legLength); //right leg\n\
  penup();\n\
  backward(legLength);\n\
  right(30+180);\n\
  forward(torsoLength/2);\n\
}\n\
\n\
function demo () {\n\
  clear();\n\
  hideturtle();\n\
  for (i=0; i<20; i++) {\n\
    goto (random(-120,120),random(-120,120));\n\
    color(random(16));\n\
    stickMan(random (30,60));\n\
  }\n\
}\n\
'
randstripe ='\
// Graphitti -- draw randomly placed coloured stripes\n\
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
  animate (plotOne, 100);\n\
}\n\
'
sierpinski ='\
// Sierpinski Curve -- draw a set of Sierpinski curves\n\
\n\
/* A Sierpinski curve is a symmetric\n\
fractal that covers a plane.  \n\
Note how each level is similar to the\n\
preceding level\n\
\n\
This also demonstrates the use of the\n\
delay function and powerful concepts\n\
of function redefinition and\n\
recursion.\n\
Function redefinition is a function\n\
defined within a function so that each\n\
time the outer function is invoked a new\n\
copy of the inner function is created.\n\
In this example, a part() function is\n\
created when either the sierpinski or\n\
halfSierpinski functions are invoked.\n\
Recursion is a function that calls\n\
itself. Recurive functions must include\n\
some test to stop the recursion to\n\
prevent the dreaded infinite loop.\n\
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
spinning_squares ='\
// Spinning Squares -- draw some square of increasing size and angle.\n\
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
spiral ='\
// Squiggle -- draw a random squiggle\n\
\n\
function squiggle(steps,angle) {\n\
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
function drawRandomSquiggle() {\n\
  colour(random(16));\n\
  goto(random(-150,150), random(-150, 150));\n\
  angle(random(0,360));\n\
  squiggle(random(100,1000), random(5,90));\n\
}\n\
\n\
function demo() {\n\
  hideTurtle();\n\
  drawRandomSquiggle();\n\
}\n\
'
squiggle ='\
// Squiggle -- draw a random squiggle\n\
\n\
function squiggle(steps,angle) {\n\
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
function drawRandomSquiggle() {\n\
  colour(random(16));\n\
  goto(random(-150,150), random(-150, 150));\n\
  angle(random(0,360));\n\
  squiggle(random(100,1000), random(5,90));\n\
}\n\
\n\
function demo() {\n\
  hideTurtle();\n\
  drawRandomSquiggle();\n\
}\n\
'
tree ='\
// Tree Symmetrical -- draw a symmetrical tree\n\
\n\
//  code inspired from a code.org lesson\n\
function drawTree(depth, branches) {\n\
  var spread = 120;	//spread is angle of left to right branches\n\
  var tilt = 0;		//tilt is angle of the cluster\n\
  var ratio = 7;	//ratio is branch depth to length ratio\n\
  if (depth>0) { \n\
   color( random( 16));\n\
   pendown();\n\
   width (depth + random(0,2));\n\
   forward(ratio * depth);\n\
   left(tilt + spread/2 + spread/branches/2);\n\
   repeat(branches, function () {\n\
     right(spread/branches);\n\
     drawTree(depth-1, branches);\n\
   });\n\
   left(spread - tilt - spread/2 - spread/branches/2); // return to start angle\n\
   penup();\n\
   backward (ratio * depth); // backup to start point\n\
  }\n\
}\n\
\n\
// draw a more random tree\n\
function drawRTree(depth, branches) {\n\
  var spread = random(90,180);	// spread is angle of left to right branches\n\
  var tilt = random(-15,15);	// tilt is angle of the cluster\n\
  var ratio = random (5,9);	// ratio is branch depth to length ratio\n\
  if (depth>0) { \n\
   color( random( 16));\n\
   pendown();\n\
   width (depth + random(0,2));\n\
   forward(ratio * depth);\n\
   left(tilt + spread/2 + spread/branches/2);\n\
   repeat(branches, function () {\n\
     right(spread/branches);\n\
     drawTree(depth-1, branches);\n\
   });\n\
   left(spread - tilt - spread/2 - spread/branches/2); // return to start angle\n\
   penup();\n\
   backward (ratio * depth); // backup to start point\n\
  }\n\
}\n\
\n\
function demo() {\n\
  reset();\n\
  penup();\n\
  backward(150);\n\
  pendown();\n\
  drawTree(6,4)\n\
}\n\
'
