# Portal - navigate your data

![Practicalli Portal logo](https://github.com/practicalli/graphic-design/blob/live/logos/practicalli-portal-logo.png?raw=true){align=right loading=lazy style="height:150px;width:150px"}

[Portal inspector](https://cljdoc.org/d/djblue/portal/) is a tool to visualise and inspect Clojure, JSON, Transit, Logs, Yaml, etc.

Registered Portal as a tap source and wrap code with a `(tap> ,,,)` expression to see the results in Portal, providing a more advanced approach to debuging than println.

Send all evaluation results to Portal for a complete history using the [portal-wrap nREPL middleware](#editor-nrepl-middleware)

Add a [custom Mulog publisher](#tap-logs-to-portal) to send all logs to Portal to help with debugging.

Open Portal from the REPL or [configure Portal to open on REPL startup](#open-portal-on-repl-startup).

!!! INFO "Clojure 1.10 onward required"

??? INFO "tap sources and tap>"
    tap is a shared, globally accessible system for distributing values (log, debug, function results) to registered tap sources.

    `add-tap` to register a source and receive all values sent. `remove-tap` to remove a source.

    `tap>` form sends its contents to all registered taps. If no taps are registered, the values sent by tap> are discarded.

    `(deref (deref #'clojure.core/tapset))` will show the tap sources. `tapset` is a Clojure set defined as private var and not meant to be accessed directly.



??? TIP "Portal configuration included in Practicalli Project Templates"
    Clojure projects created with [Practicalli Project Templates]() include Portal configuration to recieve all evaluation results and Mulog event logs.

    A custom `dev/user.clj` file loads `dev/portal.clj` and `dev/mulog-events.clj` configurations on REPL startup, when the `dev` directory is included on the path.

    Use the `:repl/reloaded` for a complete REPL reloaded workflow and tooling on REPL startup


[Online Portal demo](https://djblue.github.io/portal/){target=_blank .md-button}

![Portal - explore your Clojure data](https://user-images.githubusercontent.com/1986211/196015562-238cf450-6467-451c-a985-04c7a9b49dba.png){loading=lazy}


<!-- TODO: practicalli video of using Portal in action -->

## Add Portal

Clojure CLI user configuration aliases enable Portal to be used with any Clojure or ClojureScript project.

=== ":fontawesome-solid-book-open: Practicalli Clojure CLI Config"
    [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) contains several aliases that support Portal, either to start a REPL process that can send all Clojure evaluated code to Portal or simply adding Portal as a library for manual use.

    Run a REPL with portal and `portal.nrepl/wrap-portal` to [send every REPL evaluation to Portal over an nREPL connection](#editor-nrepl-middleware)

    * `:repl/reloaded` - starts a rich terminal UI REPL with Portal nREPL middleware, including [REPL Reloaded tools](/clojure/clojure-cli/repl-reloaded/)
    * `:repl/inspect` - starts a basic REPL with Portal nREPL middleware.

    Or include the portal library in `clojure` commands or when starting a REPL via an editor

    * `dev/reloaded` - Portal, including [REPL Reloaded tools](/clojure/clojure-cli/repl-reloaded/)
    * `inspect/portal-cli` - Clojure CLI (simplest approach)
    * `inspect/portal-web` - Web ClojureScript REPL
    * `inspect/portal-node` - node ClojureScript REPL


=== "Alias Definition"
    Create portal aliases to include the portal libraries for the Clojure, ClojureScript Web browser and ClojureScript Node server libraries
    !!! EXAMPLE "Portal aliases in Clojure CLI user configuration"
        ```clojure
        :inspect/portal-cli
        {:extra-deps {djblue/portal {:mvn/version "0.34.2"}
                      clj-commons/clj-yaml         {:mvn/version "0.7.0"}}}

        :inspect/portal-web
        {:extra-deps {djblue/portal             {:mvn/version "0.34.2"}
                      org.clojure/clojurescript {:mvn/version "1.10.844"}}
         :main-opts  ["-m" "cljs.main"]}

        :inspect/portal-node
        {:extra-deps {djblue/portal             {:mvn/version "0.34.2"}
                      org.clojure/clojurescript {:mvn/version "1.10.844"}}
         :main-opts  ["-m" "cljs.main" "-re" "node"]}

        :repl/inspect
        {:extra-deps
         {cider/cider-nrepl {:mvn/version "0.28.5"}
          djblue/portal     {:mvn/version "0.33.0"}
          clj-commons/clj-yaml         {:mvn/version "0.7.0"}}
         :main-opts ["-m" "nrepl.cmdline"
                     "--middleware"
                     "[cider.nrepl/cider-middleware,portal.nrepl/wrap-portal]"]}
        ```

    [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) contains several aliases that support Portal.

    ??? INFO "YAML support for Portal - Clojure only"
        [:fontawesome-brands-github: clj-commons/clj-yaml](https://github.com/clj-commons/clj-yaml) adds YAML support to Portal for Clojure on the JVM

    !!! HINT "REPL Reloaded Aliases"
        [:fontawesome-solid-book-open: REPL Reloaded section](/clojure/clojure-cli/repl-reloaded/) includes the `:repl/reloaded` and `:dev/reloaded` ailas definitions

## Start REPL with Portal

Run a REPL in a terminal and include the Portal library, using the Clojure CLI tools

=== "REPL Starup"
    Start a REPL with namespace reloading, hotload libraries and portal data inspector
    !!! NOTE ""
        ```shell
        clojure -M:repl/reloaded
        ```
    Or start the REPL with only portal
    !!! NOTE ""
        ```shell
        clojure -M:inspect/portal:repl/rebel
        ```

=== "Emacs Project configuration"
    Add `cider-clojure-cli-aliases` to a `.dir-locals.el` in the root of the Clojure project with an alias used to add portal
    !!! EXAMPLE ".dir-locals.el"
        ```emacs
        ((clojure-mode . ((cider-preferred-build-tool . clojure-cli)
                          (cider-clojure-cli-aliases . ":dev/reloaded"))))
        ```
    Or include an alias with only portal data inspector
    !!! EXAMPLE ".dir-locals.el"
        ```emacs
        ((clojure-mode . ((cider-preferred-build-tool . clojure-cli)
                          (cider-clojure-cli-aliases . ":inspect/portal-cli"))))
        ```

=== "Emacs variable"
    Set `cider-clojure-cli-aliases` to the alias used to add portal, e.g. `inspect/portal`
    !!! EXAMPLE
        ```emacs
        (setq cider-clojure-cli-aliases ":inspect/portal")
        ```
    **Spacemacs**: add to `dotspacemacs/user-config` in the Spacemacs configuration file.  **Doom Emacs**: add to `config.el` Doom configuration file.

## Open Portal

`(require '[portal.api :as inspect])` once the REPL starts.

> For `inspector-portal-web` use `(require '[portal.web :as inspect])` instead

`(inspect/open)` to open the Portal inspector window in a browser (see [portal themes](https://cljdoc.org/d/djblue/portal/0.37.1/doc/ui-concepts/themes){target=_blank})

`(add-tap #'portal/submit)` to add portal as a tap target


### Use Portal from REPL

Portal functions can be called from the REPL prompt. When using Portal regularly, include code in a file, e.g. `dev/user.clj`  namespace to start a portal and add a tap source.  Use a rich comment form, `(comment ,,,)` to wrap the portal function calls if Portal should be launched manually by the developer.

!!! EXAMPLE "user namespace and REPL commands"
    ```clojure
    (ns user
      (:require [portal.api :as inspect]))

    (comment
      ;; Open a portal inspector window
      (inspect/open)
      ;; Add portal as a tap> target over nREPL connection
      (add-tap portal.api/submit)
      ;; Clear all values in the portal inspector window
      (inspect/clear)
      ;; Close the inspector
      (inspect/close)
      ) ;; End of rich comment block
    ```


## Open Portal on REPL startup

Start the Portal inspector as soon as the REPL is started.  This works for a terminal REPL as well as [clojure aware editors](/clojure/clojure-editors/).

Create a `dev/user.clj` source code file which requires the portal.api library, opens the inspector window and adds portal as  a tap source.

=== "REPL Reloaded"
    When using namespace reloading tools (clojure tools.namespace.repl, Integrant, etc.) it is advisable to exclude `dev` directory from the path to avoid launching multiple instances of Portal.
    !!! EXAMPLE
        ```clojure
        (ns user
          (:require
           [portal.api :as inspect]
           [clojure.tools.namespace.repl :as namespace]))

        (println "Set REPL refresh directories to " (namespace/set-refresh-dirs "src" "resources"))
        ```

    As a further precaution, check the Portal API `sessions` value to ensure Portal is not already running, preventing Portal running multiple times
    !!! EXAMPLE
        ```clojure
        (def portal-instance
          (or (first (inspect/sessions))
              (inspect/open {:portal.colors/theme :portal.colors/gruvbox})))
        ```

=== "Basic Portal config"
    !!! EXAMPLE
        ```clojure
        (ns user
          (:require [portal.api :as inspect]))

        ;; ---------------------------------------------------------
        ;; Open Portal window in browser with dark theme
        (inspect/open {:portal.colors/theme :portal.colors/gruvbox})
        ;; Add portal as a tap> target over nREPL connection
        (add-tap #'portal.api/submit)
        ;; ---------------------------------------------------------
        (comment
          (inspect/clear)  ; Clear all values in the portal inspector window
          (inspect/close)  ; Close the inspector
          ) ; End of rich comment block
        ```

Start a REPL using the `:repl/reloaded` or `:dev/reloaded` alias from [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) to include the `dev` directory on the path and the portal library.


## Basic use

The `tap>` function sends data to Portal to be shown on the inspector window.

!!! NOTE ""
    ```clojure
    (tap> {:accounts
            [{:name "jen" :email "jen@jen.com"}
            {:name "sara" :email "sara@sara.com"}]})
    ```

Use portal to navigate and inspect the details of the data sent to it via `tap>`.

`(inspect/clear)` to clear all values from the portal inspector window.

`(inspect/close)` to close the inspector window.


## Editor Commands

Control Portal from a Clojure Editor by wrapping the portal commands.

=== "Emacs"
    Add helper functions to the Emacs configuration and add key bindings to call them.
    !!! EXAMPLE "Emacs Configuration"
        ```emacs
        ;; def portal to the dev namespace to allow dereferencing via @dev/portal
        (defun portal.api/open ()
          (interactive)
          (cider-nrepl-sync-request:eval
            "(do (ns dev)
                 (def portal ((requiring-resolve 'portal.api/open)))
                 (add-tap (requiring-resolve 'portal.api/submit)))"))

        (defun portal.api/clear ()
          (interactive)
          (cider-nrepl-sync-request:eval "(portal.api/clear)"))

        (defun portal.api/close ()
          (interactive)
          (cider-nrepl-sync-request:eval "(portal.api/close)"))
        ```

    * Spacemacs: add to `dotspacemacs/user-config` in the Spacemacs configuration file.
    * Doom emacs: add to `config.el` Doom configuration file.

    Add key bindings to call the helper functions, ideally from the Clojure major mode menu.

=== "Spacemacs"
    Add key bindings specifically for Clojure mode, available via the `, d p` debug portal menu when a Clojure file (clj, edn, cljc, cljs) is open in the current buffer.
    !!! EXAMPLE "Spacemacs Key bindings for Portal"
        Add key bindings to Clojure major mode, e.g. ++comma++ ++"d"++ ++"p"++ ++"c"++ to clear values from Portal
        ```emacs title="Spacemacs Configuration - dotspacemacs/user-config"
        (spacemacs/declare-prefix-for-mode 'clojure-mode "dp" "Portal")
        (spacemacs/set-leader-keys-for-major-mode 'clojure-mode "dpp" 'portal.api/open)
        (spacemacs/set-leader-keys-for-major-mode 'clojure-mode "dpc" 'portal.api/clear)
        (spacemacs/set-leader-keys-for-major-mode 'clojure-mode "dpD" 'portal.api/close)
        ```

        Or add user key bindings to user menu, `SPC o` avoiding potential clash with Spacemacs Clojure layer key bindings.
        e.g. ++spc++ ++"o"++ ++"p"++ ++"c"++ to clear values from Portal
        ```emacs title="Spacemacs Configuration - dotspacemacs/user-config"
        (spacemacs/declare-prefix "op" "Clojure Portal")
        (spacemacs/set-leader-keys "opp" 'portal.api/open)
        (spacemacs/set-leader-keys "opc" 'portal.api/clear)
        (spacemacs/set-leader-keys "opD" 'portal.api/close)
        ```

=== "Doom Emacs"
    Use the `map!` macro to add keys to the `clojure-mode-map`, using `:after` to ensure cider is loaded before binding the keys
    !!! EXAMPLE "Doom Configuration"
        ```emacs
        (map! :map clojure-mode-map
              :n "s-o" #'portal.api/open
              :n "C-l" #'portal.api/clear)
        ```

    !!! EXAMPLE "Practicalli Doom Emacs configuration"
        [Practicalli Doom Emacs config](https://practical.li/doom-emacs/install/) includes Portal key bindings in the Clojure major mode menu, under the debug menu.
        * `, d p o` to open portal
        * `, d p c` to clear results from portal

        ```
        (map! :after cider
              :map clojure-mode-map
              :localleader
              :desc "REPL session" "'" #'sesman-start

              ;; Debug Clojure
              (:prefix ("d" . "debug/inspect")
               :desc "debug" "d" #'cider-debug-defun-at-point
               (:prefix ("i" . "inspect")
                :desc "last expression" "e" #'cider-inspect-last-sexp
                :desc "expression" "f" #'cider-inspect-defun-at-point
                :desc "inspector" "i" #'cider-inspect
                :desc "last result" "l" #'cider-inspect-last-result
                (:prefix ("p" . "portal")
                 :desc "Clear" "c" #'portal.api/clear
                 :desc "Open" "D" #'portal.api/close
                 :desc "Open" "p" #'portal.api/open)
                :desc "value" "v" #'cider-inspect-expr))

                ; truncated...
                )
        ```

    [Practicalli Doom Emacs Config - +clojure.el](https://github.com/practicalli/doom-emacs-config/blob/main/%2Bclojure.el){target=_blank .md-button}

[Portal Documentation - Editors](https://cljdoc.org/d/djblue/portal/0.37.1/doc/editors){target=_blank .md-button}


## Editor nREPL middleware

`portal.nrepl/wrap-portal` sends every REPL evaluation to Portal over an nREPL connection, avoiding the need to wrap expressions with `tap>`.

=== ":fontawesome-solid-book-open: Practicalli Clojure CLI Config"
    Start a REPL that includes the Portal nREPL middleware to send the result of every evaluation to portal.

    * `:repl/reloaded` - rich terminal UI with portal and [REPL Reloaded tools](/clojure/clojure-cli/repl-reloaded/)
    * `:repl/inspect` - basic terminal UI with portal

=== "Alias Definition"
    `:repl/inspect` to start a terminal REPL with nREPL support for Clojure editor connection and portal libraries and middleware that will send all evaluations to portal once added as a tap source.
    !!!! EXAMPLE "User deps.edn"
        ```clojure
        :repl/inspect
        {:extra-deps
         {nrepl/nrepl          {:mvn/version "1.0.0"}
          cider/cider-nrepl    {:mvn/version "0.30.0"}
          djblue/portal        {:mvn/version "0.40.0"}
          clj-commons/clj-yaml {:mvn/version "0.7.0"}}
         :main-opts ["-m" "nrepl.cmdline"
                     "--middleware"
                     "[cider.nrepl/cider-middleware,portal.nrepl/wrap-portal]"]}
        ```

Start a REPL with `:repl/reloaded` or 'repl/inspect'

!!! NOTE ""
    ```shell
    clojure -M:repl/reloaded
    ```

Start Portal User Interface and add portal as a tap target using the `portal.api/submit` function to send all evaluated code to Portal

!!! HINT "Clear results to keep history manageable"
    Use the Portal API `clear` function to remove all existing results in Portal


## Tap Logs to Portal

Using a custom mulog publisher, all event logs can be automatically sent to portal.

!!! EXAMPLE "mulog tap publisher"
    ```clojure
    ;; ---------------------------------------------------------
    ;; Mulog Custom Publishers
    ;; - tap publisher for use with Portal and other tap sources
    ;; ---------------------------------------------------------
    (ns mulog-publisher
      (:require
       ;; [com.brunobonacci.mulog :as mulog]
       [com.brunobonacci.mulog.buffer :as mulog-buffer]
       [portal.api :as p]))

    (deftype TapPublisher [buffer transform]
      com.brunobonacci.mulog.publisher.PPublisher
      (agent-buffer [_] buffer)
      (publish-delay [_] 200)
      (publish [_ buffer]
        (doseq [item (transform (map second (mulog-buffer/items buffer)))]
          (tap> item))
        (mulog-buffer/clear buffer)))

    (defn tap
      [{:keys [transform] :as _config}]
      (TapPublisher. (mulog-buffer/agent-buffer 10000) (or transform identity)))
    ```

Require the `mulog-publisher` namespace and mulog library in the `user` ns expression

!!! EXAMPLE "Require `mulog-publisher` namespace"
    ```clojure
    (ns user
      "Tools for REPL Driven Development"
      (:require
       [com.brunobonacci.mulog :as mulog]
       [mulog-publisher]))
    ```

Start the publisher, optionally setting a global context for events first

!!! EXAMPLE "Set values for all mulog events and start custom mulog publisher"
    ```clojure
    ;; ---------------------------------------------------------
    ;; Mulog events and publishing

    ;; set event global context - information added to every event for REPL workflow
    (mulog/set-global-context! {:app-name "Practicalli Service",
                                :version "0.1.0", :env "dev"})

    (def mulog-tap-publisher
      "Start mulog custom tap publisher to send all events to Portal
      and other tap sources
      `mulog-tap-publisher` to stop publisher"
      (mulog/start-publisher!
        {:type :custom, :fqn-function "mulog-publisher/tap"}))
    ;; ---------------------------------------------------------
    ```

Mulog events are now sent to portal when evaluated

!!! NOTE ""
    ```clojure
        (mulog/log ::repl-state ::ns (ns-publics *ns*))
    ```

Stop the mulog publisher by calling the reference it returns, i.e. mulog-tap-publisher

!!! EXAMPLE "Function to stop mulog tap publisher"
    ```clojure
    (defn mulog-tap-stop
     "Stop mulog tap publisher to ensure multiple publishers are not started
     Recommended before using `(restart)` or evaluating the `user` namespace"
      [] (mulog-tap-publisher))
    ```


## References

[:fontawesome-solid-book-open: Portal Documentation - clj-docs](https://cljdoc.org/d/djblue/portal/){target=_blank .md-button}
