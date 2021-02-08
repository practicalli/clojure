# Hot-loading of Library Dependencies
`add-lib` from `clojure.tools.deps.alpha` will hot-load a library into a running REPL, removing the need to restart the REPL in order to use a library not defined in the project `deps.edn` configuration.

> #### WARNING::WARNING: Not officially supported approach
> The `add-lib` function is not officially part the Clojure CLI tools.  The code design may change so this approach should be used with caution and not relied upon in your workflow.

{% tabs practicalli="practicalli/clojure-deps-edn", manual="Manually add Alias" %}

{% content "practicalli" %}

## Use alias for tools.deps.alpha dependency
[Install practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn/) which included the `:alpha/hot-load` alias which adds the `clojure.tools.deps.alpha.repl` library as an extra dependency.


{% content "manual" %}

## Add alias for tools.deps.alpha
Edit the project `deps.edn` configuration and add an `:alpha/hot-load-deps` alias for the `clojure.tools.deps.alpha.repl` library.

```clojure
  :alpha/hot-load
  {:extra-deps {org.clojure/tools.deps.alpha
               {:git/url "https://github.com/clojure/tools.deps.alpha"
                :sha     "d77476f3d5f624249462e275ae62d26da89f320b"}}}
```

> Alias example taken from [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn/)

{% endtabs %}


## Hot-load in a terminal REPL UI
Start a REPL session using the Clojure CLI tools with the hot-load alias, including rebel readline for an enhance REPL UI.

```shell
clojure -M:alpha/hot-load:repl/rebel
```

A REPL will start an will download the required libraries for the `:hot-load-deps` alias (added to the local `~/.m2` maven cache on first run).

![Clojure REPL - hot load library dependencies](/images/clojure-repl-hot-load-deps-rebel.png)

Require the `clojure.tools.deps.alpha` library and make refer the add-lib function.

```clojure
(require '[clojure.tools.deps.alpha.repl :refer [add-lib]])
```

Hot-load a library into the REPL using the `add-lib` function in the following form

```clojure
(add-lib 'domain/library {:mvn/version "RELEASE"})
```

![Clojure REPL hot load dependencies ](/images/clojure-repl-tools-deps-hot-reload-add-lib-require.png)


## Hot-load in a Clojure editor
Start a REPL in a terminal and use the connect command of the editor to connect the editor to the REPL process.  Alternatively, use the editors jack-in function to start a REPL process and connect.

Once the editor is connected to the REPL, edit the source code to required the `clojure.tools.deps.alpha.repl` namespace and write `add-lib` expressions to hot-load libraries.

Use a rich comment block to hold the code that hot-loads libraries

```clojure
(comment
  ;; Add-lib library for hot-loading
  (require '[clojure.tools.deps.alpha.repl :refer [add-libs]])

  (add-libs
   '{ring/ring {:mvn/version "RELEASE"}
     ring/ring-defaults {:mvn/version "0.3.2"}})
  )
```
