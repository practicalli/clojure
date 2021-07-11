# Unit Testing with `clojure.test`

`clojure.test` is a test library that is already part of Clojure and test package hierarchy is typically created (e.g. when generating Clojure projects with Leiningen).

As with other unit testing libraries you use `clojure.test` to write test.  These tests are defined as functions that contain one or more assertions.

As a general guideline, a Clojure test function should test a specific Clojure function.


> #### Hint::What to test
> Define a `deftest` for every public functions within a namespace, so the contract / api for each namespace is testable and will highlight obvious regressions.
> The `testing` function can be used to group assertions for a particular `deftest`, so different aspects of the tests can be grouped together.
>
> Test reports contain only the names of the `deftest` functions, as there are no names with `testing`
>
> `clojure.spec` provides another way to define a contract around your functions and data structures.  It also includes generative testing approach to broaden the test data used to test your functions.


## Test namespaces

`clojure.test` needs to be included in the namespace in order to use the functions that namespace provides.

The recommended syntax is to `:refer` the specific functions which makes those functions available as if they were defined in the current namespace.

The namespace that is under test also needs to be included and and its recommended that you use the alias `SUT` for system under test.  The test namespace matches the namespace you are testing, with the addition of `-test` to the name.

```clojure
(ns my-clojure-app.core-test
  (:require [clojure.test :refer [deftest deftest- testing is]]
            [my-clojure-app.core :as SUT ]))
```


## Writing an assertion

An assertion is where you compare an expected result with the result of calling a function.  If the assertion is true, then then it is a pass.  If the assertion is false, then its a fail.

The form of an assertion takes a form `(is (comparitor expected-value fuction-call))`

Some simple examples include
```clojure
(is (= 42 (* 6 7)))

(is (not= 24 (* 6 7)))
```


## Defining a test

`deftest` is used to define a function that will test a similarly named function from the `src` tree.  The test function name should match the function it is testing with `-test` added to the end.

`testing` function allows you to group one or more assertions

`is` defines an assertion

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
