# Clojure in 15 minutes

A quick tour of the Clojure syntax, which is so terse you can read through this section in around 15 minutes (or less).

## Comments
`;` comments out the rest of the line in Clojure

```clojure
;; Clojure style recommends two semicolons for a comment line

; => style represents a commented result of running Clojure code
```

## Clojure written in forms

Clojure is written in "forms", which are just a lists of things inside parentheses, `()`, separated by whitespace.

Clojure evaluates the first thing in a form as a function call.  Additional values in the form are passed as arguments to the called function.

Clojure is organised into one or more namespaces. The namespace represents the directory path and file name that contains the code of the particular namespace.

```clojure
;; Define the namespace test
(ns test.code)  ;; src/test/code.clj

;; Define a longer namespace
(ns com.company.product.component.core)  ;; src/com/company/product/component/core.clj
```

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

; You need not for logic, too
(not true) ; => false

(not= true false) ; => true

; Types
;;;;;;;;;;;;;

; Clojure uses Java's object types for booleans, strings and numbers.
; Use `class` to inspect them.
(class 1) ; Integer literals are java.lang.Long by default
(class 1.); Float literals are java.lang.Double
(class ""); Strings always double-quoted, and are java.lang.String
(class false) ; Booleans are java.lang.Boolean
(class nil); The "null" value is called nil

; If you want to create a literal list of data, use ' to make a "symbol"
'(+ 1 2) ; => (+ 1 2)

; You can eval symbols.
(eval '(+ 1 2)) ; => 3

; Collections & Sequences
;;;;;;;;;;;;;;;;;;;

; Vectors and Lists are java classes too!
(class [1 2 3]); => clojure.lang.PersistentVector
(class '(1 2 3)); => clojure.lang.PersistentList

; A list would be written as just (1 2 3), but we have to quote
; it to stop the reader thinking it's a function.
; Also, (list 1 2 3) is the same as '(1 2 3)

; Both lists and vectors are collections:
(coll? '(1 2 3)) ; => true
(coll? [1 2 3]) ; => true

; Only lists are seqs.
(seq? '(1 2 3)) ; => true
(seq? [1 2 3]) ; => false

; Seqs are an interface for logical lists, which can be lazy.
; "Lazy" means that a seq can define an infinite series, like so:
(range 4) ; => (0 1 2 3)
;; (range) ; => (0 1 2 3 4 ...) (an infinite series)
(take 4 (range)) ;  (0 1 2 3)

; Use cons to add an item to the beginning of a list or vector
(cons 4 [1 2 3]) ; => (4 1 2 3)
(cons 4 '(1 2 3)) ; => (4 1 2 3)

; Use conj to add an item to the beginning of a list,
; or the end of a vector
(conj [1 2 3] 4) ; => [1 2 3 4]
(conj '(1 2 3) 4) ; => (4 1 2 3)

; Use concat to add lists or vectors together
(concat [1 2] '(3 4)) ; => (1 2 3 4)

; Use filter, map to interact with collections
(map inc [1 2 3]) ; => (2 3 4)
(filter even? [1 2 3]) ; => (2)

; Use reduce to reduce them
(reduce + [1 2 3 4])
; = (+ (+ (+ 1 2) 3) 4)
; => 10

; Reduce can take an initial-value argument too
(reduce conj [] '(3 2 1))
; = (conj (conj (conj [] 3) 2) 1)
; => [3 2 1]

; Functions
;;;;;;;;;;;;;;;;;;;;;

; Use fn to create new functions. A function always returns
; its last statement.
(fn [] "Hello World") ; => fn

; (You need extra parens to call it)
((fn [] "Hello World")) ; => "Hello World"

; You can create a var using def
(def x 1)
x ; => 1

; Assign a function to a var
(def hello-world (fn [] "Hello World"))
(hello-world) ; => "Hello World"

; You can shorten this process by using defn
(defn hello-world [] "Hello World")

; The [] is the list of arguments for the function.
(defn hello [name]
  (str "Hello " name))
(hello "Steve") ; => "Hello Steve"

; You can also use this shorthand to create functions:
(def hello2 #(str "Hello " %1))
(hello2 "Fanny") ; => "Hello Fanny"

; You can have multi-variadic functions, too
(defn hello3
  ([] "Hello World")
  ([name] (str "Hello " name)))
(hello3 "Jake") ; => "Hello Jake"
(hello3) ; => "Hello World"

; Functions can pack extra arguments up in a seq for you
(defn count-args [& args]
  (str "You passed " (count args) " args: " args))
(count-args 1 2 3) ; => "You passed 3 args: (1 2 3)"

; You can mix regular and packed arguments
(defn hello-count [name & args]
  (str "Hello " name ", you passed " (count args) " extra args"))
(hello-count "Finn" 1 2 3)
; => "Hello Finn, you passed 3 extra args"


; Hashmaps
;;;;;;;;;;

(class {:a 1 :b 2 :c 3}) ; => clojure.lang.PersistentArrayMap

; Keywords are like strings with some efficiency bonuses
(class :a) ; => clojure.lang.Keyword

; Maps can use any type as a key, but usually keywords are best
(def stringmap (hash-map "a" 1, "b" 2, "c" 3))
stringmap  ; => {"a" 1, "b" 2, "c" 3}

(def keymap (hash-map :a 1 :b 2 :c 3))
keymap ; => {:a 1, :c 3, :b 2} (order is not guaranteed)

; By the way, commas are always treated as whitespace and do nothing.

; Retrieve a value from a map by calling it as a function
(stringmap "a") ; => 1
(keymap :a) ; => 1

; Keywords can be used to retrieve their value from a map, too!
(:b keymap) ; => 2

; Don't try this with strings.
;("a" stringmap)
; => Exception: java.lang.String cannot be cast to clojure.lang.IFn

; Retrieving a non-present value returns nil
(stringmap "d") ; => nil

; Use assoc to add new keys to hash-maps
(assoc keymap :d 4) ; => {:a 1, :b 2, :c 3, :d 4}

; But remember, clojure types are immutable!
keymap ; => {:a 1, :b 2, :c 3}

; Use dissoc to remove keys
(dissoc keymap :a :b) ; => {:c 3}

; Sets
;;;;;;

(class #{1 2 3}) ; => clojure.lang.PersistentHashSet
(set [1 2 3 1 2 3 3 2 1 3 2 1]) ; => #{1 2 3}

; Add a member with conj
(conj #{1 2 3} 4) ; => #{1 2 3 4}

; Remove one with disj
(disj #{1 2 3} 1) ; => #{2 3}

; Test for existence by using the set as a function:
(#{1 2 3} 1) ; => 1
(#{1 2 3} 4) ; => nil

; There are more functions in the clojure.sets namespace.

; Useful forms
;;;;;;;;;;;;;;;;;

; Logic constructs in clojure are just macros, and look like
; everything else
(if false "a" "b") ; => "b"
(if false "a") ; => nil

; Use let to create temporary bindings
(let [a 1 b 2]
  (> a b)) ; => false

; Group statements together with do
(do
  (print "Hello")
  "World") ; => "World" (prints "Hello")

; Functions have an implicit do
(defn print-and-say-hello [name]
  (print "Saying hello to " name)
  (str "Hello " name))
(print-and-say-hello "Jeff") ;=> "Hello Jeff" (prints "Saying hello to Jeff")

; So does let
(let [name "Urkel"]
  (print "Saying hello to " name)
  (str "Hello " name)) ; => "Hello Urkel" (prints "Saying hello to Urkel")

; Modules
;;;;;;;;;;;;;;;

; Use "use" to get all functions from the module
(use 'clojure.set)

; Now we can use set operations
(intersection #{1 2 3} #{2 3 4}) ; => #{2 3}
(difference #{1 2 3} #{2 3 4}) ; => #{1}

; You can choose a subset of functions to import, too
(use '[clojure.set :only [intersection]])

; Use require to import a module
(require 'clojure.string)

; Use / to call functions from a module
(clojure.string/blank? "") ; => true

; You can give a module a shorter name on import
(require '[clojure.string :as str])
(str/replace "This is a test." #"[a-o]" str/upper-case) ; => "THIs Is A tEst."
; (#"" denotes a regular expression literal)

; You can use require (and use, but don't) from a namespace using :require.
; You don't need to quote your modules if you do it this way.
(ns test
  (:require
    [clojure.string :as str]
    [clojure.set :as set]))

; Java
;;;;;;;;;;;;;;;;;

; Java has a huge and useful standard library, so
; you'll want to learn how to get at it.

; Use import to load a java module
(import java.util.Date)

; You can import from an ns too.
(ns test
  (:import java.util.Date
           java.util.Calendar))

; Use the class name with a "." at the end to make a new instance
(Date.) ; <a date object>

; Use . to call methods. Or, use the ".method" shortcut
(. (Date.) getTime) ; <a timestamp>
(.getTime (Date.)) ; exactly the same thing.

; Use / to call static methods
(System/currentTimeMillis) ; <a timestamp> (system is always present)

; Use doto to make dealing with (mutable) classes more tolerable
(import java.util.Calendar)
(doto (Calendar/getInstance)
  (.set 2000 1 1 0 0 0)
  .getTime) ; => A Date. set to 2000-01-01 00:00:00
