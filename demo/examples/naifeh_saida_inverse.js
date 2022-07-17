// Naifeh Saida Inverse -- draws the inverse of the Steven Naifeh Saida sculpture
// for more information see https://stevennaifeh.com


function antilayer (side, innerSide, offset) {
  left( offset)
  for (var i=0; i<8; i++){
    penup()
    forward( side)
    pendown()
  
    beginShape()
    left(45 + 22.5)
    forward(innerSide)
    left(90)
    forward(innerSide)
    left(180)
    forward(innerSide)
    right(90)
    forward(innerSide)
    left(180-22.5)

    forward (side)
    left(135)
    forward( side)
    left(45)
    fillShape("black")
    penup()
    forward( side)
    pendown()
    left(180)
  }
  right(offset)
}

function demo() {
  reset()
  wrap(false)
  hideTurtle()
  side = .023 * Math.min( maxX(), maxY())

  factor = Math.sqrt( 2+ Math.sqrt(2))
  //side = 10
  outside = factor * side
  antilayer( outside, side, 22.5)
  side = outside
  outside = factor * side
  antilayer( outside, side, 0)
  side = outside
  outside = factor * side
  antilayer( outside, side, 22.5)
  side = outside
  outside = factor * side
  antilayer( outside, side, 0)
  side = outside
  outside = factor * side
  antilayer( outside, side, 22.5)
}
