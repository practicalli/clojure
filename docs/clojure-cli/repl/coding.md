# Coding in the REPL

Clojure code can be typed into the REPL directly and the result instantly returned.  Code can also be loaded from a project source code files, to run pre-written code.

??? HINT "Clojure Editors are the main tool for writing code"
    An [editor connected to a Clojure REPL](/clojure/clojure-editors/) and evaluating from source code files is the most effective way for writing Clojure code.

    Evaluating code in an editor automatically uses the correct namespace, avoiding the need to change namespaces or fully qualify function calls. Evaluation results can be shown in-line, as comments next to the code or in a data inspector.

    Editors provide structural editing and Clojure syntax checking, along with general editor features.


## Using the REPL

Use the `clojure` command to start a REPL with Rebel, or the `clj` wrapper with the Clojure CLI REPL ([requires `rlwrap` binary](/clojure/install/clojure-cli/#optional-rlwrap-readline)).

=== "Rebel REPL"
    Start a Clojure REPL with Rebel terminal UI which also starts an nREPL server which a Clojure editor can connect too.

    !!! NOTE ""
        ```shell
        clojure -M:repl/rebel
        ```

    A REPL prompt displays ready to evaluate a Clojure expression.

    ![Clojure REPL rebel readline](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-prompt-dark.png#only-dark)
    ![Clojure REPL rebel readline](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-prompt-light.png#only-light)


=== "Clojure CLI REPL"
    Start a Clojure REPL with a basic UI which also starts an nREPL server which a Clojure editor can connect too.
    !!! NOTE ""
        ```shell
        clj -M:repl/basic
        ```

    > The `clj` wrapper [requires `rlwrap` binary](/clojure/install/clojure-cli/#optional-rlwrap-readline).

    A REPL prompt displays ready to evaluate a Clojure expression.


??? INFO "Project dependencies automatically downloaded on REPL start"
    When a REPL is started from the root of a Clojure project the project dependencies are automatically downloaded (unless previously downloaded to the local maven cache, `.m2/`) and project specific paths are added, e.g. `src` tree.


??? INFO "Use REPL with a Clojure project"
    A REPL can run without a Clojure project, however, libraries and code are simpler to manage within project source and configuration files.


## REPL start state

The Clojure REPL always starts in the `user` namespace.

During startup the the `clojure.core` functions are required (made available) in the user namespace, so `(map inc [1 2 3])` can be called without specifying the `clojure.core` namespace in which those functions are defined.

> If clojure.core were not required, then the expression would be `(clojure.core/map clojure.core/inc [1 2 3])`



## Evaluating code

Type Clojure code at the `=> user` REPL prompt

Press `Enter` to evaluate the code and see the result.

![Clojure REPL clj evaluate map function](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-eval-map-function-dark.png#only-dark)
![Clojure REPL clj evaluate map function](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-eval-map-function-light.png#only-light)

++arrow-up++ and ++arrow-down++ navigate the REPL history, providing an efficient way to evaluate the same code many times.

In Rebel, typing part of function name shows matches available, ++tab++ to cycle through the choices, ++enter++ to select.

![Clojure REPL rebel readline - example of autocompletion](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-function-autocomplete-map-dark.png#only-dark)
![Clojure REPL rebel readline - example of autocompletion](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-function-autocomplete-map-light.png#only-light)


## Load code from file

Clojure code is usually saved in files and each file has a namespace definition that matches the file path, using the `ns` function. The file `src/practicalli/playground.clj` has the namespace `practicalli.playground`

```clojure
(ns practicalli.playground)
```

Requiring the namespace of a file will evaluate (load) the code from that file in the REPL.

```clojure
(require 'practicalli.playground)
```

Functions defined in that namespace can be called using their fully qualified names.  e.g. if the namespace contains a function called `main`, that function can be called using `(practicalli.playground/main)`.


??? INFO "Change namespaces"
    Change the namespace to `practicalli.playground` to call functions defined in that namespace by their unqualified function name, eg. `(main)`, rather than the fully qualified name, e.g. `(practicalli.playground/main)`

    `in-ns` will change change the current namespace to the one specified as an argument.

    ```clojure
    (in-ns 'practicalli.playground)
    ```

    Now the `(main)` function can be called without having to include the full namespace name.

    > Typically it is more efficient to stay in the `user` namespace and require all other namespaces required.


## Reload code changes

The `:reload` option to `require` will load in any changes to a namespace that happened outside of the REPL, eg. using an editor to change the source code in the file.

```clojure
(require 'practicalli.playground :reload)
```

Use the `:verbose` option when issues occur loading a particular namespace.  As the namespace being required may also require other namespaces, multiple namespaces may be loaded from one `require` expression.

`:verbose` shows a full list of the namespaces being loaded.

```clojure
(require 'practicalli.playground :reload :verbose)
```

??? HINT "Reload in Terminal REPL for unconnected editor"
    When using an editor that is not connected to the Clojure REPL, then reloading is an effective way of updating the code with all the changes saved in the file.


## Close REPL

`:repl/quit` at the REPL prompt will end the REPL session and all code not saved to a file will be lost.

> ++ctrl+"c"++ if the repl process does not return to the shell prompt.



## Next steps

[Managing Library dependencies in REPL](libraries.md){.md-button}
