# Install Clojure Tools
Clojure CLI tools provide a simple and configurable way to:

* Evaluate Clojure expressions
* Run Clojure programs
* Run an interactive REPL (Read-Eval-Print Loop)
* Managing dependencies (via tools.deps) from Maven and Git repositories

Using community tools on top of Clojure tools can provides the essential features to create, develop, build and deploy Clojure applications and services


| Tools                                | Description                                                                                                                                                                                                                         |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Java 11](install-java.md)           | Clojure is a hosted language and Clojure tools runs on the Java virtual machine.  Java 11, the current long term support version is recommended.                                                                                    |
| [Clojure 1.10.1](install-clojure.md) | Clojure CLI tools are used in this guide to start REPL's for development and run Clojure applications, usually packaged as (uber)jars.                                                                                              |
| [practicalli/clojure-deps-edn](install-clojure.md) | Curated aliases for community tools and common configurations                                                                                                                                                                       |
| [Editors](/clojure-editors/)         | Spacemacs (Emacs), Calva (VS Code), Chlorine or ProtoREPL (Atom.io) and Cursive (IntelliJ) are commonly used editors that have great support for Clojure development.  Vim also has several plugins that provide great support too. |


## Clojure aware editors
A command line REPL can be used to start learning Clojure or for scripting. A [Clojure aware editor](/clojure-editors/) is highly recommended when working on Clojure projects.

Spacemacs (Emacs), Calva (VS Code), Chlorine or ProtoREPL (Atom.io) and Cursive (IntelliJ) are commonly used editors that have great support for Clojure development.  Vim also has several plugins that provide great support too.


> #### Hint::Other tools
> [Leiningen](https://leiningen.org) has been a very common tool to create and run projects, as well as building assets (jars) for deployment.  All the code examples in this book should work with Leiningen when a correctly configured `project.clj` file is created.  This guide should also work for [boot build tools](http://boot-clj.com/), although contains no specific details.
