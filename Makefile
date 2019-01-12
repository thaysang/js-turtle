all: turtle.html gifs


# should separate the production of examples.js and modification of turtle.html

examples.js :   examples/*.js\
                bin/makeJsStrings.sh
	/bin/bash bin/makeJsStrings.sh examples


turtle.html :   examples.js \
                bin/modifyHTML.sh
	/bin/bash bin/modifyHTML.sh examples

makeJsStrings.sh :
	echo "Changes to makeJsStrings.sh have now been applied"

#examples.js :
#	echo "examples.js was edited by hand"

gifs : color_changing_dots.gif \
               conway_fractal_generation.gif \
               conway_pinwheel_divide_generation.gif \
               conway_pinwheel_expand_generation.gif \
               dividing_a_circle.gif \
               dragon_curve.gif \
               fibanocci_sequence.gif \
               gosper_curve_generation.gif \
               hilbert_curve_generation.gif \
               intersection_simulator.gif \
               jumping_jack.gif \
               koch_line.gif \
               koch_snowflake.gif \
               nested_squares.gif \
               polygon.gif \
               sierpinski_curve_order.gif \
               sierpinski_triangle_order.gif \
               star_burst.gif

color_changing_dots.gif : image_series/color_changing_dots_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

conway_fractal_generation.gif : image_series/conway_fractal_generation_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort)  $@

conway_pinwheel_divide_generation.gif : image_series/conway_pinwheel_divide_generation_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

conway_pinwheel_expand_generation.gif : image_series/conway_pinwheel_expand_generation_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

dividing_a_circle.gif : image_series/dividing_a_circle_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

dragon_curve.gif : image_series/dragon_curve_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

fibanocci_sequence.gif : image_series/fibanocci_sequence_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

gosper_curve_generation.gif : image_series/gosper_curve_generation_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

hilbert_curve_generation.gif : image_series/hilbert_curve_generation_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

intersection_simulator.gif : image_series/intersection_simulator_*.png
	convert -delay 200 -loop 0 $(shell ls $^ | sort) $@

jumping_jack.gif :  image_series/jumping_jack_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

koch_line.gif : image_series/koch_line_order_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

koch_snowflake.gif : image_series/koch_snowflake_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

nested_squares.gif : image_series/nested_squares_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

polygon.gif : image_series/polygon_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

sierpinski_curve_order.gif : image_series/sierpinski_curve_order_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

sierpinski_triangle_order.gif : image_series/sierpinski_triangle_order_*.png
	convert -delay 100 -loop 0 $(shell ls $^ | sort) $@

star_burst.gif : image_series/star_burst_*.png
	convert -delay 300 -loop 0 $(shell ls $^ | sort) $@

