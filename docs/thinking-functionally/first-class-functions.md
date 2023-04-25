# First Class functions

Idempotent - given the same input you get the same output

> ####Note::
> Write an expression to add up the numbers from 1 to 10 and return the overall total.

```clojure
(+ 1 2 3 4 5 6 7 8 9 10)
```

> ####Note::
> Create an expression to do the same calculation, but without having to write all the numbers.  Hint: consider the functions called range and reduce.

The `range` function generates a sequence of numbers and when given arguments it does so from a specific range.  The second number is exclusive, so for 1 to 10 the second argument should be 11.

```clojure
(range 1 11)
```

Unfortunately we cant just add the result of a range, because it returns a [lazy sequence](lazy-evaluation.html)  So `(range)` by itself will create an error

```clojure
(+ 1 (range 1 11))
```

Using a function called `reduce` we can calculate a single total value from all the numbers in the collection.

The reduce function take 2 arguments, the first is the function to apply to a data structure, the second is the data structure.

```clojure
(reduce + (range 1 11))

(reduce + (1 2 3 4 5 6 7 8 9 10))
```
