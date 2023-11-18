# Install Clojure

Clojure CLI is the minimum Clojure environment, although a [Clojure aware editor](/clojure/clojure-editors/) with [Clojure LSP server](/clojure/clojure-editors/clojure-lsp/) is highly recommended.

Clojure CLI provide the foundation for Clojure development, providing a declarative approach to:

* Run Clojure programs and tools
* Run a REPL process (Read-Eval-Print Loop) and provides a basic interactive terminal UI
* Manage packaged dependencies from Maven (jars) and use Git repositories as dependencies

[Practicalli Clojure CLI config](clojure-cli/#practicalli-clojure-cli-config) provides a user configuration that extends Clojure CLI with tasks to create, develop, build and deploy Clojure applications and services. Configuration for cljstyle Clojure format tool is also included.

[Clojure aware editors](/clojure/clojure-editors/) provide the most effective way to write and maintain Clojure projects, connecting to (or even starting) a Clojure REPL and evaluating code as its typed and seeing the results instantly in line with the code.

[Practicalli Clojure LSP configuration](/clojure/clojure-editors/clojure-lsp/) for static code analysis with Clojure LSP server and live code formatting with cljfmt. 


## Complete Clojure environment

Establish an effective Clojure development environment by installing the following:

| Fundamental Tools                                                             | Purpose                                                                                                                         |
|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| [Java 17 LTS](java.md)                                                        | Java virtual machine hosts Clojure. Java 17 is the current Long Term Support version providing a stable platform to run Clojure |
| [Clojure CLI](clojure-cli.md)                                                 | Run Clojure REPL and other tools for development and production                                                                 |
| [Practicalli Clojure CLI config](clojure-cli/#practicalli-clojure-cli-config) | Curated aliases providing common development tasks and tools across all projects (used heavily in this guide)                   |


| Recommended Tools                                           | Purpose                                                                                  |
|-------------------------------------------------------------|------------------------------------------------------------------------------------------|
| [Clojure aware editors](/clojure/clojure-editors/)          | Editors providing a complete Clojure development environment                             |
| [Clojure LSP server](/clojure/clojure-editors/clojure-lsp/) | Lint tool to detect syntax bugs and suggest idiomatic code                               |
| [Data inspectors](/clojure/data-inspectors/)                | Visualize results of Clojure code, navigate nested data and page through large data sets |

!!! HINT "Aliases in Practicalli Clojure provided by Practicalli Clojure CLI config"
    [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](clojure-cli/#practicalli-clojure-cli-config) provides a user configuration of over 50 aliases to support Clojure development. These aliases are used heavily in the Practicalli Clojure book.

    If the Practicalli Clojure CLI config is not used, review the [`deps.edn` file](https://github.com/practicalli/clojure-deps-edn/blob/live/deps.edn){target=_blank} from the GitHub repository and add relevant aliases definitions to your own Clojure CLI configuration.

??? INFO "optional: clj-kondo static analysis tool"
    [Code analysis (clj-kondo)](/clojure/reference/code-analysis.md){target=_blank} is a Clojure syntax analysis tool that can detect syntax bugs and suggest idiomatic code.  clj-kondo is included in clojure-lsp, so only recommended if clojure-lsp is not available.

??? INFO "Alternative development tools"
    [Leiningen](https://leiningen.org){target=_blank} is the long-standing development tool for Clojure.  All the code examples in this book should work with Leiningen when a correctly configured `project.clj` file is created which includes all the necessary library dependencies.  Libraries included via aliases should be added as either `:dev-dependencies` or `:aliases` in the Leiningen `project.clj` file.
