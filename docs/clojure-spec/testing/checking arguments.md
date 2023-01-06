# Checking arguments in function calls with specifications


## Instrument functions during development
Instrumenting a function enables the checking of arguments in a function call against the specification defined in an `fdef` definition of the same name.

```clojure
(clojure.spec.test.alpha/instrument `function-name)
```

Instrumenting a function swaps the function definition var with a wrapped version of the function definition which includes tests the `:args` spec from the `fdef` expression.

`unstrument` returns the function definition to the original form and tests for that function are no longer run.


## Unit (Specification) testing

You can generate data for interactive testing with gen/sample.
