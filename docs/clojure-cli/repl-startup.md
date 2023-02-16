# Configure REPL on Startup

A Clojure REPL starts in the `user` namespace by default.  Clojure automatically loads code from a `user.clj` file when found on the class path.

The `user.clj` file can be used for one or more of the following:

* load code into the REPL by requiring namespaces
* call functions to run an application or service
* start components (i.e for mount, component, integrant)
* hotload libraries into the REPL process without restart
* adding development tools - e.g. [portal data inspector](/clojure/data-inspector/portal/#configure-repl-startup)


!!! WARNING "Clojure CLI cannot set the REPL to a different namespace"
    Clojure CLI has no specific mechanism to start the REPL in a namespace other than `user`.

    Technically the `-e` option could be used to set a different namespace by calling `in-ns` with a different namespace, although this approach may affect the running of other tools or add extra complexity to the commands.

    Require functions into the `user` nameapace rather than use potentially complex commands to set the namespace.


??? HINT "Example projects"
    [practicalli/clojure-app-template](https://github.com/practicalli/clojure-app-template){target=_blank} contains a `dev/user.clj` file for configuring the REPL at start up.


## Custom user namespace

A custom `user.clj` is typically placed in a `dev` folder within the root of the project, with the `dev` path defined in an alias to keep it separated from production code.

Create a `dev/user.clj` file with a namespace called `user`.

```clojure title="dev/user.clj"
(ns user)
```

Create an alias to include the `dev` path when running a REPL process

=== "Practicalli Clojure CLI Config"
    [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) includes aliases that add `dev` directory to the class path

    * `:env/dev` alias only adds the `dev` directory to the classpath
    * `:dev/reloaded` adds library hotload, namespace reload, porta data inspector and testing libraries & `test`
    * `:repl/reloaded` adds Rebel rich terminal UI to the tools provided by `:dev/reloaded`

=== "Manual"
    Add an alias to the user `deps.edn` configuration, i.e. `$XDG_CONFIG_HOME/clojure/deps.edn` or `$HOME/.clojure/deps.edn`

    ```clojure title="Clojure User Config"
     :env/dev
      {:extra-paths ["dev"]}
    ```

Running a Clojure REPL with the `:env/dev` alias will add the `dev/user.clj` file to the class path and be loaded by the REPL.

In this example the `dev/` path is added to the project and then the REPL is run using Rebel.

```bash
clojure -M:env/dev:repl/rebel
```

!!! HINT "Using the `dev/` directory"
    The `user.clj` code should not be included in live deployments, such as jars and uberjars.  Including the `dev/` directory via the `:env/dev` alias keeps the `user.clj` and any other development only code separate from deployment actions.


## Requiring namespaces

By requiring a namespace in the `dev/user.clj` file, the code defined in that namespace will be loaded into the REPL during startup. Functions `(defn)` and data `(def)` are immediately available.  If a required namespace also requires namespace, they will also be loaded into the REPL during startup.

Add a require expression to the namespace definition in `dev/user.clj`

```clojure title="dev/user.clj"
(ns user
  (:require [practicalli.project-namespace]))
```

??? WARNING "Requiring many libraries may slow REPL start up time"


`(require '[practicalli.project-namespace])` form can be used instead and placed in a `(comment ,,,)` form.  If the library is no always required this form can be  evaluated by the developer any time after REPL startup.

```clojure title="dev/user.clj"
(ns user)

(comment
  (require '[practicalli.project-namespace])
#_())
```


## Calling functions

Use the fully qualified function name from the required namespace can be called, to start the application for example.

```clojure title="dev/user.clj"
(ns user
  (:require [practicalli.project-namespace]))

(practicalli.project-namespace/-main)
```

An alias can be used in the require expression, useful if multiple functions from a namespace are to be called

```clojure title="dev/user.clj"
(ns user
  (:require [practicalli.service :as service]))

(service/-main)
```


## Search for libraries

The [find-deps project](https://github.com/hagmonk/find-deps) fuzzy searches Maven Central and Clojars for dependencies when given a name.

=== "Practicalli Clojure CLI Config"
    The `:search/libraries` in [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/#project-dependencies) will add the find-deps library.

=== "Manual"
    Add the find-deps project to and alias called `:search/libraries` in the user level `deps.edn` file, i.e. `$XDG_CONFIG_HOME/clojure/deps.edn` or `$HOME/.clojure/deps.edn`

    ```clojure title="Clojure User Config"
      :search/libraries
      {:extra-deps
       {find-deps/find-deps {:git/url "https://github.com/hagmonk/find-deps"
                             :git/sha "9bf23a52cb0a8190c9c2c7ad1d796da802f8ce7a"}}
       :main-opts ["-m" "find-deps.core"]}
    ```

Require the `find-deps.core` namespace in the `dev/user.clj` file to use its `deps` and `print-deps` functions

```clojure title="dev/user.clj"
(ns user
  (:require
    [find-deps.core :as find-lib]))
```

Start a REPL using the `:env/dev` and `:search/libraries` aliases.

To start a Rebel REPL, use the following command in a terminal

```bash
clojure -M:env/dev:search/libraries:repl/rebel
```

Call the `(find-lib/deps "library-name")` to return a map of the matching dependency, or `(find-libs/print-deps "library name")` to print dependencies in a table.

```clojure title="dev/user.clj"
(comment
  (find-lib/deps "library-name")
  (find-lib/print-deps "library name"))
```

## Hotload libraries

[Hotload](/clojure/clojure-cli/repl-reloaded/) is a way to add libraries to a running REPL process that were not incldude as a dependency on REPL startup.


=== "Practicalli Clojure CLI Config"
    `:lib/hotload` and `:lib/reloaded` aliases in [Practicalli Clojure CLI Config](/clojure/clojure-cli/repl-reloaded/) will add the add-libs3 branch of `tools.deps.alpha` which provides the `add-libs` function.

=== "Manual"
    Edit the project `deps.edn` configuration and add an `:lib/hotload` alias for the `clojure.tools.deps.alpha.repl` library.  Or add an alias to the user level configuration for use with any Clojure CLI project.

    The `add-libs` code is on a separate [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3), so requires the SHA from the head of add-libs3 branch

    ```clojure
      :lib/hotload
      {:extra-deps {org.clojure/tools.deps.alpha
                   {:git/url "https://github.com/clojure/tools.deps.alpha"
                    :git/sha "e4fb92eef724fa39e29b39cc2b1a850567d490dd"}}}
    ```

    > Alias example from [Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-deps-edn/)


Start a REPL session using Clojure CLI with the `:lib/hotload alias`, including rebel readline for an enhance REPL terminal UI.

```bash
clojure -M:lib/hotload:repl/rebel
```

Require the `clojure.tools.deps.alpha` library and refer the `add-libs` function.  The `add-libs` function can then be called without having to use an alias or the fully qualified name.

```clojure
(require '[clojure.tools.deps.alpha.repl :refer [add-libs]])
```

Hotload one or more libraries into the REPL using the `add-lib` function, including the fully qualified name of the library and version string.

The hiccup library converts clojure structures into html, where vectors represent the scope of keywords that represent html tags. Load the hiccup library using add-libs

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


## Life-cycle Services

Clojure has several library to manage the life-cycle of components that make up the application, especially those components with state. Components can be started and stopped in a specific order.

Example component life-cycle libraries included

* [mount](https://github.com/tolitius/mount)
* [integrant](https://github.com/weavejester/integrant)
* [component](https://github.com/stuartsierra/component)

In Clojure it is idiomatic to define the component life-cycle services in a namespace called `dev`.  In the `dev/user.clj` file, add the following `ns` declaration to require the `dev` namespace and change to that namespace with `in-ns`

```clojure title="dev/user.clj"
(ns user
  (:require [dev]))

(dev/go)
```
Now define code in the `dev/dev.clj` file that controls the component life-cycle services library for the project.


### Example life-cycle code

Start, stop and restart the components that a system is composed of, e.g. app server, database pool, log publisher, message queue, etc.

=== "Mount"
    Define a `dev.clj` file with `go`, `stop` and `restart` functions that manage the life-cycle of mount components.  A `start` function contains the list of components with optional state.

    Require the mount namespace and the main namespace for the project, which should contain all the code to start and stop services.

    ```clojure title="dev/user.clj"
    (ns user
      :require [mount.core :refer [defstate]]
               [practicalli.app.main])
    ```

    Define a start function to start all services

    ```clojure title="dev/user.clj"
    (defn start []
      (with-logging-status)
      (mount/start #'practicalli.app.conf/environment
                   #'practicalli.app.db/connection
                   #'practicalli.app.www/business-app
                   #'practicalli.app.service/nrepl))
    ```

    The `go` function calls `start` and marks all components as ready.

    ```clojure title="dev/user.clj"
    (defn go
      "Start all states defined by defstate"
      []
      (start)
      :ready)
    ```

    The `stop` function stops all components, removing all non-persistent state.

    ```clojure
    (defn stop [] (mount/stop))
    ```

    The reset function that calls `stop`, refreshes the namespaces so that stale definitions are removed and starts all components (loading in any new code).

    ```clojure title="dev/user.clj"
    (defn reset
      "Stop all states defined by defstate.
      Reload modified source files and restart all states"
      []
      (stop)
      (namespace/refresh :after 'dev/go))
    ```

    * [Example dev.clj file for mount](https://github.com/tolitius/mount/blob/master/dev/clj/dev.clj)

    !!! Hint "Use `dev` namespace during development"
        Require `practicalli.app.dev` namespace rather than main, to start components in a development environment.


=== "Integrant REPL"
     See the [detailed example of Integrant REPL in Practicalli Clojure Web Services](https://practical.li/clojure-web-services/repl-driven-development/integrant-repl/)

    [Usermanager example project](https://github.com/prestancedesign/usermanager-reitit-example) using Integrant.


=== "Component"
    [seancorfield/usermanager-example](https://github.com/seancorfield/usermanager-example) is an example project that uses Component for lifecycle management


=== "Donut System"
    [donut.system](https://github.com/donut-party/system) is a dependency injection library for Clojure and ClojureScript using system and component abstractions to organise and manage startup & shutdown behaviour.

    [Basic usage guide](https://github.com/donut-party/system#basic-usage) shows how to define a donut.system

    <p style="text-align:center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/PMat9Wdt-pk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </p>


## Reference
* [Mount project on GitHub](https://github.com/tolitius/mount)
* [Mount - collection of Clojure/Script mount apps](https://github.com/tolitius/stater)
* [donut.system](https://github.com/donut-party/system)
* [Component](https://github.com/stuartsierra/component)
* [A tutorial to Stuart Sierra's Component](https://www.cbui.dev/a-tutorial-of-stuart-sierras-component-for-clojure/)
* [Refactoring to Components](https://lacinia.readthedocs.io/en/latest/tutorial/component.html) - Walmart Labs Lacinia
* [Integrant](https://github.com/weavejester/integrant)
* [Compojure and Integrant](https://the-frey.github.io/2017/12/14/compojure-and-integrant)
* [Build a Clojure web app using Duct](https://circleci.com/blog/build-a-clojure-web-app-using-duct/) - CircleCI
* [Reloading Woes - Lambda island](https://lambdaisland.com/blog/2018-02-09-reloading-woes)
