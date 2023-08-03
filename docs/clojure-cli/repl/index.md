# Clojure REPL

The REPL is the environment in which all Clojure code runs, whether that be during development, testing or in production systems.

A Terminal REPL provides a simple way to interact with the REPL, sending code expressions for evaluation and returning results.  A terminal REPL is very quick experiments, working with long running processes (e.g. http severs running Clojure) or for a convenient way to interact with the REPL state and manage components (e.g restarting system components, querying UI component state or services system state).

## Rebel Terminal REPL UI

Rebel is a REPL terminal UI that provides auto-completion, function call syntax help, themes and key binding styles to enhance the development experience.  Clojure tools also include [a REPL with a minimal interface](/alternative-tools/clojure-cli/basic-repl.md) by default.

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/U19TWMsg0s0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

### Install rebel readline

[:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/install/clojure-cli/#practicalli-clojure-cli-config) contains an alias to run rebel readline.

??? INFO "Add a Rebel terminal UI alias"
    If not using [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/install/clojure-cli/#practicalli-clojure-cli-config) then add an alias called `:repl/rebel`to your own user `deps.edn` configuration
    ```clojure
    :repl/rebel {:extra-deps {com.bhauman/rebel-readline {:mvn/version "0.1.4"}}
                 :main-opts  ["-m" "rebel-readline.main"]}
    ```

### Running the rebel REPL

Start a Clojure REPL with Rebel terminal UI.  Use the command in the root of a Clojure project to include the project dependencies and source code.

!!! NOTE ""
    ```shell
    clojure -M:repl/rebel
    ```

A REPL prompt displays and will evaluate code entered.

![Clojure REPL rebel readline](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-prompt-dark.png#only-dark)
![Clojure REPL rebel readline](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-prompt-light.png#only-light)

Evaluate Clojure code by typing at the `=> user` prompt pressing `Return`, the results of evaluating the code are printed on the next line.

`:repl/quit` as the prompt will end the REPL session and all changes not saved to a file will be lost.

> ++ctrl+"c"++ if the repl process does not return to the shell prompt.

## REPL startup

The Clojure REPL always starts in the `user` namespace.

During startup the the `clojure.core` functions are required (made available) in the user namespace, so `(map inc [1 2 3])` can be called without specifying the `clojure.core` namespace in which those functions are defined.

> If clojure.core were not required, then the expression would be `(clojure.core/map clojure.core/inc [1 2 3])`

### Customize Rebel Readline

`:repl/help` in the repl prompt shows the Rebel configuration options

Set configuration options in a `rebel_readline.edn` file, in `$XDG_CONFIG_HOME/clojure/` or `$HOME/.clojure`

??? EXAMPLE "Rebel Readline Configuration options"
    ```clojure title="$XDG_CONFIG_HOME/clojure/rebel_readline.edn"
    ;; ---------------------------------------------------------
    ;; Rebel Readline Configuration
    ;;
    ;; Customise use and appearance
    ;; ---------------------------------------------------------
    
    {;; Vi or Emacs style key-map
     ;; :viins or :emacs. Default :emacs
     :key-map     :viins
    
     ;; Color theme - light or dark
     ;; :color-theme :light-screen-theme
     :color-theme :dark-screen-theme
    
     ;; Enable syntax highlight. Default true}
     :hihighlight true
    
     ;; Enable complete on tab. Default true}
     :completion  true
    
     ;; Enable function documentation Default true
     :eldoc  true
     ;; auto indent code on newline. Default true}
     :indent true
    
     ;; rebind root *out* during read to protect linereader, Default true}
     :redirect-output true
    
     ;; Custom key-bindings applied after all other 
     :key-bindings {}}
    ```

![Clojure Rebel REPL - repl/help](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-help-menu-dark.png#only-dark)
![Clojure Rebel REPL - repl/help](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/rebel/clojure-repl-rebel-help-menu-light.png#only-light)

## Terminal REPL and Editor

Including an nREPL server when starting the REPL allows [clojure ware editors](/clojure/clojure-editors/) to connect to the REPL process, providing a more effective way to write and extend Clojure code.

An external REPL can still be of use even when only evaluating code in a [Clojure editor](/clojure/clojure-editor/). Separating the REPL process from the editor process allows the editor to be closed, upgraded or swapped for a different editor without having to end the REPL session.  Different editors could be connected to the same REPL to use particular features they provide.

A REPL process can be long running, staying alive for days, weeks or months when working on larger projects.  Avoiding a REPL atop and start maintains the state of the REPL in memory, supporting the flow of the Clojure workflow.

Including an nREPL server when starting the REPL allows [clojure ware editors](/clojure/clojure-editors/) to connect to the REPL process.

[:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/install/clojure-cli/#practicalli-clojure-cli-config) contains aliases for a basic terminal UI and a headless (non-interactive) terminal UI, each starting an nREPL server for editor connection.

??? INFO "Alias definitions for a basic terminal UI REPL"
    Interactive client REPL with nREPL server for Clojure Editor support
    ```clojure
    :repl/basic
    {:extra-deps {nrepl/nrepl {:mvn/version "1.0.0"}
                  cider/cider-nrepl {:mvn/version "0.28.7"}}
     :main-opts  ["-m" "nrepl.cmdline"
                  "--middleware" "[cider.nrepl/cider-middleware]"
                  "--interactive"]}
    ```

    Headless REPL with nREPL server for Clojure Editor support
    ```clojure
    :repl/headless
    {:extra-deps {nrepl/nrepl {:mvn/version "1.0.0"}
                  cider/cider-nrepl {:mvn/version "0.28.7"}}
     :main-opts  ["-m" "nrepl.cmdline"
                  "--middleware" "[cider.nrepl/cider-middleware]"]}
    ```

To have a basic terminal UI REPL prompt use the `:repl/basic` alias to start a REPL process with nREPL connection.

!!! NOTE ""
    ```shell
    clj -M:repl/basic
    ```

To only have the REPL process without a REPL prompt, use the `:repl/headless` aliase to start a REPL process with nREPL connection.  This approach is useful to separate the REPL output from the editor whilst keeping all the interaction with the REPL via the editor.

!!! NOTE ""
    ```shell
    clj -M:repl/headless
    ```
