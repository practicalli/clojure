# Clojure CLI

??? HINT "Learn by doing"
    To learn Clojure CLI by doing, jump to [Terminal REPL](/clojure/cli/repl/) or [Clojure project](/clojure/clojure-cli/projects/) sections to start using the Clojure CLI

Clojure CLI (command line interface) is the latest approach to working with Clojure projects, libraries and tools. Clojure CLI focuses on:

* running Clojure code (applications and tools)
* starting a REPL process (Read-Eval-Print Loop) for interactive development with a [Clojure editor](/clojure/clojure-editors/) or [a command line REPL UI](repl/).
* managing dependencies (tools.deps) -downloading from Maven and Git repositories
* [building Clojure projects (using tools.build)](/clojure/clojure-cli/projects/tools-build/) to create deployable Clojure services

[:fontawesome-solid-book-open: Practicalli Clojure CLI Config](practicalli-config/) extends the feautres of Clojure CLI, defining aliases that add community libraries and tools.


??? WARNING "Video commands dated but concepts remain valid"

<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/u5VoFpsntXc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


## Common tasks for Clojure development

The Clojure CLI has several built-in tasks.  Additional tasks are provided via aliases that include libraries and tools from the Clojure community, e.g. [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](practicalli-config/)

!!! HINT "REPL Reloaded"
    `clojure -M:repl/reloaded` runs a rich terminal UI REPL prompt that includes portal data inspector, namespace reloading and library hotload tools. `test` path is included to support editor test runners and `dev` path for custom user namespace for [custom REPL startup](/clojure/clojure-cli/repl-startup/)

| Task                                      | Command                                                                     | Defined In  |
|-------------------------------------------|-----------------------------------------------------------------------------|-------------|
| Basic terminal UI REPL                    | `clojure` or `clj` if `rlwrap` binary installed                             | Clojure CLI |
| Enhanced terminal UI REPL (Rebel & nREPL) | `clojure -M:repl/rebel` or `clojure -M:repl/reloaded`                       | Practicalli |
| Create project                            | `clojure -T:project/new :template app :name domain/appname :args '["+h2"]'` | Practicalli |
| Run unit tests / watch for changes        | `clojure -X:test/run` or `clojure -X:test/watch`                            | Practicalli |
| Run the project (clojure.main)            | `clojure -M -m domain.main-namespace`                                       | *No Alias*  |
| Find libraries (maven & git)              | `clojure -M:search/library library-name`                                    | Practicalli |
| Find library versions (maven)             | `clojure -X:deps find-versions domain/library-name`                         | CLojure CLI |
| Download dependencies                     | `clojure -P`  (plus optional execution flags with aliases)                  | CLojure CLI |
| Check for new dependency versions         | `clojure -T:search/outdated`                                                | Practicalli |
| Package library                           | `clojure -X:build/jars`                                                     | Practicalli |
| Deploy library locally                    | `clojure -X:deps mvn-install`                                               | Clojure CLI |
| Check code for unused vars                | `clojure -X:search/unused`                                                  | Practicalli |

!!! INFO "tools.build is recommended for packaging projects"
    [Package with tools.build](/clojure/clojure-cli/projects/tools-build/) is the recommended approach to create jar and Uberjar packages of a Clojure project.


## Execution option flags

The execution option flags for the `clojure` command define how to run Clojure code.  The most commonly used options are:

* `-M` uses [clojure.main](https://clojure.org/reference/repl_and_main) and calls the `-main` function of the given namespace, passing positional string arguments.
* `-X` uses [clojure.exec](https://clojure.org/reference/deps_and_cli#_execute_a_function) to call a fully qualified function which has a map argument, passing key/value pair arguments. `-T` is the same as `-X` execpt setting the classpath to `.`, ignoring project dependencies not defined in a given alias.

| Flag | Purpose                                                        |
|------|----------------------------------------------------------------|
| `-A` | Pass alias to built-in terminal UI REPL (`clojure` or `clj`)   |
| `-M` | Run Clojure with clojure.main                                  |
| `-P` | Prepare / dry run (Build scripts, CI servers, Containers)      |
| `-X` | Execute a fully qualified function, optional default arguments |
| `-T` | Run a tool independently from a project configuration          |
| `-J` | Java Virtual Machine specific options (heap size, etc)         |


!!! HINT "Examples of execution option flags"
    [Execution option page](execution-options.md) expands on flag usage with numerous examples


## Configure Clojure CLI

A `deps.edn` file configures the Clojure CLI, using extensible data notation (EDN), the underlying syntax of Clojure itself.

Configuration is defined using a hash-map with the following top-level keys:

* `:deps` - library dependencies
* `:paths` - directories to search for code and resources (Java classpath)
* `:aliases` - named configuration defining extra paths, extra deps and configuration to run Clojure
* `:mvn/repos` - library dependency sources, remote and local (e.g. Clojars, Maven, Artifactory, etc).

`:aliases` configuration is only included when using the alias name with the Clojure CLI, e.g. `:repl/rebel` alias in [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](practicalli-config/) adds library dependencies only used during development to run a rich terminal UI REPL.

```shell
clojure -M:repl/rebel
```

??? HINT "Add a wide range of aliases by installing :fontawesome-solid-book-open: Practicalli Clojure CLI Config"
    [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](practicalli-config/) provides aliases for a wide range of tools for use with Clojure CLI to support Clojure software development.


### Precedence Order

Clojure CLI Configuration can be used from several different sources.

| Configuration                                                   | Description                                                                |
|-----------------------------------------------------------------|----------------------------------------------------------------------------|
| Command line arguments                                          | string or edn (key value) arguments passed to the `clojure` command        |
| project `deps.edn`                                              | Project specific configuration: paths, dependencies, aliases               |
| `$XDG_CONFIG_HOME/clojure/deps.edn` / `$HOME/.clojure/deps.edn` | User level configuration for use with all projects                         |
| Clojure CLI install                                             | Includes Clojure standard library, `src` path and built-in `:deps` aliases |

![Clojure CLI configuration order of precedence](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-cli/clojure-cli-configuration-precedence.png)

Command line arguemnts take preceedence over the other configurations. When running the `clojure` command the configurations are merged, with key/values being added or replaces following the precedence order.


### Install configuration

Clojure CLI install has a built-in configuration:

* `org.clojure/clojure` library dependency, setting the default version of Clojure for the Clojure CLI
* `src` set as the default path

??? INFO "Check version of Clojure"
    Evaluate `*clojure-version*` in a REPL shows which version of the Clojure language is currently being used.

    Including `org.clojure/clojure` as a dependency the project `deps.edn` file specifies a version of the Clojure language.  The Clojure CLI version is used if no other dependency is specified.


### User configuration

A Clojure CLI user configuration is available to all projects by the operating system user account.  [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](practicalli-config/) is a user configuration that contains a set of well-formed aliases that adds common tools for any Clojure project.

??? Hint "Clojure CLI User Configuration Location"
    Clojure CLI tools creates a configuration directory called `.clojure`, which [by default](https://clojure.org/reference/deps_and_cli#_deps_edn_sources) is placed in the root of the operating system user account directory, e.g. `$HOME/.clojure`.

    `XDG_CONFIG_HOME` may be set by your operating system and over-rides the default location, e.g. `$HOME/.config/.clojure`

    `CLJ_CONFIG` can be used to over-ride all other location settings

    Run `clojure -Sdescribe` in a terminal and checking the `:user-config` value to see the location of your Clojure configuration directory


A basic example of a user configuration for Clojure CLI

```clojure
{
  :aliases {
    :test/env {:extra-paths ["test"]}

    :project/new
    {:extra-deps {seancorfield/clj-new {:mvn/version "1.0.199"}}
     :main-opts  ["-m" "clj-new.create"]}
  }

  :mvn/repos {
    "central" {:url "https://repo1.maven.org/maven2/"}
    "clojars" {:url "https://repo.clojars.org/"}
  }
}
```

!!! Hint "Clojure Tools install sets Clojure version"
    A default version of Clojure is set by the Clojure tools install, enabling the `clojure` command to know what version of Clojure library to use.  This version will be over-ridden by the user or project specific deps.edn configuration files if set.


## References

[tools.deps and cli guide](https://clojure.org/reference/deps_and_cli){target=_blank .md-button}
[clojure.main API Reference](https://clojure.github.io/clojure/clojure.main-api.html){target=_blank .md-button}
[tools.deps.alpha API Reference](https://clojure.github.io/tools.deps.alpha/){target=_blank .md-button}
