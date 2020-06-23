# Generators for predicate specifications
Specifications are used to generate a wide range of random data.  A generator for the specification is obtained and then data is generated.

<!-- Klipse reagent include to generate SVG graphics - hidden as not relevant at this point -->
<pre class="hidden">
  <code class="lang-eval-clojure"
  data-preamble="
  (ns practicalli.generative-testing
    (:require [clojure.spec.alpha :as spec]
              [clojure.spec.gen.alpha :as spec-gen]
              [clojure.spec.test.alpha :as spec-test]))">
  </code>
</pre>



## Predicate generators

```eval-clojure
(spec-gen/generate (spec/gen int?))
```

```eval-clojure
(spec-gen/generate (spec/gen nil?))
```

```eval-clojure
(spec-gen/sample (spec/gen string?))
```

```eval-clojure
(spec-gen/generate (spec/gen #{:club :diamond :heart :spade}))
```

```eval-clojure
(spec-gen/sample (spec/gen #{:club :diamond :heart :spade}))
```

```eval-clojure
(spec-gen/sample (spec/gen (spec/cat :k keyword? :ns (spec/+ number?))))
```
