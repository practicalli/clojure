# Pretty Printing data structures

Data structures containing small amounts of data are quite human readable, although can benefit from pretty printing

Pretty print a hashmaps

```clojure
(clojure.pprint/pprint
  {:account-id 232443344 :account-name "Jenny Jetpack" :balance 9999 :last-update "2021-12-12" :credit-score :aa} )
```

Each key is printed on a new line, making the hash-map easier to read, especially when there are a large number of keys

```clojure
{:account-id 232443344,
 :account-name "Jenny Jetpack",
 :balance 9999,
 :last-update "2021-12-12",
 :credit-score :aa}
```

Clojure aware editors can also have an alighn option when formatting hash-maps, making the results easier to read

```clojure
{:account-id   232443344,
 :account-name "Jenny Jetpack",
 :balance      9999,
 :last-update  "2021-12-12",
 :credit-score :aa}
```


Nested data structures can also be shown as a table, especially the common approach of using a vector of hash-maps where each map has the same keys

```clojure
(clojure.pprint/print-table
  [{:location "Scotland" :total-cases 42826 :total-mortality 9202}
   {:location "Wales" :total-cases 50876 :total-mortality 1202}
   {:location "England" :total-cases 5440876 :total-mortality 200202}])
```

Clojure aware editors should allow the pretty printing of the evaluation results.



[Data browsers](/clojure-tools/data-browsers/) (Cider Inspector, Portal, Reveal Free) are very useful for larger and nested data structures.
