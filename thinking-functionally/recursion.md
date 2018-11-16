# Recursion

> **Fixme** work in progress

Recursion is used greatly in Clojure to iterate through data and as anything can be treated as data in Clojure you can understand why.

The constructs available in Clojure for recursion include
* `loop` and `recur`
* Named function that calls itself
* `map`, `reduce`, `filter`, `remove`, etc.
* `for`


# Recursively calling the same function

Lets iterate though a collection using recursion by writing a function that calls itself

```clojure
(defn recursively-use-a-collection [collection]
  (println (first collection))
  (if (empty? collection)
    (print-str "no more values to process")
    (recursively-use-a-collection  (rest collection))))

(recursively-use-a-collection [1 2 3])
```

Lets take this recursive approach to create a function that can tell us the length of a collection (list or vector)


We define a function that takes a collection of an argument.  The collection is tested to see if it is empty and if so a zero value is returned.  If the collection is not empty, then we
```clojure
(defn length [collection]
  (if (empty? collection)
    0
    (+ 1 (length (rest collection)))))
;; => #'clojure-through-code.01-basics/length
```

If we call the `length` function with an empty collection, then the `empty?` condition will return true and the `if` expression will evaluate the first expression, 0, returning 0.

```clojure
(length [])
;; => 0

```

If we call the `length` function with a collection containing 3 values, then the `empty?` function will return `false` and the `if` function will evaluate the second expression.

The second expression starts with a simple counter, using the `+` function and the value one

```clojure
(length [0 1 2])
;; => 3

```


```clojure
(+ 1 (length [1 2]))
(+ 1 (+ 1 (length [2])))
(+ 1 (+ 1 (+ 1 (length []))))
(+ 1 (+ 1 (+ 1 0)))

(length (range 24))
;; => 24

```


(defn length [collection]
  (kk))



# Further recursion examples

Other functions to consider
* every
* accumulating / accumulative
* keep
