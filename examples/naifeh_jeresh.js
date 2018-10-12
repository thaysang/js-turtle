// Naifah Jeresh -- inspired by the art of Steven Naifeh of the same name
// for more information see https://stevennaifeh.com

// this figure has some issues. To get the line weights to change
// you must stroke the entire figure after it is filled.


// GLOBALS
// 
var sColor = "black"  // stroke color
var sWidth = 3        // stroke width
var fColor = "white"  // fill color
var bColor = "green"  // background color

// FUNCTIONS
//
function tri( side, pointAngle, fill) {
  if (fill) {
    beginShape()
  }
  for (var i=0; i<3; i++) {
    forward( side)
    left(60 - pointAngle)
    forward( side)
    right( 180 - pointAngle)
  }
  if (fill) {
    fillShape(fColor)
  }
}


function jeresh (sid, pAngle, fill) {
  for (var i=0;i<6;i++) {
    pendown()
    tri( sid, pAngle, fill)

    var tx = turtle.pos.x
    var ty = turtle.pos.y
    var tHeading = turtle.angle
    penup()
    forward( sid)
    left( 60 - pAngle)
    forward( sid)
    right( 180 - pAngle)
    forward( sid)
    left( 60)

    for (var j=0; j<3; j++) {
      pendown()
      tri(sid, pAngle, fill)
      penup()
      forward(sid)
      left(60)
    }
    goto(tx,ty)

    turtle.angle=tHeading
    penup()
    forward( sid)
    left(60)
  }
}


function demo() {
  /* can vary point angle.
  0 and 120 is a hex tesselation
  60 and 180 are triangles
  90
  negative numbers have overlap, so
  something is not quite right
  */
  reset()
  penup()
  var pointAngle = 30
  var side = 60
  side = .2* Math.min( maxX(), maxY())
  //center a bit
  goto (side, -.3 * side)

  background(bColor)
  color( sColor)
  width( 1)
  jeresh( side, pointAngle, true)
  width( 3)
  jeresh( side, pointAngle, false)

  hideTurtle()
}
