// rice penta tessellation 1 -- pentagon tessellation discovered by Margorie Rice

c1 = "yellow"
c2 = "orange"
c3 = "red"
c4 = "blue"
c5 = "blue"
c6 = "red"
c7 = "yellow"
c8 = "orange"

function pr(fill) {
  beginShape()
  forward(sidea)
  left(180-angleB)
  forward(sideb)
  left(180-angleC)
  forward(sidec)
  left(180-angleD)
  forward(sided)
  left(180-angleE)
  forward(sidee)
  left(180-angleA)
  fillShape(fill)
}

function pl(fill) {
  beginShape()
  forward(sidea)
  right(180-angleB)
  forward(sideb)
  right(180-angleC)
  forward(sidec)
  right(180-angleD)
  forward(sided)
  right(180-angleE)
  forward(sidee)
  right(180-angleA)
  fillShape(fill)
}


function pu() { // penta unit
  pr(c1)
  pl(c2)

  forward( 2*sidea)
  left(180)
  pr(c3)
  pl(c4)


  left( angleA)
  forward( sidee)
  left( 180 - angleC)
  forward( sideb)
  left( 180- angleB)
  forward( sidea)
  right(180)

  pl(c5)
  pr(c6)

  forward( 2 * sidea)
  right(180)
  pr(c7)
  pl(c8)
}

function demo() {
  reset()
  wrap( false)
  size = 10

  sidea = size
  sideb = 5.9 * size // fudging to make work
  sidec = 2.8 * size // fudging to make work
  sided = sidec
  sidee = 2 * sidec
  angleA = 120
  angleB = 90
  angleC = 120
  angleD = 90
  angleE = 120
  goto (minX(), maxY())
  goto (minX(),maxY())
  bigX = minX() + 2*size
  bigY = maxY()
  setHeading (44)
  while (turtle.pos.x < maxX()) {
    goto (bigX, bigY)
    while (turtle.pos.y > minY()-8*size) {
      pu()
      left( angleA)
      forward( sidee)
      right( 180 - angleE)
      forward( 2* sidec)
      left( 180 - angleE)
      forward( sidec)
      right( 180 - angleD)
      forward( sided)
      left( 180- angleA)
      forward( 2* sidea)
      right( 180)
    }
    bigX = bigX + 20.72 * size
    bigY = bigY + .4 * size
  }
}
