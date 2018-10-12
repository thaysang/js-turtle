// Compass Rose Quilt -- draw a compass rose quilt

//### CONTROLING VARIABLES
//number of main divisions of the directional triangles
mainDivisions = 4
//number of divisions in the most triangles
subDivisions8 = 3
//number of main divisions in 16th points
mainDivisions16 = 2
//number of subdivisions in 16th points
subDivisions16 = 2
//number of main divisions in 32nds points
mainDivisions32 = 1
//number of subdivisions in 32nds points
subDivisions32 = 3

//color of background
backgroundColor = "blue"
//color of compass background
compassBackgroundColor = "black"
//color of text
compassTextColor = "white"
//color of inner direction background
inner8BackgroundColor = "black"
//color of inward direction (array)
inner8Colors = ["gold", "salmon"]

//color of outer direction background
outer8BackgroundColor = "black"
//color of outer direction (array)
outer8Colors = ["yellow", "red"]


//background color of 16ths
background16Color = "gold"
//foreground color of 16ths
foreground16Color = "salmon"
//background color of 32nds
background32Color = "black"
//foreground color of 32nds
foreground32Color = "yellow"


function indexColor(index, colors) {
  var len = colors.length
  return colors[ index % len]
}


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


function splitTri(outerSide, num, foreColor, triSide) {
  var i, j
  
  if (triSide == undefined) {
    triSide = outerSide
  }
  innerSide = triSide / num
  for (j = num; j >0; j -= 1) {
     for (i = 0; i <j; i += 1) {
        beginShape()
        triangle (innerSide)
        fillShape(foreColor)
        penup()
        forward(innerSide)
        pendown()
     }
    penup()
    backward( j * innerSide)
    right(45)
    forward( innerSide)
    left(45)
    pendown()
  }
  penup()
  right(45)
  backward( innerSide * num)
  left(45)
  pendown()
}


function flipSplitTri( outerSide, num, foreColor, triSide) {
  penup()
  forward( outerSide)
  right( 45)
  forward( outerSide)
  right( 180-45)
  pendown()
  splitTri( outerSide, num, foreColor, triSide)
  penup()
  right( 45)
  forward( outerSide)
  left( 45)
  forward( outerSide)
  left( 180)
  pendown()
}


function labelPoints(size) {
  penup()
  angle( 0)
  boxedCompass=["N", "NxE", "NNE", "NExN", "NE", "NExE", "ENE", "ExN", "E", "ExS", "ESE", "SExE", "SE", "SExS", "SSE", "SxE", "S", "SxW", "SSW", "SWxS", "SW", "SWxW", "WSW", "WxS", "W", "WxN", "WNW", "NWxW", "NW", "NWxN", "NNW", "NxW"]

  // fill in the compass background

  //textRadius = side*5.7
  textRadius = size*.88
  color( compassTextColor)

  for (i=0; i<32; i++) {
  
    forward (textRadius)
    right(90)
    fontSize = i % 4
    if (fontSize == 1 || fontSize == 3) {
      pointSize = size *.04
      textLen = boxedCompass[i].length * pointSize/2
      backward (textLen)
      setfont("normal " + pointSize + "pt Helvetica")
    } else if (fontSize == 2) {
      pointSize = size *.04
      textLen = boxedCompass[i].length * pointSize/2
      backward (textLen)
      setfont("bold " + pointSize + "pt Helvetica")
    } else {
      pointSize = size *.06
      textLen = boxedCompass[i].length * pointSize/2
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
  size = .9 * Math.min( maxX(), maxY()) //120
console.log("size "+ size)
  wrap(false)
  hideTurtle() // don"t want it to show,  do this early
  redrawOnMove(false) // don"t redraw image each move

  // fill in the background
  background( backgroundColor)
/*
  goto( minX()+1, maxY()-1)
  right( 90)
  beginShape()
  forward( 2 * maxX()-2)
  right( 90)
  forward( 2 * maxY()-2)
  right( 90)
  forward( 2 * maxX()-2)
  right( 90)
  forward( 2 * maxY()-2)
  fillShape( backgroundColor)
*/

  //fill in the compass background
  goto(0,0)
  color( compassBackgroundColor)
  beginShape()
  circle (size)
  fillShape( compassBackgroundColor)


  //fill in the eight compass major points
  goto(0,0)
  angle(0)
  left(22.5)
  side = size * .47
  for (i=0; i<8; i++) {
    splitTri (side, mainDivisions, indexColor( i, inner8Colors))
    flipSplitTri( side, mainDivisions, indexColor( i, outer8Colors))
    right(45)
  }

  //ornament the center
  for (i=0; i<8; i++) {
    splitTri (side/mainDivisions, subDivisions8, "yellow")
    right(45)
  }

 //place the sixteenth points
  right(22.5)
  for (i=0; i<8; i++) {
    flipSplitTri (side, 1, background16Color,
        side * mainDivisions16/mainDivisions)
    flipSplitTri (side, subDivisions16, foreground16Color,
        side * mainDivisions16/mainDivisions)
    right(45)
  }

   //place the thirty-second points
  right(11.25)
  for (i=0; i<16; i++) {
    flipSplitTri (side, 1, background32Color,
        side * mainDivisions32/mainDivisions)
    flipSplitTri (side, subDivisions32, foreground32Color,
        side * mainDivisions32/mainDivisions)
    right(22.5)
  }

  labelPoints( size)

  //redrawOnMove(true)
  draw() // just to render the final product
}
