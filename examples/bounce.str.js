bounceString ='\
// rectagles which bounce off the side of the canvas\n\
function init_drops(n) {\n\
   var drops = new Array(n);\n\
   for (var i = 0; i < n; i++) {\n\
      drops[i] = { // each drop is an object with a set of properties\n\
         x: random(-150, 150),\n\
         y: random(-150, 150),\n\
         velocityX: random(-6,6),\n\
         velocityY: random(-6,6),\n\
         size: random(20,300),\n\
         red:random(0,255),\n\
         green:random(0,255),\n\
         blue: random(0,255),\n\
         alpha: Math.random(),\n\
         width: random(1,15)\n\
      };\n\
   }\n\
   return drops;\n\
}\n\
\n\
function rain (drops, n) {\n\
   clear();\n\
   for (var i = 0; i < n; i++) {\n\
      // access each drop object\n\
      var d = drops[i]; // access each drop object and react with it\n\
      // if the drop hits a wall, reverse its motion direction (velocity)\n\
      if (d.y < -150) {\n\
         d.velocityY = -d.velocityY;\n\
      }\n\
      else if (d.y + d.size > 150 && d.velocityY > 0) {\n\
         d.velocityY = -d.velocityY;\n\
      }\n\
      if (d.x - d.width/2 < -150) {\n\
         d.velocityX = -d.velocityX;\n\
      }\n\
      else if (d.x + d.width/2 > 150) {\n\
         d.velocityX = -d.velocityX;\n\
      }\n\
      // paint the drop\n\
      color ("rgba(" +d.red+ "," +d.green+ "," +d.blue+ "," +d.alpha +")");\n\
      width(d.width);\n\
      goto(d.x, d.y);\n\
      forward(d.size);\n\
      // move the drop for the next time\n\
      d.y = d.y + d.velocityY;\n\
      d.x = d.x + d.velocityX;\n\
   }\n\
}\n\
\n\
function let_them_drop (n) {\n\
   wrap(false);\n\
   hideTurtle();\n\
   drops = init_drops(n);\n\
   animate(function () { rain(drops, n)}, 100);\n\
}\n\
\n\
function demo() {\n\
  let_them_drop (5);\n\
}\n\
'
