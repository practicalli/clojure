# Coding Challenges: 4Clojure

[4Ever-Clojure Challenges Website](https://4clojure.oxal.org/){target=_blank .md-button}

[4Ever-Clojure](https://4clojure.oxal.org/) is a simple website with 150 challenges to help discover the functions built-in to the Clojure language, the [Clojure API](https://clojure.github.io/clojure/).

The website is self-contained with nothing to install, simply paste in the missing code and run the tests.  [One piece of code should solve all the tests](#using-let-and-anonymous-functions) for that challenge.

The [Problem List](https://4clojure.oxal.org/) shows the challenges categorized by experience level required, (Elementary, Easy, Medium, Hard) to solve them.  Start with the easiest problem or work your way through the challenges in any order you wish.  The Status column tracks your progress thorugh the challenges.

Select the name of a challenge to see the description and one or more code tests that must pass.

Enter the code that should be inserted where the `__` double underscore characters are.

Press the **Run** button to see if the code satisfies the tests

A dialog box is displayed showing how many tests have passed and failed

!!! HINT "Start learning the Clojure API"
    There are over 550 functions in the `clojure.core` namespace alone, with additional functions in many other namespaces that make up the [https://clojure.github.io/clojure/](https://clojure.github.io/clojure/).  It is not required to learn all these functions to be productive in Clojure.


??? INFO "4ever-clojure replaces 4Clojure"
    [4Ever-Clojure](https://4clojure.oxal.org/) is a new implementation of 4Clojure.com which has now been decommissioned


## Help completing the challenges

Look at the [Clojure Cheatsheet](https://clojure.org/api/cheatsheet){target=_blank} and [Clojure API](https://clojure.org/api/){target=_blank} for an understanding of what functions are available in the core of the Clojure language.

Search directly in [ClojureDocs](https://clojuredocs.org/core-library){target=_blank} for functions.  Each function has a page that describes the function, shows the arguments it takes and provides many examples of its use.  At the end of the page are related functions too.

!!! HINT "Practicalli Code walk-through and solution journal"
    [practicalli/four-clojure code journals for the first 60 challenges](https://github.com/practicalli/four-clojure/){target=_blank} contains a design journal showing how each challenge was solved and addional refactor or alternative approaches to the solution.

    [Practicalli 4Clojure guides playlist](https://www.youtube.com/playlist?list=PLpr9V-R8ZxiDB_KGrbliCsCUrmcBvdW16){target=_blank} provides video walk-through of the first 64 challenges, again with alternative solutions where relevant.


An Internet search of `clojure topic`, where `topic` is a name of the thing you want to do, should return many examples of functions that could be useful to solving the challenge.  Or

* [Clojure community - getting help](https://practicalli.github.io/blog/posts/cloure-community-getting-help/){target=_blank} included several other sources of help.


## Using let and anonymous functions

The solution submitted should be a single form, which is inserted in the test code where the `__` underscore placeholder is.  It is therefore not possible to define data with `def` or a separate function with `defn` to support the submitted solution.

Use the anonymous function, [fn](), to define behavior.

```clojure
(fn [value1 value2]
  (* value1 value2))
```

Use [let](https://clojuredocs.org/clojure.core/let){target=_blank} to bind a name to a value, so that value can be re-used throughout the expression.  `let` is also useful for breaking the algorithm into smaller pieces, making it easier to solve the challenge.

```clojure
(let [name value]
  (* 2 value (/ value 4) (+ value 3)))
```

It is common to combine `fn` and `let` to solve the challenges as they grow in complexity

```clojure
(fn fibonacci [length-of-series]
  (let [fib [1 1]]
    (if (< (count fib) length-of-series)
      "iterate... to implement"
      fib)))
```

* [fn - ClojureDocs](https://clojuredocs.org/clojure.core/fn){target=_blank}
* [let - ClojureDocs](https://clojuredocs.org/clojure.core/let){target=_blank}
* [Fibonacci sequence guide - practicalli](https://github.com/practicalli/four-clojure/blob/master/src/four_clojure/026_fibonacci_sequence.clj){target=_blank}


## My function is not working

4Ever Clojure uses [babashka/sci](https://github.com/babashka/sci){target=_blank} project to evaluate code on a JavaScript host.  Whist this should cover 99.9% of the Clojure API there may be some code that works in a Clojure (JVM) REPL that is not supported.

Try the code in a [Clojure REPL](/clojure/clojure-cli/rebel-repl/) or [create a Clojure project](/clojure/clojure-cli/create-projects.md) using the latest version of Clojure (1.11.x).


## References
* [4Ever-Clojure](https://4clojure.oxal.com/)
* [Clojure Cheatsheet](https://clojure.org/api/cheatsheet) - Clojure.org
* [Clojure API](https://clojure.github.io/clojure/) - Clojure.org
* [practicalli/four-clojure code journals for the first 60 challenges](https://github.com/practicalli/four-clojure/)
* [4Clojure video guides by Practicalli](https://www.youtube.com/playlist?list=PLpr9V-R8ZxiDB_KGrbliCsCUrmcBvdW16)
* [Clojure Core Library - ClojureDocs](https://clojuredocs.org/core-library)
* [Clojure, The Essential Reference - Renzo Bogatti](https://www.manning.com/books/clojure-the-essential-reference) - Manning book published in 2020
