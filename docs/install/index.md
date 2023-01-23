# Install Clojure and related tools

Clojure CLI tools provide a simple and configurable way to:

* Run Clojure programs and tools
* Run a REPL process (Read-Eval-Print Loop) and provides a basic interactive terminal UI
* Manage packaged dependencies from Maven (jars) and use Git repositories as dependencies

Use [Practicalli Clojure CLI config](clojure-cli/#practicalli-clojure-cli-config) to extend Clojure CLI with tasks to create, develop, build and deploy Clojure applications and services.  For example `clojure -T:project/new` can be used to create a project from a template and `clojure -M:repl/rebel` starts a rich terminal UI and REPL Process which [Clojure aware editors](clojure-editors/) can connect to.

Develop code using a [Clojure aware editors](clojure-editors/) that is connected to (or even starts) a Clojure REPL, evaluating code as its typed and seeing the results instantly in line with the code.


## Complete Clojure environment

Establish an effective Clojure development environment by installing the following:

| Tools                                                                         | Required    | Purpose                                                                                                                      |
|-------------------------------------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------|
| [Java 17 LTS](java.md)                                                        | Essential   | Java virtual machine hosts Clojure. Java 17 is the Long Term Support version which provides a stable platform to run Clojure |
| [Clojure CLI](clojure-cli.md)                                                 | Essential   | Run Clojure REPL and other tools for development and production                                                              |
| [Practicalli Clojure CLI config](clojure-cli/#practicalli-clojure-cli-config) | Recommended | Curated aliases providing common development tasks and tools across all projects (used heavily in this guide)                |
| [Clojure aware editors](clojure-editors/)                                     | Recommended | Editors providing a complete Clojure development environment                                                                 |
| [Clojure LSP server](clojure-lsp.md)                                          | Recommended | Lint tool to detect syntax bugs and suggest idiomatic code                                                                   |
| [Code analysis (clj-kondo)](code-analysis.md)                                 | Optional    | (included in Clojure-lsp) Lint tool to detect syntax bugs and suggest idiomatic code                                          |
| [Data browsers](data-browsers/)                                               | Recommend   | Visualize results of Clojure code, navigate nested data and page through large data sets                                     |

!!! Hint "Aliases provided by Practicalli Clojure CLI config"
    [practicalli/clojure-deps-edn](clojure-cli/#practicalli-clojure-cli-config) provides a user configuration of over 50 aliases to support Clojure development. These aliases are used heavily in the Practicalli Clojure book.

    If the Practicalli Clojure CLI config is not used, look at the `deps.edn` file in its GitHub repository and the relevant aliases configuration in your own Clojure CLI configuration.


## Alternative development tools

[Leiningen](https://leiningen.org) is the classic development tool for Clojure.  All the code examples in this book should work with Leiningen when a correctly configured `project.clj` file is created which includes all the neccessary library dependencies.
