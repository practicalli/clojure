# Work in Progress

## Why learn Clojure


Clojure is an excellent general purpose language that has relatively short learning curve (although that can feel steep if your mindset is seeped in Object Oriented programming and are very attached to defining types).

Clojure is relatively quick to learn for several reasons

1. A very small syntax that encourages pure functional programming in a pragmatic way.  Clojure allows you to focus on the problems you are solving rather than the language itself.
2. Clojure encourages REPL driven development, giving you fast feedback as you craft your code.  You can evaluate any part of your system to see what it does.  Using a REPL makes it very easy to understand what code does.
3. Built in unit test suite via clojure.test and writing unit tests is very simple.  TDD and BDD fits very well with REPL driven development.
4. Clojure and its community of develpers tend toward creating simple systems (solving complex requirements by breaking them down into simple components).  Most Clojure systems are build from components that have a specific task, which are orchestrated to deliver compresensive systems.
5. The community is friendly, knowlegable and very supportive
6. There are over 35 books on Clojure and lots of online resources and this is growing daily.
7. Full stack development can be done in just one language (Clojure and ClojureScript are the same language syntax and run on the JVM and JavaScript platforms respectively)
8. There are no moniods or other complex theories to understand in order to develop successful systems in Clojure.  However, you could add these kinds of things as libraries, using the powerful macro system in Clojure that allows you to extend the language cleanly.

I have personally been involved in teach many hundreds of developers how create systems with Clojure and think in a functional way.  This has included those who have never programmed before as well as those programming for decades.  Clojure can feel hard at first because it is quite different in approach to what you are used to.  Those just starting coding often have fewer challenges picking up the language.

Having only struggled to learn Haskell for 3 months at University, I cannot comment on how easy it is to learn outside of that limited context.

What ever language you decide to learn, if you are serious about learning that language then I highly recommend getting a mentor or reaching out to the community to help you learn.  Any language will be a lot harder to learn without help.

I hope this helps
Thank you
John.





## fizzbuzz pattern matching

```clojure
(clojure.pprint/pprint
  (map vector
    (range 25)
    (cycle [:fizz :_ :_])
    (cycle [:buzz :_ :_ :_ :_])))
```
Source: repl.it


# ratio type

Ratio types are not supported in ClojureScript as JavaScript only provides support for doubles

(+ 1/10 2/10)
=> 3/10

(double (+ 1/10 2/10))
=> 0.3

(+ 0.1 0.2)
=> 0.30000000000000004

Floats are lossy, giving you something that's almost accurate and often good enough, while ratios are precise. Coercing data to a float can lose accuracy, so Clojure doesn't do that automatically. It chooses the most precise type possible, which means ratios for fractional numbers, unless you start with floats. If you want a decimal number you can always convert after, or start with one, e.g. using (/ 1 3.0) instead of (/ 1 3).

A better question is why do you think it's better to not have the lossless format built-in? If you don't have ratios as a first-class number type, using fractional numbers can (and will) lead to silent data corruption, which undermines the usefulness of every operator that can use them.

Using floats is often a recipe for disaster — try using them for currency sometime — so, eventually you or someone else will realise you really do need a lossless type after all. And, since it doesn't exist as a first-class number type, you'll go off to write your own. Of course, the existing operators don't work with your new, accurate number type, so you have to reimplement those, too. Now that you've got a competing set of functions to do basic arithmetic, you either need to override the existing ones (possibly confusing), or you have to namespace your operators, leading to arithmetic looking like (r/* (r/+ a b) c (r/- d e)).

Of course, most people will shrug and go "eh, I don't need to do all that" and just keep using the lossy floats because they're built in and it's easier. Some might not even realise how big a mess it can be until it bites them in the ass. Then they write kludges (such as doing everything in ints and adding the decimal after-the-fact) or have to rewrite things to use someone's math library, all because someone decided that not providing an accurate fractional type was a good default.

This has played out in other languages (search "javascript number problems" sometime) enough times that it would be silly to not provide a better default behaviour out-of-the-box in a modern language. Not using rational numbers made more sense in the early days when CPU speeds were measured in the mhz and assembly was the norm, but it's insane to not provide a rational type now.

Using ratios like this isn't even a particularly new idea; Scheme's long had the concept of a numerical tower, including ratios, where each number type can be considered a subset of another type, allowing implicit coercion in one direction without loss of accuracy. That's essentially all that's going on with Clojure, too. If you know you don't need or want that behaviour, it's easy to opt-out and just use floats, but the default is lossless.

The design of Clojure can mostly be thought of as "sane defaults, escape hatches when you know you don't need them", and this is no exception. Immutable data default, opt-in mutability; accurate numbers by default, opt-in floats; functional patterns represented cleanly and easier to use, but imperative style still available when you need it, etc.


# Clojure zip

user=> (require '[clojure.zip :as zip])
nil
user=> ;; create a zipper, descend down to the first element
user=> (def my-zipper (zip/down (zip/vector-zip [1 2 3 4 5])))
#'user/my-zipper
user=> ;; get current element
user=> (zip/node my-zipper)
1
user=> ;; move right, get element
user=> (zip/node (zip/right my-zipper))
2
user=> ;; and again...
user=> (zip/node (zip/right (zip/right my-zipper)))
3
user=>


# useful resources

Clojure examples - https://jr0cket@github.com/jr0cket/ClojureProgramming.git


# Abstraction through syntax

Syntactical abstraction can vary between using functions to abstract away common operations and full fledged DSLs that allow us to express complex tasks with ease.

## Using threading macros

Classic lisp gives rise to syntax such as

```clojure
(:baz (:bar (:foo my-map)))
```

Using the thread first macro in Clojure you can make this much more readable

```clojure
(-> my-map
  (:foo)
  (:bar)
  (:baz))
```

Threading macro converts nested code into sequential code

## Minimise nested statements

In this example there are several nested if statements, making the code hard to read and slower to interpret.

```clojure
(if :pred-1
  :result-1
  (if :pred-2
    :result-2
    (if :pred-3
      :result-3
      :result-4)))
```

You can simplify this by using the `cond` function instead

```clojure
(cond
  :pred-1 :result-1
  :pred-2 :result-2
  :pred-3 :result-3
  :else :result-4)
  ```

`cond` executes its predicates in turn (:pred-1, :pred-2 ...) until one evaluates to something truthy, then it executes the corresponding result and returns it. Again this is exactly what the `if` version does, cond is a macro that turns the latter into former.


## Repeated forms

Creating a local symbol with `let` and then using that symbol as an `if` predicate can be replaced by `if-let` macro:

(let [data :data]
  (if data
    :data-is-bound
    :no-data))

(if-let [data :data]
  :data-is-bound
  :no-data)

To streamline the code even further, we can often use destructuring

(let [list-items '(3 4)
      x (clojure.core/nth list-items 0 nil)
      y (clojure.core/nth ?list 1 nil)]
  (+ x y))

(let [[x y] (list 3 4)]
(+ x y))



### Edn
edn is an extensible data notation. A superset of edn is used by Clojure to represent programs, and it is used by Datomic and other applications as a data transfer format. This spec describes edn in isolation from those and other specific use cases, to help facilitate implementation of readers and writers in other languages, and for other uses.

[Clojure api 1.6 for edn](https://clojure.github.io/clojure/clojure.edn-api.html)

https://github.com/edn-format/edn

http://www.compoundtheory.com/clojure-edn-walkthrough/



http://www.clojuresphere.com/

http://blog.jenkster.com/2013/12/a-cider-excursion.html

clojure emacs metaprogramming trick https://www.youtube.com/watch?v=LXhWW1Yqpt0

http://eigenhombre.com/clojure/2014/07/05/emacs-customization-for-clojure/

http://martintrojer.github.io/clojure/2014/10/02/clojure-and-emacs-without-cider/

https://github.com/technomancy/mire

https://github.com/cemerick/drawbridge

https://github.com/technomancy?tab=repositories

https://github.com/jr0cket/kensa-create-clojure

http://christophermaier.name/blog/2011/07/07/writing-elegant-clojure-code-using-higher-order-functions

https://github.com/jamesmacaulay/zelkova

http://www.purelyfunctional.tv/core-async

http://blog.cognitect.com/blog/2014/10/24/analysis-of-the-state-of-clojure-and-clojurescript-survey-2014

clojure daily - http://paper.li/ajlopez/1291580164

https://github.com/r0man/sablono

https://github.com/swannodette/om/wiki
https://github.com/magomimmo/om-start-template

clojure at a bank http://www.pitheringabout.com/?p=693

clojurescript any better http://rrees.me/2014/01/16/clojurescript-is-it-any-better-yet/

https://medium.com/@hlship/clojure-owning-the-language-ec0196871c40

http://cognitect.com/









#### Charicteristics

* Dynamic
- typed - like Python, Ruby or Groovy
- because its a LISP - you can redefine running code
- REPL - a fast way to explore your problem domain with code

* Functional programming
- in contrast to imperative programing
- immutable data structures at its core, everything is immutable by default
- if any piece of data can be changed, that is mutable state
- in imperative programming, we change state where ever we like
- in functional programming we avoid changing state as much as possible
- if a function does not change state it is referentially transparent, always returning the same result when given the same input (arguments) - often returned as a pure function
- impure functions can affect other functions and therefore has to be very mindful of the changes it makes and when it makes them
- pure functions are truely modular as they do not affect any other part of the system
** Changing state
- rather than changing a data structure, fp instead creates a new data structure that contains the changes and copies of the existing data.
- to manage the potential overhead of copying data structures, Clojure uses Persistent collections (Lists, Vectors, Maps) which are immutable but provide an efficient way to mutate by sharing common elements (data)
** Input & output with functional programming
- other fp languages like haskel & Scala use monads to encapsulate data changes whilst appearing stateless to the rest of the program - monads allow us to sneak in impure code into the context of pure code.
- Clojure doesnt try and enforce functional purity, so any function can include impure code
- most functoins should be pure though or you loose the benefits of functional programming
- Clojure encourages minimal state changes / mutable state - so its up to the developer to keep the ratio of mutalble data small
- Clojure uses reference types to manage threads and mutable state.  References provide syncronisation of threads without using locks (notoriusly cumbersome).  See STM

* Hosted on the Java Virtual Machine
- writen for the JVM & heavily integrated, giving beautiful integratoin
- Clojure is compiled to Java byte code
- many parts of the Clojure standard library, Clojure.core defer to the Java Standard library, for example for I/O (reading,writing files)
- Clojure makes invoking Java very convieninet and provides special primative constructs in the Clojure language to do so (new .javaMethodName javaClassName. etc)

* Supporting concurrency
- atoms etc
- automatic management of state changes via Software transactional memory - like having an ACID database in memory, managing requests to change values over time.
- by having immutable data structures - if your values do not change then its trivial to have massive parallelism.

* A modern LISP
- leaner syntax and not as many brackets as LISP
- clean data structure syntax at the core of the language
- LiSP was the first language to introduce first class functions, garbage collection and dynamic typing, which are common in languages used today

Macros
- a function that takes in source code and returns source code, replacing the macro code
- use macros to take out repetition / boilerplate code
- as LISP syntax is extremely simple it is much easier to write macros that work compared to non-LISP languages


> **fixme** assuming you need more, I'll add to this page, but Clojure is a very powerful language, incredibly flexible and tonnes of fun.  What more do you need ?


> **fixme** concepts to explore

Clojure emphasizes safety in its type system and approach to parallelism, making it easier to write correct multithreaded programs.

Clojure is very concise, requiring very little code to express complex operations.

Data centric design - a well constructed data structure helps define and clarify the purpose of the code

Modularity - Clojure and its community build things in modules / components that work together (in a similar design approach to the Unix file system, for example).

It offers a REPL and dynamic type system: ideal for beginners to experiment with, and well-suited for manipulating complex data structures.

A consistently designed standard library and full-featured set of core datatypes rounds out the Clojure toolbox.

Clojure is close to the speed of Java

#### Constraints

Clojure relies on the JVM so there can be a longer boot time than a scripting language like Javascript.  However, as you can connect to the Clojure runtime (the REPL) of a live system and because Clojure is dynamic, you can make changes to that live system without any downtime.

If you require more performance from Clojure, you can specify _ahead of time_ compilation.




# Pass Binding

> Related to threading macros but a bit more complex for beginners.  Add to a more advanced section.

Evaluate each form and pass the result as the value of te name in the next form.  Returns the result of the last form.

```
(as-> 4 x (list 3 x)) ; returns (3 4)

(as-> "a" x
      (list 1 x)
      (list 2 x)
      (list 3 x)
      (list 4 x)
      (list 5 x))

;; returns
;; (5 (4 (3 (2 (1 "a")))))
```

# Pure / impure functions


<!--sec data-title="Update Salary" data-id="answer003" data-collapse=true ces-->
# Another example (not currently working, sorry)

This example needs fixing, you could try with staff-salaries as just a vector [300 344 5000], but the code still needs tweeking a little



(def staff-salaries {:bob 30000 :carol 34000 :jane 42000})

(defn salary-updates [staff-pay]
  (map #(+ % 5000)))

(salary-updates staff-salaries)

<!--endsec-->


# using data structures

> **Note** Using the `map` and `inc` function, increment all the numbers in a vector

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->
```
(map inc [1 2 3 4 5])
```

The above `map` function is roughly equivalent to the following expression

```
(conj [] (inc 1) (inc 2) (inc 3) (inc 4) (inc 5))
```
The `conj` function creates a new collection by combining a collecion and one or more values.

<!--endsec-->



# Persistent data stuctures

Persistent data structures share memory, so even for large data structures the use of lists, maps, vectors & sets are efficient.

;; persistent data structures also use a relatively flat tre structure (typically 1-2 levels, up to 6 levels for very large data).  This flat structue minimises the time required to parse the tre


# cons and conj

StackExchange explination
https://stackoverflow.com/questions/3008411/clojure-consseq-vs-conjlist

One difference is that conj accepts any number of arguments to insert into a collection, while cons takes just one:

(conj '(1 2 3) 4 5 6)
; => (6 5 4 1 2 3)

(cons 4 5 6 '(1 2 3))
; => IllegalArgumentException due to wrong arity
Another difference is in the class of the return value:

(class (conj '(1 2 3) 4))
; => clojure.lang.PersistentList

(class (cons 4 '(1 2 3))
; => clojure.lang.Cons
Note that these are not really interchangeable; in particular, clojure.lang.Cons does not implement clojure.lang.Counted, so a count on it is no longer a constant time operation (in this case it would probably reduce to 1 + 3 -- the 1 comes from linear traversal over the first element, the 3 comes from (next (cons 4 '(1 2 3)) being a PersistentList and thus Counted).

The intention behind the names is, I believe, that cons means to cons(truct a seq)1, whereas conj means to conj(oin an item onto a collection). The seq being constructed by cons starts with the element passed as its first argument and has as its next / rest part the thing resulting from the application of seq to the second argument; as displayed above, the whole thing is of class clojure.lang.Cons. In contrast, conj always returns a collection of roughly the same type as the collection passed to it. (Roughly, because a PersistentArrayMap will be turned into a PersistentHashMap as soon as it grows beyond 9 entries.)

1 Traditionally, in the Lisp world, cons cons(tructs a pair), so Clojure departs from the Lisp tradition in having its cons function construct a seq which doesn't have a traditional cdr. The generalised usage of cons to mean "construct a record of some type or other to hold a number of values together" is currently ubiquitous in the study of programming languages and their implementation; that's what's meant when "avoiding consing" is mentioned.

shareeditflag
edited Jun 9 '10 at 20:46
answered Jun 9 '10 at 20:38

Michał Marczyk
65.8k7148171



<!-- Work in progress -->

Caves of clojure
================
Shows a terminal in either text or swing

http://stevelosh.com/blog/2012/07/caves-of-clojure-01/


Quil
===
Coloured-balls - lein run - displays coloured balls
CljBoids - lein run - follows the mouse around - uses atoms, quite involved code


Coin toss
=========

(defn coin-toss []
  (= 1 (rand-int 2)))

(defn toss-score [toss]
  (if toss 1 -1))


user=> (toss-score true)
1
user=> (toss-score false)
-1
user=> (toss-score (coin-toss))
-1
user=> (toss-score (coin-toss))
1

(repeatedly 5 coin-toss)
(true true false false true)
