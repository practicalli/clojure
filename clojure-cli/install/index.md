# Install Clojure and related tools
Clojure CLI tools provide a simple and configurable way to:

* Run Clojure programs and tools
* Run an interactive REPL (Read-Eval-Print Loop) and evaluate Clojure expressions, usually with a [Clojure aware editor](/clojure-editors/)
* Managing dependencies (via tools.deps) from Maven and Git repositories

Using [community tools](community-tools.md) on top of Clojure CLI tools provides tasks to create, develop, build and deploy Clojure applications and services


## Complete Clojure development environment
Establish an effective Clojure development environment by installing the following:

| Tools                                         | Required    | Purpose                                                                                  |
|-----------------------------------------------+-------------+------------------------------------------------------------------------------------------|
| [Java 11 LTS](java.md)                        | Essential   | Java virtual machine hosts Clojure. Java 11 is the Long Term Support version             |
| [Clojure CLI](clojure-cli.md)                 | Essential   | Run Clojure REPL and other tools for development and production                          |
| [Community tools](community-tools.md)         | Recommended | Curated aliases providing common development tasks and tools across all projects         |
| [Clojure aware editors](/clojure-editors/)    | Recommended | Editors providing a complete Clojure development environment                             |
| [Code analysis (clj-kondo)](code-analysis.md) | Recommended | Lint tool to detect syntax bugs and suggest idiomatic code                               |
| [Data browsers](data-browsers/)               | Recommend   | Visualize results of Clojure code, navigate nested data and page through large data sets |

> #### Hint::Aliases provided by practicalli/clojure-deps-edn
> [practicalli/clojure-deps-edn](#clojure-cli-tools-common-aliases) provides a user wide configuration of over 30 aliases to support Clojure development.  These aliases use meaningful names to avoid clashes with project specific aliases, ensuring that the user wide aliases remain available in all projects.


## Other development tools
[Leiningen](https://leiningen.org) is the classic development tool for Clojure.  All the code examples in this book should work with Leiningen when a correctly configured `project.clj` file is created.
