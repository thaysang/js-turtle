// Hilbert Curve -- draw a space filling fractal curve described by David Hilbert
// more information at Wikipedia  https://en.wikipedia.org/wiki/Hilbert_curve

// A → − B F + A F A + F B −


//*** GLOBALS ***
var gen = 0


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
  setfont("bold 12pt Ariel,sans-serif")
  write( message)

  //go back from whence you came
  goto( savedX, savedY)
  setheading( savedHeading)
  color ( savedColor)
  width (savedWidth)
}


function A (side,gen) {
  if (gen === 0) {
    left (90)
    forward (side)
    right (90)
    forward (side)
    right (90)
    forward (side)
    left (90)
  }
  else {
    left (90)
    B (side, gen-1)
    forward (side)
    right (90)
    A (side, gen-1)
    forward (side)
    A (side, gen-1)
    right (90)
    forward (side)
    B (side, gen-1)
    left (90)
  }
}
//  B → + A F − B F B − F A +
//Here, "F" means "draw forward", "−" means "turn left 90°", "+" means "turn right 90°" (see turtle graphics), and "A" and "B" are ignored during drawing.

function B (side,gen) {
  if (gen === 0) {
    right (90)
    forward (side)
    left (90)
    forward (side)
    left (90)
    forward (side)
    right (90)
  }
  else {
    right (90)
    A (side, gen-1)
    forward (side)
    left (90)
    B (side, gen-1)
    forward (side)
    B (side, gen-1)
    left (90)
    forward (side)
    A (side, gen-1)
    right (90)
  }
}


function delayedHilbert () {
  reset()
  wrap(false)

  // targeting 80% of window
  size = .80 * Math.min( maxX(),maxY())*2
  var side = 10

  /*overall side seems to be: gen 0: 1
    gen 1: 3 (2*gen 0 + 1)
    gen 2: 7 (2*gen 1 + 1)
    gen 3: 15(2*gen 2 +1)
   */  var overallSides = 1
  for (i=1; i<=gen; i++)
    overallSides = 2*overallSides + 1
  side = size/overallSides
  goto( overallSides/2*side,-overallSides/2*side)
  A (side, gen)
  caption( "Hilbert curve, generation " + gen)

  if (gen < 5) {
    gen = gen + 1
  } else {
    gen = 0
  }
  delay( delayedHilbert, 3000)
}


function demo () {
  gen = 0
  delayedHilbert()
}
