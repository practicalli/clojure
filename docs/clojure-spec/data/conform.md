## Does a value conform to a specification?

`clojure.spec.alpha/conform` takes two arguments

- a specification
- a value to test against the specification

`:clojure.spec.alpha/invalid` is returned when a value does not conform to a specification.

If the value does conform to the specification, then the value is returned.  This value is referred to as a conformed value.

## Require the Clojure spec library

Set the namespace for the page and require clojure.spec.alpha library, setting the alias to `spec`

```clojure
(ns practicalli.clojure.specifications
  (:require [clojure.spec.alpha :as spec]))
```

## Using conform

If the value conforms to the spec, a conformed value is returned

```clojure
(spec/conform odd? 101)
```
<!-- => 101 -->


When a value does not conform to a spec, the value `:clojure.spec.alpha/invalid` is returned

```clojure
(spec/conform even? 101)
```
 <!-- => :clojure.spec.alpha/invalid -->


```clojure
(spec/conform integer? 1)
```
 <!-- => 1 -->


```clojure
(spec/conform seq? [1 2 3])
```
 <!-- => :clojure.spec.alpha/invalid -->


```clojure
(spec/conform seq? (range 10))
```
 <!-- => (0 1 2 3 4 5 6 7 8 9) -->


```clojure
(spec/conform map? {})
```
 <!-- => {} -->


```clojure
(spec/conform map? (hash-map :a 1 :b 2))
```
 <!-- => {:b 2, :a 1} -->
