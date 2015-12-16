all: turtle.html

turtle.html :	examples/bounce.str.js \
		examples/clock.str.js \
		examples/nested_hexagons.str.js \
		examples/nested_squares.str.js \
		examples/polygon.str.js \
		examples/randstripe.str.js \
		examples/sierpinski.str.js \
		examples/spinning_squares.str.js \
		examples/spiral.str.js \
		examples/tree.str.js

examples/bounce.str.js : examples/bounce.js jsTojsString.sh
	./jsTojsString.sh examples/bounce.js bounceString examples/bounce.str.js

examples/clock.str.js : examples/clock.js jsTojsString.sh
	./jsTojsString.sh examples/clock.js clockString examples/clock.str.js

examples/nested_squares.str.js : examples/nested_squares.js jsTojsString.sh
	./jsTojsString.sh examples/nested_squares.js nested_squaresString examples/nested_squares.str.js

examples/nested_hexagons.str.js : examples/nested_hexagons.js jsTojsString.sh
	./jsTojsString.sh examples/nested_hexagons.js nested_hexagonsString examples/nested_hexagons.str.js

examples/polygon.str.js : examples/polygon.js jsTojsString.sh
	./jsTojsString.sh examples/polygon.js polygonString examples/polygon.str.js

examples/randstripe.str.js : examples/randstripe.js jsTojsString.sh
	./jsTojsString.sh examples/randstripe.js randstripeString examples/randstripe.str.js

examples/sierpinski.str.js : examples/sierpinski.js jsTojsString.sh
	./jsTojsString.sh examples/sierpinski.js sierpinskiString examples/sierpinski.str.js

examples/spinning_squares.str.js : examples/spinning_squares.js jsTojsString.sh
	./jsTojsString.sh examples/spinning_squares.js spinning_squaresString examples/spinning_squares.str.js

examples/spiral.str.js : examples/spiral.js jsTojsString.sh
	./jsTojsString.sh examples/spiral.js spiralString examples/spiral.str.js

examples/tree.str.js : examples/tree.js jsTojsString.sh
	./jsTojsString.sh examples/tree.js treeString examples/tree.str.js

jsTojsString.sh :
	echo "Changes to jsTojsString.sh have now been applied"
