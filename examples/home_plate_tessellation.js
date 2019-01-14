// Home Plate Tessellation -- tile a space using simple pentagon
//
// this pattern could be the same as a hexagonal pattern with the hexagons
// split into two halves
//
// For more pentagonal tessellations see wikipedia

colors = ["red", "white", "blue", "yellow", "green"]

function pentUp( side, fColor) {
  beginShape()
  forward( side)
  left( 90)
  forward( side/2)
  left( 45)
  forward( side * .5 * Math.sqrt(2))
  left( 90)
  forward( side * .5 * Math.sqrt(2))
  left( 45)
  forward( side/2)
  left(90)
  fillShape( fColor)
}


function pentDown( side, fColor) {
  beginShape()
  forward( side)
  right( 90)
  forward( side/2)
  right( 45)
  forward( side * .5 * Math.sqrt(2))
  right( 90)
  forward( side * .5 * Math.sqrt(2))
  right( 45)
  forward( side/2)
  right(90)
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
  s = 50
  rowOffset = s/3 // offset between rows
  wrap(false)
  goto (minX(), maxY())
  right( 90)

  s = 50
  while (turtle.pos.y > minY()) {
  while (turtle.pos.x < maxX()) {
    pentDown(s, nextColor())
    forward(s)
  }
  right(90)
  forward( 3/2*s)
  right(90)
  backward(s/2)
  while (turtle.pos.x > minX()) {
    pentDown(s, nextColor())
    forward(s)
  }
  left(180)
  }
}
