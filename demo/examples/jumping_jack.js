// Jumping Jack -- stick man doing jumping jacks

/*
This example shows a couple of concepts.
One is the use of variables. The stick man is created based on proprotions of its
height. Changing the height variable changes the size of the other body parts.

Drawing of the body parts is done so that the turtle is returned to its starting point.
This allows the body parts to be drawn in any order or for the center of the stick man
to be moved. Each body part is draw with a function (also called a sub-routine) to
make the problem easier to understand.

The drawLeftLeg(), drawRightLeg(), drawLeftArm(), and drawRightArm() functions use a
parameter that is used to determine the angle of
the particular appendage being drawn. This way the same function can be used without
regard to the arm or leg position.

The drawBody() function ties everything together and draws all of the body parts.
It has two parameters, one for the arm angle and one for the leg angle. This assumes
that the arms move together and the legs move together, but that is not a requirement.
You can change this.

To make this a bit more fun, this can be animated, so the figure\'s arms and legs move
as if it were doing jumping jacks. To do this we want to vary the angle of the
arms, from 45 degrees to almost 180 degrees, say 175. The legs should vary from a 
135 degree angle to almost 180, lets say 175.  The two extreme positions of the
body can be drawn as:
  drawBody(45, 45);
and
  drawBody(175, 5);

(hint: You can try each one separately in the command box.)

For smooth motion, there should be 4 steps. (This is really a guess, there could be
more or there could be less, but for now lets assume that 4 is a good number.)
A step would be the base movement plus one quarter of the total movement. The moveBody()
function uses the variable
n to step throught the various movements with n=0, n=1, n=2, n=3, and n=4
successively.

For the arms: 45 + n * (175-45)/4

For the legs: 45 - n * (45-5)/4

The direction of the movement changes at either end, that is when
n = 0 or n = 4; So when n is zero, n should be increased by one to get to 1. When n is
4, n should be decreased by one (add a negative one) to get to 3. Using a direction
variable allows the moveBody() function to remember what direction it is moving.

Successive calls to moveBody() are controlled by the delay() function. This function is set
to repeat in 100 ms. You could change the time to make it faster or slower.

*/



// GLOBALS
var height;
var headDiameter;
var torsoLength;
var neckLength;
var armLength;
var legLength;

/*
  The body parts are drawn with the following asumptions
  - the center of figure is the center of torso
  - the turtle is returned to the center of the figure
  - the turtle is pointed up 
  - the pen of the turtle is up
*/


function drawHead() {
  forward (torsoLength/2 + neckLength + headDiameter/2); 
  pendown();
  circle (headDiameter/2); //draw head
  penup();
  right(180);
  forward (torsoLength/2 + neckLength + headDiameter/2); 
  right(180);
}

function drawNeck() {
  forward (torsoLength/2 ); 
  pendown();
  forward (neckLength); //neck
  penup();
  backward (torsoLength/2 + neckLength); 
}

function drawTorso() {
  backward (torsoLength/2); 
  pendown();
  forward (torsoLength); 
  penup();
  backward (torsoLength/2); 
}

function drawLeftLeg(angle){
  right(180);
  forward (torsoLength/2);
  left(angle);
  pendown();
  forward (legLength); //left leg
  penup();
  backward (legLength);
  right(angle);
  right(180);
  forward (torsoLength/2); 
} 

function drawRightLeg(angle) {
  right(180);
  forward (torsoLength/2);
  right(angle);
  pendown();
  forward (legLength); //right leg
  penup();
  backward (legLength);
  left(angle);
  right(180);
  forward (torsoLength/2); 
}

function drawLeftArm(angle){
  forward (torsoLength/2);
  right(angle);
  pendown();
  forward (armLength); //left arm
  penup();
  backward (armLength);
  left(angle);
  backward (torsoLength/2); 
} 

function drawRightArm(angle) {
  forward (torsoLength/2);
  left(angle);
  pendown();
  forward (armLength); //left arm
  penup();
  backward (armLength);
  right(angle);
  backward (torsoLength/2); 
}

function drawBody(armAngle, legAngle) {
  drawTorso();
  drawHead();
  drawNeck();
  drawLeftArm(armAngle);
  drawRightArm(armAngle);
  drawLeftLeg(legAngle);
  drawRightLeg(legAngle);
}

var n = 0;
var direction = +1;


function moveBody () {
  clear();
  height = 40;
  height = 1.5 * Math.min( maxX(), maxY())
  headDiameter = .25 * height;
  torsoLength = .3 * height;
  neckLength = .5 * torsoLength;
  armLength = .4 * height;
  legLength = .5 * height;
  width( .05*height)

  drawBody(45 + n * (175-45)/4,
    45 - n * (45-5)/4);
  n = n + direction;
  if (n>=4 || n<=0) {
    direction = -direction;
  }
  delay(moveBody,100);
}


function demo () {
  reset();
  hideturtle();
  n = 0;
  direction = +1;
  moveBody();
}
