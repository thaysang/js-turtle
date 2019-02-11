// Connected Points -- points connected by spikeys

//draw the radials
function drawRadials(side) {
  for (var i=0; i<16; i++) {
    goto(0,0)
    angle(i/16 * 360)
    forward( size)
  }
}

function spikey ( points, revs, radius, x, y, head) {
  penup()
  goto(x, y)
  setheading(head)
  forward(radius)
  var turnAngle = 360 * revs/points
  var angleA = ( 180 - turnAngle)/2
  var stroke = 2 * radius * Math.cos( degToRad( angleA))
  right( 180 - angleA)
  pendown()

  for( var i = 0; i < points; i = i + 1) { //>
    forward( stroke)
    right( turnAngle)
  }
}



function demo() {
  reset()
  wrap(false)
  size = .9* Math.min( maxX(), maxY())
  //size=200
  inr = .33* size
  width(.5)
  spikey( 16, 2, size, 0, 0, 0)
  spikey( 16, 2, size, 0, 0, 360/16)
  width(.25)
  spikey( 16, 4, size, 0, 0, 0)
  spikey( 16, 4, size, 0, 0, 360/16)
  spikey( 16, 4, size, 0, 0, 2*360/16)
  spikey( 16, 4, size, 0, 0, 3*360/16)
  spikey( 16, 6, size, 0, 0, 0)
  spikey( 16, 6, size, 0, 0, 360/16)
  width(.7)
  spikey( 8, 3, inr, 0, 0, 0)
  spikey( 8, 1, inr, 0, 0, 0)
  width(1)
  drawRadials( size)
  goto(0,0)
  circle( inr)
  hideTurtle()
}
