// Triangle Tesselation -- tile a space using triangles

colors = ["red", "white", "blue", "yellow", "green"]

function triUp( side, fColor) {
  beginShape()
  for (var i=0; i<3; i++) {
    forward( side)
    left( 120)
  }
  fillShape( fColor)
}

function triDown( side, fColor) {
  beginShape()
  for (var i=0; i<3; i++) {
    forward( side)
    right( 120)
  }
  fillShape( fColor)
}

// nextColor could be completely random, if desired
function nextColor() { 
  c = colors[ count % colors.length]
  count = count + 1
  return c
}

function demo() {
  reset()
  count = 0
  rowOffset = s/3 // offset between rows
  wrap(false)
  goto (minX(), maxY())
  right( 90)

  s = 50
  while (turtle.pos.y > minY()) {
  while (turtle.pos.x < maxX()) {
    triDown(s, nextColor())
    forward(s)
  }
  right(120)
  forward( s)
  right(60)
  while (turtle.pos.x > minX()) {
    triDown(s, nextColor())
    forward(s)
  }
  left(180)
  forward(rowOffset)
  }
}
