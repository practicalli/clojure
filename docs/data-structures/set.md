# Set

  A Clojure set is a persistent data structure that holds a unique set of elements.  Again the elements can be of any type, however each element must be unique for a valid set.

> **Note** Explore creating sets from existing collections.  Notice what happens if you have duplicate values in the collection.  Define sets directly using the `#{}` notation and see what happens if there are duplicate values.

```clojure
(set `(1 2 3 4))
(set `(1 2 1 2 3 4))

#{1 2 3 4}
#{:a :b :c :d}
;; duplicate key error
#{1 2 3 4 1}
```

## Unique but not ordered

  A set is not ordered by the values it contains.  If you need a sorted set then you can use the `sorted-set` function when creating a new set.  Or you can run

```clojure
(sorted-set 1 4 0 2 9 3 5 3 0 2 7 6 5 5 3 8)

(sort [9 8 7 6 5])
(sort-by )
```

# Looking up values in a set

```clojure
(#{:a :b :c} :c)
(#{:a :b :c} :z)
```

Sets can also use the `contains?` function to see if a value exists in a set

```clojure
(contains?
  #{"Palpatine" "Darth Vader" "Boba Fett" "Darth Tyranus"}
  "Darth Vader")
```
