# Hierarchical Specifications
Defining specifications for data that is hierarchical or nested in nature.

```eval-clojure
(ns practicalli.clojure
  (:require [clojure.spec.alpha :as spec]))
```


## Example hierarchical data

```clojure
{:top-level-key {:netsted-key "value"}}
```

## Individual specifications

```eval-clojure
(spec/def ::first-name string?)
```

```eval-clojure
(spec/def ::last-name string?)
```


```eval-clojure
(spec/def ::residential-address string?)
```

## Composite Specification
`keys` function combines specifications to form a composite specification in the form of a Clojure hash-map.

```eval-clojure
(spec/def ::customer-details
  (spec/keys
    :req [::first-name ::last-name ::residential-address]))
```



## Hierarchical Specification
A user account is composed of a user-id and customer details.  Rather than include the individual customer details, the composite customer-details specification.

The `::user-id` specification is as follows

```eval-clojure
(spec/def ::user-id uuid?)
```

The `::user-account` specification


```eval-clojure
(spec/def ::user-account
  (spec/keys
    :req [::user-id ::customer-details]))
```

The following data structure will conform to the specification

```clojure
{::user-id #uuid "97bda55b-6175-4c39-9e04-7c0205c709dc"
 ::customer-details {::first-name "Jenny"
                     ::last-name "Jetpack"
                     ::residential-address "Earth"}}
```
