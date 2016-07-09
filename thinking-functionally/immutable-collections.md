# Immutable collections

As we have discussed, immutable data structures cannot be changed.  So when you run a function over a collection a copy of that collection is returned.  Lets see this by running some code in the REPL.


> **Note** Define a data structure called `numbers` using a vector.  Then write a function that uses the `map` and `inc` function to increment all the numbers in a vector.

> Then check the current value of the `numbers` data structure by evaluating its name. 

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->
```clojure
;; define the data structure 
(defn numbers [1 2 3 4 5])

;; increment the numbers
(map inc numbers)

;; see the current value of numbers
numbers
```

<!--endsec-->


> **Note** Use the `conj` function to first add the number `5` to the `numbers` vector from the previous exercise and check the value of `numbers`.  Then add the number `6` to the `numbers` vector and check the value of `numbers`.

> Finally, use the `conj` function to add both `5` and `6` to the `numbers` vector and check the value of `numbers`

<!--sec data-title="Reveal answer" data-id="answer002" data-collapse=true ces-->

```
(def numbers [1 2 3 4])

;; add 5 to the numbers vector
(conj numbers 5)

;; check the value of numbers
numbers
;; => [1 2 3 4]

;; add 6 to the numbers vector
(conj numbers 6)

;; check the value of numbers
numbers
;; => [1 2 3 4]

;; add 5 and 6 to the numbers vector
(conj numbers 5 6)

;; Alternatively, you can use the threading macro to chain two conj function calls
(-> numbers
    (conj 5)
    (conj 6))

;; check the value of numbers
numbers
;; => [1 2 3 4]
```

So even though we have applied several functions on the `numbers` data structure it still has the same value.

<!--endsec-->

