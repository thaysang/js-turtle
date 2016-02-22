//Canvas Coordinates -- draw the axes of the coordinate system on the canvas

function lines () {
  clear()
  pendown()

  goto(0,minY())
  angle(0)
  forward (2*maxY())

  goto(minX(),0)
  angle(90)
  forward (2*maxX())

  //lable the axes
  setFont("bold 14px sans-serif");
  goto (0+10,maxY()-25)
  angle (90)
  write (maxY())

  goto (maxX()-5,+10)
  angle (0)
  write (maxX())

  goto (10,minY()+5)
  angle (90)
  write (minY())

  goto (minX()+25,0+10)
  angle (0)
  write (minX())
}


function ticks (dir, limit, step) {
  var tickLen = 5
  angle(dir)
  goto(0,0)
  penup()
  for (i=1; i*step<limit; i=i+1) {

    forward(step)
    left(90)
    if (i%5 == 0) {
      forward(tickLen)
      pendown()
      backward (tickLen*2)
      penup()
      forward(tickLen)
      right(90)
    } else {
      forward(tickLen/2)
      pendown()
      backward (tickLen)
      penup()
      forward(tickLen/2)
      right(90)
    }
  }
}

function demo() {
  lines()
  ticks (0, maxY(), 10)
  ticks (90, maxX(), 10)
  ticks (180, -minY(), 10)
  ticks (270, -minX(), 10)
}
