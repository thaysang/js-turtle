// Naifeh Petra -- inspired by the art of Steven Naifeh of the same name
// for more information see https://stevennaifeh.com

/* want to do this in a rasterized way
row of backslashs
row of dashs
row of slashes

This does not support using a wider pen width.
*/

function backslash (fColor) {
  // assume pointing up at upper left corner
  // invariant
  beginShape()
  right( 150)
  forward( 2*size)
  left( 120)
  forward( size)
  left( 60)
  forward( 2* size)
  left( 120)
  forward( size)
  right( 150)
  fillShape(fColor)
}

function slash (fColor) {
  // assume pointing up at upper left corner
  // invariant
  beginShape()
  left( 150)
  forward( 2*size)
  left( 120)
  forward( size)
  left( 60)
  forward( 2* size)
  left( 120)
  forward( size)
  right( 90)
  fillShape(fColor)
}

function dash () {
  // assume pointing up at upper left corner
  // invariant
  beginShape()
  right( 150)
  forward( size)
  left( 60)
  forward( 2*size)
  left( 120)
  forward( size)
  left( 60)
  forward( 2*size)
  right( 90)
  fillShape(fColor)
}

function dashBackslashes(count, mode, fColor) {
  // assume pointing up at upper left corner
  // mode = 0 normal; mode =1 skip first
  // invariant
  backup = 0
  for (var i=0; i<count; i++) {
    pendown()
    if (i % 2 == 0) {
      if (mode == 0 || i != 0){
        dash()
      }
      penup()
      right(90)
      forward( 2*size)
      left(90)
      pendown()
      backup = backup + 2
    } else {
      backslash(fColor)
      penup()
      right(90)
      forward( size)
      left(90)
      pendown()
      backup = backup + 1
    }
  }
  penup()
  left(90)
  forward(backup * size)
  right(90)
  pendown()
}


function slashes(count, fColor) {
  // assume pointing up at upper left corner
  // invariant
  for (var i=0; i<count; i++) {
    slash( fColor)
    penup()
    right(90)
    forward( 3*size)
    left(90)
    pendown()
  }
  penup()
  left(90)
  forward(count * 3 * size)
  right(90)
  pendown()
  penup()
}


function demo() {
  reset()
  fColor = "blue"
  size = .17 * Math.min( maxX(), maxY())
  color("white")
  //penwidth(.1* size)

  //center canvas more or less
  pointUp = false
  if (pointUp) {
    angle(90)
    goto (4*size, 3.5*size)
  } else {
    angle(-60)
    goto (-5.5*size, -1*size)
  }
  hideTurtle()

  dashBackslashes(4, 0, fColor)

  right(150)
  forward( size)
  left(150)
  slashes( 3, fColor)

  left(150)
  forward(2*size)
  right(60)
  forward(size)
  right(90)
  dashBackslashes(6, 0, fColor)

  right(150)
  forward(size)
  left(150)
  slashes(4, fColor)

  left(150)
  forward(2*size)
  right(60)
  forward(size)
  right(90)
  dashBackslashes(7, 1, fColor)

  penup()
  right(90)
  forward(3*size)
  right( 60)
  forward( size)
  left(150)
  pendown()
  slashes(3, fColor)
  
  left(150)
  forward(2*size)
  right(60)
  forward(size)
  right(90)
  dashBackslashes(5, 1, fColor)
}
