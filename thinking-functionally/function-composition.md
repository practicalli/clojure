# Function Composition

We have discussed how functional programs are essentially a number of functions that work together, this is called composition (functional composition).

```
(let [calculated-value (* 10 (reduce +  (map inc (range 5))))]
  calculated-value)
```

This expression is common in the Lisp & Clojure languages.  Occasionally the created expressions can becomes challenging to read.  To overcome this parsing complexity, developers often break down a more complex expression into its parts, extracting code into its own function.

> **Note** Brake down the above example into each expression that gives a value

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->

```
(range 5)

(map inc (range 5))

(reduce +  (map inc (range 5)))

(* 10 (reduce +  (map inc (range 5))))


;; Additional examples

;; Use a let expression for code that is used more than once in a function

(let [calculated-value (* 10 (reduce +  (map inc (range 5))))]
  calculated-value)

;; Use defn to define a function for code that multiple functions will call
;; and generalise the function with arguments

(defn common-data-calculation
  [certanty-factor scope]
  (* certanty-factor (reduce +  (map inc (range scope)))))
```

<!--endsec-->
