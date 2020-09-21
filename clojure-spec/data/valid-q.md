# Is the value valid?
`clojure.spec.alpha/valid?` takes two arguments
- a specification
- a value to test against the specification

`clojure.spec.alpha/valid?` is a predicate function.

`true` is returned if the value meets the specification, otherwise `false` is returned.

## Require the Clojure spec library
Set the namespace for the page and require clojure.spec.alpha library, setting the alias to `spec`
```eval-clojure
(ns practicalli.clojure.specifications
  (:require [clojure.spec.alpha :as spec]))
```

## Using valid?
If the value is valid then a boolean true is returned.  Experiment with different values and [predicate functions](/reference/clojure/predicate-functions.md).
```eval-clojure
(spec/valid? even? 180)
```
 <!-- => true -->

```eval-clojure
(spec/valid? string? "Am I a valid string")
```
 <!-- => true -->


# using custom predicate functions
Create `fn` definitions to use as predicate functions.  Any function that returns true or false can be used.

```eval-clojure
(spec/valid? (fn [value] (> value 1024)) 8080)
```

The custom predicate function may also be written in the shorter form of a `fn` definition
```eval-clojure
(spec/valid? #(> % 1024) 8080)
```

Use `def` to bind names to custom predicate functions if they are used more than once in the code base.

In this example a name is bound to a function that checks if a port is within the [range of IANA registered networking ports][1].

```eval-clojure
(def registered-port-range?
  "Network port number within IANA registered port range"
  #(and (> % 1024) #(< % 49151) )

(spec/valid? registered-port-range? 8080)
```


[1]: https://en.wikipedia.org/wiki/Port_(computer_networking)#Common_port_numbers
