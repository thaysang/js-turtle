// Hexapentakis Truncated Icosahedron half -- half model for glue up
/*
This draws a model for half a hexapentakis truncated icosahedron
Print two of these on card stock. When cutting out, leave glue tabs
where appropriate, as they are not shown.
More at Wikipedia.com
*/


//Global constants
var  centralPentaAngle = 70.72
var  basePentaAngle = 90 - centralPentaAngle/2
var  centralHexaAngle = 58.58
var  baseHexaAngle = 90 - centralHexaAngle/2


function penta (side, faceColor) {
  //assume pointing in direction of base and center is above
  // move around point CW
  var pentaSide = .8639 * side

  for( i=0; i<5; i++) {
    beginShape()
    forward( side)
    right( 180-basePentaAngle)
    forward( pentaSide)
    right( 180-centralPentaAngle)
    forward( pentaSide)
    right( 180-basePentaAngle)
    fillShape(faceColor)
    forward( side)
    right( 180-(2*basePentaAngle))
  }
}

function hexa (side, faceColor) {
  //assume pointing in direction of base and center is above
  // move around point CW
  var hexaSide = 1.022 * side

  for( var i=0; i<6; i++) {
    beginShape()
    forward( side)
    right( 180-baseHexaAngle)
    forward( hexaSide)
    right( 180-centralHexaAngle)
    forward( hexaSide)
    right( 180-baseHexaAngle)
    fillShape(faceColor)
    forward( side)
    right( 180-(2*baseHexaAngle))
  }
}

px = 0
py = 0
pangle = 0

function savePos () {
  px = turtle.pos.x
  py = turtle.pos.y
  pangle = turtle.angle
}

function restorePos() {
  turtle.pos.x = px
  turtle.pos.y = py
  turtle.angle = pangle
}

p2x = 0
p2y = 0
p2angle = 0

function savePos2 () {
  p2x = turtle.pos.x
  p2y = turtle.pos.y
  p2angle = turtle.angle
}

function restorePos2() {
  turtle.pos.x = p2x
  turtle.pos.y = p2y
  turtle.angle = p2angle
}

function demo() {
  reset()
  hideturtle()
  side = .23 * Math.min(maxX(), maxY())
  goto (-.6* side, -.5* side)
  right(18)
  penta (side, "green")
  right( (2*basePentaAngle))
  for (var i=0; i<5; i++) {
    savePos()
    // start with the base opposite of where you are now
    right(2*baseHexaAngle)
    forward(side)
    left(180-2*baseHexaAngle)
    forward(side)
    left(180-2*baseHexaAngle)
    forward(side)
    right(180)

    // draw another hexa out from where the first will be
    savePos2()
    forward(side)
    left(180-2*baseHexaAngle)
    forward(side)
    left(180-2*baseHexaAngle)
    forward(side)
    left(180-2*baseHexaAngle)
    forward(side)
    right(180)
    hexa (side, "red")

    restorePos2()

    // draw a penta on the free face one away
    forward( side)
    right( 180-2*baseHexaAngle)
    forward( side)
    left( 180-2*basePentaAngle)
    forward(side)
    left( 180-2*basePentaAngle)
    forward(side)
    left( 180)
    penta(side, "green")
    restorePos2()

    hexa (side, "blue")
    restorePos()
    forward( side)
    left(180-(2*basePentaAngle))
  }
}
