# Portal - navigate your data

> #### WARNING::New Projects
> Portal is a new project so things may change rapidly, please see the [`djblue/portal` repository](https://github.com/djblue/portal) for the latest information

Portal is a new project that allows exploration of Clojure data, using a browser window to visualise and inspect Clojure, JSON and Transit data.

* [Online demo](https://djblue.github.io/portal/)

![Portal - explore your Clojure data](https://raw.githubusercontent.com/djblue/portal/master/resources/screenshot.png)

## Portal as a deps.edn alias
[`practicalli/clojure-deps-edn`]({{ book.P9IClojureDepsEdn }}) contains the `:inspector-portal` alias that run a Reveal repl with data browser.

* `inspector-portal-cli` - Clojure CLI (simplest approach)
* `inspector-portal-web` - Web ClojureScript REPL
* `inspector-portal-node` - node ClojureScript REPL


## Run a REPL with Portal dependencies
Run a REPL in a terminal and include the Portal library, using the Clojure CLI tools

```shell
clj -A:inspector-portal-cli
```


## Starting Portal in the REPL

`(require '[portal.api :as portal])` once the REPL starts.  For `inspector-portal-web` use `(require '[portal.web :as portal])` instead

`(portal/open)` to open the web based inspector window in a browser.


## Using Portal to inspect data

`(portal/tap) `to add portal as a tap target (add-tap)

`(tap> {:accounts [{:name "jen" :email "jen@jen.com"} {:name "sara" :email "sara@sara.com"}]})` to send data to the portal inspector window (or any other data you wish to send)

`(portal/clear)` to clear all values from the portal inspector window.


## Close Portal
`(portal/close)` to close the inspector window.


See the [Portal project readme](https://github.com/djblue/portal) for more details and examples.
