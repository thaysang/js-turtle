// test of arcs and curves
// this draws three figures


function radialArc (x, y, startRadius, armAngle, tangentAngle, arcRadius, extent, dir) {
  goto(x,y);
  penup();
  angle(armAngle);
  forward(startRadius);
  right(tangentAngle);
  pendown();
  circle(arcRadius,extent, dir);
}


function turbine(x,y, radius, pedals, dir) {
  for (i=0; i<pedals; i++) {
    if (dir) {
      radialArc (x,y, radius, 360*i/pedals, -135, 10, 90, dir);
    } else {
      radialArc (x,y, radius, 360*i/pedals, 45, 10, 90, !dir);
    }
  }
}

function roundedOctogon (side, radius) {
  repeat((8), function () {
    forward (side);
    curveright(radius,45);
  })
}


function roundedOctogonL (side, radius) {
  repeat((8), function () {
    forward (side);
    curveleft(radius,45);
  })
}


function demo () {
  var CW = true;
  var CCW = false;

  reset();
  hideturtle();

  turbine (-80, 30, 10, 8, CW);
  turbine (-80, 30, 25, 16, CCW);
  turbine (-80, 30, 40, 32, CW);
  turbine (-80, 30, 55, 64, CCW);


  var x= 60;
  var y=30;
  var pedals = 8;
  for (i=0; i<pedals; i++) {
    radialArc (x, y, 10, 360*i/pedals, -45, 10, 180, CW);
    radialArc (x, y, 40, 360*i/pedals, -125, 15, 110, CCW);
    radialArc (x, y, 40, 360*i/pedals, -85, 18, 170, CW);
    radialArc (x, y, 41, 360*i/pedals, 0, 10, 360, CW);
  }

  goto(x, y);
  circle(60);

  goto (-110,-100);
  angle(0);
  roundedOctogon (10,20);
  goto (-40,-100);
  angle(0);
  roundedOctogonL (15,20);

  goto (-35,-125);
  angle(22.5);
  roundedOctogonL (25,20);
  goto (-115,-120);
  angle(-22.5);
  roundedOctogon (20,20);
}
