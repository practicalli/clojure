# Writing Unit Tests with clojure.test

Unit tests are centered on assertions, testing if something returns a true or false value.

`is` function is the simplest assertion and the most common.  It checks to see if an expression given is true and if so then the assertion passes.  If the value is false then that assertion fails.

`as` provides a way to run the same assertion with different values, testing the same function with a collection of arguments.  This provides a clean way to test a function without lots of repetition.

`testing` is a macro to group multiple assertions together, providing a string in which to describe the context the assertions are testing.  The well worded context string is invaluable for narrowing down on which assertions are failing.

`deftest` is a collection of assertions, with or without `testing` expressions.  The name of the deftest should be the name of the function it is testing with `-test` as a postfix.  For example, the function `practicalli.playground/calculator` would have a `deftest` called `practicalli.playground-test/calculator-test`

## Requiring Namespaces

A test namespace has a singular purpose to test a matching src namespace.

The idiomatic approach is to `:refer` specific functions from `clojure.test` as those functions are used.

The namespace to be tested is referred using a meaningful alias. The alias highlight the exact functions being tested in the body of the code.  This provides a visual way to separate functions under test with other test functions, especially if there are helper functions or vars used for test data.

=== "REPL"
    ```clojure
    (require '[clojure.test :refer [are deftest is testing]])
    ```
    The namespace under test should be referred using the alias so they are readily identified within the test code.
    ```clojure
    (require '[practicalli.gameboard.spec :as gameboard-spec])
    ```

=== "project"
    Add `clojure.test` to the namespace definition along with the namespace under test.
    ```clojure
    (ns practicalli.app-namespace-test
      (:require '[clojure.test :refer [are deftest is testing]]
                 [practicalli.gameboard.spec :as gameboard-spec]))
    ```

## Simple Example

```clojure
(deftest public-function-in-namespace-test
  (testing "A description of the test"
    (is (= 1 (public-function arg)))
    (is (predicate-function? arg))))
```

## Assertion data set

The `are` macro can also be used to define assertions, especially when there would otherwise be multiple assertions that only differ by their test data.

An `are` assertion defines the arguments to the test, the logic of the test and a series of test data.

```clojure
(are [x y] (= x y)
              2 (+ 1 1)
              4 (* 2 2))
```

This is equivalent to writing

```clojure
         (do (is (= 2 (+ 1 1)))
             (is (= 4 (* 2 2))))
```

!!! EXAMPLE "Refactor test assertion to use data set"
    Assertions in the test take the same shape of values, so are candidates to refactor to the `are` macro.
    ```clojure
    (deftest encoder-test
      (testing "Tens to number words"
        (is (= '("zero" "ten")
               (character-sequence->word-sequence dictionary/digit->word '(\0 \1 \0))))
        (is (= '("zero" "eleven")
               (character-sequence->word-sequence dictionary/digit->word '(\0 \1 \1))))
        (is (= '("zero" "twenty" "zero")
               (character-sequence->word-sequence dictionary/digit->word '(\0 \2 \0))))
        (is (= '("zero" "twenty""one")
               (character-sequence->word-sequence dictionary/digit->word '(\0 \2 \1))))
        (is (= '("zero" "forty" "two")
               (character-sequence->word-sequence dictionary/digit->word '(\0 \4 \2))))))
    ```
    Refactor the assertions using are simplifies the code, making it simpler to change further and extend with more data.
    ```clojure
    (deftest encoder-test
      (testing "Tens to number words"
        (are [words numbers]
          (= words (character-sequence->word-sequence dictionary/digit->word numbers))
            '("zero" "ten")           '(\0 \1 \0)
            '("zero" "eleven")        '(\0 \1 \1)
            '("zero" "twenty" "zero") '(\0 \2 \0)
            '("zero" "twenty""one")   '(\0 \2 \1)
            '("zero" "forty" "two")   '(\0 \4 \2)))
    ```

!!! HINT "Generative Testing provides a wide range of values"
    [Generating test data from Clojure Specs](/clojure/clojure-spec/generative-testing/) provides an extensive set of values that provide an effective way to test functions.

## Reference

[clojure.test API](https://clojure.github.io/clojure/clojure.test-api.html){.md-button}

### Code challenges with tests

[TDD Kata: Recent Song-list](/simple-projects/tdd-kata/recent-song-list.md){.md-button}
[TDD Kata: Numbers in words](https://github.com/practicalli/numbers-to-words){.md-button}
[Codewars: Rock Paper Scissors (lizard spock) solution](https://github.com/practicalli/codewars-guides/tree/develop/rock-paper-scissors){.md-button}
[practicalli/codewars-guides](https://github.com/practicalli/codewars-guides){.md-button}
[practicalli/exercism-clojure-guides](https://github.com/practicalli/exercism-clojure-guides){target=_blank .md-button}
