#Project Information
##History
This project was forked from bjpop/js-turtle. This project had the basic turtle functions,
**animate** function,
the immediate execution of the **command** line, and the editable **definitions** area. This was a
substantial portion of this project, and overall had brilliant ideas.

##File Structure
This project consists of several files which are used for a single HTML page.

examples		jsTojsString		turtle (original).js	turtle.html		turtleConsole.js
- **turtle.html** is the main HTML page for this project. It includes the platform layout and the
content of the language reference.
- **turtle.css** controls the formatting and styling of the project.
- **turtle.js** contains the Javascript code for the Logo Turtle Javascript functions. This code could
be included in other projects that want turtle graphics.
- **turtleConsole.js** contains the Javascript code for the platform controls (e.g., language reference
clickons, **Command** box, **RESET** button, **RUN DEMO** button, **STOP** button)
- **examples** is a directory the contains example code in both a native form (e.g., example.js) and
in a string assignment (e.g., example.str.js) form where the
native form is passed as a Javascript string variable to be included in the platform.
- **Makefile** used for maintaining the example Javascript code files for inclusion into the
platform page.
- **jsTojsString** is an executable shell script for converting a Javascript example program into a
Javascript string which can be dynamically loaded into the **Example** box.
- **README.md** is the general read me documentation file for this project and includes a basic user manual.
- **INFORMATION.md** is this documentation file.

##Example Code Processing
Javascript does not have functions that allow it to read files on the computer where it is
being executed. This protects the user from mischeivious code, but makes it somewhat difficult
to load files dynamically. Toward this end, the Javascript examples are converted to strings
that can be loaded as text into the **Example** box. This processing does two things. First it
makes the lines of the program into a Javasscript string and assigns that string to a Javascript
variable. It appends a backslash '/' character to the end of each line which tells Javascript that
the line is continued on the next line. The second thing it does is to inject a '\n' at the end
of each line so that when Javascript loads the string into the **Example** box, it know where the
original lines ended.

This processing is done with a Linux shell program. This was developed on a Macintosh and should
work on Linux machines. A **Makefile** is used to keep track of when a particular example program file
needs to be updated. This allows the updating to be performed with a simple **make** command.

New example files require:
- inclusion within the **Makefile** so that they are updated with the **make** command.
- inclusion of the Javascript string files (e.g., &lt;script src=example.str.js>&lt;/script>) within the **turtle.html**
so that the strings are accessible to Javascript.
- inclusion of the &lt;option> in the **Examples** select within **turtleConsole.js** file.
##Initial Enhancements

The following are the initial enhancements to the forked project:
* re-formatted the language reference to use and unordered list and paragraph tags.
* dropped jQuery thinking that it really wasn't needed and wanted the code to be "easier"
to read in the sence that one would have to know less to read it. With the number of onclick
events, this is now somewhat questionable.
* made the **language reference**examples be "clickable", so that they load the **command** line
and are executed when clicked.
* added synonyms for commands (e.g., colour=color, fd=forward).
* added **setx()** to **sety()** functions to change only the x or y coodinate.
* changed **colour()** to use 16 *standard* logo colors (integer) as well as strings for
all of the Javascript color variations.
* added buttons and samples of the 16 logo *standard* colors to the reference.
* changed **write()** function to apply text along direction of turtle.
* added **curveright()** and **curveleft()** functions to draw arcs with the turtle.
* changed **circle** function to draw circles or arcs centered on the turtle.
* added **dot()** function to draw filled circles centered on the turtle.
* changed **random()** function to allow use with only a high value.
* added **Stop** button for animations.
* added **delay()** function as an alternative for animations.
* added **Run Demo** button for example code in the **definitions** box.
* added select element for selecting and loading Javascript examples.
* developed the shell tools to convert Javascript examples into strings that can be
dynamically loaded into the **definitions** box.
* changed various examples to make them work with the above language changes.


##Things To Do
- [ ] developed a test example that tests the various features of the extensions.
- [ ] made the design responsive to work on smaller screens.
- [ ] added a drawer handle to the **language reference** to allow it to be closed and give
more room to the canvas.
- [ ] allow the examples select and **definitions** box to be hidden to give more room to the canvas.
- [ ] make the command box execute on a second ENTER without other changes (onkeypress?)
- [ ] add more examples:
 - [ ] Sierpinski triangles
 - [ ] Sierpinski carpet
 - [ ] Koch snowflake
 - [ ] circle eye
 - [ ] dividing a circle
 - [ ] random stick men
 - [ ] jumping jack
 - [ ] walking stick man
 - [ ] hexagon tesselation
- [ ] development tools to automatically add examples to the code by placing a '.js' file in 
'examples' directory with the Linux 'make' command.
- [ ] develop lessons to lead a student throught some basic programming concepts. [This may be a
separate selector from the example selector].
 - [ ] moving the turtle and executing a command
 - [ ] drawing a square
 - [ ] using iteration to draw a square
 - [ ] using a function to draw many squares
 - [ ] using recursion to do something repeatedly (Koch snowflake)
 - [ ] animating a function