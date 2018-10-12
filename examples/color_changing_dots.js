// Color Changing Dots -- demonstrate the concept of changing the colors of a string of dots (lights?)

/*
Maybe you can adapt to make a traffic light simulator or Christmas light
controller.
*/

function drawDot () {
    color(random(16))
    dot()
    forward (15)
}

function drawRowOfDots () {
  setpos(minX() + 20,0)
  repeat (32, drawDot)
}

function colorChangingDots () {
  reset()
  wrap(false)
  setpos(minX(),0)
  angle(90)
  pendown()
  color ("black")
  penwidth (80)
  forward (maxX() + maxX()) //draw black band
  penup()
  width (1)
  animate( drawRowOfDots, 500)
}

demo = colorChangingDots;
