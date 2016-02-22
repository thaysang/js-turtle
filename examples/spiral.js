// Spiral -- demonstrate some simple spirals

function spiral1() {
  n=0
  while (n<400) {
    forward(n)
    right(90)
    n=n+3
  }
}

function spiral2() {
  n=0
  while (n<75) {
    forward(n)
    right(90-n)
    n=n+1
  }
}


function spiral() {
  n=0
  while (n<40) {
    forward(n)
    right(15)
    n=n+.25
  }
}

demo = spiral;
