random_stick_menString ='\
//Random Stick Men\n\
// draw stick men randomly on the canvas\n\
\n\
// stick man\n\
function stickMan (height) {\n\
  var headDiameter = height/4;\n\
  var torsoLength = height/3;\n\
  var neckLength = torsoLength/3\n\
  var armLength = height/3;\n\
  var legLength = height/2;\n\
\n\
  //assume center of man is center of torso and up is in the pointed direction\n\
  penup();\n\
  forward (torsoLength/2 + neckLength + headDiameter/2); \n\
  pendown();\n\
  circle (headDiameter/2); //draw head\n\
  penup();\n\
  right (180); //down\n\
  forward (headDiameter/2);\n\
  pendown()\n\
  forward (neckLength); //neck\n\
  right(120);\n\
  forward (armLength); //left arm\n\
  penup();\n\
  backward (armLength);\n\
  right(120);\n\
  pendown();\n\
  forward (armLength); //right arm\n\
  penup();\n\
  backward (armLength);\n\
  right(120);\n\
  pendown();\n\
  forward(torsoLength); // torso\n\
  right(30);\n\
  forward(legLength); //left leg\n\
  penup();\n\
  backward(legLength);\n\
  left(60);\n\
  pendown();\n\
  forward(legLength); //right leg\n\
  penup();\n\
  backward(legLength);\n\
  right(30+180);\n\
  forward(torsoLength/2);\n\
}\n\
\n\
function demo () {\n\
  clear();\n\
  hideturtle();\n\
  for (i=0; i<20; i++) {\n\
    goto (random(-120,120),random(-120,120));\n\
    color(random(16));\n\
    stickMan(random (30,60));\n\
  }\n\
}\n\
'
