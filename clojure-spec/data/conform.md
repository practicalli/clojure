## Does a value conform to a specification?

<!-- Klipse reagent include to generate SVG graphics - hidden as not relevant at this point -->
<pre class="hidden">
  <code class="lang-eval-clojure" data-preamble="(require '[clojure.spec.alpha :as spec])">
  </code>
</pre>


If the value conforms to the spec, a conformed value is returned
```eval-clojure
(spec/conform odd? 101)
```
<!-- => 101 -->


When a value does not conform to a spec, the value `:clojure.spec.alpha/invalid` is returned

```eval-clojure
(spec/conform even? 101)
```
 <!-- => :clojure.spec.alpha/invalid -->


```eval-clojure
(spec/conform integer? 1)
```
 <!-- => 1 -->


```eval-clojure
(spec/conform seq? [1 2 3])
```
 <!-- => :clojure.spec.alpha/invalid -->


```eval-clojure
(spec/conform seq? (range 10))
```
 <!-- => (0 1 2 3 4 5 6 7 8 9) -->


```eval-clojure
(spec/conform map? {})
```
 <!-- => {} -->


```eval-clojure
(spec/conform map? (hash-map :a 1 :b 2))
```
 <!-- => {:b 2, :a 1} -->
