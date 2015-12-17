// Circle Eye Example
// this draws a set of n circles
// inscribed between the center and
// outside of a containing circle

function circleEye (x, y, n, outerRadius) {
  goto (x, y);
  circle (outerRadius); //outer circle

  for (i=0; i<n; i++) {
    goto (x, y);
    angle (i/n * 360);
    penup();
    forward (outerRadius/2);
    pendown();
    circle(outerRadius/2); // one inscribed circle
  }
}



function demo () {
  clear();
  circleEye (0,0,16,120);
}
