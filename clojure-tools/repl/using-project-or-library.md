# Using Clojure libraries and projects in the REPL
A Clojure library or project can be used in the REPL, by requiring the main namespace

{% tabs project="Project", library="Library" %}

{% content "practicalli" %}

Run the REPL in the root of the project with a `deps.edn` file


{% content "library" %}
A library needs to be included as a dependency in order to use it in the REPL.

Using an alias
```
clojure -A:database/next.jdbc:database/h2
```

Alternatively, specify the library names on the command line using the `--deps` argument

Or add the library as a dependency to a project and run the REPL from the root of that project.

{% endtabs %}




## Start the REPL and load the project
Open a terminal and change to the root of the Clojure project directory, where the `deps.edn` file can be found.

Start the REPL (in this example using rebel readline)

```shell
clojure -M:repl/rebel
```

At the REPL prompt, require the main namespace of the project.

If the project was created with the command `clojure -M:new app practicalli.status-monitor-service`, then the main namespace will be `practicalli.status-monitor-service`

```clojure
(require '[practicalli.status-monitor-service])
```

The `require` function loads all the vars (def, defn, etc) definitions from the main namespace.  The `ns` form is also read and any required namespaces that are in the `ns` form are loaded.


## Reloading the namespace
When changes are made to a namespace in the source code file, those changes can be loaded into the repl by reloading the namespace the change was made in.

`(:require '[fully.qualified.namespace] :reload)`


## Hot-load libraries
`add-libs` function from the `clojure.tools.deps.alpha` library is an unofficial approach to hot-loading library dependencies without having to restart the REPL or add those dependencies to the project `deps.edn`.  This provides a simple way to try out libraries.

See [hotload of libraries](/alternative-tools/clojure-tools/hotload-libraries.md) for details.


## Troubleshooting
If errors occur when loading the namespace with require, the `:verbose` option will show all the namespaces that are loaded.  This may show issues or help track down conflicting namespaces or functions.

```clojure
(require '[practicalli.status-monitor-service] :verbose)
```
