// Square Tesselation -- tile a space using squares

colors = ["red", "white", "blue","yellow", "green"]

function squ( side, fColor) {
  beginShape()
  for (var i=0; i<4; i++) {
    forward( side)
    right( 90)
  }
  fillShape( fColor)
}

function squLeft( side, fColor) {
  beginShape()
  for (var i=0; i<4; i++) {
    forward( side)
    left( 90)
  }
  fillShape( fColor)
}

// nextColor could be a random function or use less colors
function nextColor() {
  c = colors[ count % colors.length]
  count = count + 1
  return c
}

function demo() {
  reset()
  count = 0
  rowOffset = s/3
  wrap(false)
  goto (minX(), maxY())
  right( 90)

  s = 50
  while (turtle.pos.y > minY()) {
    while (turtle.pos.x < maxX()) {
      squ(s, nextColor())
      forward(s)
    }
    right(90)
    forward( s)
    right(90)
    backward(rowOffset)
    while (turtle.pos.x > minX()) {
      squLeft(s, nextColor())
      forward(s)
    }
    left(90)
    forward(s)
    left(90)
    forward(rowOffset)
  }
}
