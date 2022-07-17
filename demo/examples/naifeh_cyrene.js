// Naifah Cyrene -- inspired by the art of Steven Naifeh of the same name.
// for more information see https://stevennaifeh.com

/* need to focus on the kites to form bow ties, rather than the squares.
this may be a little harder to do, but
easier to rasterize
row of bowties
row of up and down kites
etc.

The quadrangle must be symmetrical, in that the short sides are equal and
the long sides are equal. The ratio between the two may vary.
*/

function bowties (count, back){
  //assume on left edge pointing up, moving to right
  // routine has invariance
  // back = 0 big end first, =1 small end first
  right( 90)
  for (var i=0; i<count; i++) {
    pendown()
    if (i % 2 == back) {
      downKite()
    } else {
      upKite()
    }
    penup()
    forward( hypoteneuse)
  }
  left(180)
  penup()
  forward( count * hypoteneuse)
  pendown()
  right(90)
}


function upKite() {
  //assume direction is in the axis of the kite
  beginShape()
  right( shortAngle)
  forward( longSide)
  left( 90)
  forward( shortSide)
  left( 180 - 2 * longAngle)
  forward( shortSide)
  left( 90)
  forward( longSide)
  right(180+ shortAngle)
  fillShape("lightblue")
}

function downKite() {
  //assume direction is in the axis of the kite
  beginShape()
  right( longAngle)
  forward( shortSide)
  left( 90)
  forward( longSide)
  left(180 - 2 * shortAngle)
  forward( longSide)
  left( 90)
  forward( shortSide)
  right( 180 + longAngle)
  fillShape("lightblue")
}

function kites( count, back) {
  //assume pointing up, perpendicular to flow
  // routine has invariance
  left(180)
  for( var i=0; i<count; i++) {
    pendown()
    if (i % 2 == back) {
      downKite()
    } else {
      upKite()
    }

    penup()
    left(90)
    forward( hypoteneuse)
    right(90)
    pendown()
  }
  penup()
  right(90)
  forward( count * hypoteneuse)
  right(90)
  pendown()
}


function demo() {
  reset()
  hideturtle()
  side = 2.5 * Math.min( maxX()/9, maxY()/8)

  //side = 50 // size of the basic block not the inner square
  ratio = 2 // ratio of long side to short side of the quadragon.
  verticalCount = 7
  horizontalCount = 8

  longSide = side * ratio / (1 + ratio)
  shortSide = side - longSide

  hypoteneuse = Math.sqrt(longSide * longSide + shortSide * shortSide)

  shortAngle = radToDeg(Math.atan(shortSide/longSide))
  longAngle = 90 - shortAngle

  // center the figure
  penup()
  forward (side * horizontalCount * 1.3 / 4)
  left(90)
  forward (side * verticalCount * 1.7 /4)
  right(90)
  pendown()

  for (var i=0; i<verticalCount; i++) {
    bowties( horizontalCount, i % 2)
    kites( horizontalCount+1, 1 - (i % 2)) // change 1 to 0 and 0 to 1
    penup()
    right(180)
    forward( hypoteneuse)
    right(180)
    pendown()
  }
  bowties( horizontalCount,i%2) // row across bottom to be neat
}
