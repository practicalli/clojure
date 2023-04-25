# Explaining non-conforming values
`clojure.spec.alpha/explain` describes why a value does not satisfy a specification.

`clojure.spec.alpha/explain` takes two arguments
- a specification
- a value to test against the specification

`Success` string is sent to standard out if the value meets the specification

A string explaining where the value deviates from the specification is sent to standard out if the value does not meet the specification.

There are several variations on the explain function for different situations

- `explain` - sends the return value to the standard out / REPL
- `explain-str` - returns a human readable result.
- `explain-data` - returns a data structure of the error to be processed by other code

## Example of a failing value

First define a namespace and require the Clojure Spec namespace

```clojure
(ns practicalli.clojure.specifications
  (:require [clojure.spec.alpha :as spec]))

(spec/def ::meaning-of-life #(= 42 %))
```

Given the following specification

```clojure
(spec/explain ::meaning-of-life 24)
```

Using the value `24` with that specification will fail.  Using explain we can see why

```clojure
(spec/def ::meaning-of-life-int-or-string
  (spec/or :integer #(= 42 %)
           :string  #(= "forty two" %)))
```

In this case explain returned the

- value being checked against the spec
- result of that check (failed)
- predicate used to check the value
- spec name used to check the value

Notice that the value failed on the first condition, `:integer`, then stopped without checking the second, `:string`. The `spec/and` macro works the same as `clojure.core/and` in that is stops as soon as something fails.

```clojure
(spec/explain ::meaning-of-life-int-or-string 24)
```

In this case we still have the value checked, the result and the predicate
More information is provided as to where in the spec the value failed
`:at` shows the path in the spec where the failure occurred, very useful for nested structures
This shows the value of naming your specs descriptively


## Explain with a string

rather than send information to the system out

```clojure
(spec/explain-str ::meaning-of-life 24)
```


```clojure
(spec/explain-data ::meaning-of-life 24)
```
