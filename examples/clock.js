// Clock, Analog -- draw and animate an analog clock

//draw the tick marks around the edge of the clock
function ticks(x, y, radius) {
   var tickLen = 7;
   var gap = radius - tickLen;
   color("blue");
   width(1);
   for (var theta = 0; theta < 360; theta += 6) {
      // Thicken hour marks
      if (theta % 30 != 0) {
         width(1);
      } else {
         width(3);
      }
      penup();
      goto(0,0);
      angle(theta);
      forward(gap);
      pendown();
      forward(tickLen);
   }
}


// draw the hour numbers on the clock face
function numbers(x, y, radius) {
   penup();
   setFont("20px sans-serif");
   color("black");
   for (var hour = 1; hour <= 12; hour++) {
      goto(x,y);
      angle(hour * 30);
      forward(radius); // to center of digit
      angle(180);
      forward(10); // vertical correction to baseline
      right(90);
      if (hour < 10) {
        forward(6); // horizontal correction to lower left corner
      } else {
        forward (10)
      }
      right(180);
      write(hour);
   }
   pendown();
}

// draw one of the clock hands
function hand (theta, w, length, col) {
   var stepSize = 5;
   var widthDelta = w / (length / stepSize);
   goto(0, 0);
   angle(theta);
   color(col);
   for (var step = 0; step < length; step += stepSize) {
      width(w);
      forward(stepSize);
      w -= widthDelta;
   }
}

function hands(hours, minutes, seconds) {
    // draw seconds hand
    var secDegreesPerSecond = 6;	// = 360 degrees/60 seconds /minute
    hand(seconds * secDegreesPerSecond, 4, 100, "red");
    // draw minutes hand 
    var minDegreePerSecond = 0.1;	// = 360 degrees /3600 seconds /hour
    var minutesInSeconds = minutes * 60 + seconds;
    hand(minutesInSeconds * minDegreePerSecond, 10, 100, "blue");
    // draw hours hand
    var hourDegreePerSecond = .1/12;	// = 360 degrees /3600 seconds per hour /12 hours per half day /half day
    var hoursInSeconds = ((hours % 12) * 3600) + minutesInSeconds;
    hand(hoursInSeconds * hourDegreePerSecond, 10, 60, "blue");
}

// refresh the entire clock
function clock() {
   clear();
   numbers(0, 0, 110);
   color("lightgreen");
   goto (0,0);
   circle(130);
   ticks(0, 0, 130);
   var d = new Date();
   hands(d.getHours(), d.getMinutes(), d.getSeconds());
}

function demo() {
   hideTurtle();
   // refresh the clock every second
   animate(clock,1000);
}
