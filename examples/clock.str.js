clockString ='\
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
   var vertCorrection = [0, 0,3,10, 14,20,24, 20,16,12, 3,0,0];\n\
   var horizCorrection = [0, 0,-2,-14, -10,-6,-6, 10,14,14, 14,10,10];\n\
   penup();\n\
   setFont("20px sans-serif");\n\
   for (var hour = 1; hour <= 12; hour++) {\n\
      goto(x,y);\n\
      angle(hour * 30);\n\
      forward(radius);\n\
      angle(180);\n\
      //forward(5);\n\
      forward(vertCorrection[hour]);\n\
      right(90);\n\
      forward(horizCorrection[hour]);\n\
      //forward(4);\n\
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
   numbers(0, 0, 100);\n\
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
