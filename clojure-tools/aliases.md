# Defining aliases to do more with Clojure tools
Aliases are used with Clojure tools to provide additional configuration and are only used when explicitly added to the `clojure` command.

Aliases can be used to add:
* extra dependencies and paths
* community tools (rebel readline, clj-new, etc.)

Aliases can be defined in a project `deps.edn` or be available to all projects via the `~/.clojure/deps.edn` configuration file.

> #### Hint::practicalli/clojure-deps-edn adds common aliases and tools
> Create a fork of the [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) on GitHub. Clone that fork to instantly have access to dozens of tools for Clojure software development.
>
> All tools are provided via libraries and are only downloaded on first use or if versions of libraries are updated.


## Using an alias
An alias is used via the `-A` option to the `clojure` command:
```clojure
clojure -A:my-task
```
Multiple aliases can be used together
```clojure
clojure -A:test:test-runner
```

> #### Hint::Only one main namespace
> If multiple aliases set a main namespace, the first alias to do so will be used to start the `-main` function.  If that first alias never terminates or terminates the `clojure` command, then further `-main` functions from set main namespaces will not be run.


## An alias for a community tool
Use the rebel community tool by including its alias.
```clojure
clojure -A:rebel
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
    :test-runner-cognitect
    {:extra-paths ["test"]
     :extra-deps  {com.cognitect/test-runner
                  {:git/url "https://github.com/cognitect-labs/test-runner.git"
                   :sha     "f7ef16dc3b8332b0d77bc0274578ad5270fbfedd"}}
     :main-opts   ["-m" "cognitect.test-runner"]}


}
```



> You can use and legal Clojure keyword name for an alias and include multiple aliases with the `clojure` command.  For example in this command we are combining three aliases:
> `clojure -A:my-task:my-build:my-prefs`


<!-- TODO content to add -->

<!--  ;;   resolve-deps aliases (-R) affect dependency resolution, options: -->
<!--   ;;     :extra-deps - specifies extra deps to add to :deps -->
<!--   ;;     :override-deps - specifies a coordinate to use instead of that in :deps -->
<!--   ;;     :default-deps - specifies a coordinate to use for a lib if one isn't found -->
<!--   ;;   make-classpath aliases (-C) affect the classpath generation, options: -->
<!--   ;;     :extra-paths - vector of additional paths to add to the classpath -->
<!--   ;;     :classpath-overrides - map of lib to path that overrides the result of resolving deps -->
