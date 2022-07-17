// Spiral -- demonstrate some simple spirals

function spiral1() {
  reset()
  n=0
  while (n<400) {
    forward(n)
    right(90)
    n=n+3
  }
}

function spiral2() {
  reset()
  n=0
  while (n<75) {
    forward(n)
    right(90-n)
    n=n+1
  }
}


function spiral3() {
  reset()
  wrap(false)
  n=0
  while (n<40) {
    forward(n)
    right(15)
    n=n+.25
  }
}

function spiral() {
  reset()
  wrap(false)
  n=0
  while (n<1000) {
    forward(n)
    right(15)
    n=n+.25
    // turtle.pos.x is the x position of the turtle
    // turtle.pos.y is the y position of the turtle
    x = turtle.pos.x
    y = turtle.pos.y
console.log("x:"+x+" y:"+y)
    // "||" means "or", so the following statement checks for out of bounds
    if (x>maxX() || x<minX() || y>maxY() ||y<minY()) {
console.log("exiting:")
      break; // exit the loop early
    }
  }
}

demo = spiral;

