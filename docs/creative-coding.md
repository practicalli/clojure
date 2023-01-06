# Creative coding with Clojure
Clojure is a very versatile language and can generate data visualizations and graphics from data.

* [Quil](http://quil.info/) - generate 2D graphics and animations
* [Thi.ng](http://thi.ng/) - computational design tools
* [play.cljc](https://github.com/oakes/play-cljc) - making games (OpenGL and WebGL)
* [Oz](https://github.com/metasoarous/oz) - data visualization and scientific document processing library (see [practicalli/oz-visualisations](https://github.com/practicalli/oz-visualisations) for examples)


## Scalable Vector Graphics
Clojure can generate [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) as they are represented as data.  SVG images are _drawn_ from a collection of points and paths. SVG images keep their quality when made larger or smaller.  Using SVG images for the web and responsive design is highly recommended.

This example of an SVG image is made from:
* a green circle and a smaller blue circle
* a white curvy path

<!-- Hide the reagent include - too much information at this point
     This code doesn't seem to load without manually freshing the page
     Perhaps there is some interference from the Hiccup library  -->
<pre class="hidden">
  <code class="lang-eval-clojure" data-preamble="(require '[reagent.core :as r])">
  </code>
</pre>

```reagent
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

> #### Note::
> Add another path to the code to make a curvy lambda symbol


<hr />

<!--sec data-title="Reveal answer..." data-id="answer001" data-collapse=true ces-->
Add the following path to the above code to make a curvy lambda symbol

```clojure
   [:path {:stroke-width 12
           :stroke "white"
           :fill "none"
           :d "M 75,75 C 50,90 50,110 35,110"}]
```

Or simply replace the code with this example

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


<!--endsec-->
