// Tree Symmetrical -- draw a symmetrical tree

//GLOBALS
var scale // varible to influence overall tree size


//  code inspired from a code.org lesson
function drawTree(depth, branches) {
  var spread = 120;	//spread is angle of left to right branches
  var tilt = 0;		//tilt is angle of the cluster
  var ratio = 7;	//ratio is branch depth to length ratio
  if (depth>0) { 
   color( random( 16));
   pendown();
   width (depth + random(0,2));
   forward(scale* ratio * depth);
   left(tilt + spread/2 + spread/branches/2);
   repeat(branches, function () {
     right(spread/branches);
     drawTree(depth-1, branches);
   });
   left(spread - tilt - spread/2 - spread/branches/2); // return to start angle
   penup();
   backward (scale * ratio * depth); // backup to start point
  }
}

// draw a more random tree
function drawRTree(depth, branches) {
  var spread = random(90,180);	// spread is angle of left to right branches
  var tilt = random(-15,15);	// tilt is angle of the cluster
  var ratio = random (5,9);	// ratio is branch depth to length ratio
  if (depth>0) { 
   color( random( 16));
   pendown();
   width (depth + random(0,2));
   forward(scale * ratio * depth);
   left(tilt + spread/2 + spread/branches/2);
   repeat(branches, function () {
     right(spread/branches);
     drawTree(depth-1, branches);
   });
   left(spread - tilt - spread/2 - spread/branches/2); // return to start angle
   penup();
   backward (scale * ratio * depth); // backup to start point
  }
}

function demo() {
  reset();
  hideturtle();
  scale = .01 * Math.min( maxX(), maxY())
  penup();
  backward(scale * 70);
  pendown();
  drawRTree(6,4)
}
