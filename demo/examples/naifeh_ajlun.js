// Naifah Ajlun -- inspired by the art of Steven Naifeh of the same name
// for more information see https://stevennaifeh.com

// kite has side b and h, square has side s
// b = s + h
// either vary the angle or vary the sides
// try calulating the angle


function quadrangle( ){
  // start at lower left corner of outer square
  beginShape()
  forward(longSide)
  right( 180 - angleA)
  forward (longSide)
  right(90)
  forward( shortSide)
  right(180 - angleC)
  forward(shortSide)
  right(90)
  penup()
  forward( longSide + shortSide)
  right(90)
  pendown()
  fillShape("lightblue")
}

function demo() {
  reset()
  wrap(false)
  rows = 4
  columns = 5

  side = 1.7 * Math.min(maxX()/(columns*3+1), maxY()/(rows*3+1))
console.log ("side:"+side)

  // sides and angles of the quadrangle
  shortSide = side  // matter of convenience, could be something else
  longSide = side*2 // matter of convenience
  angleA = 2* radToDeg(Math.atan(shortSide/longSide))
  angleC = 180 - angleA
  offsetAngle = radToDeg( Math.atan( side/(shortSide + longSide)))

  // center this more or less
  goto(-.5 * columns * (shortSide + longSide) + .4 *side, .5 * (rows-2) * (shortSide + longSide) + .4*side)
  left( offsetAngle)
  for (var k=0; k<rows; k++) {
    for (var j=0; j<columns; j++) { // across row
      for (var i=0; i<4; i++) { // around inner square
        quadrangle()
      }
      penup()
      right(90)
      forward( shortSide + longSide)
      right(90)
      forward( side)
      left(180)
      pendown()
    }
    penup()
    left( 90- offsetAngle)
    forward( columns * (shortSide + longSide)/Math.sin( degToRad( 90-offsetAngle)))
    left( offsetAngle)
    forward( side)
    left(90)
    forward( shortSide + longSide)
    left( 180)
    pendown()
    hideTurtle()
  }
}
