# Features of Clojure 

## Dynamic language 

  A problem space can quickly be explored through code to test your assumptions.  The design of code is easy to change as you are not managing type changes, Clojure is very good at managing data that would otherwise lead to exceptions.
  
  As a dynamic language the code is quite terse and developers are encouraged to write very modular code, therefore it is easy to refactor.

## Dynamic Development - REPL

  Clojure has a REPL (Read Evaluate Print Loop), this is the Clojure run-time environment.  You can define functions and data structures, then evalutate them to run either all your code or just a single expression.  You can even change code and re-evaluate it whilst your application is still running and immediately see the effect that change has.  
  
  So the REPL is a very fast way to explore your problem domain with code
  
  You could even connect to the REPL of a live system and change its behaviour without any down time (unless of course you write code that crashes).

## 'Pure' Functional Programming

  Functions return a value (even if that value is nil) and you can therefore use a function as an argument to another function.  This is termed as _first order_ functions.
  
  Clojure encourages a relatively pure approach to functional programming and Clojure can be considered immutable by default

## Immutability 

- immutable data structures at its core, everything is immutable by default
- in imperative programming, we change state where ever we like
- in functional programming we avoid changing state as much as possible 
- if a function does not change state it is referentially transparent, always returning the same result when given the same input (arguments) - often returned as a pure function 
- impure functions can affect other functions and therefore has to be very mindful of the changes it makes and when it makes them
- pure functions are truely modular as they do not affect any other part of the system

## Persistent Data Structures

  List, Map, Vector and Set are all built in data structures that are immutable.  
  
  If you run a function that seems to change a data structure, its actually returning a new data structure.  Via a shared-memory model, new data structures are created cheaply as they share the common data elements from the original data structure and only include additional elements.

## Homoiconicity 
  
  One thing that keeps Clojure a small language is the fact that the same syntax is used to represent data and behaviour.  For example, a function call is defined using a list, data structures and functions are defined using a list.  In fact everything is a list, although we use a little syntatic sugar here and there to make the code quicker for a human to parse.


## Clojure is an implementation of Lisp

  Lisp stands for LISt Processing, so its no surprise that all Clojure code is defined in a list. 
  
  The open Parenthesis `(` denotes the start of a list, the first element of that list is evaluated as a function call, everthing else in the list is data.

  The evaluation of the first element of a list can be behaviour of `(` can be over-ridden using `quote` or its short form the quote character, **'**, so the list elements are all treated as data.


## Runtime Polymorphism

  See Clojure arity and multi-methods for more information


## Concurrent Programming & Parallelism

  Concurrent code is much safer when you data does not change state (eg. immutable values).  Clojure encourages an immutable approach with its built in persistent data structures (list, Map, Vector, Set).  Using Pure Fuctions that are not affected by or cause side effects also make writing concurrent code trivial.
  
  Clojure helps you scale your applications by with a parrallel procssing approach, as you can run functions over immutable datastructures without conflict.


## Hosted on the JVM

  Clojure is compiled to bytecode that runs on the Java Virtual Machine.  This helps Clojure run at a very high performance (close to Java, C++, etc.)
  
  Clojure has a consise and easy to use Java Interoperability, enabling you to use any libraries that run on the JVM (Java, Groovy, Scala, Jruby, Jython, etc).  

- many parts of the Clojure standard library, Clojure.core defer to the Java Standard library, for example for I/O (reading,writing files)
- Clojure makes invoking Java very convieninet and provides special primative constructs in the Clojure language to do so (new .javaMethodName javaClassName. etc)

> ClojureScript generated JavaScript that will run in a browser.  ClojureCLR will compile to bytecode that runs on the Microsoft .Net platform.

## Managed State Changes 

  Using `atoms` or `refs` in clojure you can have mutable data.  Changes are done safely within Software Transactional Memory (STM), like having an in-memory ACID database managing access 


## Extend the langugage with Macros 

  Clojure uses macros 


<hr />


> **Fixme** Review the following content to see if its relevant ?

<hr />







** Input & output with functional programming 
- other fp languages like haskel & Scala use monads to encapsulate data changes whilst appearing stateless to the rest of the program - monads allow us to sneak in impure code into the context of pure code.
- Clojure doesnt try and enforce functional purity, so any function can include impure code 
- most functions should be pure though or you loose the benefits of functional programming
- Clojure encourages minimal state changes / mutable state - so its up to the developer to keep the ratio of mutalble data small
- Clojure uses reference types to manage threads and mutable state.  References provide syncronisation of threads without using locks (notoriusly cumbersome).  See STM 

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



Clojure emphasizes safety in its type system and approach to parallelism, making it easier to write correct multithreaded programs. 

Clojure is very concise, requiring very little code to express complex operations.

Data centric design - a well constructed data structure helps define and clarify the purpose of the code

Modularity - Clojure and its community build things in modules / components that work together (in a similar design approach to the Unix file system, for example). 

It offers a REPL and dynamic type system: ideal for beginners to experiment with, and well-suited for manipulating complex data structures. 

A consistently designed standard library and full-featured set of core datatypes rounds out the Clojure toolbox.

Clojure is close to the speed of Java 

## Constraints

Clojure relies on the JVM so there can be a longer boot time than a scripting language like Javascript.  However, as you can connect to the Clojure runtime (the REPL) of a live system and because Clojure is dynamic, you can make changes to that live system without any downtime.  

If you require more performance from Clojure, you can specify _ahead of time_ compilation.


