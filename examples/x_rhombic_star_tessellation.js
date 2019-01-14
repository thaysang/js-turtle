// Rhombic Star Tessellation -- a star tessellation using rhombus

colors = ["red", "white", "blue", "yellow", "green"]

function rh(side) {
  forward( side)
  left( 45)
  forward( side)
  left( 180-45)
  forward( side)
  left( 45)
  forward( side)
  left( 180-45)
}

function sideBySide( count, side) {
  for( var j=0; j<count; j++) {
    pendown()
    rh( side)
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
    rh( side)
    left( 45)
  }

  for( var i=0; i<8; i++) { // draw the second tier
    forward( side)
    rh( side)
    right( 45)
    rh( side)
    left(45)
    backward( side)
    left(45)
  }

  for( var j=2; j<count; j++) { // draw the other tiers
    for( var i=0; i<8; i++) {
      forward( j*side)
      pendown()
      rh( side)
      right( 45)
      sideBySide(j, side)
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
  cent( 20, 12)
}
