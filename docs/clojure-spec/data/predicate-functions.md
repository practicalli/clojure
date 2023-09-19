# Spec - Predicate functions

A predicate is a function that returns a true or false value and their names end with `?` by convention.

```clojure
(odd? 1)
```

```clojure
(string? "am i a string")
```

```clojure
(int? 2.3)
```

```clojure
(int? 2.3)
```

!!! HINT "`clojure.core` predicate functions"
    [`clojure.core` defines 80+ predicate functions](/reference/standard-library/predicate-functions.md)

## Predicate functions in specs

Predicate functions can be used as un-named specifications to test values conform.

Include the `clojure.spec.alpha` namespace to access the spec functions.

```clojure
(require '[clojure.spec.alpha :as spec])
```

```clojure
(spec/conform int? 42)
```

```clojure
(spec/conform seq? (range 4))
```

## Custom predicate functions

Define custom predicate functions with `defn` or `fn` or the short form `#()`

Using an anonymous function

```clojure
(spec/conform (fn [value] (= value 42)) 42)
```

When the expression is quite terse, then the short form of an anonymous function is typically used.  The `%` represents the value passed as an argument.

```clojure
(spec/conform #(= % 42) 42)
```
