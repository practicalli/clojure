
## Hotload Libraries into a running REPL

`add-libs` "hot-loads" one or more libraries into a running REPL, avoiding the need to restart the REPL and loosing any state just to use a new library with the project.

![Hotload libraries into a Clojure REPL](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries.png)

`add-libs` is typically called from a rich comment block or [a separate `dev/user.clj` file](/clojure-cli/projects/configure-repl-startup.md#create-a-devuserclj-file-and-envdev-alias) to avoid being loaded with application code.

Once hot-loaded, a library namespace can be required as if the dependency had been added to the project configuration before the REPL started.

[practicalli/clojure-webapp-hotload-libraries](https://github.com/practicalli/clojure-webapp-hotload-libraries) is an example project that uses REPL driven development and hot loading of libraries to build a very simple web server using http-kit and hiccup.

!!! WARNING "Add-libs is an experimental feature"
    The `add-libs` function is regarded as an experimental feature and is only available in the [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3) of the now deprecated `clojure.tools.deps.alpha` library.  The add-libs implementation and function signature may change before it is packaged into a release feature (although the function hasn't changes significantly in the last year).

    [clojure/tools.deps](https://github.com/clojure/tools.deps) is the official library, although this does not (yet) include `add-libs`


## add-libs dependency

The clojure/tools.deps.alpha library defines the add-libs function on the add-libs3 branch and the latest SHA must be included as a dependency when starting the REPL.  add-libs is a development tool which should be added via an alias, either in the project `deps.edn` or [user config](/clojure-cli/install/clojure-cli.md#user-configuration-files) for use with all projects.


=== "Practicalli Clojure CLI Config"
    [Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-deps-edn/) defines several aliases which include the library that provides the `add-libs` function to the REPL:

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


## Using add-libs to hotload libraries

There are several approaches to hotload libraries, including via a terminal REPL UI or in a project with a Clojure editor:

* [Rich terminal UI REPL](/clojure/clojure-cli/repl/libraries/#hotload-libraries)
* [Hotload in a Project](/clojure/clojure-cli/projects/hotload-in-project/)
