// Compass Rose -- draw a compass rose with the same triangles

// The triangle functions could provide shading and color

function triangle (side){
  forward (side)
  a = 45
  b = (180-a)/2
  right (180 - b)
  //forward (.748* side)
  forward (side * 2 * Math.sin(a/2/360*6.28))
  right (180 - b)
  forward (side)
  right (180-a)
}

function triangleL (side){
  forward (side)
  a = 45
  b = (180-a)/2
  left (180 - b)
  forward (side * 2 * Math.sin(a/2/360*6.28))
  left (180 - b)
  forward (side)
  left (180-a)
}

function halfTri(side) {
  triangle (side)
  forward(side)
  triangle (side)
  right(45+(180-45)/2)
  forward(side * 2 * Math.sin( 45/2/360*6.28))
  left(180-(180-45)/2)
  triangle(side)
  left(180-45)
  forward( side)
  right(180-45)
}

function flipIt (side) {
  //not quite symmetrical...
  penup()
  forward( side*3)
  right( 45)
  forward(side*3)
  right(180-45)
  pendown()
  thirdTri(side)
  penup()
  right (45)
  forward(side*3)
  left(45)
  forward(side*3)
  left(180)
  pendown()
}


function flipHalf (side) {
  //not quite symmetrical...
  penup()
  forward( side*3)
  right( 45)
  forward(side*3)
  right(180-45)
  pendown()
  halfTri(side)
  penup()
  right (45)
  forward(side*3)
  left(45)
  forward(side*3)
  left(180)
  pendown()
}


function flipPoint (side) {
  //not quite symmetrical...
  penup()
  forward( side*3)
  right( 45)
  forward(side*3)
  right(180-45)
  pendown()
  //triangle(side/2)
  halfTri(side/2)
  penup()
  right (45)
  forward(side*3)
  left(45)
  forward(side*3)
  left(180)
  pendown()
}

function thirdTri(side) {
  triangle (side)//1
  penup()
  forward(side)
  pendown()
  triangle (side)//2
  penup()
  forward(side)
  pendown()
  triangle (side)//3
  penup()
  right(45+(180-45)/2)
  forward(side * 2 * Math.sin( 45/2/360*6.28))
  left(180-(180-45)/2)
  pendown()
  triangle(side)//4
  penup()
  backward(side)
  pendown()
  triangle(side)//5
  penup()
  right(45)
  forward( side)
  left(45)
  pendown()
  triangle(side)//6
  penup()
  left(180-45)
  forward( side * 2)
  right(180-45)
  pendown()
}


function boxTheCompass(size) {
  penup()
  angle( 0)
  boxedCompass=["N", "NxE", "NNE", "NExN", "NE", "NExE", "ENE", "ExN", "E", "ExS", "ESE", "SExE", "SE", "SExS", "SSE", "SxE", "S", "SxW", "SSW", "SWxS", "SW", "SWxW", "WSW", "WxS", "W", "WxN", "WNW", "NWxW", "NW", "NWxN", "NNW", "NxW"]
  textRadius = size/14  * 5.6
  for (i=0; i<32; i++) {
  
    forward (textRadius)
    right(90)
    //textLen = boxedCompass[i].length*10/2
   // backward (textLen)
    fontSize = i % 4
    if (fontSize == 1 || fontSize == 3) {
      pointSize = size/48
      textLen = boxedCompass[i].length*pointSize/2
      backward (textLen)
      setfont("normal " + pointSize + "pt Helvetica")
    } else if (fontSize == 2) {
      pointSize = size/48
      textLen = boxedCompass[i].length*pointSize/2
      backward (textLen)
      setfont("bold " + pointSize + "pt Helvetica")
    } else {
      pointSize = size/40
      textLen = boxedCompass[i].length*pointSize/2
      backward (textLen)
      setfont("bold " + pointSize + "pt Helvetica")
    }
    write(boxedCompass[i])
    forward (textLen)
    left(90)
    backward (textRadius)
    right(360/32)
  }
}


function demo () {
  reset()
  wrap(false)
  hideTurtle() // do not want it to show, so do this early
  redrawOnMove(false) // do not redraw image each move
  size = 2* Math.min(maxX(), maxY())
  side = size/14
  left(22.5)
  for (i=0; i<8; i++) {
    thirdTri (side)
    flipIt (side)
    right(45)
  }
  for (i=0; i<8; i++) {
    halfTri (side/2)
    right(45)
  }
  right(22.5)
  for (i=0; i<84; i++) {
    flipHalf (side)
    right(45)
  }
  right(11.25)
  side = size/14
  for (i=0; i<16; i++) {
    flipPoint (side)
    right(22.5)
  }

  boxTheCompass(size)
  //redrawOnMove(true)
  draw() // just to render the final product
}

demo()
