# Getting Started with Clojure development
Clojure is a hosted language  and requires a host platform to run upon (Java Virtual Machine, JavaScript browser engine, Node.js, Graal, Microsoft CLR). The Java virtual machine (JVM) is the most common, especially for server-side applications.

This guide uses Clojure running on a JVM, although all code examples should run across all platforms except where that code includes interop with the host platform (e.g. calling Java objects)

TODO use a table??

| Tools                                | Description                                                                                                                                                                                                                         |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Java 11](install-java.md)           | The virtual machine which runs Clojure code.  Practicalli recommends Java 11, the current long term support version.                                                                                                                |
| [Clojure 1.10.1](install-clojure.md) | Clojure CLI tools are used in this guide to start REPL's for development and run Clojure applications, usually packaged as (uber)jars.                                                                                              |
| [practicalli/clojure-deps-edn](install-clojure.md) | Curated aliases for community tools and common configurations                                                                                                                                                                       |
| [Editors](/clojure-editors/)         | Spacemacs (Emacs), Calva (VS Code), Chlorine or ProtoREPL (Atom.io) and Cursive (IntelliJ) are commonly used editors that have great support for Clojure development.  Vim also has several plugins that provide great support too. |


## [Using the REPL](/repl-driven-development/)
A guide on [how to use the Clojure REPL](/repl-driven-development/) and enhance the REPL experience with [rebel readline](https://github.com/bhauman/rebel-readline).


## [Editors for Clojure](/development-tools/)
A command line REPL can be used to start learning Clojure, however, when you start working on projects a [Clojure aware editor](/clojure-editors/) is highly recommended.

Spacemacs (Emacs), Calva (VS Code), Chlorine or ProtoREPL (Atom.io) and Cursive (IntelliJ) are commonly used editors that have great support for Clojure development.  Vim also has several plugins that provide great support too.


> #### Hint::Other tools
> [Leiningen](https://leiningen.org) has been a very common tool to create and run projects, as well as building assets (jars) for deployment.  All the code examples in this book should work with Leiningen when a correctly configured `project.clj` file is created.  This guide should also work for [boot build tools](http://boot-clj.com/), although contains no specific details.
