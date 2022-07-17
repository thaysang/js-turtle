// Stamps -- demonstrate stamping of a star design multiple times

function star (side) {
  penup()
  forward(.54*side)
  turn (180-18)
  pendown()
  var i=0
  while (i<5){
    forward(side)
    right(180-36)
    i = i + 1
  }
  turn (180+18)
}

function stamps () {
  reset()
  wrap(false)
  var x = minX()
  while (x <= maxX()) {
    var y = minY()
    while (y <= maxY()) {
      goto (x,y)
      angle (0);
      star (25);
      y = y+30
    }
    x = x+30
  }
}

  
demo = stamps
