# Higher order functions
Higher order functions are common in Clojure and spec provides fspec to support spec’ing them.

```eval-clojure
(defn value-added-tax
  [tax-rate]
  #(+ (* tax-rate %) %))
```
The value-added-tax function returns an anonymous function that adds the value of tax to the given value.

Define a namespace for the page and require Clojure Spec

```eval-clojure
(ns practicalli.clojure
  (:require [clojure.spec.alpha :as spec]))
```

Declare a function spec for value-added-tax using `clojure.spec.alpha/fspec` for the return value:

```eval-clojure
(s/fdef value-added-tax
  :args (spec/cat :tax-rate number?)
  :ret (spec/fspec :args (s/cat :value number?)
                :ret number?))
```
The `:ret` specification uses `fspec` to declare that the returning function takes and returns a number.
