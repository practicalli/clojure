# Using libraries in the REPL

A library should be defined as a dependency in order to call its functions from within the REPL.

In the `deps.edn` file, the `:deps` key defines libraries that are always part of the project.

Optional libraries are defined via `:aliases`, only included when the alias is used in the command to to start the REPL, e.g. `clojure -M:alias/name`

From Clojure 0.12 [libraries can be hot-loaded into a REPL](#hot-load-library) without restarting it.



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


??? TIP "Aliases for all projects"
    Aliases can also be defined in a user configuration, e.g. [Practicalli Clojure CLI config](../practicalli-config.md)


??? TIP "Find libraries"
    Search for community libraries via the [Clojars.org website](https://clojars.org/)

    `clojure -M:search/libraries pattern` where pattern is the name of the library to search for. Copy the relevant results into the project `deps.edn` file.

    `clojure -M:search/libraries --format:merge pattern` will automatically add the library into the `deps.edn` file.

    `clojure -X:deps find-versions :lib fully.qualified/library-name :n 5` returns the last 5 versions of the given library.


## Include library

Open a terminal and change to the root of the Clojure project directory, where the `deps.edn` file can be found.

Start the REPL including the `:database/h2` alias to include every library defined in the `:deps` key and libraries in the `:database/h2` alias. This example is using rebel readline rich terminal UI

```shell
clojure -M:repl/rebel
```

This command will include

Add aliases to include optional libraries, such as those used for development. In this example, the H2 database and next.jdbc libraries are included along with those libraries in the `:deps` key of `deps.edn`

```shell
clojure -M:database/h2:repl/rebel
```

## Load namespace

At the REPL prompt, require a namespace from the project to load all the code from that namespace and any namespaces required.

If a project was created with the command `clojure -T:project/new :template app :name practicalli/status-monitor` then the main namespace will be `practicalli.status-monitor`

```clojure
(require '[practicalli.status-monitor])
```

The `require` function loads all the code from the main namespace. When an `ns` form is read, required namespaces in the `ns` form are also loaded.

## Reload namespace

Clojure is a dynamic environment, so changes to function definitions (`defn`) and shared symbol names (`def`) can be updated without restarting the REPL.

`require` loads the code from the specified namespace. Using the `:reload` option forces the namespace to be loaded again, even if it was already loaded.

When changes are made to a namespace in the source code file, `:reload` ensures those changes become the code running in the REPL

```clojure
(require '[practicalli.status-monitor] :reload)
```

If errors occur when loading or reloading the namespace with require, the `:verbose` option will show all the namespaces that are loaded. This may show issues or help track down conflicting namespaces or functions.

```clojure
(require '[practicalli.status-monitor] :reload :verbose)
```


## Hot-load library

From Clojure 0.12 onward, libraries can be added to a running REPL session without having to restart it.

Require the `clojure.repl.deps` library and refer the `add-lib` and `add-libs` functions.

```clojure
(require '[clojure.repl.deps.:refer [add-lib add-libs]])
```

Hot-load a library into the REPL using the fully qualified name of the library. If a version (coord) is not provided, the latest release of that library will be used.

```clojure
(add-lib 'domain/library {:mvn/version "release-version"}})
```

Multiple libraries can be hot-loaded in a single `add-libs` expression

```clojure
(add-libs '{hhgttg/meaning {:mvn/version "4.2.0"}
            eternity/room  {:mvn/version "1.0.1"}})
```

![Hot-load libraries into a Clojure Editor](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries-editors.png){loading=lazy}


??? TIP "Changes to libraries in deps.edn can be [syncronised with a running REPL](../projects/hotload-libraries.md#synchronising-library-dependencies)"


### Hot-load hiccup in a terminal REPL

The hiccup library converts Clojure structures into html, where a keyword in a vector represent an html tag, optionally with CSS classes for styling.

Require the Clojure REPL library

```clojure
(require '[clojure.repl.deps :refer [add-lib]])
```

Load the hiccup library using the `add-lib` function, specifying a specific release version.

```clojure
(add-lib 'hiccup/hiccup {:mvn/version "2.0.0-RC1"})
```

Require the hiccup library so its functions are accessible from the current namespace in the REPL.

```clojure
(require '[hiccup.core :as hiccup])
```

Enter an expression using the `hiccup/html` function to convert a clojure data structure to html.

```clojure
(hiccup/html [:div {:class "right-aligned"}])
```

The hiccup expression returns a string of the html code.

![Clojure REPL hot load dependencies ](/images/clojure-repl-hotload-add-libs-hiccup-example.png)
