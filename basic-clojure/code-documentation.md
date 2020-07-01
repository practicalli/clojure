# Code documentation
  Clojure functions are documented by adding a string to the function definition, after the function name.  This is refered to as the **doc string**.

```
(defn example-function
  "This is the documentation for this function, refered to as a doc string"
  [arguments]
  (str "some behaviour"))
```

  `def` bindings can also be documented to provide context to the data the name is bound to.

```clojure
(def weather-data
  "Data set for weather across the major capitals of Europe"
  [{:date "2020-05-015" :city "Berlin" :temperature-max 24 :temperature-min 13 :rainfall 1}
   {:date "2020-05-015" :city "Amsterdam" :temperature-max 25 :temperature-min 14 :rainfall 0}])
```


## Write easily understandable docstrings
Practically recommends including specific details of the arguments passed to a function and the expected return type.  Including this at the end of the docstring makes that information very quick to find.

```clojure
  "Geographic visualization data set generator

  Arguments:
  - combined data set of GeoJSON and Cases
  - maximum integer value for scale
  Returns:
  - Oz view hash-map"
```


## Reading source code
`clojure.repl/source` will show the source code of a given function, which can be a valuable way to understand the function.  Reading function source code also provides ideas when writing custom Clojure code.

Reading the source code for `clojure.core` functions is a good way to learn those functions, although some functions have been optomised for performance and are harder to follow.

[Source code for clojure.core is available online](https://github.com/clojure/clojure/blob/clojure-1.10.1/src/clj/clojure/core.clj) and is also linked to from the function descriptions on [clojuredocs.org](https://clojuredocs.org/).


## Writing your own documentation
Writing good documentation for your own functions take practice which pays off in the long run.

> #### Note::Define your own function
> Practice writing a meaningful documentation in the doc string
```eval-clojure
()
```

<!--sec data-title="Reveal answer..." data-id="answer001" data-collapse=true ces-->
```clojure
(defn my-function
  "I should practice writing clear and meaningful documentation for my functions.
  Arguments: brief description of arguments"
  [arguments]
  (str "I should write pure functions where ever possible. "
       "Each function should have a specific purpose. "
       "A function should be clean and easy to read."))
```
<!--endsec-->
