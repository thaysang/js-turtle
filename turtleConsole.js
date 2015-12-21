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

// Set up all code elements to be linked and have onclick functionality
var codeElements = document.querySelectorAll ("code");
for (var i=0; i< codeElements.length; i++) {
  //console.log ("element id: " + codeElements[0].id);
  codeElements[i].className = "linked";
  codeElements[i].onclick = function () {
    eval (this.innerHTML + ";");
    cmd (this.innerHTML + ";");
  }
}

// Set up all color button elements to be linked and have onclick functionality
var codeElements = document.querySelectorAll ("button");
for (var i=0; i< codeElements.length; i++) {
  //console.log ("element id: " + codeElements[0].id);
  codeElements[i].onclick = function () {
    eval ("color(\"" + this.id +"\")");
    cmd ("color(\"" + this.id +"\");");
  }
}


//INITITALIZATION FUNCTIONS

// load the example code when the corresponding demo menu item is clicked
document.getElementById("examples").onchange = function () {
  document.getElementById('definitions').value = eval(this.value);
}

document.getElementById("command").onchange=function commandChanged () {

  // handle a change (after an ENTER) to the command box
  var commandText = this.value;
  var definitionsText = document.getElementById('definitions').value;
  try {
    //*** Boys and girls please don't use eval() functions at home. In general this
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

// set up the control buttons
document.getElementById("resetButton").onclick=reset;
document.getElementById("runButton").onclick=runClicked;

var STOP = document.getElementById("stopButton")
STOP.onclick=stopClicked;
STOP.hidden=true;


/* functions or whatever to do reactive design stuff
1. Expand to fill given area
 - is there some minimum width? maybe of the canvas itself.
2. Allow language reference to be opened and closed
3. Allow examples to be hidden (mainly for display or printing purposes)


  var width = window.innerWidth - 20;
  var height = window.innerHeight - 20;
  if (width > height)
  {
    width = height;
  }
  else
  {
    height = width;
  }
i

*/

function resizeColumns () {

  var w = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth; // variations for cross browser support
  
  var h = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight; // variations for cross browser support

  if (w < 1200) {
    var overallWidth = w;
  } else {
    var overallWidth = 1200;
  }
  var refElement = document.getElementById("reference");
  var leftcolElement = document.getElementById("leftcolumn")

  // left column resized for language reference or for drawer handle
  if (refElement.className == "closed") {
    var leftcolWidth = 10;
  } else {
    var leftcolWidth = 300;
  }
   
  // right column resized for examples if active
  var examplesActive = true;
  if (examplesActive) {
    var rightcolWidth = Math.min(300, .32* overallWidth);
  } else {
    var rightcolWidth = 0;
  }
  // mid column resized for space available
  var midcolWidth = overallWidth - leftcolWidth - rightcolWidth;
  if (midcolWidth < 300) {
    midcolWidth = 300;
  }
  var canvasWidth = midcolWidth - 5; // removes space for margins

  // work area height
  var overallHeight = h - 3 /* guessed margin */;
  var workAreaHeight = h - 50 /*top displacement*/ - 17 /* guessed margin? */;
  if (workAreaHeight < 400) {
    var canvasHeight = 300;
  } else {
    var canvasHeight = workAreaHeight - 140 /* space for controls */;
  }
  
  var wrapWidth = overallWidth - 2; //leftcolWidth + midcolWidth + rightcolWidth;
  
 
  var turtleCanvasElement = document.getElementById("turtlecanvas")
  var imageCanvasElement = document.getElementById("imagecanvas")

  var wrapElement = document.getElementById("wrap");
  wrapElement.style.width = wrapWidth + "px";
  wrapElement.style.height = overallHeight + "px";

  leftcolElement.style.width = leftcolWidth + "px";
  leftcolElement.style.height = workAreaHeight + "px";

  var midcolElement = document.getElementById("midcolumn")
  midcolElement.style.width = (midcolWidth) + "px";
  midcolElement.style.left = (leftcolWidth + 5) + "px";
  midcolElement.style.height = workAreaHeight + "px";

  turtleCanvasElement.width = canvasWidth;
  turtleCanvasElement.height = canvasHeight;
  imageCanvasElement.width = canvasWidth;
  imageCanvasElement.height = canvasHeight;

  var rightcolElement = document.getElementById("rightcolumn");
  var definitionsElement = document.getElementById("definitions");
  rightcolElement.style.left = (leftcolWidth +5 + midcolWidth +5 ) + "px";
  rightcolElement.style.width = (rightcolWidth - 20 ) + "px";
  rightcolElement.style.height = workAreaHeight + "px";
  definitionsElement.style.height = (workAreaHeight -37) + "px";

// refresh canvases
  imageContext.lineWidth = turtle.width;
  imageContext.strokeStyle = turtle.color;
  imageContext.strokeRect(0,0,canvasWidth,canvasHeight);

  turtleContext.lineWidth = "1px";
  turtleContext.strokeStyle = "black";
  turtleContext.strokeRect(0,0,canvasWidth,canvasHeight);
}


//window.addEventListener("resize", resizeColumns());
resizeColumns();


function openReferenceDrawer() {
  document.getElementById("reference").className = "open";
  document.getElementById("referenceTitle").className = "open";
  resizeColumns();

}

function closeReferenceDrawer() {
  document.getElementById("reference").className = "closed";
  document.getElementById("referenceTitle").className = "closed";
  resizeColumns();
}

referenceDrawerHandle = document.getElementById("lefthandle")
referenceDrawerHandle.onclick = function () {
  if (document.getElementById("reference").className == "closed") {
    openReferenceDrawer();
  } else {
    closeReferenceDrawer();
  }
}

document.getElementById("hamburger").onclick = function () {
  if (document.getElementById("reference").className == "closed") {
    openReferenceDrawer();
  } else {
    closeReferenceDrawer();
  }
}

