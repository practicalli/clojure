# Clojure CLI Tools
Clojure CLI tools provide a simple and configurable way to:

* Run Clojure programs and tools
* Run an interactive REPL (Read-Eval-Print Loop) and evaluate Clojure expressions, usually with a [Clojure aware editor](/clojure-editors/)
* Managing dependencies (via tools.deps) from Maven and Git repositories

Using community tools on top of Clojure CLI tools provides tasks to create, develop, build and deploy Clojure applications and services


# Install Clojure CLI Tools

| Tools                                 | Description                                                                                                                                      |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| [Java 11](java.md)                    | Clojure is a hosted language and Clojure tools runs on the Java virtual machine.  Java 11, the current long term support version is recommended. |
| [Clojure CLI Tools](clojure.md)       | Essential tools for Clojure development and running Clojure applications                                                                         |
| [Community tools](community-tools.md) | Curated aliases for community tools and common development tasks                                                                   |
| [Code analysis](code-analysis.md)     | A lint tool for avoiding syntax bugs and supporting idiomatic code                                                                               |
| [Editors](/clojure-editors/)          | Spacemacs (Emacs), Calva (VS Code), Conjure (vim), Chlorine (Atom.io) and Cursive (IntelliJ) provided a complete Clojure development environment |



<!-- Not sure this is the right place for these, but cant find anywhere better yet -->
## Other tools
The [Clojure Inspector](clojure-tools/clojure-inspector.md) provides a simple GUI tool to show to show the result from evaluating Clojure code.

The [REBL data browser](clojure-tools/rebl-data-browser.md) show the results in a GUI of any Clojure code that is evaluated as you are developing.


> #### Hint::Other development tools
> [Leiningen](https://leiningen.org) has been a very common tool to create and run projects, as well as building assets (jars) for deployment.  All the code examples in this book should work with Leiningen when a correctly configured `project.clj` file is created.  This guide should also work for [boot build tools](http://boot-clj.com/), although contains no specific details.
