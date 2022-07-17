// Circle Eye -- draws a set of n inscribed circles within circle

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
  reset();
  size = Math.min( maxX(), maxY()) * .9
  hideturtle();
  color( random(16));
  circleEye( 0, 0, 16, size);
}
