# Clojure REPL

The REPL is the environment in which all Clojure code runs, whether that be during development, testing or in production systems.

A Terminal REPL provides a simple way to interact with the REPL, sending code expressions for evaluation and returning results.

Use a  terminal REPL for

* quick experiments
* long running processes (e.g. http severs running Clojure)
* interact with the REPL state and manage components (e.g restarting system components, querying UI component state or services system state).
* a REPL process separate from a specific editor control

!!! INFO "REPL connected Editor"
    A [Clojure aware editor](/clojure/clojure-editors/) connected to the REPL is used for the majority of Clojure development.  One or more expressions from a source code file can be sent to the REPL for evaluation, displaying the results inline.


## Rebel Terminal REPL UI

Rebel is a REPL terminal UI that provides auto-completion, function call syntax help and documentation, themes and key binding styles to enhance the development experience.  Clojure tools also include [a REPL with a minimal interface](/alternative-tools/clojure-cli/basic-repl.md) by default.

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/U19TWMsg0s0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

### Install Rebel

=== "Practicalli Clojure CLI Config"
    `:repl/rebel` alias is provided by [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/install/clojure-cli/#practicalli-clojure-cli-config) to run rebel readline.

    `:repl/reloaded` alias runs Rebel with tools to support the [:fontawesome-solid-book-open: Practicalli REPL Reloaded](/clojure/clojure-cli/repl-reloaded/), providing a custom REPL startup with support for Portal data inspector and Mulog event logs.

    Both aliases will start an nREPL server for [:fontawesome-solid-book-open: Clojure aware editors](/clojure/clojure-editors/) to connect.

    Rebel libraries are downloaded the first time the Rebel alias is used.


=== "Define Rebel Alias"
    Add an alias called `:repl/rebel`to the user `deps.edn` configuration, e.g. `~/.config/clojure/deps.edn`
    !!! EXAMPLE "Basic Rebel terminal UI alias"
        ```clojure title="~/.config/clojure/deps.edn"
        :repl/rebel
        {:extra-deps {com.bhauman/rebel-readline {:mvn/version "0.1.5"}}
         :main-opts  ["-m" "rebel-readline.main"]}
        ```

    !!! EXAMPLE "Rebel terminal UI alias with nREPL for editor connection"
        ```clojure title="~/.config/clojure/deps.edn"
        :repl/rebel
        {:extra-deps {nrepl/nrepl                {:mvn/version "1.0.0"}
                      cider/cider-nrepl          {:mvn/version "0.31.0"}
                      com.bhauman/rebel-readline {:mvn/version "0.1.4"}}
         :main-opts  ["-e" "(apply require clojure.main/repl-requires)"
                      "--main" "nrepl.cmdline"
                      "--middleware" "[cider.nrepl/cider-middleware]"
                      "--interactive"
                      "-f" "rebel-readline.main/-main"]}
        ```


=== "Clojure CLI REPL"
    [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/install/clojure-cli/#practicalli-clojure-cli-config) contains aliases for a basic terminal UI and a headless (non-interactive) terminal UI, each starting an nREPL server for editor connection.

    !!! INFO "Alias definitions for a basic terminal UI REPL"
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

### Run Rebel REPL

Using the aliase defined above, use the `clojure` command to start a REPL process and nREPl server (to connect a Clojure editor).

!!! NOTE "Run Rebel Readline & nREPL server"

    ```shell
    clojure -M:repl/rebel
    ```

??? INFO "Terminal REPL and Editor"
    Including an nREPL server when starting the REPL allows [clojure ware editors](/clojure/clojure-editors/) to connect to the REPL process, providing a more effective way to write and extend Clojure code.

    An external REPL can still be of use even when only evaluating code in a [Clojure editor](/clojure/clojure-editor/). Separating the REPL process from the editor process allows the editor to be closed, upgraded or swapped for a different editor without having to end the REPL session.  Different editors could be connected to the same REPL to use particular features they provide.

    A REPL process can be long running, staying alive for days, weeks or months when working on larger projects.  Avoiding stop and start of the REPL maintains state in the REPL, maintaining the flow of the Clojure workflow.



### Customize Rebel Readline

`:repl/help` in the repl prompt shows the Rebel configuration options

Set configuration options in a `rebel_readline.edn` file, in `$XDG_CONFIG_HOME/clojure/` or `$HOME/.clojure`

??? EXAMPLE "Practicalli Rebel Readline Configuration options"
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


## Next Steps

[:fontawesome-solid-book-open: Code In The REPL](coding.md){target=_blank .md-button}

[:fontawesome-solid-book-open: Managing Libraries In The REPL](libraries.md){target=_blank .md-button}

[:fontawesome-solid-book-open: Help In The REPL](help.md){target=_blank .md-button}

[:fontawesome-solid-book-open: Custom REPL Startup](../repl-startup.md){target=_blank .md-button}

[:fontawesome-solid-book-open: REPL Uncovered](repl-uncovered.md){target=_blank .md-button}
