# Migrating Projects To Clojure Cli Tools
If you have an existing Leingingen or Boot project, is should be fairly straightforward to switch to Clojure CLI tools configuraition (deps.edn), especially when using a collection of community tools as defined in [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }})

## Simplest approach
Create a `deps.edn` file in the root of the project directory, containing an empty hash-map, `{}`

The Clojure version will be taken from the configuration that is part of the Clojure CLI tools.  On the first run of a `clojure` or `clj` command a `~/.clojure/deps.edn` file will be created.

This configuration should be enough to run a REPL UI in the terminal and require namespaces from the project.

## Adding paths
It is advisable to specify the directory paths to define the location of the source code in the project, especially when running the project in other environments such as a continuous integration server.

Edit the `deps.edn` file in the root of the project directory and add source directory and if relevant the resources directory.

```clojure
{:paths
   ["src" `resource`]}
```

## Adding dependencies
All Clojure projects have at least one dependency, the org.clojure/clojure library.  This Clojure library is included by the configuration that comes with the Clojure CLI install.

The org.clojure/clojure library should be added to the project `deps.edn` file along with any other library dependencies required to make the project code work.


## Adding a test runner
A selection of test runners are provided by  [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}).  When pushing a project to a Continuous Server, a test runner alias should be included in the Clojure projects `deps.edn` file.


## Building a jar or uberjar from the project
The depstar project is provided in [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}) for building jars for libraries and uberjars for applications.  When pushing a project to a Continuous Server, the  relevant alias should be included in the Clojure projects `deps.edn` file so the project can be built
