// Random Stick Men -- draw stick men randomly on the canvas

// stick man
function stickMan (height) {
  var headDiameter = height/4;
  var torsoLength = height/3;
  var neckLength = torsoLength/3
  var armLength = height/3;
  var legLength = height/2;

  //assume center of man is center of torso and up is in the pointed direction
  penup();
  forward (torsoLength/2 + neckLength + headDiameter/2); 
  pendown();
  circle (headDiameter/2); //draw head
  penup();
  right (180); //down
  forward (headDiameter/2);
  pendown()
  forward (neckLength); //neck
  right(120);
  forward (armLength); //left arm
  penup();
  backward (armLength);
  right(120);
  pendown();
  forward (armLength); //right arm
  penup();
  backward (armLength);
  right(120);
  pendown();
  forward(torsoLength); // torso
  right(30);
  forward(legLength); //left leg
  penup();
  backward(legLength);
  left(60);
  pendown();
  forward(legLength); //right leg
  penup();
  backward(legLength);
  right(30+180);
  forward(torsoLength/2);
}

function demo () {
  reset();
  hideturtle();
  number = 0.0005 *  maxX() * maxY() // uniform density no matter size
  for (i=0; i<number; i++) {
    goto (random( minX()+20, maxX()-20),random( minY()+20, maxY()-20));
    color(random(16));
    stickMan(random (30,60));
  }
}
