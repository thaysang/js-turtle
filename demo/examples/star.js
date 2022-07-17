// Star -- draw a simple star

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
    
    
function demo () {
  reset()
  side =  1.8* Math.min( maxX(), maxY())
  beginShape()
  star ( side)
  fillShape("gold")
  hideTurtle()
}
