# Turtle Graphics for Javascript

This project provides Javascript functions based on Logo Turtle graphics that runs on common browsers.
It uses the graphics canvas which became part of Javascript in HTML5.
The functions allow the use of graphics with less math skills than basic Javascript canvas commands.
Logo was a programming language developed by MIT. Logo graphics is a subset of the Logo language
and has be used to teach programming for many years. The basic concept is that graphics
are drawn by a turtle. The turtle is issued commands
like **forward**, **backward**, **right**, or **left** and the turtle would move accordingly.
The turtle has a pen that leaves a mark as the turtle moves. The pen can be controlled by
commands like **penup**, **pendown**, **width**, and **color**.

The original Logo was its own language. This project does not attempt to rebuild that language, but
rather to take the functions of Logo turtle graphics and implement them as Javascript functions
using the Javascript syntax and parsing.

This project also can be a platform for teaching Javascript programming, since it provides an
environment for immediate execution of Javascript which is intended to be used to generate graphics
on the canvas. Since the Javascript syntax is used, this platform can be used to teach Javascript
programming.

## User Guide

The screen is divided into four main areas:
* **Language Reference** is a guide to the Logo Turtle Graphic functions.
* **Canvas** is the area where the graphics are drawn.
* **Command** is an area with controls for entering Logo Turtle Graphic Javascript code or for controlling
the examples
* **Examples** is an area for loading, displaying, and editing Logo Turtle Graphic programs.

Each of these areas is explained in more detail below.


### Language Reference
This area contains a guide to the Logo Turtle Graphics functions. Each function is described along
with the parameters that it may use. Parameters are enclosed in parentheses '(' and ')' These parentheses
must be included when invoking the function. Optional
parameters and separating commas ',', are enclosed in square brackets '[' and ']'. The square
brackets are not used when invoking the function.
After the function usage description is one or more examples of how the function can be used.
This example is clickable, which when clicked causes the example to be entered into the **command** box
and executed immediately. This allows the reader to directly experiment with the function. The user may
edit the parameters in the **command** box to see their effect.

This platform uses Javascript. All functions are Javascript functions and Javascript syntax must
be used.
When functions are
used in Javascript the function name must be followed by the parentheses,
even when no parameter is being passed,(e.g., **pendown()**)
Multiple Javascript expressions on a single line such as the **command** box must be separated with
semicolon ';' characters. A single expression may or may not include the ending semicolon
(e.g., **pendown();** or **pendown()**)

Code **comments** are a way for programmers to leave notes to themselves or others about the
operation of the program. Comments are not executed. Javascript has two ways to include comments.
The single line method starts a comment with a double slash '//' and the comment extends to
the end of the line.
The other method uses slash-star combination '/\*' to start a comment and star-slash combination '\*/'
to end a comment. This type of
comment is normally a multi-line comment, but can be used to insert a comment in the middle of
a line of code. This method cannot be nested, so the comment will end when the first star-slash
combination is encountered.

While many programs can be written with the Logo Graphics functions alone, it is possible (and
sometime necessary or desirable) to use the full power of the Javascript language. The use of
Javascript can be found elsewhere.

### Canvas
The canvas is the area where the graphics are drawn. When the platform is stared up or reset
the turtle is moved to the center of the canvas. The turtle is represented as a triangle pointing
in the direction that the turtle will move if issued a forward() command.

The canvas is described with a coordinate system. The center is (0,0) or an X-coordinate of zero
and a Y-coordinate of 0.
Positive X-coordinates increase to the right of center.
Negative X-coordinates increase to the left of center.
Positive Y-coordinates increase from the center toward the top of the canvas.
Negative Y-coordinates increase from the center toward the bottom of the canvas.
This mimics the cartesian coordinate system used in algebra. Note that this coordinate
system is different than the normal Javascript canvas coordinate system.
The Logo Turtle Graphics functions hide these differences and much of the
mathematical complexity from the user.
### Command Area
The command area has controls for entering Logo Turtle Graphic Javascript code and for controlling
the execution of example code.
A Javascript expression including Logo Turtle Graphic functions can be entered into the **Command**
box. When **ENTER** is pressed, the expression is executed. Successful graphic functions are
immediately displayed on the canvas. Syntax (e.g., missing parentheses, incorrect function name,
negative radius values)
and other errors are shown on the Javascript console which is accessed through the developer
tools of the browser being used.

The **RESET** button can be used to clear the canvas, move the turtle to the center of the canvas,
and initialize the platform.

The **RUN DEMO** button can be used to run code in the **Example** box provided that the
code includes a **demo()** function.

When the example code executes either **animate()** or **delay()** functions, a **STOP**
button will appear allowing the user to stop the animation in progress without clearing
the canvas. The **RESET** button will also stop the animation, but it clears the canvas.

Any code in the **Example** area is evaluated when the **ENTER** key is issued within
the **Command** box. So the last line of the example code could invoke any of its functions,
(e.g., **demo();**) which could in turn be executed with an **ENTER** key issued from an
empty **Command** box.
### Example Area
The example is an area for loading, displaying, and editing Logo Turtle Graphic programs.
Several examples are available in the select menu above the **Example** box.
Selecting an example causes the example to be loaded, but not executed. The user must
press the **RUN DEMO** button to execute the example code.

The user may edit the example code to make minor modifications or to try out new code.
Changes will survive reloading of the page, but will not be saved in general. To save
the modified code, select all of the code, paste it into your favorite text editor, and
save it. If desired, one can modify the platform code to load the new code with
the **Examples** select menu. This is current beyond the scope of these directions.
## Limitations
Not all errors are caught. Many errors are displayed on the Javascript console. To access the
Javascript console, one must turn it on. Firefox does this with Firebug console accessed
through the developer tools. Chrome can access the console through its developer tools.
[More specific information is needed here.]

It is not easy to intermix the Logo Turtle Graphic functions with the normal Javascript
canvas methods. As a result, filling a bounded area is not currently possible.

The full Logo language is not implemented here, nor is its syntax. This is only a set of Javascript
functions that mimic the Logo Turtle Graphics part of the Logo language.
