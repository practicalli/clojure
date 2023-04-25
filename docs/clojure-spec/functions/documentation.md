# Documentation

The Clojure `doc` function shows the doc string included in a function definition, eg. `defn` expressions.

When a specification is defined for a function using `fdef` the specification is included in the output of the Clojure `doc` function.

Including specification details clarifies the precise way to use the function and the information it expects.  When a function has a specification the doc string for that function can focus on the purpose of the function rather than the specific types of data used, as that is covered by the function specification.

## Example

```clojure
(clojure.repl/doc ::rank)

;; :practicalli.card-game-specifications/rank
;; Spec
;;   (into #{:king :queen :ace :jack} (range 2 11))
```

When adding a specification to a function definition, `doc` will also show the specification details along with the function doc-string.

## Live example

Define the namespace and include clojure spec and clojure.repl (which contains the doc function)

```clojure
(ns practicalli.clojure
  (:require [clojure.repl :as repl]
            [clojure.spec.alpha :as spec]))
```

Print the documentation for the `map` function

```clojure
(repl/doc map)
```

Print the documentation for the `:playing-card/suit`

```clojure
(clojure.repl/doc :playing-card/suit)
```

```clojure
 #{:spade :heart :diamond :club}
```

```clojure
(repl/doc :cat-show:cat-bread)
```
