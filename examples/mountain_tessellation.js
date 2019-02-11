// Mountain Tessellation -- tessellation with a mountain shaped heptiamond
// a heptiamond is a shape composed of 7 equalateral triangles
//
//
//// Triangle Tessellation -- tile a space using triangles

colors = ["red", "white", "blue", "yellow", "green"]

function shapeUp (side, fillColor) {
  // assume pointing in direction of base
  beginShape()
  forward(3* side)
  left(120)
  forward(2*side)
  left( 120)
  forward(side)
  right( 120)
  forward( side)
  left( 120)
  forward( 2*side)
  left(120)
  fillShape( fillColor)
}

function mountainUnit(side){
  pendown()
  shapeUp(side, "darkgreen")//1,1
  penup()
  left(60)
  forward(side)
  right(60)
  forward(5*side)
  right(180)
  pendown()
  shapeUp(side, "skyblue")//1,0
  penup()

  forward(3*side)
  left(180)
  pendown()
  shapeUp(side, "green") //0,0

  penup()
  left(60)
  forward(2*side)
  left(120)
  pendown()
  shapeUp(side, "lightblue")//0,1
  forward( 3*side)
  left( 180)
  penup()

}

// nextColor could be completely random, if desired
function nextColor() {
  c = colors[ count % color.length]
  count = count + 1
  return c
}


function newRow(lastx, lasty) {
  // function to determine where the new row should start
}

function demo() {
  reset()
  wrap(false)
  side = 20
  rowx = minX() - side // - 5.5 * side
  rowy = minY()// +2*side
  right(90)
  mx = rowx
  my = rowy

console.log("xy<: " + minX() + " " + minY())
  // row until run off bottom or off right side
  // column when end is off screen

  // while ( x<maxX() && y>minY()) {
  var done = false
  var i = 0
  var sqrt3 = Math.sqrt(3)
  while (!done){
console.log("xy: " + i + " " + mx + " " + my)
    goto (mx, my)
    mountainUnit( side)
    //goto (mx+2.2*side, my+1*sqrt3*side)
    //write(i)
    
    mx = mx + 4.5 * side
    my = my -sqrt3/2 * side

    if (mx > maxX() || my < (minY() - 1.5 * sqrt3 * side)) {
      console.log( "New row")
      if (my > maxY()) {
        done = true
      }
      // move up one row
      rowx = rowx + 0.5 * side
      rowy = rowy + 1.5 * sqrt3 * side
      if (rowy > maxY() + sqrt3 * side) {
        while (rowy> maxY() + sqrt3 * side) {
          // step forward one more unit
           console.log( "Stepping forward one")
           rowx = rowx + 4.5 * side
           rowy = rowy - sqrt3/2 * side
        }
      } else if (rowx > minX() - 1 * side) {
         console.log( "Backing up one")
         // back up one more unit
         rowx = rowx - 4.5 * side
         rowy = rowy + sqrt3/2 * side
      }
      mx = rowx
      my = rowy
      //done = true
    }
    if (i> 75) {
      done = true
    }
    if ( mx>maxX() + 500  && my>maxY()) {
      done = true
    }
    i++
  }
  console.log("Count: " + --i)

}
