// Naifeh Mizen Simple -- inspired by the are of Steven Naifeh of the same name
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


function mizenSimple() {
  bColor = "red"
  lColor = "white"
  background ("tan")

  //center canvas more or less
  goto(-5*side, 3.5*side)
  width (1)
  angle(0)
  mizen( side, "black", "red")

  // do again to make lines stand out
  goto(-5*side, 3.5*side)
  width (3)
  angle(0)
  mizen( side, "white", "")
}

function demo() {
  reset()
  wrap(false)
  side = 40 // 1/2 basic face of hexagon, width...
  side = .15 * Math.min( maxX(), maxY())
  mizenSimple()
  hideturtle()
}
