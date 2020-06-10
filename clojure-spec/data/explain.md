# Explaining non-conforming values
`clojure.spec.alpha/explain` will detail why a value returns invalid or false against a specification.

There are several variations on the explain function for different situations
* `explain`
* `explain-str`
* `explain-data`



## What if my values fail to conform to the spec ?
spec/explain will show why a value does not conform to a spec
sends explination to system out (REPL, command line)

## Example of a failing value
First define a namespace and require the Clojure Spec namespace

```eval-clojure
(ns practicalli.clojure
  (:require [clojure.spec.alpha :as spec]))

(spec/def ::meaning-of-life #(= 42 %))
```


Given the following specification

```eval-clojure
(spec/explain ::meaning-of-life 24)
```


Using the value `24` with that specification will fail.  Using explain we can see why

```eval-clojure
(spec/def ::meaning-of-life-int-or-string
  (spec/or :integer #(= 42 %)
           :string  #(= "forty two" %)))
```

In this case explain returned the
* value being checked against the spec
* result of that check (failed)
* predicate used to check the value
* spec name used to check the value

Notice that the value failed on the first condition, `:integer`, then stopped without checking the second, `:string`. The `spec/and` macro works the same as `clojure.core/and` in that is stops as soon as something fails.


```eval-clojure
(spec/explain ::meaning-of-life-int-or-string 24)
```

In this case we still have the value checked, the result and the predicate
More information is provided as to where in the spec the value failed
`:at` shows the path in the spec where the failure occurred, very useful for nested structures
This shows the value of naming your specs descriptively


## Explain with a string
rather than send information to the system out


```eval-clojure
(spec/explain-str ::meaning-of-life 24)
```


```eval-clojure
(spec/explain-data ::meaning-of-life 24)
```
