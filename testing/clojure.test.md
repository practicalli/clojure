# Testing with `clojure.test`

`clojure.test` is a test library that is already part of Clojure and test package hierarchy is typically created (e.g. when generating Clojure projects with Leiningen).

As with other unit testing libraries you use `clojure.test` to write test.  These tests are defined as functions that contain one or more assertions.

As a general guideline, a Clojure test function should test a specific Clojure function.

> #### Hint::What to test
> Your unit tests should cover at least all of the public functions within each namespace, so the contract / api for each namespace is testable and will highlight obvious regressions.
>
> As `clojure.spec` becomes mature, you should also consider using generative testing approach to broaden the test data used to test your functions.

## Writing an assertion

```clojure
(is
   (= 42 (* 6 7)))
```

Assertions use the `is` function with an expression that returns true (assertion passed) or false (assertion failed)


## Defining a test

`deftest` is used to define a function that will test a similarly named function from the `src` tree.  By convention, the function name and namespaces should be the same, except for adding `-test` to the namespace and testing function.

The `testing` function allows you to group one or more assertions

```clojure
(deftest adder-test
  (testing "Using a range of numbers to test the adder"
    #_(is (= 0 1))
    (is (= (+ 1 2) (adder 1 2)) "Adding 1 and 2")
    (is (= (+ 1 -2) (adder 1 -2)) "Adding 1 and -2")
    #_(is (not (= (+ 1 2)) (adder "a" "b")) "Adding strings as negative test")
    (is (false? (= 0 1)) "A simple failing test")
    (is (false? (= 0 (adder 3 4))) "Purposefully using failing data")))

```


## Including namespaces

`clojure.test` needs to be included in the namespace in order to use the functions that namespace provides.  Its common to specify `[clojure.test :refer :all]` which makes all the functions available as if they were defined in the current namespace.

The namespace that is under test also needs to be included and again is typically just pulled in completely into the testing namespace.  The testing namespace typically matches the namespace you are testing, with just the addition of `-test` to the name.

```clojure
(ns my-clojure-app.core-test
  (:require [clojure.test :refer :all]
            [my-clojure-app.core :refer :all]))
```
