// Example -- example of code
/* Define helper functions here
or write your own functions
including a demo() function

For example:    */


function square (side) {
  var i=0
  while (i<4) {
    forward( side)
    turn(90)
    i=i+1
  }
}

function demo() {
   reset();
   hideTurtle();
   color("blue");
   var side = 100;
   while (side > 0) {
      square(side);
      right(36);
      side = side - 10;
   }
}
