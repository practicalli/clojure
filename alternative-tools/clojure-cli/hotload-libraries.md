![Hotload libraries into a Clojure REPL](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-repl-hotload-libraries.png)

## Hotload Libraries into a running REPL

The function can load

`add-libs` "hotloads" one or more libraries into a running REPL, avoiding the need to restart the REPL.

`add-libs` is typically called from a rich comment block or `dev/user.clj` file.

Once hotloaded, library namespace can be required as if the dependency had been added to the project configuration before the REPL started.

[practicalli/clojure-webapp-hotload-libraries](https://github.com/practicalli/clojure-webapp-hotload-libraries) is an example project that uses REPL driven development and hot loading of libraries to build a very simple web server using http-kit and hiccup.

> #### WARNING:: Add-libs is an experimental feature
> The `add-libs` function is regarded as an experimental feature of Clojure tools.deps.alpha and is currently part of the [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3). The add-libs implementation and function signature may change in future.

{% tabs practicalli="practicalli/clojure-deps-edn", manual="Manually add Alias" %}

{% content "practicalli" %}

## Use alias for tools.deps.alpha dependency

`:lib/hotload` alias defined in [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn/) adds the `clojure.tools.deps.alpha` library as an extra dependency.

Include the `:lib/hotload` alias when starting the REPL.


{% content "manual" %}

## Add alias for tools.deps.alpha

Edit the project `deps.edn` configuration and add an `:lib/hotload` alias for the `clojure.tools.deps.alpha.repl` library.

The `add-libs` code is on a separate [add-libs3 branch](https://github.com/clojure/tools.deps.alpha/tree/add-lib3), so requires the SHA from the head of add-libs3 branch

```clojure
  :lib/hotload
  {:extra-deps {org.clojure/tools.deps.alpha
               {:git/url "https://github.com/clojure/tools.deps.alpha"
                :git/sha "e4fb92eef724fa39e29b39cc2b1a850567d490dd"}}}
```

> Alias example from [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn/)

{% endtabs %}

## Using add-libs to hotload libraries

There are several approaches taken for hotloading libraries, including:

* [A Clojure editor, using rich comment blocks (and snippets)](hotload-libraries-editor.md)
* [A rich terminal UI REPL (rebel readline)](hotload-libraries-terminal-ui.md)
* [From within the deps.edn configuration file](hotload-libraries-deps-edn-configuration.md)
