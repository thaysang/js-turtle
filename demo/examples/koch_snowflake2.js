// Koch Snowflake 2 -- Koch snowflake with embellishments

function diamond(side) {
  forward(side)
  left(60)
  forward(side)
  left(120)
  forward(side)
  left(60)
  forward(side)
  left(120)
}

function dazzle( side, inset) {
  inner(side,inset)
  newside = (side - Math.sqrt(3)* inset) /3
  penup()
  left(30)
  forward(inset)
  right(30)
  forward(newside)
  left(60)
  pendown()
  forward(newside)
  diamond(newside/3)
  forward(newside)
  left(120)
  forward(newside)
  left(120)
  forward(newside)
  diamond(newside/3)
  forward(newside)
  left(120)
  forward(newside)
  left(120)
  forward(newside)
  diamond(newside/3)
  forward(newside)
  left(120)
  forward(newside)
  penup()
  right(120)
  forward(newside)
  left(30)
  forward(inset)
  left(150)
  pendown()
}


function inner( side, inset) {
  penup()
  left( 30)
  forward( inset)
  right(30)
  pendown()
  forward( side - Math.sqrt(3)*inset)
  left(120)
  forward( side - Math.sqrt(3)*inset)
  left(120)
  forward( side - Math.sqrt(3)*inset)
  penup()
  right(30)
  forward( inset)
  left(150)
  pendown()
}

function starOfDavid (side) {
  penup()
  backward(2*side)
  right(30)
  forward(side)
  right(60)
  pendown()
  for (var i=0;i<6;i=i+1) {
    inner(side, 10)
    inner(side, 20)
    dazzle(side, 30)
    forward(side)
    left(120)
    forward(side)

    left(60)
    forward(side)
    left(120)

    inner(side, 10)
    inner(side, 20)
    dazzle(side, 30)
    forward(side)
    left(120)
    forward(side)
  }
}

function kochSnowFlake (side, order) {
  kochLine(side, order)
  right(120)
  kochLine(side, order)
  right(120)
  kochLine(side, order)
  right(120)
} 


function kochLine (length, order) {
  //assume drawn on the current angle
  if (order == 0) {
    forward (length);
  } else {
    //break line and bump out to the left
    kochLine (length/3, order-1);
    left(60); 
    kochLine (length/3, order-1);
    right(120); 
    kochLine (length/3, order-1);
    left(60); 
    kochLine (length/3, order-1);
  }
}


function demo () {
  reset();
  size = Math.min( maxX(), maxY()) * .6
  hideturtle();
  starOfDavid( size)
  forward(size)
  left(180)
  //showTurtle()
  kochSnowFlake(3*size, 2)
  kochSnowFlake(3*size, 3)
}
