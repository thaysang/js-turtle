/************************************************************************
*  turtleConsole -- javascript for the turtle graphic language console
*
*  Copyright (c) 2015-2019 Kirk Carlson
*  MIT license
************************************************************************/

//console.log("Starting up")

//**GLOBALS***
var helpTextActive = true;


//SUPPORT FUNCTIONS
function cmd (text) {
  document.getElementById("command").value=text;
}


if (window.addEventListener) {
    window.addEventListener("resize", fixDragButton);
} else if (window.attachEvent) {
    window.attachEvent("onresize", fixDragButton);
}


/*************************************************************************
 * onWindowLoad
 *
 * handler for when window loads
 *************************************************************************/

function onWindowLoad() {
    // check if an example was requested in the URL
    var queryString = window.location.search; // was "?..." specified"
    if (queryString != undefined && queryString != "") {
      var code = ""
      var command = ""
      var pos = 0
        //queryString = queryString.substr(1) // get rid of leading '?'... simple case
            // want to (queryStrint + "&").search (/[?&]code=[^=]&/
            // no want to split string up into separate queries... divide on &
            queries = queryString.split('&')
            console.log("queries was: " + queries + ", " + typeof(queries))
            // check specific queries like
            if (queries != undefined && queries.length > 0) {
              for (var i=0; i<queries.length; i = i+1) {
                pos = queries[i].search(/^\??code=/)
                if (pos >=0) {
                   console.log( "ind: " + queries[i] + ", " + typeof(queries[i]))
                   pos = queries[i].indexOf('=')
                   if (pos > 0 && pos < queries[i].length) {
                     code = queries[i].substr(pos + 1)
                     console.log("code query was: " + code + ".")
                   } else {
                     console.log("code query was null")
                   }
                }
                pos = queries[i].search(/^\??command=/)
                if (pos >=0) {
                  pos = queries[i].indexOf('=')
                  if (pos > 0 && pos < queries[i].length) {
                    command = queries[i].substr(pos + 1)
                    console.log("command query was: " + command + ".")
                  } else {
                    console.log("command query was null")
                  }
                }
              }

              if (code != undefined && code != "") {
                sel = document.getElementById('examples') // post to examples selector
                sel.value = code; // set selector to requested string ... onchange hander should take over

                console.log("sel.value: " + sel.value + ".")
                if (sel.value !== undefined && sel.value !== "") {
                  document.getElementById('definitions').value = eval(sel.value);
                  // want to use command if specified, else automatiically execute the demo() function
                  if (command !== undefined || command !== "") { // good enough validation??
                    cmd ("demo()");
                    eval (document.getElementById("definitions").value);
                    console.log("command line: " + document.getElementById("command").value)
                    console.log("definitions: " + document.getElementById("definitions").value)
                    if (demo !== undefined) {
                      console.log("eval \"demo()\"")
                      eval ("demo();");
                    }
                  }
                }
              }

              if (command != undefined && command != "") {
                cmd (command); // boy is this dangerous command could be ANY JAVASCRIPT
                //eval (document.getElementById("definitions").value);
                //if (command !== undefined && command !== "") {
                //  eval (command + "();");
                //}
              }
            }
            //
        //sel = document.getElementById('examples') // post to examples selector
        //sel.value = queryString; // set selector to requested string ... onchange hander should take over
        //document.getElementById('definitions').value = eval(sel.value);
    }
    fixDragButton()
}

/* JUNK...
document.getElementById("examples").onchange = function () {

load goes to fixDragButton
need it to also change the example select if something was specified...

                function pageup() {
                  var queryString = window.location.search;
                  console.log( queryString);
                  name = queryString.substr(1); // get rid of '?'
                  console.log( name);
                  sel = document.getElementById('select1') // point to selector
                  sel.value = name;
                  console.log( sel.innerHTML);
                  var currentOpt = sel.options[sel.selectedIndex].innerHTML;  // selected menu option
                  console.log( currentOpt);
                  console.log( sel.selectedIndex); // index
                }

*/


var draggingleft = false;
var draggingright = false;

function fixDragButton() {
  //console.log("fixDragButton")

  var w = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth; // variations for cross browser support

  var h = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight; // variations for cross browser support

  if (w < 12000) {
    var overallWidth = w;
  } else {
    var overallWidth = 1200;
  }

  // work area height
  var overallHeight = h /* guessed margin */;
  var workAreaHeight = h ; /* - 50 /*top displacement* / - 17 /* guessed margin? */;
  if (workAreaHeight < 400) {
    var canvasHeight = 300;
  } else {
    var canvasHeight = workAreaHeight - 140 /* APPROXIMATION space for controls */;
  }

  var wrapWidth = overallWidth - 2; //leftcolWidth + midcolWidth + rightcolWidth;


  var referencewidth, refLeftPadding , dragleft, containertop, dropbarwidthleft, dropbarwidthright

  var containertop = Number(getStyleValue(document.getElementById("container"), "top").replace("px", ""));

  var wrapElement = document.getElementById("wrap");
  wrapElement.style.width = wrapWidth + "px";
  wrapElement.style.height = overallHeight + "px";

  /* dragbar setup*/

  /* left setup */
  //referenceHeight = getStyleValue(document.getElementById("referencewrapper"), "height").replace("px", ""));
  //var refTitleElement = document.getElementById("referenceTitle");
  var refElement = document.getElementById("reference");
  var leftcolElement = document.getElementById("leftcolumn")

  referenceWidth = Number(getStyleValue(document.getElementById("referencewrapper"), "width").replace("px", ""));
  var refTitleHeight = Number(getStyleValue(document.getElementById("referenceTitle"), "height").replace("px", ""));
  var refLeftPadding = Number(getStyleValue(document.getElementById("reference"), "padding-left").replace("px", ""));

  /* center setup */
  midWidth = getStyleValue(document.getElementById("canvaswrapper"), "width").replace("px","");
  midContainerHeight = getStyleValue(document.getElementById("midcolumncontainer"), "height").replace("px","");
  midLeftPadding = getStyleValue(document.getElementById("canvaswrapper"), "padding-left").replace("px","");
  midRightPadding = getStyleValue(document.getElementById("canvaswrapper"), "padding-right").replace("px","");
  canvasTitleHeight = getStyleValue(document.getElementById("canvastitle"), "height").replace("px","");
  commandWrapperHeight = getStyleValue(document.getElementById("commandwrapper"), "height").replace("px","");
  var canvasHeight = midContainerHeight - canvasTitleHeight - commandWrapperHeight -20;
  var canvasWidth = midWidth - midLeftPadding - midRightPadding;

  /* right setup */
  exampleWidth = Number(getStyleValue(document.getElementById("examplewrapper"), "width").replace("px", ""));
  examplesHeight = Number(getStyleValue(document.getElementById("examples"), "height").replace("px", "")); // basically the select height
  examplesMarginTop = Number(getStyleValue(document.getElementById("examples"), "margin-top").replace("px", "")); // around select height
  examplesMarginBottom = Number(getStyleValue(document.getElementById("examples"), "margin-bottom").replace("px", "")); // around select height

  var rightcolElement = document.getElementById("rightcolumn");
  var definitionsElement = document.getElementById("definitions");
  var definitionsRightPadding = Number(getStyleValue(document.getElementById("definitions"), "padding-right").replace("px", ""));

  /* dragbar attribute setting */
  document.getElementById("dragbarleft").style.width = "5px";
  document.getElementById("dragbarright").style.width = "5px";

  dropbarwidthleft = Number(getStyleValue(document.getElementById("dragbarleft"), "width").replace("px", ""));
  dropbarwidthright = Number(getStyleValue(document.getElementById("dragbarright"), "width").replace("px", ""));

  dragleft = referenceWidth + refLeftPadding + (refLeftPadding / 2) - (dropbarwidthleft / 2);
  dragright = exampleWidth + definitionsRightPadding + (definitionsRightPadding / 2) + (dropbarwidthright / 2);

  document.getElementById("dragbarleft").style.top = containertop + "px";
  document.getElementById("dragbarleft").style.left = dragleft + "px";
  document.getElementById("dragbarleft").style.height = workAreaHeight + "px";/*referenceheight;*/
  document.getElementById("dragbarleft").style.cursor = "col-resize";

  document.getElementById("dragbarright").style.top = containertop + "px";
  document.getElementById("dragbarright").style.right = dragright + "px";
  document.getElementById("dragbarright").style.height = workAreaHeight + "px";/*referenceheight;*/
  document.getElementById("dragbarright").style.cursor = "col-resize";



  /* unknown */

  /* left attribute setting */

  refElement.style.height = workAreaHeight - refTitleHeight -10 + "px";
  //leftcolElement.style.width = leftcolWidth + "px";
  leftcolElement.style.height = workAreaHeight + "px";
  //console.log ("overallheight",overallHeight, "workAreaHeight", workAreaHeight)

  /* center attribute setting */
  imagecanvas.width = canvasWidth;
  imagecanvas.height = canvasHeight;
  turtlecanvas.width = canvasWidth;
  turtlecanvas.height = canvasHeight;
  document.getElementById("canvaswrapper").style.height = canvasHeight +8+ "px";
  //console.log("midWidth:", midWidth, midLeftPadding, midRightPadding);

  var midcolElement = document.getElementById("midcolumn")
  //midcolElement.style.width = (midcolWidth) + "px";
  //midcolElement.style.left = (leftcolWidth + 5) + "px";
  midcolElement.style.height = workAreaHeight + "px";


  /* right attribute setting */

  //rightcolElement.style.left = (leftcolWidth +5 + midcolWidth +5 ) + "px";
  //rightcolElement.style.width = (rightcolWidth - 20 ) + "px";
  rightcolElement.style.height = workAreaHeight + "px";
  //definitionsElement.style.height = (workAreaHeight - examplesHeight - examplesMarginTop - examplesMarginBottom - 10) + "px";
  definitionsElement.style.height = (workAreaHeight - examplesHeight - examplesMarginTop - examplesMarginBottom - 10) + "px";
  //console.log("right examples height", examplesHeight + examplesMarginTop + examplesMarginBottom -10);


  /* junk, holding for now */
/*
  document.getElementById("imagecanvas").style.width = midWidth;
  document.getElementById("turtlecanvas").style.width = midWidth;
// refresh canvases
  imageContext.lineWidth = turtle.width;
  imageContext.strokeStyle = turtle.color;
  imageContext.strokeRect(0,0,canvasWidth,canvasHeight);

  turtleContext.lineWidth = "1px";
  turtleContext.strokeStyle = "lightgray";
  turtleContext.strokeRect(0,0,canvasWidth,canvasHeight);
*/

  //var leftcolElement = document.getElementById("leftcolumn")
  //var rightcolElement = document.getElementById("rightcolumn")
  //var midcolElement = document.getElementById("midcolumn")

/*
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
*/


  //reference.style.height = (workAreaHeight -37) + "px";


// refresh canvases
/*
  imageContext.lineWidth = turtle.width;
  imageContext.strokeStyle = turtle.color;
  imageContext.strokeRect(0,0,canvasWidth,canvasHeight);

  turtleContext.lineWidth = "1px";
  turtleContext.strokeStyle = "lightgray";
  turtleContext.strokeRect(0,0,canvasWidth,canvasHeight);
*/

}

function dragstartleft(e) {
  e.preventDefault();
  draggingleft = true;
}

function dragstartright(e) {
  e.preventDefault();
  draggingright = true;
}

function dragmove(e) {
  if (draggingleft)
  {
    var rect = document.getElementById("dragbarright").getBoundingClientRect();
    //console.log("dragBarRight:", rect.top, rect.right, rect.bottom, rect.left);
    //console.log("window width:", window.innerWidth);
    var rightPercentage = 100 - (rect.left / window.innerWidth) * 100;

    leftPercentage = (e.pageX / window.innerWidth) * 100;
    if (leftPercentage > 1 && leftPercentage < 98) {
      var centerPercentage = 100-leftPercentage-rightPercentage;
      //console.log("left:", leftPercentage, centerPercentage, rightPercentage);
      document.getElementById("leftcolumncontainer").style.width = leftPercentage + "%";
      document.getElementById("midcolumncontainer").style.width = centerPercentage + "%";
      fixDragButton();
    }
  }

  if (draggingright)
  {
    var rect = document.getElementById("dragbarleft").getBoundingClientRect();
    //console.log("dragBarLeft:", rect.top, rect.right, rect.bottom, rect.left);
    //console.log("width:", window.innerWidth);
    var leftPercentage = (rect.right / window.innerWidth) * 100;
    //console.log("leftPercentage:", leftPercentage);

    var rightPercentage = 100 - (e.pageX / window.innerWidth) * 100;
    //console.log("rightPercentage:", rightPercentage);

    if (rightPercentage > 1 && rightPercentage < 98 - leftPercentage) {
      var centerPercentage = 100-rightPercentage-leftPercentage;
      //console.log("right:", leftPercentage, centerPercentage, rightPercentage);
      document.getElementById("rightcolumncontainer").style.width = rightPercentage + "%";
      document.getElementById("midcolumncontainer").style.width = centerPercentage + "%";
      fixDragButton();
    }
  }
}


function dragend() {
  draggingleft = false;
  draggingright = false;
  if (window.editor) {
    window.editor.refresh();
  }
}


if (window.addEventListener) {
  document.getElementById("dragbarleft").addEventListener("mousedown", function(e) {dragstartleft(e);});
  document.getElementById("dragbarleft").addEventListener("touchstart", function(e) {dragstartleft(e);});
  document.getElementById("dragbarright").addEventListener("mousedown", function(e) {dragstartright(e);});
  document.getElementById("dragbarright").addEventListener("touchstart", function(e) {dragstartright(e);});
  window.addEventListener("mousemove", function(e) {dragmove(e);});
  window.addEventListener("touchmove", function(e) {dragmove(e);});
  window.addEventListener("mouseup", dragend);
  window.addEventListener("touchend", dragend);
  window.addEventListener("load", onWindowLoad);
}


function getStyleValue(elmnt,style) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elmnt,null).getPropertyValue(style);
    } else {
        return elmnt.currentStyle[style];
    }
}


//EVENT PROCESSING FUNCTIONS
function stopClicked() {
  //console.log("stop clicked")
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
  if (demo !== undefined) {
    eval ("demo();");
  }
}


// begin of file read stuff
function loadChanged(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('definitions');
  //element.textContent = contents;
  element.value = contents;
}


// end of file read stuff

var get_blob = function() {
   return Blob;
}

function saveClicked() {
    event.preventDefault();
    var BB = get_blob();
    saveAs(
        new BB(
            [definitions.value || definitions.placeholder]
            , {type: "text/plain;charset=" + document.characterSet}
        )
        , (code_filename.value || code_filename.placeholder) + ".js"
    );
    return false;
}


function clearClicked() {
  //console.log("clear clicked")
  document.getElementById("definitions").value = "";
}

function infoClicked() {
  helpTextActive = !helpTextActive;
  if (helpTextActive) {
    document.getElementById("infoButton").style.color = "blue";
    document.getElementById("infoButton").style.borderColor = "blue";
  } else {
    document.getElementById("infoButton").style.color = "gray";
    document.getElementById("infoButton").style.borderColor = "gray";
  }
}

// Set up all reference code elements to be linked and have onclick functionality
var codeElements = document.querySelectorAll ("#reference code");
for (var i=0; i< codeElements.length; i++) {
  codeElements[i].className = "linked";
  codeElements[i].onclick = function () {
    cmd (this.innerHTML + ";");
    commandChanged();
  }
}

// Set up all color button elements to be linked and have onclick functionality
var codeElements = document.querySelectorAll ("#reference button");
for (var i=0; i< codeElements.length; i++) {
    //console.log(codeElements[i].id)
    codeElements[i].onclick = function () {
      cmd ("color(\"" + this.id +"\");");
      commandChanged();
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
document.getElementById("runButton").onclick=runClicked
document.getElementById("infoButton").onclick=infoClicked;
document.getElementById("body").onresize=fixDragButton;
document.getElementById("stopButton").onclick=stopClicked;
document.getElementById("stopButton").hidden=true;
document.getElementById("saveButton").onclick=saveClicked;
document.getElementById("clearButton").onclick=clearClicked;


document.getElementById("file-input")
  .addEventListener('change', loadChanged, false);


//window.addEventListener("resize", resizeColumns());
//resizeColumns();


/*
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
  //kirk document.getElementById("examples").className = "open";
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
*/

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


/*
document.getElementById("referenceClose").onclick = function () {
  closeReferenceDrawer();
}
*/

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

document.getElementById("viewHelpText").onclick = function () {
  if (helpTextActive === true) {
    document.getElementById("viewHelpTextItem").className = "";
    helpTextActive = false;
  } else {
    document.getElementById("viewHelpTextItem").className = "checked";
    helpTextActive = true;
  }
  closeMenu();
}

/*
document.getElementById("definitionsClose").onclick = function () {
  closeDefinitionsDrawer();
}
*/

mouseOverElementIds = ["reference","turtlecanvas", "examples", "definitions",
                       "command", "infoButton",
                       "resetButton", "runButton", "stopButton",
                       "saveButton", "loadButton", "clearButton", "code_filename",
                       "dragbarright","dragbarleft"
                       ];
/*
"hamburger"
*/
var helpTextTimer; // global for delaying all help text
var helpDelay = 1000; // global delay in milliseconds for all help text
var bottomY = (window.innerHeight // global for lowest Y on page for tool tip
      || document.documentElement.clientHeight
      || document.body.clientHeight) // variations for cross browser support
      - 50; // bottom margin in pixels

for (var i=0; i < mouseOverElementIds.length; i++) {
  element = document.getElementById(mouseOverElementIds[i]);
  element.onmouseenter = function (event) {
    var tooltip = document.getElementById(this.id + "_help_text");
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
  if ((helpTextActive ||
       (helpTextElement == document.getElementById("infoButton_help_text"))) &&
       helpTextTimer === undefined) {
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
  document.getElementById("menu").onBlur=closeMenu;
}


tutorialMenuIds = [ "basicGrammarMenu", "basicConceptsMenu",
                   "advancedConceptsMenu", "animationMenu", "underHoodMenu",
                   "aboutMenu"]

for (var i=0; i < tutorialMenuIds.length; i++) {
  element = document.getElementById(tutorialMenuIds[i]);
  element.onclick = function (event) {
    openTutorial();
    window.location.hash = this.href;
    closeMenu();
  }
}

/*
document.getElementById("hamburger").onclick = function () {
  if ( document.getElementById("menu").className === "closed") {
    openMenu();
  } else {
    closeMenu();
  }
}
*/

document.getElementById("tutorialClose").onclick = function () {
  closeTutorial();
  document.getElementById("menu").className="closed";
}

//console.log ("Ending Startup")
