all: turtle.html

turtle.html :	examples/*.js\
                examples.js \
                makeJsStrings.sh
	sh makeJsStrings.sh examples


makeJsStrings.sh :
	echo "Changes to makeJsStrings.sh have now been applied"

examples.js :
	echo "examples.js was edited by hand"
