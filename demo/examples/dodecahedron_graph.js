// Dodecahedron Graph -- draw a 2-dimentional graph of a dodecahedron
// graph here describes the connections between vertices, more at
// Wikipedia.com

//   This would be easier to draw to points on concentric circles
//   This is just lines and not shadable polygons

function pent(side) {
  var angle2=72-(360-108)/2
  // the sides below are really trigonometric conversions
  // without the trig functions
  var side2 = .4*side
  var angle3 = 80
  var side3 = 1.05 * side
  var angle4 = 40
  var side4 = .5 * side
  var angle5 = 129
  var side5 = 2.65 * side
  for (var i=0; i<5; i++) {
    forward (side)
      right(angle2)
      forward (side2)
        right(angle3)
        forward(side3)
          left(angle4)
          forward(side4)
            left(angle5)
            forward(side5)
            backward(side5)
            right(angle5)
          backward(side4)
          right(angle4)
        backward(side3)
        left(angle3)
        left(angle3)
        forward(side3)
        backward(side3)
        right(angle3)
      backward (side2)
      left(angle2)
    right(72)
  }
}

function demo() {
  goto (-50,-22)
  right(17)
  pent(50)
  hideturtle()
}
