# Currying & Partial Functions

Clojure does not support automatic currying, (+3) would result in applying + to 3, resulting with number 3 instead of a function that adds 3 as in Haskell. Therefore, in Clojure we use partial that enables the equivalent behavior.


```
(defn sum
  "Sum two numbers together"
  [number1 number2]
  (+ number1 number2))

(sum 1 2)
;; => 3
```

If you try and evaluate `sum` with a single value then you get an arity exception

```
(sum 1)
;; => clojure.lang.ArityException
;; => Wrong number of args (1) passed to: functional-concepts/sum

```

If we did need to call sum with fewer than the required arguments, for example if we are mapping sum over a vector, then we can use partial to help us call the sum function with the right number of arguments.

Lets add the value 2 to each element in our collection

```
(map (partial sum 2) [1 3 5 7 9])
```

## Another example of partial 

```
(map (partial reduce +) [[1 2 3 4] [5 6 7 8]])
```

## Currying in clojure

Currying is the process of taking some function that accepts multiple arguments, and turning it into a sequence of functions, each accepting a single argument.  Or put another way, to transform a function with multiple arguments into a chain of single-argument functions.

Currying relies on having fixed argument sizes, whereas Clojure gets a lot of flexibility from variable argument lengths (variable arity).

Clojure therefore has the partial function gives results similar to currying, however the partical function also works with variable functions.

Partial refers to supplying some number of arguments to a function, and getting back a new function that takes the rest of the arguments and returns the final result

One advantage of partial is to avoid having to write your own anonymous functions

 Useful references
 * {Partial function applications for humans}(http://andrewberls.com/blog/post/partial-function-application-for-humans) 

```
(defn join-strings
  "join one or more strings"
  [& args]
  (apply str args))
```

The [& args] argument string says take all the arguments passed and refer to them by the name args.  Its the & character that has the semantic meaning, so any name after the & can be used, although args is common if there is no domain specific context involved.

```
(join-strings "Hello" " " "Clojure" " " "world")
;; ⇒ "Hello Clojure world"

;; define g. To be partial of f, feeding it 3 as first arg
(def wrap-join-strings (partial join-strings "Hello" " " "Clojure" " "))

(wrap-join-strings) ; ⇒ "Hello"

(wrap-join-strings "world") ; ⇒ "Helloworld"
```
