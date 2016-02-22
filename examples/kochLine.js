// Koch Line -- draw an animated set of Koch lines

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

function kochLines (side, steps) {
  goto (-side/2, 0);
  angle(90);
  kochLine (side, i);
}

//*** Globals ***
var i = 0;
var steps = 6;
var size = 0;

function kochLineDelay() {
  clear();
  kochLines (size, i);
  goto(minX(), minY());
  angle(90);
  setfont("Helvetica,san-serif 12pt")
  write ("Koch line of order " +i);
  draw();
  i = i + 1;
  if (i < steps) {
    delay (kochLineDelay, 2000);
  }
}

function demo() {
  size = maxY();
  if (size > maxX()) {
    size = maxX();
  }
  size = 1.6 * size; // really 80% of twice the half width

  reset();
  hideturtle();
  i = 0;
  kochLineDelay();
}
