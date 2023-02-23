# Using Clojure libraries in the REPL

A library should be included as a dependency in order to use it within the REPL.

Add library dependencies to the top level `:deps` key in a project `deps.edn` configuration file, or add via an alias if the library is use at development time.

Aliases from a user configuration can also add optional libraries when running a REPL, e.g. [Practicalli Clojure CLI config](clojure/clojure-cli/practicalli-config.md)


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

??? HINT "Finding libraries"
    Search for community libraries via the [Clojars.org website](https://clojars.org/)

    `clojure -M:search/libraries pattern` where pattern is the name of the library to search for.  Copy the relevant results into the project `deps.edn` file.

    `clojure -M:search/libraries --format:merge pattern` will automatically add the library into the `deps.edn` file.

    `clojure -X:deps find-versions :lib fully.qualified/library-name :n 5` returns the last 5 versions of the given library.


## Include library

Open a terminal and change to the root of the Clojure project directory, where the `deps.edn` file can be found.

Start the REPL including the `:database/h2` alias to include every library defined in the `:deps` key and libraries in the `:database/h2` alias.  This example is using rebel readline rich terminal UI

```bash
clojure -M:repl/rebel
```

This command will include

Add aliases to include optional libraries, such as those used for development.  In this example, the H2 database and next.jdbc libraries are included along with those libraries in the `:deps` key of `deps.edn`

```bash
clojure -M:database/h2:repl/rebel
```


## Load namespace

At the REPL prompt, require a namespace from the project to load all the code from that namespace and any namespaces required.

If a project was created with the command `clojure -T:project/new :template app :name practicalli/status-monitor` then the main namespace will be `practicalli.status-monitor`

```clojure
(require '[practicalli.status-monitor])
```

The `require` function loads all the code from the main namespace.  When an `ns` form is read, required namespaces in the `ns` form are also loaded.


## Reloading namespace

Clojure is a dynamic environment, so changes to function definitions (`defn`) and shared symbol names (`def`) can be updated without restarting the REPL.

`require` loads the code from the specified namespace.  Using the `:reload` option forces the namespace to be loaded again, even if it was already loaded.

When changes are made to a namespace in the source code file, `:reload` ensures those changes become the code running in the REPL

```clojure
(require '[practicalli.status-monitor] :reload)
```

If errors occur when loading or reloading the namespace with require, the `:verbose` option will show all the namespaces that are loaded.  This may show issues or help track down conflicting namespaces or functions.

```clojure
(require '[practicalli.status-monitor] :reload :verbose)
```


## Hotload libraries

??? INFO "Hotload Libraries in the REPL"
    `add-libs` function from the `clojure.tools.deps.alpha` library is an experimental approach to hot-loading library dependencies without having to restart the REPL or add those dependencies to the project `deps.edn`.  This provides a simple way to try out libraries.

    [hotload libraries secion](/clojure/clojure-cli/repl-reloaded/) for more details and how to use with Clojure editors.

Start a REPL session using Clojure CLI with the [`:lib/hotload alias`](/clojure/clojure-cli/repl-reloaded/), including rebel readline for an enhance REPL terminal UI.

```bash
clojure -M:lib/hotload:repl/rebel
```

![Clojure REPL - hot load library dependencies](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-rich-comment-block.png)

Require the `clojure.tools.deps.alpha` library and refer the `add-libs` function.  The `add-libs` function can then be called without having to use an alias or the fully qualified name.

```clojure
(require '[clojure.tools.deps.alpha.repl :refer [add-libs]])
```

Hotload a library into the REPL using the `add-lib` function in the following form, where `domain/library` is the fully qualified name of the library and `RELEASE` is a string of the version number of that library to use.

```clojure
(add-libs '{domain/library {:mvn/version "RELEASE"}})
```

Multiple libraries can be hot-loaded in a single `add-libs` expression

```clojure
(add-libs '{hhgttg/meaning {:mvn/version "4.2.0"}
            eternity/room  {:mvn/version "1.0.1"}})
```


### Hotload hiccup in a terminal REPL

The hiccup library converts clojure structures into html, where vectors represent the scope of keywords that represent html tags.

Load the hiccup library using add-libs

```clojure
(add-libs '{hiccup/hiccup {:mvn/version "2.0.0-alpha2"}})
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
