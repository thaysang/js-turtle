// Conway Fractal -- Conway\'s pinwheel tessellation as a fractal
// the British mathematician John Conway devised a tesselation using triagles
// that has no periodicity called the pinwheel tesselation.  This is a fractal
// form of that tessellation.

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

var level = 0
var targetLevel = 5
var side = .80 * Math.min( maxY()*2, maxX()) // base of big triangle
var mainColor = "tan"
var subColor = "wheat"
var dividerColor = "black"
var stepsize = 1.5       //spacing between shading lines
var specialTriangle = 0  // triangle number selected for highlighting (1-5, 0 for none)


//*** CONSTANTS ***

var targetLevel = 4
var root5 = Math.sqrt(5)
var anglea = Math.asin( 1 / root5) * 360 / 2 / Math.PI
var angleb = Math.asin( 2 / root5) * 360 / 2 / Math.PI
var CCW = false
var CW = true


//*** FUNCTIONS ***

function dturn( dir, degrees) {
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
    //if (triangle == 3) {
//    if (triangle == specialTriangle) {
//      shadeTriangle (dir, side, stepsize)
//    }
  }
}

function recursiveDivideBlocks( dir, side, level, triangle, background, highlight) {
  //console.log( "rDB: " + level + " " + triangle + " " + background + " " + highlight)
  if (level > 0) {
    side = side/root5
    var x = turtle.pos.x
    var y = turtle.pos.y

    //move to point A
    penup()
    dturn( dir, angleb)
    forward (2 * side)

    //sub triangle 1
    right (180)
    pendown()
    recursiveDivideBlocks( !dir, side, level-1, 1, background, highlight)
    penup()
    right (180)

    //move to pint B
    dturn( !dir, 180-angleb)
    forward (root5*side)
    
    //move to point C
    dturn( dir, 180-angleb)
    forward(side)

    //sub triangle 4
    dturn( dir, 90)
    pendown()
    recursiveDivideBlocks( dir, side, level-1, 4, background, highlight)
    penup()

    //sub triangle 5
    right( 180)
    pendown()
    recursiveDivideBlocks( !dir, side, level-1, 5, background, highlight)
    penup()

    //retreat to point B
    dturn( dir, 90)
    backward(side)

    //move to point B
    dturn( dir, 90)
    forward( 2*side)

//sub triangle 2
    right( 180)
    pendown()
    recursiveDivideBlocks( !dir, side, level-1, 2, background, highlight)

    //sub triangle 3
    recursiveDivideBlocks( dir, side, level-1, 3, highlight, highlight)
    penup()

    //move to origin
    dturn( !dir, 90)
    forward (side)

    dturn( dir, 180-angleb)
    goto (x,y) //cancel cumulative error
  } else {
    if (triangle == 3) {
    //if (triangle == specialTriangle) {
      color( highlight)
      console.log("shading " + highlight)
      shadeTriangle (dir, side, stepsize)
    } else {
      color( background)
      shadeTriangle (dir, side, stepsize)
    }
  }
}


function delayedDivide() {
  level = level + 1
  if (level <= targetLevel) {
    recursiveDivideBlocks( CCW, side, level, 0, mainColor, subColor)
    color(dividerColor)
    recursiveDivide( CCW, side, level, 0)
    drawTriangle( CCW, side)
    caption( "Fractal divide, generation " + level)
    delay( delayedDivide, 3000)
  }
}


//*** MAIN ***

function demo() {
  // initialize
  reset()
  wrap(false)
  hideTurtle()
  penup()
  backward (side/4)
  right(90)
  backward (side)

  // label the sides of the triangle
  setfont("bold 14px sans-serif")
  left( anglea)
  forward( side+50)
  right( anglea)
  write( "√5")
  left( anglea)
  backward( side+50)
  right( anglea)
  right( 90)
  forward (20)
  left( 90)
  forward( side)
  write (2)
  backward( side+20)
  left( 90)
  forward( side/2 + 20)
  right( 90)
  write( 1)
  forward( 20)
  right(90)
  forward (side/2)
  left(90)

  pendown()
  drawTriangle( CCW, side)

  level = 0

  delay( delayedDivide, 3000)
}
