# Clojure Concepts

<!--
## Clojure is ...

* a **general purpose language** that compiles code to the platform its hosted upon (Java, JavaScript, Microsoft)
* a **functional programming language** with a data centric approach, pragmatically pure
* a **very small syntax** comprised of only 16 primitives, 8 of which were added for host interoperability
* a **dynamic strongly typed language** type inference simplifies syntax and code base
* a **REPL fast-feedback** evaluate code as you write it for instant feedback, helping you quickly explore a problem domain
* a modern implementation of **LISP**
* highly extensible language via **macros**
* an efficient way to manage state changes via **persistent data structures** & **software transactional memory**

## Clojure in a little more detail

### Dynamic Language & runtime environment (REPL) ###

* quickly explore your problem domain by evaluating code on the fly in the REPL
* new code is compiled as evaluated, no seperate compile cycle or wait time
* very small language syntax, extensible via macros

### Pragmatic Functional Programming ###

* encourages an immutable approach that helps keep the code simple
* minimising state changes makes scaling your application easy through parallelism
* built-in persistent data structures (List, Map, Vector, Set) give an efficient way of modifying data without side effects
* Concurrency becomes trivial with pure functions & immutable data

### Managed State Changes ###

* Reference types `atoms` & `refs` for mutable state
* Changes are done safely within Software Transactional Memory (STM), like having an in-memory ACID database managing all state changes under the covers.

> #### Hint::Avoid changing state
> In functional programming we avoid changing state as much as possible.  If a function does not change state it is referentially transparent, always returning the same result when given the same input (arguments).  These are refered to as Pure Functions.  Pure functions are truely modular as they do not affect any other part of the system and do not require complex threading for scalability.




### Hosted language with consise interoperabilty ###

* Clojure can run on the Java Virtual Machine (JVM), Microsoft Common Language Runtime (CLR) or JavaScript engines via ClojureScript.
* Clojure is compiled to bytecode, giving very high performance (close to Java, C++, etc.)
* Simple syntax to call any other code that runs on the JVM (Java, Scala, JRuby, Jython, etc) or Microsoft CLR.

### A modular / component approach to design ###

  A typical approach with Clojure is to break a big problem space into small libraries, each with a specific perpose.  This helps deconstruct complex systems into smaller, easier to understand code.  This also helps make these Clojure libraries reusable in many other projects, reducing the development effort.



## ClojureScript

ClojureScript is Clojure that compiles to to JavaScript and runs in the browser (JavaScript Engine).  Most of the code and libraries available for Clojure works seamlessly when compiled to JavaScript.

ClojureScript is based heavily on the work done for Google Closures and there is a strong focus on Reactive client side apps.

There is a common file extension, `.cljc` that signifies Clojure code that will run on the JVM and JavaScript engines.


## Clojure Community

There is a vibrant and highly active community around Clojure.  In London alone there is a regular monthly talk and 3 or 4 coding dojo every month.

## Community resources

[Clojure. tv](https://www.youtube.com/channel/UCaLlzGqiPE2QRj6sSOawJRg) and [Planet Clojure](http://planet.clojure.in/) are the tip of the iceburg to a large amount of Clojure resources available via the Internet.

 -->
