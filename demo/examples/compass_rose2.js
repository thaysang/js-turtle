// Compass Rose 2 -- draws compass rose.

function compassRose (x, y, n, outerRadius, innerRadius) {
  goto (x, y);
  circle (outerRadius); //outer circle
  circle (innerRadius);

  angleA= Math.atan((innerRadius* Math.sin(Math.PI/4))/(outerRadius-innerRadius* Math.cos(Math.PI/4))) //radians
  side1= outerRadius/(1+Math.tan(angleA)/Math.tan(Math.PI/4))
  side2= side1/Math.cos(angleA)
  for (i=0; i<4; i++) {
    goto (x, y);
    angle (i/4 * 360);
    penup()
    forward( innerRadius)
    pendown()
    forward (outerRadius-innerRadius);
    right( 180-radToDeg( angleA));
    forward( side2);
    backward( side2);
    right( radToDeg( 2* angleA));
    forward( side2);
  }

  side3= outerRadius/(1+Math.tan(angleA)/Math.tan(Math.PI/8))
  r3= side3/Math.cos(angleA)
  console.log( "side3:"+side3 + " r3: " + r3)
  for (i=0; i<4; i++) {
    goto (x, y);
    angle (45 + i/4 * 360);
    penup()
    forward( innerRadius)
    pendown()
    forward (outerRadius-innerRadius);
    right( 180-radToDeg( angleA));
    forward( r3);
    backward( r3);
    right( radToDeg( 2* angleA));
    forward( r3);
  }

  r4=outerRadius/2

  side4= outerRadius/(1+Math.tan(angleA)/Math.tan(Math.PI/16))
  r4= side4/Math.cos(angleA)
  console.log( "side4:"+side4 + " r4: " + r4)
  for (i=0; i<8; i++) {
    goto (x, y);
    angle (22.5 + i/8 * 360);
    penup()
    forward (outerRadius);
    pendown()
    right( 180-radToDeg( angleA));
    forward( r4);
    backward( r4);
    right( radToDeg( 2* angleA));
    forward( r4);
  }

  r5 = .1 * outerRadius
  base = 2* r5* Math.sin(angleA)
  for (i=0; i<16; i++) {
    goto (x, y);
    angle (11.25 + i/16 * 360);
    penup()
    forward (outerRadius);
    pendown()
    right( 180-radToDeg( angleA));
    forward( r5);
    right(90+radToDeg(angleA))
    forward (base)
    right(90+radToDeg(angleA))
    forward( r5);
  }
}



function demo () {
  reset();
  size = Math.min( maxX(), maxY()) * .9
  hideturtle();
  //color( random(16));
  compassRose( 0, 0, 16, size, .2*size);
}
