# Generative data from Specifications
Mock and test data values can be generated from the specifications defined.

Require the `clojure.spec.gen.alpha` namespace to access the data generators.  The `clojure.spec.test.alpha` namespace is required to support getting a generator for a given specification.

```eval-clojure
(ns practicalli.card-game.clj
  (:require [clojure.spec.alpha :as spec]
            [clojure.spec.gen.alpha :as spec-gen]
            [clojure.spec.test.alpha :as spec-test]))

(spec/def ::suits #{:clubs :diamonds :hearts :spades})
(spec/def ::rank #{:ace 2 3 4 5 6 7 8 9 10 :jack :queen :king})
```

To generated data based on a specification, first get a generator for a given spec,
```eval-clojure
(spec/gen ::suits)
```

`generate` will return a value using the specific generator for the specification.

```eval-clojure
(spec-gen/generate (spec/gen ::suits))
```

`sample` will generate a number of values from the given specification
```eval-clojure
(spec-gen/sample (spec/gen ::rank))
```
