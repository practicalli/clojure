# Pretty Printing data structures

Data structures containing small amounts of data are quite human readable, although can benefit from pretty printing to make them very easy for humans to read.

The larger a data structure becomes, or if a data structure is nested, then there are tools to print out ascii views of the data structures.

## Pretty print hash-maps

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

> #### Hint::Pretty Print evaluation results
> Clojure aware editors should allow the pretty printing of the evaluation results.


## Print Table of nested data structures

Nested data structures can also be shown as a table, especially the common approach of using a vector of hash-maps where each map has the same keys

```clojure
(clojure.pprint/print-table
  [{:location "Scotland" :total-cases 42826 :total-mortality 9202}
   {:location "Wales" :total-cases 50876 :total-mortality 1202}
   {:location "England" :total-cases 5440876 :total-mortality 200202}])
```

```none
| :location | :total-cases | :total-mortality |
|-----------+--------------+------------------|
|  Scotland |        42826 |             9202 |
|     Wales |        50876 |             1202 |
|   England |      5440876 |           200202 |
```


## References

[Data browsers](/clojure-cli/data-browsers/) (Cider Inspector, Portal, Reveal Free) are very useful for larger and nested data structures.
