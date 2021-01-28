# Composing Specifications
No spec is an island

Composing individual specifications is an effective way to build larger abstractions in specifictions without creating fixed hierarchical structures that are harder to refactor.

Require specification namespace to the page
```eval-clojure
(ns practicalli.clojure
  (:require [clojure.spec.alpha :as spec]))
```


`spec/and` is used when all specifications should be true.

```eval-clojure
(spec/def ::meaning-of-life
  (spec/and int?
            even?
            #(= 42 %)))
```

`spec/or` is use when one or more specifications should be true

```eval-clojure
(spec/def ::meaning-of-life-int-or-string
  (spec/or :integer #(= 42 %)
           :string  #(= "forty two" %)))
```

Each condition in the spec is annotated with a label for each conditional branches.

Labels are included in the return result from `spec/explain` when values do not conform to a specification, providing context as to why a value failed the specification.

When an or is conformed, it returns a vector with the condition name and conformed value.


```eval-clojure
(spec/conform ::meaning-of-life-int-or-string 42)
```

```eval-clojure
(spec/conform ::meaning-of-life-int-or-string "forty two")
```


```eval-clojure
(spec/conform ::meaning-of-life-int-or-string :entropy)
```


```eval-clojure
(spec/explain ::meaning-of-life-int-or-string :entropy)
```


## Individual specifications
Before composing a more abstract specification, first define individual specifications

```eval-clojure
(spec/def ::first-name string?)
```

```eval-clojure
(spec/def ::last-name string?)
```

```eval-clojure
(spec/def ::residential-address string?)
```


## Composing hash-map specification
The individual specifications can now be composed into a single specification.

`keys` function combines specifications to form a composite specification in the form of a Clojure hash-map.

```eval-clojure
(spec/def ::customer-details
  (spec/keys
    :req [::first-name ::last-name ::residential-address]))
```

Use the composite specification with a value

```eval-clojure
(spec/conform ::customer-details
  {::first-name "Jenny"
   ::last-name "Jetpack"
   ::residential-address "42 meaning of life street, Earth"})
```
