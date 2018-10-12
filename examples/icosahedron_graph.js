// Icosahedron Graph -- draw a two-dimensional graph of an icodahedron
// graph here describes the connections between vertices, more at
// Wikipedia.com

function pent(side) {
  // the below side variable are doing trigonometry without
  // the trig functions. Values found emperically.
  var angle2=180-(180-72)/2
  var side2 = 1.18*side
  var angle3 = 60
  var side3 = side2
  var angle4 = 156.5
  var side4 = 2.15 * side
  var angle5 = 31
  var side5 = 1.27 * side
  for (var i=0; i<5; i++) {
    color("black")
    forward (side)
      left(angle2)

      color("red")
      right(angle3)
      forward(side3)
      backward(side3)
      left(angle3)

      color ("black")
      forward(side2)

      color("blue")
      right(180-angle3)
      forward(side3)

        left(angle4)

        right(angle5)
        forward(side5)
        backward(side5)
        left(angle5)

        forward(side4)
 
        right(180-angle5)
        forward(side5)
        backward(side5)
        left(180-angle5)


        backward(side4)
        right(angle4)

      backward(side3)
      left(180-angle3)

      color ("black")
      backward(side2)
      right(angle2)

    backward(side)
    turn(72)
  }
  circle(2.13*side)
}

function demo() {
  reset()
  size = .4 * Math.min( maxX(), maxY())
  //goto (-50,-22)
  //right(17)
  pent(size)
  hideturtle()
}
