// Rhombic Star Tessellation -- a star tessellation using rhombus

colors = ["red", "white", "blue", "yellow", "green"]
numColors = colors.length

function rh(side, fillColor) {
  beginShape()
  forward( side)
  left( 45)
  forward( side)
  left( 180-45)
  forward( side)
  left( 45)
  forward( side)
  left( 180-45)
  fillShape(fillColor)
}

function sideBySide( count, side, fillColor) {
  for( var j=0; j<count; j++) {
    pendown()
    rh( side, fillColor)
    penup()
    right( (180-45)/2)
    forward( 2* side * Math.sin( degToRad( 22.5)))
    left( ( 180-45)/2)
  }
  left( ( 180-45)/2 + 45)
  forward( 2 * count * side * Math.sin( degToRad( 22.5)))
  right( (180-45)/2)
}

function cent(side, count) {
  for( var i=0; i<8; i++) { // draw the center
    rh( side, colors[0%numColors])
    left( 45)
  }

  for( var i=0; i<8; i++) { // draw the second tier
    forward( side)
    rh( side, colors[1%numColors])
    right( 45)
    rh( side, colors[1%numColors])
    left(45)
    backward( side)
    left(45)
  }

  for( var j=2; j<count; j++) { // draw the other tiers
    for( var i=0; i<8; i++) {
      forward( j*side)
      pendown()
      rh( side, colors[j%numColors])
      right( 45)
      sideBySide(j, side, colors[j%numColors])
      backward( j*side)
      left(45)
    }
  }
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
  side = .075 * Math.min(maxX(), maxY())
  cent( side, 12)
  hideturtle()
}
