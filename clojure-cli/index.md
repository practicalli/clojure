# Clojure and Clojure CLI

Clojure CLI is the latest approach to working with Clojure projects, libraries an tools.  Its main focus is on

* run Clojure code (applications and tools)
* run a REPL process (Read-Eval-Print Loop) for interactive development with a [Clojure editor](/clojure-editors/) or [a command line REPL UI](rebel-repl/).
* managing dependencies (via tools.deps) and download from maven and git repositories

The Clojure CLI is extended by adding aliases for community libraries and tools, e.g. [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }})

{% youtube %}
https://youtu.be/u5VoFpsntXc
{% endyoutube %}


## Common tasks for Clojure development
Commands to use for common tasks and where their aliases are included in Clojure CLI tools or require an alias (either in a project or user-wide deps.edn file).

| Task                                       | Command                                                 | Built-in  |
|--------------------------------------------|---------------------------------------------------------|-----------|
| Run Command Line REPL                      | `clojure` or `clj` if `rlwrap` binary installed         | Yes       |
| Run Command Line REPL with Rebel and nREPL | `clojure -M:repl/rebel`                                 | Add alias |
| Create project (clojure exec)              | `clojure -X:new :template app :name practicalli/my-app` | Add alias |
| Download dependencies                      | `clojure -P`  (plus optional aliases)                   | Yes       |
| Run the project (clojure.main)             | `clojure -M -m domain.main-namespace`                   | Yes       |
| Run the project (clojure.exec)             | `clojure -X:project/run -m domain.main-namespace`       | Add alias |
| Find libraries (mvn & git)                 | `clojure -M:project/find-deps library-name`             | Add alias |
| Check for new dependency versions          | `clojure -T:project/outdated`                           | Add alias |
| Run tests                                  | `clojure -M:test/runner`                                | Add alias |
| Package library                            | `clojure -X:project/jars`                               | Add alias |
| Deploy library locally                     | `clojure -X:deps mvn-install`                           | Yes       |
| Package application                        | `clojure -X:project/uberjar`                            | Add alias |

Clojure CLI can also be used for [evaluating an expressions](/alternative-tools/clojure-tools/evaluate-an-expression.md) or [running Clojure from files as scripts](/alternative-tools/clojure-tools/files-and-scripts.md), although these approaches are less common.


## What version of Clojure CLI tools are installed?

`clojure -Sdescribe` will show you the version of the Clojure CLI tools that is currently installed.

![clojure cli tools - describe install version](/images/clojure-cli-tools-install-version-describe.png)

> `clojure -Sverbose` will also show the version of Clojure CLI tools used and then run a REPL


## Clojure CLI main flag options

The most used execution option flags for the `clojure` command

| Flag            | Purpose                                                  | Config used                                          |
|-----------------+----------------------------------------------------------+------------------------------------------------------|
| `-M`            | Run Clojure project with clojure.main                    | deps, path, `:main-opts` & command line args         |
| `-P`            | Prepare / dry run (CI servers, Containers)               | deps, path                                           |
| `-P -M:aliases` | Prepare / dry run including alias deps and paths         | deps, path                                           |
| `-P -X:aliases` | Prepare / dry run including alias deps and paths         | deps, path                                           |
| `-X`            | Execute a qualified function, optional default arguments | deps, path, `:exec-fn`, `:exec-args` & :key val args |
| `-T`            | Run a tool independently from a project configurationnts | `:exec-fn`, `:exec-args` & :key val args             |
| `-J`            | Java Virtual Machine specific options (heap size, etc)   |                                                      |

* deps = `:deps`, `:extra-deps`, `replace-deps`
* path = `:path`, `:extra-paths`, `replace-paths`

> #### Hint::Which flag to use?
> The -M flag should work with all community tools, at they are typically support the Clojure.main approach with free-form string options as arguments.
>
> The `-X` flag should be used for the new built-in aliases and for any tools supporting Clojure exec approach, with arguments passed as key/value pairs.
> More tools should start adopting the `-X` flag and supporting key/value arguments in future.

## Which version of Clojure

Evaluate `*clojure-version*` in a REPL to see which version of the Clojure language is currently being used.

Including `org.clojure/clojure` in either a project or user level `deps.edn` file allows specification of a particular version of the Clojure language to use.  The Clojure CLI also has a default version of the Clojure dependency, which is used if no other dependency is specified.
