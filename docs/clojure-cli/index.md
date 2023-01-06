# Clojure and Clojure CLI

Clojure CLI (command line interface) is the latest approach to working with Clojure projects, libraries an tools.  The Clojure CLI focuses on:

* running Clojure code (applications and tools)
* starting a REPL process (Read-Eval-Print Loop) for interactive development with a [Clojure editor](/clojure-editors/) or [a command line REPL UI](rebel-repl/).
* managing dependencies (via tools.deps) and downloads from Maven and Git repositories

The Clojure CLI is extended by adding aliases for community libraries and tools, e.g. [practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }})

<!-- TODO: Clojure CLI overview - short video showing common aliases being used -->
<!-- - clojure -T:project/new ,,, -->
<!-- - clojure without an alias (basic repl) -->
<!-- - clojure -M:repl/rebel (rich terminal UI for the REPL) - require and write code & eval, function signature, docs, run tests - not found. - refer to detailed video of rebel readline -->
<!-- - clojure -M:env/test:repl/rebel (include a test path) - run tests with (run-tests 'namespace.name) -->
<!-- - clojure -M:env/dev:lib/hotload:env/test:repl/rebel (rich terminal UI with hotload libraries) -->
<!-- - clojure -X:test/watch (Kaocha test runner in watch mode - edit unit tests) -->
<!-- - clojure -X:deps list -->
<!-- - clojure -M:project/find-deps library-name -->
<!-- - clojure -X:deps find-versions -->
<!-- - clojure -T:project/outdated - check dependencies are at most recent version -->

{% youtube %}
https://youtu.be/u5VoFpsntXc
{% endyoutube %}


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

Clojure CLI can also be used for [evaluating an expressions](/alternative-tools/clojure-cli/evaluate-an-expression.md) or [running Clojure from files as scripts](/alternative-tools/clojure-cli/files-and-scripts.md), although these approaches are less common.

`clojure -M:lib/hotload:repl/rebel` runs a rich terminal UI REPL which can [use add-libs to hotload dependencies into a running REPL process](/alternative-tools/clojure-cli/hotload-libraries.md).


## Clojure CLI version

`clojure -Sdescribe` shows the version of Clojure CLI currently installed.

![clojure cli tools - describe install version](/images/clojure-cli-tools-install-version-describe.png)

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


> #### Hint::Which flag to use?
> The `-M` flag is used when calling a `-main` function from a specified namespace. Arguments can be passed as free-form string options.
>
> The `-X` flag is used to call a fully qualified function, which can be any function on the command line. Arguments are passed as key/value pairs and strings / collection syntax should be escaped with single quotes.  `-X` can use `:replace-deps` and `:replace-paths` values to remove project `:deps` and `:paths`
>
> `-T` flag removes project paths and deps, so is run independent of a Clojure project configuration.  Tools can be installed and referred to by name, or used via an alias name and have default configuration attached.
>
> Read the article: [Clojure CLI - which execution option to use](https://practical.li/blog/posts/clojure-which-execution-option-to-use/)


## Which version of Clojure

Evaluate `*clojure-version*` in a REPL shows which version of the Clojure language is currently being used.

Including `org.clojure/clojure` in the project `deps.edn` file allows specification of a particular version of the Clojure language.  The Clojure CLI also has a default version of the Clojure dependency, which is used if no other dependency is specified.
