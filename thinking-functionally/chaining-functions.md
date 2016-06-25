# Chaining functions

We have discussed how functional programs are essentially a number of functions that work together, this is often called chaining

```
(let [calculated-value (* 10 (reduce +  (map inc (range 5))))]
  calculated-value)
```

This expression is common in the Lisp & Clojure languages.  Occasionally the chain of functions becomes challenging to read.  To overcome this parsing complexity, developers often break down a more complex expression into its parts.

> **Note** Brake down the above example into each expression that gives a value

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->

```
(range 5)

(map inc (range 5))

(reduce +  (map inc (range 5)))

(* 10 (reduce +  (map inc (range 5))))

(let [calculated-value (* 10 (reduce +  (map inc (range 5))))]
  calculated-value)
```

<!--endsec-->
