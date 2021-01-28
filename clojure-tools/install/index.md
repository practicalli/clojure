# Clojure CLI Tools
Clojure CLI tools provide a simple and configurable way to:

* Run Clojure programs and tools
* Run an interactive REPL (Read-Eval-Print Loop) and evaluate Clojure expressions, usually with a [Clojure aware editor](/clojure-editors/)
* Managing dependencies (via tools.deps) from Maven and Git repositories

Using [community tools](community-tools.md) on top of Clojure CLI tools provides tasks to create, develop, build and deploy Clojure applications and services


# Install Clojure CLI Tools

| Tools                                 | Description                                                                              |
|---------------------------------------|------------------------------------------------------------------------------------------|
| [Java 11 LTS](java.md)                | Java virtual machine hosts Clojure. Java 11 is the Long Term Support version             |
| [Clojure CLI Tools](clojure.md)       | Essential tools for Clojure development and running Clojure applications                 |
| [Community tools](community-tools.md) | Curated aliases providing common development tasks and tools across all projects         |
| [Code analysis](code-analysis.md)     | Lint tool to detect syntax bugs and suggest idiomatic code                               |
| [Editors](/clojure-editors/)          | Editors providing a complete Clojure development environment                             |
| [Data browsers](data-browsers/)       | Visualize results of Clojure code, navigate nested data and page through large data sets |


> #### Hint::Other development tools
> [Leiningen](https://leiningen.org) has been a very common tool to create and run projects, as well as building assets (jars) for deployment.  All the code examples in this book should work with Leiningen when a correctly configured `project.clj` file is created.
