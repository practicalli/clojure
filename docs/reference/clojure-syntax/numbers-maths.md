# Maths

> **Fixme** Split this into sections ?

  Writing some simple mathematics helps you get used to the form of Clojure.  Unlike other languages, Clojure does not have operators for mathematics.  Instead `+ - * /` are all functions in their own right.

  As Clojure uses pre-fix notation then mathematical expressions are always unambiguous.  There is no need for an operator precedence table in Clojure.

> **Note** Write some simple math to help you get used to the form of Clojure

```clojure
(+ 1 2 3 4 5 6 7)
(- 2 1)
(* 3 7)
(/ 12 4)
(/ 500 20)
(+ 1 1 2489 459 2.)
(+ 1 2 (* 3 4) (- 5 6 -7))
```

![](../images/clojure-playground-maths.png)

## Variable numbers of arguments

  Mathematic functions show the flexibility of Clojure, as they take a variable number of arguments (variadic functions).  Its common for Clojure functions to have zero, one or many arguments (many arguments typically represented as a built-in data structure (map, vector, set or list)

> **Note** Write some more maths to show the variadic nature of mathematic (and manu other) functions

```clojure
(+)
(*)
(* 2)
(+ 4)

(+ 1 2 3)
(< 1 2 3)
(< 1 3 8 4)
```

![](../images/clojure-playground-maths-variadic-functions.png)

> **Note** Explore some number related functions

```clojure
(rem 22 7)
(mod 20 12)
(quot 13 4)

(inc 3)
(dec 4)

(min 1 2 3 5 8 13)
(max 1 2 3 5 8 13)

(repeat 4 9)

(range 10)
(range 18 66)
(range 2 99 2)
```

# Equality

  Equality is represented by the `=` function.  Yes, `=` is a proper function too, not just an operator as with other languages.

> **Note** Explore what equality means in Clojure.  Equality is very useful when your data structures are immutable

```clojure
(= 1 1)
(= 2 1)

(identical? "foo" "bar")
(identical? "foo" "foo")
(= "foo" "bar")
(= "foo" "foo")

(identical? :foo :bar)
(identical? :foo :foo)

(true)
(false)
(not true)
(true? (= 1 1))
(false (= 1 -1))
```

  Equality is very efficient when your data structures are immutable.  For example if you have very large data sets, you can simply compare a hash value to see if those data structures are the same.

  Of course you also have the `not` function for reversing logic too

```clojure
(not true)

=> false
```

## Boolean - True and False

;; some truthiness with math functions for you to try

```clojure
(+)
(class (+))
(*)
(true? +)
(false? +)
(true? *)
(false? *)
(true? 1)
(true? -1)
(true? true)
(- 2)
```


# Boolean & Predicates

Predicates are functions that take a value and return a boolean result (true | false)

```clojure
(true? true)
(true? (not true))
(true? false)
(true? (not false))
(true? nil)
```


# Types

  Clojure uses Java's object types for booleans, strings and numbers.  Use the `class` function to inspect them.

```clojure
(class 1)
; Integer literals are java.lang.Long by default
(class 1.1)    ; Float literals are java.lang.Double

(class "")
; Strings always double-quoted, and are java.lang.String

(class false)  ; Booleans are java.lang.Boolean
(class nil)    ; The "null" value is called nil

(class (list 1 2 3 4))


(class true)
(class ())
(class (list 1 2 34 5))
(class (str 2 3 4 5))
(class (+ 22/7))
(class 5)
(class "fish")
(type [1 2 3])
(type {:a 1 :b 2})

(type (take 3 (range 10)))
```

# Ratios
  To help maintain the precision of numbers, Clojure has a type called Ratio.  So when you are dividing numbers you can keep the as a fraction using whole numbers, rather than constrain the result to a approximate

```clojure
(/ 2)
```

  A classic example is dividing 22 by 7 which is approximately the value of _Pi_

```clojure
(/ 22 7)

(class (/ 22 7))
```

If you want to force Clojure to evaluate this then you can specify one of the numbers with a decimal point

```clojure
(class (/ 22 7.0))
```
