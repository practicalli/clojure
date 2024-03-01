# Defining aliases

Aliases extend the built-in functionality of Clojure CLI via community libraries and tools, either in a project specific or a user `deps.edn` configuration file.

Aliases are explicitly added to the `clojure` command, e.g. `clojure -M:repl/rebel` to start a repl with rebel rich terminal UI.

Aliases are optional configuration that supports the development workflow.

Aliases can be used to :

* add libraries and directories to the class path
* configure how to run community tools and provide default options


??? INFO "Understanding Clojure CLI Execution Options"
    [Understand the execution options (exec-opts)](/clojure/clojure-cli/execution-options/) on the command line options ensures an effective use of Clojure CLI tools.


## Configuration file

`deps.edn` is an [EDN configuration](https://github.com/edn-format/edn) file containing a single hash-map with several top-level keywords. All keywords are optional.

* `:paths` - directories included by default as a vector of directory names, e.g. `["src" "resources"]`
* `:deps` - library dependencies included by default as a map  ([practicalli/banking-on-clojure example](https://github.com/practicalli/banking-on-clojure-webapp/blob/live/deps.edn#L4-L19))
* `:mvn/repos` - a map of [repositories to download Maven dependencies](https://github.com/practicalli/clojure-deps-edn#library-hosting-services), Maven Central and Clojars included by default
* `:mvn/local-repo` to [specify an alternative location for the Maven cache](https://github.com/practicalli/clojure-deps-edn#maven-local-repository)
* `:aliases` - a map of optional libraries and tools, the key being the alias name and its value the configuration


The installation of Clojure CLI contains a configuration

* adds `src` and `org.clojure/clojure` library
* Maven Central & Clojars.org repository sources.

Configuration can be defined in a `deps.edn` file in the root of a Clojure project, applying only to that specific project.

A user `deps.edn` configuration can be used in any Clojure project and the `deps.edn` configuration file resides in either `$XDG_CONFIG_HOME/clojure` or `$HOME/.clojure`.


??? INFO "User configuration locations"
    User configuration is either `$XDG_CONFIG_HOME/clojure/deps.edn` or `$HOME/.clojure/deps.edn` locations and its aliases can be used for any Clojure project.


## Alias keys

An alias name is a keyword in Clojure, e.g. `:test/env`, so the `:` is an intrinsic part of the alias name.

Keys used to define an alias are:

* `:extra-paths` - a vector of directory names added to the project class path, e.g. `["env/dev" "env/test"]`
* `:extra-deps` - a map of additional library dependencies, as a Maven library, Git repository or local directory
  * `{domain/library-name {:mvn/version "1.2.33"}}` maven library
  * `{domain/name {:git/url "https://github.com/account-name/repository-name" :git/sha 'ab3de67'}}`
  * `{io.github.account/repository-name {:git/tag "2023-01-10" :git/sha 'ab3de67'}}`
  * `{}`
* `:main-opts` - a vector of command line options passed to `clojure.main`
* `:exec-fn` - the fully qualified name of a function to be run by `clojure.exec`
* `:exec-args` - default arguments passed to the function, over-ridden by matching argument keys specified on the command line

Keys used when defining an alias for a standalone tool which exclude the paths and dependencies defined in top-level keys.

* `:replace-paths` - use only the paths specified as the class path
* `:replace-deps` - use only the libraries specified, defined as a Maven library or Git repository

??? WARNING "alias :paths and :deps short-cuts"
    Using `:paths` and `:deps` keys in an alias are short-cuts for their respective `replace-paths` and `:replace-deps` keywords

    Using `:paths` and `:deps` in an alias can be very confusing and Practialli recommends using the explicit names for greater clarity

??? INFO "Clojure CLI -T option"
    `-T` execution option will exclude the top-level `:paths` and `:deps` keys

    `-T` sets "." as the path, adding only paths and libraries defined in aliases used with the execution flag


## clojure.main alias

`:main-opts` specifies the options passed to a clojure.main alias, using the `clojure -M` execution option flag.

The value is a vector containing individual string values that represent each option, i.e. option flag and value.

`-m` is used to define the fully qualified namespace in which `clojure.main` should look for the `-main` function.

The `:main-opts` vector defines arguments that are passed to the `-main` function, the same kind of arguments that would be passed via the command line.

The `"--middleware"` argument adds cider-nrepl middleware to the nREPL server, allowing Cider and other editors complete control over the REPL.  The syntax uses values wrapped in a vector.

The `"-interactive"` argument runs an interactive REPL prompt. A headless process is run without this option.

```clojure
  :repl/cider
  {:extra-deps {nrepl/nrepl                   {:mvn/version "0.9.0"}
                cider/cider-nrepl             {:mvn/version "0.27.4"}}
   :main-opts  ["-m" "nrepl.cmdline"
                "--middleware" "[cider.nrepl/cider-middleware]"
                "-interactive"]}
```

This alias is called using the command `clojure -M:repl/cider`


## clojure.exec alias

`:exec-fn` specifies the fully qualified name of the function, using the `clojure -X` execution option flag .

`:exec-args` specifies a hash-map of default key/value pairs passed to the `:exec-fn` function.  The defaults can be overridden on the command line with respective key/value pairs.

Arguments can be nested within the `:exec-args` map, especially useful on projects with several component configurations (server, database, logging) and managed by a component system (i.e Integrant)

```clojure
{:aliases
 {:project/run
  {:exec-fn practicalli.service/start
   :exec-args {:http/server {:port 8080
                             :join? fale}
               :log/mulog :elastic-search}}}}
```

To run with the default arguments:

```
clojure -X:project/run
```

Over-ride the default arguments by passing them on the command line

```shell
clojure -X:project/run '[:http/server :port]' 8888 :log/mulog :console :profile :dev
```

In this command the vector defines the path to the `:port` key and over-rides the default value. :log/mulog is a top-level key which changes the log publisher type.  `:profile` is another top-level key that sets the environment to `:dev` (e.g. to configure Integrant / Aero).

Arguments in a nested map within the alias can be traversed (as with `get-in` and `update-in` functions) to override the default values in the alias.  So to set a different port value :

Argument keys should either be a top-level key or a vector of keys to refer to a key in a nested hash-map of arguments.

> An alias can contain configuration to run both `clojure.main` and `clojure.exec` (useful if steadily migrating users from -M to -X approach without breaking the user experience)


## Examples

??? HINT "Practicalli Clojure CLI Config provides a wide range of aliases"
    [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) is a configuration designed to work across all Clojure projects, containing unique and meaningful alias names for ease of understanding.


### Simple Project

A new Clojure project can be made by creating a `deps.edn` file and respective `src` & `test` directory trees.

A project `deps.edn` file typically contains `:path`, `:deps` and `:aliases` sections, although `deps.edn` could start with a simple `{}` empty hash-map.

```clojure
{:paths ["src" "resources"]

 :deps
 {org.clojure/clojure {:mvn/version "1.11.1"}}

 :aliases
 {:test/env {:extra-paths ["test"]}}}
```

> The `test` path and associated libraries are added as an alias as they are not required when packaging or running a Clojure application.  `:path` and `:deps` keys are always included by default, `:aliases` are optional and only included when specified with the `clojure` command, e.g. `clojure -M:test/env`


### clojure.main tool

The Cognitect Lab test runner included the `test` directory in the class path, so test code will be included when run with this alias.

The test runner dependency is pulled from a specific commit shared on GitHub (defined as a Git SHA).

The main namespace is set to that library and the `-main` function is called when using this alias.

```clojure
{:aliases

  :test/cognitect
  {:extra-paths ["test"]
   :extra-deps  {com.cognitect/test-runner
                {:git/url "https://github.com/cognitect-labs/test-runner.git"
                 :git/sha     "f7ef16dc3b8332b0d77bc0274578ad5270fbfedd"}}
     :main-opts   ["-m" "cognitect.test-runner"]}
}
```


### Clojure Exec tool

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

!!! HINT "Keyword naming"
    Legal Clojure keyword names can be used for an alias.  Multiple aliases can be chained together with the `clojure` command.  For example in this command we are combining three aliases:
    `clojure -M:task/path:task/deps:build/options`


## Resources

[clj-exec: insideclojure.org](https://insideclojure.org/2020/07/28/clj-exec/){target=_blank .md-button}
[clj-exec update: insideclojure.org](https://insideclojure.org/2020/09/04/clj-exec/){target=_blank .md-button}
[Clojure CLI execution options](/clojure/clojure-cli/execution-options/){target=_blank .md-button}
[Tips for designing aliases](https://practical.li/blog/posts/clojure-cli-aliases-deserve-designing-too/){target=_blank .md-button}
