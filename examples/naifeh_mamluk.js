// Naifeh Mamluk -- inspired by the art of Steven Naifeh of same name
// for more information see https://stevennaifeh.com


function decagon(s, fcolor) {
  // position at base of the decagon  parallel to bottom
  // invariant
  // note:
  //   this shape basically replaces a hexagon,
  //   but only with two sides.
  //   the cutouts are for an outscribed rectangle
  //   2*side by sqrt(3)*side

  beginShape()
  forward( s)
  left( 120)
  forward( d1)
  right( 90)
  forward( d2)
  left( 120)
  forward( d2)
  right(90)
  forward(d1)
  left(120)
  forward( s)

  left( 120)
  forward( d1)
  right( 90)
  forward( d2)
  left( 120)
  forward( d2)
  right(90)
  forward(d1)
  left(120)
  fillShape( fcolor)
}

function demo() {
  reset()
  wrap( false)
  right(90)
  side = 40
  side = .25 * Math.min( maxX(), maxY())
  goto (-.5* side, side)

  //derived distances
  d1 = side/2
  d2 = side * Math.sqrt(3)/2

  for( var i=0; i<6; i++) {
    decagon( side, "blue")

    penup()
    left(90)
    forward( Math.sqrt(3) * side)
    left(30)
    pendown()

    decagon( side, "blue")

    penup()
    left(150)
    forward( Math.sqrt(3) * side)
    left( 90)
    pendown()

    forward( side)
    right( 60)
  }
  hideturtle()
}
