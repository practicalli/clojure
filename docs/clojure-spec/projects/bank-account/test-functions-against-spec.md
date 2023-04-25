## Generative testing with `check`

`clojure.spec.test.alpha/check` generates 1000 values from the argument section of a function definition specification.

Pass the name of the function definition that has a specification to the `check` function.

```clojure
(spec-test/check ``register-account-holder`)
```

## Limiting the generated data

1000 tests can take a noticeable time to run, so check is not as often used during active development, as it would slow down the normal fast feedback cycle with Clojure.

`check` takes an optional second argument which configures how the function operates.  Passing a hash-map as a second argument will set the number of data values generated `{:clojure.spec.test.check/opts {:num-tests 100}}`

```clojure
(spec-test/check
  `register-account-holder
  {:clojure.spec.test.check/opts {:num-tests 100}})
```

Configuring `check` to run fewer tests provides a simple way to test multiple values without slowing down the development workflow.

## Reporting on Generative testing

`clojure.spec.test.alpha/summarize-results` will return a brief summary including the total number of results and a count for how many results passed and failed.

```clojure
(spec-test/summarize-results
  (spec-test/check `register-customer
                   {:clojure.spec.test.check/opts {:num-tests 10}}))
```

Use the threading macro to summarize the results of multiple check operations

```clojure
(->> (spec-test/check `register-account-holder)
     (spec-test/check `open-current-bank-account)
     (spec-test/summarize-results))
```

If this expression is bound to a name then it can be called when ever the full suite of `check` generative testing is required.
