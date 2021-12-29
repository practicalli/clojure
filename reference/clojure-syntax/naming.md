# Naming

## Naming when requiring other namespaces


`(require [cheshire.core :refer :all])` is an example of self-inflicted errors, as this library included a `contains?` function that will over-write the `clojure.core/contains?` function when using `:refer :all` or the `(use )` expression.

This situation is one example of why `:refer :all` and `use` are not recommended and can cause lots of debugging headaches.


If a namespace is predominantly about using a specific library, then refer specific functions as they are used within the current namespace

```clojure
(ns current.namespace
(:require
  [cheshire.core :refer [function-name another-function etc]))
```

> #### Hint::clj-kondo lint tool shows unused functions
> Using clj-kondo

A classic example is a test namespace that uses clojure core
(ns practicalli.random-function-test
  (:require [clojure.test :refer [deftest is testing]]
            [practicalli.random-function :as sut]))
Otherwise use a meaningful alias, ideally refering to what that library is doing (which makes it easer to swap out with a different library later on if required).  As Cheshire is a JSON related library, then
(ns my.ns
  (:require [cheshire.core :as json]))
This gives a context to all the functions called from that library and makes code easier for humans to understand.
