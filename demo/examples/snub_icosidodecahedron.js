// Snub Icosidodecahedron Half -- half pattern for model of snub icosidodecahedron

/*
Print two copies of this on card stock.
Score the lines to make it easier to fold.
Fold and glue the tabs together, so they
are inside the model. Mind the overlaps (10) and
the inner single tabs (5).

Have fun.
*/

function leftTriangle(side) {
  for (var i=0; i<3; i++) {
    forward (side)
    left(120)
  }
}

function leftTab( side) {
  var x = turtle.pos.x
  var y = turtle.pos.y
  left( 180 - 45)
  forward( side * .2)
  left( 45)
  forward( side * .72)
  left( 45)
  forward( side * .2)
  left( 180 - 45)
  forward( side)
  goto( x, y)
}


function rightTriangle(side, tabs) {
  for (var i=0; i<3; i++) {
    forward (side)
    if (tabs.includes (""+i)) {
      leftTab(side)
    }
    right(120)
  }
}

function leftPentagon(side) {
  for (var i=0; i<5; i++) {
    forward (side)
    left(72)
    if (i  == 0) {
      rightTriangle(side, "1")
    }
    if (i  == 1 || i == 2) {
      rightTriangle(side, "1,2")
    }
    if (i == 3) {
      rightTriangle(side, "1")
      right(60)
      //beginShape()
      rightTriangle(side, "1,2")
      //fillShape("red")
      left(60)
    }
  }
}

function rightPentagon(side) {
  for (var i=0; i<5; i++) {
    left(120)
    forward(side)
    right(120)
    leftPentagon(side) // outer pentagon
    left(120)
    backward (side)
    right(120)
    forward (side)
    left(120)
    rightTriangle(side, "")
    right(120)
    right(72)
    leftTriangle(side)
  }
}


function demo() {
  reset()
  side = .25 * Math.min( maxX(), maxY())
  goto (-.666 * side, - .333 * side)
  rightPentagon(side) // inner pentagon
  hideturtle()
}
