# Clojure Design

  Clojure leads to a very component based approach to development.  There are no huge and bloated frameworks in Clojure.  The core is very small.  Hundreds of focused libraries to use in collaboration.

  Boiled down to the most simplest structure, Clojure applications you write typically look like this:

```clojure
;; define a namespace
(ns name-space.name)

;; define one or more immutable data structures - the fewer the better typically
(def my-data-struture [[{}{}]])

;; define behaviour that acts on data structures inside one or more functions
(defn my-function [paramter]
  (my-behaviour parameter))

;; Call those functions to make your application do something
(my-behaviour data)
```

> **Hint** As functions always evaluate to a value, a function can be used as an argument to another function (or itself if you get recursive !!)


## Data focused design - Maps & Vectors

  Clojure has 4 built in persistent data structures (list, map, vector, set), however the most commonly used for specificaly manipulating data are `map` and `vector` or some combination of the two.

Maps and vectors are two more built-in persistent data structures that are more commonly used to represent data within a Clojure application.

  A vector is similar to an array in that its an indexed collection optomised for random access.  Vectors are a catch all data structure that can hold any type of information, including other data structures and function calls.

  A map is a key value pair, with the keys typically represented with clojure keywords.
Maps are a collection of key / value pairs that provide an easy way to reference data by keys.  Its common to use a Clojure `keyword` type as the keys as keywords are self-referential (they point to themselves).  Using keywords in a map means you can use a specific keyword as a function call on the map that returns its associated value.

  Some examples of using these data structures this are:

```clojure

;; A map of maps of maps with occasional vectors

{:starwars {
    :characters {
      :jedi   ["Luke Skywalker"
               "Obiwan Kenobi"]
      :sith   ["Darth Vader"
               "Darth Sideous"]
      :droids ["C3P0"
               "R2D2"]}
    :ships {
      :rebel-alliance  ["Millenium Falcon"
                        "X-wing figher"]
      :imperial-empire ["Intergalactic Cruser"
                        "Destroyer"
                        "Im just making these up now"]}}}
```

> #### Hint::Basic design principle
> “It is better to have 100 functions operate on one data structure than 10 functions on 10 data structures.” —Alan Perlis

## Extensibility via Macros

  You can extend the language and define your own constructs using Macros.

  The first example of this you see is from Leiningen.  The `defproject` function is a macro that helps you easily define the configuration of a Clojure project.

  An example of a macro that is part of the core Clojure language is `defn`.  When you define a function with `defn` it is syntactic sugar for defining a thing that is a function.

```clojure
  (defn my-function [argument] (my-behaviour argument) )

  (def my-function
    (fn [argument] (my-behaviour argument)))
```

## Special forms - the building blocks of Clojure

The following are the building blocks of Clojure, everything else is either a macro or a function

The Clojure / LISP special forms

```
def, do, if, let, loop, fn, quote, recur, set!, var
```

The forms added for Interoperability with the host platform (mainly Java / JVM)

```
monitor-enter, monitor-exit,
catch, dot ('.'), finally, new, throw, try
```
