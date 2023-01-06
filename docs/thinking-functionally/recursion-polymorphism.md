# Recursion & Polymorphism

> **Fixme** work in progress

The following `sum` function will calculate the value of adding all the elements in a collection.  You can alter the results by adding a starting value to the calculation as a second argument when calling `sum`

```clojure
(defn sum
  ([vals] (sum vals 0))
  ([vals accumulating-total]
    (if (empty? vals)
      accumulating-total
      (sum (rest vals) (+ (first vals) accumulating-total)))))

(sum [2 7 9 11 13])
(sum [1])
(sum [2 7 9 11 13] 9)
```

Rather than duplicate the calculation, the behaviour of calling `sum` with just a collection simply calls `sum` again, this time passing a starting value of zero.

