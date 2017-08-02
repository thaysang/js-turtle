#Things To Do
The following are features that should be implemented:

* make the definitions pane stand out more by moving the examples select to the bottom of that pane
* make it more obvious that the definitions pane can be modified
* A better way to control positioning of the three panels, like some sort of sliding division
* Get more error message to show up
* Fix the Run button, so that it executes the command line also.
* A way to fill a closed polygon
	* this may be a mode that turns off the incremental drawing: fillStart, fillEnd
	* such a feature may be great for drawing the fractals also
* Better integration of an instructional pane
	* It should have a lesson: some instruction and some things to do
	* It should have a ghost outline of something to draw
	* It should make sure that the student has accomplised the task.
	* This really duplicates what is done on the Kahn code academy... is this what you want to do??
* should have load and save capability to encourage program development
* maybe record things clicked on the language reference to build programs more easily
* do you need lint? would that be easy to add?
* do you need syntax highlighting? or at least discuss it.
* include the intersection simulator as an example of using the turtle.js as a library on a standalone page.
* figure out how to load examples on the fly.
* figure out a way to display examples hierarchically

#Bugs
* make the run button better
	* if demo() is undefined, just say "Run"
	* make enter work all of the time on the command line
	* demo() needs to be cleared when changing examples (e.g., flag to clock, binary)
	* demo() may be should be called automatically when the example is loaded
* add a visible version number to this thing somewhere
* need some protection from infinite loops (hard to do without injecting code somewhere)mo
* arc and curve test is missing third example
	* Should add example for rounded rectangles
* hexagon tesselation is not working
* circle eye could be bigger, maybe different colors for each inscribed circle
* color changing dots is not working, should start with a clear
* dividing a circle is not working *****Fixed without identifying problem**
* Add tag //*sourceURL=foo.js to bottom of all examples for debugging purposes (or just add ~=definitions.js via the exec command?) <--alternate is better because it works for user entered code
* optionally 

 
#Needed Examples
* simple traffic light simulator
* integrate intersection simulator  ***Done***
* more fractal examples
	* Sierpinski triangle
	* dragon curve ***Done***
        * Hilbert curve ***Done***
        * Gosper curve ***Done***
        * Conway pinwheel ***Done***
* asymmetric tree
* more tessellation examples
	* pentagons
	* herring bone
	* squares
	* shifted squares
	* two square sizes
	* triangles
	* shifted trangles
	* two triangle sizes
        * Conway Pinwheel ***Done***
* star evolution
	* basic 5-pointed star
	* open up points
	* move star (dx, dy)
	* grow star (dSize)
	* spin star (dAngle)
	* move and grow and spin star
	* acceleration
	* array of stars
* star burst... just lines that eminate from the center
* digital clock with 7-segment display
	* function to draw segmented display from segment map ***DONE***
	* function to convert digit to segment map
* digital clock with binary number display
	* function to draw binary number with dots
	* Do year (hundreds), month, day, hour, minute, sec, 1/100 sec
	* Add field labels
* re-label current binary clock as a BCD clock and maybe add year month day + field labels
* compass rose
* circle limit compass rose
* want to add something to make the project more interactive
	* buttons
	* values
	* slider values
	
#Turtle Lessons

- Environment
	- The panes
	- The buttons
	- Help
- First steps
    - Forward
    - Backward
    - Right
    - Left
    - Write (Hello World)
- Repeat loop
	- While
then add size
- Pen control
    - Pen up
    - Pen down
    - Color
    - Pen size/width
- Function
    - Random
	- variables… show polygon functions. first #sides - Stamping
    - Goto (x,y)
    - Set heading/angle
    - Setx
    - Sety
- Variables
- Parameters
- Arcs and curves
    - Curveleft
    - Curveright
    - Circle
    - Dot
- Conditionals
- Recursion
- Animation
    - Animate
    - Delay
