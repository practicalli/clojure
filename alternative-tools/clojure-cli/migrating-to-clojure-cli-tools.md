# Migrating Projects To Clojure Cli Tools
Migrating to Clojure CLI tools only requires the addition of a `deps.edn` configuration to the project.  A [user level configuration containing a collection of community tools]([practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }})) minimizes the project configuration required.

> #### Hint::Magic Leiningen plugins
> A few Leiningen plugins inject code into a project to make it work.  For example, lein-ring injects clojure code into the project to run an application server.  These type of plugins may require updates to the Clojure code in the project.


## Minimal approach
Create a `deps.edn` file in the root of the project directory, containing an empty hash-map, `{}`

The Clojure version will be taken from the Clojure CLI tools install configuration.

This configuration is enough to run a terminal REPL UI for the project, although requiring some namespaces from a project may require libraries to be added as dependencies first.

### Adding dependencies
All Clojure projects require the `org.clojure/clojure` library and a specific version is defined in the configuration that comes with the Clojure CLI install.

Use the `:deps` key in `deps.edn` to specify a version of the `org.clojure/clojure` library, along with any dependencies required for the Clojure code to run.


```clojure
{:deps
 {org.clojure/clojure {:mvn/version "1.10.2"}
  integrant/integrant {:mvn/version "0.8.0"}}}
```

> #### Hint::Hot loading dependencies
> [add-lib](/alternative-tools/clojure-cli/hot-load-dependencies.md) can hot-load a Clojure dependency into a running REPL process, avoiding the need to restart.


### Adding paths
It is advisable to specify the directory paths to define the location of the source code in the project, especially when running the project in other environments such as a continuous integration server.

Edit the `deps.edn` file in the root of the project directory and add source directory and if relevant the resources directory.

```clojure
{:paths
   ["src" `resource`]}
```


### Adding a test runner
Tests can be run locally using a test runner alias from the [user wide configuration]({{ book.P9IClojureDepsEdnInstall }}).

A Continuous Integration server requires an alias in the project `deps.edn` file to define a test runner. A selection of test runners are provided by [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdnInstall }}).  Copy a [test runner alias](https://github.com/practicalli/clojure-deps-edn#test-runners-and-test-coverage-tools) to the project `deps.edn` file.


### Building a jar or uberjar from the project
The depstar project is provided in [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}) for building jars for libraries and uberjars for applications.  When pushing a project to a Continuous Server, the relevant alias should be included in the Clojure projects `deps.edn` file so the project can be built


## Deployment
A Continuous Delivery pipeline will require an alias in the project `deps.edn` file to define how to build a jar or uberjar to package the Clojure project.


## Tools for migration
Several tools exist to support migration

* [lein-to-deps](https://github.com/EwenG/lein-to-deps) - create a `deps.edn` configuration from a `project.clj` configuration
* [lein-tools-deps](https://github.com/RickMoynihan/lein-tools-deps) - share Clojure CLI dependencies with Leiningen project configuration.
