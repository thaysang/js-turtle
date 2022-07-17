// Waves -- wave interference patterns

//draw the radials
function drawRadials(side) {
	for (var i=0; i<16; i++) {
		goto(0,0)
		angle(i/16 * 360)
		forward( size)
	}
}

/*
need to calculate the angles for starting and stopping the arcs.
distances are known. This math is a bit tough.

*/


//
function demo() {
	reset()
	wrap(false)
	hideTurtle()
	size=200
	step = 4
	n = 2* size/step
	goto(0,0)
	circle( size)
	goto(size,0)
	for( var i=0; i< n; i=i+step){
		arc(i * step, 180, false)
	}
	goto(-size,0)
	for( var i=0; i< n; i=i+step){
		arc(i * step, 180, true)
	}
}
