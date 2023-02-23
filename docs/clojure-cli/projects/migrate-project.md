# Migrating Project To Clojure CLI

Migrating an existing project to Clojure CLI can be as simple as the addition of a `deps.edn` configuration file.


!!! WARNING "Leiningen plugins that change code"
    A few Leiningen plugins inject code into a project to make it work.  For example, lein-ring injects Clojure code into the project to run an application server.  These type of plugins may require updates to the Clojure code in the project.


## Minimal approach

Create a `deps.edn` file in the root of the project directory, containing an empty hash-map, `{}`

The Clojure version will be taken from the Clojure CLI tools install configuration.

This configuration is enough to run a terminal REPL UI for the project, although requiring namespaces from the project may require libraries to be added as dependencies first.


## Adding dependencies

All Clojure projects require the `org.clojure/clojure` library and a specific version is defined in the configuration that comes with the Clojure CLI install.

Use the `:deps` key in `deps.edn` to specify a version of the `org.clojure/clojure` library, along with any dependencies required for the Clojure code to run.


```clojure
{:deps
 {org.clojure/clojure {:mvn/version "1.10.2"}
  integrant/integrant {:mvn/version "0.8.0"}}}
```

??? HINT "REPL Reloaded - add-libs hotload dependencies"
    [Practicalli REPL Reloaded](/clojure/clojure-cli/repl-reloaded/) provides the add-libs function that can hotload libraries into the running REPL, without having to restart the REPL process.

    The hotload approach can also be useful for diagnosing conflicts in dependencies by loading them in stages to narrow down the library causing the conflict.


## Adding paths

It is advisable to specify the directory paths to define the location of the source code in the project, especially when running the project in other environments such as a continuous integration server.

Edit the `deps.edn` file in the root of the project directory and add source directory and if relevant the resources directory.

```clojure
{:paths
   ["src" `resource`]}
```


## Add test runner

Tests can be run locally using the `:test/run` or `:test/watch` aliases from the [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config.md).

??? HINT "Continuous Integration Support"
    A Continuous Integration server requires an alias in the project `deps.edn` file to define a test runner.

    A selection of test runners are provided via aliases defined in [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config.md).  Copy a test runner alias to the project `deps.edn` file.


## Deployment

A Continuous Delivery pipeline will require an alias in the project `deps.edn` file to define how to build a jar or uberjar to package the Clojure project.

[Project Package section](tools-build/) details how to use `tools.build` to create jar and uberjar archives of the project for deployment.


## Migration Tools

Several tools exist to support migration from Leiningen projects to Clojure CLI projects.  Results will be dependant on how complex the Leiningen project configuration is.

* [lein-to-deps](https://github.com/EwenG/lein-to-deps) - create a `deps.edn` configuration from a `project.clj` configuration
* [lein-tools-deps](https://github.com/RickMoynihan/lein-tools-deps) - share Clojure CLI dependencies with Leiningen project configuration.
