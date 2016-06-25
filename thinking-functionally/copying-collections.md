# Copying collections

As we have discussed, immutable data structure cannot be changes.  So when you run a function over a collection a copy of that collection is returned.

> **Note** Using the map function, increment all the elements in a vector

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->
```
(map inc [1 2 3 4 5])
```

The above map funciton is roughly equivalent to

```
(conj [] (inc 1) (inc 2) (inc 3) (inc 4) (inc 5))
```
<!--endsec-->
