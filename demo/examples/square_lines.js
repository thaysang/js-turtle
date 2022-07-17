// Square Lines -- draw a set of overlapping squares without turns

function demo() {
  reset()
  wrap(false)
  side = 30
  side2 = side + side
  offset = true
  for (var i=minY(); i<maxY(); i = i + side) {
    goto(minX(),i)
    angle(90)
    if (offset) {
      penup()
      forward( side)
      pendown()
    }
    offset = !offset
    for (var j=minX(); j<maxX(); j = j + 3*side) {
      forward( side2)
      penup()
      forward( side)
      pendown()
    }
  }

  offset = true
  for (var i=minX(); i<maxX(); i = i + side) {
    goto(i, minY())
    angle(0)
    if (offset) {
      forward( side)
    }
    offset = !offset
    for (var j=maxY(); j>minY(); j = j - 3*side) {
      penup()
      forward( side)
      pendown()
      forward( side2)
    }
  }
}
