// Koch Snowflakes, Stacked -- draw an set of stacked Koch snowflakes


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


function kochSnowflake (length, order) {
  angle (30);
  goto (-length/2,-.3 * length);
  kochLine (length, order);
  right(120);
  kochLine (length, order);
  right(120);
  kochLine (length, order);
  right(120);
}
  

function demo() {
  reset()
  size = .045* Math.min(maxX(), maxY())
  hideturtle();
  for (var i=0; i<6; i++) {
    kochSnowflake( size*(i+1)*(i+1), i)
  }
}
