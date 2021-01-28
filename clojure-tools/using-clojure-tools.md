# Using Clojure tools
The `clojure` command provided by Clojure CLI tools can be used to evaluate code, run Clojure applications and start a [command line REPL UI](rebel-repl/).

Clojure CLI tools are extended by adding aliases for community tools, eg. [as found in practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }})

{% youtube %}
https://youtu.be/u5VoFpsntXc
{% endyoutube %}


## Common tasks for Clojure development

| Task                               | Command                                                   | Built-in  |
|------------------------------------|-----------------------------------------------------------|-----------|
| Run a Command Line REPL            | `clojure` or `clj` if `rlwrap` binary installed           | Yes       |
| Run a Command Line REPL with Rebel | `clojure -M:repl/rebel`                                   | Add alias |
| Create project (clojure exec)      | `clojure -X:new :template app :name practicalli/my-app`   | Add alias |
| Create project (clojure main)      | `clojure -M:new app practicalli/my-app`                   | Add alias |
| Download dependencies              | `clojure -Spath` or `clojure -P`  (plus optional aliases) | Yes       |
| Run the project                    | `clojure -M -m domain.main-namespace`                     | Yes       |
| Run the project                    | `clojure -X:project/run -m domain.main-namespace`         | Add alias |
| Find libraries (mvn & git)         | `clojure -M:project/find-deps library-name`               | Add alias |
| Check for new dependency versions  | `clojure -M:project/outdated`                             | Add alias |
| Run tests                          | `clojure -M:test/runner`                                  | Add alias |
| Package library                    | `clojure -X:project/jars`                                 | Add alias |
| Deploy library locally             | `clojure -X:deps mvn-install`                             | Yes       |
| Package application                | `clojure -X:project/uberjar`                              | Add alias |

Clojure CLI tools can also be used for [evaluating an expressions](/alternative-tools/clojure-tools/evaluate-an-expression.md) or [running Clojure from files as scripts](/alternative-tools/clojure-tools/files-and-scripts.md), although these approaches are less common.


## Clojure CLI main flag options
The most used flags for the `clojure` command

| Flag            | Purpose                                                  | Config used                                          |
|-----------------|----------------------------------------------------------|------------------------------------------------------|
| `-M`            | Run Clojure project with clojure.main                    | deps, path, `:main-opts` & command line args         |
| `-P`            | Prepare / dry run (CI servers, Containers)               | deps, path                                           |
| `-P -M:aliases` | Prepare / dry run including alias deps and paths         | deps, path                                           |
| `-P -X:aliases` | Prepare / dry run including alias deps and paths         | deps, path                                           |
| `-X`            | Execute a qualified function, optional default arguments | deps, path, `:exec-fn`, `:exec-args` & :key val args |
| `-J`            | Java Virtual Machine specific options (memory size, etc) |                                                      |

* deps = `:deps`, `:extra-deps`, `replace-deps`
* path = `:path`, `:extra-paths`, `replace-paths`

> #### Hint::Which flag to use?
> The -M flag should work with all community tools, at they are typically support the Clojure.main approach with free-form string options as arguments.
>
> The `-X` flag should be used for the new built-in aliases and for any tools supporting Clojure exec approach, with arguments passed as key/value pairs.
> More tools should start adopting the `-X` flag and supporting key/value arguments in future.


## What version of Clojure CLI tools are installed?
The `deps.edn` file allows you to specify a particular version of the Clojure language the REPL and project use.  You can also evaluate `*clojure-version*` in a REPL to see which version of the Clojure language is being used.

`clojure -Sdescribe` will show you the version of the Clojure CLI tools that is currently installed.

![clojure cli tools - describe install version](/images/clojure-cli-tools-install-version-describe.png)

> `clojure -Sverbose` will also show the version of Clojure CLI tools used and then run a REPL
