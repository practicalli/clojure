![Clojure - Simple projects - Encoding and decoding](/images/simple-projects-encoding-true-false.png)

# Convert boolean true false to 1 and 0

A very simple example of encoding and decoding is converting the Clojure values of `true` and `false` to `1` and `0` respectively.

> Using `1` for true and `0` for false has been a common idiom in programming languages, especially where a language did not include `true` and `false` syntax.

## Define an association between values

Define a Clojure `hash-map` to associate the Clojure boolean `true` an `false` values to `1` and `0` respectively

```clojure
{false 0
 true 1}
```

## Find an associated value for the conversion

Using the `get` function the `boolean-value` is used to find a matching key in the map and if found the value that key is associated is returned.

```clojure
(get {false 0 true 1} boolean-value)
```

Example:

```clojure
(get {false 0 true 1} true)
```

A map can be called, just like a function.  the `boolean-value` is passed to the map as a function argument. As with the `get` expression, if the map contains the key the associated value is returned.

```clojure
({false 0 true 1} boolean-value)
```

Example:

```clojure
({false 0 true 1} true)
```

## Convert multiple boolean values

If there are a collection of boolean values to convert, the `map` function can be used to convert them all to 1 or 0.

Map this over a collection of values

```clojure
(map {false 0 true 1} [collection-of-boolean-values])
```

Example:

```clojure
(map {false 0 true 1} [true false false true true true false false true false true false false true])
```

### How does this work?

The `map` function takes two arguments, a function and a collection.  The `map` function calls the function given as an argument and calls it with each element of the collection in turn.  The result of each call is remembered by the `map` function and when the last element of the collection has been used, a new collection of all the results is returned.

In the above example, the hash-map {false 0 true 1} acts as a function.

```clojure
({false 0 true 1} true)
```

A hash-map acts as a function in that it can return an associated value when given a key as an argument.

Calling `{false 0 true 1}` with `true` as an argument returns the value `1`.
