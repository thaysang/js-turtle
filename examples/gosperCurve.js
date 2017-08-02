// Gosper curve -- a is a space filling curve named after Bill Gosper
// also known as a flow snake (a Spoonerism on snow flake)
// more information at Wikipedia  https://en.wikipedia.org/wiki/Gosper_curve

// A ↦ A − B − − B + A + + A A + B − 

//*** GLOBALS ***

var gen = 0
var size = 0

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


function A (side, gen) {
  if (gen ===0) {
    forward (side)
  }
  else {
    side = side / Math.sqrt(7)
    A (side, gen-1)
    left (60)
    B (side, gen-1)
    left (120)
    B (side, gen-1)
    right (60)
    A (side, gen-1)
    right (120)
    A (side, gen-1)
    A (side, gen-1)
    right (60)
    B (side, gen-1)
    left (60)
  }
}

// B ↦ + A − B B − − B − A + + A + B 

function B (side, gen) {
  if (gen ===0) {
    forward (side)
  }
  else {
    side = side / Math.sqrt(7)
    right (60)
    A (side, gen-1)
    left (60)
    B (side, gen-1)
    B (side, gen-1)
    left (120)
    B (side, gen-1)
    left (60)
    A (side, gen-1)
    right (120)
    A (side, gen-1)
    right (60)
    B (side, gen-1)
  }
}


function delayDemo () {
  reset()
  goto( size/2, -size/2+60*gen)
  A( size,gen)
  caption ("Gosper Curve generation " + gen)
  if (gen < 4) {
    gen = gen + 1
  } else {
    gen = 0
  }
  delay( delayDemo,3000)
}

function demo () {
  reset()
  size = 350
  goto(size/2,-size/2+60*gen)
  gen = 0
  delayDemo()
}
