// Pentahex -- game pieces consisting of five hexagons in a 10x11 field

// This sets up a pseudo interpreter. Each move is a right (r) or left (l)
// token. Each piece consists of a set of such moves to from the outline
// of the piece.

function r() {
  forward( side)
  right( 60)
}

function l() {
  forward( side)
  left( 60)
}

  I5=[l,l,r,l,r,l,r,l,r,l,l,l,l,r,l,r,l,r,l,r,l,l]
  D5=[l,l,r,l,r,l,l,l,r,l,l,r,l,l,r,l]
  T5=[l,l,r,r,l,r,l,l,l,l,r,r,l,l,l,r,l,r,l,l]
  N5=[l,l,r,r,l,l,r,l,r,l,l,l,l,r,l,r,r,l,l,r,l,l]
  P5=[l,l,r,l,r,r,l,l,l,r,l,l,l,r,l,r,l,r,l,l]
  E5=[l,l,r,r,l,l,l,r,r,l,l,l,l,r,l,r,l,r,l,l]
  G5=[l,l,r,r,l,l,r,l,l,r,l,l,l,l,r,r,r,l,l,r,l,l]
  A5=[l,r,l,l,l,r,r,l,l,l,l,r,r,l,l,l,r,l]
  J5=[l,r,l,l,r,l,r,l,r,l,l,l,l,r,l,r,l,r,r,l,l,l]
  Y5=[l,l,r,l,r,r,l,l,l,l,r,r,l,l,l,l,r,r,l,r,l,l]
  X5=[l,l,r,r,l,l,l,r,l,l,l,r,r,l,l,l,r,l]
  y5=[l,l,r,r,l,l,l,l,r,r,r,l,l,l,l,r,l,l,r,r,l,l]
  u5=[l,l,r,l,r,l,l,r,l,l,l,l,r,r,r,l,l,l,r,l]
  V5=[l,l,r,l,r,l,l,l,l,r,r,r,l,l,l,l,r,l,r,l]
  U5=[l,r,l,l,r,l,l,l,l,r,r,r,r,l,l,l,l,r,l,l,r,l]
  C5=[l,l,l,r,r,l,r,r,l,l,l,l,r,l,l,r,l,r,l,l,r,l]
  q5=[l,l,r,r,l,r,l,l,l,r,l,l,l,r,r,l,l,r,l,l]
  r5=[l,l,r,l,r,r,r,l,l,l,l,r,l,l,r,l,l,r,l,r,l,l]
  L5=[l,r,l,r,l,l,l,l,r,l,r,r,l,r,l,l,l,l,r,l,r,l]
  W5=[l,l,r,r,l,l,r,r,l,l,l,l,r,l,l,r,r,l,l,r,l,l]
  S5=[l,l,l,r,r,l,r,l,l,r,l,l,l,l,r,r,l,r,l,l,r,l]
  p5=[l,l,r,l,r,l,l,r,l,l,l,r,l,l,r,r,l,l]

function shape( bx, by, axis, turns, fillColor ) {
  // draw a shape at board position bx, by, with the piece oriented
  // on one of six axises. The shape consists of an array of turns.
  penup()
  goto( baseX, baseY)
  angle(0)
  forward( 2* by * side * Math.cos(degToRad(30)))
  right(60)
  forward( 2* bx * side * Math.cos(degToRad(30)))
  penup()
  dot()  //center of start cell
  angle(60 * axis )
  left( 180 - 30)
  forward( side)
  left (120) 
  pendown()
  beginShape()
  for (j=0; j< turns.length; j++) {
    turns[j]()
  }
  fillShape( fillColor)
  penup()

  left( 60)
  forward(side)
  dot()
  backward(side)
  right( 60)

// return to the start position, not really necessary
  left(60)
  forward( side)
  left( 30)
}

function drawAll() {
  reset()
  side = 15
  baseX = -200
  baseY = -200

  shape(0,0,0,D5)
  shape(3,0,0,u5)
  shape(6,0,0,V5)
  shape(9,0,0,r5)
  shape(12,0,0,y5)
  shape(15,0,0,L5)
  shape(0,4,0,U5)
  shape(3,4,0,Y5)
  shape(6,4,0,p5)
  shape(9,4,0,C5)
  shape(12,4,0,A5)
  shape(15,4,0,J5)
  shape(0,7,0,I5)
  shape(3,8,0,T5)
  shape(6,8,0,N5)
  shape(9,8,0,P5)
  shape(12,8,0,G5)
  shape(15,8,0,E5)
  shape(0,12,0,S5)
  shape(3,12,0,q5)
  shape(6,12,0,W5)
  shape(9,12,0,X5)
}

function demo() {
  reset()
  wrap(false)
  hideTurtle()

  side =   Math.min( 2*maxX()/ 12/ 1.5, 2*maxY()/ 16/ Math.sqrt(3))
  //side = 20

  baseX = -5 * 1.5 * side
  baseY = -7 * Math.sqrt(3) * side

  shape(0,2,3,D5, "red")
  shape(2,0,1,u5, "lightgreen")
  shape(5,0,1,V5, "blue")
  shape(10,0,4,r5, "yellow")
  shape(3,1,5,y5, "blue")
  shape(10,1,5,L5, "red")
  shape(5,3,3,U5, "red")
  shape(3,2,0,Y5, "yellow")
  shape(1,3,0,X5, "lightgreen")
  shape(0,5,0,W5, "red")
  shape(9,2,4,q5, "blue")
  shape(5,4,5,p5, "lightgreen")
  shape(9,3,5,S5, "yellow")
  shape(10,5,4,C5, "lightgreen")
  shape(8,6,1,A5, "yellow")
  shape(8,5,4,J5, "red")
  shape(3,7,1,I5, "blue")
  shape(0,7,0,T5, "yellow")
  shape(1,9,1,N5, "lightgreen")
  shape(3,9,1,P5, "yellow")
  shape(7,8,1,G5, "red")
  shape(7,9,1,E5, "blue")
}
