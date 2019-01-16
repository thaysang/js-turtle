// Naifeh Mizen Six -- inspired by the art of Steven Naifeh of the same name
// for more information see https://stevennaifeh.com

function v (side, fColor) {
  // assume pointing up at upper left corner
  // invariant
  if (fColor != "") {
    beginShape()
  }
  left( 30)
  forward( 3*side)
  right( 120)
  forward( side)
  right(60)
  forward(side)
  left( 120)
  forward( side)
  right(60)
  forward( side)
  right( 120)
  forward( 3*side)
  right(150)
  if (fColor != "") {
    fillShape(fColor)
  }
}


function mizen( side, lColor, fColor) {
  // assume pointing up at upper left corner
  // ends up rotated 120 CW at same point
  color(lColor)
  right(120)
  for (var i=0; i<6; i++) {
    v( side, fColor)
    penup()
    right(30)
    forward( side)
    left( 60)
    forward( 2*side)
    left(30)
    pendown()
    v( side, fColor)

    penup()
    right(30)
    forward( 2*side)
    right( 150)
    pendown()
    v( side, fColor)

    penup()
    right(30)
    forward( side)
    right(120)
    forward( 4*side)
    right(150)
    pendown()
  }
}



function demo() {
  reset()
  //center canvas more or less
  side = 10 // 1/2 basic face of hexagon, width...
  side = .08 * Math.min( maxX(), maxY())
  penup()
  goto (-8*side, 9*side)
  //angle(120)
  for (var j=0; j<6; j++) {
    mx = turtle.pos.x
    my = turtle.pos.y
    ma = turtle.angle
    width(0)
    mizen( side, "white", "blue")

    // do it again for the border lines
    goto( mx, my)
    angle( radToDeg( ma))
    width(.1 * side)
    mizen( side, "white", "")

    penup()
    left(30)
    forward (13 * side)
    left(120)
    forward( 3*side)
    right(90)
    pendown()
  }
  //hideturtle()
}
