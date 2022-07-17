// Basket Weave Tessellation -- tile a space using basket weave pattern

// this assumes that the smaller square is 1/2 of the larger square.
// that need not be the case

small = 20
sSide = 2.5 * small
lSide = sSide + 2 * small

function vRect( sSide, lSide, fColor) {
  beginShape()
  for (var i=0; i<2; i++) {
    forward( sSide)
    right(90)
    forward( lSide)
    right(90)
  }
  fillShape( fColor)
  forward( sSide)
}

function hRect( sSide, lSide, fColor) {
  beginShape()
  for (var i=0; i<2; i++) {
    forward( lSide)
    right(90)
    forward( sSide)
    right(90)
  }
  fillShape( fColor)
  forward( lSide)
}

function square ( side, fColor) {
  beginShape()
  for (var i=0; i<4; i++) {
    forward( side)
    right(90)
  }
  fillShape( fColor)
  forward( side)
}


function demo() {
  reset()
  count = 0
  yB = maxY() + small
  xB = minX()
  wrap(false)
  right( 90)

  s = 50
  while( turtle.pos.y > minY()) {
    goto (xB, yB)
    while( turtle.pos.x < maxX()) {
      pendown()
      square(small, "yellow")
      penup()
      forward( sSide)
      pendown()
      square(small, "yellow")
      vRect(sSide, lSide, "lightblue")
    }
    yB = yB - small

    goto (xB, yB)
    while( turtle.pos.x < maxX()) {
      pendown()
      hRect(sSide, lSide, "red")
      penup()
      forward( sSide)
    }
    yB = yB - sSide

    goto (xB, yB)
    while( turtle.pos.x < maxX()) {
      pendown()
      square(small, "yellow")
      vRect(sSide, lSide, "lightblue")
      square(small, "yellow")
      penup()
      forward( sSide)
      pendown()
    }
    yB = yB - small

    goto (xB- lSide +small, yB)
    while( turtle.pos.x < maxX()) {
      pendown()
      hRect(sSide, lSide, "red")
      penup()
      forward(sSide)
    }
    yB = yB - sSide
  }
}
