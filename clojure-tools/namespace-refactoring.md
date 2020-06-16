# Namespace refactor
When starting a new project all the code is typically in one namespace, unless you are using a template that creates multiple namespaces.


Practicalli recommends adding comment sections as the code is developed, grouping code by its purpose.  A few common sections include:

```clojure
;; State
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Data Generators
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Helper functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Feature / logic
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; System / Lifecycle
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
```


> #### Hint::One pass evaluation
> Clojure is evaluated from top to bottom, so var (`def`, `defn`) definitions should come before that var is used in the code.
