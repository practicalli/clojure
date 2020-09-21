# Clojure Quick Reference
The basic Clojure syntax and a few common functions you should probably learn first.

The examples are editable (using an embedded REPL) so feel free to experiment and watch as the return value changes as you change the code.  Reload the page if you want to reset all the code back to the starting point.

[Install Clojure](/clojure-tools/install/) on your computer if you want to experiment even further.

> #### Hint::Want to go deeper already?
> Watch [the Clojure language video series by Brian Will](https://www.youtube.com/playlist?list=PLAC43CFB134E85266) for a good introduction to key parts of the language.  Or practice Clojure by completing simple challenges on [4Clojure.com](http://www.4clojure.com/) and then [watching how Practicalli solved them](https://www.youtube.com/playlist?list=PLpr9V-R8ZxiDB_KGrbliCsCUrmcBvdW16).

<!-- Klipse reagent include to generate SVG graphics - hidden as not relevant at this point -->
<pre class="hidden">
  <code class="lang-eval-clojure" data-preamble="(require '[reagent.core :as r])">
  </code>
</pre>


## Calling functions
The first element in a list, `()`, is treated as a call to a function. The examples show how to call functions with multiple arguments.

```eval-clojure
(+ 1 2)
```
```eval-clojure
(+ 3 (* 2 (- 7 2) 4) (/ 16 4))
```
```eval-clojure
(str "Clojure is " (- 2020 2007) " years old")
```
```eval-clojure
(inc 1)
```
```eval-clojure
(map inc [1 2 3 4 5])
```
```eval-clojure
(filter odd? (range 11))
```

> #### Hint::Prefix notation and parens
> Hugging code with `()` is a simple syntax to define the scope of code expressions.  No additional `;`, `,` or spaces are required.
>
> Treating the first element of a list as a function call is referred to as prefix notation, which greatly simplifies Clojure syntax.  Prefix notation makes mathematical expressions completely deterministic, eliminating the need for [operator precedence](https://en.wikipedia.org/wiki/Order_of_operations).


## Understanding functions
Functions contain doc-strings describing what that function does. The `doc` function returns the doc-string of a particular function.  Most editors also support viewing of doc-strings as well as jumping to function definitions to view the source code
```eval-clojure
(doc doc)
```

## Modeling data with Collection types
Clojure has 4 main collection types, all immutable (cannot change once created) and can contain any Clojure types.

```eval-clojure
(str "lists used mainly " (* 2 2) " " :code)
```
```eval-clojure
[0 "indexed" :array (* 2 2) "random-access"]
```
```eval-clojure
{:key "value" "hash-map" "also referred to as dictionary"}
```
```eval-clojure
#{1 2 3 4 "unique" "set" "of" "values" "unordered" (* 3 9)}
```

> #### Hint::Persistent data types
> To change data in Clojure new copies are created rather than changing existing values.  The copies of data will share values from the original data that are common in both.  This sharing is called persistent data types and enables immutable data to be used efficiently.


## Defining names for values (vars)
Names can be bound to any values, from simple values like numbers, collections or even function calls.  Using `def` is convenient way to create names for values that are shared in your code.

evaluating a name will return the value it is bound to.
```eval-clojure
(def public-health-data
  [{:date "2020-01-01" :confirmed-cases 23814 :recovery-percent 15}
   {:date "2020-01-02" :confirmed-cases 24329 :recovery-percent 14}
   {:date "2020-01-03" :confirmed-cases 25057 :recovery-percent 12}])

public-health-data
```

> #### Hint::def for shared values, let for locally scoped values
> `let` function is used to bind names to values locally, such as within a function definition.  Names bound with `def` have namespace scope so can be used with any code in that namespace.


# Using data structures
Using the `map` and `inc` function, increment all the numbers in a vector

```eval-clojure
(map inc [1 2 3 4 5])
```

The above `map` function is roughly equivalent to the following expression

```eval-clojure
(conj [] (inc 1) (inc 2) (inc 3) (inc 4) (inc 5))
```
The `conj` function creates a new collection by combining a collecion and one or more values.

`map` `reduce` `filter` are common functions for iterating through a collection / sequence of values

```eval-clojure
(map * [1 3 5 8 13 21] [3 5 8 13 21 34])
```

```eval-clojure
(filter even? [1 3 5 8 13 21 34])
```

```eval-clojure
(reduce + [31 28 30 31 30 31])
```

```eval-clojure
(empty? [])
```


## Defining custom functions

```eval-clojure
(defn square-of
  "Calculates the square of a given number"
  [number]
  (* number number))

(square-of 9)
```

Function definitions can also be used within other expressions, useful for mapping custom functions over a collection
```eval-clojure
(map (fn [x] (* x x)) [1 2 3 4 5])
```

<!-- Not available in ClojureScript REPL -->
<!-- ## Ratio Type -->
<!-- A Ratio type holds a value that is a fraction, such as 22/7.  This is not a function call, it is a legal value in Clojure. -->

<!-- The Ratio value is used to maintain precision of a calculation of whole numbers (Integers) where otherwise a decimal number of a fixed precision size would be used. -->

<!-- The division function, `/`, will return ratio types rather than decimal types to preserve the accuracy of the calculation.  If one or more of the numbers in the `/`as a decimal value you are giving Clojure a precision to infer and can therefore provide a specific decimal result. -->
<!-- ```eval-clojure -->
<!-- 22/7 -->
<!-- ;;(/ 22 7) -->
<!-- ;; (/ 22 7.0) -->
<!-- ;; (type (/ 22 7)) -->
<!-- ``` -->


## Host Interoperability
The REPL in this web page is running inside a JavaScript engine, so JavaScript functions can be used from within ClojureScript code (ClojureScript is Clojure that runs in JavaScript environments).

In the box below, replace `()` with `(js/alert "I am a pop-up alert")`

```eval-clojure
()
```

> #### Hint::Java libraries in Clojure
> [java.lang library](https://docs.oracle.com/javase/8/docs/api/java/lang/compact2-package-summary.html) is available in Clojure by default and many other Java methods can be included by using their full name, e.g. `(java.lang.Date.)` will return the current date.


## Next steps
[Install Clojure](/clojure-tools/install/) on your computer if you want to experiment even further or keep on reading more about Clojure.


<!-- ## Recursion -->

<!-- Recursive function -->
<!-- ```eval-clojure -->
<!-- (defn recursive-counter -->
<!--   [value] -->
<!--   (if (< value 1000) -->
<!--     (recur (+ value 25)))) -->

<!-- (recursive-counter 100) -->

<!-- ``` -->

<!-- * TODO: loop-recur -->
<!-- * TODO: reduce and reducing function -->





<!-- ## Strongly typed under the covers -->
<!-- Many programming languages use 'types' to define the shape of data in a program.  The right type of information is sometimes important for a program to work correctly. -->

<!-- Clojure is a [dynamically typed language](https://en.wikipedia.org/wiki/Type_system#Dynamic_typing) so types are automatically inferred and do not need to be explicitly written in the code.  This helps make Clojure code easier to read. -->

<!-- Clojure is [a strongly typed language](https://en.wikipedia.org/wiki/Strong_and_weak_typing) so everything is a type underneath, relative to the host platform (Clojure uses Java types, ClojureScript uses JavaScript types).  The type of anything in Clojure can be returned using the `type` function. -->

<!-- ```eval-clojure -->
<!-- (type 42) -->
<!-- ``` -->

<!-- ```eval-clojure -->
<!-- (type {:hash "data" :map "more data"}) -->
<!-- ``` -->
