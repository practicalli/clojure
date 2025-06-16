# Practicalli REPL Reloaded Workflow

An effective REPL workflow is central to Clojure development. Practicalli REPL Reloaded workflow provides a rich set of tools and minimises the need to restart the REPL

- [custom REPL startup](/clojure/clojure-cli/repl-startup/) using `dev/user.clj`
- [continually run unit tests](#unit-test-runner) with Kaocha
- [event log and publisher](https://github.com/BrunoBonacci/mulog){target'_blank} with mulog
- [:fontawesome-solid-book-open: visualise & navigate evaluation data and logs](/clojure/data-inspector/portal/){target'_blank} with Portal
- [hotload libraries without restarting the REPL](#hotload-libraries) with `clojure.repl.deps` (Clojure 1.12)
- [reload changed namespaces to manage large code refactor](#reload-namespaces){target'_blank} with `tools.namespace`
- [performance testing code expressions](#performance-tests) with time & Criterium


![Practicalli REPL Reloaded text](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/REPL-Reloaded-matrix-text.png){loading=lazy}


## Start the REPL

Start a Clojure REPL with the `:repl/reloaded` alias (or include `:dev/reloaded` alias in an Editor jack-in command or other REPL startup command).

Aliases are defined in [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/)

Start a rich terminal UI repl and the REPL Reloaded tools

!!! NOTE ""
    ```shell
    clojure -M:repl/reloaded
    ```

A [:fontawesome-solid-book-open: Rebel rich terminal UI REPL prompt](/clojure/clojure-cli/repl/) provides direct evaluation in the REPL (with autocomplete, documentation, signature hints and multi-line editing)

An nREPL server is started to allow connections from a range of Clojure editors.

Portal Inspector window opens and is connected to all evaluation results and Mulog events that occur.


[:fontawesome-solid-book-open: Rebel REPL Teminal UI](/clojure/clojure-cli/repl/){target=_blank .md-button}


??? EXAMPLE "Example Alias Definitions"
    Start a REPL process with an nREPL server to connect Clojure editors. Providing a Rebel rich terminal UI with tools to hotload libraries, reload namespaces and run Portal data inspector.  The alias also includes a path for custom REPL startup and a path to access unit test code, along with a test runner.
    ```clojure
    :repl/reloaded
    {:extra-paths ["dev" "test"]
     :extra-deps {nrepl/nrepl                  {:mvn/version "1.0.0"}
                  cider/cider-nrepl            {:mvn/version "0.30.0"}
                  com.bhauman/rebel-readline   {:mvn/version "0.1.4"}
                  djblue/portal                {:mvn/version "0.35.1"}
                  org.clojure/tools.namespace  {:mvn/version "1.4.1"}
                  org.slf4j/slf4j-nop          {:mvn/version "2.0.6"}
                  com.brunobonacci/mulog       {:mvn/version "0.9.0"}
                  lambdaisland/kaocha          {:mvn/version "1.77.1236"}
                  org.clojure/test.check       {:mvn/version "1.1.1"}
                  ring/ring-mock               {:mvn/version "0.4.0"}
                  criterium/criterium          {:mvn/version "0.4.6"}}
     :main-opts  ["-m" "nrepl.cmdline"
                  "--middleware" "[cider.nrepl/cider-middleware,portal.nrepl/wrap-portal]"
                  "--interactive"
                  "-f" "rebel-readline.main/-main"]}

    :dev/reloaded
    {:extra-paths ["dev" "test"]
     :extra-deps  {djblue/portal                {:mvn/version "0.35.1"}
                   org.clojure/tools.namespace  {:mvn/version "1.4.1"}
                   org.slf4j/slf4j-nop          {:mvn/version "2.0.6"}
                   com.brunobonacci/mulog       {:mvn/version "0.9.0"}
                   lambdaisland/kaocha          {:mvn/version "1.77.1236"}
                   org.clojure/test.check       {:mvn/version "1.1.1"}
                   ring/ring-mock               {:mvn/version "0.4.0"}
                   criterium/criterium          {:mvn/version "0.4.6"}}}
    ```

    Include the `:dev/reloaded` or `:lib/hotload` aliases when starting the REPL with other aliases, using any of the available Clojure CLI execution options (`-A`,`-M`,`-X`,`-T`).

    Alias example from [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-cli-config/)


??? EXAMPLE "Clojure 1.11 Hotload Support"
    To support Clojure 1.11.x, add an `:lib/hotload` alias for the `clojure.tools.deps.alpha.repl` library using the latest SHA commit from the [:fontawesome-brands-github: add-libs3 branch of `clojure.tools.deps.alpha` library](https://github.com/clojure/tools.deps.alpha/tree/add-lib3) as an extra dependency.

    The `add-libs` code is on a separate , so requires the SHA from the head of add-libs3 branch

    ```clojure
      :lib/hotload
      {:extra-deps {org.clojure/tools.deps.alpha
                   {:git/url "https://github.com/clojure/tools.deps.alpha"
                    :git/sha "e4fb92eef724fa39e29b39cc2b1a850567d490dd"}}}
    ```
    Include the `:dev/reloaded` or `:lib/hotload` aliases when starting the REPL with other aliases, using any of the available Clojure CLI execution options (`-A`,`-M`,`-X`,`-T`).

    Alias example from [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-cli-config/)


## Custom REPL startup

A Clojure REPL starts in the `user` namespace. When a `user.clj` file is on the classpath its code is loaded (evaluated) into the REPL during startup.

Create a `dev/user.clj` file with libraries and tools to support development and add the `dev` directory to the classpath.

[Create a custom REPL Startup with dev/user.clj](/clojure/clojure-cli/repl-startup/){target=_blank .md-button}


## Reload namespaces

As code and design evolves, expressions evaluated in the REPL may become stale especially when the names (symbols, vars) bound to function definitions are renamed or deleted from the source code.  Rather than restart the REPL process and loose all the state, one or more namespaces can be refreshed.

??? HINT "Remove function definitions before renaming"
    To minimise the need to reload namespaces, undefine function definitions (unbind their name to the function) before changing the names of the function.

    Remove a symbol from the namespace, using `*ns*` which is dynamically bound to the current namespace
    ```clojure
    (ns-unmap *ns* 'function-or-def-name)
    ```
    Remove a specific namespace (any functions defined in the namespace are no longer accessible - illegalStateException - Attempting to call unbound function)
    ```clojure
    (remove-ns 'practicalli.service.utils)
    ```
    Remove an alias for a specific namespace
    ```clojure
    (ns-unalias 'practicalli.service.utils 'utils)
    ```

    Clojure editors may provide commands to undefine a function definition, e.g. Emacs CIDER includes `cider-undef` to remove the current symbol via nREPL commands

[clojure.tools.namespace.repl](https://clojure.github.io/tools.namespace/#clojure.tools.namespace.repl) contains the `refresh` function that compares source code files with the definitions in the REPL, removing and re-evaluating those namespaces containing changes.

refresh will manage loading of namespaces with respect to their dependencies, ensuring each namespace can be loaded without error.

Require the clojure.tools.namespace.repl refresh function

=== "REPL"
    !!! NOTE ""
        ```clojure
        (require '[clojure.tools.namespace.repl :refer [refresh]])
        ```

=== "Project"
    Use an ns form for the namespace (often added to a custom `user` namespace)
    !!! NOTE ""
        ```clojure
        (ns user
          (:require [clojure.tools.namespace.repl :refer [refresh]]))
        ```

    Or in a rich comment expression
    !!! NOTE ""
        ```clojure
        (comment
          (require '[clojure.tools.namespace.repl :refer [refresh]]))
        ```

Refresh the namespaces that have saved changes
!!! NOTE ""
    ```clojure
    (refresh)
    ```

A list of refreshed namespaces are printed.  If there are errors in the Clojure code, then a namespace cannot be loaded and error messages are printed. Check the individual code expressions in the namespace to ensure they are correctly formed.

[Reload namespaces with dev/user.clj](/clojure/clojure-cli/repl-startup/){target=_blank .md-button}

??? HINT "Handling Errors"
    If an exception is thrown while loading a namespace, refresh stops and prints the namespace that caused the exception. (clojure.repl/pst) prints the rest of the stack trace

    `*e` is bound to the exeception so will print the exeception when evaluated


??? INFO "tools.namespace refactor - documentation can be misleading"
    `refresh` and other functions were moved to the `clojure.tools.namespace.repl` namespace. The original `clojure.tools.namespace` functions are deprecated, although the new `clojure.tools.namespace.repl` namespace is not deprecated.

[Clojure tools.namespace API reference](https://clojure.github.io/tools.namespace/){target=_blank .md-button}
[Namespaces Reference - Clojure.org](https://clojure.org/reference/namespaces){target=_blank .md-button}

## Hotload Libraries

![Hotload libraries into a Clojure REPL](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries.png)

`clojure.repl.deps` provides functions to hotload libraries into a running REPL, avoiding the need to restart the REPL and loose state just to use a new library with the project.

- `add-lib` finds a library by name and adds it to the REPL
- `add-libs` takes a hash-map of one or more library name and version key/value pairs and adds them to the REPL
- `sync-deps` reads the project `deps.edn` file and adds `:deps` dependencies to the REPL that are not already loaded

Hotload functions are typically called from a rich comment block in [a separate `dev/user.clj` file](/clojure/clojure-cli/repl-startup/) to avoid being automatically loaded.

Once hot-loaded, a library namespace can be required as if the dependency had been added to the project configuration before the REPL started.

[practicalli/clojure-webapp-hotload-libraries](https://github.com/practicalli/clojure-webapp-hotload-libraries) is an example project that uses REPL driven development and hot loading of libraries to build a very simple web server using http-kit and hiccup.

??? WARNING "Hotload requires Clojure 1.12 & latest Clojure CLI"
    Install the latest Clojure CLI version and use Clojure 1.12 onward to use the officially released hotload library.

    `add-libs` is an unofficial feature for Clojure 1.11.x and available only in the [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3) of the now deprecated `clojure.tools.deps.alpha` library.


??? EXAMPLE "Hotload simple web server and build a page"
    ```clojure
    (comment
      ;; Require if not automatically loaded by the REPL tooling, ie. Rebel Readline
      #_(require '[clojure..deps.repl :refer [add-lib add-libs sync-deps]])

      ;; hotload the libraries required for the server
      (add-libs '{http-kit/http-kit {:mvn/version "2.5.1"}})

      (require '[org.httpkit.server :as app-server])

      ;; Discover which http-kit functions are available
      (ns-publics (find-ns 'org.httpkit.server))

      ;; Define an entry point for the application
      (defn welcome-page
        [request]
        {:status  200
         :body    "Welcome to the world of Clojure CLI hotloading"
         :headers {}})

      ;; Start the application server
      (app-server/run-server #'welcome-page {:port (or (System/getenv "PORT") 8888)})

      ;; Visit http://localhost:8888/ to see the welcome-page

      ;; Hotload Hiccup to generate html for the welcome page
      (add-libs '{hiccup/hiccup {:mvn/version "2.0.0-alpha2"}})

      (require '[hiccup.core :as hiccup])
      (require '[hiccup.page :as hiccup-page])

      (defn page-template [content]
        (hiccup-page/html5
          {:lang "en"}
          [:head (hiccup-page/include-css "https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css")]
          [:body
           [:section {:class "hero is-info"}
            [:div {:class "hero-body"}
             [:div {:class "container"}
              [:h1 {:class "title"} (:title content) ]
              [:p {:class "subtitle"} (:sub-title content)]]]]]))

      ;; Check the page template returns HTML
      (page-template {:title     "Hotload Libraries in the REPL"
                      :sub-title "REPL driven development enables experimentation with designs"})


      ;; redefine the welcome page to call the page template
      (defn welcome-page
        [request]
        {:status  200
         :body    (page-template {:title     "Hotload Libraries in the REPL"
                                  :sub-title "REPL driven development enables experimentation with designs"})
         :headers {}})

      ) ; End of rich comment block
    ```


There are several approaches to hotload libraries, including via a terminal REPL UI or in a project with a Clojure editor:

- [Rich terminal UI REPL](/clojure/clojure-cli/repl/libraries/#hotload-libraries)
- [Hotload in a Project](/clojure/clojure-cli/projects/hotload-in-project/)

## Unit test runner

Unit tests are written with `clojure.test` and reside in a parallel `test` directory, creating matching `_test.clj` files for each relevant clojure file under `src`.

Test runners are highly configurable and can run a very specific set of tests, although Clojure is usually fast enough to run all the tests each time.

Run the tests in a project with the kaocha test runner by issuing the following command in the root of the project.

```shell
clojure -X:test/run
```

Or continually watch for changes and run kaocha test runner each time a file is saved (typically in a separate terminal)


```shell
clojure -X:test/watch
```

Test run will stop on the first failed test unless `:fail-fast? false` is passed as an argument to either command.

??? HINT "Running Unit Tests in an Editor"
    Emacs and Neovim can run the kaocha test runner if one of the `:repl/reloaded`, `:dev/reloaded` or `:lib/kaocha` aliases are used to start the Clojure REPL.

    Emacs, Neovim and VS Code Calva also have their own built-in test runners. Test and source code must be evaluated in the REPL for the editor test runners to discover this code.  Editor test runners to not read code from the Clojure files in `src` or `test` directories.


[Writing Unit Tests for Clojure](/clojure/testing/unit-testing/){target=_blank .md-button}
[Using Test Runners with Projects](/clojure/testing/test-runners/){target=_blank .md-button}


## Performance tests

`time` is a quick way to see if an expression is worth further performance investigation.

`(time ,,,)` wrapped around an expression will print the duration that expression took to run.  This provides a very rough indicator of the performance of code, although as it only runs once then results may vary and are easily affected by the environment (Java Virtual Machine, Operating System, other concurrent processes).

[Criterium](http://hugoduncan.org/criterium/){target=_blank} provides more realistic performance results which are less affected by the environment, providing a better indication of performance to inform design choices.

Criterium tools take a little longer to run in order to return more accurate and consistent performance results.


=== "REPL"
    Require the criterium library
    ```clojure
    (require '[criterium.core :as benchmark])
    ```

=== "Project"
    Require the criterium library via the ns expression

    ```clojure
    (ns user
      (:require [criterium.core :as benchmark]))
    ```
    Or require the criterium library in a rich comment expression
    ```clojure
    (comment
      (require '[criterium.core :as benchmark]))
    ```

Wrap the `quick-bench` function around the expression to run performance testing upon

```clojure
(benchmark/quick-bench ,,,)
```

The expression being tested will be called multiple times and the duration and average times will be printed.

Criterium automatically adjusts the benchmark run time according to the execution time of the measured expression. If the expression is fast, Criterium will run it plenty of times, but if a single iteration is quite slow, it will be executed fewer times


!!! HINT "Use quick-bench rather than bench"
    The bench macro is claimed to be more accurate than quick-bench, but in practice, it runs for much longer and doesn't yield significantly different results in most cases

[Criterium API Documentation](http://hugoduncan.org/criterium/){target=_blank .md-button}
[Benchmark with Criterium article](http://clojure-goes-fast.com/blog/benchmarking-tool-criterium/){target=_blank .md-button}


## Log and publish events

mulog is a micro-logging library that logs events and data extremely fast and provides a range of publishers for log analysis.

Use the mulog `log` function to create events to capture useful information about the Clojure system operation.  Publish the logs locally to a console or to a log analysis service such as [zipkin](https://zipkin.io/){target=_blank} or [Grafana](https://grafana.com/logs/)

=== "REPL"
    Require the mulog library
    ```clojure
    (require '[com.brunobonacci.mulog :as mulog])
    ```

=== "Project"
    Require the mulog library via the namespace form
    ```clojure
    (ns your-ns
      (:require [com.brunobonacci.mulog :as mulog]))
    ```

Optionally create an event global context, containing information that will be included in every event created

```clojure
(mulog/set-global-context! {:service-name "Practicalli GameBoard", :version "1.0.1", :env "dev"})
```

Create events with an identity that contains key/value pairs of data that captures the desired information about the event.

```clojure
(mulog/log ::system-started :version "0.1.0" :init-time 32)
```

Start a publisher to see all the events created.  The publisher can be to the console or to log analysis tools like [zipkin](https://zipkin.io/){target=_blank} or [Grafana](https://grafana.com/logs/)

```clojure
(mulog/start-publisher! {:type :console})
```

`trace` provides accurate data around instrumented operations of a single system or over a distributed system. trace data can be used in Elasticsearch and real-time streaming system sudh as Apache Kafka.

trace will track the rate of a complex operation, including the outcome and latency, within the contextual information of that operation.


Consider a function that calls several external services
!!! NOTE ""
    ```clojure
    (defn product-status [product-id]
      (let [stock (http/get availability-service {:product-id product-id})
            pricing (http/get pricing-service {:product-id product-id})]))
    ```

Create a trace between the function calls
!!! NOTE ""
    ```clojure
    (mulog/trace ::product-status
      [:product-id product-id]
      (product-status product-id))
    ```

`trace` starts a timer then calls `(product-status product-id)`. Once the execution completes a log an event is created using `log` and uses the global context. By including the product id in the trace call, information is captured about the specific product involved in the trace log.

```clojure
;; {:mulog/event-name :practicalli.service/products,
;;  :mulog/timestamp 1587504242983,
;;  :mulog/trace-id #mulog/flake "4VTF9QBbnef57vxVy-b4uKzh7dG7r7y4",
;;  :mulog/root-trace #mulog/flake "4VTF9QBbnef57vxVy-b4uKzh7dG7r7y4",
;;  :mulog/duration 254402837,
;;  :mulog/namespace "practicalli.service",
;;  :mulog/outcome :ok,
;;  :app-name "Practicalli GameBoard",
;;  :env "dev",
;;  :version "1.0.1"}
```

## Trace function calls

[clojure.tools.trace](https://github.com/clojure/tools.trace) can trace values, functions and a whole namespace of functions.

Tracing a value will show how that value flows through the code

Tracing a function shows the arguments passed to the function each time it is called and the results.  Tracing will identify forms that are failing and also show the results of the function call, helping spotting unwanted `nil` arguments and parts of a function definition that is failing.

- `trace` values, optionally assigning a tag
- `trace-vars` dynamically trace a given fully qualified function
- `untrace-vars` - remove trace from a given fully qualified function
- `trace-ns` dynamically trace all functions in the given namespace
- `untrace-ns` remove trace from all functions in the given namespace

`:repl/reloaded` and `:dev/reloaded` include the clojure.tools.trace dependency, i.e. `org.clojure/tools.trace {:mvn/version "0.7.11"}`

[tools.trace API Reference](http://clojure.github.io/tools.trace/)

=== "REPL"
    Require the `clojure.tools.trace` library and refer the `trace` and `untrace` functions
    ```clojure
    (require '[clojure.tools.trace :as trace])
    ```

=== "Project"
    Require the `clojure.tools.trace` library using the alias `trace`

    ```clojure
    (ns user
      (:require '[clojure.tools.trace :as trace]))
    ```

To trace a value returned from an expression, optionally adding a tag

```clojure
(trace/trace  "increments" (map inc [1 2 3 4 5]))
;;=> TRACE increments: (2 3 4 5 6)
;;=> (2 3 4 5 6)
```

Trace a function call and its return value

```clojure
(deftrace random-function [namespace] (rand-nth (vals (ns-publics namespace))))
```

Call the function to see the output of trace

```clojure
(random-function 'clojure.core)
;;=> TRACE t1002: (random-function 'clojure.core)
;;=> TRACE t1002: => #'clojure.core/iteration
;;=> #'clojure.core/iteration
```

Trace functions can identify which form is failing

```clojure
(trace/trace-vars practicalli.random-function/random-number)
;;=> #'practicalli.random-function/random-number
```

Call the function that is being traced and see the error

```clojure
(practicalli.random-function/random-number 42)
;;=> TRACE t10951: (practicalli.random-function/random-number 42)
;;=> Execution error (ArithmeticException) at practicalli.random-function/random-number (random_function.clj:17).
;;=> Divide by zero
```

Dynamically trace all functions in the given name space

```clojure
(trace-ns domain.namespace)
```

Or remove all function traces in a namespace

```clojure
(untrace-ns domain.namespace)
```

Dynamically trace a given function

```clojure
(trace-vars domain.namespace/function-name)
 ```

Remove the trace on a given function

```clojure
(untrace-vars domain.namespace/function-name)
```
