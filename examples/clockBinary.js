// Clock, Binary -- digital clock using binary digits

//*** GLOBALS ***

var hour10;
var hour1;
var minute10;
var minute1;
var second10;
var second1;

var hourColor = "red"
var minuteColor = "green"
var secondColor = "blue"
var offColor = "lightgray"


//*** FUNCTIONS ***

function tensDigit (number) {
  return Math.floor (number/10) % 10
}


function onesDigit (number) {
  return Math.floor (number % 10)
}


function getBinaryTime() {
  time = new Date
  hours = time.getHours()
  minutes = time.getMinutes()
  seconds = time.getSeconds()

  // extract the digits
  hour10 = tensDigit(hours)
  hour1 =  onesDigit(hours)
  min10 =  tensDigit(minutes)
  min1 =   onesDigit(minutes)
  sec10 =  tensDigit(seconds)
  sec1 =   onesDigit(seconds)

  //pad digits with leading 0s
  hour10 = "0000" + hour10.toString(2)
  hour1 =  "0000" + hour1.toString(2)
  min10 =  "0000" + min10.toString(2)
  min1 =   "0000" + min1.toString(2)
  sec1 =   "0000" + sec1.toString(2)
  sec10 =  "0000" + sec10.toString(2)
  sec1 =   "0000" + sec1.toString(2)

  //use only 4 digits
  hour10 = hour10.slice(-4)
  hour1 =  hour1.slice(-4)
  min10 =  min10.slice(-4)
  min1 =   min1.slice(-4)
  sec1 =   sec1.slice(-4)
  sec10 =  sec10.slice(-4)
  sec1 =   sec1.slice(-4)
}


function displayBinary() {
  color(black)
  write (":"+
    hour10 + " " + hour1 +
    ":"+
    min10 +  " "  + min1 +
    ":"+
    sec10 +  " "  + sec1)
}


function drawDot (digit, onColor, offColor, step) {
  if (digit == 1) {
    color( onColor)
  } else {
    color( offColor)
  }
  dot ()
  forward (step)
}


function drawNumberDots (digitString, onColor, offColor) {
  drawDot( digitString[0], onColor, offColor, 15)
  drawDot( digitString[1], onColor, offColor, 15)
  drawDot( digitString[2], onColor, offColor, 15)
  drawDot( digitString[3], onColor, offColor, 15)
  backward (60)
}


function displayBinaryDots() {
  penup()
  right(90)
  forward(10)
  left(90)
  forward (15)
  right(90)
  drawNumberDots (hour10, hourColor, offColor)

  left(90)
  forward (25)
  right(90)
  drawNumberDots (hour1, hourColor, offColor)

  left(90)
  forward (25)
  right(90)
  drawNumberDots (min10, minuteColor, offColor)

  left(90)
  forward (25)
  right(90)
  drawNumberDots (min1, minuteColor, offColor)

  left(90)
  forward (25)
  right(90)
  drawNumberDots (sec10, secondColor, offColor)

  left(90)
  forward (25)
  right(90)
  drawNumberDots (sec1, secondColor, offColor)
}


function displayTime() {
  clear()
  home()
  angle(90)
  hideturtle() 
  getBinaryTime()
  //displayBinary()
  displayBinaryDots()
}

animate(displayTime, 1000)
