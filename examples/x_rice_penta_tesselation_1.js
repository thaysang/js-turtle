// rice penta tesselation 1 -- pentagon tesselation discovered by Margorie Rice

function pr() {
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
}

function pl() {
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
}


function pu() { // penta unit
  pr()
  pl()

  forward( 2*sidea)
  left(180)
  pr()
  pl()


  left( angleA)
  forward( sidee)
  left( 180 - angleC)
  forward( sideb)
  left( 180- angleB)
  forward( sidea)
  right(180)

  pl()
  pr()

  forward( 2 * sidea)
  right(180)
  pr()
  pl()
}

function demo() {
  reset()
  wrap( false)
  size = 10
/*
  sidea = size
  sideb = 4.9 * size
  sidec = 1.15 * size
  sided = 2 * sidea + sidec
  sidee = sided
*/
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
  while (turtle.pos.y > minY()) {
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
}
