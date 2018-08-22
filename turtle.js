/************************************************************************
*  turtle.js -- javascript for the turtle graphic language extensions
*
*  Copyright (c) 2015 Kirk Carlson
*  MIT license
*
*  would like to allow optional animation of each line drawn
*  see jsfiddle.net/epistemex/c85cmy0z/ for example of how to do this
************************************************************************/
/*************************************************************************************
Coordinate systems...

Drawing a circle became a pain because of the number of different coordinate
systems being used. These are:
  - the javascript canvas.
    * origin is at the top left
    * origin has positive going down, no negatives
    * origin has been translated to mimic cartesian coordinates
    * arcs are referenced with 0 at 3 o'clock going clockwise
  - cartesian coodinates
    * origin is at center with positive up
    * 0 angle is at 3 o'clock going counterclockwise
  - the turtle graphic space.
    * Origin at center to mimic cartesian coordinates
    * heading is referenced with 0 angle at 12 o'clock going clockwise

Canvases:

Two canvases are used:
  imageCanvas to hold the image drawn by the turtle
  turtleCanvas to hold the image of the turtle AND the image drawn by the turtle
The imageCanvas is not visable, only the turtleCanvas is visible.
#### the above should change, there should be two layers, the turtle and the image.
#### if the turtle is not visible, that layer is invisible and not updated.
#### this is a major change, so commit it out
The "redraw" boolean function controls whether the turtle is drawn after each move.
##### this includes an image copy, which is the expensive operation, use layers instead!

shapes...
  want to be able to fill polygons
  beginShape
  fillShape(style), style can be color, gradient or pattern
  need to be careful with beginPath, closePath. Again this is a major change so commit
    beginPath
      forward
      curveRight
      curveLeft
      circle
      dot
    closePath
      only in drawing the turtle
    begin path seems to be need to get the penup/pendown stuff to work, so this means:
      lets say we add beginShape, fillShape commands
      they use beginPath and closePath for that shape
      if beginPath has not been issued, other lines use beginPath for their segment

"wrap" only works for straight lines, not curves, circles, or dots.

*************************************************************************************/


// get a handle for the canvases in the document
var imageCanvas = document.getElementById("imagecanvas");
var imageContext = imageCanvas.getContext("2d");

imageContext.textAlign = "center";
imageContext.textBaseline = "middle";

var turtleCanvas = document.getElementById("turtlecanvas");
var turtleContext = turtleCanvas.getContext("2d");

// the turtle takes precedence when compositing
turtleContext.globalCompositeOperation = "destination-over";

// initialize the state of the turtle
var turtle = undefined;


//////RENDERING FUNCTIONS


/*******************************************************************************
 * initialize -- initialize the turtle graphics system
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function initialize() {
   turtle = { pos: {
                 x: 0,
                 y: 0
              },
              angle: 0, //12 o'clock
              penDown: true,
              width: 1,
              visible: true, // controls turtle visibility
              redraw: true, //  controls redrawing turtle every move
              shape: false, //  controls inclusion of segments from a filled shape
              wrap: true, //    controls wraping at the edge
              color: "black"
            };
   imageContext.lineWidth = turtle.width;
   imageContext.strokeStyle = "black";
   imageContext.globalAlpha = 1;
}


/*******************************************************************************
 * drawIf -- draw the turtle and the current image if redraw is true
 *           Complicated drawings render faster if redraw is false
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function drawIf() {
   if (turtle.redraw) {
      draw();
   }
}


/*******************************************************************************
 * draw -- draw the turtle and the current image
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function draw() {
   clearContext(turtleContext);
   // draw the turtle, if it is visible
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
   // now draw the background
   turtleContext.drawImage(imageCanvas, 0, 0, turtleContext.canvas.width,
       turtleContext.canvas.height, 0, 0, turtleContext.canvas.width,
       turtleContext.canvas.height);
}


/*******************************************************************************
 * centerCoords -- center the coordinates on a given canvas context
 *
 * arguments:
 *   context: context of a canvas
 *
 * returns: None
 ******************************************************************************/
// use canvas centered coordinates facing upwards
function centerCoords (context) {
   var width = context.canvas.width;
   var height = context.canvas.height;
   context.translate(width/2, height/2);
   context.transform(1, 0, 0, -1, 0, 0);
}


/*******************************************************************************
 * clear -- clear the display, don't move the turtle
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function clear() {
   clearContext(imageContext);
   drawIf();
}


/*******************************************************************************
 * clearContext -- clear the specified context
 *
 * arguments: context for an image
 *
 * returns: None
 ******************************************************************************/
function clearContext(context) {
   context.save();
   context.setTransform(1,0,0,1,0,0);
   context.clearRect(0,0,context.canvas.width,context.canvas.height);
   context.restore();
}


/*******************************************************************************
 * reset -- reset the turtle graphics and move turtle to center facing North
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function reset() {
   //console.log(document.getElementById("stopButton").onClick)
   initialize();
   clear();
   draw();
   stopAnimation();
   turtle.shape = false;
}


/*******************************************************************************
 * home -- move the turtle to center facing North
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
// move the turtle to the origin and set heading to 0
function home() {
   setposition (0,0);
   setheading (0);
}


/*******************************************************************************
 * stopAnimation -- stop all animations in progress
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function stopAnimation() {
  while (intervals.length > 0) {
    clearInterval(intervals.pop());
  }
  while (timeouts.length > 0) {
    clearTimeout(timeouts.pop());
  }
  //should trap error is stopButton is not defined
  document.getElementById("stopButton").hidden=true;
}


/*******************************************************************************
 * redrawOnMove -- set the state of the redraw flag
 *
 * arguments:
 *   bool: desired state of redraw flag
 *
 * returns: None
 ******************************************************************************/
// turn on/off redrawing
function redrawOnMove(bool) {
   turtle.redraw = bool;
}


/*******************************************************************************
 * warp -- set the desired state of the boundary wrapping function
 *
 * arguments:
 *   bool: desired state of boundary wrapping function
 *
 * returns: None
 ******************************************************************************/
function wrap(bool) {
   turtle.wrap = bool;
}


/*******************************************************************************
 * beginShape -- mark the beginning of a filled shape
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function beginShape() {
  turtle.shape = true;
  imageContext.beginPath();
}


/*******************************************************************************
 * fillShape -- fill shape
 *
 * arguments:
 *   styl: fill style (color, gradient, or pattern), defaulting to turtle color
 *
 * returns: None
 ******************************************************************************/
function fillShape( styl) {
  if (turtle.shape) {
    if (styl == undefined) {
       styl = turtle.color;
    }
    if (typeof(styl) === "number") {
      if (styl < 16) { // assume standard logo turtle color
        styl = logoColors [styl];
      } //else {
        //color is assumed to be a 32-bit color value
      //}
    } else if (typeof(styl) != "string") { // col is not a supported type
      styl = "black";
    }

    //imageContext.save()
    imageContext.closePath();
    imageContext.fillStyle=styl;
    imageContext.strokeStyle=turtle.color; //stroke and fill can be different
    if (turtle.penDown) {
      imageContext.stroke();
      imageContext.fill();
    }
    //imageContext.restore();
    drawIf();
  }
  turtle.shape = false;
}


//////Movement Functions

/*******************************************************************************
 * forward -- move the turtle forward, allowing for possible wrap-around
 *
 * arguments:
 *   distance: number of pixels to move forward
 *
 * returns: None
 ******************************************************************************/
function forward(distance) {
   // define some local variables and functions
   var cosAngle = Math.cos(turtle.angle);
   var sinAngle = Math.sin(turtle.angle);
   var new_X;
   var new_Y;
   var distance;

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
   function noWrap(x, y) {
      imageContext.lineTo(x, y);
      turtle.pos.x = x;
      turtle.pos.y = y;
      distance = 0;
   }


   imageContext.save();
   centerCoords(imageContext);
   if (! turtle.shape) {
     imageContext.beginPath();
   }

   // get the boundaries of the canvas
   var max_X = imageContext.canvas.width / 2;
   var min_X = -imageContext.canvas.width / 2;
   var max_Y = imageContext.canvas.height / 2;
   var min_Y = -imageContext.canvas.height / 2;
   var x = turtle.pos.x;
   var y = turtle.pos.y;

   // trace out the forward steps
   while (distance > 0) {
      // move the to current location of the turtle
      if (! turtle.shape) {
        imageContext.moveTo(x, y);
      }
      // calculate the new location of the turtle after doing the forward movement
      new_X = x + sinAngle * distance;
      new_Y = y + cosAngle * distance;

      // if wrap is on, trace a part segment of the path and wrap on boundary if necessary
      if (! turtle.shape && turtle.wrap) {
         if (new_X > max_X) {
            xWrap(max_X, min_X);
         }
         else if (new_X < min_X) {
            xWrap(min_X, max_X);
         }
         else if (new_Y > max_Y) {
             yWrap(max_Y, min_Y);
         }
         else if (new_Y < min_Y) {
            yWrap(min_Y, max_Y);
         }
         else {
            noWrap(new_X, new_Y);
         }
      }

      // wrap is not on.
      else {
         noWrap(new_X, new_Y);
      }
   }
   // draw only if the pen is currently down.
   if (! turtle.shape && turtle.penDown) {
      imageContext.stroke();
   }
   imageContext.restore();
   if (! turtle.shape) {
     drawIf();
   }
}

fd = forward;


/*******************************************************************************
 * backward -- move the turtle backward, allowing for possible wrap-around
 *
 * arguments:
 *   distance: number of pixels to move backward
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function backward (distance) {
  right (180);
  forward (distance);
  right (180);
}

bk = backward;
back = backward;


/*******************************************************************************
 * right -- turn the turtle right a number of degrees
 *
 * arguments:
 *   angle: angle in degrees to turn
 *
 * returns: None
 ******************************************************************************/
function right(angle) {
   turtle.angle += degToRad(angle);
   drawIf();
}

turn = right;
rt = right;


/*******************************************************************************
 * left -- turn the turtle left a number of degrees
 *
 * arguments:
 *   angle: angle in degrees to turn
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function left(angle) {
   turtle.angle -= degToRad(angle);
   drawIf();
}

lt = left;




/*******************************************************************************
 * curveleft -- move the turtle forward along a path curving to the left
 *
 * arguments:
 *   radius: radius of the curve
 *   extent: number of degrees in the curve
 *
 * returns: None
 ******************************************************************************/
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


/*******************************************************************************
 * curveright -- move the turtle forward along a path curving to the right
 *
 * arguments:
 *   radius: radius of the curve
 *   extent: number of degrees in the curve
 *
 * returns: None
 ******************************************************************************/
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


/*******************************************************************************
 * circle -- draw a cirle about the current turtle position
 *
 * arguments:
 *   radius:  radius of circle in pixels
 *   extent:  size of arc in degrees (optional, defaults to full circle)
 *   CW:      boolean for direction of arc (optional defaults to true or clockwise)
 *
 * returns: None
 ******************************************************************************/
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


/*******************************************************************************
 * dot -- draw a filled circle at the turtle position
 *
 * arguments:
 *   size:  radius of dot in pixels (optional defaults to max of pensize+4, 2*pensize)
 *
 * returns: None
 ******************************************************************************/
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


/*******************************************************************************
 * penup -- lift the turtle pen up (set marking state to false)
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function penup() {
  turtle.penDown = false;
}

pu = penup;
up = penup;
penUp = penup;


/*******************************************************************************
 * pendown -- drop the turtle pen (set marking state to true)
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function pendown() {
  turtle.penDown = true;
}

pd = pendown;
down = pendown;
penDown = pendown;


/*******************************************************************************
 * hideturtle -- do not draw the turtle
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function hideturtle() {
   turtle.visible = false;
   drawIf();
}

ht = hideturtle;
hideTurtle = hideturtle;


/*******************************************************************************
 * show turtle -- draw the turtle
 *
 * arguments: None
 *
 * returns: None
 ******************************************************************************/
function showturtle() {
   turtle.visible = true;
   drawIf();
}

st = showturtle;
showTurtle = showturtle;


/*******************************************************************************
 * goto -- move the turtle to an x,y position without leaving a mark
 *
 * arguments:
 *   x: x coordinate
 *   y: y coordinate
 *
 * returns: None
 ******************************************************************************/
function goto(x,y) {
   turtle.pos.x = x;
   turtle.pos.y = y;
   drawIf();
}

setposition = goto;
setpos = goto;
setPosition = goto;
setPos = goto;


/*******************************************************************************
 * setx -- change the turtle x-coordinate without leaving a mark
 *
 * arguments:
 *   x: x coordinate
 *
 * returns: None
 ******************************************************************************/
function setx(x) {
   turtle.pos.x = x;
   drawIf();
}

setX = setx;


/*******************************************************************************
 * sety -- change the turtle y-coordinate without leaving a mark
 *
 * arguments:
 *   y: y coordinate
 *
 * returns: None
 ******************************************************************************/
function sety(y) {
   turtle.pos.y = y;
   drawIf();
}

setY = sety;


/*******************************************************************************
 * angle -- set the angle of the turtle in degrees
 *
 * arguments:
 *   angle: (int) angle in degrees clockwise from the top center.
 *
 * returns: None
 ******************************************************************************/
function angle(ang) {
   turtle.angle = degToRad(ang);
   drawIf();
}

setheading = angle;
setHeading = angle;
seth = angle;


/*******************************************************************************
 * background -- set the background color
 *
 * arguments:
 *   styl: fill style (color, gradient, or pattern), defaulting to turtle color
 *
 * returns: None
 ******************************************************************************/

function background(bColor) {
    if (styl == undefined) {
       styl = turtle.color;
    }
    if (typeof(styl) === "number") {
      if (styl < 16) { // assume standard logo turtle color
        styl = logoColors [styl];
      } //else {
        //color is assumed to be a 32-bit color value
      //}
    } else if (typeof(styl) != "string") { // col is not a supported type
      styl = "black";
    }
    imageContext.fillStyle = styl;
    imageContext.fillRect(0, 0, imageCanvas.width, imageCanvas.height);
}


/*******************************************************************************
 * write -- print some text along path of turtle, turtle does not move
 *
 * arguments:
 *   msg: text to be printed
 *
 * returns: None
 ******************************************************************************/
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


/*******************************************************************************
 * random -- generate a random integer between low (or 0 if unspecified) and high
 *
 * arguments:
 *   low: low limit of the random number (0, if only one parameter is used)
 *   high: high limit of the random number
 *
 * returns:
 *   (int) generated random number
 ******************************************************************************/
function random(low, high) {
   if (high == undefined) {
     return Math.floor( (low + 1) * Math.random ());
   } else {
     return Math.floor(Math.random() * (high - low + 1) + low);
   }
}


/*******************************************************************************
 * repeat -- repeat an action n times
 *
 * arguments:
 *   n: number of times to repeat the action
 *   action: a reference to a function
 *
 * returns: None
 ******************************************************************************/
function repeat(n, action) {
   var count = 1;
   for (count = 1; count <= n; count += 1) {
      action();
   }
}


/*******************************************************************************
 * sleep -- just wait in place for a number of milliseconds
 *
 * note:
 *   this is not a very efficient or elegant way of doing this
 *   this does not cause the drawing to be rendered, use delay instead
 *
 * arguments:
 *   ms: number of milliseconds of delay before executing function f
 *
 * returns: None
 ******************************************************************************/
function sleep(ms) {
  var start = new Date().getTime();
  var limit = 1000 * 60 * 1; // set maximum time to 1 minute
  var i = 0;
  for (i = 0; i < limit; i += 1) {
    if ((new Date().getTime() - start) > ms) {
      break;
    }
  }
}

pause = sleep;


///////ATTRIBUTE FUNCTIONS


/*******************************************************************************
 * width -- set the width of the line
 *
 * arguments:
 *   w: (int) width of the line
 *
 * returns: None
 ******************************************************************************/
// set the width of the line
function width(w) {
   turtle.width = w;
   imageContext.lineWidth = w;
}

pensize = width;
penwidth = width;
penSize = width;
penWidth = width;


/*******************************************************************************
 * color -- set the color of the line and fill using turtle graphic and CSS colors
 *
 * arguments:
 *   col: color in one of several formats:
 *     Hexadecimal colors (e.g., "#ff0000", "#f00")
 *     RGB colors (e.g., "rgb(255,0,0)")
 *     RGBA colors (e.g., "rgba(255,0,0,1)")
 *     HSL colors (e.g., "hsl(120, 100%, 50%)")
 *     HSLA colors (e.g., "hsla(120, 100%, 50%, 1)")
 *     Predefined/Cross-browser color names (e.g., "red")
 *     logo color numbers 0 to 15 as index into:*/
logoColors = ["black", "blue", "lime", "cyan", "red", "magenta", "yellow", "white",
              "brown", "tan", "green", "aqua", "salmon", "purple", "orange", "gray"]
/*
 * returns: None
 ******************************************************************************/
function color (col) {
  if (typeof(col) === "number") {
    if (col < 16) { // assume standard logo turtle color
      col = logoColors [col];
    } //else {
      //color is assumed to be a 32-bit color value
    //}
  } else if (typeof(col) != "string") { // col is not a supported type
    col = "black";
  }
  turtle.color = col;
  imageContext.strokeStyle = col;
}

colour = color;


/*******************************************************************************
 * setfont -- set the font used by the write function
 *
 * arguments:
 *   font: string defining the font characteristics (style, variant, weight, size,
 *         and font-family for subsequent writes.
 *         Example: setfont("italic small-caps bold 12px courier")
 *
 * returns: None
 ******************************************************************************/
function setfont(font) {
   imageContext.font = font;
}

setFont = setfont;


/*******************************************************************************
 * maxX -- get the maximum X value
 *
 * arguments: None
 *
 * returns:
 *   (int) the maximum X value for the current canvas
 ******************************************************************************/
function maxX () {
  return (imageContext.canvas.width / 2);
}

maxx = maxX;


/*******************************************************************************
 * minX -- get the minimum X value
 *
 * arguments: None
 *
 * returns:
 *   (int) the minimum X value for the current canvas
 ******************************************************************************/
function minX () {
  return (-imageContext.canvas.width / 2);
}

minx = minX;


/*******************************************************************************
 * maxY -- get the maximum Y value
 *
 * arguments: None
 *
 * returns:
 *   (int) the maximum Y value for the current canvas
 ******************************************************************************/
function maxY () {
  return (imageContext.canvas.height / 2);
}

maxy = maxY;


/*******************************************************************************
 * minY -- get the minimum Y value
 *
 * arguments: None
 *
 * returns:
 *   (int) the minimum Y value for the current canvas
 ******************************************************************************/
function minY () {
  return (-imageContext.canvas.height / 2);
}

miny = minY;



///////ANIMATION SUB-MODULE
//This maybe should be broken out as a separate module sometime

// some globals
var intervals = []; //array of inteval IDs started with the animate function
var timeouts = []; //array of time out IDs started with the delay function


/*******************************************************************************
 * animate -- repeat an action every ms millisecond to animate drawing
 *
 * arguments:
 *   f: a reference to a function
 *   ms: number of milliseconds between execution of function f
 *
 * returns: None
 ******************************************************************************/
function animate(f, ms) {
   intervals.push (setInterval(f, ms));
   document.getElementById("stopButton").hidden=false;
}


/*******************************************************************************
 * delay -- delay an action for ms milliseconds to animate drawing
 *
 * arguments:
 *   f: a reference to a function
 *   ms: number of milliseconds of delay before executing function f
 *
 * returns: None
 ******************************************************************************/
function delay(f, ms) {
   timeouts.push (setTimeout(function () {
     timeouts.pop(); // pop the current timer
     if (timeouts.length == 0) {
       document.getElementById("stopButton").hidden=true;
     }
     f();
   }, ms));
   document.getElementById("stopButton").hidden=false;
}





///////SUPPORT FUNCTIONS


/*******************************************************************************
 * degToRad -- convert angular degress into radians
 *
 * arguments:
 *   deg: (int) number of degrees
 *
 * returns:
 *   (int) number of radians
 ******************************************************************************/
function degToRad(deg) {
   return deg / 180 * Math.PI;
}


/*******************************************************************************
 * radToDeg -- convert radians into angular degrees
 *
 * arguments:
 *   rad: (int) number of radians
 *
 * returns:
 *   (int) number of degrees
 ******************************************************************************/
function radToDeg(rad) {
   return rad * 180 / Math.PI;
}


/*******************************************************************************
 * constrain -- constrain an angle to between high and low limits
 *
 * arguments: None
 *   n: (int or float) number which may be contrained
 *   low: (int or float) lowest possible return value
 *   high: (int or float) highest possible return value
 *
 * returns:
 *   (int or float) constrained value
 ******************************************************************************/
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


reset();
