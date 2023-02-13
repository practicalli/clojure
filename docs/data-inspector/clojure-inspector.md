# Clojure Inspector
A visual browser for Clojure data using the Java UI libraries.

Require the [`clojure.inspector` namespace](https://clojure.github.io/clojure/clojure.inspector-api.html) in the REPL or project namespace definitions to use the functions


=== "Repl"

    ```clojure
    (require '[clojure.inspector :as inspector])
    ```

=== "Project"

    ```clojure
    (ns practicalli.application
      (:require [clojure.inspector :as inspector]))
    ```

* `inspect` for flat data structures
* `inspect-tree` for deeply nested / hierarchically data
* `inspect-table` a sequence of data structures with the same shape


## `inspect`

View flat structures especially with non-trivial size data sets.

This example generated 10,000 random numbers.  The Clojure inspector shows the values along with their index in the collection.

```clojure
(inspector/inspect
  (repeatedly 10000 #(rand-int 101)))
```

![Clojure Inspector - inspect data elements with index](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-inspector-inspect-collection-with-index.png)


## `inspect-tree`

```clojure
(inspect
  {:star-wars
    {:characters
      {:jedi ["obiwan kenobi" "Yoda" "Master Wendoo"]
       :sith ["Palpatine" "Count Dukoo"]}}})
```

![Clojure - Inspector - inspect tree with hash-map](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-inspector-inspect-tree-hash-map.png)


## `inspect-table`

Inspect a sequence of data structures that share the same form, often found in data sets for machine learning and wider data science, eg. daily weather records.

This example generates mock data for a 20 day period for one or more locations.  Each day contains the day, location and cumulative number of cases reported.

```clojure
(defn mock-data-set
  "Generates a set of mock data for each name
  Arguments: names as strings, names used in keys
  Returns: Sequence of maps, each representing confirmed cases"
  [& locations]
  (for [location locations
        day      (range 20)]
    {:day      day
     :location location
     :cases    (+ (Math/pow (* day (count location)) 0.8)
                  (rand-int (count location)))}))

(inspector/inspect-table
  (mock-data-set "England" "Scotland" "Wales" "Northern Ireland"))
```

![Cider Inspector - inspect table - medical cases mock data](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-inspector-inspect-table-uk-cases-by-country.png)
