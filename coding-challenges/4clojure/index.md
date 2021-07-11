![4Clojure banner](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/4clojure-banner.png)

> #### Hint::4ever-clojure replaces 4Clojure
> [4Ever-Clojure](https://4clojure.oxal.org/) is a new implementation of 4Clojure.com which has now been decommissioned.
>
> TODO: This section we be updated with details of using 4Ever-Clojure soon.


# Coding Challenges: 4Clojure
[4Ever-Clojure](https://4clojure.oxal.org/) is an excellent website to help you discover and apply the common functions in the Clojure language.

The website is self-contained so you do not need to install anything, simply paste in the missing code from the tests.  [One piece of code should solve all the tests](#using-let-and-anonymous-functions) for that challenge.

The [Problem List](https://4clojure.oxal.com/) shows the challenges categorized by experience level required, (Elementary, Easy, Medium, Hard) to solve them.  Start with the easiest problem or work your way through the challenges in any order you wish.

Select the name of a challenge and a new page describes the challenge and presents one or more tests that must pass.

![4Ever-Clojure Challenge Example](/images/4ever-clojure-challenge-example.png)

Enter the code that should be inserted where the `__` double underscore characters are.

Press the **Run** button to see if the code satisfies the tests

A dialog box is displayed showing how many tests have passed and failed


> There are over 550 functions in the `clojure.core` namespace alone, with additional functions in many other namespaces that make up the Clojure Standard Library.  It is not required to learn all these functions to be productive in Clojure.

<!-- ## Before you start -->
<!-- Create a free account to be able to track your progress through the challenges. -->

<!-- Login to your account and visit the [Top 100 users](http://www.4clojure.com/users).  Select the Following tick-box next to a number of the top users.  Once a challenge is solved you will be able to see the solutions of those users you follow. -->

<!-- Alternatively, visit a specific user profile, e.g. [practicalli](www.4clojure.com/user/practicalli), and click follow so you can see their solutions. -->

<!-- ![Clojure code challenges - 4clojure.com top users](/images/clojure-code-challenges-4clojure-top-users.png) -->


## Get help
Look at the [Clojure Cheatsheet](https://clojure.org/api/cheatsheet) and [Clojure API](https://clojure.org/api/) for an understanding of what functions are available in the core of the Clojure language.

Search directly in [ClojureDocs](https://clojuredocs.org/core-library) for functions.  Each function has a page that describes the function, shows the arguments it takes and provides many examples of its use.  At the end of the page are related functions too.


An Internet search of `clojure topic`, where `topic` is a name of the thing you want to do, should return many examples of functions that could be useful to solving the challenge.  Or

* [Clojure community - getting help](https://practicalli.github.io/blog/posts/cloure-community-getting-help/) included several other sources of help.


## Using let and anonymous functions
The solution submitted should be a single form, which is inserted in the test code where the `__` underscore placeholder is.  It is therefore not possible to define data with `def` or a separate function with `defn` to support the submitted solution.

Use the anonymous function, [fn](), to define behavior.

```clojure
(fn [value1 value2]
  (* value1 value2))
```

Use [let](https://clojuredocs.org/clojure.core/let) to bind a name to a value, so that value can be re-used throughout the expression.  `let` is also useful for breaking the algorithm into smaller pieces, making it easier to solve the challenge.

```clojure
(let [name value]
  (* 2 value (/ value 4) (+ value 3)))
```

It is common to combine `fn` and `let` to solve the challenges as they grow in complexity

```clojure
(fn fibbonacci [length-of-series]
  (let [fib [1 1]]
    (if (< (count fib) length-of-series)
      "iterate... to implement"
      fib)))
```

* [fn - ClojureDocs](https://clojuredocs.org/clojure.core/fn)
* [let - ClojureDocs](https://clojuredocs.org/clojure.core/let)
* [Fibonacci sequence guide - practicalli](https://github.com/practicalli/four-clojure/blob/master/src/four_clojure/026_fibonacci_sequence.clj)


## My function is not working
4Clojure uses Clojure 1.5 version and whilst the core of the Clojure language has not altered greatly since 4Clojure was created, there may be a few newer functions that are not supported.

Try the code in a [Clojure REPL](/clojure-tools/rebel-repl/) or [create a Clojure project](/clojure-tools/create-projects.md) using the latest version of Clojure (1.10.1).


## References
* [4Ever-Clojure](https://4clojure.oxal.com/)
* [Practicalli profile on 4Clojure.com](http://www.4clojure.com/user/practicalli) - follow to see their solutions
* [Clojure Cheatsheet](https://clojure.org/api/cheatsheet) - Clojure.org
* [Clojure API](https://clojure.github.io/clojure/) - Clojure.org
* [practicalli/four-clojure code journals for the first 60 challenges](https://github.com/practicalli/four-clojure/)
* [4Clojure video guides by Practicalli](https://www.youtube.com/playlist?list=PLpr9V-R8ZxiDB_KGrbliCsCUrmcBvdW16)
* [Clojure Core Library - ClojureDocs](https://clojuredocs.org/core-library)
* [Clojure, The Essential Reference - Renzo Bogatti](https://www.manning.com/books/clojure-the-essential-reference) - Manning book published in 2020
