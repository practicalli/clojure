# Is the value valid?

spec/valid also checks a value against a specification
returning true or false
rather than :clojure.spec.alpha/invalid


<!-- Klipse reagent include to generate SVG graphics - hidden as not relevant at this point -->
<pre class="hidden">
  <code class="lang-eval-clojure" data-preamble="(require '[clojure.spec.alpha :as spec])">
  </code>
</pre>


```eval-clojure
(spec/valid? even? 180)
```

```eval-clojure
(spec/valid? string? "Am I a valid string")
```
 <!-- => true -->


# using custom predicate functions


```eval-clojure
(spec/valid? (fn [value] (> value 10000)) 30076)
```


```eval-clojure
(spec/valid? #(> % 10000) 30076)
```
