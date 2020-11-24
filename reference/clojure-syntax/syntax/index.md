# Clojure Syntax
The Clojure syntax is very small and is actually a data structure, defined as a list, `()`, with the first element of a list being a function call and all other elements arguments to that function.

Examples are editable (using an embedded REPL) so feel free to experiment and watch as the return value changes as you change the code. Reload the page if you want to reset all the code back to the starting point.

## edn based notation
The core Clojure syntax is defined in the [extensible data notation (edn)](https://github.com/edn-format/edn). edn demonstrates that Clojure code is defined as a series of data structures

Clojure adds an execution model on top of edn to make a programming language and is a super-set of edn.

edn is used as a data transfer format, especially for [Datomic](https://www.datomic.com/) the Clojure transactional database

* [A case for Clojure by James Reeves](https://skillsmatter.com/skillscasts/10415-a-case-for-clojure) provides a great introduction to edn


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

## Strongly typed under the covers
Clojure is a dynamically typed language so types do not need to be explicitly defined, although type hints can be added for performance where required.

Clojure is strongly typed and everything is a type underneath, relative to the host platform (Clojure uses Java types, ClojureScript uses JavaScript types).  The type of anything in Clojure can be returned using the `type` function.

```eval-clojure
(type 42)
;; (type {:hash "data" :map "more data"})
```
```eval-clojure
(type {:hash "data" :map "more data"})
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
  ({:date "2020-01-01" :confirmed-cases 23014 :recovery-percent 15}
   {:date "2020-01-02" :confirmed-cases 23014 :recovery-percent 15}
   {:date "2020-01-03" :confirmed-cases 23014 :recovery-percent 15}))

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

JavaScript libraries can be used with ClojureScript, such as React.js

```reagent
(defn concentric-circles []
  [:svg {:style {:border "1px solid"
                 :background "white"
                 :width "150px"
                 :height "150px"}}
   [:circle {:r 50, :cx 75, :cy 75, :fill "green"}]
   [:circle {:r 25, :cx 75, :cy 75, :fill "blue"}]
   [:path {:stroke-width 12
           :stroke "white"
           :fill "none"
           :d "M 30,40 C 100,40 50,110 120,110"}]
   [:path {:stroke-width 12
           :stroke "white"
           :fill "none"
           :d "M 75,75 C 50,90 50,110 35,110"}]])
```



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
