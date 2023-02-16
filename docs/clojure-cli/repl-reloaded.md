The REPL is central to Clojure development and Practicalli REPL Reloaded enhances the experience further

- avoid restarting the REPL
- visualise and inspect data from evaluated functions
- run unit and performance tests to support design choices

Start a Clojure REPL with the `:repl/reloaded` alias (or include `:dev/reloaded` alias in an Editor jack-in command or other REPL startup command)

```shell
clojure -M:repl/reloaded
```

This command runs a Clojure REPL process and nREPL server which allows Clojure editors connect to the REPL process. A [Rebel rich terminal UI REPL prompt](/clojure/clojure-cli/repl/) is provides for direct evaluation in the REPL (with autocomplete, documentation, signature hints and multi-line editing)

Other features include:

* `dev` directory for a [custom REPL startup](/clojure/clojure-cli/repl-startup/)
* `add-libs` hotload libraries without restarting the REPL (alpha software)
* [`tools.namespace`](https://github.com/clojure/tools.namespace){target'_blank} to reload changed namespaces
* [portal](/clojure/data-inspector/portal/){target'_blank} to visualise & inspect data
* `test` directory, test libraries & kaocha test runner
* benchmark code with criterium
* [mulog](https://github.com/BrunoBonacci/mulog){target'_blank} log and trace events

??? EXAMPLE "Alias Definitions"
    Start a REPL process with an nREPL server to connect Clojure editors. Providing a Rebel rich terminal UI with tools to hotload libraries, reload namespaces and run Portal data inspector.  The alias also includes a path for custom REPL startup and a path to access unit test code, along with a test runner.
    ```clojure
    :repl/reloaded
    {:extra-paths ["dev" "test"]
     :extra-deps {nrepl/nrepl                {:mvn/version "1.0.0"}
                  cider/cider-nrepl          {:mvn/version "0.28.7"}
                  com.bhauman/rebel-readline {:mvn/version "0.1.4"}
                  djblue/portal {:mvn/version "0.34.2"}
                  org.clojure/tools.namespace {:mvn/version "1.3.0"}
                  org.clojure/tools.deps.alpha {:git/url "https://github.com/clojure/tools.deps.alpha"
                                                :git/sha "e4fb92eef724fa39e29b39cc2b1a850567d490dd"}
                  org.slf4j/slf4j-nop {:mvn/version "2.0.5"}
                  com.brunobonacci/mulog {:mvn/version "0.9.0"}
                  lambdaisland/kaocha {:mvn/version "1.71.1119"}
                  org.clojure/test.check {:mvn/version "1.1.1"}
                  ring/ring-mock         {:mvn/version "0.4.0"}
                  criterium/criterium    {:mvn/version "0.4.6"}}
     :main-opts  ["-m" "nrepl.cmdline"
                  "--middleware" "[cider.nrepl/cider-middleware]"
                  "--interactive"
                  "-f" "rebel-readline.main/-main"]}

    :dev/reloaded
    {:extra-paths ["dev" "test"]
     :extra-deps  {djblue/portal {:mvn/version "0.34.2"}
                   org.clojure/tools.namespace {:mvn/version "1.3.0"}
                   org.clojure/tools.deps.alpha {:git/url "https://github.com/clojure/tools.deps.alpha"
                                                 :git/sha "e4fb92eef724fa39e29b39cc2b1a850567d490dd"}
                   org.slf4j/slf4j-nop {:mvn/version "2.0.5"}
                   com.brunobonacci/mulog {:mvn/version "0.9.0"}
                   lambdaisland/kaocha {:mvn/version "1.71.1119"}
                   org.clojure/test.check {:mvn/version "1.1.1"}
                   ring/ring-mock         {:mvn/version "0.4.0"}}}
    ```

    `org.slf4j/slf4j-nop` is only included to surpress warnings about a missing SLF4J implementation.  If an actual SLF4J library is used then this library dependency should be removed.


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
    ```clojure
    (require '[clojure.tools.namespace.repl :refer [refresh]])
    ```

=== "Project"
    Use an ns form for the namespace (often added to a custom `user` namespace)
    ```clojure
    (ns user
      (:require [clojure.tools.namespace.repl :refer [refresh]]))
    ```
    Or in a rich comment expression
    ```clojure
    (comment
      (require '[clojure.tools.namespace.repl :refer [refresh]]))
    ```

Refresh the namespaces that have saved changes

```clojure
(refresh)
```

A list of refreshed namespaces are printed.  If there are errors in the Clojure code, then a namespace cannot be loaded and error messages are printed. Check the individual code expressions in the namespace to ensure they are correctly formed.

[Reload namespaces with dev/user.clj](/clojure/clojure-cli/repl-startup/){target=_blank .md-button}

??? HINT "Handling Errors"
    If an exception is thrown while loading a namespace, refresh stops and prints the namespace that caused the exception. (clojure.repl/pst) prints the rest of the stack trace

    `*e` is bound to the exeception so will print the exeception when evaluated



??? INFO "tools.namespace refactor"
    `refresh` and other functions were moved to the `clojure.tools.namespace.repl` namespace. The original `clojure.tools.namespace` functions are deprecated, although the new `clojure.tools.namespace.repl` namespace is not deprecated.

[Clojure tools.namespace API reference](https://clojure.github.io/tools.namespace/){target=_blank .md-button}
[Namespaces Reference - Clojure.org](https://clojure.org/reference/namespaces){target=_blank .md-button}


## Hotload Libraries

`add-libs` "hot-loads" one or more libraries into a running REPL, avoiding the need to restart the REPL and loosing any state just to use a new library with the project.

![Hotload libraries into a Clojure REPL](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries.png)

`add-libs` is typically called from a rich comment block or [a separate `dev/user.clj` file](/clojure-cli/projects/configure-repl-startup.md#create-a-devuserclj-file-and-envdev-alias) to avoid being loaded with application code.

Once hot-loaded, a library namespace can be required as if the dependency had been added to the project configuration before the REPL started.

[practicalli/clojure-webapp-hotload-libraries](https://github.com/practicalli/clojure-webapp-hotload-libraries) is an example project that uses REPL driven development and hot loading of libraries to build a very simple web server using http-kit and hiccup.

??? WARNING "Add-libs is an experimental feature"
    `add-libs` is not yet an official feature and currently available only in the [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3) of the now deprecated `clojure.tools.deps.alpha` library.  add-libs should become official release in 2023, although not in within `org.clojure/tools.deps` library.

    [clojure/tools.deps](https://github.com/clojure/tools.deps) is the official library for all released functions from the alpha library


=== "Practicalli Clojure CLI Config"
    [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) defines several aliases which include the library that provides the `add-libs` function to the REPL:

    * `:repl/reloaded` starts a rich terminal UI, REPL process, nREPL server for Clojure editors to connect, portal data inspector, namespace reloadeing and test libraries and path
    * `:dev/reloaded` - all the tools `:repl/reloaded` provides without the repl (compose with other aliases)
    * `:lib/hotload` - add the library that includes add-libs function to the path (compose with other aliases)

    Start a rich terminal UI repl:

    ```shell
    clojure -M:repl/reloaded
    ```

    Or include the `:dev/reloaded` or `:lib/hotload` aliases when starting the REPL with other aliases, using any of the available Clojure CLI execution options (`-A`,`-M`,`-X`,`-T`).


=== "Alias Definition"
    Create an alias definition in the user `deps.edn` configuration or in the current project `deps.edn` configuration.

    Add an `:lib/hotload` alias for the `clojure.tools.deps.alpha.repl` library using the latest SHA commit from the`add-libs3` branch of `clojure.tools.deps.alpha` library as an extra dependency.

    The `add-libs` code is on a separate [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3), so requires the SHA from the head of add-libs3 branch

    ```clojure
      :lib/hotload
      {:extra-deps {org.clojure/tools.deps.alpha
                   {:git/url "https://github.com/clojure/tools.deps.alpha"
                    :git/sha "e4fb92eef724fa39e29b39cc2b1a850567d490dd"}}}
    ```

    > Alias example from [Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-deps-edn/)


There are several approaches to hotload libraries, including via a terminal REPL UI or in a project with a Clojure editor:

* [Rich terminal UI REPL](/clojure/clojure-cli/repl/libraries/#hotload-libraries)
* [Hotload in a Project](/clojure/clojure-cli/projects/hotload-in-project/)


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

    Emacs, Neovim and VS Code Calva also have their own editor.

    Test and source code must be evaluated in the REPL for the editor test runners to discover this code.  Editor test runners to not read code from the Clojure files in `src` or `test` directories.


[Writing Unit Tests for Clojure](/clojure/testing/unit-testing/){target=_blank .md-button}
[Using Test Runners with Projects](/clojure/testing/test-runners/){target=_blank .md-button}


## Performance tests

`(time ,,,)` wrapped around an expression will print the duration that expression took to run.  This provides a very rough indicator of the performance of code, although as it only runs once then results may vary and are easily affected by the environment (Java Virtual Machine, Operating System, other concurrent processes).

[Criterium](http://hugoduncan.org/criterium/){target=_blank} provides more realistic performance results which are less affected by the environment, providing a better indication of performance to inform design choices.


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


!!! HINT "bench may be more accurate but far slower to test with"
    The bench macro is claimed to be more accurate than quick-bench, but in practice, it runs for much longer and doesn't yield significantly different results most of the time

[Criterium API Documentation](http://hugoduncan.org/criterium/){target=_blank .md-button}
[Benchmark with Criterium article](http://clojure-goes-fast.com/blog/benchmarking-tool-criterium/){target=_blank .md-button}


## Log and trace events

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
```clojure
(defn product-status [product-id]
  (let [stock (http/get availability-service {:product-id product-id})
        pricing (http/get pricing-service {:product-id product-id})]))
```

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
