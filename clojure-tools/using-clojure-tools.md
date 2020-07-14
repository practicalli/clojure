# Using Clojure tools
The `clojure` command provided by Clojure tools can be used to evaluate code, run Clojure applications and start a command line REPL.


* [rebel REPL UI](rebel-repl/) a fully featured Clojure command line REPL user interface
* [deps.edn configuration](clojure-tools/deps-edn-configuration.md)
* [deps.edn aliases](clojure-tools/deps-edn-aliases.md)


Clojure CLI tools can also be used for [evaluating an expressions](/alternative-tools/clojure-tools/evaluating-an-expression.md) or [running Clojure from files as scripts](/alternative-tools/clojure-tools/files-and-scripts.md), although these approaches are less common.


## Editors and Clojure tools
Clojure code is developed using a [clojure aware editor](/clojure-editors/) which uses the `clojure` command to start a REPL session, so code can be written and evaluated from the editor.  Editors also provide features including structured editing, autocompletion, linting and running unit tests.

The editor connects to the REPL (via nREPL or SocketREPL) which evaluates any code expressions sent to the REPL and returns the results instantly in the editor.

<!-- Not sure this is the right place for these, but cant find anywhere better yet -->
## Other tools
The [Clojure Inspector](clojure-tools/clojure-inspector.md) provides a simple GUI tool to show to show the result from evaluating Clojure code.

The [REBL data browser](clojure-tools/rebl-data-browser.md) show the results in a GUI of any Clojure code that is evaluated as you are developing.


## What version of Clojure CLI tools are installed?
The `deps.edn` file allows you to specify a particular version of the Clojure language the REPL and project use.  You can also evaluate `*clojure-version*` in a REPL to see which version of the Clojure language is being used.

`clojure -Sdescribe` will show you the version of the Clojure CLI tools that is currently installed.

![clojure cli tools - describe install version](/images/clojure-cli-tools-install-version-describe.png)

> `clojure -Sverbose` will also show the version of Clojure CLI tools used and then run a REPL
