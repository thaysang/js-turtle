all: turtle.html gifs


# use the headers from index.html to update headers in other files
# turtle.html does not have the header
# overview.html is linked to index.html (the default file loaded)
turtleHeaderDummy : about.html \
                    animation.html \
                    examples.html \
                    guide.html \
                    javascript.html \
                    nerd.html \
                    reference.html \
                    tutorial.html
	/bin/bash bin/syncHeader.sh $?;\
	touch turtleHeaderDummy


# see if links in files are OK
linkTestDummy :  bin/checkLinks.sh \
                 turtleHeaderDummy
	/bin/bash bin/checkLinks.sh;\
	touch linkTestDummy


# update the example strings if any example has changed
examples.js :   examples/*.js\
                bin/buildJsStrings.sh
	/bin/bash bin/buildJsStrings.sh examples


# update the turtle.html if the examples strings has changed
turtle.html :   linkTestDummy \
                turtleHeaderDummy \
                examples.js \
                bin/modifyHTML.sh
	/bin/bash bin/modifyHTML.sh examples

buildJsStrings.sh :
	echo "Changes to buildJsStrings.sh have now been applied"

# build the animated gif files
gifs : images/color_changing_dots.gif \
       images/conway_fractal_generation.gif \
       images/conway_pinwheel_divide_generation.gif \
       images/conway_pinwheel_expand_generation.gif \
       images/dividing_a_circle.gif \
       images/dragon_curve.gif \
       images/fibanocci_sequence.gif \
       images/gosper_curve_generation.gif \
       images/hilbert_curve_generation.gif \
       images/intersection_simulator.gif \
       images/jumping_jack.gif \
       images/koch_line.gif \
       images/koch_snowflake.gif \
       images/nested_squares.gif \
       images/polygon.gif \
       images/sierpinski_curve_order.gif \
       images/sierpinski_triangle_order.gif \
       images/star_burst.gif

# build an individual .gif file from series of .png files
# individual commands here allow for customizing the delay
images/color_changing_dots.gif :\
		image_series/color_changing_dots_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/conway_fractal_generation.gif :\
		image_series/conway_fractal_generation_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort)  $@

images/conway_pinwheel_divide_generation.gif :\
		image_series/conway_pinwheel_divide_generation_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/conway_pinwheel_expand_generation.gif :\
		image_series/conway_pinwheel_expand_generation_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/dividing_a_circle.gif :\
		image_series/dividing_a_circle_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/dragon_curve.gif :\
		image_series/dragon_curve_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/fibanocci_sequence.gif :\
		image_series/fibanocci_sequence_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/gosper_curve_generation.gif :\
		image_series/gosper_curve_generation_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/hilbert_curve_generation.gif :\
		image_series/hilbert_curve_generation_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/intersection_simulator.gif :\
		image_series/intersection_simulator_*.png
	convert -delay 200 -loop 0 $(shell ls $^ | sort) $@

images/jumping_jack.gif : \
		image_series/jumping_jack_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/koch_line.gif :\
		image_series/koch_line_order_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/koch_snowflake.gif :\
		image_series/koch_snowflake_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/nested_squares.gif :\
		image_series/nested_squares_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/polygon.gif :\
		image_series/polygon_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/sierpinski_curve_order.gif :\
		image_series/sierpinski_curve_order_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/sierpinski_triangle_order.gif :\
		image_series/sierpinski_triangle_order_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

images/star_burst.gif :\
		image_series/star_burst_*.png
	convert -delay 300 -loop 0 $(shell ls $^ | sort) $@

