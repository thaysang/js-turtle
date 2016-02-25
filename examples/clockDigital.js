// clock digital -- digital clock using seven-segment displays

//*** GLOBALS ***

var hour1digit;
var hour10digit;
var min1digit;
var min10digit;
var sec10digit;
var sec1digit;

//var hour10;
//var hour1;
//var min10;
//var min1;
//var sec10;
//var sec1;


//*** CONSTANTS ***

/*
The seven-segment display is layed out as follows:
   --a--
  |      |
  f      b
  |      |
   --g--
  |      |
  e      c
  |      |
   --d--
*/
//segment strings are in the order: abcdefg
//  where 1 turns segment on
//    and 0 turns segment off
var segments = [ "1111110", //0
                 "0110000", //1
                 "1101101", //2
                 "1111--1", //3
                 "0110011", //4
                 "1011011", //5
                 "1011111", //6
                 "1110000", //7
                 "1111111", //8
                 "1110011"  //9
               ]

var segSize = 30 // pixels
segAngle = 10 // degrees
segOnColor = "red"
segOffColor = "black"
digitSpacing = 1.4 * segSize
interdigitSpacing = 1.6 * digitSpacing


//*** FUNCTIONS ***

function tensDigit (number) {
  return Math.floor (number/10) % 10
}


function onesDigit (number) {
  return Math.floor (number % 10)
}


function getTime() {
  time = new Date
  hours = time.getHours()
  minutes = time.getMinutes()
  seconds = time.getSeconds()

  // extract the digits
  hour10digit = tensDigit(hours)
  hour1digit = onesDigit(hours)
  min10digit = tensDigit(minutes)
  min1digit = onesDigit(minutes)
  sec10digit = tensDigit(seconds)
  sec1digit = onesDigit(seconds)
}


function segColor (bit) {
  if (bit == "1") {
    color( segOnColor)
  } else {
    color( segOffColor)
  }
}


function display7segment(digit) {
  pendown()
  segColor (segments [digit].substr(0,1)) //a
  forward (segSize)
  right(90+segAngle)
  segColor (segments [digit].substr(1,1)) //b
  forward (segSize)
  segColor (segments [digit].substr(2,1)) //c
  forward (segSize)
  right (90-segAngle)
  segColor (segments [digit].substr(3,1)) //d
  forward (segSize)
  right (90+segAngle)
  segColor (segments [digit].substr(4,1)) //e
  forward (segSize)
  right (90-segAngle)
  segColor (segments [digit].substr(6,1)) //g
  forward (segSize)
  backward (segSize)
  left (90-segAngle)
  segColor (segments [digit].substr(5,1)) //f
  forward (segSize)
  right (90-segAngle)
  penup()
}


function displaySegTime() {
  // black out background
  goto (minX(),0)
  angle (90)
  color(black)
  width (2*maxY())
  pendown()
  forward(2*maxX())

  // draw the 6 digits of time
  goto (-4*segSize, segSize)
  width (6)
  display7segment(hour10digit)
  forward (digitSpacing)
  display7segment(hour1digit)

  forward (interdigitSpacing)
  display7segment(min10digit)
  forward (digitSpacing)
  display7segment(min1digit)

  forward (interdigitSpacing)
  display7segment(sec10digit)
  forward (digitSpacing)
  display7segment(sec1digit)
}


function displayTime() {
  hideturtle() 
  getTime()
  displaySegTime()
}


animate(displayTime, 1000)
