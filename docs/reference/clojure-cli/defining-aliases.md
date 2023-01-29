# Clojure CLI: Defining aliases
<!-- TODO: refactor Clojure CLI defining aliases -->

Clojure CLI tools provide a very flexible way to run Clojure, using aliases to include community libraries and tools to enhance clojure projects and provide independent tools. Understand the execution options (exec-opts) on the command line options ensures an effective use of Clojure CLI tools.

Aliases are used to add (or remove) configuration from the

Aliases are used with Clojure tools to provide additional configuration when explicitly added to the `clojure` command.

Aliases can be used to modify:

* the classpath and dependencies included, by adding or removing dependencies and paths
* providing a simple way to configure community tools, such as rebel readline, clj-new, depstar, etc.

Aliases can be defined in a project `deps.edn` or be available to all projects via the `~/.clojure/deps.edn` configuration file.

> #### Hint::practicalli/clojure-deps-edn user level aliases and tools
> [Practicalli Clojure CLI Config](/clojure/clojure-cli/install/community-tools.md) is a configuration designed to work across all Clojure projects, containing unique and meaningful alias names for ease of understanding.


# Clojure CLI tool options
Clojure CLI tool has several options that determine how aliases and other configuration is used

* add or remove dependencies
* add or remove directories on the class path
* define a function or main namespace to run, along with arguments

## Clojure CLI main flag options

| Flag | Purpose                                                                             |
|------|-------------------------------------------------------------------------------------|
| `-A` | add paths and dependencies when running a REPL (do not include :main-opts in alias) |
| `-M` | Run `-main` function from a specified namespace with clojure.main                                               |
| `-P` | Prepare / dry run (CI servers, Containers)                                          |
| `-X` | Execute a qualified function, optional default arguments                            |
| `-T` | Install / Run a tool by name (or use alias)                                         |
| `-J` | Java Virtual Machine specific options (memory size, etc)                            |



* deps = `:deps`, `:extra-deps`, `replace-deps`
* path = `:path`, `:extra-paths`, `replace-paths`

-A to configure paths and dependencies when running the Clojure CLI tools REPL

-M using clojure.main to run the -main function of a Clojure project or tool, using the -m flag to specify the namespace containing -main (clojure.main has other features too)

-X for running any fully qualified function from a Clojure project or tool

-P a dry run, downloading all dependencies (must use flag in first position)

-T running a tool separate from a Clojure project (class path)

## Using an alias

An alias is used via the `-M` option to the `clojure` command:

```clojure
clojure -M:qualified/alias-name
```

Multiple aliases can be used together

```clojure
clojure -M:env/test:test/runner
```

> #### Hint::Only one main namespace
> If multiple aliases set a main namespace, only the last alias in the chain has its main namespace called, e.g. `clojure -M:middleware/cider-nrepl:inspect/cognitect-rebl:middleware/nrebl` will call the main namespace of `:middleware/nrebl`.


## An alias for a community tool

Use the rebel community tool by including its alias.

```clojure
clojure -M:repl/rebel
```

This alias adds the library dependency for the rebel readline project and defines the main namespace.  The namespace is where the `-main` function is located that will start rebel readline.

```clojure
{:aliases
   :rebel
     {:extra-deps {com.bhauman/rebel-readline {:mvn/version "0.1.4"}}
      :main-opts  ["-m" "rebel-readline.main"]}
} ;; End of aliases
```


## Including paths, deps and main-opts

The Cognitect Lab test runner included the `test` directory in the class path, so test code will be included when run with this alias.

The test runner dependency is pulled from a specific commit shared on GitHub (defined as a Git SHA).

The main namespace is set to that library and the `-main` function is called when using this alias.

```clojure
{:aliases
    :test-runner/cognitect
    {:extra-paths ["test"]
     :extra-deps  {com.cognitect/test-runner
                  {:git/url "https://github.com/cognitect-labs/test-runner.git"
                   :sha     "f7ef16dc3b8332b0d77bc0274578ad5270fbfedd"}}
     :main-opts   ["-m" "cognitect.test-runner"]}


}
```

## Stand-alone tools

When a community tool does not require any of the project paths or dependencies to operate, `:replace-paths` and `:replace-deps` should be used when defining an alias.  These configurations only used paths and dependencies defined within the alias itself, minimizing the resources used to run the tool, improving the speed of using these tools.

```clojure
  :project/new
  {:replace-deps {seancorfield/clj-new {:mvn/version "1.1.226"}}
   :main-opts    ["-m" "clj-new.create"]}
```

<!-- TODO: Clojure CLI defining aliases: updated project/new alias definition -->

## Clojure Exec

With Clojure CLI tools version 1.10.1.697 the `-X` flag was introduced using aliases with [Clojure exec](https://insideclojure.org/2020/07/28/clj-exec/).

The configuration should define a fully qualified function that runs the tool.

The function should take arguments as key/value pairs as with an Edn hash-map, rather than relying on positional arguments as strings.

In this example, `:exec-fn` defines the fully qualified function name that will be called.  `:exec-args` is a hash-map of the default key values pairs that are passed to the function as an argument.

```clojure
  :project/new
  {:replace-deps {seancorfield/clj-new {:mvn/version "1.1.23"}}
   :main-opts    ["-m" "clj-new.create"]    ;; deprecated
   :exec-fn      clj-new/create
   :exec-args    {:template lib :name practicalli/playground}
   }
```

Default arguments can be over-ridden in the command,  e.g. `clojure -X:project/new :template app :name practicalli/simple-application` uses a different template

Additional arguments can be sent when running the command, e.g. `clojure -X:project/new :template figwheel-main :name practicalli/landing-page :args '["--reagent"]'` uses the `figwheel-main` template, specifies a name and `:args` arguments sent to


`:ns-default` can also be used to qualify the function that will be executed in an alias.  `:ns-default` is especially useful when there are several functions that could be called from the specific namespace.

The command line can over-ride the `:exec-fn` function configuration, allowing for a default configuration that can be easily over-ridden.

```clojure
  :project/new
  {:replace-deps {seancorfield/clj-new {:mvn/version "1.1.226"}}
   :main-opts    ["-m" "clj-new.create"]    ;; deprecated
   :ns-default   clj-new
   :exec-fn      create
   :exec-args    {:template lib :name practicalli/playground}
   }
```

> #### Hint::Keyword naming
> Any legal Clojure keyword name can be used for an alias.  Multiple aliases can be chained together with the `clojure` command.  For example in this command we are combining three aliases:
> `clojure -M:task/path:task/deps:build/options`


## Resources
* [clj-exec](https://insideclojure.org/2020/07/28/clj-exec/) - insideclojure.org
* [clj-exec update](https://insideclojure.org/2020/09/04/clj-exec/) - insideclojure.org
