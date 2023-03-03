# Literal values
Sets can be used as predicate functions returning true if the value is within the set

Checking valid playing cards

Define a namespace for the page and require Clojure Spec

```clojure
(ns practicalli.clojure
  (:require [clojure.spec.alpha :as spec]))
```


```clojure
(spec/valid? #{:club :diamond :heart :spade} :club)
```


```clojure
(spec/valid? #{:club :diamond :heart :spade} 42)
```

Answer to the ultimate question?

```clojure
(spec/valid? #{42} 42)
```

Using sets for literal values is similar to using the `clojure.core/contains?` function with a set collection type.

```clojure
(contains? #{:clubs :diamonds :hearts :spades} :hearts )
```
