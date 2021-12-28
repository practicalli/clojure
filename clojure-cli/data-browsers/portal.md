# Portal - navigate your data

> #### WARNING::New Project
> Portal is a new project so things may change rapidly, please see the [`djblue/portal` repository](https://github.com/djblue/portal) for the latest information

Portal is a new project that allows exploration of Clojure data, using a browser window to visualise and inspect Clojure, JSON and Transit data.

* [Online demo](https://djblue.github.io/portal/)

![Portal - explore your Clojure data](https://raw.githubusercontent.com/djblue/portal/master/resources/screenshot.png)

## Portal as a deps.edn alias
[`practicalli/clojure-deps-edn`]({{ book.P9IClojureDepsEdn }}) contains the `:inspect/portal` alias that run a Reveal repl with data browser.

* `inspect/portal-cli` - Clojure CLI (simplest approach)
* `inspect/portal-web` - Web ClojureScript REPL
* `inspect/portal-node` - node ClojureScript REPL


## Run a REPL with Portal dependencies
Run a REPL in a terminal and include the Portal library, using the Clojure CLI tools

```bash
clojure -M:inspect/portal-cli
```


## Starting Portal in the REPL

`(require '[portal.api :as portal])` once the REPL starts.  For `inspector-portal-web` use `(require '[portal.web :as portal])` instead

`(portal/open)` to open the web based inspector window in a browser.

`(portal/tap) `to add portal as a tap target (add-tap)


## Starting Portal on REPL startup
Start the Portal inspector as soon as the REPL is started.  This works for a terminal REPL as well as [clojure aware editors](/clojure-editors/).

Create a `dev/user.clj` source code file which requires the portal.api library, opens the inspector window and adds portal as  a tap source.


```clojure
(ns user
  (:require [portal.api :as inspect]))

;; Start Portal inspector on REPL start

;; Open a portal inspector window
(inspect/open)

;; Add portal as a tap> target
(inspect/tap)


(comment
  ;; Clear all values in the portal inspector window
  (inspect/clear)

  ;; Close the inspector
  (inspect/close)

  ) ;; End of rich comment block
```

> The rich comment block includes commands to clear and close the portal inspector window.


Start a REPL using the `:env/dev` and `:inspect/portal-cli` aliases from [practicalli/clojure-deps-edn](/clojure-cli/install/community-tools.md), using the command:

```clojure
clojure -M:env/dev:inspect/portal-cli
```

To use this with Emacs CIDER editor, create a `.dir-locals.el` file in the root of the Clojure project with the following configuration

```
((clojure-mode . ((cider-clojure-cli-global-options . "-M:env/dev:inspect/portal-cli"))))
```


## Using Portal to inspect data
The `tap>` function sends data to Portal to be shown on the inspector window.

`(tap> {:accounts [{:name "jen" :email "jen@jen.com"} {:name "sara" :email "sara@sara.com"}]})` to send data to the portal inspector window (or any other data you wish to send)

Use portal to navigate and inspect the details of the data sent to it via `tap>`.

`(portal/clear)` to clear all values from the portal inspector window.


## Close Portal
`(portal/close)` to close the inspector window.


## References
See the [Portal project readme](https://github.com/djblue/portal) for more details and examples.
