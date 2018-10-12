// Herring Bone Tesselation -- tile a space using a herring bone brick laying pattern

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
  yB = maxY() + sSide
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
      vRect(sSide, lSide, "darkred")
      penup()
      forward( sSide)
    }
    yB = yB - sSide

    goto (xB - lSide/2, yB)
    while( turtle.pos.x < maxX()) {
      pendown()
      hRect(sSide, lSide, "darkred")
      vRect(sSide, lSide, "darkred")
      penup()
      forward( sSide)
    }
    yB = yB - sSide

    goto (xB - lSide, yB)
    while( turtle.pos.x < maxX()) {
      pendown()
      hRect(sSide, lSide, "darkred")
      vRect(sSide, lSide, "darkred")
      penup()
      forward( sSide)
    }
    yB = yB - sSide

    goto (xB - 3/2 * lSide, yB)
    while( turtle.pos.x < maxX()) {
      pendown()
      hRect(sSide, lSide, "darkred")
      vRect(sSide, lSide, "darkred")
      penup()
      forward( sSide)
    }
    yB = yB - sSide
  }
}
