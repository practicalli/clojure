# Control Flow 

The following section of functions gives examples of simple control flow.  As you gain more experience with Clojure, you will discover more functional ways to achieve the same (or better) results.

> **Hint** Although these functions may seem similar to other non-functional languages, there are subtle differences


## If

  Using the `if` funtion you can test if an expression evaluates to true.  If it is true, the first value is returned, if its false the second value is returned.
  
  Here is a simple example to see if one number is bigger that another

```clojure
(if (> 3 2)
  "Higher"
  "Lower")

=> "Higher"
```

Here is an example of an condtion inside an anonymous fuction.

```clojure
(defn even-number [number]
  (if (odd? number)
    (inc number)
    number))

(even-number 41)
;; => 42
```

## When

When a condition is true, then return the value of evaluating the next expression.  If the condition is false, then return `nil`

```clojure
    (when (> 3 2)
      "Higher")

=> "Higher"
```


## Case
When one of these things is true, do this, else default 

```clojure
(case (inc 3)
  1 "Not even close"
  2 "I wish I was that young"
  3 "That was my previous value"
  4 "You sunk my battleship"
  "I dont think you understood the question")

=> "You sunk my battleship"
```

## Cond

Return the assocated value of the first condition that is true, or return the default value specified by `:otherwise`

```clojure
(cond
  (= 7 (inc 2)) "(inc 2) is not 7, so this condition is false"
  (= 16 (* 8 2)) "This is the first correct condition so its associated expression is returned"
  (zero? (- (* 8 8) 64)) "This is true but not returned as a previous condition is true"
  :otherwise "None of the above are true")

;; => "This is the first correct condition so its associated expression is returned"
```

## For

Using the `for` function you can Iterate through the values in a collection and evaluate each value in tern with  with a condition, using either `:when` or `:while`.

```
(for [x (range 10) :when (odd? x)] x)

(for [x (range 10) :while (even? x)] x)

(for [x (range 10)
      y (range 10)]
  [x y])
```

## While

Do something while the condition is true

```clojure
(while (condition) 
  (do something))
```

Here is a simple while example that uses a (mutable) counter and prints out the results to the repl window.

```clojure
;; create a counter using a mutable counter
(def counter (atom 10))

;; While the counter is positive (is a number greater than zero), print out the current value of the counter.
(while (pos? @counter)
  (do
    (println @counter)
    (swap! counter dec)))
```

> This example uses mutable state and causes a side effect by printing to the repl.  Both these kinds of things are typically kept to a minimum in Clojure.

> **TODO** An alternative would be to use use the iteration over a collection to control the while condition

