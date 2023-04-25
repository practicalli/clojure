# map with partial

Lets look at different ways we can map functions over collections with `partial`

We can map over a collection of words and increment them by writing an anonymous function.

```clojure
(map (fn [animal] (str animal "s")) ["pig" "cow" "goat" "cat" "dog" "rabbit"])
```

The anonymous function has a terse form, that removes the boiler plate function definition `(fn [])`, allowing definition of only the body of a function.

`%` represents a single argument passed to the function.  The `%` syntax also supports numbers where there are multiple arguments, e.g. `%1`, `%2` for the first and second arguments.  `%&` represents all other arguments and is the same as `(fn [& args])` or `(fn [arg1 & args])`.

The `#` character tells the Clojure reader that this is the macro form of a function definition and expands the code to the full form before executing.

```
(map #(str % "s") ["pig" "cow" "goat" "cat" "dog" "rabbit"])
```

> #### Hint::When to use the terse form of anonymous function
>
> The terse form is often used with higher order functions, as an argument to a function.
> If the body of the function is simple to comprehend, then the terse form of anonymous function definition is appropriate.  When the body of a function is more complex, then consider using a separate `defn` function definition.

## Returning a Vector instead of a sequence

The `map` function returns a lazy sequence. This is very useful for large data sets.

`mapv` is an eager version of map that returns the result as a vector.  This is useful when you require random access lookup in real time.  `mapv` can also be used to return an eager result if laziness is not required.

```
(mapv #(str % "s") ["pig" "cow" "goat" "cat" "dog" "rabbit"])
```

> #### Hint::Lists and vectors - does it matter?
>
> Some functions in `clojure.core` will return a sequence using the list syntax, even if the arguments given are vectors.  Most of the time this is not important, as Clojure considers values rather than constructs for most of its functions.
> For example, `(= ("pig" "cow" "goat" "cat" "dog" "rabbit") ["pig" "cow" "goat" "cat" "dog" "rabbit"])` is true as the values are compared rather than the type of container (list, vector)

## Using conditionals

Adding sheep as an element raises a problem, as the plural of sheep is sheep.

Using a conditional, a test can be added to determine if a name should be made plural

First lets abstract out the anonymous function to a shared function using `defn`

```
(defn pluralise
  "Pluralise a given string value"
  [animal]
  (str string "s"))
```

`def` will bind a name to our collection of animals

```
(def animals ["pig" "cow" "goat" "cat" "dog" "rabbit"])

(map pluralise animals)
```

The `if` function included a conditional test.  If that test is true the next expression is evaluated.  If the test is false, the second expression is evaluated.

```
(defn pluralise
  "Pluralise a given string value"
  [animal]
  (if (= animal "sheep")
    animal
    (str animal "s")))

(map pluralise animals)
```

There are several animals that do not have a plural form.  Rather than make a complicated test, a collection of animals that are not plural can be defined.

```
(def non-plural-words ["deer" "sheep" "shrimp" ])

(defn pluralise
  "Pluralise a given string value"
  [animal]
  (if (some #{animal} non-plural-words)
    animal
    (str animal "s")))

(def animals ["pig" "cow" "goat" "cat" "dog" "rabbit" "sheep" "shrimp" "deer"])

(map pluralise animals)
```

To keep the function pure, we should pass the non-plural-words as an argument

```
(defn pluralise
  "Pluralise a given string value"
  [animal non-plural-words]
  (if (some #{animal} non-plural-words)
    animal
    (str animal "s")))
```

Using the terse form of the anonymous function, `#()`, call the pluralise function with two arguments.  `map` will replace the `%` character with an element from the animals collection for each element in the collection.

```
(map #(pluralise % non-plural-words) animals)
```

The `partial` function can be used instead of creating an anonymous function, removing the need for more custom code.  The order of the arguments must be swapped for `partial` to call `pluralise` correctly

```
(defn pluralise
  "Pluralise a given string value"
  [non-plural-words animal]
  (if (some #{animal} non-plural-words)
    animal
    (str animal "s")))
```

Now we can call pluralise by wrapping it as a partial function.

The argument that is the non-plural-words is constant, its the individual elements of animals I want to get out via map.  So when map runs it gets an element from the animals collection and adds it to the call to pluralise, along with non-plural-words

```
(map (partial pluralise non-plural-words) animals)
```

Using partial here is like calling `(pluralise non-plural-words ,,,)` but each time including an element from animals where the `,,,` is.

## Learning at the REPL

At first I was getting incorrect output, `["deer" "sheep" "shrimp"]`, then I realised that it was returning the non-plural-words instead of pluralised animals.  The arguments from the partial function were being sent in the wrong order.  So I simply changed the order in the pluralise function and it worked.

I checked this by adding some old-fashioned print statement.

```
(defn pluralise-wrong-argument-order
  "Pluralise a given string value"
  [animal non-plural-words ]
  (if (some #{animal} non-plural-words)
    (do
      (println (str animal " its true"))
      animal)
    (do
      (println (str animal " its false"))
      (str animal "s"))))
```
