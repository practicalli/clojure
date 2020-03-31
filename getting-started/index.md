# Getting Started with Clojure development
Clojure is a hosted language  and requires a host platform to run upon (Java Virtual Machine, JavaScript browser engine, Node.js, Graal, Microsoft CLR). The Java virtual machine (JVM) is the most common, especially for server-side applications.

This guide uses Clojure running on a JVM, although all of the code should run across all platforms except where that code includes interop with the host platform (e.g. calling Java objects)

## [Install Java](install-java.html)
Practicalli recommends [OpenJDK 11 (LTS) from AdoptOpenJDK](https://adoptopenjdk.net/)


## [Install Clojure](install-clojure.html)
Practicalli recommends using [the Clojure CLI tools and using deps.edn for projects](https://clojure.org/guides/getting_started).  The guide will also uses [clj-new](https://github.com/seancorfield/clj-new) to create Clojure projects.

## [Using the REPL](using-the-repl.md)
A brief guide in how to use the Clojure REPL and enhance the REPL experience with [rebel readline](https://github.com/bhauman/rebel-readline).

## [Editors for Clojure](install-guides/)
Spacemacs (Emacs), Calva (VS Code), Chlorine or ProtoREPL (Atom.io) and Cursive (IntelliJ) are commonly used editors that have great support for Clojure development.  Vim also has several plugins that provide great support too.

> #### Hint::Other tools
> [Leiningen](https://leiningen.org) has been a very common tool to create and run projects, as well as create build assets (jars) for deployment.  All the code in this guide should still work with Leiningen when a correctly configured `project.clj` file is created.  This guide should also work for [boot build tools](http://boot-clj.com/), although contains no specific details.
