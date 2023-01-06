# Organizing the instrumentation of functions
Instrumenting functions creates a wrapper around the original function definition.

When you change the function definition and evaluate the new code, it replaces the instrumentation of the function.  Therefore each time a function is redefined it should be instrumented.

There is no specific way to manage instrumenting a function, however, a common approach is to define a collection of functions to instrument, then use a helper function to instrument all the functions at once.

Bind a name to the collection of function specifications.

```clojure
(def ^:private function-specifications
  [`card-game/deal-cards
   `card-game/winning-player])
```

Define a simple helper function to instrument all the functions in the collection.

```clojure
(defn instrument-all-functions
  []
  (spec-test/instrument function-specifications))
```

Refactoring the code may involve a number of changes benefit from instrumentation being switched off until its complete.  The `unstrument` function will remove instrumentation from all the functions in the collection.

```clojure
(defn unstrument-all-functions
  []
  (spec-test/unstrument function-specifications))
```

> #### Hint::Koacha Test Runner
> [Koacha test runner](https://cljdoc.org/d/lambdaisland/kaocha/CURRENT/doc/1-introduction) can manage the testing of function specifications and is especially useful for managing unit level testing with specifications.
