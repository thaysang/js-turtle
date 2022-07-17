// Random Stars -- draw stars randomly on the canvas

function star (side, sColor) {
  penup()
  forward(.54*side)
  turn (180-18)
  pendown()
  var i=0
  beginShape()
  while (i<5){
    forward(side)
    right(180-36)
    i = i + 1
  }
  fillShape(sColor)
  turn (180+18)
}


function demo () {
  reset()
  for (i=1; i< 150; i=i+1) {
    goto (random(minX(),maxX()), random( minY(),maxY()))
    left(random(359))
    star (random(2,15), random(15))
  }
  hideTurtle()
}
