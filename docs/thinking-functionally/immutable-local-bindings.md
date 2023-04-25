# Immutable Local Bindings

Names can be bound to values & and data structures with either the `def` or `let` function.  The `def` binding is global to the namespace, however the `let` function is local to its use.

> **Hint** The `let` function is typically used to define names within a function definition, or in snippets of code created during repl driven development.

```clojure

(let [five 5]
  (str "Within the let expression the value is " five))
;; => Within the let expression the value is 5

;; evaluating the name five outside the let expression returns an error
five
;; => Unable to resolve symbol: five in this context
```

> **Note** Create a local binding called number that represents the value 5 using the `let` function. Increment the number, then print out the value of number.

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->
```clojure
(let [number 5]
   (inc number)
   (str "The number is still " number))
```

So the value that any local binding points to is immutable too.
<!--endsec-->
