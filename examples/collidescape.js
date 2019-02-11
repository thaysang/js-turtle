// Collidescape (tm) -- aperiodic tiling researched by Ward Hollins.
// angles for the two isosceles triangles are: 
// 36, 72, 72 and 36, 36, 108 ..degrees
//  1,2,2 and 1,1,3 times pi/5 .. radians
ang = 360/10 // the basic angle (pi/5 radians)
side = 50 // length of the common side of the isosceles triangles
bBase = 2* side * Math.cos( degToRad( ang)) // length of big base
sBase = 2* side * Math.sin( degToRad( ang/2)) // length of small base


function bb (fColor) { //big piece, big angle
    beginShape()
    forward( side)
    right( 4 * ang)
    forward( bBase)
    right( 4 * ang)
    forward( side)
    right( 180)
    fillShape( fColor)
}


function bs (fColor) { // big piece, small angle
    beginShape()
    forward( side)
    right( 2 * ang)
    forward( side)
    right( 4 * ang)
    forward( bBase)
    right( 180)
    fillShape( fColor)
}


function bs2 (fColor) { // big piece, small angle other corner
    beginShape()
    forward( bBase)
    right( 4 * ang)
    forward( side)
    right( 2 * ang)
    forward( side)
    right( 180)
    fillShape( fColor)
}


function ss (fColor) { // small piece, small angle
    beginShape()
    forward( side)
    right( 3 * ang)
    forward( sBase)
    right( 3 * ang)
    forward( side)
    right( 180)
    fillShape( fColor)
}


function sb (fColor) { // small piece, big angle
    beginShape()
    forward( sBase)
    right( 3 * ang)
    forward( side)
    right( 4 * ang)
    forward( side)
    right( 180)
    fillShape( fColor)
}


function sb2 (fColor) { // small piece, big angle other corner
    beginShape()
    forward( side)
    right( 4 * ang)
    forward( side)
    right( 3 * ang)
    forward( sBase)
    right( 180)
    fillShape( fColor)
}


function spiral( ) {
// function draws a spiral using only two isosceles triangles
// this is done with a series of points. Each point starts at the
// center of the spiral and moves to the point where several triangles
// are drawn. This technique isolates changes, but is less efficient
// overall.
//
// Numbers for each point can be included by uncommenting the "//write"
// statements.

    c1 = "yellow"
    c2 = "blue"
    for (var i=0; i<5; i++) {
//point0:
        goto(0,0)
        setHeading( (i * 2 + 1) * ang)
        bs( c2)

//point1:
	penup()
        goto(0,0)
        setHeading( (i * 2 + 1) * ang)
        forward( bBase)
	pendown()

        bs( c2)
        bs( c2)
        bs2( c1)
        sb2( c1)
        bs2( c1)
        ss( c2)
        bb( c2)
        //write( "1")

//point2:
	penup()
        goto(0,0)
        setHeading( (i * 2 + 1) * ang)
        bs( c2)
        forward( bBase + side)
        left( 3 * ang)
	pendown()

        ss( c2)
        ss( c2)
        bb( c2)
        //write( "2")

//point3:
	penup()
        goto(0,0)
        setHeading( (i +1) * 2* ang)
        forward( bBase + side)
        left( 2 * ang)
        forward( side)
        left( 2 * ang)
	pendown()

        bs( c1)
        bs2( c1)
        ss( c1)
        ss( c1)
        bs( c1)
        //write( "3")

//point4:
	penup()
        goto(0,0)
        setHeading( i * 2 * ang)
        forward( bBase)
        right (ang)

	pendown()
        bs( c1)
        left ( ang)

	penup()
        forward( bBase)
	pendown()

        bs( c2)
        sb( c1)
        sb2( c1)
        bs2( c1)
        bs( c2)
        bs2( c2)
        ss( c2)
        ss( c2)
        //write( "4")

//point5:
	penup()
        goto(0,0)
        setHeading( (i +1) * 2* ang)
        forward( bBase + side)
        left( 2 * ang)
        forward( side + side + sBase)
        left( 2 * ang)
	pendown()

        bs2( c2)
        sb2( c2)
        sb( c2)
        sb2( c2)
        sb( c2)
        //write( "5")

//point6:
	penup()
        goto(0,0)
        setHeading( i * 2* ang)
        forward(  bBase + side + bBase)
        left( 3 * ang)
	pendown()

        bs2( c1)
        bb( c1)
        bs( c1)
        bs2( c1)
        bb( c1)
        //write( "6")

//point7:
	penup()
        goto(0,0)
        setHeading(( i + 1)* 2 * ang)
        forward(  bBase + side)
        left( 2 * ang)
        forward( side + side)
        right( 2* ang)
        forward( side)
        left ( 3 * ang)
	pendown()

        sb2( c2)
        sb( c2)
        ss( c2)
        bb( c2)
        //write( "7")

//point8:
	penup()
        goto(0,0)
        setHeading(( i + 1)* 2 * ang)
        forward(  bBase + side)
        left( 2 * ang)
        forward( side + side)
        right( 3 * ang)
        forward( bBase + side)
	pendown()

        ss( c2)
        sb2( c2)
        sb( c2)
        ss( c2)
        sb2( c2)
        sb( c2)
        //write( "8")

//point9:
	penup()
        goto(0,0)
        setHeading( i * 2* ang)
        forward(  bBase + side + bBase) //@6
        left( 2 * ang)
        forward( side)
        right( ang)
        forward( sBase + sBase)
        right( 3 * ang)
	pendown()

        sb2( c2)
        sb( c2)
        bb( c1)
        ss( c1)
        bs( c1)
        bs2( c1)
        //write( "9")

//point10:
	penup()
        goto(0,0)
        setHeading( i * 2 * ang)
        forward(  bBase + side + bBase) //@6
        right( 2 * ang)
        forward( bBase)
        left( 4 * ang)
	pendown()

        sb2( c1)
        sb( c1)
        sb2( c1)
        sb( c1)
        //write( "10")

//point11:
	penup()
        goto(0,0)
        setHeading( i * 2 * ang)
        forward(  bBase + side + bBase) //@6
        right( 2 * ang)
        forward( bBase + side)
        right( 1 * ang)
        forward( side)
	pendown()

        bb( c1)
        bs( c1)
        bs2( c1)
        //write( "11")

//point12:
	penup()
        goto(0,0)
        setHeading( i * 2 * ang)
        forward(  bBase + side + bBase) //@6
        right( 2 * ang)
        forward( bBase + side)
        right( ang)
        forward( side) // @11
        forward(side)
	pendown()

        bb( c1)
        bs( c1)
        //write( "12")

//point13:
	penup()
        goto(0,0)
        setHeading(( i + 1)* 2 * ang)
        forward(  bBase + side)
        left( 2 * ang)
        forward( side + side)
        right( 3 * ang)
        forward( bBase + side) //@8
        right( ang)
        forward( side)
        left( 3 * ang)
	pendown()

        sb( c2)
        bs( c2)
        bs2( c2)
        bb( c2)
        //write( "13")

//point14:
	penup()
        goto(0,0)
        setHeading( (i +1) * 2 * ang)
        forward( bBase + side)
        left( 2 * ang)
        forward( side + side + sBase) // @5
        left(  ang)
        forward( side)
        right( 2* ang)
        forward( side + side)
	pendown()

        bs( c1)
        bs2( c1)
        bb( c2)
        bs( c2)
        bs2( c2)
        bb( c1)
        //write( "14")

//point15:
	penup()
        goto(0,0)
        setHeading(( i + 1)* 2 * ang)
        forward(  bBase + side)
        left( 2 * ang)
        forward( side + side)
        right( 3 * ang)
        forward( bBase + side) //@8
        right( ang)
        forward( side) //@13
        forward( bBase)
        left( ang)
        forward( side)
	pendown()

        bs( c2)
        bs2( c2)
        bb( c1)
        bs( c1)
        bs2( c1)
        bb( c2)
        //write( "15")

//point16:
	penup()
        goto(0,0)
        setHeading( i * 2* ang)
        forward(  bBase + side + bBase) //@6
        left( 2 * ang)
        forward( side)
        right( ang)
        forward( sBase + sBase) //@9
        right( 2 * ang)
        forward( bBase)
        right( ang)
        forward( side)
        left( 2* ang)
	pendown()

        bs( c2)
        bs2( c2)
        bb( c1)
        bs( c1)
        bs2( c1)
        bb( c2)
        //write( "16")

//point17:
	penup()
        goto(0,0)
        setHeading( i * 2* ang)
        forward(  bBase + side + bBase) //@6
        left( 2 * ang)
        forward( side)
        right( ang)
        forward( sBase + sBase) //@9
        right( 2 * ang)
        forward( bBase)
        right( ang)
        forward( side) //@16
        forward( side)
        left( 2 * ang)
	pendown()

        ss( c2)
        sb2( c2)
        sb( c1)
        bs( c1)
        //write( "17")

//point18:
	penup()
        goto(0,0)
        setHeading( (i +1) * 2 * ang)
        forward( bBase + side)
        left( 2 * ang)
        forward( side + side + sBase) // @5
        left(  ang)
        forward( side)
        right( 2 * ang)
        forward( side + side) //@14
        right( 2 * ang)
        forward( side) //@ intermediate point
        right( 3 * ang)
	pendown()

        bs( c2)
        right( 4 * ang)
        //write ( "14b")
        bs( c1)
        right( 1 * ang)

	penup
        forward( side)
	pendown()

        bb( c2)
        bs( c2)
        bs2( c2)
        bb( c1)
        bs( c1)
        bs2( c1)
        //write( "18")

//point19:
	penup()
        goto(0,0)
        setHeading( (i +1) * 2 * ang)
        forward( bBase + side)
        left( 2 * ang)
        forward( side + side + sBase) // @5
        left(  ang)
        forward( side)
        right( 2 * ang)
        forward( side + side) //@14
        right( 2 * ang)
        forward( side + side + side)
        left( 2*ang)
	pendown()

        ss( c1)
        sb2( c1)
        sb( c2)
        bs( c2)
        //write( "19")

//point20:
	penup()
        goto(0,0)
        setHeading( (i +1) * 2 * ang)
        forward( bBase + side)
        left( 2 * ang)
        forward( side + side + sBase) // @5
        left(  ang)
        forward( side)
        right( 2 * ang)
        forward( side + side) //@14
        right( 2 * ang)
        forward( side + side + side) //@19
        right( ang)
        forward( sBase)
        left( 3*ang)
	pendown()

        ss( c1)
        sb2( c1)
        sb( c2)
        ss( c2)
        //write( "20")

//point21:
	penup()
        goto(0,0)
        setHeading( (i +1) * 2 * ang)
        forward( bBase + side)
        left( 2 * ang)
        forward( side + side + sBase) // @5
        left(  ang)
        forward( side)
        right( 2 * ang)
        forward( side + side) //@14
        right( 2 * ang)
        forward( side + side + side)
        right( ang)
        forward( sBase) //@20
        forward( sBase)
        left( 3*ang)
	pendown()

        ss( c1)
        bs( c1)
        bs2( c1)
        bb( c2)
        //write( "21")

//point22:
	penup()
        goto(0,0)
        setHeading( (i +1) * 2 * ang)
        forward( bBase + side)
        left( 2 * ang)
        forward( side + side + sBase) // @5
        left(  ang)
        forward( side)
        right( 2 * ang)
        forward( side + side) //@14
        right( 2 * ang)
        forward( side + side + side)
        right( ang)
        forward( sBase + sBase) //@21
        forward( side)
        left( 2*ang)
	pendown()

        bs( c1)
        bs2( c1)
        bb( c2)
        bs( c2)
        //write( "22")

//point23:
	penup()
        goto(0,0)
        setHeading( i * 2* ang)
        forward(  bBase + side + bBase) //@6
        left( 2 * ang)
        forward( side)
        right( ang)
        forward( sBase + sBase) //@9
        right( 2 * ang)
        forward( bBase)
        right( ang)
        forward( side + side) //@17
        right( ang)
        forward( sBase)
        left( 3 * ang)
	pendown()

        ss( c2)
        bs( c2)
        //write( "23")
   }
}


function demo () {
    reset()
    wrap(false)
    pendown()
    spiral( )
}
