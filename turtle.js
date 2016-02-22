/************************************************************************
*  turtle.js -- javascript for the turtle graphic language extensions
*
*  Copyright (c) 2015 Kirk Carlson
*  MIT license
************************************************************************/

// some globals
var intervals = []; //array of inteval ids started with the animate function
var timeouts = []; //array of time out ids started with the delay function

// get a handle for the canvases in the document
var imageCanvas = document.getElementById('imagecanvas');
var imageContext = imageCanvas.getContext('2d');

imageContext.textAlign = "center";
imageContext.textBaseline = "middle";

var turtleCanvas = document.getElementById('turtlecanvas');
var turtleContext = turtleCanvas.getContext('2d');

// the turtle takes precedence when compositing
turtleContext.globalCompositeOperation = 'destination-over';

// initialise the state of the turtle
var turtle = undefined;

function initialise() {
   turtle = { pos: {
                 x: 0,
                 y: 0
              },
              angle: 0, //12 o'clock
              penDown: true,
              width: 1,
              visible: true,
              redraw: true, // does this belong here?
              wrap: true,
              color: "black",
            };
   imageContext.lineWidth = turtle.width;
   imageContext.strokeStyle = "black";
   imageContext.globalAlpha = 1;
}

// draw the turtle and the current image if redraw is true
// for complicated drawings it is much faster to turn redraw off
function drawIf() {
   if (turtle.redraw) draw();
}

// use canvas centered coordinates facing upwards
function centerCoords (context) {
   var width = context.canvas.width;
   var height = context.canvas.height;
   context.translate(width/2, height/2);
   context.transform(1, 0, 0, -1, 0, 0);
}

// maxX()
// return maximum X value for the current canvas
function maxX () {
  return (imageContext.canvas.width / 2);
}

maxx = maxX;

// minX()
// return minimum X value for the current canvas
function minX () {
  return (-imageContext.canvas.width / 2);
}

minx = minX;

// maxY()
// return maximum Y value for the current canvas
function maxY () {
  return (imageContext.canvas.height / 2);
}

maxy = maxY;

// minY()
// return minimum Y value for the current canvas
function minY () {
  return (-imageContext.canvas.height / 2);
}

miny = minY;

// draw the turtle and the current image
function draw() {
   clearContext(turtleContext);
   if (turtle.visible) {
      var x = turtle.pos.x;
      var y = turtle.pos.y;
      var w = 10;
      var h = 15;
      turtleContext.save();
      // use canvas centered coordinates facing upwards
      centerCoords(turtleContext);
      // move the origin to the turtle center
      turtleContext.translate(x, y);
      // rotate about the center of the turtle
      turtleContext.rotate(-turtle.angle);
      // move the turtle back to its position
      turtleContext.translate(-x, -y);
      // draw the turtle icon
      turtleContext.beginPath();
      turtleContext.moveTo(x - w/2, y);
      turtleContext.lineTo(x + w/2, y);
      turtleContext.lineTo(x, y + h);
      turtleContext.closePath();
      turtleContext.fillStyle = "green";
      turtleContext.fill();
      turtleContext.restore();
   }
   //turtleContext.drawImage(imageCanvas, 0, 0, 300, 300, 0, 0, 300, 300);
   turtleContext.drawImage(imageCanvas, 0, 0, turtleContext.canvas.width, turtleContext.canvas.height,
       0, 0, turtleContext.canvas.width,turtleContext.canvas.height);
}

// clear the display, don't move the turtle
function clear() {
   clearContext(imageContext);
   drawIf();
}

function clearContext(context) {
   context.save();
   context.setTransform(1,0,0,1,0,0);
   context.clearRect(0,0,context.canvas.width,context.canvas.height);
   context.restore();
}

// reset the whole system, clear the display and move turtle back to
// origin, facing the Y axis.
function reset() {
   initialise();
   clear();
   draw();
   stopAnimation();
}

// move the turtle to the origin and set heading to 0
function home() {
   setposition (0,0);
   setheading (0);
}

// stop all animations in progress
function stopAnimation() {
  while (intervals.length > 0) {
    clearInterval(intervals.pop());
  }
  while (timeouts.length > 0) {
    clearTimeout(timeouts.pop());
  }
  document.getElementById("stopButton").hidden=true;
}

// Trace the forward motion of the turtle, allowing for possible
// wrap-around at the boundaries of the canvas.
function forward(distance) {
   imageContext.save();
   centerCoords(imageContext);
   imageContext.beginPath();
   // get the boundaries of the canvas
   var maxX = imageContext.canvas.width / 2;
   var minX = -imageContext.canvas.width / 2;
   var maxY = imageContext.canvas.height / 2;
   var minY = -imageContext.canvas.height / 2;
   var x = turtle.pos.x;
   var y = turtle.pos.y;
   // trace out the forward steps
   while (distance > 0) {
      // move the to current location of the turtle
      imageContext.moveTo(x, y);
      // calculate the new location of the turtle after doing the forward movement
      var cosAngle = Math.cos(turtle.angle);
      var sinAngle = Math.sin(turtle.angle)
      var newX = x + sinAngle  * distance;
      var newY = y + cosAngle * distance;
      // wrap on the X boundary
      function xWrap(cutBound, otherBound) {
         var distanceToEdge = Math.abs((cutBound - x) / sinAngle);
         var edgeY = cosAngle * distanceToEdge + y;
         imageContext.lineTo(cutBound, edgeY);
         distance -= distanceToEdge;
         x = otherBound;
         y = edgeY;
      }
      // wrap on the Y boundary
      function yWrap(cutBound, otherBound) {
         var distanceToEdge = Math.abs((cutBound - y) / cosAngle);
         var edgeX = sinAngle * distanceToEdge + x;
         imageContext.lineTo(edgeX, cutBound);
         distance -= distanceToEdge;
         x = edgeX;
         y = otherBound;
      }
      // don't wrap the turtle on any boundary
      function noWrap()
      {
         imageContext.lineTo(newX, newY);
         turtle.pos.x = newX;
         turtle.pos.y = newY;
         distance = 0;
      }
      // if wrap is on, trace a part segment of the path and wrap on boundary if necessary
      if (turtle.wrap) {
         if (newX > maxX)
            xWrap(maxX, minX);
         else if (newX < minX)
            xWrap(minX, maxX);
         else if (newY > maxY)
             yWrap(maxY, minY);
         else if (newY < minY)
            yWrap(minY, maxY);
         else
            noWrap();
      }
      // wrap is not on.
      else {
         noWrap();
      }
   }
   // only draw if the pen is currently down.
   if (turtle.penDown)
      imageContext.stroke();
   imageContext.restore();
   drawIf();
}

fd = forward;

function backward (distance) {
  right (180);
  forward (distance);
  right (180);
}

bk = backward;
back = backward;


// turn on/off redrawing
function redrawOnMove(bool) {
   turtle.redraw = bool;
}

// turn right by an angle in degrees
function right(angle) {
   turtle.angle += degToRad(angle);
   drawIf();
}

turn = right;
rt = right;

// turn left by an angle in degrees
function left(angle) {
   turtle.angle -= degToRad(angle);
   drawIf();
}

lt = left;



// lift up the pen (don't draw)
function penup() {
  turtle.penDown = false;
}

pu = penup;
up = penup;
penUp = penup;


// put the pen down (do draw)
function pendown() {
  turtle.penDown = true;
}

pd = pendown;
down = pendown;
penDown = pendown;

// turn edge wrapping on/off
function wrap(bool) {
   turtle.wrap = bool;
}

// show/hide the turtle
function hideturtle() {
   turtle.visible = false;
   drawIf();
}

ht = hideturtle;
hideTurtle = hideturtle;

function showturtle() {
   turtle.visible = true;
   drawIf();
}

st = showturtle;
showTurtle = showturtle;

// move the turtle to a particular coordinate (don't draw on the way there)
function goto(x,y) {
   turtle.pos.x = x;
   turtle.pos.y = y;
   drawIf();
}

setposition = goto;
setpos = goto;
setPosition = goto;
setPos = goto;

// move the turtle to a particular x coordinate
function setx(x) {
   turtle.pos.x = x;
   drawIf();
}

setX = setx;

// move the turtle to a particular y coordinate
function sety(y) {
   turtle.pos.y = y;
   drawIf();
}

setY = sety;

// set the angle of the turtle in degrees
function angle(angle) {
   turtle.angle = degToRad(angle);
   drawIf();
}

setheading = angle;
setHeading = angle;
seth = angle;

// set the width of the line
function width(w) {
   turtle.width = w;
   imageContext.lineWidth = w;
}

pensize = width;
penwidth = width;
penSize = width;
penWidth = width;

// write some text at the turtle position in direction of turtle
// turtle position does not change
function write(msg) {
   imageContext.save();
   centerCoords(imageContext);
   imageContext.translate(turtle.pos.x, turtle.pos.y);
   imageContext.transform(1, 0, 0, -1, 0, 0);
   imageContext.rotate(turtle.angle - Math.PI/2);
   imageContext.textAlign = "left";
   imageContext.textBaseline = "bottom";
   imageContext.fillStyle = turtle.color;
   imageContext.fillText(msg, 0, 0);
   imageContext.restore();
   drawIf();
}


// set the color of the line and fill using turtle graphic standard color and CSS colors
function color (col) {
  if (typeof(col) === "number") {
    if (col < 16) { // assume standard logo turtle color
      col = logoColors [col];
    } else {
      //color is assumed to be a 32-bit color value
    }
  } else if (typeof(col) != "string") { // col is not a supported type
    col = "black";
  }
  turtle.color = col;
  imageContext.strokeStyle = col;
}

colour = color;

// map one of several color methods to a 32-bit integer
//    Hexadecimal colors (e.g., "#ff0000")
//    RGB colors (e.g., "rgb(255,0,0)")
//    RGBA colors (e.g., "rgba(255,0,0,1)")
//    HSL colors (e.g., "hsl(120, 100%, 50%)")
//    HSLA colors (e.g., "hsla(120, 100%, 50%, 1)")
//    Predefined/Cross-browser color names (e.g., "red")
//    logo color numbers 
logoColors = ["black", "blue", "lime", "cyan", "red", "magenta", "yellow", "white", 
              "brown", "tan", "green", "aqua", "salmon", "purple", "orange", "gray"]



// Generate a random integer between low and high (or 0 and low if only one specified)
function random(low, high) {
   if (high == undefined) {
     return Math.floor( (low + 1) * Math.random ());
   } else {
     return Math.floor(Math.random() * (high - low + 1) + low);
   }
}

// Repeat some action n times
function repeat(n, action) {
   for (var count = 1; count <= n; count++) {
      eval (action);
   }
}

// Repeat some action every ms milliseconds
function animate(f, ms) {
   intervals.push (setInterval(f, ms));
   document.getElementById("stopButton").hidden=false;
}

function delay(f, ms) {
   timeouts.push (setTimeout(function () {
     timeouts.pop(); // pop the current timer
     if (timeouts.length == 0) {
       document.getElementById("stopButton").hidden=true;
     };
     f()
   }, ms));
   document.getElementById("stopButton").hidden=false;
}

function setfont(font) {
   imageContext.font = font;
}

setFont = setfont;

//SUPPORT FUNCTIONS

// convert degrees to radians
function degToRad(deg) {
   return deg / 180 * Math.PI;
}

// convert radians to degrees
function radToDeg(deg) {
   return deg * 180 / Math.PI;
}

// constrain a value between low and high
function constrain(n, low, high) {
  var modulo = high - low;
  while (n < low) {
    n = n + modulo;
  }
  while (n > high) {
    n = n - modulo;
  }
  return n;
}
  
/*************************************************************************************
Coordinate systems...

Drawing a circle became a pain because of the number of different coordinate
systems being used. These are:
  - the javascript canvas.
    = origin is at the top left
    = origin has positive going down, no negatives
    = origin has been translated to mimic cartesian coordinates
    = arcs are referenced with 0 at 3 o'clock going clockwise
  - the turtle graphic space.
    = Origin at center to mimic cartesian coordinates
    = heading is referenced with 0 at 12 o'clock going clockwise
  - cartesian coodinates
    = origin is at center with positive up
    = 0 angle is at 3 o'clock going counterclockwise
*************************************************************************************/

//  curveleft (radius, extent)
//   center is radius distance perpendicular to turtle's left
//   extent (if given) is number of degrees in partial arc
//   arc is drawn counterclockwise
//   direction of turtle is changed by extent
function curveleft (radius, extent) {
  if (extent == undefined) {
    extent = 360;
  }
  var startAngle = turtle.angle; // in radians from 12 o'clock .. heading is same as start
  var counterclockwise = true;
  var centerX = turtle.pos.x - radius * Math.cos (turtle.angle); // left of turtle
  var centerY = turtle.pos.y + radius * Math.sin (turtle.angle);
  stopAngle = constrain( (startAngle - degToRad(extent)), 0, 2*Math.PI); // in radians CCW
  turtle.angle = stopAngle;
  turtle.pos.x = centerX + radius * Math.cos(stopAngle);
  turtle.pos.y = centerY - radius * Math.sin(stopAngle);

  // correct for flipping of x values, this changes rotation and angles
  counterclockwise = !counterclockwise;
  startAngle = -startAngle;
  stopAngle = -stopAngle;
  imageContext.save();
  centerCoords(imageContext);
  imageContext.beginPath();
  imageContext.arc (centerX, centerY, radius, startAngle, stopAngle, counterclockwise);
  // draw it
  if (turtle.penDown) {
    imageContext.stroke();
  }
  imageContext.restore();
  drawIf();
}

curveLeft = curveleft;

//  curveright (radius, extent)
//   center is radius distance perpendicular to turtle's right
//   extent (if given) is number of degrees in partial arc
//   arc is drawn clockwise
//   direction of turtle is changed by extent
function curveright (radius, extent) {
  if (extent == undefined) {
    extent = 360;
  }
  var startAngle = Math.PI + turtle.angle; // in radians .. heading is same as start
  var counterclockwise = false;
  var centerX = turtle.pos.x + radius * Math.cos (turtle.angle); // right of turtle
  var centerY = turtle.pos.y - radius * Math.sin (turtle.angle);
  stopAngle = constrain( startAngle + degToRad(extent), 0, 2*Math.PI); // in radians CW
  turtle.angle = stopAngle + Math.PI;
  turtle.pos.x = centerX + radius * Math.cos(stopAngle);
  turtle.pos.y = centerY - radius * Math.sin(stopAngle);

  // correct for flipping of x values, this changes rotation and angles
  counterclockwise = !counterclockwise;
  startAngle = -startAngle;
  stopAngle = -stopAngle;
  imageContext.save();
  centerCoords(imageContext);
  imageContext.beginPath();
  imageContext.arc (centerX, centerY, radius, startAngle, stopAngle, counterclockwise);
  // draw it
  if (turtle.penDown) {
    imageContext.stroke();
  }
  imageContext.restore();
  drawIf();
}

curveRight = curveright;

// circle(radius[[,extent],CW))
// radius is length in pixels
// extent is size of arc in degrees
// CW is boolean for clockwise, default to true)
function circle(radius, extent, CW) {
  if (CW === undefined) {
    CW = true;
  }
  startAngle = turtle.angle - Math.PI/2; // translate turtle to normal canvas coordinate
  imageContext.save();
  centerCoords(imageContext);
  imageContext.beginPath();
  imageContext.strokeStyle=turtle.color;
  //imageContext.fillStyle=turtle.color;
  // negate angles and CW due to context translation
  if (extent === undefined) {
   imageContext.arc (turtle.pos.x, turtle.pos.y, radius, 0, 2*Math.PI);
  } else if (CW) {
    imageContext.arc (turtle.pos.x, turtle.pos.y, radius, -startAngle, -(startAngle+degToRad(extent)), CW);
  } else {
    imageContext.arc (turtle.pos.x, turtle.pos.y, radius, -startAngle, -(startAngle-degToRad(extent)), CW);
  }
  // draw it regardless of pen up or down
  imageContext.stroke();
  //imageContext.fill();
  imageContext.restore();
  drawIf();
}

arc = circle;

// dot(radius)
// radius in pixels (if none, max of pensize+4, 2*pensize)
function dot(size) {
  if (size == undefined) {
    size = Math.max(turtle.width+4, turtle.width*2);
  }
  imageContext.save();
  centerCoords(imageContext);
  imageContext.beginPath();
  imageContext.fillStyle=turtle.color;
  imageContext.strokeStyle=turtle.color;
  imageContext.arc (turtle.pos.x, turtle.pos.y, size, 0, 2*Math.PI);
  // draw it regardless of pen up or down
  imageContext.stroke();
  imageContext.fill();
  imageContext.restore();
  drawIf();
}


reset();
