# Map literal syntax - `#:` and `#::`
`#:` map literal macro for Clojure hash-maps adds a given namespace to all the keywords contained in the hash-map.

`#::` map literal macro for keyword auto-resolve adds the current fully qualified namespace to all the keywords in the hash-map

## Require clojure spec in the namespace definition

```eval-clojure
(ns practicalli.clojure
  (:require [clojure.spec.alpha :as spec]))
```

In this example the keys in the map are unqualified.

```eval-clojure
{:simplyfying      []
    :keyword-names    []
    :with-autoresolve []
    :map-literal      []}
```

## Qualifying keys with auto-resolve
Using the map literal macro for auto-resolve instructs Clojure to treat all keys in the map as qualified to the current namespace

The following hash-map has the map literal macro.

```eval-clojure
#::{:simplyfying      []
    :keyword-names    []
    :with-autoresolve []
    :map-literal      []}
```

This is the same as explicitly writing out the fully qualified domain for each key in the map.

However, if we move the map to another namespace, then the explicit namespaces would need to be updated.

```eval-clojure
{:practicalli.clojure/simplyfying      []
 :practicalli.clojure/keyword-names    []
 :practicalli.clojure/with-autoresolve []
 :practicalli.clojure/map-literal      []}
```

## Qualifying keywords with a specific name
Rather than take the name from the current namespace, an explicit name can be added to all the keys in the map

```eval-clojure
#:practicalli.naming {:simplyfying      []
                      :keyword-names    []
                      :with-autoresolve []
                      :map-literal      []}
```


This is the same as explicitly writing that name in front of each of the keywords in the map.

```eval-clojure
# {:practicalli.naming/simplyfying      []
   :practicalli.naming/keyword-names    []
   :practicalli.naming/with-autoresolve []
   :practicalli.naming/map-literal      []}
```


Map literals are relevant to Entity maps with spec.


<!-- ```clojure -->
<!-- #:clojure.spec.alpha {:problems -->
<!--                      [{:path [], -->
<!--                        :pred (clojure.core/fn [%] (clojure.core/= 42 %)), -->
<!--                        :val  24, -->
<!--                        :via  [:practicalli.clojure/meaning-of-life], -->
<!--                        :in   []}], -->
<!--                      :spec  :practicalli.clojure/meaning-of-life, -->
<!--                      :value 24} -->

<!-- ``` -->

<!-- ;; means the same as -->


<!-- ```clojure -->
<!-- {:clojure.spec.alpha/problems -->
<!--  [{:clojure.spec.alpha/path [] -->
<!--    :clojure.spec.alpha/pred (clojure.core/fn [%] (clojure.core/= 42 %)) -->
<!--    :clojure.spec.alpha/val  24 -->
<!--    :clojure.spec.alpha/via  [] -->
<!--    :clojure.spec.alpha/in   []}] -->
<!--  :clojure.spec.alpha/spec  :spec-name -->
<!--  :clojure.spec.alpha/value 24} -->
<!-- ``` -->
