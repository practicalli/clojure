# Using Clojure tools
The `clojure` command provided by Clojure CLI tools can be used to evaluate code, run Clojure applications and start a command line REPL.  The Clojure CLI tools are extended by adding aliases for community tools, eg. [as found in practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }})

* [rebel REPL UI](rebel-repl/) a fully featured Clojure command line REPL user interface
* [deps.edn configuration](deps-edn-configuration.md)
* [deps.edn aliases](deps-edn-aliases.md)


## Common tasks for Clojure development

| Task                              | Command                                                   | Built-in  |
|-----------------------------------|-----------------------------------------------------------|-----------|
| Create project (clojure exec)     | `clojure -X:new :template app :name practicalli/my-app`   | Add alias |
| Create project (clojure main)     | `clojure -M:new app practicalli/my-app`                   | Add alias |
| Download dependencies             | `clojure -Spath` or `clojure -P`  (plus optional aliases) | Yes       |
| Run the project                   | `clojure -M -m domain.main-namespace`                     | Yes       |
| Run the project                   | `clojure -X:project/run -m domain.main-namespace`         | Add alias |
| Find libraries (mvn & git)        | `clojure -M:project/find-deps library-name`               | Add alias |
| Check for new dependency versions | `clojure -M:project/outdated`                             | Add alias |
| Run tests                         | `clojure -M:test/runner`                                  | Add alias |
| Package library                   | `clojure -X:project/jars`                                 | Add alias |
| Deploy library locally            | `clojure -X:deps mvn-install`                             | Yes       |
| Package application               | `clojure -X:project/uberjar`                              | Add alias |

> #### Hint::Which flag to use?
> The -M flag should work with all community tools, at they are typically support the Clojure.main approach with free-form string options as arguments.
>
> The `-X` flag should be used for the new built-in aliases and for any tools supporting Clojure exec approach, with arguments passed as key/value pairs.
> More tools should start adopting the `-X` flag and supporting key/value arguments in future.


Clojure CLI tools can also be used for [evaluating an expressions](/alternative-tools/clojure-tools/evaluate-an-expression.md) or [running Clojure from files as scripts](/alternative-tools/clojure-tools/files-and-scripts.md), although these approaches are less common.


## Editors and Clojure tools
Clojure code is developed using a [clojure aware editor](/clojure-editors/) which uses the `clojure` command to start a REPL session, so code can be written and evaluated from the editor.  Editors also provide features including structured editing, autocompletion, linting and running unit tests.

The editor connects to the REPL (via nREPL or SocketREPL) which evaluates any code expressions sent to the REPL and returns the results instantly in the editor.

![Clojure REPL driven development with Clojure aware editors](https://raw.githubusercontent.com/jr0cket/developer-guides/master/clojure/clojure-repl-driven-development-clojure-aware-editor.png)

<!-- Not sure this is the right place for these, but cant find anywhere better yet -->
## Other tools
The [Clojure Inspector](clojure-tools/clojure-inspector.md) provides a simple GUI tool to show to show the result from evaluating Clojure code.

The [REBL data browser](clojure-tools/rebl-data-browser.md) show the results in a GUI of any Clojure code that is evaluated as you are developing.


## What version of Clojure CLI tools are installed?
The `deps.edn` file allows you to specify a particular version of the Clojure language the REPL and project use.  You can also evaluate `*clojure-version*` in a REPL to see which version of the Clojure language is being used.

`clojure -Sdescribe` will show you the version of the Clojure CLI tools that is currently installed.

![clojure cli tools - describe install version](/images/clojure-cli-tools-install-version-describe.png)

> `clojure -Sverbose` will also show the version of Clojure CLI tools used and then run a REPL
