# Organizing Specifications

Data and function definition specifications are typically placed in a dedicated Specification namespaces.  

Add the data specifications (`spec/def`), custom predicate functions and function specifications (`spec/fdef`) to the `specifications` namespace.

Specifications for an architecture layer can be organised next to the namespaces managing the layer, e.g. database. 

Migrate specifications to a library once they are applicable to multiple projects.

<!-- ![Clojure Spec organising specs - card game example](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-spec-organising-specifications-card-game.png) -->


## Instrumenting functions

Add `spec-test/instrument` expressions to the `specifications` file, after the `spec/fdef` expressions.

Rather than create individual expressions, create a `clojure.core/def` to contain a collection of all the `spec/fdef` expressions.  This list can then be used to `instrument` and `unstrument` all the `spec/fdef` specifications.

```clojure
(def ^:private function-specifications
  [`card-game/deal-cards
   `card-game/winning-player])
```

Write simple helper functions to wrap the instrumenting of function specifications

```clojure
(defn instrument-all-functions
  []
  (spec-test/instrument function-specifications))

(defn unstrument-all-functions
  []
  (spec-test/unstrument function-specifications))
```

## Unit testing

Specifications can be incorporated into the existing unit tests, so it is sensible to keep them under the corresponding `test` directory files.

## Generative testing

Using `spec-test/check` will generate 1000 data values for each expression, so by default these tests will take far longer that other tests.

Configuring generative tests to only generate a small number of values will make `spec-test/check` expressions return almost instantaneously.  In this example, only 10 data values are generated

```clojure
(spec-test/check `deal-cards
                   {:clojure.spec.test.check/opts {:num-tests 10}})
```

Generative testing with small generators can be run regularly during development without impacting fast feedback.

[:fontawesome-solid-book-open: Testing with Clojure Spec](/clojure/clojure-spec/testing/){.md-button} 
