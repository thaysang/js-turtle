koch_snowflakeString ='\
// draw a set of Koch snowflakes\n\
\n\
\n\
function kochLine (length, order) {\n\
  //assume drawn on the current angle\n\
  if (order == 0) {\n\
    forward (length);\n\
  } else {\n\
    //break line and bump out to the left\n\
    kochLine (length/3, order-1);\n\
    left(60); \n\
    kochLine (length/3, order-1);\n\
    right(120); \n\
    kochLine (length/3, order-1);\n\
    left(60); \n\
    kochLine (length/3, order-1);\n\
  }\n\
}\n\
\n\
function kochSnowflake (length, order) {\n\
  angle (150);\n\
  goto (0,120);\n\
  kochLine (length, order);\n\
  right(120);\n\
  kochLine (length, order);\n\
  right(120);\n\
  kochLine (length, order);\n\
  right(120);\n\
}\n\
  \n\
\n\
reset();\n\
\n\
var steps = 6;\n\
var span = 240;\n\
var i = 0;\n\
\n\
function kochLines () {\n\
  for (i=0; i<steps; i++) {\n\
    goto (span/2 - i*span/steps, - span/2);\n\
    kochLine (span,i);\n\
  }\n\
}\n\
\n\
function demo() {\n\
  hideturtle();\n\
  i = 0;\n\
  kochSnowflakeDelay();\n\
}\n\
\n\
function kochSnowflakeDelay() {\n\
   var maxX = imageContext.canvas.width / 2;\n\
   var minX = -imageContext.canvas.width / 2;\n\
   var maxY = imageContext.canvas.height / 2;\n\
   var minY = -imageContext.canvas.height / 2;\n\
\n\
  clear();\n\
  kochSnowflake (200,i);\n\
  goto(minX,minY);\n\
  angle(90);\n\
  setfont("Helvetica,san-serif 12pt")\n\
  write ("Koch snowflake of order " +i);\n\
  draw();\n\
  i = i+1;\n\
  if (i < steps) {\n\
    delay (kochSnowflakeDelay, 2000);\n\
  }\n\
}\n\
'
