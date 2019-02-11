// Miura Origami -- fold pattern for the miura origami

function horiz( size){
  hy = maxY()
  while (hy > minY()) {
    goto (minX(), hy)
    angle(90)
    forward( 2*maxX())
    hy = hy - size
  } 
}

function vert( size) {
  vx = minX()
  while ( vx < maxX()) {
    vy = maxY()
    while (vy > minY()) {
      goto( vx, vy)
      angle( 180 - 6)
      forward( size * Math.cos( degToRad(6)))
      right( 12)
      forward( size * Math.cos( degToRad(6)))
      vy = vy - 2 * size

    }
    vx = vx + size
  }
}


function demo() {
  reset()
  wrap( false)
  size = 100
  horiz( size)
  vert( size)
}
