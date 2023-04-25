# Pure functions

A function is considered pure if does not side effects or is affected by side causes.  A pure function does not change any other part of the system and is not affected by any other part of the system.

When you pass arguments to a function and that function returns a value without interacting with any other part of the system, then that function is considered pure.

Should something from outside a function be allowed to affect the result of evaluating a function, or if that function be allowed to affect the outside world, then its an impure function.

![Pure function basic concept](/images/functional-programming-concepts-pure-function.png)

So lets look at a simple code example

> ####Note::Write a pure function that adds two numbers together ?

```clojure
(defn add-numbers [number1 number2]
  (+ number1 number2))

(add-numbers 1 2)
```

Lets look at each line of this suggested answer

```clojure
;; function takes 2 arguments
;; function uses both arguments for result
(defn add-numbers [number1 number2]
  (+ number1 number2))

;; specific values are passed as arguments
(add-numbers 1 2)
```

# An example with map

> **Note** Define a collection called numbers and write a named function that increments each number of the numbers collection.
> Is your function pure or impure ?

```clojure
(def numbers '(5 4 3 2 1))

(defn increment-numbers []
  (map inc numbers))

(increment-numbers)
```

The function takes no arguments and is pulling in a value from outside the function.  This is a trivial example, but if all your code is like this it would be more complex.  If the value pointed to by `numbers` is mutable and changes before the `increment-numbers` function is called then you will get different results.

Here is a Pure function example

```clojure
(def numbers '(5 4 3 2 1))

(defn increment-numbers [number-collection]
  (map inc number-collection))

(increment-numbers numbers)
```

In this example we are explicitly passing the `numbers` collection to the function.  The function works on passed value and returns a predictable result.
