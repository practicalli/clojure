# filter and remove

Use filter and remove with predicate functions, those returning true or false, to create a sub-set of the data.

filter creates a new collection that contains all the matching values from the predicate function (true).

`remove` creates a new collection with contains all the values that didn't match the predicate function (false).

> #### TODO::work in progress, sorry

```clojure
(filter odd? [1 2 3 4 5 6 7 8 9])
```
