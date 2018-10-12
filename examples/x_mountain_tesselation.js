// mountain tesselation -- tesselation with a mountain shaped heptiamond
// a heptiamond is a shape composed of 7 equalateral triangles
//
//
//// Triangle Tesselation -- tile a space using triangles

colors = ["red", "white", "blue", "yellow", "green"]

function shapeUp (side) {
  // assume pointing in direction of base
  forward(3* side)
  left(120)
  forward(2*side)
  left( 120)
  forward(side)
  right( 120)
  forward( side)
  left( 120)
  forward( 2*side)
  left(120)
}

function mu(side){ // mountain unit
  pendown()
  shapeUp(side)//1,1
  penup()
  left(60)
  forward(side)
  right(60)
  forward(5*side)
  right(180)
  pendown()
  shapeUp(side)//1,0
  penup()

  forward(3*side)
  left(180)
  pendown()
  shapeUp(side) //0,0

  penup()
  left(60)
  forward(2*side)
  left(120)
  pendown()
  shapeUp(side)//0,1
  forward( 3*side)
  left( 180)
  penup()

}

// nextColor could be completely random, if desired
function nextColor() {
  c = colors[ count % color.length]
  count = count + 1
  return c
}

function demo() {
  reset()
  wrap(false)
  side = 20
  xStart = 0
  yStart = -4.5*side
  while (turtle.pos.y < maxY()) {
    goto (maxX()+ xStart, minY()+ yStart)
    while (turtle.pos.x > minX()) {
      mu( side)
    }
    yStart = yStart + 4.5 * side
    xStart = xStart + Math.sqrt(3)/2 * side
  }
}

