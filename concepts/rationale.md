# The rationale for Clojure

  At the time Clojure was created there were no LISP based languages that ran on a widely adopted platform, that also made concurrency easier for the developer to manage.

  Developers and the companies that hire them are comfortable with the performance, security and stability of the Java Virtual Machine. 
  
  While Java developers may envy the succinctness, flexibility and productivity of dynamic languages, they have concerns about running on customer-approved infrastructure, access to their existing code base and libraries, and performance. In addition, they face ongoing problems dealing with concurrency using native threads and locking. Clojure is an effort in pragmatic dynamic language design in this context. It endeavors to be a general-purpose language suitable in those areas where Java is suitable. It reflects the reality that, for the concurrent programming future, pervasive, unmoderated mutation simply has to go.

  Clojure meets its goals by: embracing an industry-standard, open platform - the JVM; modernizing a venerable language - Lisp; fostering functional programming with immutable persistent data structures; and providing built-in concurrency support via software transactional memory and asynchronous agents. The result is robust, practical, and fast.

Clojure has a distinctive approach to [state and identity](http://clojure.org/state).

Why Clojure?


## Motivating ideas behind Clojure.

A LISP base language design is very effecitve

* Lambda calculus yields an extremely small core with very little syntax required

* Core advantage still code-as-data and syntactic abstraction


Standard Lisps (Common Lisp, Scheme) have not evolved over time, since standardisation.  Their core data structures are mutable and not extensible and therefore no mechanisms for effectively dealing with concurrency.


Clojure is a Lisp not constrained by backwards compatibility, allowing modernisation of the language that otherwise deters developers from adoption.

Clojure extends the code-as-data paradigm to maps and vectors

All data structures default to immutability

Core data structures are extensible abstractions 

Embraces a platform (JVM)

Functional programming is a good thing
- Immutable data + first-class functions
- Could always be done in Lisp, by discipline/convention

But if a data structure can be mutated, dangerous to presume it won't be
In traditional Lisp, only the list data structure is structurally recursive
Pure functional languages tend to strongly static types
Not for everyone, or every task
Clojure is a functional language with a dynamic emphasis
All data structures immutable & persistent, supporting recursion
Heterogeneous collections, return types
Dynamic polymorphism
Languages and Platforms
VMs, not OSes, are the platforms of the future, providing:
Type system
Dynamic enforcement and safety
Libraries
Abstract away OSes
Huge set of facilities
Built-in and 3rd-party
Memory and other resource management
GC is platform, not language, facility
Bytecode + JIT compilation
Abstracts away hardware
Language as platform vs. language + platform
Old way - each language defines its own runtime
GC, bytecode, type system, libraries etc
New way (JVM, .Net)
Common runtime independent of language
Language built for platform vs language ported-to platform
Many new languages still take 'Language as platform' approach
When ported, have platform-on-platform issues
Memory management, type-system, threading issues
Library duplication
If original language based on C, some extension libraries written in C don't come over
Platforms are dictated by clients
'Must run on JVM' or .Net vs 'must run on Unix' or Windows
JVM has established track record and trust level
Now also open source
Interop with other code required
C linkage insufficient these days
Java/JVM islanguage + platform
Not the original story, but other languages for JVM always existed, now embraced by Sun
Java can be tedious, insufficiently expressive
Lack of first-class functions, no type inference, etc
Ability to call/consume Java is critical
Clojure is the language, JVM the platform
Object Orientation is overrated
Born of simulation, now used for everything, even when inappropriate
Encouraged by Java/C# in all situations, due to their lack of (idiomatic) support for anything else
Mutable stateful objects are the new spaghetti code
Hard to understand, test, reason about
Concurrency disaster
Inheritance is not the only way to do polymorphism
"It is better to have 100 functions operate on one data structure than to have 10 functions operate on 10 data structures." - Alan J. Perlis
Clojure models its data structures as immutable objects represented by interfaces, and otherwise does not offer its own class system.
Many functions defined on few primary data structures (seq, map, vector, set).
Write Java in Java, consume and extend Java from Clojure.
Polymorphism is a good thing
Switch statements, structural matching etc yield brittle systems
Polymorphism yields extensible, flexible systems
Clojure multimethods decouple polymorphism from OO and types
Supports multiple taxonomies
Dispatches via static, dynamic or external properties, metadata, etc
Concurrency and the multi-core future
Immutability makes much of the problem go away
Share freely between threads
But changing state a reality for simulations and for in-program proxies to the outside world
Locking is too hard to get right over and over again
Clojure's software transactional memory and agent systems do the hard part

In short, I think Clojure occupies a unique niche as a functional Lisp for the JVM with strong concurrency support. Check out some of the features.
