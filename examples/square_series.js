// Square Series -- draw a set of overlapping squares

// lower right is not quite right, it gets left out.

function paddle (side) {
  side2 = side + side
  forward( side2)
  right( 90)
  forward( side)
  left( 90)
  forward( side2)
  left( 90)
  forward( side2)
  left( 90)
  forward( side2)
  left( 90)
  forward( side)
  penup()
  right( 90)
  forward( side2)
  right( 180)
  pendown()
}


function cwGroup( side) {
  for( var i=0; i<4; i++) {
    paddle( side)
    penup()
    forward( side)
    right( 90)
    pendown()
  }
}


function ccwGroup( side) {
  for( var i=0; i<4; i++) {
    paddle( side)
    penup()
    forward( side)
    left( 90)
    pendown()
  }
}


function cwRow( side) {
  for (var i=minX(); i<maxX(); i = i + 6*side) {
    setx(i)
    cwGroup( side)
  }
}


function ccwRow( side) {
  for (var i=minX() + 4*side; i<maxX(); i = i + 6*side) {
                     // offset row 3 sides + 1 for cw/ccw flip
    setx(i)
    ccwGroup( side)
  }
}


function demo() {
  wrap(false)
  side = 30
  for (var i=minY(); i<maxY(); i = i + 6*side) {
    sety(i)
    cwRow( side)
    sety(i + 3*side)
    color("red")
    ccwRow( side)
    color("black")
  }
}
