// Naifeh Saida -- inspired by the art of Steven Naifeh with the same name
// for more information see https://stevennaifeh.com


function square (side) {
  beginShape()
  for (var i=0; i<4; i++){
    forward(side)
    right(90)
  }
  fillShape("blue")
}


function layer (side, offsetAngle) {
  left( offsetAngle)
  for (var i=0; i<8; i++){
    penup()
    forward( side)
    left(45)
    pendown()
    square(side)
    penup()
    right(45)
    backward( side)
    right(45)
  }
  right(offsetAngle)
}


function demo() {
  reset()
  wrap(false)
  side = 14
  side = .033 * Math.min( maxX(), maxY())
  factor = Math.sqrt(2 + Math.sqrt( 2))
  //    side, radius, offsetAngle
  layer(      side, 0)
  side = side * factor
  layer( side, 22.5)
  side = side * factor
  layer( side, 0)
  side = side * factor
  layer( side,   22.5)
  side = side * factor
  layer( side,   0)
  hideTurtle()
}
