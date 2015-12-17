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
  document.getElementById('definitions').value = eval(this.value + "String");
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
