# Using Clojure projects in the REPL
A Clojure project can be used in the REPL by requiring the main namespace

## Start the REPL and load the project
Open a terminal and change to the root of the Clojure project directory, where the `deps.edn` file can be found.

Start the REPL (in this example using rebel readline)

```shell
clojure -A:rebel
```

At the REPL prompt, require the main namespace of the project.

If the project was created with the command `clojure -A:new app practicalli.status-monitor-service`, then the main namespace will be `practicalli.status-monitor-service`

```clojure
(require '[practicalli.status-monitor-service])
```

The `require` function loads all the vars (def, defn, etc) definitions from the main namespace.  The `ns` form is also read and any required namespaces that are in the `ns` form are loaded.


## Reloading the namespace
When changes are made to a namespace in the source code file, those changes can be loaded into the repl by reloading the namespace the change was made in.

`(:require '[fully.qualified.namespace] :reload)`


## Troubleshooting
If errors occur when loading the namespace with require, the `:verbose` option will show all the namespaces that are loaded.  This may show issues or help track down conflicting namespaces or functions.

```clojure
(require '[practicalli.status-monitor-service] :verbose)
```
