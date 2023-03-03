# Generators for predicate specifications
Specifications are used to generate a wide range of random data.  A generator for the specification is obtained and then data is generated.

<!-- Klipse reagent include to generate SVG graphics - hidden as not relevant at this point -->
<pre class="hidden">
  <code class="lang-clojure"
  data-preamble="
  (ns practicalli.generative-testing
    (:require [clojure.spec.alpha :as spec]
              [clojure.spec.gen.alpha :as spec-gen]
              [clojure.spec.test.alpha :as spec-test]))">
  </code>
</pre>



## Predicate generators

```clojure
(spec-gen/generate (spec/gen int?))
```

```clojure
(spec-gen/generate (spec/gen nil?))
```

```clojure
(spec-gen/sample (spec/gen string?))
```

```clojure
(spec-gen/generate (spec/gen #{:club :diamond :heart :spade}))
```

```clojure
(spec-gen/sample (spec/gen #{:club :diamond :heart :spade}))
```

<!-- Example works only for Clojure, not ClojureScript -->
<!-- ```clojure -->
<!-- (spec-gen/sample (spec/gen (spec/cat :k keyword? :ns (spec/+ number?)))) -->
<!-- ``` -->
