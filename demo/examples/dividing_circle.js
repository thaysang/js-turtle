// Dividing a Circle -- divide a circle with other circles

// *** GLOBALS ***
var i; // loop variable


// *** CONSTANTS ***
rad = 50; // circle radius
limit = 6; // times to loop
delayTime = 1000; // milliseconds


// *** FUNCTIONS ***

function divideCenter(radii, radius) {
  left(60);
  forward(radius);
  right(60);
  var side = 0
  while (side < 6) { // go to each side
    right(60);
    var step = 0
    while (step < radii) { // step off side
      forward(radius);
      circle(radius);
      step = step + 1
    };
    side = side + 1;
  };
}


function tier () {
  divideCenter (i, rad)
  i = i + 1
  if (i < limit) {
    delay (tier, delayTime)
  }
}


function demo() {
  clear();
  hideTurtle();
  home();
  penup();
  wrap(false);
  circle (rad);
  i = 1;
  delay (tier, delayTime);
}
