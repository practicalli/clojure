# Tail recursion

> **Fixme** work in progress

If we generate a very large collection we run the risk of blowing our heap space.  For example we could use range to generate a very large collection, say a vector containing 10 billion values

Dont try this example below

```clojure
(vec (range 0 9999999999))
;; this will crash after a short while as it will use up all your heap space
```

Using tail call optomisation (tail recursion) allows us to reuse a memory location when we call a function recursively.  This tail recursion is not part of the underlying Java Virtual Machine (JVM), so instead Clojure has a specific function called `recur`

The `recur` function allows the processing of a very large data set without blowing the heap space because the memory space will be reused.

The `recur` function must be the last expression in order to work.

```clojure
(defn sum
  ([vals] (sum vals 0))
  ([vals accumulating-total]
   (if (empty? vals)
     accumulating-total
     (recur (rest vals) (+ (first vals) accumulating-total)))))

(sum (vec (range 0 9999999)))
```
