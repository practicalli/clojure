# Predicate functions
A predicate is a function that returns a true or false value and their names end with `?` by convention.

```eval-clojure
(odd? 1)
```

```eval-clojure
(string? "am i a string")
```

```eval-clojure
(int? 2.3)
```

```eval-clojure
(int? 2.3)
```

> #### Hint::`clojure.core` predicate functions
> There are [80+ predicate functions in `clojure.core`](/reference/clojure/predicates.md)

## Using predicate functions as specifications
Predicate functions can be used as un-named specifications to test values conform.

Include the `clojure.spec.alpha` namespace to access the spec functions.

```eval-clojure
(require '[clojure.spec.alpha :as spec])
```

```eval-clojure
(spec/conform int? 42)
```
```eval-clojure
(spec/conform seq? (range 4))
```


## Custom predicate functions
Define custom predicate functions with `defn` or `fn` or the short form `#()`

Using an anonymous function

```eval-clojure
(spec/conform (fn [value] (= value 42)) 42)
```
When the expression is quite terse, then the short form of an anonymous function is typically used.  The `%` represents the value passed as an argument.

```eval-clojure
(spec/conform #(= % 42) 42)
```
