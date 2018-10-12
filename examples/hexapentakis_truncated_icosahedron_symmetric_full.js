// Hexapentakis-Truncated-Icosahedron Symmetric full -- full model for glue up
/*
this draws a modle for full hexapentakis truncated icosahedron
Print this on card stock. When cutting out leave glue tabs where appropriate,
as they are not shown.
more at Wikipedia.com
*/

//Global constants
var centralPentaAngle = 70.72
var basePentaAngle = 90 - centralPentaAngle/2
var centralHexaAngle = 58.58
var baseHexaAngle = 90 - centralHexaAngle/2
var baseAngle = 90 - centralPentaAngle/2


function penta (side, faceColor) {
  //assume pointing in direction of base and center is above
  // move around point CW
  var pentaSide = .8639 * side

  for( i=0; i<5; i++) {
    beginShape()
    forward( side)
    right( 180-baseAngle)
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

p3x = 0
p3y = 0
p3angle = 0

function savePos3 () {
  p3x = turtle.pos.x
  p3y = turtle.pos.y
  p3angle = turtle.angle
}

function restorePos3() {
  turtle.pos.x = p3x
  turtle.pos.y = p3y
  turtle.angle = p3angle
}

p4x = 0
p4y = 0
p4angle = 0

function savePos4 () {
  p4x = turtle.pos.x
  p4y = turtle.pos.y
  p4angle = turtle.angle
}

function restorePos4() {
  turtle.pos.x = p4x
  turtle.pos.y = p4y
  turtle.angle = p4angle
}

function demo() {
  reset()
  side = .13* Math.min(maxX(), maxY())
  goto (0,0)
  right(80)
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
    savePos3()
    hexa (side, "red")
    restorePos3()

    //draw a penta outside of the last hexa
    forward(side)
    left( 180-2*basePentaAngle)
    forward(side)
    left( 180-2*basePentaAngle)
    forward(side)
    left( 180)
    savePos4()
    penta( side, "green")

    // draw a hexa touching last penta

    restorePos3()
    forward( side)
    left(180-2*basePentaAngle-2*baseHexaAngle)
    forward( side)
    left( 180-2*baseHexaAngle)
    forward( side)
    left( 180-2*baseHexaAngle)
    forward( side)
    left( 180)
    hexa( side, "yellow")

    restorePos4()
    forward( side)
    left( 180 - 2* baseHexaAngle)
    forward( side)
    left( 180 - 2*baseHexaAngle)
    forward( side)
    right( 180)
    savePos4()
    hexa( side, "lightblue")
   

    // draw a penta to oppose first
    //restorePos4()
    if (i == 0) {
      left(-2*baseHexaAngle)
      forward( side)
      left( 180-2*baseHexaAngle)
      //forward( side)
      //right( 180-2*baseHexaAngle)
      //forward(side)
      penta(side, "green")
    }


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
