// Dragon Curve -- draw a fractal curve formed by folding a shape onto itself
//  more infomration at wikipedia  https://en.wikipedia.org/wiki/Dragon_curve


//*** GLOBALS ***
var gen = 0
var side


//*** CONSTANTS ***

var root2 = Math.sqrt(2)
//  X ↦ X+YF+
//  Y ↦ −FX−Y.
// angle is 90
// start is order * 45°


//*** FUNCTIONS ***

function caption (message) {
  // save your current position, heading, etc.
  var savedX = turtle.pos.x
  var savedY = turtle.pos.y
  var savedHeading = turtle.angle / 2 / Math.PI * 360 //convert radians to degrees
  var savedColor = turtle.color
  var savedWidth = turtle.width

  goto (minX()+10, minY()+10)
  setheading( 90)

  // erase what will be in the path
  color ("white")
  width (10)
  forward (maxY() * 2 - 12)
  goto (minX()+10, minY()+5)
  color ("black")

  setfont( "bold 12px Helvitica,sans-serif")
  write( message)

  //go back from whence you came
  goto( savedX, savedY)
  setheading( savedHeading)
  color ( savedColor)
  width (savedWidth)
}

function X (side, gen) {
  if (gen <= 0) {
     forward (side)
  }
  else {
    X(side/root2, gen-1)
    left (90)
    Y(side/root2, gen-1)
    //forward(side/2)
    left (90)
  }
}

function Y (side, gen) {
  if (gen <= 0) {
    forward (side)
  }
  else {
    right (90)
    //forward (side/root2)
    X (side/root2, gen-1)
    right (90)
    Y (side/root2, gen-1)
  }
}


function delayedDragon () {
  reset()
  hideTurtle()
  goto (-side * .4, +side *.2)
  setheading (90+ gen * 45)
  pendown()
  X (side, gen)
  caption( "Dragon curve, generation " + gen)

  if (gen < 13) {
    gen = gen + 1
  } else {
    gen = 0
  }
  delay( delayedDragon, 3000)
}  
    

function demo() {
  side = .9 * Math.min(maxX(), 2*maxY())
  gen = 0
  delayedDragon()
}  
