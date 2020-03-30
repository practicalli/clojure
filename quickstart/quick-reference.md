# Clojure Quick Reference
The basic Clojure syntax and a few common functions you should probably learn first.

## Calling functions
The first element in a list, `()`, is treated as a call to a function. This is known as prefix notation which greatly simplifies Clojure syntax and makes mathematical expressions completely deterministic, eliminating the need for [operator precedence](https://en.wikipedia.org/wiki/Order_of_operations).
 fs
```clojure
(+ 2 3 5 8 13 (* 3 7))
(+ 3 (* 2 (- 7 2) 4) (/ 16 4))
(clojure-version)
```

Functions contain doc-strings and you can ask for a functions documentation, or show the source code.
```clojure
(doc doc)
(source doc)
```

Clojure is a dynamically typed language, it is also strongly typed (everything is a type, but you dont have to express the type in your code).  The type of anything in Clojure can be returned.

```clojure
(type 42)
(type {:hash "data" :map "more data"})
```

## Modeling data with Collection types
Clojure has 4 main collection types, all immutable (cannot change once created) and can contain any Clojure types.

```clojure
(str "lists used mainly" (* 2 2) :code)

[0 "indexed array"]

{:key "value" :pairs "hash-map" :aka "dictionary"}

#{1 2 3 4 "unique" "set" "of" "values" "unordered" (* 3 9)}
```


## Defining names for values (vars)
Names can be bound to any values, simple values like numbers, collections or functions.  A convenient way to refer to value in your code.
```clojure
(def public-health-data
  ({:date "2020-01-01" :confirmed-cases 23014 :recovery-percent 15}
   {:date "2020-01-02" :confirmed-cases 23014 :recovery-percent 15}
   {:date "2020-01-03" :confirmed-cases 23014 :recovery-percent 15}))

(def add-hundred (partial + 100))
```

## map reduce filter
Common functions for iterating through a collection / sequence of values

```
(map * [1 3 5 8 13 21] [3 5 8 13 21 34])

(filter even? [1 3 5 8 13 21 34])

(reduce + [31 28 30 31 30 31])
```

# Using data structures
Using the `map` and `inc` function, increment all the numbers in a vector

```
(map inc [1 2 3 4 5])
```

The above `map` function is roughly equivalent to the following expression

```
(conj [] (inc 1) (inc 2) (inc 3) (inc 4) (inc 5))
```
The `conj` function creates a new collection by combining a collecion and one or more values.


## Defining custom functions

```clojure
(defn square-of
  "Calculates the square of a given number"
  [number]
  (* number number))
```

Function definitions can also be used within other expressions, useful for mapping custom functions over a collection
```clojure
(fn [x] (* x x))

(map (fn [x] (* x x)) [1 2 3 4 5])
```


## Ratio Type

; Using the division function (/ ) shows another interesting characteristic of Clojure, the fact that it is lazy.  This is not lazy in a bad way, but lazy evaluation of data structures.  This actually helps to make clojure more efficient at dealing with data, especially very large data sets.

```clojure
(/ 22 7)
22/7

(/ 22 7.0)
3.142857142857143

(type (/ 22 7))
```

;; Using a Ratio means that the mathmatical division is not evaluated when using whole numbers (Integers) that would produce a decimal number.  If you do return a decimal number then what precision of decimal are you expecting.  By specifying one or more of the numbers as a decimal value you are giving Clojure a precision to infer and can therefore provide a specific decimal result.


## Java inteoperability
`.` and `new` are Clojure functions that create a Java object. This allows you to use values from Java constants, i.e. PI is a static double from the [java.lang.Math](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html) object

```clojure
(. Math PI)
3.141592653589793
```
Also call static and instance methods from Java objects.

```clojure
(Math/cos 3)

(javax.swing.JOptionPane/showMessageDialog nil
    "Hello Java Developers")
```




## Recursion

Recursive function
```clojure
(defn recursive-counter
  [value]
  (if (< value 1000)
    (recur (+ value 25))))

(recursive-counter 100)

```

* TODO: loop-recur
* TODO: reduce and reducing function
