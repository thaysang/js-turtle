// Bouncing Rectangles -- rectagles which bounce off the side of the canvas
function init_drops(n) {
   var drops = new Array(n);
   for (var i = 0; i < n; i++) {
      drops[i] = { // each drop is an object with a set of properties
         x: random(-150, 150),
         y: random(-150, 150),
         velocityX: random(-6,6),
         velocityY: random(-6,6),
         size: random(20,300),
         red:random(0,255),
         green:random(0,255),
         blue: random(0,255),
         alpha: Math.random(),
         width: random(1,15)
      };
   }
   return drops;
}

function rain (drops, n) {
   clear();
   for (var i = 0; i < n; i++) {
      // access each drop object
      var d = drops[i]; // access each drop object and react with it
      // if the drop hits a wall, reverse its motion direction (velocity)
      if (d.y < -150) {
         d.velocityY = -d.velocityY;
      }
      else if (d.y + d.size > 150 && d.velocityY > 0) {
         d.velocityY = -d.velocityY;
      }
      if (d.x - d.width/2 < -150) {
         d.velocityX = -d.velocityX;
      }
      else if (d.x + d.width/2 > 150) {
         d.velocityX = -d.velocityX;
      }
      // paint the drop
      color ("rgba(" +d.red+ "," +d.green+ "," +d.blue+ "," +d.alpha +")");
      width(d.width);
      goto(d.x, d.y);
      forward(d.size);
      // move the drop for the next time
      d.y = d.y + d.velocityY;
      d.x = d.x + d.velocityX;
   }
}

function let_them_drop (n) {
   wrap(false);
   hideTurtle();
   drops = init_drops(n);
   animate(function () { rain(drops, n)}, 100);
}

function demo() {
  let_them_drop (5);
}
