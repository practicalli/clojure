# Install Clojure and related tools

Clojure CLI tools provide a simple and configurable way to:

* Run Clojure programs and tools
* Run a REPL process (Read-Eval-Print Loop) and provides a basic interactive terminal UI
* Manage packaged dependencies from Maven (jars) and use Git repositories as dependencies

Using [community tools](community-tools.md) on top of Clojure CLI provides tasks to create, develop, build and deploy Clojure applications and services.  For example `clojure -T:project/new` can be used to create a project from a template and `clojure -M:repl/rebel` starts a rich terminal UI and REPL Process, which Clojure editors can connect to.


## Complete Clojure development environment

Establish an effective Clojure development environment by installing the following:

| Tools                                             | Required    | Purpose                                                                                  |
|---------------------------------------------------|-------------|------------------------------------------------------------------------------------------|
| [Java 17 LTS](java.md)                            | Essential   | Java virtual machine hosts Clojure. Java 11 is the Long Term Support version             |
| [Clojure CLI](clojure.md)                         | Essential   | Run Clojure REPL and other tools for development and production                          |
| [Practicalli Community tools](community-tools.md) | Recommended | Curated aliases providing common development tasks and tools across all projects         |
| [Clojure aware editors](/clojure-editors/)        | Recommended | Editors providing a complete Clojure development environment                             |
| [Code analysis (clj-kondo)](code-analysis.md)     | Optional    | Lint tool to detect syntax bugs and suggest idiomatic code (included in Clojure-lsp)     |
| [Clojure LSP server](clojure-lsp.md)              | Recommended | Lint tool to detect syntax bugs and suggest idiomatic code                               |
| [Data browsers](data-browsers/)                   | Recommend   | Visualize results of Clojure code, navigate nested data and page through large data sets |

!!! Hint "Aliases provided by practicalli/clojure-deps-edn"
    [practicalli/clojure-deps-edn](#clojure-cli-tools-common-aliases) provides a user wide configuration of over 30 aliases to support Clojure development.

    These aliases use meaningful names to avoid clashes with project specific aliases, ensuring that the user wide aliases remain available in all projects.

    If Practicalli alaises are not used, adding aliases for the clj-new tool and rebel readline as they are extensively used in this guide.


## Other development tools

[Leiningen](https://leiningen.org) is the classic development tool for Clojure.  All the code examples in this book should work with Leiningen when a correctly configured `project.clj` file is created.
