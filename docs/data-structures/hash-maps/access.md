# Accessing hash-maps

The values in a hash-map can be accessed in multiple ways

* `get`
* `get-in`
* `contains?`
* using hash-map as a function
* use :keyword as a function
* threading hash-map through one or more keys

Clojure provides a get function that returns the value mapped to a key in a set or map.

## get and get-in functions

`get` is a very explicitly named function that makes its purpose very clear.  The `get` function works regardless of the type of keys used in the hash-map.

`(get map key)`

`get-in` has the same quality, for use with nested hash-maps.

```clojure
(get-in nested-map [:keys :path])
```

> #### Hint::missing or incorrect key
>
> If the key in the path is missing or the path is missing (or nil) then `get-in` will return more of the hash-map than expected.

```clojure
(get-in {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}} ["scores" "FSU"])
;;=> 31

(get-in {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}} ["scores"])
;;=> {"FSU" 31, "UF" 7}

(get-in {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}} [])
;;=> {"timestamp" 1291578985220, "scores" {"FSU" 31, "UF" 7}}

(get-in {"timestamp" 1291578985220 "scores" {"FSU" 31 "UF" 7}} nil)
;;=> {"timestamp" 1291578985220, "scores" {"FSU" 31, "UF" 7}}
```

## Using hash-map as a function

A hash-map (and list, vector, set) can be called as a function with a key as the argument.  This provides a more terse expression than using `get` and also works irrespective of key types used.

Passing the key `:star-wars` to the hash-map returns the value associated with that key

```clojure
({:star-wars {:characters {:jedi ["Luke" "Obiwan"]}}} :star-wars)
```

A nested hash-map (containing other hash-maps) can be accessed via multiple nested calls to the returned values.

```clojure
((({:star-wars {:characters {:jedi ["Luke" "Obiwan"]}}} :star-wars) :characters) :jedi)
```

## keyword key as a function

A keyword can be called as a function, taking a hash-map as an argument

```clojure
(:star-wars {:star-wars {:characters {:jedi ["Luke" "Obiwan"]}}})
```

A nested hash-map (containing other hash-maps) can be accessed via multiple nested calls to the returned values.

```clojure
(:jedi (:characters (:star-wars {:star-wars {:characters {:jedi ["Luke" "Obiwan"]}}})))
```

## Threading macro

Using keyword keys as functions, the thread macros provide a consistent approach to accessing hash-map data

The hash-map is passed through one or more keyword keys, so obtaining values from a flat or nested hash-map is just the same.

```clojure
(-> hash-map
    :keyword1
    ,,,)
```

If the keys are a type other than keywords, then a get function would be required for accessing the hash-map.

```clojure
(-> hash-maps (get "scores") (get "FSU"))
```

As part of a processing pipeline, taking specific values from a JSON file of association football match statistics

```clojure
(-> match-statistics.json
    (clojure.data.json/read-str :key-fn keyword)
    :totals
    :goals-home-team)
```

## Checking a key or value exists in a hash-map

`keys` function will return a collection of the keys contained in a map.  `vals` returns a collection of the values

is in a map or set. In general I use the value returned from a map or set to determine if a key exists - the following snippet uses that pattern.

Check if a key has a specific value

```clojure
(if (star-wars-map :space-ships)
  (do-true-behaviours)
  (do-false-behaviours))
```

Check a key has a specific value and also use that value

> TODO: is this a good case for if-lets

This pattern fails if the value of :key is nil.

## contains? and some

`contains?` checks for the index of a collection.  The index of a hash-map is the keys it contains

`some` will check for a value in a collection

```clojure
(def recipe-map {:ingredients "tofu"})

(contains? recipe-map :ingredients)
;; => true

(some #{"tofu"} recipe-map)
;; => nil

(vals recipe-map)
;; => ("tofu")

(some #{"tofu"} (vals recipe-map))
;; => "tofu"
```

The key is contained as part of the hash-map index, irrespective of the value associated with that key (so long as there is a legal value associate with the key).

```clojure
(contains? {:totals nil} :totals)
```
