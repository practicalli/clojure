# Clojure Scalable Vector Graphics - SVG
Scalable Vector Graphics, SVG, is an image format for two-dimensional (2D) graphics.

An SVG image uses data to describe how to draw an image, ensuring that images can shrink and scale easily and retain a high quality image.  As images are formed from data, shapes can easily be combined or intersected to form new shapes.  Using a data format also means SVG images can be created from code and therefore animated.

Raster image formats like gif, jpeg and png use a grid of squares called pixels to define an image (also known as a bitmap). Each pixel has a colour and position in an image.  When zooming into an image the pixels grow larger distorting the sharpness of an image, referred to as [pixelation](https://en.wikipedia.org/wiki/Pixelation), .Multiple versions of raster images are often created at different resolutions to reduce the loss of quality when viewed at different sizes.

> #### Hint::Work in progress

## Concepts

- viewbox
- style - border, background, width, height, stoke, fill, draw (path)
- shapes - circle, path



## Viewbox
A [viewbox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) defines a co-ordinate system for the image. Defining a size for the viewbox defining a frame for the image where positions are relative to that frame, irrespective of the size of the image or how that image is scaled.

A viewbox size should be selected to make the image as simple as possible to define within itself.

Example: [tictactoe O's and X's and the grid that represents the board](https://practical.li/clojurescript/reagent-projects/tic-tac-toe).

tictactoe O's and X's and the grid that represents the board


## Related projects
* TicTacToe with ClojureScript, Reagent and SVG
* System monitoring
* Practicalli SVG examples library
* Programming SVG with Clojure (TODO)

## References
* [SVG: Scalable Vector Graphics - Mozilla Developer network](https://developer.mozilla.org/en-US/docs/Web/SVG)
