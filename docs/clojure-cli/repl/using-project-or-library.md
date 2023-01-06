# Using Clojure libraries in the REPL

A library needs to be included as a dependency in order to use it in the REPL.

A dependency can be added to a user level configuration (e.g. [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn)) as an alias, which can then be used with any Clojure project.

Or libraries are added to the `deps.edn` configuration file in the root of the project.  Add the library to the `:deps` key if its part of the application or as an alias if use only for development.

```clojure
{:paths ["src" "resources"]

 :deps
 {org.clojure/clojure {:mvn/version "1.10.3"}}

 :aliases
 {
  :database/h2
  {:extra-deps {com.h2database/h2                 {:mvn/version "2.1.210"}
                com.github.seancorfield/next.jdbc {:mvn/version "1.2.772"}}}
 #_()}
```


## Start a REPL with a library

Open a terminal and change to the root of the Clojure project directory, where the `deps.edn` file can be found.

Start the REPL (in this example using rebel readline rich terminal UI)

```bash
clojure -M:repl/rebel
```

This command will include every library defined in the `:deps` key of the `deps.end` file.

Add aliases to include optional libraries, such as those used for development.  In this example, the H2 database and next.jdbc libraries are included along with those libraries in the `:deps` key of `deps.edn`

```bash
clojure -M:database/h2:repl/rebel
```


## Load a namespace in the REPL

At the REPL prompt, require the main namespace of the project to load all the code from that namespace.

If the project was created with the command `clojure -T:project/new :template app :name practicalli.status-monitor-service`, then the main namespace will be `practicalli.status-monitor-service`

```clojure
(require '[practicalli.status-monitor-service])
```

The `require` function loads all the code from the main namespace.  When an `ns` form is read, required namespaces in the `ns` form are also loaded.


## Reloading the namespace

Clojure is a dynamic environment, so changes to function definitions (`defn`) and shared symbol names (`def`) can be updated without restarting the REPL.

`require` loads the code from the specified namespace.  Using the `:reload` option forces the namespace to be loaded again, even if it was already loaded.

When changes are made to a namespace in the source code file, `:reload` ensures those changes become the code running in the REPL

```clojure
(require '[fully.qualified.namespace] :reload)
```


## Troubleshooting

If errors occur when loading or reloading the namespace with require, the `:verbose` option will show all the namespaces that are loaded.  This may show issues or help track down conflicting namespaces or functions.

```clojure
(require '[practicalli.status-monitor-service] :reload :verbose)
```


## Hotload libraries

`add-libs` function from the `clojure.tools.deps.alpha` library is an unofficial approach to hot-loading library dependencies without having to restart the REPL or add those dependencies to the project `deps.edn`.  This provides a simple way to try out libraries.

See [hotload of libraries](/alternative-tools/clojure-cli/hotload-libraries.md) for details.
