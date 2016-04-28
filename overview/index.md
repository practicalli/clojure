# Clojure Overview 

  I love Clojure because its **powerful**, **flexible** and **fun**.  

  Here are a selection of features which appealed to me when I first looked at Clojure

## Dynamic Language & runtime environment (REPL)
* quickly explore your problem domain by coding in the REPL
* very minimal boilerplate code (reduced even more with macros)
* new code is compiled as evaluated, no seperate compile cycle or wait time
* very small language syntax, extensible via macros

## 'Pure' Functional Programming 
* encourages an immutable approach that helps keep the code simple
* minimising state changes makes scaling your application easy 
* Persistent data structures (List, Map, Vector, Set) give an efficient way of modifying data without side effects

## Managed State Changes 
* Reference types `atoms` & `refs` for mutable state
* Changes are done safely within Software Transactional Memory (STM), like having an in-memory ACID database managing all state changes under the covers. 

## Hosted on the JVM & consise interoperabilty
* Clojure is compiled to bytecode, giving very high performance (close to Java, C++, etc.)
* Simple syntax to call any other code that runs on the JVM (Java, Scala, JRuby, Jython, etc)

## A modular / component approach to design 

  A typical approach with Clojure is to break a big problem space into many small libraries, each with a specific perpose.  This helps deconstruct complex systems into smaller, easier to understand code.  This also helps make these Clojure libraries reusable in many other projects, reducing the development effort.
