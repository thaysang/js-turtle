// Hircshhorn Tiles -- Hirschhorn 6-fold-rotational symmetry pentagonal tiling

// CONSTRAINTS
// six ang0 = 360
//ang0 + ang1 + ang4 = 360
//ang1 + ang3 + ang3 = 360
//ang2 + ang4 + ang4 = 360
//ang0 + ang3 = ang1 ... about the inner circle
//ang2+ ang3 + ang2 + ang3 = 360
//  restated: ang2 + ang3 = 180
//
//ang0 = 60
//ang1 = ang3 + 60
//3*ang3 = 300
//ang3 = 100
//ang2 = 180 - ang3 = 180-100 = 80
//ang1 = 360 - 2*ang3 = 360 - 200 = 160
//ang4 = 360 - ang0 = ang1 = 360 - 60 - 160 = 140

//sides
//side0 = side4
//side0 = side3
//side1 = side4
//side2 = side3
//side1 = side3
// this means that
// side0 = side4 = side3 = side2 = side1... equalateral

ang0 = 360/6 //point angle
ang1 = 160
ang2 = 80
ang3 = 100
ang4 = 140
CCW = true
CW = false

angles = [ang0, ang1, ang2, ang3, ang4 ]
//angles = [60, 160, 80, 100, 140 ]

fColors = [
           "yellow",
           "orange",
           "lime",
           "red",
           "purple",
           "cyan",
           "cyan",
           "blue",
           "blue",
           "brown",
           "brown",
           "brown",
           "tan",
           "tan",
           "tan",
           "aqua",
           "aqua",
           "aqua",
           "aqua",
           "salmon",
           "salmon",
           "salmon",
           "salmon",
           "gray",
           "gray",
           "gray",
           "gray",
           "gray",
           "black",
           "black",
           "black",
           "black",
           "black",
           ]
/*
fColors = [
           "wheat",
           "tan",
           "tan",
           "wheat",
           "tan",
           "wheat",
           "wheat",
           "tan",
           "tan",
           "wheat",
           "wheat",
           "wheat",
           "tan",
           "tan",
           "tan",
           "wheat",
           "wheat",
           "wheat",
           "wheat",
           "tan",
           "tan",
           "tan",
           "tan",
           "gray",
           "gray",
           "gray",
           "gray",
           "gray",
           "black",
           "black",
           "black",
           "black",
           "black",
           ]
*/
colorlayer = 0

function pentagon(side, fColor) {
  // direction of the point
  // invariant
  beginShape()
  left( ang0/2)
  forward( side)
  right( 180 - ang1)
  forward( side)
  right( 180 - ang2)
  forward( side)
  right( 180 - ang3)
  forward( side)
  right( 180 - ang4)
  forward( side)
  right( 180 - ang0/2)
  fillShape( fColor)
}

function p(pNum, ccw, side, fColor) {
  if (ccw) {
    r = -1
  } else {
    r = 1
  }
  beginShape()
  left( angles[pNum]/2)
  for (var i=1; i<5; i++) {
    forward( side)
    //write( angles[(i+pNum)%5])
    right( 180 - angles[(5+r*i+pNum)%5])  
  }
  forward( side)
  right( 180 - angles[pNum]/2)
  fillShape( fColor)
}

function hirchhorn(side) {
  for (var i=0; i<6; i++) {
    //pentagon( s, fColors[colorlayer])
    p( 0, CW, side, fColors[colorlayer])
    left( 60)
  }
  colorlayer++

  left(30)
  for (var i=0; i<6; i++) {
    forward( side)
    left( 10)
    //pentagon( s, fColors[colorlayer])
    p( 0, CW, side, fColors[colorlayer])
    right( 10)
    backward( side)
    left( 60)
  }
  colorlayer++

  for (var i=0; i<6; i++) {
    forward( side)
    right( 180 - ang1)
    forward( side)
    left( 180 - ang4 - ang4/2 )

    p ( 4, 0, side, fColors[colorlayer])
    right( 180 - ang4 - ang4/2 )
    backward( side)
    left( 180 - ang1)
    backward(side)
    left( 60)
  }
  colorlayer++
  
  forward( side)
  right( 180 - ang1)
  forward( side)
  left( 180 - ang4)
  forward( side)
  left( 180 - ang3 - ang0/2)
  
  cl = colorlayer
  for( var i=0; i<18; i++) {
    colorlayer = cl
    p( 0, CCW, side, fColors[colorlayer])
    colorlayer++
    right( ang0/2)
    forward( side)
    left( 180 - ang1 - ang3/2)
    p( 3, CCW, side, fColors[colorlayer])
    colorlayer++
    right( ang3/2)

    forward(side)
    left( 180- ang4 - ang0/2)
    p( 0, CW, side, fColors[colorlayer])
    colorlayer++

    left( ang0/2)
    forward( side)
    left( 180 - ang0)
    forward( side)
    right( 180 - ang0/2)
    p( 0, CW, side, fColors[colorlayer])//purple
    colorlayer++

    left( ang0/2)
    forward( side)
    right( 180- ang1)
    forward( side)
    right( 180 - ang2 - ang2/2)
    p( 2, CCW, side, fColors[colorlayer])
    colorlayer++

    right( ang2/2)
    forward( side)
    left( ang2/2)
    p( 2, CCW, side, fColors[colorlayer])
    colorlayer++

    right( ang2/2)
    forward( side)
    left( 180 - ang3)
    forward( side)
    left( 180 - ang4 - ang0/2)
    p( 0, CW, side, fColors[colorlayer])
    colorlayer++

    left( ang0/2)
    forward( side)
    left( 180 - ang0)
    forward( side)
    right( 180 - ang0/2)
    p( 0, CW, side, fColors[colorlayer])
    colorlayer++

    left( ang0/2)
    forward( side)
    left( 180 - ang0)
    forward( side)
    right( 180 - ang0/2)
    p( 0, CW, side, fColors[colorlayer])
    colorlayer++

    left( ang0/2)
    forward( side)
    right( 180 - ang1)
    forward( side)
    right( 180 - ang2 - ang2/2)
    p( 2, CCW, side, fColors[colorlayer])
    colorlayer++

    right( ang2/2)
    forward( side)
    left( ang2/2)
    p( 2, CCW, side, fColors[colorlayer])
    colorlayer++

    right( ang2/2)
    forward( side)
    left( ang2/2)
    p( 2, CCW, side, fColors[colorlayer])
    colorlayer++

    right( ang2/2)
    forward( side)
    left( ang2)
    forward( side)
    left( 180 - ang4 - ang0/2)
    p( 0, CW, side, fColors[colorlayer])
    colorlayer++

    left( ang0/2)
    forward( side)
    left( 180 - ang0)
    forward( side)
    right( 180 - ang0/2)
    p( 0, CW, side, fColors[colorlayer])
    colorlayer++

    left( ang0/2)
    forward( side)
    left( 180 - ang0)
    forward( side)
    right( 180 - ang0/2)
    p( 0, CW, side, fColors[colorlayer])
    colorlayer++

    left( ang0/2)
    forward( side)
    left( 180 - ang0)
    forward( side)
    right( 180 - ang0/2)
    p( 0, CW, side, fColors[colorlayer])
    colorlayer++

    left( ang0/2)
    forward( side)
    right( 180 - ang1)
    forward( side)
    right( 180 - ang2 - ang2/2)
    p( 2, CCW, side, fColors[colorlayer])
    colorlayer++

    right( ang2/2)
    forward( side)
    left( ang2/2)
    p( 2, CCW, side, fColors[colorlayer])
    colorlayer++

    right( ang2/2)
    forward( side)
    left( ang2/2)
    p( 2, CCW, side, fColors[colorlayer])
    colorlayer++

    right( ang2/2)
    forward( side)
    left( ang2/2)
    p( 2, CCW, side, fColors[colorlayer])
    colorlayer++

    // and back again
    right( ang2/2)
    forward( side)
    right( 180 - ang3)

    forward( side)
    right( 180 - ang4)
    forward( side)

    right( 180 - ang0 - ang4)
    forward( side)
    right( 180 - ang3 - ang3)
    forward( side)
    right( 180 - ang4)
    forward( side)

    right( 180 - ang0 - ang4)
    forward( side)
    right( 180 - ang3 - ang3)
    forward( side)
    right( 180 - ang4)
    forward( side)

    right( 180 - ang0 - ang4)
    forward( side)

    right( 180 - ang3 - ang1)
    forward( side)

    right( 180 - ang0)
    forward( side)
    right( 180 - ang4 - ang0/2)

  }
  
}

function demo() {
  reset()
  wrap(false)
  size = .07* Math.min(maxX(), maxY())
  hirchhorn(size)
}
