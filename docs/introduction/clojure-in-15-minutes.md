# Clojure in 15 minutes

A quick tour of the Clojure syntax and common functions. The syntax is quite minimal so this should take around 15 minutest to read through (it may take longer to get comfortable with).

!!! HINT "Try the code out in the REPL"
    [:fontawesome-solid-book-open: Start a Clojure REPL](/clojure/clojure-cli/repl/) or use a [:fontawesome-solid-book-open: Clojure aware editor](/clojure/clojure-editors/) connected to a REPL and experiment with these code examples.

    Using the REPL provides instant feedback on each expression as they are evaluated, greatly increasing your understanding.


## Clojure expressions

Clojure is written with "expressions", a lists of elements inside parentheses, `()`, separated by space characters.

An expression is made of one or more forms, a form is a general term for anything that legally evaluates in Clojure, e.g. a number, string function definition, etc.

Clojure evaluates the first element in an expression as a function call.  Additional elements in the expression are passed as value arguments to the called function.

!!! EXAMPLE "Function call with value and expression as arguments"
    ```clojure
    (+ 2007 (* 1 16))
    ```

!!! EXAMPLE "Functions can be passed as an argument"
    ```clojure
    (map inc (range 0 99))
    ```


## Comment

`;;` two semi-colons for a line comment, `;` single semi-colon to comment the rest of the line

`#_` comment reader macro to skip specific parts of code, e.g. `(+ 1 2 #_(* 3 4))` is read as `(+ 1 2)`

`(comment ,,,)` form to comment all the containing forms, useful to [:fontawesome-solid-book-open: separate experimental and established code](/clojure/introduction/repl-workflow/#rich-comment-blocks-living-documentation) in a namespace.  Note that `(comment )` returns `nil` when evaluated so shouldn't be used inside other code.


## Organising Clojure

Clojure code is organised into one or more namespaces. The namespace represents the directory path and file name that contains the code of the particular namespace.

A company name or community repository name is often used making the namespace unique and easier to share & reuse.

??? INFO "ns form returns nil value"
    The `(ns namespace.,,,)` expression returns a `nil` value, as its work is done behind the scenes.

    All Clojure functions must return a value and `nil` is a value that means 'no value'.

!!! EXAMPLE "Define a namespace"
    ```clojure title="src/practicalli/game_board.clj"
    (ns practicalli.game-board)
    ```

!!! EXAMPLE "Define a longer namespace"
    ```clojure title="src/com/company/product/component_name.clj"
    (ns com.company.product.component-name)
    ```

??? WARNING "Namespaces use dash, directory and file names use underscore"
    Clojure uses `kebab-case` for names (common in Lisp dialects)

    Unfortunately the Java Virtual Machine that hosts Clojure does not support dash, `-`, in file and directory names, so an underscore, `-`, character is used


## String manipulation

The `str` function creates a new string from all the arguments passed

!!! EXAMPLE "Combine strings into a single string value"
    ```clojure
    (str "Hello" " " "World")
    ```

`"Hello World"` is returned from evaluating the expression.

!!! HINT "clojure.string library for manipulating strings"
    `clojure.string` library functions manipulate values and return string values (other clojure.core functions my return characters as results, e.g. `map`)


## Math, Truth & prefix notation

Functions use prefix notation, so you can do math with multiple values very easily

!!! EXAMPLE "Prefix syntax takes multiple arguments"
    ```clojure
    (+ 1 2 3 5 7 9 12) ; => 40
    ```

Math in Clojure is very precise, no need for operator precedence rules (as there are no operators)

Nesting forms defined a very precise calculation

!!! EXAMPLE "Parentheses used instead of operator preceedence rules"
    ```clojure
    (* 1 2 (- 24 (* 7 3)))
    ```

`6` is returned as the value.  Nested expressions are typically read inside out.  `(* 7 3)` is `21`, giving `(- 24 21)` expression resulting in `3`.  Finally the expression becomes `(* 1 2 3)`, resulting in a value of `6`


Maintain precision for calculations using a Ratio type in Clojure

!!! EXAMPLE "Clojure Ratio value"
    ```clojure
    (/ 27 7)  ; => 27/7
    ```

`22/7` is returned as the value, rather than a floating point value (double) which may loose some precision due to rounding.


### Equality

`=` function provides a test for equality

!!! EXAMPLE "Equal values return a boolean true"
    ```clojure
    (= 1 1) ; => true
    ```

!!! EXAMPLE "Unequals values return a boolean false"
    ```clojure
    (= 2 1) ; => false
    ```

`true` and `false` are Boolean values and can be used literally in Clojure.


### Predicates

A predicate is a function that returns a boolean `true` or `false` value and by convention the function name ends in `?`, e.g. `true?`, `false?`, `seq?`, `even?`, `uuid?`.

`and` & `or` functions can be used to chain the results of predicates together for more interesting conditional tests.

!!! EXAMPLE "All predicates are true, returning true"
    ```clojure
    (and (true? true) (not false)) ; => true
    ```

!!! EXAMPLE "One of the predicates or values is true"
    ```clojure
    (or nil (not= true false) (true? (complement true?)) ) ; => true
    ```

!!! HINT "Truthy and Falsy values in Clojure"
    `false` boolean value and `nil` value are considered false in Clojure.

    All other values are consider true.


[:fontawesome-solid-book-open: Clojure Standard Library Predicate Functions](https://practical.li/clojure/reference/standard-library/predicate-functions/){.md-button}


## Collections & Sequences

The most common data collections in Clojure:

* List literal `(1 2 "three")` or function call `(list 1 2 "three")` - a list of values read from start to end (sequential access)
* Vector literal `[1 2 "three"]` or function call `(vector 1 2 "three")` - a vector of values with index (random access)
* Hash-map literal `{:key "value"}` or function call `(hash-map :key "value")` - a hash-map with zero or more key value pairs (associative relation)
* Set literal `#{1 2 "three"}` or function call `(set 1 2 "three")` - a unique set of values

A literal list `()` expression is evaluated as a function call. The first element in the list is the name of the function to call and additional values are arguments to the function (assuming the function takes arguments).

The `'` is syntax short-cut for the `quote` function which informs the Clojure reader to treat a list as data only. A quoted list is not evaluated as a function.

!!! EXAMPLE "Evaluating a quoted list returns that list as data"
    ```clojure
    '(1 2 3) ; => (1 2 3)
    ```

!!! EXAMPLE "Lists and vectors are collections"
    ```clojure
    (and (coll? '(1 2 3)) (coll? [1 2 3])) ; => true
    ```

Only lists are sequences

```clojure
(seq? '(1 2 3)) ; => true
(seq? [1 2 3]) ; => false
```

Sequences are an interface for logical lists, which can be lazy. "Lazy" means that a sequence of values are not evaluated until accessed.

The `range` function generates an 'infinite' series of numbers, e.g. `(range) ; => (0 1 2 3 4 ...)`

Lazily evaluating a sequence enables the use of large or even an infinite series without consuming all the computer memory, like so:

!!! EXAMPLE "Lazy sequences"
    ```clojure
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

Use `concat` (concatenate) to add sequences (lists or vectors) together

```clojure
(concat [1 2] '(3 4)) ; => (1 2 3 4)
```

`filter` maps another function over a collection of values, returning the values that returned true from the function used by filter

```clojure
(map inc [1 2 3]) ; => (2 3 4)
(filter even? [1 2 3]) ; => (2)
```

`reduce` uses a function over a collection of values to return a combined result

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

The above is the equivalent of `(conj (conj (conj [] 3) 2) 1)`


## Anonymous Functions

Use `fn` to create new functions that defines some behaviour. `fn` is referred to as an anonymous function as it has no external name to be referenced by and must be called within a list form.

```clojure
(fn hello [] "Hello World")
```

Wrap an anonymous function `(fn ,,,)` expression in another list to call it and return the result.

!!! EXAMPLE "Call an anonymous function"
    ```clojure
    ((fn hello [] "Hello World")) ; => "Hello World"
    ```

Normally the anonymous function is used inline with other code

!!! EXAMPLE "Use anonymous function within other code"
    ```clojure
    (map (fn [x] (* x 2)) [1 2 3 4  [1 2 3 4 5]5])
    ```

Make the anonymous function reusable by binding it to a shared name (`var`) using `def`.

The `var` name bound to the function can now be called anywhere in the namespace.

> As `def` creates a `var` (variable) name, the developer can changed the expression the name is bound to and re-evaluated to use the changed behaviour.

!!! EXAMPLE "Bind a name to the anonymous function"
    ```clojure
    (def hello-world
      (fn hello [] "Hello World"))
    ```

!!! EXAMPLE "Evaluate anonymous function by evaluating its name"
    ```clojure
    hello-world
    ```

> NOTE: `hello-world` is a name and not a function call, so parentheses are not required.


## Shared Functions

It is more common to use the `defn` macro to define a function.  This is the same as defining the `fn` function and the `def` name within the same expression

!!! EXAMPLE "Define a function with defn macro"
    ```clojure
    (defn hello-world
      "I am a humble doc-string, please describe the function purpose"
     []
     "Hello World")
    ```

`#'user/hello-world` is the value returned from evaluating the expression, showing the fully qualified name of the function.  Note: the fully qualified name will be different when defined in a different namespace than `user`.


> A `defn` function has the scope of the current namespace, so can be called anywhere in the namespace or in a namepace that has used `require` to include this namespace.

!!! EXAMPLE "Call a function"
    ```clojure
    (hello-world)
    ```

The `[]` vector is used to define the argument names for the function.  There can be zero or more arguments.

!!! EXAMPLE "Call function with arguments"
    ```clojure
    (defn hello [name]
      (str "Hello " name))
    ```

The correct number of arguments must be used when calling a function, or an error will be returned.

!!! EXAMPLE "Call function with arguments"
    ```clojure
    (hello "Steve") ; => "Hello Steve"
    ```

??? HINT "Pass a hash-map as an argument"
    Simplify the design of a function signature by passing all arguments as a hash-map.
    ```clojure
    (defn data-processing
      [data]
      (let [body (get data :body)])
        (transform body))
    ```
    [:globe_with_meridians: Associative Destructuring](https://clojure.org/guides/destructuring#_associative_destructuring){target=_blank} can be used to automatically create local variables from the desired keys contained in the map, giving access to the value of each key.
    ```clojure
    (defn data-processing
      [{:keys [body]}]
      (transform body))
    ```


Clojure supports multi-variadic functions, allowing one function definition to respond to a function call with different number of arguments.  This provides a simple form of polymorphism based on the number of arguments.

```clojure
(defn hello-polly
  ([] "Hello World")  ; (1)!
  ([name] (str "Hello " name))) ; (2)!
```

  1. Call `hello-polly` with one argument
     ```clojure
     (hello-polly "Jake") ; => "Hello Jake"
     ```

  2. Call `hello-polly` with zero arguments
     ```clojure
     (hello-polly) ; => "Hello World"
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

But remember, Clojure types are immutable!

```clojure
keymap ; => {:a 1, :b 2, :c 3}
```

Use `dissoc` function to remove keys from a hash-map

```clojure
(dissoc keymap :a :b) ; => {:c 3}
```

## Sets

```clojure
(class #{1 2 3}) ; => clojure.lang.PersistentHashSet
(set [1 2 3 1 2 3 3 2 1 3 2 1]) ; => #{1 2 3}
```

Add a value to a set with `conj` (conjoin)

```clojure
(conj #{1 2 3} 4) ; => #{1 2 3 4}
```

Remove one value from a set with `disj` (disjoin)

```clojure
(disj #{1 2 3} 1) ; => #{2 3}
````

Test for existence by using the set as a function:

```clojure
(#{1 2 3} 1) ; => 1
(#{1 2 3} 4) ; => nil
```

There are more functions in the [clojure.sets namespace](https://clojure.github.io/clojure/clojure.set-api.html).

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

Functions have an implicit `do` function that will call every expression within a function definition.

```clojure
(defn print-and-say-hello [name]
  (print "Saying hello to " name)
  (str "Hello " name))
(print-and-say-hello "Jeff") ;=> "Hello Jeff" (prints "Saying hello to Jeff")
```

The `let` function also has an implicit `do` function.

```clojure
(let [name "Urkel"]
  (print "Saying hello to " name)
  (str "Hello " name)) ; => "Hello Urkel" (prints "Saying hello to Urkel")
```

## Namespaces and Libraries

Namespaces are used to organise code into logical groups.  The top of each Clojure file has an `ns` form that defines the namespace name.  The domain part of the namespace name is typically the organisation or community name (e.g. GitHub organisation or user account name)

```clojure
(ns domain.namespace-name)
```

Practicalli projects use a namespace domain of `practicalli` followed by the project name

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

Functions from `clojure.set` can be used via the alias name, `set/intersection`, rather than the fully qualified name, `clojure.set/intersection`

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

`require` can be used as a top level expression (not in an `ns` expression).  Requires are often used within a rich code block for experimenting with code.

```clojure
(comment
  (require 'clojure.set :as set))
```


## Strong Dynamic Types

Clojure is strongly typed, so everything is a type in Clojure.

Clojure is dynamically typed, so Clojure infers the type.  An explicit type name does not need to be specified in the code, making the code simpler and more concise.

Clojure is a hosted language and uses the type system of the platform it runs upon.  For example, Clojure uses Java object types for booleans, strings and numbers under the covers.

Use `class` or `type` function to inspect the type of some code in Clojure.

```clojure
(type 1) ; Integer literals are java.lang.Long by default
(type 1.); Float literals are java.lang.Double
(type ""); Strings always double-quoted, and are java.lang.String
(type false) ; Booleans are java.lang.Boolean
(type nil); The "null" value is called nil
```

Collections in Clojure have their own type too.

```
(type [1 2 3]); => clojure.lang.PersistentVector
(type '(1 2 3)); => clojure.lang.PersistentList
```

!!! INFO "Type hints"
    Type hints can be used to avoid reflection look-ups where performace critical issues have been identified.  Type hints are not required in general.
    [Clojure Type Hints](https://clojure.org/reference/java_interop#typehints){target=_blank .md-button}


## Java Interop

Java has a large and very useful standard library which is easily accessible from Clojure.  The `java.lang` library is available by default.

Use import to load a java package

```clojure
(import java.util.*)
```

Import specific Java classes

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
