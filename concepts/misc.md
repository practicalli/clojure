

#### Charicteristics

* Dynamic 
- typed - like Python, Ruby or Groovy 
- because its a LISP - you can redefine running code by redefining functions and re-evaluating
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


