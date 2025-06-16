# Install Clojure

[Clojure CLI](clojure-cli.md) provides the foundation for Clojure development, providing a declarative approach to:

* Run Clojure programs and tools
* Run a REPL process (Read-Eval-Print Loop) and provides a basic interactive terminal UI
* Manage packaged dependencies from Maven (jars) and use Git repositories as dependencies

!!! INFO "Practicalli Clojure Config community tools"
    [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](clojure-cli/#practicalli-clojure-cli-config) is a user configuration providing aliases for a wide range of community tools which extends the features of Clojure CLI.  The aliases include tools to create, develop, build and deploy Clojure code.  Aliases are used heavily in the Practicalli books.

    If the Practicalli Clojure CLI config is not used, review the [:fontawesome-brands-github: `deps.edn` file](https://github.com/practicalli/clojure-cli-config/blob/live/deps.edn){target=_blank} from the GitHub repository and add relevant aliases definitions to your own Clojure CLI configuration.

## "Pre-requisites"
    
A [Java Virtual Machine](java.md) hosts Clojure. Java 21 is the current Long Term Support version providing a stable platform to run Clojure


## Additional tools

!!! INFO "Clojure connected editor"
    A [Clojure connected editor](/clojure/clojure-editors/) provides the most effective way to write and maintain Clojure projects.  The editor connects to (or starts) a Clojure REPL and code can be evaluated as its typed, showing the results instantly in line with the code.

    [Clojure LSP server](/clojure/clojure-editors/clojure-lsp/) generates static analysis of code which editors can surface as code diagnostics.  Analysis supports effective code navigate and refactor tools. [:fontawesome-solid-book-open: Practicalli Clojure LSP config](/clojure/clojure-editors/clojure-lsp/) configures 

!!! INFO "Data Inspectors"
    [Data inspectors](/clojure/data-inspectors/) visualize results of Clojure code evaluation and allow navigation of nested data or paging through large data sets.

    [Portal](/clojure/data-inspector/portal/) is highly recommended data inspector and included in projects generated with [Practicalli Project Templates](/clojure/clojure-cli/projects/templates/practicalli/).


??? INFO "Alternative development tools"
    [Leiningen](https://leiningen.org){target=_blank} is the long-standing development tool for Clojure.  All the code examples in this book should work with Leiningen when a correctly configured `project.clj` file is created which includes all the necessary library dependencies.  Libraries included via aliases should be added as either `:dev-dependencies` or `:aliases` in the Leiningen `project.clj` file.

