// Heart -- draw open or filled hearts
/*
algorithm:
  start with a square at 45 degrees
  add two half circles on the two upper segments
  clean up the lines

to make invarient:
  move down 1/(square root 2) or (square root 2)/2
  draw it
  move up by same amount

to make solid:
  fill the two half circles.
  fill the square by drawing it on one shot
*/

function oheart(size)
{
  color("red")
  width(4)
  penup()
  backward(.707*size)
  pendown()
  left (45)
  forward(size)
  right (90)
  penup()
  forward (size/2)
  pendown()
  circle(size/2,180,false)
  penup()
  forward (size/2)
  right(90)
  forward (size/2)
  pendown()
  circle(size/2,180,false)
  penup()
  forward (size/2)
  pendown()
  right(90)
  forward (size)
  right(135)
  penup()
  forward(.707*size)
  pendown()
}

function fheart(size, fcolor)
{
  color(fcolor)
  backward(.707*size)
  left (45)
  forward(size)
  right (90)
  forward (size/2)
  beginShape()
  circle(size/2,180,false)
  fillShape(fcolor)
  forward (size/2)
  right(90)
  forward (size/2)
  beginShape()
  circle(size/2,180,false)
  fillShape(fcolor)
  forward (size/2)
  right(90)
  forward (size)
  beginShape()
  for (i=0;i<4;i++)
  {
    right(90)
    forward(size)
  }
  fillShape(fcolor)
  right(135)
  forward(.707*size)
}

function heart(size)
{
  color("red")
  width(4)
  penup()
  backward(.707*size)
  pendown()
  left (45)
  forward(size)
  right (90)
  penup()
  forward (size/2)
  pendown()
  beginShape()
  circle(size/2,180,false)
  fillShape("red")
  penup()
  forward (size/2)
  right(90)
  forward (size/2)
  pendown()
  beginShape()
  circle(size/2,180,false)
  fillShape("red")
  penup()
  forward (size/2)
  pendown()
  right(90)
  forward (size)
  beginShape()
  for (i=0;i<4;i++)
  {
    right(90)
    forward(size)
  }
  fillShape()
  right(135)
  penup()
  forward(.707*size)
  pendown()
}

function demo()
{
  reset()

  size = 50
  oheart(5 * size)
  fheart(4 * size,"red")
  fheart(3 * size,"white")
  oheart(2 * size)
  fheart(1 * size, "red")
}
