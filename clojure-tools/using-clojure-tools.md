# Using Clojure tools
The `clojure` command provided by Clojure tools can be used to evaluate code, run Clojure applications and start a command line REPL.

Clojure tools on the command line can be used for [evaluating an expressions](evaluating-an-expression.md) or [running Clojure from files as scripts](files-and-scripts.md).

* [Configuration files for Clojure tools](configuration-files.md)
* [aliases](clojure-tools/aliases.md)
* [rebel - running a fully featured Clojure REPL on the command line](rebel-repl/)


## Editors and Clojure tools
Clojure code is developed using a [clojure aware editor](/clojure-editors/) which uses the `clojure` command to start a REPL service.

The editor connects to the REPL (via nREPL or SocketREPL) which evaluates any code expressions sent to the REPL and returns the results instantly in the editor.

<!-- Not sure this is the right place for these, but cant find anywhere better yet -->
## Other tools
The [Clojure Inspector](clojure-tools/clojure-inspector.md) provides a simple GUI tool to show to show the result from evaluating Clojure code.

The [REBL data browser](clojure-tools/rebl-data-browser.md) show the results in a GUI of any Clojure code that is evaluated as you are developing.


## What version of Clojure CLI tools are installed?
The `deps.edn` file allows you to specify a particular version of the Clojure language the REPL and project use.  You can also evaluate `*clojure-version*` in a REPL to see which version of the Clojure language is being used.

`clj -Sdescribe` will show you the version of the Clojure CLI tools that is currently installed.

![clojure cli tools - describe install version](/images/clojure-cli-tools-install-version-describe.png)

> `clj -Sverbose` will also show the version of Clojure CLI tools used before it runs a REPL
