# Portal - navigate your data

![Portal - explore your Clojure data](https://raw.githubusercontent.com/djblue/portal/master/resources/screenshot.png){align=right loading=lazy style="height:300px;width:300px"}

Portal is a tool for exploration of Clojure data using a browser window to visualise and inspect Clojure, JSON and Transit data.

Portal is registered as a tap source and recieves values send within a  `(tap> ,,,)` form, providing a more advanced approach to debuging than println.

??? INFO "Clojure 1.10 onward required"

??? INFO "tap sources and tap>"
    tap is a shared, globally accessible system for distributing values (log, debug, function results) to registered tap sources.

    `add-tap` to register a source and recieve all values sent. `remove-tap` to remove a source.

    `tap>` form sends its contents to all registered taps. If no taps are registered, the values sent by tap> are discarded.

[Online Portal demo](https://djblue.github.io/portal/){target=_blank .md-button}


## Add Portal

Define aliases in the Clojure CLI user configuration to use Portal with any Clojure or ClojureScript project.

=== "Practicalli Clojure CLI Config"
    [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config.md) contains several aliases that support Portal, either adding as a library or to start a REPL process that can send all Clojure evaluated code to Portal.

    include the portal library in `clojure` commands to run a REPL

    * `inspect/portal-cli` - Clojure CLI (simplest approach)
    * `inspect/portal-web` - Web ClojureScript REPL
    * `inspect/portal-node` - node ClojureScript REPL
    * `dev/reloaded` - Portal, including [REPL Reloaded tools](/clojure/clojure-cli/repl-reloaded/)

    Run a REPL with portal and `portal.nrepl/wrap-portal` to [send every REPL evaluation to Portal over an nREPL connection](#editor-nrepl-middleware)

    * `:repl/inspect` - starts a basic REPL with Portal nREPL middleware.
    * `:repl/reloaded` - starts a rich terminal UI REPL with Portal nREPL middleware, including [REPL Reloaded tools](/clojure/clojure-cli/repl-reloaded/)


=== "Alias Definition"
    Create portal aliases to include the portal libraries for the Clojure, ClojureScript Web browser and ClojureScript Node server libraries
    ```clojure
    :inspect/portal-cli
    {:extra-deps {djblue/portal {:mvn/version "0.34.2"}}}

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
      djblue/portal     {:mvn/version "0.33.0"}}
     :main-opts ["-m" "nrepl.cmdline"
                 "--middleware"
                 "[cider.nrepl/cider-middleware,portal.nrepl/wrap-portal]"]}
    ```
    !!! HINT "REPL Reloaded Aliases"
        [REPL Reloaded section](/clojure/clojure-cli/repl-reloaded/) includes the `:repl/reloaded` and `:dev/reloaded` ailas definitions


## Start REPL with Portal

Run a REPL in a terminal and include the Portal library, using the Clojure CLI tools

=== "REPL Starup"
    Start a REPL with namespace reloading, hotload libraries and portal data inspector
    ```shell
    clojure -M:repl/reloaded
    ```
    Or start the REPL with only portal
    ```shell
    clojure -M:inspect/portal:repl/rebel
    ```

=== "Emacs Project configuration"
    Add `cider-clojure-cli-aliases` to a `.dir-locals.el` in the root of the Clojure project with an alias used to add portal
    ```emacs title=".dir-locals.el"
    ((clojure-mode . ((cider-preferred-build-tool . clojure-cli)
                      (cider-clojure-cli-aliases . ":dev/reloaded"))))
    ```
    Or include an alias with only portal data inspector
    ```emacs title=".dir-locals.el"
    ((clojure-mode . ((cider-preferred-build-tool . clojure-cli)
                      (cider-clojure-cli-aliases . ":inspect/portal-cli"))))
    ```


=== "Emacs variable"
    Set `cider-clojure-cli-aliases` to the alias used to add portal, e.g. `inspect/portal`
    ```emacs
    (setq cider-clojure-cli-aliases ":inspect/portal")
    ```

    * Spacemacs: add to `dotspacemacs/user-config` in the Spacemacs configuration file.
    * Doom emacs: add to `config.el` Doom configuration file.


## Open Portal UI

`(require '[portal.api :as portal])` once the REPL starts.

> For `inspector-portal-web` use `(require '[portal.web :as portal])` instead

`(portal/open)` to open the Portal inspector window in a browser.

`(add-tap #'portal/submit)` to add portal as a tap target (add-tap)


## Portal UI on REPL startup

Start the Portal inspector as soon as the REPL is started.  This works for a terminal REPL as well as [clojure aware editors](/clojure-editors/).

Create a `dev/user.clj` source code file which requires the portal.api library, opens the inspector window and adds portal as  a tap source.

```clojure
(ns user
  (:require [portal.api :as inspect]))

;; ---------------------------------------------------------
;; Start Portal and capture all evaluation results
;; Open Portal window in browser with dark theme
(inspect/open {:portal.colors/theme :portal.colors/solarized-dark})
;; Add portal as a tap> target over nREPL connection
(add-tap #'portal.api/submit)
;; ---------------------------------------------------------

(comment
  ;; Clear all values in the portal inspector window
  (inspect/clear)

  ;; Close the inspector
  (inspect/close)

  ) ;; End of rich comment block
```

> The rich comment block includes commands to clear and close the portal inspector window.


Start a REPL using the `:repl/reloaded` alias from [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) with a `clojure` command to start a REPL.

```clojure
clojure -M:repl/reloaded
```


To use this with Emacs CIDER editor, create a `.dir-locals.el` file in the root of the Clojure project and include either `:env/dev:inspect/portal-cli` aliases

```emacs
((clojure-mode . ((cider-clojure-cli-aliases . ":env/dev:inspect/portal-cli"))))
```

Or `:dev/reloaded` alias
```emacs
((clojure-mode . ((cider-clojure-cli-aliases . ":dev/reloaded"))))
```

## Send to Portal

The `tap>` function sends data to Portal to be shown on the inspector window.

`(tap> {:accounts [{:name "jen" :email "jen@jen.com"} {:name "sara" :email "sara@sara.com"}]})` to send data to the portal inspector window (or any other data you wish to send)

Use portal to navigate and inspect the details of the data sent to it via `tap>`.

`(portal/clear)` to clear all values from the portal inspector window.

`(portal/close)` to close the inspector window.


## Editor nREPL middleware

`portal.nrepl/wrap-portal` sends every REPL evaluation to Portal over an nREPL connection, avoiding the need to wrap expressions with `tap>`.

=== "Practicalli Clojure CLI Config"
    Start a REPL that includes the Portal nREPL middleware to send the result of every evaluation to portal.

    * `:repl/reloaded` - rich terminal UI with portal and [REPL Reloaded tools](/clojure/clojure-cli/repl-reloaded/)
    * `:repl/inspect` - basic terminal UI with portal

=== "Alias Definition"

    ```clojure title="User deps.edn"
    :repl/inspect
    {:extra-deps
     {cider/cider-nrepl {:mvn/version "0.28.5"}
      djblue/portal     {:mvn/version "0.33.0"}}
     :main-opts ["-m" "nrepl.cmdline"
                 "--middleware"
                 "[cider.nrepl/cider-middleware,portal.nrepl/wrap-portal]"]}}}
    ```

Start a REPL with `:repl/reloaded` or 'repl/inspect'

```shell
clojure -M:repl/reloaded
```

Start Portal User Interface and add portal as a tap target using the `portal.api/submit` function to send all evaluated code to Portal

=== "user namespace"
    Include code in the `user` namespace to start a portal and add a tap source

    ```clojure
    (ns user
      (:require [portal.api :as inspect]))

    ;; Start Portal inspector on REPL start

    ;; Open a portal inspector window
    (inspect/open)

    ;; Add portal as a tap> target over nREPL connection
    (add-tap portal.api/submit)

    (comment
      ;; Clear all values in the portal inspector window
      (inspect/clear)

      ;; Close the inspector
      (inspect/close)

      ) ;; End of rich comment block
    ```


=== "Emacs"
    Add helper functions to the Emacs configuration and add key bindings to call them.

    ```emacs title="Emacs Configuration"
    ;; def portal to the dev namespace to allow dereferencing via @dev/portal
    (defun portal.api/open ()
      (interactive)
      (cider-nrepl-sync-request:eval
        "(do (ns dev) (def portal ((requiring-resolve 'portal.api/open))) (add-tap (requiring-resolve 'portal.api/submit)))"))

    (defun portal.api/clear ()
      (interactive)
      (cider-nrepl-sync-request:eval "(portal.api/clear)"))

    (defun portal.api/close ()
      (interactive)
      (cider-nrepl-sync-request:eval "(portal.api/close)"))
    ```

    * Spacemacs: add to `dotspacemacs/user-config` in the Spacemacs configuration file.
    * Doom emacs: add to `config.el` Doom configuration file.


    ### Key bindings

    Add key bindings to call the helper functions, ideally from the Clojure major mode menu.

    === "Spacemacs"
        Add key bindings specifically for Clojure mode, available via the `, d p` debug portal menu when a Clojure file (clj, edn, cljc, cljs) is open in the current buffer.
        ```emacs title="Spacemacs Configuration - dotspacemacs/user-config"
        (spacemacs/declare-prefix-for-mode 'clojure-mode "dp" "Portal")
        (spacemacs/set-leader-keys-for-major-mode 'clojure-mode "dpp" 'portal.api/open)
        (spacemacs/set-leader-keys-for-major-mode 'clojure-mode "dpc" 'portal.api/clear)
        (spacemacs/set-leader-keys-for-major-mode 'clojure-mode "dpD" 'portal.api/close)
        ```

        Or add user key bindings to the Spacemacs menu (possilbly less useful but will not clash with exisiting Spacemacs key bindings)
        ```emacs title="Spacemacs Configuration - dotspacemacs/user-config"
        (spacemacs/declare-prefix "op" "Clojure Portal")
        (spacemacs/set-leader-keys "opp" 'portal.api/open)
        (spacemacs/set-leader-keys "opc" 'portal.api/clear)
        (spacemacs/set-leader-keys "opD" 'portal.api/close)
        ```

    === "Doom Emacs"
        Use the `map!` macro to add keys to the `clojure-mode-map`, using `:after` to ensure cider is loaded before binding the keys
        ```emacs title="Doom Configuration"
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


## References

See the [Portal project readme](https://github.com/djblue/portal) for more details and examples.
