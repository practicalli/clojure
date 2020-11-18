# Defining aliases to do more with Clojure tools
Aliases are used with Clojure tools to provide additional configuration when explicitly added to the `clojure` command.

Aliases can be used to modify:
* the classpath and dependencies included, by adding extra dependencies and paths or removing them
* providing a simple way to configure community tools, such as rebel readline, clj-new, depstar, etc.

Aliases can be defined in a project `deps.edn` or be available to all projects via the `~/.clojure/deps.edn` configuration file.

> #### Hint::practicalli/clojure-deps-edn user level aliases and tools
> [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdnInstall }}) is a configuration designed to work across all Clojure projects, containing unique and meaningful alias names for ease of understanding.


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
> If multiple aliases set a main namespace, only the last alias in the chain calls has its main namespace called, e.g. `clojure -M:middleware/cider-nrepl:inspect/cognitect-rebl:middleware/nrebl` will call the main namespace of `:middleware/nrebl`.


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


## Clojure Exec
With Clojure CLI tools version 1.10.1.697 the `-X` flag was introduced using aliases with [Clojure exec](https://insideclojure.org/2020/07/28/clj-exec/).

The configuration should define a fully qualified function that runs the tool.

The function should take arguments as key/value pairs as with an Edn hash-map, rather than relying on positional arguments as strings.

In this example, `:exec-fn` defines the fully qualified function name that will be called.  `:exec-args` defines default values for the arguments to the function.

```clojure
  :project/new
  {:replace-deps {seancorfield/clj-new {:mvn/version "1.1.226"}}
   :main-opts    ["-m" "clj-new.create"]    ;; deprecated
   :exec-fn      clj-new/create
   :exec-args    {:template lib :name practicalli/playground}
   }
```

Arguments can be over-ridden on the command line, e.g. `clojure -X:project/new :template app :name practicalli/simple-appplication`

`:ns-default` can also be used to qualify the function that will be executed in an alias.  `:ns-defaul` is especially useful when there are several functions that could be called from the specific namespace.

The command line can over-ride the `:exec-fn` function configuration, allowing for a default configuration that can be easily over-ridden.

```clojure
  :project/new
  {:replace-deps {seancorfield/clj-new {:mvn/version "1.1.226"}}
   :main-opts    ["-m" "clj-new.create"]    ;; deprecated
   :ns-default   clj-new
   :exec-fn      create
   :exec-args    {:template lib :name practicalli/playground}
   }


> #### Hint::
> Any legal Clojure keyword name can be used for an alias.  Multiple aliases can be chained together with the `clojure` command.  For example in this command we are combining three aliases:
> `clojure -M:task/path:task/deps:build/options`


## Resources
* [clj-exec](https://insideclojure.org/2020/07/28/clj-exec/) - insideclojure.org
* [clj-exec update](https://insideclojure.org/2020/09/04/clj-exec/) - insideclojure.org
