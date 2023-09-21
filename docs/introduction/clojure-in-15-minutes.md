# Clojure in 15 minutes

A quick tour of the Clojure syntax and common functions, which is so terse you can read through this page in around 15 minutes and have a basic understanding of the language.

## Comments

`;;` two semi-colons for a line comment, `;` single semi-colon to comment the rest of the line

`#_` comment reader macro to comment out the next form

`(comment )` form to comment all the containing forms

## Clojure expressions

Clojure is mostly written with "expressions", a lists of elements inside parentheses, `()`, separated by space characters.

Clojure evaluates the first element in an expression as a function call.  Additional elements in the expression are passed as value arguments to the called function.

```clojure
(+ 2007 (* 1 16))       ;; function call with value and expression as arguments
(map inc (range 0 99))  ;; functions can be passed as an argument
```

## Organising Clojure

Clojure code is organised into one or more namespaces. The namespace represents the directory path and file name that contains the code of the particular namespace.

A company name or community repository name is often used making the namespace unique and easier to share & reuse.

```clojure
;; Define the namespace test
(ns practicalli.game-board)  ;; src/practicalli/game_board.clj

;; Define a longer namespace
(ns com.company.product.component-name)  ;; src/com/company/product/component_name.clj
```

??? WARNING "Namespaces use dash, directory and file names use underscore"
    Clojure uses `kebab-case` for names (common in Lisp dialects)

    Unfortunately the Java Virtual Machine that hosts Clojure does not support dash, `-`, in file and directory names, so an underscore, `-`, character is used


## String manipulation

The `str` function creates a new string from all the arguments passed

```clojure
(str "Hello" " " "World")
; => "Hello World"
```

`clojure.string` returns string values (other functions my return characters as results)

## Math, Truth & prefix notation

Functions use prefix notation, so you can do math with multiple values very easily

```clojure
(+ 1 2 3 5 7 9 12) ; => 40
(- 24 7 3) ; => 14
(* 1 2) ; => 2
(/ 27 7) ; => 22/7
```

Math is very precise, no need for operator precedence rules (as there are no operators)

Nesting forms defined a very precise calculation

```clojure
(+ 1 (- 3 2)) ; = 1 + (3 - 2) => 2
```

Equality is =

```clojure
(= 1 1) ; => true
(= 2 1) ; => false
```

`true` and `false` are Boolean values

```clojure
(true? true) ; => true
(not true) ; => false
(not= true false) ; => true
(true? (complement true?)) ; => false
```

## Types

Clojure is strongly typed, so everything is a type in Clojure.

Clojure is dynamically typed, so Clojure infers the type.  A type does not need to be specified in the code, making the code simpler and more concise.

Clojure is a hosted language and uses the type system of the platform it runs upon.  For example, Clojure uses Java object types for booleans, strings and numbers under the covers.

Use `class` or `type` function to inspect the type of some code in Clojure.

```clojure
(type 1) ; Integer literals are java.lang.Long by default
(type 1.); Float literals are java.lang.Double
(type ""); Strings always double-quoted, and are java.lang.String
(type false) ; Booleans are java.lang.Boolean
(type nil); The "null" value is called nil
```

Vectors and Lists are java classes too!

```
(type [1 2 3]); => clojure.lang.PersistentVector
(type '(1 2 3)); => clojure.lang.PersistentList
```

### Collections & Sequences

The most common data collections in Clojure:

* `(1 2 "three")` or `(list 1 2 "three")` - a list of values read from start to end (sequential access)
* `[1 2 "three"]` or `(list 1 2 "three")` - a vector of values with index (random access)
* `{:key "value"}` or `(hash-map :key "value")` - a hash-map with zero or more key value pairs (associative relation)
* `#{1 2 "three"}` or `(set 1 2 "three")` - a unique set of values

A list `()` is evaluated as a function call. The first element of the list the name of the function to call and additional values are arguments to the function.

The `'` quote function informs the Clojure reader to treat the list as data only.

```clojure
'(1 2 3)
```

Lists and vectors are collections

```clojure
(coll? '(1 2 3)) ; => true
(coll? [1 2 3]) ; => true
```

Only lists are sequences

```clojure
(seq? '(1 2 3)) ; => true
(seq? [1 2 3]) ; => false
```

Sequences are an interface for logical lists, which can be lazy. "Lazy" means that a sequence of valus are not evaluated until accessed.

A lazy sequence enables the use of large or even an infinite series, like so:

```clojure
(range) ; => (0 1 2 3 4 ...) - an infinite series
(take 4 (range)) ;  (0 1 2 3) - lazyily evaluate range and stop when enough values are taken
```

Use cons to add an item to the beginning of a list or vector

```clojure
(cons 4 [1 2 3]) ; => (4 1 2 3)
(cons 4 '(1 2 3)) ; => (4 1 2 3)
```

Use conj to add an item relative to the type of collection, to the beginning of a list or the end of a vector

```clojure
(conj [1 2 3] 4) ; => [1 2 3 4]
(conj '(1 2 3) 4) ; => (4 1 2 3)
```

Use concat to add lists or vectors together

```clojure
(concat [1 2] '(3 4)) ; => (1 2 3 4)
```

Use filter, map to interact with collections

```clojure
(map inc [1 2 3]) ; => (2 3 4)
(filter even? [1 2 3]) ; => (2)
```

Use reduce to reduce them

```clojure
(reduce + [1 2 3 4])
; = (+ (+ (+ 1 2) 3) 4)
; => 10
```

Reduce can take an initial-value argument too

```clojure
(reduce conj [] '(3 2 1))
; => [3 2 1]
```

Equivalent of `(conj (conj (conj [] 3) 2) 1)`

## Functions

Use `fn` to create new functions that defines some behaviour. `fn` is referred to as an anonymous fuction as it has no external name to be referenced by and must be called within a list form.

```clojure
(fn hello [] "Hello World") ; => hello
```

Wrap a `(fn ,,,)` form in parens to call it and return the result

```clojure
((fn hello [] "Hello World")) ; => "Hello World"
```

Create a reusable function using `defn`, creating a name that is a `var`.  The function behaviour defined in `defn` can be changed and the expression re-evaluated to use the new behaviour.

```clojure
(defn hello-world []
  "Hello World")
;; => "Hello World"
```

The [] is the list of arguments for the function.

```clojure
(defn hello [name]
  (str "Hello " name))
(hello "Steve") ; => "Hello Steve"
```

Clojure supports  multi-variadic functions, allowing one function definition to respond to a function call with different number of arguments

```clojure
(defn hello3
  ([] "Hello World")
  ([name] (str "Hello " name)))
(hello3 "Jake") ; => "Hello Jake"
(hello3) ; => "Hello World"
```

Functions can pack extra arguments up in a seq for you

```clojure
(defn count-args [& args]
  (str "You passed " (count args) " args: " args))
(count-args 1 2 3) ; => "You passed 3 args: (1 2 3)"
```

You can mix regular and packed arguments

```clojure
(defn hello-count [name & args]
  (str "Hello " name ", you passed " (count args) " extra args"))
(hello-count "Finn" 1 2 3)
; => "Hello Finn, you passed 3 extra args"
```

## Hash-map collections

```clojure
(class {:a 1 :b 2 :c 3}) ; => clojure.lang.PersistentArrayMap
```

Keywords are like strings with some efficiency bonuses

```clojure
(class :a) ; => clojure.lang.Keyword
```

Maps can use any type as a key, but usually keywords are best

```clojure
(def stringmap (hash-map "a" 1, "b" 2, "c" 3))
stringmap  ; => {"a" 1, "b" 2, "c" 3}

(def keymap (hash-map :a 1 :b 2 :c 3))
keymap ; => {:a 1, :c 3, :b 2} (order is not guaranteed)
```

??? INFO "Commas are whitespace"
    commas are always treated as whitespace and are ignored by the Clojure reader

Retrieve a value from a map by calling it as a function

```clojure
(stringmap "a") ; => 1
(keymap :a) ; => 1
```

Keywords can be used to retrieve their value from a map.  Strings cannot be used.

```clojure
(:b keymap) ; => 2

("a" stringmap)
; => Exception: java.lang.String cannot be cast to clojure.lang.IFn
```

Retrieving a non-present value returns nil

```clojure
(stringmap "d") ; => nil
```

Use assoc to add new keys to hash-maps

```clojure
(assoc keymap :d 4) ; => {:a 1, :b 2, :c 3, :d 4}
```

But remember, clojure types are immutable!

```clojure
keymap ; => {:a 1, :b 2, :c 3}
```

Use dissoc to remove keys

```clojure
(dissoc keymap :a :b) ; => {:c 3}
```

## Sets

```clojure
(class #{1 2 3}) ; => clojure.lang.PersistentHashSet
(set [1 2 3 1 2 3 3 2 1 3 2 1]) ; => #{1 2 3}
```

Add a member with conj

```clojure
(conj #{1 2 3} 4) ; => #{1 2 3 4}
```

Remove one with disj

```clojure
(disj #{1 2 3} 1) ; => #{2 3}
````

Test for existence by using the set as a function:

```clojure
(#{1 2 3} 1) ; => 1
(#{1 2 3} 4) ; => nil
```

There are more functions in the clojure.sets namespace.

## Useful forms

Logic constructs in clojure are just macros, and look like everything else

```clojure
(if false "a" "b") ; => "b"
(if false "a") ; => nil
```

Use let to create temporary bindings

```clojure
(let [a 1 b 2]
  (> a b)) ; => false
```

Group statements together with do

```clojure
(do
  (print "Hello")
  "World") ; => "World" (prints "Hello")
```

Functions have an implicit do

```clojure
(defn print-and-say-hello [name]
  (print "Saying hello to " name)
  (str "Hello " name))
(print-and-say-hello "Jeff") ;=> "Hello Jeff" (prints "Saying hello to Jeff")
```

So does let

```clojure
(let [name "Urkel"]
  (print "Saying hello to " name)
  (str "Hello " name)) ; => "Hello Urkel" (prints "Saying hello to Urkel")
```

## Namespaces and Libraries

Namespaces are used to organise code into logical groups.  The top of each Clojure file has an `ns` form that defines the namespace name.  The domain part of the namespace name is typically the organisation or community name (e.g. GitHub user/organisation)

```clojure
(ns domain.namespace-name)
```

All Practicalli projects have namespace domains of `practicalli`

```clojure
(ns practicalli.service-name)
```

`require` allows code from one namespace to be accessed from another namespace, either from a the same Clojure project or from a library added to the project classpath.

The `:as` directive with `require` is used to specify an alias name, a short-hand for the full library name

Or `:refer [function-name var-name]` can be used to specify specific functions and data (vars) that are available directly

A required directive is typically added to a namespace form

```clojure
(ns practicalli.service-name
  (require [clojure.set :as set]))
```

The functions from clojure.set can be used via the alias name, rather than the fully qualified name, i.e. `clojure.set/intersection`

```clojure
(set/intersection #{1 2 3} #{2 3 4}) ; => #{2 3}
(set/difference #{1 2 3} #{2 3 4}) ; => #{1}
```

`:require` directive can be used to include multiple library namespaces

```clojure
(ns test
  (:require
    [clojure.string :as string]
    [clojure.set :as set]))
```

`require` can be used by itself, usually within a rich code block

```clojure
(comment
  (require 'clojure.set :as set))
```

## Java Interop

Java has a huge and useful standard library, so you'll want to learn how to get at it.

Use import to load a java package

```clojure
(import java.util.Date)
```

Or import from a java package name

```clojure
(ns test
  (:import
    java.util.Date
    java.util.Calendar))
```

Use the class name with a "." at the end to make a new instance

```clojure
(Date.) ; <a date object>
```

Use `.` to call methods. Or, use the ".method" shortcut

```clojure
(. (Date.) getTime) ; <a timestamp>
(.getTime (Date.))  ; exactly the same thing.
```

Use / to call static methods

```clojure
(System/currentTimeMillis) ; <a timestamp> (system is always present)
```

Use doto to make dealing with (mutable) classes more tolerable

```clojure
(import java.util.Calendar)
(doto (Calendar/getInstance)
  (.set 2000 1 1 0 0 0)
  .getTime) ; => A Date. set to 2000-01-01 00:00:00
```
