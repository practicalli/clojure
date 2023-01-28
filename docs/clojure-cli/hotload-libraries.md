
## Hotload Libraries into a running REPL

`add-libs` "hot-loads" one or more libraries into a running REPL, avoiding the need to restart the REPL and loosing any state just to use a new library with the project.

![Hotload libraries into a Clojure REPL](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries.png)

`add-libs` is typically called from a rich comment block or [a separate `dev/user.clj` file](/clojure-cli/projects/configure-repl-startup.md#create-a-devuserclj-file-and-envdev-alias) to avoid being loaded with application code.

Once hot-loaded, a library namespace can be required as if the dependency had been added to the project configuration before the REPL started.

[practicalli/clojure-webapp-hotload-libraries](https://github.com/practicalli/clojure-webapp-hotload-libraries) is an example project that uses REPL driven development and hot loading of libraries to build a very simple web server using http-kit and hiccup.

!!! WARNING "Add-libs is an experimental feature"
    The `add-libs` function is regarded as an experimental feature of `clojure.tools.deps.alpha` library and is currently part of the [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3). The add-libs implementation and function signature may change in future.


## add-libs dependency

The clojure/tools.deps.alpha library defines the add-libs function on the add-libs3 branch and the latest SHA must be included as a dependency when starting the REPL.  add-libs is a development tool which should be added via an alias, either in the project `deps.edn` or [user config](/clojure-cli/install/clojure-cli.md#user-configuration-files) for use with all projects.


=== "Practicalli Clojure CLI Config"
    `:lib/hotload` alias defined in [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn/) adds the latest SHA commit from the `add-libs3` branch of `clojure.tools.deps.alpha` library as an extra dependency.

    Include the `:lib/hotload` alias when starting the REPL, using any of the available Clojure CLI execution options (`-A`,`-M`,`-X`,`-T`).

    See [Terminal REPL](hotload-libraries-terminal-ui.md) and [Clojure Editor](hotload-libraries-editor.md) pages for examples.

=== "manual"
    Edit the project `deps.edn` configuration and add an `:lib/hotload` alias for the `clojure.tools.deps.alpha.repl` library.  Or add an alias to the user level configuration for use with any Clojure CLI project.

    The `add-libs` code is on a separate [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3), so requires the SHA from the head of add-libs3 branch

    ```clojure
      :lib/hotload
      {:extra-deps {org.clojure/tools.deps.alpha
                   {:git/url "https://github.com/clojure/tools.deps.alpha"
                    :git/sha "e4fb92eef724fa39e29b39cc2b1a850567d490dd"}}}
    ```

    > Alias example from [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn/)


## Using add-libs to hotload libraries

There are several approaches taken for hotloading libraries, including:

* [Rich terminal UI REPL](hotload-libraries-terminal-ui.md)
* [Hotload in a Project](hotload-in-project.md)
