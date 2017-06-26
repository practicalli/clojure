# Sequence abstraction

> **Fixme** work in progress


```clojure
(first '(1 2 3 4 5))
(rest '(1 2 3 4 5))
(last '(1 2 3 4 5))
```



```clojure
(defn nth [items n]
 (if (= n 0)
   (first items)
   (recur (rest items) (- n 1))))

(define squares '(0 1 4 9 16 25))

(nth squares 3)
```
