// Sierpinski Triangle -- draw a recursive triangular fractal
// a recursive function is one that calls itself
function sierpinski (order, side) {
    if (order == 0) {
        beginShape()
        forward (side)
        left (120)
        forward (side)
        left (120)
        forward (side)
        left (120)
        fillShape("red")
    } else {
        penup()
        forward (side/2)
        pendown()
        sierpinski( order-1, side/2) // bottom right
        penup()
        left (120)
        forward (side/2)
        right(120)
        pendown()
        sierpinski( order-1, side/2) // top center
        penup()
        right (120)
        forward (side/2)
        left (120)
        pendown()
        sierpinski( order-1, side/2) // bottom left
    }
}


function delayed() {
    if (i < 7) {
        sier( i)
        i = i+1
        delay( delayed, 2000)
    }
}


function sier (order) {
    reset()
    hideturtle()
    side = 2* Math.min(maxX(),maxY()) -20
    penup()
    goto(-side/2, -side/2+20)
    right(90)
    pendown()
    sierpinski( order, side)

    goto (0+10- side/2,minY()+10)
    setfont("bold 16px helvitica,sans-serif")
    write ("Sierpinski triangle of order " + order)  
}

var i ; //global iteration variable

function demo() {
    reset()
    i = 0
    delayed()
}
