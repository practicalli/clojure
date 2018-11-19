# core.async scenario: Bike assembly line

> #### TODO::work in progress, sorry
> Pull requests are welcome


In this example we are going to use a bicycle assembly line as the process we want to make concurrent.  The tasks involved in making our bicycle are:

* Making the frame
* Painting the wheels
* Making the rims
* Making the wheels (adding hub and spokes to wheels - different hub for front and rear wheels)
* Making the handlebars
* Fitting tyres to the rims (solid rims, so no tubes)
* Attaching the handlebars to the frame
* Attaching wheels to the frame
* Attaching crank to frame
* Attaching peddles to the crank
* Connecting control system wires (gears, breaks)

## Current build process

At the moment, each person creates one bicycle all by themselves.  This means they need all sorts of different tools and are switching tasks all the way through assembling the bike.

We want to move to a more parallel approach, so as we automate this process we will evaluate what actions can be done in parallel and which must be done sequentially (i.e. painting the frame must come after making the frame).
