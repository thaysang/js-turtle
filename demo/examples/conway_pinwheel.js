// Conway Pinwheel -- Conway\'s pinwheel tessellation
// the British mathematician John Conway devised a tesselation using triagles
// that has no periodicity called the pinwheel tesselation.

/*
from a point can:
 - draw a triangle X
 - draw a triangle and 4 siblings as a newer larger triangle
 - divide a triangle into 5 offspring triangles

Recursion for:
  expanding a set of triangles from a point
  dividing a set of triangles from a point.

need routines for
  recursive expansion
  - expand, move to new base, change size
  move to 5 base points dividing a triangle
  move to 5 base points expanding a triangle
  conditionally draw triangle or subdivide

  * optionally have a delay for animation

  * options to grid certain triangles (all, none, prime, non-prime)

  * option to change width of triangle outline (level, triangle)
*/


//*** GLOBALS ***

var levels = 4
var targetSide = .80 * Math.min( maxY()*2, maxX()) // base of big encompassing triangle
var delayedSide = 0		// current side being worked

var mainColor = "tan"
var subColor = "wheat"
var dividerColor = "black"
var stepsize = 1.5       //spacing between shading lines
var specialTriangle = 0  // triangle number selected for highlighting (1-5, 0 for none)


//*** CONSTANTS ***

var root5 = Math.sqrt(5)
var anglea = Math.asin( 1 / root5) * 360 / 2 / Math.PI
var angleb = Math.asin( 2 / root5) * 360 / 2 / Math.PI
var CCW = false
var CW = true


//*** FUNCTIONS ***

function dturn( dir, degrees) { // allows turning based on triangle type
  if (dir) {
    right( degrees)
  } else {
    left ( degrees)
  }
}


function drawTriangle (dir, side) {
  forward (2*side)
  dturn(dir, 180-anglea)
  forward (root5*side)
  dturn (dir, 180-angleb)
  forward (side)
  dturn (dir, 90)
}


function caption (message) {
  // save your current position, heading, etc.
  var savedX = turtle.pos.x
  var savedY = turtle.pos.y
  var savedHeading = turtle.angle / 2 / Math.PI * 360 //convert radians to degrees
  var savedColor = turtle.color
  var savedWidth = turtle.width

  goto (minX()+10, minY()+10)
  setheading( 90)

  // erase wha will be in the path
  color ("white")
  width (10)
  forward (maxY() * 2 - 12)
  goto (minX()+10, minY()+5)
  color ("black")
  write( message)

  //go back from whence you came
  goto( savedX, savedY)
  setheading( savedHeading)
  color ( savedColor)
  width (savedWidth)
}



function shadeTriangle( dir, side, stepsize) {
  console.log( "sT: " + dir + " " + side + " " + stepsize)
  var x = turtle.pos.x
  var y = turtle.pos.y
  var steps = Math.floor( side/stepsize)

  for (var i=0; i< steps; i++) {
     forward( 2*side * (steps-i)/steps)
     backward( 2*side * (steps-i)/steps)
     penup()
     dturn( dir, 90)
     forward( stepsize)
     dturn( !dir, 90)
     pendown()
  }
  //return to start
  penup()
  dturn( !dir, 90)
  forward( side)
  dturn( dir, 90)
  //goto(x,y) // cancel cumulative error
  pendown()
}


function recursiveDivide( dir, side, level, triangle) {
  //console.log("rD: " + level + " " + triangle)
  if (level > 0) {
    side = 0. + side/root5
    var x = turtle.pos.x
    var y = turtle.pos.y
    
    //draw the first line to point A
    dturn( dir, angleb)
    pendown()
    forward (2*side)

    //sub triangle 1
    right (180)
    recursiveDivide( !dir, side, level-1, 1)
    right (180)

    //draw the second line to point B
    dturn( !dir, 180-angleb)
    pendown()
    forward (root5*side)
    
    //draw third line to point C
    dturn( dir, 180-angleb)
    forward(side)
    penup()

i    //sub triangle 4
    dturn( dir, 90)
    recursiveDivide( dir, side, level-1, 4)

    //sub triangle 5
    right( 180)
    recursiveDivide( !dir, side, level-1, 5)
    dturn( dir, 90)
    
    //retreat to point B
    backward(side)
    dturn( dir, 90)
    
    //draw fourth line to point D
    pendown()
    forward( 2*side)
    penup()

    //sub triangle 2
    right( 180)
    recursiveDivide( !dir, side, level-1, 2)

    //sub triangle 3
    recursiveDivide( dir, side, level-1, 3)
    
    //retreat to origin
    dturn( !dir, 90)
    penup()
    forward( side)
    pendown()
    dturn( dir, 180-angleb)
    //goto (x,y) //cancel cumulative error
//  } else {
//    if (triangle == 3) {
//    if (triangle == specialTriangle) {
//      shadeTriangle (dir, side, stepsize)
//    }
  }
}


function moveToExpandOrigin (side) {
  penup()
  right( 90)
  forward( side)
  left( 180 - angleb)
  pendown()
}


function startDelayedDivide() {
  // move to the origin of the big triangle
  reset()
  color(mainColor)
  penup()

  side = targetSide
  backward (side/2)
  right(90)
  backward (side)
  pendown()

  iterations = 4
  level = 0

  pendown()
  color("black")
  delayedDivide()
}


function delayedDivide() {
  //console.log ("dD: "+ side + " " + level)
  recursiveDivide( CCW, side, level, 0)
  drawTriangle( CCW, side)
  caption( "Division, generation " + level)
  level = level + 1
  if (level <= iterations) {
    delay( delayedDivide,1000)
  } else {
    delay( startDelayedExpansion, 3000)
  }
}

function startDelayedExpansion() {
  //move to the origin of the big triangle
  reset ()
  wrap( false)
  color(mainColor)
  penup()

  var tempSide = targetSide
  backward (side/2)
  right(90)
  backward (side)

  iterations = 4
  depth = 0
  dir = CCW

  // move the starting point so that it ends where it starts
  for (var i=0; i<iterations; i++) {
    tempSide = tempSide/root5
  }
  delayedSide = tempSide
  for (var i=0; i<iterations; i++) {
    tempSide = tempSide * root5
  }
  for (var i=0; i<iterations; i++) {
    pendown()
    drawTriangle( dir, tempSide)
    penup()
    dturn( dir, angleb)
    forward( tempSide/root5)
    dturn( !dir, 90)
    tempSide = tempSide / root5
    drawTriangle( tempSide) // really just for reference
    console.log(i)
  }

  pendown()
  color ("blue")
  shadeTriangle( CCW, tempSide, stepsize)
  color("black")
  delay( delayedExpansion,1000)
}

function delayedExpansion() {
  /* on entry
    delayedSide is the size of the base triangle.
    depth is how many generations to do.
  */

  moveToExpandOrigin( delayedSide)
  delayedSide = delayedSide * root5
  //console.log( "dE: " + depth + " " + iterations + " " + delayedSide)
  recursiveDivide( CCW, delayedSide, depth+1, 0)
  drawTriangle( CCW, delayedSide)
  caption( "Expansion, generation " + (depth+1))

  depth = depth + 1
  if (depth < iterations) {
    delay( delayedExpansion,1000)
  } else {
    delayedSide = targetSide
    delay( startDelayedDivide, 3000)
  }
}


//***MAIN***

console.log ("Starting")
stepsize = 1.5
iterations = 4
iterations = 2
level = 1
depth = 0
CCW = false // triangle is to the left side of the right angle ( height, hypotenuse, base)
CW = true // triangle is to the right side of the right angle( height, hypotenuse, base)
mainColor = "tan"
subColor = "wheat"
specialTriangle = 0


function demo() {
  /* want demo to show a mix of divide and expand with animation

basically:
  starts up with a delayed division set up
  when that is over
  continue with a delayed expansion
*/
  reset()
  hideTurtle()
  side = targetSide
  wrap(false)
  color(mainColor)
  penup()
  backward (side/2)
  right(90)
  backward (side)
  pendown()

  startDelayedExpansion()
}
