// Dividing a Circle -- Divide a circle with other circles

function divideCenter(radii,radius) {
    left(60);
    forward(radius);
    right(60);
    repeat(6, function () {
      right(60);
      repeat(radii, function () {
        forward(radius);
        circle(radius);
      });
    });
}

function demo() {
  clear();
  home();
  penup();
  wrap(false);
  circle (50);
  delay (tier1, 1000);
}

function tier1 () {
  divideCenter (1,50);
  delay (tier2, 2000);
}

function tier2 () {
  divideCenter (2,50);
  delay (tier3, 2000);
}

function tier3 () {
  divideCenter (3,50);
  delay (tier4, 2000);
}

function tier4 () {
  divideCenter (4,50);
  delay (tier5, 2000);
}

function tier5 () {
  divideCenter (5,50);
  delay (tier6, 2000);
}

function tier6 () {
  divideCenter (6,50);
}
