// First Programs -- first programs in learning turtle graphics

//traditional first program, Hello World
function hi ()
{
  reset()
  write ("Hello World")
}


// first readable program
function hi2 ()
{
  reset()
  turn (90)
  write ("Hello World")
}

// simple square function
function square1 ()
{
  reset()
  forward (100)
  turn(90)
  forward (100)
  turn(90)
  forward (100)
  turn(90)
  forward (100)
  turn(90)
}


// square with repeat
function el ()
{
  forward (100)
  turn(90)
}

function square2 ()
{
  reset()
  repeat (4, el)
}

// square with a while loop
function square3 () {
  var i = 0
  while (i<4) {
    forward( 100)
    turn( 90)
    i = i + 1
  }
}

// square with a for loop
// the control part of the for loop includes
// the initialization part: i = 0
// the conditional part: i<4
// the iteration part: i = i + 1 or abbreviated as i++
function square4() {
  for( var i=0; i<4; i++) {
    forward( 100)
    turn( 90)
  }
}

// change the following to map different functions to the demo function
demo = hi
