# Configure REPL on Startup

A Clojure REPL starts in the `user` namespace and automatically loads common tools to support REPL based development. 

When interacting with the REPL prompt directly, use `require` expressions to include additional functions into the `user` nameapace rather than use potentially complex commands to set the namespace.


??? WARNING "Clojure REPL only starts in user namespace"
    The Clojure REPL only guarantees startup in the `user` namespace. There is no specific mechanism to start the REPL in any other namespace than `user`.

    Clojure CLI could use the general `--eval` flag as a hack to set a different namespace with an `in-ns` expression, although this may affect other tools and add complexity to the startup process.


??? INFO "Default REPL Tools"
    The Clojure REPL automatically loads common tools to support the foundation of a REPL driven workflow:

    [:globe_with_meridians: clojure.repl namespace](https://clojuredocs.org/clojure.repl) loads:

    - [:globe_with_meridians: apropos](https://clojuredocs.org/clojure.repl/apropos) - function names fuzzy matching a given regex pattern
    - [:globe_with_meridians: dir](https://clojuredocs.org/clojure.repl/dir) - sorted list of public vars (functions) in a given namespace
    - [:globe_with_meridians: doc](https://clojuredocs.org/clojure.repl/doc) - doc-string of a give Clojure function / symbol 
    - [:globe_with_meridians: find-doc](https://clojuredocs.org/clojure.repl/find-doc) - doc-string of matching functions, given a string or regex pattern
    - [:globe_with_meridians: source](https://clojuredocs.org/clojure.repl/source) - source code of a given function
    - [:globe_with_meridians: pst](https://clojuredocs.org/clojure.repl/pst) print stack trace, optionally setting depth

    [:globe_with_meridians: clojure.java.javadoc](https://clojuredocs.org/clojure.java.javadoc) loads [:globe_with_meridians: javadoc](https://clojuredocs.org/clojure.java.javadoc/javadoc) to show the doc-string of Java methods

    [:globe_with_meridians: clojure.pprint namepace](https://clojuredocs.org/clojure.pprint) loads [:globe_with_meridians: pp](https://clojuredocs.org/clojure.pprint/pp) & [:globe_with_meridians: pprint](https://clojuredocs.org/clojure.pprint/pprint) to return pretty printed (human friendly format) evaluation results


## Custom user namespace

Add a custom `user` namespace to further enhance the Clojure REPL workflow:

- load code into the REPL by requiring namespaces
- call functions to start services that support development, e.g. logging publisher, print REPL command help menu
- launch development tools - e.g. [portal data inspector](/clojure/data-inspector/portal/#configure-repl-startup)
- start components (i.e for mount, component, integrant)
- hotload libraries into the REPL process without restart (Clojure 1.12 onward)


!!! HINT "Create a project with custom user namespace"
    Projects created with [:fontawesome-solid-book-open: Practicalli Project Templates](/clojure/clojure-cli/projects/templates/practicalli/) contain a `dev/user.clj` file for configuring the REPL at start up.

    Practicalli custom user namespace supports the [:fontawesome-solid-book-open: Practicalli REPL Reloaded workflow](https://practical.li/clojure/clojure-cli/repl-reloaded/)

    Start the REPL with either the `:dev/env`, `:dev/reloaded` or `:repl/reloaded` alias from [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) to include `dev` directory on the class path and automatically load `dev/user.clj` code on REPL startup.


### Define user namespace

A custom `user.clj` is typically placed in a `dev` folder within the root of the project, with the `dev` path defined in an alias to keep it separated from production code.

Create a `dev/user.clj` file with a namespace called `user`.

```clojure title="dev/user.clj"
(ns user)
```

Create an alias to include the `dev` path when running a REPL process

=== ":fontawesome-solid-book-open: Practicalli Clojure CLI Config"
    [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) includes aliases that add `dev` directory to the class path

    * `:dev/env` alias only adds the `dev` directory to the classpath
    * `:dev/reloaded` adds library hotload, namespace reload, porta data inspector and testing libraries & `test`
    * `:repl/reloaded` adds Rebel rich terminal UI to the tools provided by `:dev/reloaded`

=== "Manual"
    Add an alias to the user `deps.edn` configuration, i.e. `$XDG_CONFIG_HOME/clojure/deps.edn` or `$HOME/.clojure/deps.edn`

    ```clojure title="Clojure User Config"
     :env/dev
      {:extra-paths ["dev"]}
    ```
    Review [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) for further alias examples.
 

Run a Clojure REPL with the `:repl/reloaded` alias (or `:dev/reloaded` `:dev/env`)  to add the `dev` directory to the class path and load the code in `dev/user.clj` file into the REPL.

```bash
clojure -M:repl/reloaded
```

!!! HINT "Keep `user.clj` separate"
    The `user.clj` code should not be included in live deployments, such as a jar or uberjar.  Including the `dev/` directory via an alias separates the `user.clj` from deployment actions.


### Requiring namespaces

Namespaces required in the `user` ns form will also be loaded. If a required namespace also requires namespaces, they will also be loaded into the REPL during startup.

Functions `(defn)` and data `(def)` are immediately available.

!!! EXAMPLE "Require namespace in user ns expression"
    Add a require expression to the namespace definition in `dev/user.clj`
    ```clojure title="dev/user.clj"
    (ns user
      (:require [practicalli.project-namespace]))
    ```

??? WARNING "Requiring a large number of libraries may slow REPL start up time"

!!! EXAMPLE "Require namespace in require expression"
    If the library is not always required, place a `require` within a `(comment ,,,)` expression to be evaluated by the developer any time after REPL startup.
    ```clojure title="dev/user.clj"
    (ns user)

    (comment
      (require '[practicalli.project-namespace])
    #_())
    ```

### Calling functions

Use the fully qualified function name from the required namespace can be called, to start the application for example.

!!! EXAMPLE
    ```clojure title="dev/user.clj"
    (ns user
      (:require [practicalli.project-namespace]))

    (practicalli.project-namespace/-main)
    ```

An alias can be used in the require expression, useful if multiple functions from a namespace are to be called

!!! EXAMPLE
    ```clojure title="dev/user.clj"
    (ns user
      (:require [practicalli.service :as service]))

    (service/-main)
    ```

### REPL Help menu

Printing a menu of functions provided by the custom user namespace helps with the usability of a project.

Define a `help` function that prints out commands with a breif explination of their purpose.

Add a `(help)` expression to call the help function on REPL startup, displaying the help menu. 

!!! EXAMPLE "REPL Help menu"
    ```clojure
    ;; ---------------------------------------------------------
    ;; Help

    (println "---------------------------------------------------------")
    (println "Loading custom user namespace tools...")
    (println "---------------------------------------------------------")

    (defn help
      []
      (println "---------------------------------------------------------")
      (println "System components:")
      (println "(start)                        ; starts all components in system config")
      (println "(restart)                      ; read system config, reloads changed namespaces & restarts system")
      (println "(stop)                         ; shutdown all components in the system")
      ;; (println "(system)                       ; show configuration of the running system")
      ;; (println "(config)                       ; show system configuration")
      (println)
      (println "Hotload libraries:             ; Clojure 1.12.x")
      (println "(add-lib 'library-name)")
      (println "(add-libs '{domain/library-name {:mvn/version \"v1.2.3\"}})")
      (println "(sync-deps)                    ; load dependencies from deps.edn")
      (println "- deps-* lsp snippets for adding library")
      (println)
      (println)
      (println "Portal Inspector:")
      (println "- portal started by default, listening to all evaluations")
      (println "(inspect/clear)                ; clear all values in portal")
      (println "(remove-tap #'inspect/submit)  ; stop sending to portal")
      (println "(inspect/close)                ; close portal")
      (println)
      (println "(help)                         ; print help text")
      (println "---------------------------------------------------------"))

    (help)

    ;; End of Help
    ;; ---------------------------------------------------------
    ```

### Log publisher

mulog is a very effective event log tool that also provides a range of log publishers.  A custom user namespace can be used to start mulog log publishers to directly support the development workflow

- pretty print console output for easier to read event messages
- custom tap-publisher to send all log message to a `tap>` source, e.g. [Portal data inspector](https://practical.li/clojure/data-inspector/portal/)


!!! EXAMPLE "Mulog configuration and publishers"
    Require the mulog namespaces.

    Set the global context for all mulog events, setting common key/value pairs that appear in every event created after the global context was evaluated.

    Define a custom publisher to send all mulog events to the registered tap> sources, e.g. Portal data inspector.

    ```clojure title="dev/mulog_events.clj"
    ;; ---------------------------------------------------------
    ;; Mulog Global Context and Custom Publisher
    ;;
    ;; - set event log global context
    ;; - tap publisher for use with Portal and other tap sources
    ;; - publish all mulog events to Portal tap source
    ;; ---------------------------------------------------------

    (ns mulog-events
      (:require
       [com.brunobonacci.mulog        :as mulog]
       [com.brunobonacci.mulog.buffer :as mulog-buffer]))

    ;; ---------------------------------------------------------
    ;; Set event global context
    ;; - information added to every event for REPL workflow
    (mulog/set-global-context! {:app-name "todo-basic Service",
                                :version "0.1.0", :env "dev"})
    ;; ---------------------------------------------------------

    ;; ---------------------------------------------------------
    ;; Mulog event publishing

    (deftype TapPublisher
             [buffer transform]
      com.brunobonacci.mulog.publisher.PPublisher
      (agent-buffer [_] buffer)
      (publish-delay [_] 200)
      (publish [_ buffer]
        (doseq [item (transform (map second (mulog-buffer/items buffer)))]
          (tap> item))
        (mulog-buffer/clear buffer)))

    #_{:clj-kondo/ignore [:unused-private-var]}
    (defn ^:private tap-events
      [{:keys [transform] :as _config}]
      (TapPublisher. (mulog-buffer/agent-buffer 10000) (or transform identity)))

    (def tap-publisher
      "Start mulog custom tap publisher to send all events to Portal
      and other tap sources
      `mulog-tap-publisher` to stop publisher"
      (mulog/start-publisher!
       {:type :custom, :fqn-function "mulog-events/tap-events"}))

    #_{:clj-kondo/ignore [:unused-public-var]}
    (defn stop
      "Stop mulog tap publisher to ensure multiple publishers are not started
     Recommended before using `(restart)` or evaluating the `user` namespace"
      []
      tap-publisher)

    ;; Example mulog event message
    ;; (mulog/log ::dev-user-ns :message "Example event message" :ns (ns-publics *ns*))
    ;; ---------------------------------------------------------
    ```


### Reload Namespaces

The REPL state can become 'stale' and contain vars (data and function names) that are no longer part of the source code, especially after a code refactor.

Rather than restart the repl, clojure.tools.namespace.repl provides functions that can clean the REPL state and reload changed namespaces from source code.


!!! EXAMPLE "Clojure Namespace Tools - reload"
    Require the `clojure.tools.namespace.repl` namespace to access the `refresh` and `set-refresh-dirs` functions to support reloading of source code into a clean REPL state.

    ```clojure title="dev/user.clj"
    (ns user
      "Tools for REPL Driven Development"
      (:require
       [clojure.tools.namespace.repl :refer [set-refresh-dirs]]))
    ```

    Use the `set-refresh-dirs` function to define directories to reload when calling `refresh`, effectively excluding `dev` and other directories by not including their names as arguments.

    ```clojure title="dev/user.clj"
    ;; ---------------------------------------------------------
    ;; Avoid reloading `dev` code
    ;; - code in `dev` directory should be evaluated if changed to reload into repl
    (println
     "Set REPL refresh directories to "
     (set-refresh-dirs "src" "resources"))
    ;; ---------------------------------------------------------

    ```


### Hotload libraries

[Hotload](/clojure/clojure-cli/repl-reloaded/) is a way to add libraries to a running REPL process which were not include as a dependency during REPL startup.

??? WARNING "Hotload libraries is SNAPSHOT feature - this guide will change when Clojure 1.12 is released"
    Functions to hotload libraries are part of the Clojure 1.12 development releases and an official feature as of the stable 1.12 release.

    For Clojure 1.11 and similar functions are available in the [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3) of the now deprecated `clojure.tools.deps.alpha` library.  

    [clojure/tools.deps](https://github.com/clojure/tools.deps) is the official library for all released functions from the alpha library

    This guide will be significantly rewritten once Clojure 1.12 is released.


=== ":fontawesome-solid-book-open: Practicalli Clojure CLI Config"
    `:repl/reloaded`  and `dev/reloaded` aliases in [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/repl-reloaded/) provide the `add-libs` function.

=== "Manual"
    Edit the project `deps.edn` configuration and add an `:lib/hotload` alias for the `clojure.tools.deps.alpha.repl` library.  Or add an alias to the user level configuration for use with any Clojure CLI project.

    The `add-libs` code is on a separate [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3), so requires the SHA from the head of add-libs3 branch

    ```clojure
      :lib/hotload
      {:extra-deps {org.clojure/tools.deps.alpha
                   {:git/url "https://github.com/clojure/tools.deps.alpha"
                    :git/sha "e4fb92eef724fa39e29b39cc2b1a850567d490dd"}}}
    ```

    > Alias example from [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-deps-edn/)

Start a REPL session using Clojure CLI with `:repl/reloaded`, `dev/reloaded` or `:lib/hotload` aliases

```bash
clojure -M:repl/reloaded
```

!!! EXAMPLE "Require and refer add-libs function"
    Require the `clojure.tools.deps.alpha` library and refer the `add-libs` function.  The `add-libs` function can then be called without having to use an alias or the fully qualified name.
    ```clojure
    (require '[clojure.tools.deps.alpha.repl :refer [add-libs]])
    ```

Hotload one or more libraries into the REPL using the `add-lib` function, including the fully qualified name of the library and version string.

!!! EXAMPLE "Hotload the hiccup library"
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

### System Components

Clojure has several library to manage the life-cycle of components that make up the Clojure system, especially those components with state. The order in which components are started and stopped can be defined to keep the system functioning correctly.

Components can include an http server, routing, persistence, logging publisher, etc.

Example system component management libraries included

* [mount](https://github.com/tolitius/mount) - manage system state in an atom
* [integrant](https://github.com/weavejester/integrant) and [Integrant REPL](https://practical.li/clojure-web-services/service-repl-workflow/integrant-repl/#aero-and-integrant) - data definition of system and init & halt defmethod interface
* [donut system](https://github.com/donut-party/system)
* [component](https://github.com/stuartsierra/component)

!!! EXAMPLE "Require system namespace in user ns expression"
    Require the system namespace and use `start`, `restart` and `stop` functions to manage the components in the system
    ```clojure title="dev/user.clj"
    (ns user
      (:require [system]))

    (comment
      (system/start)
      (system/restart)
      (system/stop)
      )
    ```

Define code in the `dev/system.clj` file which controls the component life-cycle services library for the project.

Create a `dev/system.clj` to manage the components, optionally using one of the system component management libraries.

#### life-cycle functions

Start, stop and restart the components that a system is composed of, e.g. app server, database pool, log publisher, message queue, etc.


=== "Atom restart"
    Clojure web services run ontop of an HTTP server, e.g. http-kit, Jetty.

    A Clojure aton can be used to hold a reference to the HTTP server, allowing commands to stop that server.

    Use `clojure.tools.namespace.repl/refresh` when restarting the server (in between `stop` and `start`) to remove stale information in the REPL state.

    !!! EXAMPLE "Restart an HTTP server for Clojure Web Service & Refresh namespaces"
        ```clojure title="dev/system_repl.clj"
        ;; ---------------------------------------------------------
        ;; System REPL - Atom Restart 
        ;;
        ;; Tools for REPl workflow with Aton reference to HTTP server 
        ;; https://practical.li/clojure-web-services/app-servers/simple-restart/
        ;; ---------------------------------------------------------

        (ns system-repl
          (:require 
            [clojure.tools.namespace.repl :refer [refresh]]
            [practicalli.todo-basic.service :as service]))
                    
        ;; ---------------------------------------------------------
        ;; HTTP Server State

        (defonce http-server-instance 
          (atom nil))  ; (1)! 
        ;; ---------------------------------------------------------

        ;; ---------------------------------------------------------
        ;; REPL workflow commands

        (defn stop
          "Gracefully shutdown the server, waiting 100ms.
           Check if an http server isntance exists and 
           send a `:timeout` key and time in milliseconds to shutdown the server.
           Reset the atom to nil to indicate no http server is running."
          []
          (when-not (nil? @http-server-instance)
            (@http-server-instance :timeout 100) ; (2)!
            (reset! http-server-instance nil)  ; (3)!
            (println "INFO: HTTP server shutting down...")))

        (defn start
          "Start the application server and run the application,
           saving a reference to the https server in the atom."
          [& port]
          (let [port (Integer/parseInt
                      (or (first port)
                          (System/getenv "PORT")
                          "8080"))]
            (println "INFO: Starting server on port:" port)

            (reset! http-server-instance
                    (service/http-server-start port)))) ; (4)!


        (defn restart
          "Stop the http server, refresh changed namespace and start the http server again"
          []
          (stop)
          (refresh)  ; (5)! 
          (start))
        ;; ---------------------------------------------------------

        ```

        1.  A Clojure Aton holds a reference to the http server instance

        2.  Shut down http server instance without stopping the Clojure REPL

        3.  Reset the value in the atom to mil, indicating that no http server instance is running

        4.  Reset the value in the atom to a reference for the running http server.  The reference is returned when starting the http server.

        5.  Refresh the REPL state and reload changed namespaces from source code using `clojure.tools.namespace.repl/refresh`


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

    [:fontawesome-brands-github: Example dev.clj file for mount](https://github.com/tolitius/mount/blob/master/dev/clj/dev.clj){target=_blank .md-button}

    !!! Hint "Use `dev` namespace during development"
        Require `practicalli.app.dev` namespace rather than main, to start components in a development environment.

=== "Integrant REPL"
    [:fontawesome-solid-book-open: Integrant REPL - Practicalli Clojure Web Services](https://practical.li/clojure-web-services/service-repl-workflow/integrant-repl/#aero-and-integrant){target=_blank .md-button}

    [User manager - Integrant](https://github.com/prestancedesign/usermanager-reitit-example){target=_blank .md-button}

=== "Donut System"
    [donut.system](https://github.com/donut-party/system) is a dependency injection library for Clojure and ClojureScript using system and component abstractions to organise and manage startup & shutdown behaviour.

    [Basic usage guide](https://github.com/donut-party/system#basic-usage) shows how to define a donut.system

    <p style="text-align:center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/PMat9Wdt-pk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </p>

=== "Component"
    [seancorfield/usermanager-example](https://github.com/seancorfield/usermanager-example) is an example project that uses Component for lifecycle management

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
