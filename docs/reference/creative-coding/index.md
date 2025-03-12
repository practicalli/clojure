# Creative coding with Clojure

Clojure is a very versatile language and can generate data visualizations and graphics from data.

* [Quil](http://quil.info/){target=_blank} - generate 2D graphics and animations
* [Thi.ng](http://thi.ng/){target=_blank} - computational design tools
* [play.cljc](https://github.com/oakes/play-cljc){target=_blank} - making games (OpenGL and WebGL)
* [Oz](https://github.com/metasoarous/oz){target=_blank} - data visualization and scientific document processing library (see [practicalli/oz-visualisations](https://github.com/practicalli/oz-visualisations){target=_blank} for examples)

## Scalable Vector Graphics

Clojure can generate [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) as they are represented as data.  SVG images are _drawn_ from a collection of points and paths. SVG images keep their quality when made larger or smaller.  Using SVG images for the web and responsive design is highly recommended.

This example of an SVG image is made from:

* a green circle and a smaller blue circle
* a white curvy path

```clojure
(defn concentric-circles []
  [:svg {:style {:border "1px solid"
                 :background "white"
                 :width "150px"
                 :height "150px"}}
   [:circle {:r 50, :cx 75, :cy 75, :fill "green"}]
   [:circle {:r 30, :cx 75, :cy 75, :fill "blue"}]
   [:path {:stroke-width 12
           :stroke "white"
           :fill "none"
           :d "M 30,40 C 100,40 50,110 120,110"}]])
```

Add the following path to the above code to make a curvy lambda symbol

```clojure
   [:path {:stroke-width 12
           :stroke "white"
           :fill "none"
           :d "M 75,75 C 50,90 50,110 35,110"}]
```

The complete solution:

```clojure
(defn concentric-circles []
  [:svg {:style {:border "1px solid"
                 :background "white"
                 :width "150px"
                 :height "150px"}}
   [:circle {:r 50, :cx 75, :cy 75, :fill "green"}]
   [:circle {:r 30, :cx 75, :cy 75, :fill "blue"}]
   [:path {:stroke-width 12
           :stroke "white"
           :fill "none"
           :d "M 30,40 C 100,40 50,110 120,110"}]
   [:path {:stroke-width 12
           :stroke "white"
           :fill "none"
           :d "M 75,75 C 50,90 50,110 35,110"}]])
```
