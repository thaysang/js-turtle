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

// set up command field to accept an ENTER without field modification
var command = document.getElementById("command");
if (command.addEventListener)
    command.addEventListener("keypress", function(e) {
        if (e.keyCode === 13) {
            commandChanged();
            e.preventDefault();
        }
    }, false);
else if (command.attachEvent)
    command.attachEvent("onkeypress", function(e) {
        if (e.keyCode === 13) {
            commandChanged();
            return e.returnValue = false;
        }
    });
    
function runClicked() {
  stopAnimation();
  cmd ("demo()");
  eval (document.getElementById("definitions").value);
  eval ("demo();");
}

// Set up all reference code elements to be linked and have onclick functionality
var codeElements = document.querySelectorAll ("#reference code");
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

document.getElementById("command").onchange=commandChanged;

function commandChanged () {
  var commandText = document.getElementById("command").value;
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
    goto (minX()+8, minY()+24);
    angle(90);
    color("red");
    setfont ("14pt bold Helvetica, sans-serif")
    write(e.name + ": " + e.message);
    //alert('Exception thrown, please see console');
    color("blue");
    setfont ("10pt bold Helvetica, sans-serif")
    goto (minX()+8, minY()+4);
    write("..." + e.fileName.substr(-40) + " line: " + e.lineNumber);
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
  if (w < 450) {
    document.getElementById("title").innerHTML = "Turtle Graphics"
  } else {
    document.getElementById("title").innerHTML = "Javascript Turtle Graphics"
  }
  var refElement = document.getElementById("reference");
  var leftcolElement = document.getElementById("leftcolumn")
  var rightcolElement = document.getElementById("rightcolumn")

  // left column resized for language reference or for drawer handle
  if (refElement.className == "closed") {
    var leftcolWidth = 10;
  } else {
    var leftcolWidth = 300;
  }
   
  // right column resized for examples if active
  if (document.getElementById("examplesLabel").className != "closed") {
    var rightcolWidth = Math.min(300, .32* overallWidth);
  } else {
    var rightcolWidth = 10;
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
  reference.style.height = (workAreaHeight -37) + "px";

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
  turtleContext.strokeStyle = "lightgray";
  turtleContext.strokeRect(0,0,canvasWidth,canvasHeight);
}


//window.addEventListener("resize", resizeColumns());
resizeColumns();


function openReferenceDrawer() {
  document.getElementById("reference").className = "open";
  document.getElementById("referenceTitle").className = "open";
  document.getElementById("viewReferenceItem").className = "checked";
//  document.getElementById("hamburger").className = "open";
  resizeColumns();

}

function closeReferenceDrawer() {
  document.getElementById("reference").className = "closed";
  document.getElementById("referenceTitle").className = "closed";
  document.getElementById("viewReferenceItem").className = "";
//  document.getElementById("hamburger").className = "closed";
  resizeColumns();
}

function openDefinitionsDrawer() {
  document.getElementById("definitions").className = "open";
  document.getElementById("examples").className = "open";
  document.getElementById("examplesLabel").className = "open";
  document.getElementById("viewDefinitionsItem").className = "checked";
//  document.getElementById("hamburger").className = "open";
  resizeColumns();

}

function closeDefinitionsDrawer() {
  document.getElementById("definitions").className = "closed";
  document.getElementById("examples").className = "closed";
  closeTutorial();

  document.getElementById("examplesLabel").className = "closed";
  document.getElementById("viewDefinitionsItem").className = "";
//  document.getElementById("hamburger").className = "closed";
  resizeColumns();
}

function openTutorial() {
  document.getElementById("tutorial").className = "";
}

function closeTutorial() {
  document.getElementById("tutorial").className = "closed";
}

closeTutorial();

/*
referenceDrawerHandle = document.getElementById("lefthandle")
referenceDrawerHandle.onclick = function () {
  if (document.getElementById("reference").className == "closed") {
    openReferenceDrawer();
  } else {
    closeReferenceDrawer();
  }
}
*/


document.getElementById("referenceClose").onclick = function () {
  closeReferenceDrawer();
}

document.getElementById("viewReference").onclick = function () {
  if (document.getElementById("reference").className == "closed") {
    openReferenceDrawer();
  } else {
    closeReferenceDrawer();
  }
  closeMenu();
}

document.getElementById("viewDefinitions").onclick = function () {
  if (document.getElementById("definitions").className == "closed") {
    openDefinitionsDrawer();
  } else {
    closeDefinitionsDrawer();
  }
  closeMenu();
}

/*
document.getElementById("definitionsClose").onclick = function () {
  closeDefinitionsDrawer();
}
*/
  
mouseOverElementIds = ["reference","turtlecanvas", "examples", "definitions",
                       "command", "resetButton", "runButton", "stopButton",
                       "hamburger"];
var helpTextTimer; // global for delaying all help text
var helpDelay = 1000; // global delay in milliseconds for all help text
var bottomY = (window.innerHeight // global for lowest Y on page for tool tip
      || document.documentElement.clientHeight
      || document.body.clientHeight) // variations for cross browser support
      - 50; // bottom margin in pixels

for (var i=0; i < mouseOverElementIds.length; i++) {
  element = document.getElementById(mouseOverElementIds[i]);
  console.log ("Found div with id=" + element.id)
  element.onmouseenter = function (event) {
    var tooltip = document.getElementById(this.id + "_help_text");
    //console.log ("mouseover for "+ this.id + " at x:" + event.clientX + " y:" + event.clientY)
    onHelpEnter(tooltip);
    if (event.clientY < bottomY) {
      tooltip.style.top = event.clientY + "px";
    } else {
      tooltip.style.top = bottomY + "px";
    }
    if (this.id === "examples" || this.id === "definitions") { // do on left
      tooltip.style.right = window.innerWidth - event.clientX + "px";
    } else { // do on the right side
      tooltip.style.left = event.clientX + "px";
    }
  }
  element.onmouseleave = function () {
    var tooltip = document.getElementById(this.id + "_help_text");
    onHelpExit(tooltip);
  }
}

function onHelpEnter (helpTextElement) {
  if (helpTextTimer === undefined) {
    helpTextTimer = setTimeout(onHelpTimeout,helpDelay, helpTextElement);
  }
}

function onHelpExit (helpTextElement) {
  if (helpTextTimer != undefined) {
    window.clearTimeout (helpTextTimer);
  }
  helpTextElement.style.display="none";
  helpTextTimer = undefined;
}

function onHelpTimeout (helpTextElement) {
  helpTextElement.style.display="block";
  helpTextTimer = undefined;
}

/*
want to fix help_text bubbles so that they are delayed a bit
on entry: set up position and start timer
on timer expiry: show help_text
on exit: stop timer, if running. clear help_text
 */
function closeMenu() {
  document.getElementById("menu").className="closed";
}

function openMenu() {
  document.getElementById("menu").className="";
}

tutorialMenuIds = [ "basicGrammarMenu", "basicConceptsMenu",
                   "advancedConceptsMenu", "animationMenu", "underHoodMenu",
                   "aboutMenu"]

for (var i=0; i < tutorialMenuIds.length; i++) {
  element = document.getElementById(tutorialMenuIds[i]);
  console.log ("Found menu with id=" + element.id)
  element.onclick = function (event) {
    openTutorial();
    window.location.hash = this.href;
    closeMenu();
  }
}
  
document.getElementById("hamburger").onclick = function () {
  if ( document.getElementById("menu").className === "closed") {
    openMenu();
  } else {
    closeMenu();
  }
}
  
document.getElementById("tutorialClose").onclick = function () {
  closeTutorial();
  document.getElementById("menu").className="closed";
}
