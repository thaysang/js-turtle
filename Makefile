all: turtle.html


# should separate the production of examples.js and modification of turtle.html

examples.js :   examples/*.js\
                makeJsStrings.sh
	sh makeJsStrings.sh examples

turtle.html :   examples.js \
                modifyHTML.sh
	sh modifyHTML.sh examples

makeJsStrings.sh :
	echo "Changes to makeJsStrings.sh have now been applied"

#examples.js :
#	echo "examples.js was edited by hand"
