# Sequences

> **Fixme** work in progress

Data structures can be built by combining functions

```clojure
(cons 1 (cons 2  (cons 3  (cons 4  nil))))
```

```clojure
(->>
 nil
 (cons 4)
 (cons 3)
 (cons 2)
 (cons 1))
```
