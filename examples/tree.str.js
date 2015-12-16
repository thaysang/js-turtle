treeString ='\
// draw a symmetrical tree\n\
//  code inspired from a code.org lesson\n\
function drawTree(depth, branches) {\n\
  var spread = 120;	//spread is angle of left to right branches\n\
  var tilt = 0;		//tilt is angle of the cluster\n\
  var ratio = 7;	//ratio is branch depth to length ratio\n\
  if (depth>0) { \n\
   color( random( 16));\n\
   pendown();\n\
   width (depth + random(0,2));\n\
   forward(ratio * depth);\n\
   left(tilt + spread/2 + spread/branches/2);\n\
   repeat(branches, function () {\n\
     right(spread/branches);\n\
     drawTree(depth-1, branches);\n\
   });\n\
   left(spread - tilt - spread/2 - spread/branches/2); // return to start angle\n\
   penup();\n\
   backward (ratio * depth); // backup to start point\n\
  }\n\
}\n\
\n\
// draw a more random tree\n\
function drawRTree(depth, branches) {\n\
  var spread = random(90,180);	// spread is angle of left to right branches\n\
  var tilt = random(-15,15);	// tilt is angle of the cluster\n\
  var ratio = random (5,9);	// ratio is branch depth to length ratio\n\
  if (depth>0) { \n\
   color( random( 16));\n\
   pendown();\n\
   width (depth + random(0,2));\n\
   forward(ratio * depth);\n\
   left(tilt + spread/2 + spread/branches/2);\n\
   repeat(branches, function () {\n\
     right(spread/branches);\n\
     drawTree(depth-1, branches);\n\
   });\n\
   left(spread - tilt - spread/2 - spread/branches/2); // return to start angle\n\
   penup();\n\
   backward (ratio * depth); // backup to start point\n\
  }\n\
}\n\
\n\
function demo() {\n\
  reset();\n\
  penup();\n\
  backward(150);\n\
  pendown();\n\
  drawTree(6,4)\n\
}\n\
'
