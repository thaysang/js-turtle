// Brick Tessellation -- tile a space using a basic brick laying pattern

sSide = 15
lSide = 2* sSide 

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

function demo() {
  reset()
  count = 0
  yB = maxY()
  xB = minX()
  wrap(false)
  right( 90)
  color("white")

  s = 50
  while( turtle.pos.y > minY()) {
    goto (xB, yB)
    while( turtle.pos.x < maxX()) {
      pendown()
      hRect(sSide, lSide, "darkred")
      penup()
    }
    yB = yB - sSide

    goto (xB - lSide/2, yB)
    while( turtle.pos.x < maxX()) {
      pendown()
      hRect(sSide, lSide, "darkred")
      penup()
    }
    yB = yB - sSide
  }
}
