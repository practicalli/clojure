# Clojure CLI

Clojure CLI (command line interface) is the latest approach to working with Clojure projects, libraries an tools.  The Clojure CLI focuses on:

* running Clojure code (applications and tools)
* starting a REPL process (Read-Eval-Print Loop) for interactive development with a [Clojure editor](/clojure/clojure-editors/) or [a command line REPL UI](rebel-repl/).
* managing dependencies (via tools.deps) and downloads from Maven and Git repositories
* building Clojure projects (when including tools.build) to create deployable Clojure services

The Clojure CLI is extended by adding aliases for community libraries and tools, e.g. [Practicalli Clojure CLI Config](/clojure/install/clojure-cli/#practicalli-clojure-cli-config)



<p style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/u5VoFpsntXc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>


## Common tasks for Clojure development

Commands to use for common tasks and where their aliases are included in Clojure CLI tools or require an alias (either in a project or user-wide deps.edn file).

| Task                                           | Command                                                                     | Defined In  |
|------------------------------------------------|-----------------------------------------------------------------------------|-------------|
| Basic terminal UI REPL                         | `clojure` or `clj` if `rlwrap` binary installed                             | Clojure CLI |
| Enhanced terminal UI REPL (Rebel and nREPL)    | `clojure -M:repl/rebel`                                                     | Practicalli |
| Create project (clojure exec)                  | `clojure -T:project/new :template app :name domain/appname :args '["+h2"]'` | Practicalli |
| Run unit tests / watch for changes             | `clojure -X:test/run` or `clojure -X:test/watch`                            | Practicalli |
| Run the project (clojure.main)                 | `clojure -M -m domain.main-namespace`                                       | *No Alias*  |
| Run a function from the project (clojure.exec) | `clojure -X:run/greet`                                                      | Project     |
| Find libraries (mvn & git)                     | `clojure -M:search/library library-name`                                    | Practicalli |
| Download dependencies                          | `clojure -P`  (plus optional execution flags with aliases)                  | CLojure CLI |
| Check for new dependency versions              | `clojure -T:search/outdated`                                                | Practicalli |
| Package library                                | `clojure -X:build/jars`                                                     | Practicalli |
| Deploy library locally                         | `clojure -X:deps mvn-install`                                               | Clojure CLI |
| Package application                            | `clojure -X:build/uberjar`                                                  | Project     |
| Check code for unused vars                     | `clojure -X:search/unused`                                                  | Practicalli |

Clojure CLI can also be used for [evaluating an expressions](/clojure/alternative-tools/clojure-cli/evaluate-an-expression.md) or [running Clojure from files as scripts](/clojure/alternative-tools/clojure-cli/files-and-scripts.md), although these approaches are less common.

`clojure -M:lib/hotload:repl/rebel` runs a rich terminal UI REPL which can [use add-libs to hotload dependencies into a running REPL process](/clojure/alternative-tools/clojure-cli/hotload-libraries.md).


## Clojure CLI version

`clojure -Sdescribe` shows the version of Clojure CLI currently installed.

![clojure cli - show version with describe - light](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-cli/clojure-cli-version-describe-light.png#only-light)
![clojure cli - show version with describe - dark](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-cli/clojure-cli-version-describe-dark.png#only-dark)

The `-Sverbose` flag shows the Clojure CLI version and basic configuration before running any task, e.g. `clojure -Sverbose -M:repl/rebel` will show the Clojure CLI details and then run Rebel terminal UI.


## Clojure CLI execution option flags

The execution option flags for the `clojure` command define how to run Clojure code.

| Flag | Purpose                                                        |
|------|----------------------------------------------------------------|
| `-A` | Pass alias to built-in terminal UI REPL (`clojure` or `clj`)   |
| `-M` | Run Clojure project with clojure.main                          |
| `-P` | Prepare / dry run (Build scripts, CI servers, Containers)      |
| `-X` | Execute a fully qualified function, optional default arguments |
| `-T` | Run a tool independently from a project configurations         |
| `-J` | Java Virtual Machine specific options (heap size, etc)         |


!!! HINT "Which flag to use?"
    The `-M` flag is used when calling a `-main` function from a specified namespace. Arguments can be passed as free-form string options.
   
      The `-X` flag is used to call a fully qualified function, which can be any function on the command line. Arguments are passed as key/value pairs and strings / collection syntax should be escaped with single quotes.  `-X` can use `:replace-deps` and `:replace-paths` values to remove project `:deps` and `:paths`
   
    `-T` flag removes project paths and deps, so is run independent of a Clojure project configuration.  Tools can be installed and referred to by name, or used via an alias name and have default configuration attached.
   
    Read the article: [Clojure CLI - which execution option to use](https://practical.li/blog/posts/clojure-which-execution-option-to-use/)



## Configure Clojure CLI

A `deps.edn` file configures the Clojure CLI, using extensible data notation (EDN), the underlying language for Clojure itself.

Configuration is defined using a hash-map with the following top-level keys:

* `:deps` - library dependencies
* `:paths` - directories to search for code and resources (Java classpath)
* `:aliases` - named configuration defining extra paths, extra deps and configuration to run Clojure
* `:mvn/repos` - library dependency sources, remote and local (e.g. Clojars, Maven, Artifactory, etc).

`:aliases` configuration is only included when using the alias name with the Clojure CLI, e.g. `:repl/rebel` alias in [Practicalli Clojure CLI Config](clojure/clojure-cli/practicalli-config.md) adds library dependencies only used during development to run a rich terminal UI REPL.

```shell
clojure -M:repl/rebel
```

??? HINT "Install Practicalli Community Tool aliases"
    [Practicalli Clojure CLI Config](practicalli-config.md) provides aliases for a wide range of tools for use with Clojure CLI to support Clojure software development.


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


### Clojure CLI install configuration

Clojure CLI install has a built-in configuration:

* `org.clojure/clojure` library dependency, setting the default version of Clojure for the Clojure CLI
* `src` set as the default path

A Clojure CLI user configuration that will apply to all projects used by the operating system user account.  [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config.md) is an example configuration that contains a set of well-formed aliases that adds common tools for any Clojure project.

??? Hint "Clojure CLI User Configuration Location"
    Clojure CLI tools creates a configuration directory called `.clojure`, which [by default](https://clojure.org/reference/deps_and_cli#_deps_edn_sources) is placed in the root of the operating system user account directory, e.g. `$HOME/.clojure`.

    `XDG_CONFIG_HOME` may be set by your operating system and over-rides the default location, e.g. `$HOME/.config/.clojure`

    `CLJ_CONFIG` can be used to over-ride all other location settings

    Run `clojure -Sdescribe` in a terminal and checking the `:user-config` value to see the location of your Clojure configuration directory


### User deps.edn configuration

A basic example of a user configuration for Clojure CLI

```clojure
{
  :aliases {
    :env/test {:extra-paths ["test"]}

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


## Which version of Clojure

Evaluate `*clojure-version*` in a REPL shows which version of the Clojure language is currently being used.

Including `org.clojure/clojure` in the project `deps.edn` file allows specification of a particular version of the Clojure language.  The Clojure CLI also has a default version of the Clojure dependency, which is used if no other dependency is specified.


## References

* [deps and cli](https://clojure.org/reference/deps_and_cli)
