/************************************************************************
*  turtleConsole -- javascript for the turtle graphic language console
*
*  Copyright (c) 2015 Kirk Carlson
*  MIT license
************************************************************************/

//SUPPORT FUNCTIONS
function cmd (text) {
  document.getElementById("command").value=text;
}


//EVENT PROCESSING FUNCTIONS
function stopClicked() {
  if (intervals.length > 0) {
    clearInterval(intervals.pop());
  }
  if (timeouts.length > 0) {
    clearTimeout(timeouts.pop());
  }
  if ((intervals.length === 0) && (timeouts.length === 0)) {
    document.getElementById("stopButton").hidden=true;
  }
}

function runClicked() {
  stopAnimation();
  cmd ("demo()");
  eval (document.getElementById("definitions").value);
  eval ("demo()");
}

function backwardCodeClicked () {
  backward(10);
  cmd ("backward(10)");
}

function forwardCodeClicked () {
  forward(10);
  cmd ("forward(10)");
}

function rightCodeClicked () {
  right (90);
  cmd ("right (90);");
}

function leftCodeClicked () {
  left (90);
  cmd ("left (90);");
}

function penupCodeClicked () {
  penup();
  cmd ("penup();");
}

function pendownCodeClicked () {
  pendown();
  cmd ("pendown();");
}

function homeCodeClicked () {
  home();
  cmd ("home();");
}

function clearCodeClicked () {
  clear();
  cmd ("clear();");
}

function resetCodeClicked () {
  reset();
  cmd ("reset();");
}

function gotoCodeClicked () {
  goto (20,10);
  cmd ("goto (20,10);");
}

function setxCodeClicked () {
  setx (0);
  cmd ("setx (0);");
}

function setyCodeClicked () {
  sety (0);
  cmd ("sety (0);");
}

function angleCodeClicked () {
  angle (90);
  cmd ("angle (90);");
}

function widthCodeClicked () {
  width(5);
  cmd ("width(5);");
}

function colorCodeClicked () {
  color("red");
  cmd ('color("red");');
}

function writeCodeClicked () {
  write("Hello World");
  cmd ('write("Hello World");');
}

function setfontCodeClicked () {
  setfont("courier");
  cmd ('setfont("courier");');
}

function random1CodeClicked () {
  write(random(1,7)+ " ");
  cmd ('write(random(1,7)+ " ");');
}

function random2CodeClicked () {
  write(random(6)+ " ");
  cmd ('write(random(6)+ " ");');
}

function hideturtleCodeClicked () {
  hideturtle();
  cmd ("hideturtle();");
}

function showturtleCodeClicked () {
  showturtle();
  cmd ("showturtle();");
}

function curveright1CodeClicked () {
  curveright(30);
  cmd ("curveright(30)");
}

function curveright2CodeClicked () {
  curveright(10,45);
  cmd ("curveright(10,45)");
}

function curveleft1CodeClicked () {
  curveleft(20);
  cmd ("curveleft(20)");
}

function curveleft2CodeClicked () {
  curveleft(10,45);
  cmd ("curveleft(10,45)");
}

function circle1CodeClicked () {
  circle(10);
  cmd ("circle(10)");
}

function circle2CodeClicked () {
  circle(20,90);
  cmd ("circle(20,90)");
}

function circle3CodeClicked () {
  circle(30,-90,false);
  cmd ("circle(30,-90,false)");
}

function dot1CodeClicked () {
  dot();
  cmd ("dot()");
}

function dot2CodeClicked () {
  dot(10);
  cmd ("dot(10)");
}

function repeat1CodeClicked () {
  repeat (4, function () {forward(10);right(90)});
  cmd ("repeat (4, function () {forward(10);right(90)});");
}

function repeat2CodeClicked () {
  function el () {forward(10);right(90)}; repeat ( 4, el);
  cmd ("function el () {forward(10);right(90)}; repeat ( 4, el);");
}

function wrapTrueCodeClicked () {
  wrap(true);
  cmd ("wrap(true);");
}

function wrapFalseCodeClicked () {
  wrap(false);
  cmd ("wrap(false);");
}

function animate1CodeClicked () {
  animate ("forward(10)",100);
  cmd ('animate ("forward(10)",100);');
}

function animate2CodeClicked () {
  animate ("forward(100);right(90)};",100);
  cmd ('animate ("forward(100);right(90)};",100);');
}

function animate3CodeClicked () {
  function el () {forward(100);right(90)}; animate (el,1000);
  cmd ("function el () {forward(100);right(90)}; animate (el,1000);");
}

function redrawOnMoveTrueCodeClicked () {
  redrawOnMove(true);
   cmd ("redrawOnMove(true);");
}

function redrawOnMoveFalseCodeClicked () {
  redrawOnMove(false);
  cmd ("redrawOnMove(false);");
}

function drawCodeClicked () {
  draw();
  cmd ("draw();");
}

function blackButtonClicked () {
  color("black");
  cmd ('color("black");');
}

function blueButtonClicked () {
  color("blue");
  cmd ('color("blue");');
}

function limeButtonClicked () {
  color("lime");
  cmd ('color("lime");');
}

function cyanButtonClicked () {
  color("cyan");
  cmd ('color("cyan");');
}

function redButtonClicked () {
  color("red");
  cmd ('color("red");');
}

function magentaButtonClicked () {
  color("magenta");
  cmd ('color("magenta");');
}

function yellowButtonClicked () {
  color("yellow");
  cmd ('color("yellow");');
}

function whiteButtonClicked () {
  color("white");
  cmd ('color("white");');
}

function brownButtonClicked () {
  color("brown");
  cmd ('color("brown");');
}

function tanButtonClicked () {
  color("tan");
  cmd ('color("tan");');
}

function greenButtonClicked () {
  color("green");
  cmd ('color("green");');
}

function aquaButtonClicked () {
  color("aqua");
  cmd ('color("aqua");');
}

function salmonButtonClicked () {
  color("salmon");
  cmd ('color("salmon");');
}

function purpleButtonClicked () {
  color("purple");
  cmd ('color("purple");');
}

function orangeButtonClicked () {
  color("orange");
  cmd ('color("orange");');
}

function grayButtonClicked () {
  color("gray");
  cmd ('color("gray");');
}

//INITITALIZATION FUNCTIONS

// load the example code when the corresponding demo menu item is clicked
document.getElementById("examples").onchange = function () {
  var str = this.value;
  switch (this.value) {
  case "bounce":
    str = bounceString;
    break;
  case "clock":
    str = clockString;
    break;
  case "nested_hexagons":
    str = nested_hexagonsString;
    break;
  case "nested_squares":
    str = nested_squaresString;
    break;
  case "polygon":
    str = polygonString;
    break;
  case "randstripe":
    str = randstripeString;
    break;
  case "sierpinski":
    str = sierpinskiString;
    break;
  case "spinning_squares":
    str = spinning_squaresString;
    break;
  case "spiral":
    str = spiralString;
    break;
  case "tree":
    str = treeString;
    break;
  case "clock":
    str = clockString;
    break;
  default:
    str = "";
    break;
  }
  document.getElementById('definitions').value = str;
}

document.getElementById("command").onchange=function commandChanged () {

  // handle a change (after an ENTER) to the command box
  var commandText = this.value;
  var definitionsText = document.getElementById('definitions').value;
  try {
    //*** Boys and girls don't use eval() functions at home. In general this
    //*** is a security leak because 'anything' could be entered by the user
    //*** in the definitions or command box. In this case, the user should be
    //*** beware that they are messing with their own machine. Most problems can
    //*** be overcome by reloading the page.

    // execute any code in the definitions box
    eval(definitionsText);
    // execute the code in the command box
    eval(commandText);
  } catch(e) {
    alert('Exception thrown, please see console');
    throw e;
  } finally {
    // clear the command box
    this.value = "";
  }
}


document.getElementById("resetButton").onclick=reset;
document.getElementById("runButton").onclick=runClicked;

var STOP = document.getElementById("stopButton")
STOP.onclick=stopClicked;
STOP.hidden=true;

/*
document.getElementById("examples").onchange=function () {
  document.getElementById("definitions").value = this.value;
}
*/

// this can also be cleaned up with anonymous functions and moving outside
document.getElementById("forwardCode").onclick=forwardCodeClicked;
document.getElementById("backwardCode").onclick=backwardCodeClicked;
document.getElementById("rightCode").onclick=rightCodeClicked;
document.getElementById("leftCode").onclick=leftCodeClicked;
document.getElementById("penupCode").onclick=penupCodeClicked;
document.getElementById("pendownCode").onclick=pendownCodeClicked;
document.getElementById("homeCode").onclick=homeCodeClicked;
document.getElementById("clearCode").onclick=clearCodeClicked;
document.getElementById("resetCode").onclick=resetCodeClicked;
document.getElementById("gotoCode").onclick=gotoCodeClicked;
document.getElementById("setxCode").onclick=setxCodeClicked;
document.getElementById("setyCode").onclick=setyCodeClicked;
document.getElementById("angleCode").onclick=angleCodeClicked;
document.getElementById("widthCode").onclick=widthCodeClicked;
document.getElementById("colorCode").onclick=colorCodeClicked;
document.getElementById("writeCode").onclick=writeCodeClicked;
document.getElementById("setfontCode").onclick=setfontCodeClicked;
document.getElementById("random1Code").onclick=random1CodeClicked;
document.getElementById("random2Code").onclick=random2CodeClicked;
document.getElementById("hideturtleCode").onclick=hideturtleCodeClicked;
document.getElementById("showturtleCode").onclick=showturtleCodeClicked;
document.getElementById("curveright1Code").onclick=curveright1CodeClicked;
document.getElementById("curveright2Code").onclick=curveright2CodeClicked;
document.getElementById("curveleft1Code").onclick=curveleft1CodeClicked;
document.getElementById("curveleft2Code").onclick=curveleft2CodeClicked;
document.getElementById("circle1Code").onclick=circle1CodeClicked;
document.getElementById("circle2Code").onclick=circle2CodeClicked;
document.getElementById("circle3Code").onclick=circle3CodeClicked;
document.getElementById("dot1Code").onclick=dot1CodeClicked;
document.getElementById("dot2Code").onclick=dot2CodeClicked;
document.getElementById("repeat1Code").onclick=repeat1CodeClicked;
document.getElementById("repeat2Code").onclick=repeat2CodeClicked;
document.getElementById("wrapTrueCode").onclick=wrapTrueCodeClicked;
document.getElementById("wrapFalseCode").onclick=wrapFalseCodeClicked;
document.getElementById("animate1Code").onclick=animate1CodeClicked;
document.getElementById("animate2Code").onclick=animate2CodeClicked;
document.getElementById("animate3Code").onclick=animate3CodeClicked;
document.getElementById("redrawOnMoveTrueCode").onclick=redrawOnMoveTrueCodeClicked;
document.getElementById("redrawOnMoveFalseCode").onclick=redrawOnMoveFalseCodeClicked;
document.getElementById("drawCode").onclick=drawCodeClicked;
document.getElementById("blackButton").onclick=blackButtonClicked;
document.getElementById("blueButton").onclick=blueButtonClicked;
document.getElementById("limeButton").onclick=limeButtonClicked;
document.getElementById("cyanButton").onclick=cyanButtonClicked;
document.getElementById("redButton").onclick=redButtonClicked;
document.getElementById("magentaButton").onclick=magentaButtonClicked;
document.getElementById("yellowButton").onclick=yellowButtonClicked;
document.getElementById("whiteButton").onclick=whiteButtonClicked;
document.getElementById("brownButton").onclick=brownButtonClicked;
document.getElementById("tanButton").onclick=tanButtonClicked;
document.getElementById("greenButton").onclick=greenButtonClicked;
document.getElementById("aquaButton").onclick=aquaButtonClicked;
document.getElementById("salmonButton").onclick=salmonButtonClicked;
document.getElementById("purpleButton").onclick=purpleButtonClicked;
document.getElementById("orangeButton").onclick=orangeButtonClicked;
document.getElementById("grayButton").onclick=grayButtonClicked;
