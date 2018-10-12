// Koch Lines -- draw an animated set of Koch lines

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


function kochLineDelay() {
;
  clear();
  var side = maxY() - minY();
  if (side > maxX() - minX()) {
    side = maxX() - minX()
  }
  angle(90)
  side = .9 * side
  goto (-side/2, -1/4 * side)
  kochLine (side, i);
  goto(minX(),minY());
  angle(90);
  setfont("bold 12pt Ariel,san-serif")
  write ("Koch line of order " +i);
  draw();
  i = i + 1;
  if (i < steps) {
    delay (kochLineDelay, 2000);
  }
}

function demo() {
  reset();
  hideturtle();
  steps = 6;
  span = 240;
  i = 0;

  kochLineDelay();
}
