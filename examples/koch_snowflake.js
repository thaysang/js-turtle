// Koch Snowflakes -- draw an animated set of Koch snowflakes


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
  

reset();

var steps = 6;
var span = 240;
var i = 0;

function kochLines () {
  for (i=0; i<steps; i++) {
    goto (span/2 - i*span/steps, - span/2);
    kochLine (span,i);
  }
}

function kochSnowflakeDelay() {

  clear();
  var side = maxY() - minY();
  if (side > maxX() - minX()) {
    side = maxX() - minX()
  }
  kochSnowflake (.8 * side,i);
  goto(minX(),minY());
  angle(90);
  setfont("Helvetica,san-serif 12pt")
  write ("Koch snowflake of order " +i);
  draw();
  i = i + 1;
  if (i < steps) {
    delay (kochSnowflakeDelay, 2000);
  }
}

function demo() {
  hideturtle();
  i = 0;
  kochSnowflakeDelay();
}
