// Stars and Rhombuses -- tesselation found on a wall paper pattern

function quadRhom( side) {
  for( var i=0; i<4; i++) {
    for ( var j=0; j<4; j++) {
      forward( side)
      right( ang)
      forward( side)
      right( 180- ang)
      forward( side)
      right( ang)
      forward( side)
      right( 180- ang)
    }
    right( 90)
  }
}

function demo() {
  reset()
  wrap( false)
  hideTurtle()
  ang = 60
  side = 20
  xoffset = 0
  chord = 2* side * Math.cos(degToRad(ang/2))

  for (var fy=maxY(); fy>minY(); fy=fy - chord) {   
    for (var fx=minX(); fx<maxX(); fx=fx + 2*chord) {
      goto( fx+xoffset, fy)
      angle( 90 - ang/2)
      quadRhom( side)
    }
    if (xoffset>0) {
      xoffset = 0
    } else {
      xoffset = chord
    }
  }
}
