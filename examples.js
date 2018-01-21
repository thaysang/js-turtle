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
\n\
  var maxX =  imageContext.canvas.width/2;\n\
  var maxY =  imageContext.canvas.height/2;\n\
  var minX =  -maxX;\n\
  var minY =  -maxY;\n\
  var maxVelocity = 12;\n\
\n\
function init_drops(n) {\n\
   var drops = new Array(n);\n\
   for (var i = 0; i < n; i++) {\n\
      drops[i] = { // each drop is an object with a set of properties\n\
         x: random(minX, maxX),\n\
         y: random(minY, maxY),\n\
         velocityX: random(-maxVelocity, maxVelocity),\n\
         velocityY: random(-maxVelocity, maxVelocity),\n\
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
      if (d.y < minY) {\n\
         d.velocityY = -d.velocityY;\n\
      }\n\
      else if (d.y + d.size > maxY && d.velocityY > 0) {\n\
         d.velocityY = -d.velocityY;\n\
      }\n\
      if (d.x - d.width/2 < minX) {\n\
         d.velocityX = -d.velocityX;\n\
      }\n\
      else if (d.x + d.width/2 > maxX) {\n\
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
  let_them_drop (Math.floor(maxX * maxY/2000));\n\
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
// Clock, Analog -- draw and animate an analog clock\n\
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
   color("black");\n\
   for (var hour = 1; hour <= 12; hour++) {\n\
      goto(x,y);\n\
      angle(hour * 30);\n\
      forward(radius); // to center of digit\n\
      angle(180);\n\
      forward(10); // vertical correction to baseline\n\
      right(90);\n\
      if (hour < 10) {\n\
        forward(6); // horizontal correction to lower left corner\n\
      } else {\n\
        forward (10)\n\
      }\n\
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
clockBinary ='\
// Clock, Binary -- digital clock using binary digits\n\
\n\
//*** GLOBALS ***\n\
\n\
var hour10;\n\
var hour1;\n\
var minute10;\n\
var minute1;\n\
var second10;\n\
var second1;\n\
\n\
var hourColor = "red"\n\
var minuteColor = "green"\n\
var secondColor = "blue"\n\
var offColor = "lightgray"\n\
\n\
\n\
//*** FUNCTIONS ***\n\
\n\
function tensDigit (number) {\n\
  return Math.floor (number/10) % 10\n\
}\n\
\n\
\n\
function onesDigit (number) {\n\
  return Math.floor (number % 10)\n\
}\n\
\n\
\n\
function getBinaryTime() {\n\
  time = new Date\n\
  hours = time.getHours()\n\
  minutes = time.getMinutes()\n\
  seconds = time.getSeconds()\n\
\n\
  // extract the digits\n\
  hour10 = tensDigit(hours)\n\
  hour1 =  onesDigit(hours)\n\
  min10 =  tensDigit(minutes)\n\
  min1 =   onesDigit(minutes)\n\
  sec10 =  tensDigit(seconds)\n\
  sec1 =   onesDigit(seconds)\n\
\n\
  //pad digits with leading 0s\n\
  hour10 = "0000" + hour10.toString(2)\n\
  hour1 =  "0000" + hour1.toString(2)\n\
  min10 =  "0000" + min10.toString(2)\n\
  min1 =   "0000" + min1.toString(2)\n\
  sec1 =   "0000" + sec1.toString(2)\n\
  sec10 =  "0000" + sec10.toString(2)\n\
  sec1 =   "0000" + sec1.toString(2)\n\
\n\
  //use only 4 digits\n\
  hour10 = hour10.slice(-4)\n\
  hour1 =  hour1.slice(-4)\n\
  min10 =  min10.slice(-4)\n\
  min1 =   min1.slice(-4)\n\
  sec1 =   sec1.slice(-4)\n\
  sec10 =  sec10.slice(-4)\n\
  sec1 =   sec1.slice(-4)\n\
}\n\
\n\
\n\
function displayBinary() {\n\
  color(black)\n\
  write (":"+\n\
    hour10 + " " + hour1 +\n\
    ":"+\n\
    min10 +  " "  + min1 +\n\
    ":"+\n\
    sec10 +  " "  + sec1)\n\
}\n\
\n\
\n\
function drawDot (digit, onColor, offColor, step) {\n\
  if (digit == 1) {\n\
    color( onColor)\n\
  } else {\n\
    color( offColor)\n\
  }\n\
  dot ()\n\
  forward (step)\n\
}\n\
\n\
\n\
function drawNumberDots (digitString, onColor, offColor) {\n\
  drawDot( digitString[0], onColor, offColor, 15)\n\
  drawDot( digitString[1], onColor, offColor, 15)\n\
  drawDot( digitString[2], onColor, offColor, 15)\n\
  drawDot( digitString[3], onColor, offColor, 15)\n\
  backward (60)\n\
}\n\
\n\
\n\
function displayBinaryDots() {\n\
  penup()\n\
  right(90)\n\
  forward(10)\n\
  left(90)\n\
  forward (15)\n\
  right(90)\n\
  drawNumberDots (hour10, hourColor, offColor)\n\
\n\
  left(90)\n\
  forward (25)\n\
  right(90)\n\
  drawNumberDots (hour1, hourColor, offColor)\n\
\n\
  left(90)\n\
  forward (25)\n\
  right(90)\n\
  drawNumberDots (min10, minuteColor, offColor)\n\
\n\
  left(90)\n\
  forward (25)\n\
  right(90)\n\
  drawNumberDots (min1, minuteColor, offColor)\n\
\n\
  left(90)\n\
  forward (25)\n\
  right(90)\n\
  drawNumberDots (sec10, secondColor, offColor)\n\
\n\
  left(90)\n\
  forward (25)\n\
  right(90)\n\
  drawNumberDots (sec1, secondColor, offColor)\n\
}\n\
\n\
\n\
function displayTime() {\n\
  clear()\n\
  home()\n\
  angle(90)\n\
  hideturtle() \n\
  getBinaryTime()\n\
  //displayBinary()\n\
  displayBinaryDots()\n\
}\n\
\n\
animate(displayTime, 1000)\n\
'
clockDigital ='\
// Clock, Digital -- digital clock using seven-segment displays\n\
\n\
//*** GLOBALS ***\n\
\n\
var hour1digit;\n\
var hour10digit;\n\
var min1digit;\n\
var min10digit;\n\
var sec10digit;\n\
var sec1digit;\n\
\n\
\n\
//*** CONSTANTS ***\n\
\n\
/*\n\
The seven-segment display is layed out as follows:\n\
   --a--\n\
  |      |\n\
  f      b\n\
  |      |\n\
   --g--\n\
  |      |\n\
  e      c\n\
  |      |\n\
   --d--\n\
*/\n\
//segment strings are in the order: abcdefg\n\
//  where 1 turns segment on\n\
//    and 0 turns segment off\n\
var segments = [ "1111110", //0\n\
                 "0110000", //1\n\
                 "1101101", //2\n\
                 "1111--1", //3\n\
                 "0110011", //4\n\
                 "1011011", //5\n\
                 "1011111", //6\n\
                 "1110000", //7\n\
                 "1111111", //8\n\
                 "1110011"  //9\n\
               ]\n\
\n\
var segSize = 30 // pixels\n\
segAngle = 10 // degrees\n\
segOnColor = "red"\n\
segOffColor = "black"\n\
digitSpacing = 1.4 * segSize\n\
interdigitSpacing = 1.6 * digitSpacing\n\
\n\
\n\
//*** FUNCTIONS ***\n\
\n\
function tensDigit (number) {\n\
  return Math.floor (number/10) % 10\n\
}\n\
\n\
\n\
function onesDigit (number) {\n\
  return Math.floor (number % 10)\n\
}\n\
\n\
\n\
function getTime() {\n\
  time = new Date\n\
  hours = time.getHours()\n\
  minutes = time.getMinutes()\n\
  seconds = time.getSeconds()\n\
\n\
  // extract the digits\n\
  hour10digit = tensDigit(hours)\n\
  hour1digit = onesDigit(hours)\n\
  min10digit = tensDigit(minutes)\n\
  min1digit = onesDigit(minutes)\n\
  sec10digit = tensDigit(seconds)\n\
  sec1digit = onesDigit(seconds)\n\
}\n\
\n\
\n\
function segColor (bit) {\n\
  if (bit == "1") {\n\
    color( segOnColor)\n\
  } else {\n\
    color( segOffColor)\n\
  }\n\
}\n\
\n\
\n\
function display7segment(digit) {\n\
  pendown()\n\
  segColor (segments [digit].substr(0,1)) //a\n\
  forward (segSize)\n\
  right(90+segAngle)\n\
  segColor (segments [digit].substr(1,1)) //b\n\
  forward (segSize)\n\
  segColor (segments [digit].substr(2,1)) //c\n\
  forward (segSize)\n\
  right (90-segAngle)\n\
  segColor (segments [digit].substr(3,1)) //d\n\
  forward (segSize)\n\
  right (90+segAngle)\n\
  segColor (segments [digit].substr(4,1)) //e\n\
  forward (segSize)\n\
  right (90-segAngle)\n\
  segColor (segments [digit].substr(6,1)) //g\n\
  forward (segSize)\n\
  backward (segSize)\n\
  left (90-segAngle)\n\
  segColor (segments [digit].substr(5,1)) //f\n\
  forward (segSize)\n\
  right (90-segAngle)\n\
  penup()\n\
}\n\
\n\
\n\
function displaySegTime() {\n\
  // black out background\n\
  goto (minX(),0)\n\
  angle (90)\n\
  color(black)\n\
  width (2*maxY())\n\
  pendown()\n\
  forward(2*maxX())\n\
\n\
  // draw the 6 digits of time\n\
  goto (-4*segSize, segSize)\n\
  width (6)\n\
  display7segment(hour10digit)\n\
  forward (digitSpacing)\n\
  display7segment(hour1digit)\n\
\n\
  forward (interdigitSpacing)\n\
  display7segment(min10digit)\n\
  forward (digitSpacing)\n\
  display7segment(min1digit)\n\
\n\
  forward (interdigitSpacing)\n\
  display7segment(sec10digit)\n\
  forward (digitSpacing)\n\
  display7segment(sec1digit)\n\
}\n\
\n\
\n\
function displayTime() {\n\
  hideturtle() \n\
  getTime()\n\
  displaySegTime()\n\
}\n\
\n\
\n\
animate(displayTime, 1000)\n\
'
colorChangingDots ='\
//Color Changing Dots -- demonstrate the concept of changing the colors of a string of dots (lights?)\n\
\n\
/*\n\
Maybe you can adapt to make a traffic light simulator or Christmas light\n\
controller.\n\
*/\n\
\n\
function drawDot () {\n\
    color(random(16))\n\
    dot()\n\
    forward (15)\n\
}\n\
\n\
function drawRowOfDots () {\n\
  setpos(minX() + 20,0)\n\
  repeat (32, drawDot)\n\
}\n\
\n\
function colorChangingDots () {\n\
  wrap(false)\n\
  setpos(minX(),0)\n\
  angle(90)\n\
  pendown()\n\
  color ("black")\n\
  penwidth (80)\n\
  forward (maxX() + maxX()) //draw black band\n\
  penup()\n\
  width (1)\n\
  animate( drawRowOfDots, 500)\n\
}\n\
\n\
demo = colorChangingDots;\n\
'
compassRose ='\
// Compass Rose -- Draw a compass rose with same triangles\n\
\n\
// The triangle functions could provide shading and color\n\
\n\
function triangle (side){\n\
  forward (side)\n\
  a = 45\n\
  b = (180-a)/2\n\
  right (180 - b)\n\
  //forward (.748* side)\n\
  forward (side * 2 * Math.sin(a/2/360*6.28))\n\
  right (180 - b)\n\
  forward (side)\n\
  right (180-a)\n\
}\n\
\n\
function triangleL (side){\n\
  forward (side)\n\
  a = 45\n\
  b = (180-a)/2\n\
  left (180 - b)\n\
  forward (side * 2 * Math.sin(a/2/360*6.28))\n\
  left (180 - b)\n\
  forward (side)\n\
  left (180-a)\n\
}\n\
\n\
function halfTri(side) {\n\
  triangle (side)\n\
  forward(side)\n\
  triangle (side)\n\
  right(45+(180-45)/2)\n\
  forward(side * 2 * Math.sin( 45/2/360*6.28))\n\
  left(180-(180-45)/2)\n\
  triangle(side)\n\
  left(180-45)\n\
  forward( side)\n\
  right(180-45)\n\
}\n\
\n\
function flipIt (side) {\n\
  //not quite symmetrical...\n\
  penup()\n\
  forward( side*3)\n\
  right( 45)\n\
  forward(side*3)\n\
  right(180-45)\n\
  pendown()\n\
  thirdTri(side)\n\
  penup()\n\
  right (45)\n\
  forward(side*3)\n\
  left(45)\n\
  forward(side*3)\n\
  left(180)\n\
  pendown()\n\
}\n\
\n\
\n\
function flipHalf (side) {\n\
  //not quite symmetrical...\n\
  penup()\n\
  forward( side*3)\n\
  right( 45)\n\
  forward(side*3)\n\
  right(180-45)\n\
  pendown()\n\
  halfTri(side)\n\
  penup()\n\
  right (45)\n\
  forward(side*3)\n\
  left(45)\n\
  forward(side*3)\n\
  left(180)\n\
  pendown()\n\
}\n\
\n\
\n\
function flipPoint (side) {\n\
  //not quite symmetrical...\n\
  penup()\n\
  forward( side*3)\n\
  right( 45)\n\
  forward(side*3)\n\
  right(180-45)\n\
  pendown()\n\
  //triangle(side/2)\n\
  halfTri(side/2)\n\
  penup()\n\
  right (45)\n\
  forward(side*3)\n\
  left(45)\n\
  forward(side*3)\n\
  left(180)\n\
  pendown()\n\
}\n\
\n\
function thirdTri(side) {\n\
  triangle (side)//1\n\
  penup()\n\
  forward(side)\n\
  pendown()\n\
  triangle (side)//2\n\
  penup()\n\
  forward(side)\n\
  pendown()\n\
  triangle (side)//3\n\
  penup()\n\
  right(45+(180-45)/2)\n\
  forward(side * 2 * Math.sin( 45/2/360*6.28))\n\
  left(180-(180-45)/2)\n\
  pendown()\n\
  triangle(side)//4\n\
  penup()\n\
  backward(side)\n\
  pendown()\n\
  triangle(side)//5\n\
  penup()\n\
  right(45)\n\
  forward( side)\n\
  left(45)\n\
  pendown()\n\
  triangle(side)//6\n\
  penup()\n\
  left(180-45)\n\
  forward( side * 2)\n\
  right(180-45)\n\
  pendown()\n\
}\n\
\n\
\n\
function boxTheCompass() {\n\
  penup()\n\
  angle( 0)\n\
  boxedCompass=["N", "NxE", "NNE", "NExN", "NE", "NExE", "ENE", "ExN", "E", "ExS", "ESE", "SExE", "SE", "SExS", "SSE", "SxE", "S", "SxW", "SSW", "SWxS", "SW", "SWxW", "WSW", "WxS", "W", "WxN", "WNW", "NWxW", "NW", "NWxN", "NNW", "NxW"]\n\
  textRadius = side*5.7\n\
  for (i=0; i<32; i++) {\n\
  \n\
    forward (textRadius)\n\
    right(90)\n\
    textLen = boxedCompass[i].length*10/2\n\
    backward (textLen)\n\
    fontSize = i % 4\n\
    if (fontSize == 1 || fontSize == 3) {\n\
      setfont("normal 10pt Helvetica")\n\
    } else if (fontSize == 2) {\n\
      setfont("bold 10pt Helvetica")\n\
    } else {\n\
      setfont("bold 14pt Helvetica")\n\
    }\n\
    write(boxedCompass[i])\n\
    forward (textLen)\n\
    left(90)\n\
    backward (textRadius)\n\
    right(360/32)\n\
  }\n\
}\n\
\n\
\n\
function demo () {\n\
  reset()\n\
  wrap(false)\n\
  hideTurtle() // do not want it to show, so do this early\n\
  redrawOnMove(false) // do not redraw image each move\n\
  side = 40\n\
  left(22.5)\n\
  for (i=0; i<8; i++) {\n\
    thirdTri (side)\n\
    flipIt (side)\n\
    right(45)\n\
  }\n\
  for (i=0; i<8; i++) {\n\
    halfTri (side/2)\n\
    right(45)\n\
  }\n\
  right(22.5)\n\
  for (i=0; i<8; i++) {\n\
    flipHalf (side)\n\
    right(45)\n\
  }\n\
  right(11.25)\n\
  for (i=0; i<16; i++) {\n\
    flipPoint (side)\n\
    right(22.5)\n\
  }\n\
\n\
  boxTheCompass()\n\
  //redrawOnMove(true)\n\
  draw() // just to render the final product\n\
}\n\
\n\
demo()\n\
'
compassRoseQuilt ='\
// Compass Rose Quilt -- Compass Rose with Polygons\n\
\n\
//### CONTROLING VARIABLES\n\
//number of main divisions of the directional triangles\n\
mainDivisions = 4\n\
//number of divisions in the most triangles\n\
subDivisions8 = 3\n\
//number of main divisions in 16th points\n\
mainDivisions16 = 2\n\
//number of subdivisions in 16th points\n\
subDivisions16 = 2\n\
//number of main divisions in 32nds points\n\
mainDivisions32 = 1\n\
//number of subdivisions in 32nds points\n\
subDivisions32 = 3\n\
\n\
//color of background\n\
backgroundColor = "blue"\n\
//color of compass background\n\
compassBackgroundColor = "black"\n\
//color of text\n\
compassTextColor = "white"\n\
//color of inner direction background\n\
inner8BackgroundColor = "black"\n\
//color of inward direction (array)\n\
inner8Colors = ["gold", "salmon"]\n\
\n\
//color of outer direction background\n\
outer8BackgroundColor = "black"\n\
//color of outer direction (array)\n\
outer8Colors = ["yellow", "red"]\n\
\n\
\n\
//background color of 16ths\n\
background16Color = "gold"\n\
//foreground color of 16ths\n\
foreground16Color = "salmon"\n\
//background color of 32nds\n\
background32Color = "black"\n\
//foreground color of 32nds\n\
foreground32Color = "yellow"\n\
\n\
\n\
function indexColor(index, colors) {\n\
  var len = colors.length\n\
  return colors[ index % len]\n\
}\n\
\n\
\n\
function triangle (side){\n\
  forward (side)\n\
  a = 45\n\
  b = (180-a)/2\n\
  right (180 - b)\n\
  //forward (.748* side)\n\
  forward (side * 2 * Math.sin(a/2/360*6.28))\n\
  right (180 - b)\n\
  forward (side)\n\
  right (180-a)\n\
}\n\
\n\
\n\
function splitTri(outerSide, num, foreColor, triSide) {\n\
  var i, j\n\
  \n\
  if (triSide == undefined) {\n\
    triSide = outerSide\n\
  }\n\
  innerSide = triSide / num\n\
  for (j = num; j >0; j -= 1) {\n\
     for (i = 0; i <j; i += 1) {\n\
        beginShape()\n\
        triangle (innerSide)\n\
        fillShape(foreColor)\n\
        penup()\n\
        forward(innerSide)\n\
        pendown()\n\
     }\n\
    penup()\n\
    backward( j * innerSide)\n\
    right(45)\n\
    forward( innerSide)\n\
    left(45)\n\
    pendown()\n\
  }\n\
  penup()\n\
  right(45)\n\
  backward( innerSide * num)\n\
  left(45)\n\
  pendown()\n\
}\n\
\n\
\n\
function flipSplitTri( outerSide, num, foreColor, triSide) {\n\
  penup()\n\
  forward( outerSide)\n\
  right( 45)\n\
  forward( outerSide)\n\
  right( 180-45)\n\
  pendown()\n\
  splitTri( outerSide, num, foreColor, triSide)\n\
  penup()\n\
  right( 45)\n\
  forward( outerSide)\n\
  left( 45)\n\
  forward( outerSide)\n\
  left( 180)\n\
  pendown()\n\
}\n\
\n\
\n\
function labelPoints(col) {\n\
  penup()\n\
  angle( 0)\n\
  boxedCompass=["N", "NxE", "NNE", "NExN", "NE", "NExE", "ENE", "ExN", "E", "ExS", "ESE", "SExE", "SE", "SExS", "SSE", "SxE", "S", "SxW", "SSW", "SWxS", "SW", "SWxW", "WSW", "WxS", "W", "WxN", "WNW", "NWxW", "NW", "NWxN", "NNW", "NxW"]\n\
\n\
  // fill in the compass background\n\
\n\
  //textRadius = side*5.7\n\
  textRadius = side*1.9\n\
  color( compassTextColor)\n\
\n\
  for (i=0; i<32; i++) {\n\
  \n\
    forward (textRadius)\n\
    right(90)\n\
    textLen = boxedCompass[i].length*10/2\n\
    backward (textLen)\n\
    fontSize = i % 4\n\
    if (fontSize == 1 || fontSize == 3) {\n\
      setfont("normal 10pt Helvetica")\n\
    } else if (fontSize == 2) {\n\
      setfont("bold 10pt Helvetica")\n\
    } else {\n\
      setfont("bold 14pt Helvetica")\n\
    }\n\
    write(boxedCompass[i])\n\
    forward (textLen)\n\
    left(90)\n\
    backward (textRadius)\n\
    right(360/32)\n\
  }\n\
}\n\
\n\
\n\
function demo () {\n\
  side = 120\n\
  reset()\n\
  wrap(false)\n\
  hideTurtle() // don"t want it to show,  do this early\n\
  redrawOnMove(false) // don"t redraw image each move\n\
\n\
  // fill in the background\n\
  goto( minX()+1, maxY()-1)\n\
  right( 90)\n\
  beginShape()\n\
  forward( 2 * maxX()-2)\n\
  right( 90)\n\
  forward( 2 * maxY()-2)\n\
  right( 90)\n\
  forward( 2 * maxX()-2)\n\
  right( 90)\n\
  forward( 2 * maxY()-2)\n\
  fillShape( backgroundColor)\n\
\n\
  //fill in the compass background\n\
  goto(0,0)\n\
  color( compassBackgroundColor)\n\
  beginShape()\n\
  circle (side * 2.1)\n\
  fillShape( \n\
     compassBackgroundColor)\n\
\n\
  //fill in the eight compass major points\n\
  goto(0,0)\n\
  angle(0)\n\
  left(22.5)\n\
  for (i=0; i<8; i++) {\n\
    splitTri (side, mainDivisions, indexColor( i, inner8Colors))\n\
    flipSplitTri( side, mainDivisions, indexColor( i, outer8Colors))\n\
    right(45)\n\
  }\n\
\n\
  //ornament the center\n\
  for (i=0; i<8; i++) {\n\
    splitTri (side/mainDivisions, subDivisions8, "yellow")\n\
    right(45)\n\
  }\n\
\n\
 //place the sixteenth points\n\
  right(22.5)\n\
  for (i=0; i<8; i++) {\n\
    flipSplitTri (side, 1, background16Color,\n\
        side * mainDivisions16/mainDivisions)\n\
    flipSplitTri (side, subDivisions16, foreground16Color,\n\
        side * mainDivisions16/mainDivisions)\n\
    right(45)\n\
  }\n\
\n\
   //place the thirty-second points\n\
  right(11.25)\n\
  for (i=0; i<16; i++) {\n\
    flipSplitTri (side, 1, background32Color,\n\
        side * mainDivisions32/mainDivisions)\n\
    flipSplitTri (side, subDivisions32, foreground32Color,\n\
        side * mainDivisions32/mainDivisions)\n\
    right(22.5)\n\
  }\n\
\n\
  labelPoints()\n\
\n\
  //redrawOnMove(true)\n\
  draw() // just to render the final product\n\
}\n\
'
conwayFractal ='\
// Conway Fractal -- Conway\'s pinwheel tessellation as a fractal\n\
// the British mathematician John Conway devised a tesselation using triagles\n\
// that has no periodicity called the pinwheel tesselation.  This is a fractal\n\
// form of that tessellation.\n\
\n\
/*\n\
from a point can:\n\
 - draw a triangle X\n\
 - draw a triangle and 4 siblings as a newer larger triangle\n\
 - divide a triangle into 5 offspring triangles\n\
\n\
Recursion for:\n\
  expanding a set of triangles from a point\n\
  dividing a set of triangles from a point.\n\
\n\
need routines for\n\
  recursive expansion\n\
  - expand, move to new base, change size\n\
  move to 5 base points dividing a triangle\n\
  move to 5 base points expanding a triangle\n\
  conditionally draw triangle or subdivide\n\
\n\
  * optionally have a delay for animation\n\
\n\
  * options to grid certain triangles (all, none, prime, non-prime)\n\
\n\
  * option to change width of triangle outline (level, triangle)\n\
*/\n\
\n\
\n\
//*** GLOBALS ***\n\
\n\
var level = 0\n\
var targetLevel = 5\n\
var side = .80 * Math.min( maxY()*2, maxX()) // base of big triangle\n\
var mainColor = "tan"\n\
var subColor = "wheat"\n\
var dividerColor = "black"\n\
var stepsize = 1.5       //spacing between shading lines\n\
var specialTriangle = 0  // triangle number selected for highlighting (1-5, 0 for none)\n\
\n\
\n\
//*** CONSTANTS ***\n\
\n\
var targetLevel = 4\n\
var root5 = Math.sqrt(5)\n\
var anglea = Math.asin( 1 / root5) * 360 / 2 / Math.PI\n\
var angleb = Math.asin( 2 / root5) * 360 / 2 / Math.PI\n\
var CCW = false\n\
var CW = true\n\
\n\
\n\
//*** FUNCTIONS ***\n\
\n\
function dturn( dir, degrees) {\n\
  if (dir) {\n\
    right( degrees)\n\
  } else {\n\
    left ( degrees)\n\
  }\n\
}\n\
\n\
function drawTriangle (dir, side) {\n\
  forward (2*side)\n\
  dturn(dir, 180-anglea)\n\
  forward (root5*side)\n\
  dturn (dir, 180-angleb)\n\
  forward (side)\n\
  dturn (dir, 90)\n\
}\n\
\n\
\n\
function caption (message) {\n\
  // save your current position, heading, etc.\n\
  var savedX = turtle.pos.x\n\
  var savedY = turtle.pos.y\n\
  var savedHeading = turtle.angle / 2 / Math.PI * 360 //convert radians to degrees\n\
  var savedColor = turtle.color\n\
  var savedWidth = turtle.width\n\
\n\
  goto (minX()+10, minY()+10)\n\
  setheading( 90)\n\
\n\
  // erase wha will be in the path\n\
  color ("white")\n\
  width (10)\n\
  forward (maxY() * 2 - 12)\n\
  goto (minX()+10, minY()+5)\n\
  color ("black")\n\
  write( message)\n\
\n\
  //go back from whence you came\n\
  goto( savedX, savedY)\n\
  setheading( savedHeading)\n\
  color ( savedColor)\n\
  width (savedWidth)\n\
}\n\
\n\
\n\
function shadeTriangle( dir, side, stepsize) {\n\
  console.log( "sT: " + dir + " " + side + " " + stepsize)\n\
  var x = turtle.pos.x\n\
  var y = turtle.pos.y\n\
  var steps = Math.floor( side/stepsize)\n\
\n\
  for (var i=0; i< steps; i++) {\n\
     forward( 2*side * (steps-i)/steps)\n\
     backward( 2*side * (steps-i)/steps)\n\
     penup()\n\
     dturn( dir, 90)\n\
     forward( stepsize)\n\
     dturn( !dir, 90)\n\
     pendown()\n\
  }\n\
  //return to start\n\
  penup()\n\
  dturn( !dir, 90)\n\
  forward( side)\n\
  dturn( dir, 90)\n\
  //goto(x,y) // cancel cumulative error\n\
  pendown()\n\
}\n\
\n\
function recursiveDivide( dir, side, level, triangle) {\n\
  //console.log("rD: " + level + " " + triangle)\n\
  if (level > 0) {\n\
    side = 0. + side/root5\n\
    var x = turtle.pos.x\n\
    var y = turtle.pos.y\n\
    \n\
    //draw the first line to point A\n\
    dturn( dir, angleb)\n\
    pendown()\n\
    forward (2*side)\n\
\n\
    //sub triangle 1\n\
    right (180)\n\
    recursiveDivide( !dir, side, level-1, 1)\n\
    right (180)\n\
\n\
    //draw the second line to point B\n\
    dturn( !dir, 180-angleb)\n\
    pendown()\n\
    forward (root5*side)\n\
    \n\
    //draw third line to point C\n\
    dturn( dir, 180-angleb)\n\
    forward(side)\n\
    penup()\n\
\n\
i    //sub triangle 4\n\
    dturn( dir, 90)\n\
    recursiveDivide( dir, side, level-1, 4)\n\
\n\
    //sub triangle 5\n\
    right( 180)\n\
    recursiveDivide( !dir, side, level-1, 5)\n\
    dturn( dir, 90)\n\
    \n\
    //retreat to point B\n\
    backward(side)\n\
    dturn( dir, 90)\n\
    \n\
    //draw fourth line to point D\n\
    pendown()\n\
    forward( 2*side)\n\
    penup()\n\
\n\
    //sub triangle 2\n\
    right( 180)\n\
    recursiveDivide( !dir, side, level-1, 2)\n\
\n\
    //sub triangle 3\n\
    recursiveDivide( dir, side, level-1, 3)\n\
    \n\
    //retreat to origin\n\
    dturn( !dir, 90)\n\
    penup()\n\
    forward( side)\n\
    pendown()\n\
    dturn( dir, 180-angleb)\n\
    //goto (x,y) //cancel cumulative error\n\
//  } else {\n\
    //if (triangle == 3) {\n\
//    if (triangle == specialTriangle) {\n\
//      shadeTriangle (dir, side, stepsize)\n\
//    }\n\
  }\n\
}\n\
\n\
function recursiveDivideBlocks( dir, side, level, triangle, background, highlight) {\n\
  //console.log( "rDB: " + level + " " + triangle + " " + background + " " + highlight)\n\
  if (level > 0) {\n\
    side = side/root5\n\
    var x = turtle.pos.x\n\
    var y = turtle.pos.y\n\
\n\
    //move to point A\n\
    penup()\n\
    dturn( dir, angleb)\n\
    forward (2 * side)\n\
\n\
    //sub triangle 1\n\
    right (180)\n\
    pendown()\n\
    recursiveDivideBlocks( !dir, side, level-1, 1, background, highlight)\n\
    penup()\n\
    right (180)\n\
\n\
    //move to pint B\n\
    dturn( !dir, 180-angleb)\n\
    forward (root5*side)\n\
    \n\
    //move to point C\n\
    dturn( dir, 180-angleb)\n\
    forward(side)\n\
\n\
    //sub triangle 4\n\
    dturn( dir, 90)\n\
    pendown()\n\
    recursiveDivideBlocks( dir, side, level-1, 4, background, highlight)\n\
    penup()\n\
\n\
    //sub triangle 5\n\
    right( 180)\n\
    pendown()\n\
    recursiveDivideBlocks( !dir, side, level-1, 5, background, highlight)\n\
    penup()\n\
\n\
    //retreat to point B\n\
    dturn( dir, 90)\n\
    backward(side)\n\
\n\
    //move to point B\n\
    dturn( dir, 90)\n\
    forward( 2*side)\n\
\n\
//sub triangle 2\n\
    right( 180)\n\
    pendown()\n\
    recursiveDivideBlocks( !dir, side, level-1, 2, background, highlight)\n\
\n\
    //sub triangle 3\n\
    recursiveDivideBlocks( dir, side, level-1, 3, highlight, highlight)\n\
    penup()\n\
\n\
    //move to origin\n\
    dturn( !dir, 90)\n\
    forward (side)\n\
\n\
    dturn( dir, 180-angleb)\n\
    goto (x,y) //cancel cumulative error\n\
  } else {\n\
    if (triangle == 3) {\n\
    //if (triangle == specialTriangle) {\n\
      color( highlight)\n\
      console.log("shading " + highlight)\n\
      shadeTriangle (dir, side, stepsize)\n\
    } else {\n\
      color( background)\n\
      shadeTriangle (dir, side, stepsize)\n\
    }\n\
  }\n\
}\n\
\n\
\n\
function delayedDivide() {\n\
  level = level + 1\n\
  if (level <= targetLevel) {\n\
    recursiveDivideBlocks( CCW, side, level, 0, mainColor, subColor)\n\
    color(dividerColor)\n\
    recursiveDivide( CCW, side, level, 0)\n\
    drawTriangle( CCW, side)\n\
    caption( "Fractal divide, generation " + level)\n\
    delay( delayedDivide, 3000)\n\
  }\n\
}\n\
\n\
\n\
//*** MAIN ***\n\
\n\
function demo() {\n\
  // initialize\n\
  reset()\n\
  wrap(false)\n\
  penup()\n\
  backward (side/4)\n\
  right(90)\n\
  backward (side)\n\
\n\
  // label the sides of the triangle\n\
  setfont("bold 14px sans-serif")\n\
  left( anglea)\n\
  forward( side+50)\n\
  right( anglea)\n\
  write( "√5")\n\
  left( anglea)\n\
  backward( side+50)\n\
  right( anglea)\n\
  right( 90)\n\
  forward (20)\n\
  left( 90)\n\
  forward( side)\n\
  write (2)\n\
  backward( side+20)\n\
  left( 90)\n\
  forward( side/2 + 20)\n\
  right( 90)\n\
  write( 1)\n\
  forward( 20)\n\
  right(90)\n\
  forward (side/2)\n\
  left(90)\n\
\n\
  pendown()\n\
  drawTriangle( CCW, side)\n\
\n\
  level = 0\n\
\n\
  delay( delayedDivide, 3000)\n\
}\n\
'
conwayPinwheel ='\
// Conway Pinwheel -- Conway\'s pinwheel tessellation\n\
// the British mathematician John Conway devised a tesselation using triagles\n\
// that has no periodicity called the pinwheel tesselation.\n\
\n\
/*\n\
from a point can:\n\
 - draw a triangle X\n\
 - draw a triangle and 4 siblings as a newer larger triangle\n\
 - divide a triangle into 5 offspring triangles\n\
\n\
Recursion for:\n\
  expanding a set of triangles from a point\n\
  dividing a set of triangles from a point.\n\
\n\
need routines for\n\
  recursive expansion\n\
  - expand, move to new base, change size\n\
  move to 5 base points dividing a triangle\n\
  move to 5 base points expanding a triangle\n\
  conditionally draw triangle or subdivide\n\
\n\
  * optionally have a delay for animation\n\
\n\
  * options to grid certain triangles (all, none, prime, non-prime)\n\
\n\
  * option to change width of triangle outline (level, triangle)\n\
*/\n\
\n\
\n\
//*** GLOBALS ***\n\
\n\
var levels = 4\n\
var targetSide = .80 * Math.min( maxY()*2, maxX()) // base of big encompassing triangle\n\
var delayedSide = 0		// current side being worked\n\
\n\
var mainColor = "tan"\n\
var subColor = "wheat"\n\
var dividerColor = "black"\n\
var stepsize = 1.5       //spacing between shading lines\n\
var specialTriangle = 0  // triangle number selected for highlighting (1-5, 0 for none)\n\
\n\
\n\
//*** CONSTANTS ***\n\
\n\
var root5 = Math.sqrt(5)\n\
var anglea = Math.asin( 1 / root5) * 360 / 2 / Math.PI\n\
var angleb = Math.asin( 2 / root5) * 360 / 2 / Math.PI\n\
var CCW = false\n\
var CW = true\n\
\n\
\n\
//*** FUNCTIONS ***\n\
\n\
function dturn( dir, degrees) { // allows turning based on triangle type\n\
  if (dir) {\n\
    right( degrees)\n\
  } else {\n\
    left ( degrees)\n\
  }\n\
}\n\
\n\
\n\
function drawTriangle (dir, side) {\n\
  forward (2*side)\n\
  dturn(dir, 180-anglea)\n\
  forward (root5*side)\n\
  dturn (dir, 180-angleb)\n\
  forward (side)\n\
  dturn (dir, 90)\n\
}\n\
\n\
\n\
function caption (message) {\n\
  // save your current position, heading, etc.\n\
  var savedX = turtle.pos.x\n\
  var savedY = turtle.pos.y\n\
  var savedHeading = turtle.angle / 2 / Math.PI * 360 //convert radians to degrees\n\
  var savedColor = turtle.color\n\
  var savedWidth = turtle.width\n\
\n\
  goto (minX()+10, minY()+10)\n\
  setheading( 90)\n\
\n\
  // erase wha will be in the path\n\
  color ("white")\n\
  width (10)\n\
  forward (maxY() * 2 - 12)\n\
  goto (minX()+10, minY()+5)\n\
  color ("black")\n\
  write( message)\n\
\n\
  //go back from whence you came\n\
  goto( savedX, savedY)\n\
  setheading( savedHeading)\n\
  color ( savedColor)\n\
  width (savedWidth)\n\
}\n\
\n\
\n\
\n\
function shadeTriangle( dir, side, stepsize) {\n\
  console.log( "sT: " + dir + " " + side + " " + stepsize)\n\
  var x = turtle.pos.x\n\
  var y = turtle.pos.y\n\
  var steps = Math.floor( side/stepsize)\n\
\n\
  for (var i=0; i< steps; i++) {\n\
     forward( 2*side * (steps-i)/steps)\n\
     backward( 2*side * (steps-i)/steps)\n\
     penup()\n\
     dturn( dir, 90)\n\
     forward( stepsize)\n\
     dturn( !dir, 90)\n\
     pendown()\n\
  }\n\
  //return to start\n\
  penup()\n\
  dturn( !dir, 90)\n\
  forward( side)\n\
  dturn( dir, 90)\n\
  //goto(x,y) // cancel cumulative error\n\
  pendown()\n\
}\n\
\n\
\n\
function recursiveDivide( dir, side, level, triangle) {\n\
  //console.log("rD: " + level + " " + triangle)\n\
  if (level > 0) {\n\
    side = 0. + side/root5\n\
    var x = turtle.pos.x\n\
    var y = turtle.pos.y\n\
    \n\
    //draw the first line to point A\n\
    dturn( dir, angleb)\n\
    pendown()\n\
    forward (2*side)\n\
\n\
    //sub triangle 1\n\
    right (180)\n\
    recursiveDivide( !dir, side, level-1, 1)\n\
    right (180)\n\
\n\
    //draw the second line to point B\n\
    dturn( !dir, 180-angleb)\n\
    pendown()\n\
    forward (root5*side)\n\
    \n\
    //draw third line to point C\n\
    dturn( dir, 180-angleb)\n\
    forward(side)\n\
    penup()\n\
\n\
i    //sub triangle 4\n\
    dturn( dir, 90)\n\
    recursiveDivide( dir, side, level-1, 4)\n\
\n\
    //sub triangle 5\n\
    right( 180)\n\
    recursiveDivide( !dir, side, level-1, 5)\n\
    dturn( dir, 90)\n\
    \n\
    //retreat to point B\n\
    backward(side)\n\
    dturn( dir, 90)\n\
    \n\
    //draw fourth line to point D\n\
    pendown()\n\
    forward( 2*side)\n\
    penup()\n\
\n\
    //sub triangle 2\n\
    right( 180)\n\
    recursiveDivide( !dir, side, level-1, 2)\n\
\n\
    //sub triangle 3\n\
    recursiveDivide( dir, side, level-1, 3)\n\
    \n\
    //retreat to origin\n\
    dturn( !dir, 90)\n\
    penup()\n\
    forward( side)\n\
    pendown()\n\
    dturn( dir, 180-angleb)\n\
    //goto (x,y) //cancel cumulative error\n\
//  } else {\n\
//    if (triangle == 3) {\n\
//    if (triangle == specialTriangle) {\n\
//      shadeTriangle (dir, side, stepsize)\n\
//    }\n\
  }\n\
}\n\
\n\
\n\
function moveToExpandOrigin (side) {\n\
  penup()\n\
  right( 90)\n\
  forward( side)\n\
  left( 180 - angleb)\n\
  pendown()\n\
}\n\
\n\
\n\
function startDelayedDivide() {\n\
  // move to the origin of the big triangle\n\
  reset()\n\
  color(mainColor)\n\
  penup()\n\
\n\
  side = targetSide\n\
  backward (side/2)\n\
  right(90)\n\
  backward (side)\n\
  pendown()\n\
\n\
  iterations = 4\n\
  level = 0\n\
\n\
  pendown()\n\
  color("black")\n\
  delayedDivide()\n\
}\n\
\n\
\n\
function delayedDivide() {\n\
  //console.log ("dD: "+ side + " " + level)\n\
  recursiveDivide( CCW, side, level, 0)\n\
  drawTriangle( CCW, side)\n\
  caption( "Division, generation " + level)\n\
  level = level + 1\n\
  if (level <= iterations) {\n\
    delay( delayedDivide,1000)\n\
  } else {\n\
    delay( startDelayedExpansion, 3000)\n\
  }\n\
}\n\
\n\
function startDelayedExpansion() {\n\
  //move to the origin of the big triangle\n\
  reset ()\n\
  wrap( false)\n\
  color(mainColor)\n\
  penup()\n\
\n\
  var tempSide = targetSide\n\
  backward (side/2)\n\
  right(90)\n\
  backward (side)\n\
\n\
  iterations = 4\n\
  depth = 0\n\
  dir = CCW\n\
\n\
  // move the starting point so that it ends where it starts\n\
  for (var i=0; i<iterations; i++) {\n\
    tempSide = tempSide/root5\n\
  }\n\
  delayedSide = tempSide\n\
  for (var i=0; i<iterations; i++) {\n\
    tempSide = tempSide * root5\n\
  }\n\
  for (var i=0; i<iterations; i++) {\n\
    pendown()\n\
    drawTriangle( dir, tempSide)\n\
    penup()\n\
    dturn( dir, angleb)\n\
    forward( tempSide/root5)\n\
    dturn( !dir, 90)\n\
    tempSide = tempSide / root5\n\
    drawTriangle( tempSide) // really just for reference\n\
    console.log(i)\n\
  }\n\
\n\
  pendown()\n\
  color ("blue")\n\
  shadeTriangle( CCW, tempSide, stepsize)\n\
  color("black")\n\
  delay( delayedExpansion,1000)\n\
}\n\
\n\
function delayedExpansion() {\n\
  /* on entry\n\
    delayedSide is the size of the base triangle.\n\
    depth is how many generations to do.\n\
  */\n\
\n\
  moveToExpandOrigin( delayedSide)\n\
  delayedSide = delayedSide * root5\n\
  //console.log( "dE: " + depth + " " + iterations + " " + delayedSide)\n\
  recursiveDivide( CCW, delayedSide, depth+1, 0)\n\
  drawTriangle( CCW, delayedSide)\n\
  caption( "Expansion, generation " + (depth+1))\n\
\n\
  depth = depth + 1\n\
  if (depth < iterations) {\n\
    delay( delayedExpansion,1000)\n\
  } else {\n\
    delayedSide = targetSide\n\
    delay( startDelayedDivide, 3000)\n\
  }\n\
}\n\
\n\
\n\
//***MAIN***\n\
\n\
console.log ("Starting")\n\
stepsize = 1.5\n\
iterations = 4\n\
iterations = 2\n\
level = 1\n\
depth = 0\n\
CCW = false // triangle is to the left side of the right angle ( height, hypotenuse, base)\n\
CW = true // triangle is to the right side of the right angle( height, hypotenuse, base)\n\
mainColor = "tan"\n\
subColor = "wheat"\n\
specialTriangle = 0\n\
\n\
\n\
function demo() {\n\
  /* want demo to show a mix of divide and expand with animation\n\
\n\
basically:\n\
  starts up with a delayed division set up\n\
  when that is over\n\
  continue with a delayed expansion\n\
*/\n\
  reset()\n\
  side = targetSide\n\
  wrap(false)\n\
  color(mainColor)\n\
  penup()\n\
  backward (side/2)\n\
  right(90)\n\
  backward (side)\n\
  pendown()\n\
\n\
  startDelayedExpansion()\n\
}\n\
'
coordinates ='\
//Canvas Coordinates -- draw the axes of the coordinate system on the canvas\n\
\n\
function lines () {\n\
  clear()\n\
  pendown()\n\
\n\
  goto(0,minY())\n\
  angle(0)\n\
  forward (2*maxY())\n\
\n\
  goto(minX(),0)\n\
  angle(90)\n\
  forward (2*maxX())\n\
\n\
  //lable the axes\n\
  setFont("bold 14px sans-serif");\n\
  goto (0+10,maxY()-25)\n\
  angle (90)\n\
  write (maxY())\n\
\n\
  goto (maxX()-5,+10)\n\
  angle (0)\n\
  write (maxX())\n\
\n\
  goto (10,minY()+5)\n\
  angle (90)\n\
  write (minY())\n\
\n\
  goto (minX()+25,0+10)\n\
  angle (0)\n\
  write (minX())\n\
}\n\
\n\
\n\
function ticks (dir, limit, step) {\n\
  var tickLen = 5\n\
  angle(dir)\n\
  goto(0,0)\n\
  penup()\n\
  for (i=1; i*step<limit; i=i+1) {\n\
\n\
    forward(step)\n\
    left(90)\n\
    if (i%5 == 0) {\n\
      forward(tickLen)\n\
      pendown()\n\
      backward (tickLen*2)\n\
      penup()\n\
      forward(tickLen)\n\
      right(90)\n\
    } else {\n\
      forward(tickLen/2)\n\
      pendown()\n\
      backward (tickLen)\n\
      penup()\n\
      forward(tickLen/2)\n\
      right(90)\n\
    }\n\
  }\n\
}\n\
\n\
function demo() {\n\
  lines()\n\
  ticks (0, maxY(), 10)\n\
  ticks (90, maxX(), 10)\n\
  ticks (180, -minY(), 10)\n\
  ticks (270, -minX(), 10)\n\
}\n\
'
dividing_circle ='\
// Dividing a Circle -- Divide a circle with other circles\n\
\n\
// *** GLOBALS ***\n\
var i; // loop variable\n\
\n\
\n\
// *** CONSTANTS ***\n\
rad = 50; // circle radius\n\
limit = 6; // times to loop\n\
delayTime = 1000; // milliseconds\n\
\n\
\n\
// *** FUNCTIONS ***\n\
\n\
function divideCenter(radii, radius) {\n\
  left(60);\n\
  forward(radius);\n\
  right(60);\n\
  var side = 0\n\
  while (side < 6) { // go to each side\n\
    right(60);\n\
    var step = 0\n\
    while (step < radii) { // step off side\n\
      forward(radius);\n\
      circle(radius);\n\
      step = step + 1\n\
    };\n\
    side = side + 1;\n\
  };\n\
}\n\
\n\
\n\
function tier () {\n\
  divideCenter (i, rad)\n\
  i = i + 1\n\
  if (i < limit) {\n\
    delay (tier, delayTime)\n\
  }\n\
}\n\
\n\
\n\
function demo() {\n\
  clear();\n\
  home();\n\
  penup();\n\
  wrap(false);\n\
  circle (rad);\n\
  i = 1;\n\
  delay (tier, delayTime);\n\
}\n\
'
dodecahedronGraph ='\
// Dodecahedron Graph -- 2-dimentional graph of a dodecahedron\n\
\n\
//   This would be easier to draw to points on concentric circles\n\
//   This is just lines and not shadable polygons\n\
\n\
function pent(side) {\n\
  var angle2=72-(360-108)/2\n\
  // the sides below are really trigonometric conversions\n\
  // without the trig functions\n\
  var side2 = .4*side\n\
  var angle3 = 80\n\
  var side3 = 1.05 * side\n\
  var angle4 = 40\n\
  var side4 = .5 * side\n\
  var angle5 = 129\n\
  var side5 = 2.65 * side\n\
  for (var i=0; i<5; i++) {\n\
    forward (side)\n\
      right(angle2)\n\
      forward (side2)\n\
        right(angle3)\n\
        forward(side3)\n\
          left(angle4)\n\
          forward(side4)\n\
            left(angle5)\n\
            forward(side5)\n\
            backward(side5)\n\
            right(angle5)\n\
          backward(side4)\n\
          right(angle4)\n\
        backward(side3)\n\
        left(angle3)\n\
        left(angle3)\n\
        forward(side3)\n\
        backward(side3)\n\
        right(angle3)\n\
      backward (side2)\n\
      left(angle2)\n\
    right(72)\n\
  }\n\
}\n\
\n\
function demo() {\n\
  goto (-50,-22)\n\
  right(17)\n\
  pent(50)\n\
  hideturtle()\n\
}\n\
'
dragonCurve ='\
//  Dragon Curve -- a fractal curve formed by folding a shape onto itself\n\
//  more infomration at wikipedia  https://en.wikipedia.org/wiki/Dragon_curve\n\
\n\
\n\
//*** GLOBALS ***\n\
var gen = 0\n\
var side = 300\n\
\n\
\n\
//*** CONSTANTS ***\n\
\n\
var root2 = Math.sqrt(2)\n\
//  X ↦ X+YF+\n\
//  Y ↦ −FX−Y.\n\
// angle is 90\n\
// start is order * 45°\n\
\n\
\n\
//*** FUNCTIONS ***\n\
\n\
function caption (message) {\n\
  // save your current position, heading, etc.\n\
  var savedX = turtle.pos.x\n\
  var savedY = turtle.pos.y\n\
  var savedHeading = turtle.angle / 2 / Math.PI * 360 //convert radians to degrees\n\
  var savedColor = turtle.color\n\
  var savedWidth = turtle.width\n\
\n\
  goto (minX()+10, minY()+10)\n\
  setheading( 90)\n\
\n\
  // erase wha will be in the path\n\
  color ("white")\n\
  width (10)\n\
  forward (maxY() * 2 - 12)\n\
  goto (minX()+10, minY()+5)\n\
  color ("black")\n\
  write( message)\n\
\n\
  //go back from whence you came\n\
  goto( savedX, savedY)\n\
  setheading( savedHeading)\n\
  color ( savedColor)\n\
  width (savedWidth)\n\
}\n\
\n\
function X (side, gen) {\n\
  if (gen <= 0) {\n\
     forward (side)\n\
  }\n\
  else {\n\
    X(side/root2, gen-1)\n\
    left (90)\n\
    Y(side/root2, gen-1)\n\
    //forward(side/2)\n\
    left (90)\n\
  }\n\
}\n\
\n\
function Y (side, gen) {\n\
  if (gen <= 0) {\n\
    forward (side)\n\
  }\n\
  else {\n\
    right (90)\n\
    //forward (side/root2)\n\
    X (side/root2, gen-1)\n\
    right (90)\n\
    Y (side/root2, gen-1)\n\
  }\n\
}\n\
\n\
\n\
function delayedDragon () {\n\
  reset()\n\
  goto (-side/2, 0)\n\
  setheading (90+ gen * 45)\n\
  pendown()\n\
  X (side, gen)\n\
  caption( "Dragon curve, generation " + gen)\n\
\n\
  if (gen < 13) {\n\
    gen = gen + 1\n\
  } else {\n\
    gen = 0\n\
  }\n\
  delay( delayedDragon, 3000)\n\
}  \n\
    \n\
\n\
function demo() {\n\
  gen = 0\n\
  delayedDragon()\n\
}  \n\
'
flag ='\
// Flag -- draw an American Flag\n\
\n\
\n\
function star (size) {\n\
  penup()\n\
  forward(.54*size)\n\
  turn (180-18)\n\
  pendown()\n\
  var i=0\n\
  while (i<5){\n\
    forward(size)\n\
    right(180-36)\n\
    i = i + 1\n\
  }\n\
  turn (180+18)\n\
  backward(.54*size)\n\
}\n\
\n\
\n\
function starLine(count, size, sep) {\n\
  while (count > 0) {\n\
    star(size)\n\
    penup()\n\
    right(90)\n\
    forward (sep)\n\
    left(90)\n\
    pendown()\n\
    count = count -1;\n\
  }\n\
}\n\
\n\
\n\
function rectangle (width, height) {\n\
  // assume x, y at upper right hand corner in and out\n\
  // assume angle is 90 in and out\n\
  angle (90)\n\
  forward (width)\n\
  right(90)\n\
  forward (height)\n\
  right (90)\n\
  forward (width)\n\
  right (90)\n\
  forward (height)\n\
  right (90)\n\
}\n\
\n\
\n\
function stripes (width, spacing, number) {\n\
  //assume x, y is at right side of stripe\n\
  //assume angle is -90\n\
  var i = 0\n\
  while (i<number) {\n\
    pendown()\n\
    forward (width)\n\
    penup()\n\
    // make the turn\n\
    if (i%2 == 0) {\n\
      left(90)\n\
      forward(spacing)\n\
      left(90)\n\
    } else {\n\
      right(90)\n\
      forward(spacing)\n\
      right(90)\n\
    }\n\
    i = i + 1\n\
  }\n\
}\n\
\n\
\n\
function flag() {\n\
  //***Constants\n\
  var xBase = -200 // base is upper left corner\n\
  var yBase = 200\n\
  var flagHeight = 250 // everything else is proportional to flagHeight\n\
  var stripeWidth = flagHeight/13\n\
  var flagWidth = 1.9 * flagHeight\n\
  var fieldWidth = .76 * flagHeight\n\
  var fieldHeight = 7 * stripeWidth\n\
  var xSeparation = .063 * flagHeight\n\
  var ySeparation = .054 * flagHeight\n\
  starSize = .06 *flagHeight // star size\n\
    \n\
  //outline flag and field\n\
  wrap(false)\n\
  hideTurtle()\n\
  goto (xBase, yBase)\n\
  angle (90)\n\
  color("black")\n\
  width(1)\n\
  rectangle (flagWidth, flagHeight)\n\
  rectangle (fieldWidth, fieldHeight)\n\
\n\
  //  draw stripes\n\
  color("red");\n\
  width(stripeWidth);\n\
  goto (xBase+flagWidth, yBase-stripeWidth/2)\n\
  angle (-90)\n\
  stripes (flagWidth-fieldWidth, 2*stripeWidth, 4)\n\
  stripes (flagWidth, 2*stripeWidth, 3)\n\
\n\
  //draw field\n\
  color("blue")\n\
  goto (xBase+fieldWidth, yBase-stripeWidth/2)\n\
  angle (-90)\n\
  stripes (fieldWidth, stripeWidth, 7)\n\
\n\
  //draw field of stars\n\
  angle(0)\n\
  width (2)\n\
  color("white")\n\
  pendown()\n\
  var row = 0\n\
  while (row<9) {\n\
   if (row % 2 == 0) {\n\
      goto (xBase + xSeparation, yBase - (row +1) * ySeparation)\n\
      starLine(6, starSize, xSeparation*2)\n\
    } else {\n\
      goto (xBase + 2* xSeparation, yBase - (row +1) * ySeparation)\n\
      starLine(5, starSize, xSeparation * 2)\n\
    }\n\
    row = row + 1;\n\
  }\n\
}\n\
  \n\
demo = flag\n\
'
gosperCurve ='\
// Gosper curve -- a is a space filling curve named after Bill Gosper\n\
// also known as a flow snake (a Spoonerism on snow flake)\n\
// more information at Wikipedia  https://en.wikipedia.org/wiki/Gosper_curve\n\
\n\
// A ↦ A − B − − B + A + + A A + B − \n\
\n\
//*** GLOBALS ***\n\
\n\
var gen = 0\n\
var size = 0\n\
\n\
//*** FUNCTIONS ***\n\
\n\
function caption (message) {\n\
  // save your current position, heading, etc.\n\
  var savedX = turtle.pos.x\n\
  var savedY = turtle.pos.y\n\
  var savedHeading = turtle.angle / 2 / Math.PI * 360 //convert radians to degrees\n\
  var savedColor = turtle.color\n\
  var savedWidth = turtle.width\n\
\n\
  goto (minX()+10, minY()+10)\n\
  setheading( 90)\n\
\n\
  // erase wha will be in the path\n\
  color ("white")\n\
  width (10)\n\
  forward (maxY() * 2 - 12)\n\
  goto (minX()+10, minY()+5)\n\
  color ("black")\n\
  write( message)\n\
\n\
  //go back from whence you came\n\
  goto( savedX, savedY)\n\
  setheading( savedHeading)\n\
  color ( savedColor)\n\
  width (savedWidth)\n\
}\n\
\n\
\n\
function A (side, gen) {\n\
  if (gen ===0) {\n\
    forward (side)\n\
  }\n\
  else {\n\
    side = side / Math.sqrt(7)\n\
    A (side, gen-1)\n\
    left (60)\n\
    B (side, gen-1)\n\
    left (120)\n\
    B (side, gen-1)\n\
    right (60)\n\
    A (side, gen-1)\n\
    right (120)\n\
    A (side, gen-1)\n\
    A (side, gen-1)\n\
    right (60)\n\
    B (side, gen-1)\n\
    left (60)\n\
  }\n\
}\n\
\n\
// B ↦ + A − B B − − B − A + + A + B \n\
\n\
function B (side, gen) {\n\
  if (gen ===0) {\n\
    forward (side)\n\
  }\n\
  else {\n\
    side = side / Math.sqrt(7)\n\
    right (60)\n\
    A (side, gen-1)\n\
    left (60)\n\
    B (side, gen-1)\n\
    B (side, gen-1)\n\
    left (120)\n\
    B (side, gen-1)\n\
    left (60)\n\
    A (side, gen-1)\n\
    right (120)\n\
    A (side, gen-1)\n\
    right (60)\n\
    B (side, gen-1)\n\
  }\n\
}\n\
\n\
\n\
function delayDemo () {\n\
  reset()\n\
  goto( size/2, -size/2+60*gen)\n\
  A( size,gen)\n\
  caption ("Gosper Curve generation " + gen)\n\
  if (gen < 4) {\n\
    gen = gen + 1\n\
  } else {\n\
    gen = 0\n\
  }\n\
  delay( delayDemo,3000)\n\
}\n\
\n\
function demo () {\n\
  reset()\n\
  size = 350\n\
  goto(size/2,-size/2+60*gen)\n\
  gen = 0\n\
  delayDemo()\n\
}\n\
'
hexTesselation ='\
// Hexagon Tessalation -- tile a surface with hexagons\n\
\n\
function hexagon (side) {\n\
  penup();\n\
  forward(side);\n\
  right(120);\n\
  pendown();\n\
  repeat (6, function () {\n\
    forward(side);\n\
    right(60);\n\
  })\n\
}\n\
\n\
function repeatToRight (side) {\n\
  while (turtle.pos.x < maxX()) {\n\
    hexagon(side);\n\
    penup();\n\
    forward(side * 2);\n\
    left(120);\n\
    pendown();\n\
  }\n\
}\n\
\n\
function repeatToLeft(side) {\n\
  while (turtle.pos.x > minX())\n\
   {\n\
    hexagon(side);\n\
    penup();\n\
    forward(side * 2);\n\
    left(120);\n\
    pendown();\n\
  }\n\
}\n\
\n\
function demo() {\n\
  \n\
  side = 50;\n\
  \n\
  \n\
  reset();\n\
  wrap(false);\n\
  width(1);\n\
  goto(minX()-1, maxY()-1);\n\
  \n\
  while (turtle.pos.y > minY()) {\n\
    repeatToRight(side); // draw a row of hexagons\n\
  \n\
    //advance to next row on right side\n\
    penup();\n\
    left(120);\n\
    forward(side);\n\
    left(60);\n\
    forward(side)\n\
    pendown();\n\
  \n\
    repeatToLeft (side);  // draw a row of hexagons\n\
  \n\
    //advance on next row on left side\n\
    penup();\n\
    left(60);\n\
    forward(side);\n\
    right(60);\n\
    forward(side);\n\
    right(180);\n\
    pendown();\n\
    draw();\n\
  }\n\
}\n\
'
hilbertCurve ='\
// Hilbert Curve -- a space filling fractal curve described by David Hilbert\n\
// more information at Wikipedia  https://en.wikipedia.org/wiki/Hilbert_curve\n\
\n\
// A → − B F + A F A + F B −\n\
\n\
\n\
//*** GLOBALS ***\n\
var gen = 0\n\
\n\
\n\
//*** FUNCTIONS ***\n\
\n\
function caption (message) {\n\
  // save your current position, heading, etc.\n\
  var savedX = turtle.pos.x\n\
  var savedY = turtle.pos.y\n\
  var savedHeading = turtle.angle / 2 / Math.PI * 360 //convert radians to degrees\n\
  var savedColor = turtle.color\n\
  var savedWidth = turtle.width\n\
\n\
  goto (minX()+10, minY()+10)\n\
  setheading( 90)\n\
\n\
  // erase wha will be in the path\n\
  color ("white")\n\
  width (10)\n\
  forward (maxY() * 2 - 12)\n\
  goto (minX()+10, minY()+5)\n\
  color ("black")\n\
  write( message)\n\
\n\
  //go back from whence you came\n\
  goto( savedX, savedY)\n\
  setheading( savedHeading)\n\
  color ( savedColor)\n\
  width (savedWidth)\n\
}\n\
\n\
\n\
function A (side,gen) {\n\
  if (gen === 0) {\n\
    left (90)\n\
    forward (side)\n\
    right (90)\n\
    forward (side)\n\
    right (90)\n\
    forward (side)\n\
    left (90)\n\
  }\n\
  else {\n\
    left (90)\n\
    B (side, gen-1)\n\
    forward (side)\n\
    right (90)\n\
    A (side, gen-1)\n\
    forward (side)\n\
    A (side, gen-1)\n\
    right (90)\n\
    forward (side)\n\
    B (side, gen-1)\n\
    left (90)\n\
  }\n\
}\n\
//  B → + A F − B F B − F A +\n\
//Here, "F" means "draw forward", "−" means "turn left 90°", "+" means "turn right 90°" (see turtle graphics), and "A" and "B" are ignored during drawing.\n\
\n\
function B (side,gen) {\n\
  if (gen === 0) {\n\
    right (90)\n\
    forward (side)\n\
    left (90)\n\
    forward (side)\n\
    left (90)\n\
    forward (side)\n\
    right (90)\n\
  }\n\
  else {\n\
    right (90)\n\
    A (side, gen-1)\n\
    forward (side)\n\
    left (90)\n\
    B (side, gen-1)\n\
    forward (side)\n\
    B (side, gen-1)\n\
    left (90)\n\
    forward (side)\n\
    A (side, gen-1)\n\
    right (90)\n\
  }\n\
}\n\
\n\
\n\
function delayedHilbert () {\n\
  reset()\n\
  wrap(false)\n\
\n\
  // targeting 80% of window\n\
  size = .80 * Math.min( maxX(),maxY())*2\n\
  var side = 10\n\
\n\
  /*overall side seems to be: gen 0: 1\n\
    gen 1: 3 (2*gen 0 + 1)\n\
    gen 2: 7 (2*gen 1 + 1)\n\
    gen 3: 15(2*gen 2 +1)\n\
   */  var overallSides = 1\n\
  for (i=1; i<=gen; i++)\n\
    overallSides = 2*overallSides + 1\n\
  side = size/overallSides\n\
  goto( overallSides/2*side,-overallSides/2*side)\n\
  A (side, gen)\n\
  caption( "Hilbert curve, generation " + gen)\n\
\n\
  if (gen < 5) {\n\
    gen = gen + 1\n\
  } else {\n\
    gen = 0\n\
  }\n\
  delay( delayedHilbert, 3000)\n\
}\n\
\n\
\n\
function demo () {\n\
  gen = 0\n\
  delayedHilbert()\n\
}\n\
'
icosahedronGraph ='\
// Icosahedron Graph -- two-dimensional graph of an icodahedron\n\
\n\
\n\
\n\
function pent(side) {\n\
  // the below side variable are doing trigonometry without\n\
  // the trig functions. Values found emperically.\n\
  var angle2=180-(180-72)/2\n\
  var side2 = 1.18*side\n\
  var angle3 = 60\n\
  var side3 = side2\n\
  var angle4 = 156.5\n\
  var side4 = 2.15 * side\n\
  var angle5 = 30\n\
  var side5 = 1.27 * side\n\
  for (var i=0; i<5; i++) {3\n\
    color("black")\n\
    forward (side)\n\
      left(angle2)\n\
\n\
      color("red")\n\
      right(angle3)\n\
      forward(side3)\n\
      backward(side3)\n\
      left(angle3)\n\
\n\
      color ("black")\n\
      forward(side2)\n\
\n\
      color("blue")\n\
      right(180-angle3)\n\
      forward(side3)\n\
\n\
        left(angle4)\n\
\n\
        right(angle5)\n\
        forward(side5)\n\
        backward(side5)\n\
        left(angle5)\n\
\n\
        forward(side4)\n\
 \n\
        right(180-angle5)\n\
        forward(side5)\n\
        backward(side5)\n\
        left(180-angle5)\n\
\n\
\n\
        backward(side4)\n\
        right(angle4)\n\
\n\
      backward(side3)\n\
      left(180-angle3)\n\
\n\
      color ("black")\n\
      backward(side2)\n\
      right(angle2)\n\
\n\
    backward(side)\n\
    turn(72)\n\
  }\n\
  circle(2.13*side)\n\
}\n\
\n\
function demo() {\n\
  goto (-50,-22)\n\
  right(17)\n\
  pent(50)\n\
  hideturtle()\n\
}\n\
'
intersectionSimulator ='\
// Intersection Simulator -- simulates a traffic intersection and its lights\n\
/*\n\
current problems to be fixed\n\
 - turn green not extending\n\
*/\n\
/*\n\
Simple Traffic Light Simulator\n\
\n\
This simulates a set of traffic lights at an intersection.\n\
There are sets of lights for each direction: north, south, east, west.\n\
Each set of lights includes:\n\
  - the green, yellow, and red lights for the main traffic flow\n\
  - the green, yellow, and red left turn arrows\n\
  - a green Walk and red Don\'t Walk signs\n\
  \n\
The location of the signal display is as follows:\n\
       w |N|\n\
       m | |\n\
       l | |\n\
       W | | N lmw\n\
---------------------\n\
W                   E\n\
---------------------\n\
   wml S | | E\n\
         | | l\n\
         | | m\n\
         |S| w\n\
where N, S, E, W indicates the direction of travel\n\
      l is the left turn signal\n\
      m is the main traffic signal\n\
      w is the walk signal\n\
\n\
\n\
rules for lights\n\
  \n\
basic duration rules\n\
  flashing don\'t walk duration is fixed\n\
    let those crossing get across but no new starts\n\
  yellow has a fixed duration (for this simulation, it could vary based on insection size)\n\
  green duration can be extended based on queued traffid\n\
  number unqueued is dependent on duration of green\n\
  green has a maximum duration (see next)\n\
  periodically allow cross traffic, even if not seen\n\
  periodically allow turn traffic, even if not seen \n\
  lights flash 1/2 sec on, 1/2 sec off -- not implemented yet\n\
  don\'t want to cut off flashing -- not implemented yet\n\
  east and west greens (and walks) set together, except turns\n\
  north and south greens (and walks) set together, except turns\n\
  lights are protected from cross traffic with guard times\n\
  while a queue is implemented as in integer, it is treated as a binary for modeling purposes\n\
    to emulate a simple loop detector\n\
  \n\
 traffic arrivals\n\
   independent random intervals for E, W, N, S cars, left turns and people\n\
\n\
 events (one direction)\n\
  lights normally procede from red to green to yellow and back to red\n\
  lights may flash red -- not implemented yet\n\
  start of extendable green time\n\
  end of turn guard time\n\
  end of main guard time\n\
*/\n\
\n\
//**** GLOBALS ****\n\
// reporting and debug constants\n\
var NO_MESSAGES =      0;\n\
var QUEUE_MESSAGES =   1;\n\
var OVERALL_MESSAGES = 2;\n\
var STATE_MESSAGES =   3;\n\
var EVENT_MESSAGES =   4;\n\
var DEBUG_LEVEL = QUEUE_MESSAGES;\n\
\n\
// drawing constants\n\
var roadWidth = 80;\n\
var crossWalkWidth = 8;\n\
var stopLineSeparation = 4;\n\
var stopLineWidth = 2;\n\
\n\
// light states\n\
var red = "red";\n\
var green = "green";\n\
var yellow = "yellow";\n\
\n\
// light types\n\
var main = "main";\n\
var leftTurn = "leftTurn";\n\
var walk = "walk";\n\
\n\
// light duration constants\n\
// all of the below times are in milliseconds\n\
var minimumGreenDuration =      5 * 1000;\n\
var maximumGreenDuration =     30 * 1000;\n\
var mainPerCar =              1.5 * 1000;\n\
var yellowDuration =            5 * 1000;\n\
var mainGuardDuration =         1 * 1000;\n\
\n\
var minimumTurnDuration =       4 * 1000;\n\
var maximumTurnDuration =      20 * 1000;\n\
var turnPerCar =                2 * 1000;\n\
var turnGuardDuration =         1 * 1000;\n\
\n\
var minimumGreenWalkDuration =  4 * 1000;\n\
var ewWalkDuration =           20 * 1000;\n\
var nsWalkDuration =           25 * 1000;\n\
\n\
var extendDuration =            1 * 1000;\n\
var extendDelayDuration =       3 * 1000; // must be less than minimum green duration and minimum walk duration\n\
var extendDelayDuration = Math.min (minimumGreenWalkDuration, minimumGreenDuration) - .5 * 1000; // must be less than minimum green duration and minimum walk duration\n\
\n\
// light data structures (object)\n\
\n\
function Light(id, type, aveArrivalTime, aveDepartureTime) {\n\
    // create a Light object\n\
    this.id = id;\n\
    this.type = type;\n\
    this.state = red;\n\
    this.queue = [];\n\
    this.aveArrivalTime = aveArrivalTime;\n\
    this.aveDepartureTime = aveDepartureTime;\n\
    this.nextArrivalTime = undefined;\n\
    this.nextDepartureTime = undefined;\n\
    this.nextTime = undefined;\n\
    this.maxNextTime = undefined;\n\
    this.nextState = "turnRed";\n\
}\n\
\n\
//  milliseconds per hour / arrivals per hour = ave milliseconds /arrival\n\
//                  id       type, ave arrival time per hour, ave departure msec\n\
var ebMain = new Light("ebMain", main,     3600000 / 600, 1200);\n\
var ebTurn = new Light("ebTurn", leftTurn, 3600000 / 300, 1700);\n\
var ebWalk = new Light("ebWalk", walk,     3600000 /  25,    0);\n\
var wbMain = new Light("wbMain", main,     3600000 / 600, 1200);\n\
var wbTurn = new Light("wbTurn", leftTurn, 3600000 / 300, 1700);\n\
var wbWalk = new Light("wbWalk", walk,     3600000 /  25,    0);\n\
var nbMain = new Light("nbMain", main,     3600000 / 600, 1200);\n\
var nbTurn = new Light("nbTurn", leftTurn, 3600000 / 300, 1700);\n\
var nbWalk = new Light("nbWalk", walk,     3600000 /  25,    0);\n\
var sbMain = new Light("sbMain", main,     3600000 / 600, 1200);\n\
var sbTurn = new Light("sbTurn", leftTurn, 3600000 / 300, 1700);\n\
var sbWalk = new Light("sbWalk", walk,     3600000 /  25,    0);\n\
\n\
\n\
function testRates () {\n\
  // testRates -- test assumptions to see if they can handle the indicated traffic\n\
  var totalCycleTime = 2 * (Math.max( maximumGreenDuration + yellowDuration + mainGuardDuration,\n\
                              minimumGreenWalkDuration + ewWalkDuration + mainGuardDuration) +\n\
                            maximumTurnDuration + yellowDuration + turnGuardDuration);\n\
  \n\
  testRate (nbMain);\n\
  testRate (nbWalk);\n\
  testRate (nbTurn);\n\
  testRate (sbMain);\n\
  testRate (sbWalk);\n\
  testRate (sbTurn);\n\
  testRate (ebMain);\n\
  testRate (ebWalk);\n\
  testRate (ebTurn);\n\
  testRate (wbMain);\n\
  testRate (wbWalk);\n\
  testRate (wbTurn);\n\
\n\
  function testRate (signal) {\n\
    // testRate -- test assumptions to see if a signal can handle the indicated traffic\n\
  \n\
    var cycleArrivalRate = totalCycleTime / signal.aveArrivalTime;\n\
    if (signal.type === leftTurn) {\n\
      var cycleDepartureRate = maximumTurnDuration / signal.aveDepartureTime;\n\
    } else if (signal.type === main) {\n\
      var cycleDepartureRate = maximumGreenDuration / signal.aveDepartureTime;\n\
    } else { // assume walkers\n\
      var cycleDepartureRate = 10000; // assuming no walker delay or congestion\n\
    }\n\
    if (cycleArrivalRate > .90 * cycleDepartureRate) {\n\
      throw "Cycle arrival rate exceeded departure rate for " + signal.id;\n\
    }\n\
  }\n\
}\n\
\n\
testRates();\n\
\n\
//**** FUNCTIONS ****\n\
\n\
//** Drawing functions **\n\
function drawEWstreet() {\n\
  wrap(false);\n\
  setpos(minX(),0);\n\
  angle(90);\n\
  pendown();\n\
  color("black");\n\
  penwidth(roadWidth);\n\
  forward(maxX() + maxX());\n\
}\n\
\n\
function drawNSstreet() {\n\
  setpos(0,maxY());\n\
  angle(180);\n\
  pendown();\n\
  color("black");\n\
  penwidth(roadWidth);\n\
  forward(maxY() + maxY());\n\
}\n\
\n\
function drawEWstripe() {\n\
  setpos(minX(),0);\n\
  angle(90);\n\
  color("yellow");\n\
  penwidth(1);\n\
  forward(maxX() - roadWidth / 2 - crossWalkWidth);\n\
  penup();\n\
  forward(roadWidth + 2 * crossWalkWidth);\n\
  pendown();\n\
  forward(maxX() - roadWidth / 2 - crossWalkWidth);\n\
}\n\
\n\
function drawNSstripe() {\n\
  setpos(0,maxY());\n\
  angle(180);\n\
  color("yellow");\n\
  penwidth(1);\n\
  forward(maxY() - roadWidth / 2 - crossWalkWidth);\n\
  penup();\n\
  forward(roadWidth + 2 * crossWalkWidth);\n\
  pendown();\n\
  forward(maxY() - roadWidth / 2 - crossWalkWidth);\n\
}\n\
\n\
function drawCrossWalk(x, y, dir) {\n\
  // draw stripes for a crosswalk\n\
  // x,y is coordinates of travel side of road\n\
  // dir is direction across road\n\
    \n\
  // draw inner cross walk line\n\
  color("white");\n\
  setposition(x, y);\n\
  angle(dir);\n\
  width(1);\n\
  penDown();\n\
  forward(roadWidth);\n\
    \n\
  // draw outer cross walk line\n\
  penUp();\n\
  left(90);\n\
  forward(crossWalkWidth);\n\
  left(90);\n\
  penDown();\n\
  forward(roadWidth);\n\
    \n\
  // draw stop line\n\
  penUp();\n\
  right(90);\n\
  forward(stopLineSeparation);\n\
  right(90);\n\
  forward(2);\n\
  penWidth(stopLineWidth);\n\
  penDown();\n\
  forward(roadWidth / 2 - 4);\n\
  penWidth(1);\n\
}\n\
\n\
function drawTurnArrow(x, y, dir) {\n\
  hideturtle();\n\
  goto (x,y);\n\
  angle (dir);\n\
  pendown();\n\
  color("white");\n\
  penwidth(5);\n\
  forward (5);\n\
  curveLeft(5,90);\n\
  forward(4);\n\
  penwidth (2);\n\
  left(130);\n\
  forward (5);\n\
  right (160);\n\
  forward (9);\n\
  right(120);\n\
  forward (9);\n\
  right(160);\n\
  forward(5);\n\
}\n\
  \n\
\n\
function drawStreets() {\n\
  drawNSstreet();\n\
  drawEWstreet();\n\
\n\
  drawNSstripe();\n\
  drawEWstripe();\n\
\n\
  drawTurnArrow(-18,75,180);\n\
  drawTurnArrow(-75,-18,90);\n\
  drawTurnArrow(18,-75,0);\n\
  drawTurnArrow(75,18,270);\n\
\n\
  drawCrossWalk( roadWidth / 2,  roadWidth / 2, 180 );\n\
  drawCrossWalk( roadWidth / 2, -roadWidth / 2, 270 );\n\
  drawCrossWalk(-roadWidth / 2, -roadWidth / 2, 0 );\n\
  drawCrossWalk(-roadWidth / 2,  roadWidth / 2, 90 );\n\
}\n\
\n\
//** Light Drawing Functions **\n\
\n\
function setLightColor(lightColor, stateColor) {\n\
  var signalBackground = "lightgray"; // color of an "off" signal light\n\
  if (lightColor === stateColor) {\n\
    color(lightColor);\n\
  } else {\n\
    color(signalBackground);\n\
  }\n\
}\n\
\n\
function drawArrow() { // assume pointing up, color set and pen up\n\
  var penWidth = turtle.width;\n\
  var arrowSize = 8;\n\
  var vertOffset = 5;\n\
  backward(vertOffset);\n\
  pendown();\n\
  penwidth(3);\n\
  left(45);\n\
  forward(arrowSize);\n\
  right(90);\n\
  forward(arrowSize);\n\
  penup();\n\
  backward(arrowSize);\n\
  left(90);\n\
  backward(arrowSize);\n\
  right(45);\n\
  penwidth(penWidth);\n\
  forward(vertOffset);\n\
}\n\
\n\
function drawTurnSignal(state) {\n\
  left(90);\n\
  forward(13);\n\
  setLightColor("green", state);\n\
  drawArrow();\n\
\n\
  backward(13);\n\
  setLightColor("yellow", state);\n\
  drawArrow();\n\
\n\
  backward(13);\n\
  setLightColor("red", state);\n\
  drawArrow();\n\
\n\
  forward(13);\n\
  right(90);\n\
}\n\
\n\
function drawMainSignal(state) { // main signal is straight ahead\n\
  left(90);\n\
  forward(13);\n\
  setLightColor("green", state);\n\
  dot();\n\
\n\
  backward(13);\n\
  setLightColor("yellow", state);\n\
  dot();\n\
\n\
  backward(13);\n\
  setLightColor("red", state);\n\
  dot();\n\
\n\
  forward(13);\n\
  right(90);\n\
}\n\
\n\
function drawWalkSignal(state) {\n\
  // should do the flashing red for don\'t start\n\
  // could do the flash down counter\n\
  setLightColor("green", state);\n\
  left(90);\n\
  forward(5);\n\
  right(90);\n\
  write("WALK");\n\
\n\
  left(90);\n\
  backward(5);\n\
  right(90);\n\
  setLightColor("red", state);\n\
  if (state === "yellow") {\n\
    color("yellow")\n\
  }\n\
  right(90);\n\
  forward(8);\n\
  left(90);\n\
  write("DONT");\n\
\n\
  right(90);\n\
  forward(13);\n\
  left(90);\n\
  write("WALK");\n\
\n\
  right(90);\n\
  backward(25);\n\
  left(90);\n\
}\n\
\n\
function drawSignal(x, y, orient, mainState, turnState, walkState) {\n\
  // move turtle to position and angle depending on street direction\n\
  setpos (x, y);\n\
  angle(orient);\n\
  drawTurnSignal(turnState);\n\
\n\
  forward(10);\n\
  drawMainSignal(mainState);\n\
\n\
  forward(10);\n\
  drawWalkSignal(walkState);\n\
}\n\
\n\
function drawSignals() {\n\
  drawSignal( 50,  65,  90, nbMain.state, nbTurn.state, nbWalk.state);\n\
  drawSignal(-50, -65, 270, sbMain.state, sbTurn.state, sbWalk.state);\n\
  drawSignal( 65, -50, 180, ebMain.state, ebTurn.state, ebWalk.state);\n\
  drawSignal(-65,  50,   0, wbMain.state, wbTurn.state, wbWalk.state);\n\
}\n\
\n\
\n\
function printQueues () {\n\
  console.log (currentSecs +\n\
               " Northbound main: " + nbMain.queue.length +\n\
               ", turn: " +           nbTurn.queue.length +\n\
               ", walk: " +           nbWalk.queue.length + \n\
               " Southbound main: " + sbMain.queue.length +\n\
               ", turn: " +           sbTurn.queue.length +\n\
               ", walk: " +           sbWalk.queue.length);\n\
\n\
  console.log (currentSecs +\n\
               " Eastbound main: " +  ebMain.queue.length +\n\
               ", turn: " +           ebTurn.queue.length +\n\
               ", walk: " +           ebWalk.queue.length +\n\
               " Westbound main: " +  wbMain.queue.length +\n\
               ", turn: " +           wbTurn.queue.length +\n\
               ", walk: " +           wbWalk.queue.length);\n\
}\n\
\n\
\n\
function writeQueues () {\n\
  writeQueueSizes(55,  -maxY()+5,  0, "N",\n\
    nbTurn.queue.length, nbMain.queue.length, nbWalk.queue.length);\n\
  writeQueueSizes(-68,  maxY()-20, 0, "S",\n\
    sbTurn.queue.length, sbMain.queue.length, sbWalk.queue.length);\n\
  writeQueueSizes(-maxX()+5, -55, 90, "E",\n\
    ebTurn.queue.length, ebMain.queue.length, ebWalk.queue.length);\n\
  writeQueueSizes( maxX()-20, 68, 90, "W",\n\
    wbTurn.queue.length, wbMain.queue.length, wbWalk.queue.length);\n\
}\n\
\n\
function writeQueueSizes(x, y, orientation, dir, turn, main, walk) {\n\
//write the number waiting for each signal\n\
//  x is the x position of the text start\n\
//  y is the y position of the text start\n\
//  orientation is the direction of the text\n\
//  dir is directon of traffic\n\
//  turn is the turn light queue\n\
//  main is the main light queue\n\
//  walk is the walk light queue\n\
  setpos(x,y)\n\
  angle(orientation)\n\
/*\n\
  if (dir === "N") {\n\
    setpos(55,-maxY()+5);\n\
    angle(0);\n\
  } else if (dir === "S") {\n\
    setpos(-68,maxY()-20);\n\
    angle(0);\n\
  } else if (dir === "E") {\n\
    setpos(-maxX()+5, -55);\n\
    angle(90);\n\
  } else if (dir === "W") {\n\
    setpos(maxX()-20, 68);\n\
    angle(90);\n\
  } else {\n\
    setpos(-200,200);\n\
    angle(90);\n\
  }\n\
*/\n\
  penwidth(1);\n\
  color("black");\n\
  if (dir === "S" || dir === "W") { // South and West are in opposite order\n\
    write(walk);\n\
  } else {\n\
    write(turn);\n\
  }\n\
\n\
  right(90);\n\
  forward(12);\n\
  left(90);\n\
  write(main);\n\
\n\
  right(90);\n\
  forward(12);\n\
  left(90);\n\
  if (dir === "S" || dir === "W") {\n\
    write(turn);\n\
  } else {\n\
    write(walk);\n\
  }\n\
  write ("     " + dir); // debug statement\n\
}\n\
\n\
function drawQueues() {\n\
  //SB\n\
  drawQueue( -10,   55,   0, sbTurn.queue, 12);\n\
  drawQueue( -30,   55,   0, sbMain.queue, 12);\n\
  drawQueue( -50,  105,   0, sbWalk.queue,  6);\n\
\n\
  //WB\n\
  drawQueue(  55,   10,  90, wbTurn.queue, 12);\n\
  drawQueue(  55,   30,  90, wbMain.queue, 12);\n\
  drawQueue( 105,   50,  90, wbWalk.queue,  6);\n\
\n\
  //NB\n\
  drawQueue(  10,  -55, 180, nbTurn.queue, 12);\n\
  drawQueue(  30,  -55, 180, nbMain.queue, 12);\n\
  drawQueue(  50, -105, 180, nbWalk.queue,  6);\n\
\n\
  //EB\n\
  drawQueue( -55,  -10, 270, ebTurn.queue, 12);\n\
  drawQueue( -55,  -30, 270, ebMain.queue, 12);\n\
  drawQueue(-105,  -50, 270, ebWalk.queue,  6);\n\
}\n\
\n\
function drawQueue(x, y, dir, queue, len) {\n\
  goto(x, y);\n\
  angle(dir);\n\
  width(10);\n\
  for (var i=0; i<queue.length; i++) {\n\
    pendown();\n\
    color(queue[i].color);\n\
    forward(len); \n\
    penup();\n\
    forward(4);\n\
  }\n\
}\n\
\n\
//** Safety Functions **\n\
\n\
function safetyCheck() {\n\
/*\n\
 safetyCheck makes sure that traffic is not allowed in cross\n\
 directions (even if a programmer made an error)\n\
 \n\
 no cross traffic is allowed for any green or yellow light\n\
\n\
*/\n\
  var fault = false;\n\
  if ( (ebMain.state === green || ebMain.state === yellow ||\n\
        ebWalk.state === green || ebWalk.state === yellow) &&\n\
       !(nbMain.state === red && sbMain.state === red &&\n\
         nbTurn.state === red && sbTurn.state === red &&\n\
         wbTurn.state === red) ) {\n\
    console.log (currentSecs + " East bound main or walk conflict");\n\
    fault = true;\n\
  }\n\
  if ( (wbMain.state === green || wbMain.state === yellow ||\n\
        wbWalk.state === green || wbWalk.state === yellow) &&\n\
       !(nbMain.state === red && sbMain.state === red &&\n\
         nbTurn.state === red && sbTurn.state === red &&\n\
         ebTurn.state === red) ) {\n\
    console.log (currentSecs + " West bound main or walk conflict");\n\
    fault = true;\n\
  }\n\
  if ( (ebTurn.state === green || ebTurn.state === yellow) &&\n\
       !(nbMain.state === red && sbMain.state === red &&\n\
         nbTurn.state === red && sbTurn.state === red &&\n\
         wbMain.state === red) ) {\n\
    console.log (currentSecs + " East bound turn conflict");\n\
    fault = true;\n\
  }\n\
  if ( (wbTurn.state === green || wbTurn.state === yellow) &&\n\
       !(nbMain.state === red && sbMain.state === red &&\n\
         nbTurn.state === red && sbTurn.state === red &&\n\
         ebMain.state === red) ) {\n\
    console.log (currentSecs + " West bound turn conflict");\n\
    fault = true;\n\
  }\n\
  \n\
  if ( (nbMain.state === green || nbMain.state === yellow ||\n\
        nbWalk.state === green || nbWalk.state === yellow) &&\n\
       !(ebMain.state === red && wbMain.state === red &&\n\
         ebTurn.state === red && wbTurn.state === red &&\n\
         sbTurn.state === red) ) {\n\
    console.log (currentSecs + " North bound main or walk conflict");\n\
    fault = true;\n\
  }\n\
  if ( (sbMain.state === green || sbMain.state === yellow ||\n\
        sbWalk.state === green || sbWalk.state === yellow) &&\n\
       !(ebMain.state === red && wbMain.state === red &&\n\
         ebTurn.state === red && wbTurn.state === red &&\n\
         nbTurn.state === red) ) {\n\
    console.log (currentSecs + " South bound main or walk conflict");\n\
    fault = true;\n\
  }\n\
  if ( (nbTurn.state === green || nbTurn.state === yellow) &&\n\
       !(ebMain.state === red && wbMain.state === red &&\n\
         ebTurn.state === red && wbTurn.state === red &&\n\
         sbMain.state === red) ) {\n\
    console.log (currentSecs + " North bound turn conflict");\n\
    fault = true;\n\
  }\n\
  if ( (sbTurn.state === green || sbTurn.state === yellow) &&\n\
       !(ebMain.state === red && wbMain.state === red &&\n\
         ebTurn.state === red && wbTurn.state === red &&\n\
         nbMain.state === red) ) {\n\
    console.log (currentSecs + " South bound turn conflict");\n\
    fault = true;\n\
  }\n\
  \n\
  if (fault) {\n\
    /*\n\
state s/b flashing red all around, may restart after a time\n\
    turnFlashingRed(ebMain, -1);\n\
    turnFlashingRed(ebTurn, -1);\n\
    turnFlashingRed(ebWalk, -1);\n\
    turnFlashingRed(wbMain, -1);\n\
    turnFlashingRed(wbTurn, -1);\n\
    turnFlashingRed(wbWalk, -1);\n\
    turnFlashingRed(nbMain, -1);\n\
    turnFlashingRed(nbTurn, -1);\n\
    turnFlashingRed(nbWalk, -1);\n\
    turnFlashingRed(sbMain, -1);\n\
    turnFlashingRed(sbTurn, -1);\n\
    turnFlashingRed(sbWalk, -1);\n\
     */\n\
    throw "safety fault";\n\
  }\n\
}\n\
\n\
// ** Light State Machines and Functions ***\n\
// the light state machines advances the light from one state to the next\n\
// usually based on the expiry of a timer, but may change due to a callback\n\
\n\
var baseTime;\n\
function msToSec(msecs) {\n\
  if (baseTime === undefined) {\n\
    baseTime = msecs;\n\
  }\n\
  return (msecs - baseTime) % 1000000/1000;\n\
}\n\
\n\
function logEvent (id, eventName, duration) {\n\
  if (duration === undefined) {\n\
    duration =  "undefined"\n\
  } else {\n\
    duration = (duration/1000) + " secs"; // convert from msec to seconds\n\
  }\n\
  if (DEBUG_LEVEL >= EVENT_MESSAGES) {\n\
    console.log(currentSecs.toFixed(3) + "     " + id + " turned " + eventName + " for " + duration);\n\
  }\n\
}\n\
\n\
function turnGreen(signal, duration) {\n\
  logEvent (signal.id, "green", duration)\n\
  signal.state = green;\n\
  greenCount = greenCount + 1;\n\
  if (signal.type === main) {\n\
    signal.nextState = "extendGreen";\n\
  } else if (signal.type === turn) {\n\
    signal.nextState = "extendTurn";\n\
  } else {\n\
    signal.nextState = "turnYellow";\n\
  }\n\
  signal.nextTime = currentTime + duration;\n\
}\n\
\n\
function extendTurn (signal, duration) {\n\
  logEvent (signal.id, "extendTurn", duration);\n\
  signal.nextState = "extendTurn";\n\
  signal.nextTime = currentTime + duration;\n\
}\n\
\n\
function extendGreen(signal, duration) {\n\
  logEvent (signal.id, "extending green", duration)\n\
  // signal should already be green, assume no extension, so ignor duration\n\
  signal.nextState = "turnYellow";\n\
  if (duration === undefined || duration < 0) {\n\
    signal.nextTime = undefined;\n\
  } else {\n\
    signal.nextTime = currentTime + duration;\n\
  }\n\
}\n\
\n\
function turnYellow(signal, duration) {\n\
  logEvent (signal.id, "yellow", duration)\n\
  signal.state = yellow;\n\
  signal.nextState = "turnRed";\n\
  signal.nextTime = currentTime + duration;\n\
}\n\
\n\
function turnRed(signal, duration) {\n\
  logEvent (signal.id, "red", duration)\n\
  signal.state = red;\n\
  signal.nextState = "turnGuardRed";\n\
  if (duration === undefined || duration < 0) {\n\
    signal.nextTime = undefined;\n\
  } else {\n\
    signal.nextTime = currentTime + duration;\n\
  }\n\
}\n\
\n\
function turnGuardRed(signal, duration) {\n\
  logEvent (signal.id, "guard red", duration)\n\
  signal.state = red;\n\
  signal.nextState = "turnGreen";\n\
  if (duration === undefined || duration < 0) {\n\
    signal.nextTime = undefined;\n\
  } else {\n\
    signal.nextTime = currentTime + duration;\n\
  }\n\
}\n\
\n\
function turnFlashingRed(signal, duration) {\n\
  logEvent (signal.id, "flashing red", duration)\n\
  signal.state = red;\n\
  signal.nextState = "turnGreen";\n\
  if (duration === undefined || duration < 0) {\n\
    signal.nextTime = undefined;\n\
  } else {\n\
    signal.nextTime = currentTime + duration;\n\
  }\n\
}\n\
\n\
function enableTransition(signal, nextState) { // allow light state machine to fire on next go around\n\
  signal.nextState = nextState;\n\
  signal.nextTime = currentTime;\n\
}\n\
\n\
function turnStateMachine(signal, currentTime) {\n\
  if (signal.nextTime !== undefined && currentTime >= signal.nextTime) { // state change is due\n\
    changed = true;\n\
    if (DEBUG_LEVEL >= STATE_MESSAGES) {\n\
      console.log(currentSecs.toFixed(3) + "   time-out for " + signal.id + " turned " + signal.nextState);\n\
    }\n\
    switch (signal.nextState) {\n\
\n\
    case "turnGreen":\n\
      turnGreen(signal,minimumTurnDuration);\n\
      signal.maxNextTime = currentTime + maximumTurnDuration;\n\
      extendTurn(signal, minimumTurnDuration);\n\
    break;\n\
\n\
    case "extendTurn":\n\
      if (signal.queue.length > 0 && currentTime + extendDuration < signal.maxNextTime) {\n\
        extendTurn(signal, extendDuration);\n\
      } else {\n\
        turnYellow(signal, yellowDuration);\n\
      }\n\
    break;\n\
\n\
    case "turnYellow":\n\
      turnYellow(signal, yellowDuration);\n\
    break;\n\
\n\
    case "turnRed":\n\
      turnRed(signal, turnGuardDuration);\n\
    break;\n\
\n\
    case "turnGuardRed":\n\
      turnGuardRed(signal, undefined); // wait for overall to start the turn\n\
      redGuardComplete(signal);\n\
    break;\n\
\n\
    default:\n\
      stopAnimation();\n\
      throw "unknown next turn state for " + signal.id;\n\
    }\n\
  }\n\
}\n\
\n\
function walkStateMachine(signal, currentTime) {\n\
  if (signal.nextTime !== undefined && currentTime >= signal.nextTime) { // state change is due\n\
    changed = true;\n\
    if (DEBUG_LEVEL >= STATE_MESSAGES) {\n\
      console.log(currentSecs.toFixed(3) + "   time-out for " + signal.id + " turned " + signal.nextState);\n\
    }\n\
    switch (signal.nextState) {\n\
\n\
    case "turnGreen":\n\
      if (signal.id == "nbWalk" || signal.id == "sbWalk") {\n\
        signal.maxNextTime = currentTime + maximumGreenDuration + yellowDuration - nsWalkDuration;\n\
      } else {\n\
        signal.maxNextTime = currentTime + maximumGreenDuration + yellowDuration - ewWalkDuration;\n\
      }\n\
      turnGreen(signal, minimumGreenWalkDuration);\n\
    break;\n\
\n\
    case "turnYellow":\n\
      if (signal.id == "nbWalk" || signal.id == "sbWalk") {\n\
        turnYellow(signal, nsWalkDuration);\n\
      } else {\n\
        turnYellow(signal, ewWalkDuration);\n\
      }\n\
    break;\n\
\n\
    case "turnRed":\n\
      turnRed(signal, mainGuardDuration);\n\
    break;\n\
\n\
    case "turnGuardRed":\n\
      turnGuardRed(signal, undefined); // wait for overall to start the turn\n\
      redGuardComplete(signal);\n\
    break;\n\
\n\
    default:\n\
      stopAnimation();\n\
      throw "unknown next walk state for " + signal.id;\n\
    }\n\
  }\n\
}\n\
\n\
function mainStateMachine(signal, currentTime) {\n\
  if (signal.nextTime !== undefined && currentTime >= signal.nextTime) { // state change is due\n\
    changed = true;\n\
    if (DEBUG_LEVEL >= STATE_MESSAGES) {\n\
      console.log(currentSecs.toFixed(3) + "   time-out for " + signal.id + " turned " + signal.nextState);\n\
    }\n\
    switch (signal.nextState) {\n\
\n\
    case "turnGreen":\n\
      signal.maxNextTime = currentTime + maximumGreenDuration;\n\
      turnGreen(signal, minimumGreenDuration);\n\
    break;\n\
\n\
    case "extendGreen":\n\
      extendGreen(signal, extendDuration);\n\
    break;\n\
\n\
    case "turnYellow":\n\
      turnYellow(signal, yellowDuration);\n\
    break;\n\
\n\
    case "turnRed":\n\
      turnRed(signal, mainGuardDuration);\n\
    break;\n\
\n\
    case "turnGuardRed":\n\
      turnGuardRed(signal, undefined); // wait for sync\n\
      redGuardComplete(signal);\n\
    break;\n\
\n\
    default:\n\
      stopAnimation();\n\
      throw "unknown next main state for " + signal.id;\n\
    }\n\
  }\n\
}\n\
\n\
\n\
//** Traffic Simulation Functions **\n\
\n\
function incDecQueue(signal) {\n\
  // check for departures when light is green\n\
   // should only do this when light is green and start new departure timer when light goes green\n\
  var spread;\n\
  spread = 0.5;\n\
  var possibleDepartureTime = currentTime +\n\
            random((1 - spread) * signal.aveDepartureTime, (1 + spread) * signal.aveDepartureTime);\n\
  if (signal.state === green) {\n\
    if (signal.aveDepartureTime === 0) { // special case for walkers\n\
      signal.queue = [];\n\
      changed = true;\n\
    } else if (signal.nextDepartureTime === undefined) {\n\
      signal.nextDepartureTime = possibleDepartureTime;\n\
    } else if (currentTime > signal.nextDepartureTime) {\n\
      if (signal.queue.length > 0) { // queue has member to leave\n\
        changed = true;\n\
        signal.queue.shift();\n\
        signal.nextDepartureTime = possibleDepartureTime;\n\
      }\n\
    } else {\n\
      // no departure pending\n\
    }\n\
  } else { // light is not green, so no departures\n\
    signal.nextDepartureTime = undefined;\n\
  }\n\
  \n\
  // check for arrivals\n\
  if (signal.nextArrivalTime === undefined || currentTime > signal.nextArrivalTime) {\n\
    changed = true;\n\
    signal.queue.push ({color:random(16), arrivalTime:currentTime});\n\
    // adjust the average to give it some variation within the average\n\
    spread = 0.95;\n\
    signal.nextArrivalTime = currentTime +\n\
      random((1 - spread) * signal.aveArrivalTime, (1 + spread) * signal.aveArrivalTime);\n\
  }\n\
}\n\
\n\
\n\
function simulateTraffic() {\n\
  incDecQueue(ebTurn);\n\
  incDecQueue(ebWalk);\n\
  incDecQueue(ebMain);\n\
  incDecQueue(wbTurn);\n\
  incDecQueue(wbWalk);\n\
  incDecQueue(wbMain);\n\
  incDecQueue(nbTurn);\n\
  incDecQueue(nbWalk);\n\
  incDecQueue(nbMain);\n\
  incDecQueue(sbTurn);\n\
  incDecQueue(sbWalk);\n\
  incDecQueue(sbMain);\n\
}\n\
\n\
// ** Overall State Machine and Functions\n\
\n\
// *Globals*\n\
var overallNextState;\n\
var overallNextTime;\n\
var turnCount = 0;\n\
var greenCount = 0;\n\
\n\
function nextOverallState(nextState, time) {\n\
  overallNextState = nextState;\n\
  overallNextTime = time;\n\
}\n\
\n\
function redGuardComplete(signal) {\n\
  /* callback when red guard time complete for a particular signal */\n\
  var id = signal.id;\n\
  if (id === nbTurn || id === sbTurn || id === ebTurn || id === wbTurn) {\n\
    turnCount = turnCount - 1; //global\n\
    if (turnCount < 0) {\n\
      throw "Turn counter negative by " + id;\n\
    }\n\
  }\n\
  greenCount = greenCount - 1;\n\
  if (greenCount < 0) {\n\
    throw "Green counter made negative by " + id;\n\
  } else if (greenCount === 0) {\n\
    overallNextTime = currentTime;\n\
  }\n\
}\n\
\n\
function startNS() {\n\
  /* entry point to start overall machine into motion */\n\
  nextOverallState("startNS", currentTime);\n\
}\n\
\n\
\n\
function overallStateMachine() {\n\
/*\n\
- controls the start of travel in either direction\n\
- extends the main green\n\
- has callbacks for competion of turns to advance cross traffic\n\
- has callbacks for competion of guard red to advance cross traffic\n\
\n\
 turn lights are autonomous\n\
 increment left turn counter when changing individual turn light to green\n\
 decrement left turn counter when changing individual turn ight ends guard red\n\
\n\
when left turn counter is 0, main green may be extended after the minimum green\n\
\n\
overall starts NS and EW alternatively based on completion of guard red\n\
overall extends main green in a coordinated way\n\
  starts when both directions have completed minimum green\n\
  ends on either walking yellow or main yellow\n\
*/\n\
  if (overallNextTime !== undefined && currentTime >= overallNextTime) { // state change is due\n\
    if (DEBUG_LEVEL >= OVERALL_MESSAGES) {\n\
      console.log (currentSecs.toFixed(3) + " overall " + overallNextState);\n\
    }\n\
    switch (overallNextState) {\n\
  \n\
    case "startNS":\n\
      //nextOverallState("startEW", undefined); // wait for sync\n\
      if (DEBUG_LEVEL >= QUEUE_MESSAGES) {\n\
         printQueues();\n\
      }\n\
      if (nbTurn.queue.length > 0) {\n\
        enableTransition(nbTurn, "turnGreen");\n\
        turnCount = turnCount + 1;\n\
        if (sbTurn.queue.length === 0) {\n\
          enableTransition(nbMain, "turnGreen");\n\
        }\n\
        nextOverallState("startNSMainOnly", undefined); // wait for sync\n\
      }\n\
      if (sbTurn.queue.length > 0) {\n\
        enableTransition(sbTurn, "turnGreen");\n\
        turnCount = turnCount + 1;\n\
        if (nbTurn.queue.length === 0) {\n\
          enableTransition(sbMain, "turnGreen");\n\
        }\n\
        nextOverallState("startNSMainOnly", undefined); // wait for sync\n\
      }\n\
      if (nbTurn.queue.length === 0 && sbTurn.queue.length === 0) {\n\
        enableTransition(nbMain, "turnGreen");\n\
        enableTransition(sbMain, "turnGreen");\n\
        if (nbWalk.queue.length > 0) {\n\
          enableTransition(nbWalk, "turnGreen");\n\
        }\n\
        if (nbWalk.queue.length > 0) {\n\
          enableTransition(sbWalk, "turnGreen");\n\
        }\n\
        // extend main green invoked after minimum main green\n\
        nextOverallState("extendMainGreenNS", extendDelayDuration);\n\
      }\n\
    break;\n\
\n\
    case "startNSMainOnly":\n\
      if (nbTurn.state === red && sbTurn.state === red) {\n\
        enableTransition(nbMain, "turnGreen");\n\
        enableTransition(sbMain, "turnGreen");\n\
        if (nbWalk.queue.length > 0 || sbWalk.queue.length > 0) {\n\
          enableTransition(nbWalk, "turnGreen");\n\
          enableTransition(sbWalk, "turnGreen");\n\
        }\n\
        nextOverallState("extendMainGreenNS", extendDelayDuration);\n\
      } else {\n\
        nextOverallState("startNSMainOnly", undefined); // wait for sync\n\
      }\n\
    break;\n\
  \n\
    case "extendMainGreenNS":\n\
      // assume nbMain.state === green && sbMain.state === green\n\
      if (nbMain.queue.length > 0 || sbMain.queue.length > 0) { //time extension warrented\n\
        if (nbWalk.state === green || sbWalk.state === green) {\n\
          if ( (currentTime + extendDuration < nbMain.maxNextTime) &&\n\
               (currentTime + extendDuration < sbMain.maxNextTime) &&\n\
               (currentTime + extendDuration < nbWalk.maxNextTime) &&\n\
               (currentTime + extendDuration < sbWalk.maxNextTime) ) { //walk extension OK\n\
            extendGreen(nbWalk, undefined);\n\
            extendGreen(sbWalk, undefined);\n\
            extendGreen(nbMain, undefined);\n\
            extendGreen(sbMain, undefined);\n\
            overallNextTime = currentTime + extendDuration; // just stay in extendMainGreenNS\n\
          } else { //end walk extension\n\
            enableTransition(nbWalk, "turnYellow");\n\
            enableTransition(sbWalk, "turnYellow");\n\
            extendGreen(sbMain, nsWalkDuration - yellowDuration);\n\
            extendGreen(nbMain, nsWalkDuration - yellowDuration);\n\
            nextOverallState("startEW", undefined); // wait for sync\n\
          }\n\
        } else { // walks do not apply\n\
          if ( (currentTime + extendDuration < nbMain.maxNextTime) &&\n\
               (currentTime + extendDuration < sbMain.maxNextTime) ) { //main extension OK\n\
            extendGreen(nbMain, undefined);\n\
            extendGreen(sbMain, undefined);\n\
            overallNextTime = currentTime + extendDuration; // just stay in extendMainGreenNS\n\
          } else { // end main extension\n\
            enableTransition(nbMain, "turnYellow");\n\
            enableTransition(sbMain, "turnYellow");\n\
            nextOverallState("startEW", undefined); // wait for sync\n\
          }\n\
        }\n\
      } else { // extension not warrented\n\
        if (nbWalk.state === green || sbWalk.state === green) {\n\
          enableTransition(nbWalk, "turnYellow");\n\
          enableTransition(sbWalk, "turnYellow");\n\
          extendGreen(sbMain, nsWalkDuration - yellowDuration);\n\
          extendGreen(nbMain, nsWalkDuration - yellowDuration);\n\
          nextOverallState("startEW", undefined); // wait for sync\n\
        } else { // walks do not apply\n\
          enableTransition(nbMain, "turnYellow");\n\
          enableTransition(sbMain, "turnYellow");\n\
          nextOverallState("startEW", undefined); // wait for sync\n\
        }\n\
      }\n\
    break;\n\
\n\
    case "startEW":\n\
      nextOverallState("startEWMainOnly", undefined); // wait for sync\n\
      if (ebTurn.queue.length > 0) {\n\
        enableTransition(ebTurn, "turnGreen");\n\
        if (wbTurn.queue.length === 0) {\n\
          enableTransition(ebMain, "turnGreen");\n\
        }\n\
      }\n\
      if (wbTurn.queue.length > 0) {\n\
        enableTransition(wbTurn, "turnGreen");\n\
        if (ebTurn.queue.length === 0) {\n\
          enableTransition(wbMain, "turnGreen");\n\
        }\n\
      }\n\
      if (ebTurn.queue.length === 0 && wbTurn.queue.length === 0) {\n\
        enableTransition(ebMain, "turnGreen");\n\
        enableTransition(wbMain, "turnGreen");\n\
        if (ebWalk.queue.length > 0) {\n\
          enableTransition(ebWalk, "turnGreen");\n\
          // set up the maximum time that the walk light can be green\n\
          ebWalk.maxNextTime = currentTime + maximumGreenDuration - ewWalkDuration;\n\
        }\n\
        if (wbWalk.queue.length > 0) {\n\
          enableTransition(wbWalk, "turnGreen");\n\
          // set up the maximum time that the walk light can be green\n\
          wbWalk.maxNextTime = currentTime + maximumGreenDuration - ewWalkDuration;\n\
        }\n\
        nextOverallState("extendMainGreenEW", undefined);\n\
      }\n\
    break;\n\
  \n\
    case "startEWMainOnly":\n\
      nextOverallState("startEWMainOnly", undefined); // wait for sync\n\
      if (ebTurn.state === red && wbTurn.state === red) {\n\
          enableTransition(ebMain, "turnGreen");\n\
          enableTransition(wbMain, "turnGreen");\n\
        if (ebWalk.queue.length > 0 || wbWalk.queue.length > 0) {\n\
          enableTransition(ebWalk, "turnGreen");\n\
          enableTransition(wbWalk, "turnGreen");\n\
        }\n\
        nextOverallState("extendMainGreenEW", extendDelayDuration);\n\
      }\n\
    break;\n\
  \n\
    case "extendMainGreenEW":\n\
      // assume ebMain.state === green && sbMain.state === green\n\
      if (ebMain.queue.length > 0 || wbMain.queue.length > 0) { //time extension warrented\n\
        if (ebWalk.state === green || wbWalk.state === green) {\n\
          if ( (currentTime + extendDuration < ebMain.maxNextTime) &&\n\
               (currentTime + extendDuration < wbMain.maxNextTime) &&\n\
               (currentTime + extendDuration < ebWalk.maxNextTime) &&\n\
               (currentTime + extendDuration < wbWalk.maxNextTime) ) { //walk extension OK\n\
            extendGreen(ebWalk, undefined);\n\
            extendGreen(wbWalk, undefined);\n\
            extendGreen(ebMain, undefined);\n\
            extendGreen(wbMain, undefined);\n\
            overallNextTime = currentTime + extendDuration; // just stay in extendMainGreenEW\n\
          } else { //end walk extension\n\
            enableTransition(ebWalk, "turnYellow");\n\
            enableTransition(wbWalk, "turnYellow");\n\
            extendGreen(wbMain, ewWalkDuration - yellowDuration);\n\
            extendGreen(ebMain, ewWalkDuration - yellowDuration);\n\
            nextOverallState("startNS", undefined); // wait for sync\n\
          }\n\
        } else { // walks do not apply\n\
          if ( (currentTime + extendDuration < ebMain.maxNextTime) &&\n\
               (currentTime + extendDuration < wbMain.maxNextTime) ) { //main extension OK\n\
            extendGreen(ebMain, undefined);\n\
            extendGreen(wbMain, undefined);\n\
            overallNextTime = currentTime + extendDuration; // just stay in extendMainGreenEW\n\
          } else { // end main extension\n\
            enableTransition(ebMain, "turnYellow");\n\
            enableTransition(wbMain, "turnYellow");\n\
            nextOverallState("startNS", undefined); // wait for sync\n\
          }\n\
        }\n\
      } else { // extension not warrented\n\
        if (ebWalk.state === green || wbWalk.state === green) {\n\
          enableTransition(ebWalk, "turnYellow");\n\
          enableTransition(wbWalk, "turnYellow");\n\
          extendGreen(wbMain, ewWalkDuration - yellowDuration);\n\
          extendGreen(ebMain, ewWalkDuration - yellowDuration);\n\
          nextOverallState("startNS", undefined); // wait for sync\n\
        } else { // walks do not apply\n\
          enableTransition(ebMain, "turnYellow");\n\
          enableTransition(wbMain, "turnYellow");\n\
          nextOverallState("startNS", undefined); // wait for sync\n\
        }\n\
      }\n\
    break;\n\
    }\n\
  }\n\
}\n\
\n\
\n\
\n\
var date = new Date();\n\
var currentTime = date.getTime();\n\
var currentSecs = msToSec(currentTime);\n\
var changed = false;\n\
startNS(); // start up the overall machine \n\
\n\
function loop() {\n\
  changed = false;\n\
  date = new Date();\n\
  currentTime = date.getTime();\n\
  currentSecs = msToSec(currentTime);\n\
  \n\
  // check individual light state machines\n\
  turnStateMachine(ebTurn, currentTime);\n\
  walkStateMachine(ebWalk, currentTime);\n\
  mainStateMachine(ebMain, currentTime);\n\
  \n\
  turnStateMachine(wbTurn, currentTime);\n\
  walkStateMachine(wbWalk, currentTime);\n\
  mainStateMachine(wbMain, currentTime);\n\
  \n\
  turnStateMachine(nbTurn, currentTime);\n\
  walkStateMachine(nbWalk, currentTime);\n\
  mainStateMachine(nbMain, currentTime);\n\
  \n\
  turnStateMachine(sbTurn, currentTime);\n\
  walkStateMachine(sbWalk, currentTime);\n\
  mainStateMachine(sbMain, currentTime);\n\
\n\
  // check overall state machine and process changes caused by individual lights\n\
  overallStateMachine();\n\
\n\
  // simulate traffic\n\
  simulateTraffic();\n\
\n\
  // update drawing\n\
  if (changed) {\n\
    clear();\n\
    drawStreets();\n\
    drawSignals();\n\
    drawQueues();\n\
  }\n\
  //writeQueues (); // for debugging\n\
\n\
  // make sure all is safe\n\
  safetyCheck();\n\
}\n\
 \n\
animate(loop, 100);\n\
'
jumping_jack ='\
// Jumping Jack -- stick man doing jumping jacks\n\
\n\
/*\n\
This example shows a couple of concepts.\n\
One is the use of variables. The stick man is created based on proprotions of its\n\
height. Changing the height variable changes the size of the other body parts.\n\
\n\
Drawing of the body parts is done so that the turtle is returned to its starting point.\n\
This allows the body parts to be drawn in any order or for the center of the stick man\n\
to be moved. Each body part is draw with a function (also called a sub-routine) to\n\
make the problem easier to understand.\n\
\n\
The drawLeftLeg(), drawRightLeg(), drawLeftArm(), and drawRightArm() functions use a\n\
parameter that is used to determine the angle of\n\
the particular appendage being drawn. This way the same function can be used without\n\
regard to the arm or leg position.\n\
\n\
The drawBody() function ties everything together and draws all of the body parts.\n\
It has two parameters, one for the arm angle and one for the leg angle. This assumes\n\
that the arms move together and the legs move together, but that is not a requirement.\n\
You can change this.\n\
\n\
To make this a bit more fun, this can be animated, so the figure\'s arms and legs move\n\
as if it were doing jumping jacks. To do this we want to vary the angle of the\n\
arms, from 45 degrees to almost 180 degrees, say 175. The legs should vary from a \n\
135 degree angle to almost 180, lets say 175.  The two extreme positions of the\n\
body can be drawn as:\n\
  drawBody(45, 45);\n\
and\n\
  drawBody(175, 5);\n\
\n\
(hint: You can try each one separately in the command box.)\n\
\n\
For smooth motion, there should be 4 steps. (This is really a guess, there could be\n\
more or there could be less, but for now lets assume that 4 is a good number.)\n\
A step would be the base movement plus one quarter of the total movement. The moveBody()\n\
function uses the variable\n\
n to step throught the various movements with n=0, n=1, n=2, n=3, and n=4\n\
successively.\n\
\n\
For the arms: 45 + n * (175-45)/4\n\
\n\
For the legs: 45 - n * (45-5)/4\n\
\n\
The direction of the movement changes at either end, that is when\n\
n = 0 or n = 4; So when n is zero, n should be increased by one to get to 1. When n is\n\
4, n should be decreased by one (add a negative one) to get to 3. Using a direction\n\
variable allows the moveBody() function to remember what direction it is moving.\n\
\n\
Successive calls to moveBody() are controlled by the delay() function. This function is set\n\
to repeat in 100 ms. You could change the time to make it faster or slower.\n\
\n\
*/\n\
\n\
\n\
\n\
// GLOBALS\n\
  var height = 40;\n\
  var headDiameter = .25 * height;\n\
  var torsoLength = .3 * height;\n\
  var neckLength = .5 * torsoLength;\n\
  var armLength = .4 * height;\n\
  var legLength = .5 * height;\n\
\n\
/*\n\
  The body parts are drawn with the following asumptions\n\
  - the center of figure is the center of torso\n\
  - the turtle is returned to the center of the figure\n\
  - the turtle is pointed up \n\
  - the pen of the turtle is up\n\
*/\n\
\n\
\n\
function drawHead() {\n\
  forward (torsoLength/2 + neckLength + headDiameter/2); \n\
  pendown();\n\
  circle (headDiameter/2); //draw head\n\
  penup();\n\
  right(180);\n\
  forward (torsoLength/2 + neckLength + headDiameter/2); \n\
  right(180);\n\
}\n\
\n\
function drawNeck() {\n\
  forward (torsoLength/2 ); \n\
  pendown();\n\
  forward (neckLength); //neck\n\
  penup();\n\
  backward (torsoLength/2 + neckLength); \n\
}\n\
\n\
function drawTorso() {\n\
  backward (torsoLength/2); \n\
  pendown();\n\
  forward (torsoLength); \n\
  penup();\n\
  backward (torsoLength/2); \n\
}\n\
\n\
function drawLeftLeg(angle){\n\
  right(180);\n\
  forward (torsoLength/2);\n\
  left(angle);\n\
  pendown();\n\
  forward (legLength); //left leg\n\
  penup();\n\
  backward (legLength);\n\
  right(angle);\n\
  right(180);\n\
  forward (torsoLength/2); \n\
} \n\
\n\
function drawRightLeg(angle) {\n\
  right(180);\n\
  forward (torsoLength/2);\n\
  right(angle);\n\
  pendown();\n\
  forward (legLength); //right leg\n\
  penup();\n\
  backward (legLength);\n\
  left(angle);\n\
  right(180);\n\
  forward (torsoLength/2); \n\
}\n\
\n\
function drawLeftArm(angle){\n\
  forward (torsoLength/2);\n\
  right(angle);\n\
  pendown();\n\
  forward (armLength); //left arm\n\
  penup();\n\
  backward (armLength);\n\
  left(angle);\n\
  backward (torsoLength/2); \n\
} \n\
\n\
function drawRightArm(angle) {\n\
  forward (torsoLength/2);\n\
  left(angle);\n\
  pendown();\n\
  forward (armLength); //left arm\n\
  penup();\n\
  backward (armLength);\n\
  right(angle);\n\
  backward (torsoLength/2); \n\
}\n\
\n\
function drawBody(armAngle, legAngle) {\n\
  drawTorso();\n\
  drawHead();\n\
  drawNeck();\n\
  drawLeftArm(armAngle);\n\
  drawRightArm(armAngle);\n\
  drawLeftLeg(legAngle);\n\
  drawRightLeg(legAngle);\n\
}\n\
\n\
var n = 0;\n\
var direction = +1;\n\
\n\
function demo () {\n\
  clear();\n\
  home();\n\
  hideturtle();\n\
  n = 0;\n\
  direction = +1;\n\
  moveBody();\n\
}\n\
\n\
function moveBody () {\n\
  clear();\n\
  drawBody(45 + n * (175-45)/4,\n\
    45 - n * (45-5)/4);\n\
  n = n + direction;\n\
  if (n>=4 || n<=0) {\n\
    direction = -direction;\n\
  }\n\
  delay(moveBody,100);\n\
}\n\
'
kochLine ='\
// Koch Line -- draw an animated set of Koch lines\n\
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
function kochLines (side, steps) {\n\
  goto (-side/2, 0);\n\
  angle(90);\n\
  kochLine (side, i);\n\
}\n\
\n\
//*** Globals ***\n\
var i = 0;\n\
var steps = 6;\n\
var size = 0;\n\
\n\
function kochLineDelay() {\n\
  clear();\n\
  kochLines (size, i);\n\
  goto(minX(), minY());\n\
  angle(90);\n\
  setfont("Helvetica,san-serif 12pt")\n\
  write ("Koch line of order " +i);\n\
  draw();\n\
  i = i + 1;\n\
  if (i < steps) {\n\
    delay (kochLineDelay, 2000);\n\
  }\n\
}\n\
\n\
function demo() {\n\
  size = maxY();\n\
  if (size > maxX()) {\n\
    size = maxX();\n\
  }\n\
  size = 1.6 * size; // really 80% of twice the half width\n\
\n\
  reset();\n\
  hideturtle();\n\
  i = 0;\n\
  kochLineDelay();\n\
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
  angle (30);\n\
  goto (-length/2,-.3 * length);\n\
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
function kochSnowflakeDelay() {\n\
\n\
  clear();\n\
  var side = maxY() - minY();\n\
  if (side > maxX() - minX()) {\n\
    side = maxX() - minX()\n\
  }\n\
  kochSnowflake (.8 * side,i);\n\
  goto(minX(),minY());\n\
  angle(90);\n\
  setfont("Helvetica,san-serif 12pt")\n\
  write ("Koch snowflake of order " +i);\n\
  draw();\n\
  i = i + 1;\n\
  if (i < steps) {\n\
    delay (kochSnowflakeDelay, 2000);\n\
  }\n\
}\n\
\n\
function demo() {\n\
  hideturtle();\n\
  i = 0;\n\
  kochSnowflakeDelay();\n\
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
randomStars ='\
// Random Stars -- draw stars randomly on the canvas\n\
\n\
function star (side, sColor) {\n\
  penup()\n\
  forward(.54*side)\n\
  turn (180-18)\n\
  pendown()\n\
  var i=0\n\
  beginShape()\n\
  while (i<5){\n\
    forward(side)\n\
    right(180-36)\n\
    i = i + 1\n\
  }\n\
  fillShape(sColor)\n\
  turn (180+18)\n\
}\n\
\n\
\n\
function demo () {\n\
  for (i=1; i< 150; i=i+1) {\n\
    goto (random(minX(),maxX()), random( minY(),maxY()))\n\
    left(random(359))\n\
    star (random(2,15), random(15))\n\
  }\n\
  hideTurtle()\n\
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
//** Globals **\n\
\n\
var maxX =  imageContext.canvas.width/2;\n\
var maxY =  imageContext.canvas.height/2;\n\
var minX =  -maxX;\n\
var minY =  -maxY;\n\
var maxVelocity = 12;\n\
\n\
\n\
function plotOne() {\n\
  goto(random(minX, maxX), random(minY, maxY));\n\
  color(random(16));\n\
  angle(random(0, 180));\n\
  width(random(1, 20));\n\
  forward(random(10, 30));\n\
}\n\
\n\
function demo () {\n\
  animate (plotOne, 20);\n\
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
itself. Recursive functions must include\n\
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
    var side = 64/(i * i);\n\
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
snowman ='\
// Snowman -- draw a simple snowman\n\
\n\
// draw the three cirles for the body\n\
clear()\n\
width(1)\n\
goto (0,-100)\n\
circle (80)\n\
goto (0,60-20)\n\
circle (60)\n\
goto (0,60-20+60+40)\n\
circle (40)\n\
\n\
// add the coal for the eyes, nose and mouth\n\
goto (-15,160)\n\
dot()\n\
goto (15,160)\n\
dot()\n\
goto (0,140)\n\
dot()\n\
goto (0,120)\n\
dot()\n\
goto (15,125)\n\
dot()\n\
goto (-15,125)\n\
dot()\n\
\n\
// add coal for the buttons\n\
goto (0,60)\n\
dot()\n\
goto (0,40)\n\
dot()\n\
goto (0,20)\n\
dot()\n\
goto (0,0)\n\
dot()\n\
\n\
// add stick for a right arm\n\
goto (56,60)\n\
angle (60)\n\
width(3)\n\
forward (40)\n\
left(15)\n\
forward (25)\n\
backward (25)\n\
right(20)\n\
forward(30)\n\
backward(30)\n\
right(10)\n\
forward(20)\n\
\n\
// add stick for a left arm\n\
goto (-56,60)\n\
angle (-60)\n\
width(3)\n\
forward (40)\n\
left(15)\n\
forward (25)\n\
backward (25)\n\
right(20)\n\
forward(30)\n\
backward(30)\n\
right(10)\n\
forward(20)\n\
'
snubIcosidodecahedron ='\
// Snub Icosidodecahedron Half Pattern -- half pattern for model of snub icosidodecahedron\n\
\n\
/*\n\
Print two copies of this.\n\
Score the lines to make it easier to fold.\n\
Fold and glue the tabs together, so they\n\
are inside the model. Mind the overlaps (10) and\n\
the inner single tabs (5).\n\
\n\
Have fun.\n\
*/\n\
\n\
function leftTriangle(side) {\n\
  for (var i=0; i<3; i++) {\n\
    forward (side)\n\
    left(120)\n\
  }\n\
}\n\
\n\
function leftTab( side) {\n\
  var x = turtle.pos.x\n\
  var y = turtle.pos.y\n\
  left( 180 - 45)\n\
  forward( side * .2)\n\
  left( 45)\n\
  forward( side * .72)\n\
  left( 45)\n\
  forward( side * .2)\n\
  left( 180 - 45)\n\
  forward( side)\n\
  goto( x, y)\n\
}\n\
\n\
\n\
function rightTriangle(side, tabs) {\n\
  for (var i=0; i<3; i++) {\n\
    forward (side)\n\
    if (tabs.includes (""+i)) {\n\
      leftTab(side)\n\
    }\n\
    right(120)\n\
  }\n\
}\n\
\n\
function leftPentagon(side) {\n\
  for (var i=0; i<5; i++) {\n\
    forward (side)\n\
    left(72)\n\
    if (i  == 0) {\n\
      rightTriangle(side, "1")\n\
    }\n\
    if (i  == 1 || i == 2) {\n\
      rightTriangle(side, "1,2")\n\
    }\n\
    if (i == 3) {\n\
      rightTriangle(side, "1")\n\
      right(60)\n\
      //beginShape()\n\
      rightTriangle(side, "1,2")\n\
      //fillShape("red")\n\
      left(60)\n\
    }\n\
  }\n\
}\n\
\n\
function rightPentagon(side) {\n\
  for (var i=0; i<5; i++) {\n\
    left(120)\n\
    forward(side)\n\
    right(120)\n\
    leftPentagon(side) // outer pentagon\n\
    left(120)\n\
    backward (side)\n\
    right(120)\n\
    forward (side)\n\
    left(120)\n\
    rightTriangle(side, "")\n\
    right(120)\n\
    right(72)\n\
    leftTriangle(side)\n\
  }\n\
}\n\
\n\
function demo() {\n\
  reset()\n\
  goto (-50,-22)\n\
  rightPentagon(76) // inner pentagon\n\
  hideturtle()\n\
}\n\
'
spinning_squares ='\
// Spinning Squares -- draw some square of increasing size and angle.\n\
\n\
function square (side) {\n\
  var i=0\n\
  while (i<4) {\n\
    forward( side)\n\
    turn(90)\n\
    i=i+1\n\
  }\n\
}\n\
\n\
function spinningSquare2() {\n\
   hideTurtle();\n\
   color("blue");\n\
   for(s = 100; s > 0; s -= 10) {\n\
      square(s);\n\
      right(36);\n\
   }\n\
}\n\
\n\
function spinningSquare() {\n\
  var steps = 100\n\
  var stepSize = 200/steps\n\
  color("blue");\n\
  for (var i=0; i<steps; i=i+1) {\n\
    square(stepSize*i);\n\
    right(360/steps)\n\
  }\n\
}\n\
\n\
demo = spinningSquare\n\
'
spiral ='\
// Spiral -- demonstrate some simple spirals\n\
\n\
function spiral1() {\n\
  n=0\n\
  while (n<400) {\n\
    forward(n)\n\
    right(90)\n\
    n=n+3\n\
  }\n\
}\n\
\n\
function spiral2() {\n\
  n=0\n\
  while (n<75) {\n\
    forward(n)\n\
    right(90-n)\n\
    n=n+1\n\
  }\n\
}\n\
\n\
\n\
function spiral() {\n\
  n=0\n\
  while (n<40) {\n\
    forward(n)\n\
    right(15)\n\
    n=n+.25\n\
  }\n\
}\n\
\n\
demo = spiral;\n\
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
stamps ='\
// Stamps -- demonstrate stamping of a star design multiple times\n\
\n\
function star (side) {\n\
  penup()\n\
  forward(.54*side)\n\
  turn (180-18)\n\
  pendown()\n\
  var i=0\n\
  while (i<5){\n\
    forward(side)\n\
    right(180-36)\n\
    i = i + 1\n\
  }\n\
  turn (180+18)\n\
}\n\
\n\
function stamps () {\n\
  wrap(false)\n\
  var x = minX()\n\
  while (x <= maxX()) {\n\
    var y = minY()\n\
    while (y <= maxY()) {\n\
      goto (x,y)\n\
      angle (0);\n\
      star (25);\n\
      y = y+30\n\
    }\n\
    x = x+30\n\
  }\n\
}\n\
\n\
  \n\
demo = stamps\n\
'
star ='\
// Star -- draw a simple star\n\
\n\
function star (side) {\n\
  penup()\n\
  forward(.54*side)\n\
  turn (180-18)\n\
  pendown()\n\
  var i=0\n\
  while (i<5){\n\
    forward(side)\n\
    right(180-36)\n\
    i = i + 1\n\
  }\n\
  turn (180+18)\n\
}\n\
\n\
\n\
function demo () {\n\
  //beginShape()\n\
  star (100)\n\
  //fillShape("white")\n\
  hideTurtle()\n\
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
triangleTunnel ='\
// Triangle Tunnel -- animate a set of mesmerizing nested triangle for a tunnel effect\n\
reset()\n\
hideTurtle()\n\
\n\
function triangle (side) {\n\
  home()\n\
  penup();\n\
  forward (side/2);\n\
  right(150);\n\
  pendown();\n\
  for (var i=0; i<3; i++) {\n\
    forward(side);\n\
    right(120);\n\
  }\n\
}\n\
\n\
var sides = 40;\n\
var tColor = [];\n\
\n\
for (var i=0; i<sides; i++) {\n\
  tColor [i] = random (15)\n\
}\n\
\n\
function nestTri () {\n\
  tColor.push(random (15));\n\
  tColor.shift();\n\
  for (var i=0; i<sides; i++) {\n\
    color (tColor[i]);\n\
    triangle (i*15);\n\
  }\n\
}\n\
\n\
function demo () {\n\
  animate (nestTri,1);\n\
}\n\
'
