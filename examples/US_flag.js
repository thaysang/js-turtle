// US Flag -- draw an American Flag

function star (size) {
  penup()
  forward(.54*size)
  turn (180-18)
  pendown()
  var i=0
  beginShape()
  while (i<5){
    forward(size)
    right(180-36)
    i = i + 1
  }
  fillShape("white")
  turn (180+18)
  backward(.54*size)
}


function starLine(count, size, sep) {
  while (count > 0) {
    star(size)
    penup()
    right(90)
    forward (sep)
    left(90)
    pendown()
    count = count -1;
  }
}


function rectangle (width, height) {
  // assume x, y at upper right hand corner in and out
  // assume angle is 90 in and out
  angle (90)
  forward (width)
  right(90)
  forward (height)
  right (90)
  forward (width)
  right (90)
  forward (height)
  right (90)
}


function stripes (width, spacing, number) {
  //assume x, y is at right side of stripe
  //assume angle is -90
  var i = 0
  while (i<number) {
    pendown()
    forward (width)
    penup()
    // make the turn
    if (i%2 == 0) {
      left(90)
      forward(spacing)
      left(90)
    } else {
      right(90)
      forward(spacing)
      right(90)
    }
    i = i + 1
  }
}


function flag() {
  // ***Constants
  //var xBase = -200 // base is upper left corner
  //var yBase = 200
  //var flagHeight = 250 // everything else is proportional to flagHeight
 
  var flagHeight =  1.8 * Math.min(maxX()/1.9, maxY())
  var flagWidth = 1.9 * flagHeight
console.log("X="+2*maxX()+ " Y="+2*maxY() + " W="+flagWidth + "H="+flagHeight)
  var xBase = -flagWidth/2
  var yBase = flagHeight/2 

  var stripeWidth = flagHeight/13
  var fieldWidth = .76 * flagHeight
  var fieldHeight = 7 * stripeWidth
  var xSeparation = .063 * flagHeight
  var ySeparation = .054 * flagHeight
  starSize = .05 *flagHeight // star size
  //outline flag and field
  reset()
  wrap(false)
  hideTurtle()
  goto (xBase, yBase)
  angle (90)
  color("black")

  width(1)
  rectangle (flagWidth, flagHeight)
  rectangle (fieldWidth, fieldHeight)

  //  draw stripes
  color("red");
  width(stripeWidth);
  goto (xBase+flagWidth, yBase-stripeWidth/2)
  angle (-90)
  stripes (flagWidth-fieldWidth, 2*stripeWidth, 4)
  stripes (flagWidth, 2*stripeWidth, 3)

  //draw field
  color("blue")
  goto (xBase+fieldWidth, yBase-stripeWidth/2)
  angle (-90)
  stripes (fieldWidth, stripeWidth, 7)

  //draw field of stars
  angle(0)
  width (2)
  color("white")
  pendown()

  var row = 0
  while (row<9) {
   if (row % 2 == 0) {
      goto (xBase + xSeparation, yBase - (row +1) * ySeparation)
      starLine(6, starSize, xSeparation*2)
    } else {
      goto (xBase + 2* xSeparation, yBase - (row +1) * ySeparation)
      starLine(5, starSize, xSeparation * 2)
    }
    row = row + 1;
  }
}
  
demo = flag
