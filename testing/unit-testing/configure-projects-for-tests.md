# Configuration for Unit Testing deps.edn projects
[`clojure.test` namespace](https://clojure.github.io/clojure/clojure.test-api.html) is part of the Clojure standard library, so `org.clojure/clojure` is the only dependency required in the project configuration.

```clojure
{:deps {org.clojure/cloure {:mvn/version "1.10.3"}}}
```

Unit tests code should reside under the `test` directory of a project.  Project configuration should include the `test` path only during development or specific test runs.  The `test` directory should not be part of the main classpath used to package a project for deployment.

{% tabs practicalli="practicalli/clojure-deps-edn", deps="Manual deps.edn projects" %}

{% content "practicalli" %}

## practicalli clojure-deps-edn user level configuration

[practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdnInstall }}) user-level configuration contains several aliases for Clojure and ClojureScript test runners, each alias includes the `test` directory as an `:extra-path`.

`:env/test` alias is also provided, which simply adds the `test` directory to the class path. The `:env/test` alias is useful in concert with other aliases or for editors that have their own built in test runners (e.g. CIDER).


{% content "deps" %}
Add the following aliases to the Clojure CLI tools user wide configuration, (e.g. `~/.clojure/deps.edn`), or to the project `deps.edn` file.

## Alias to include the test directory
To use a test runners with a `deps.edn` projects, the `test` directory should be on the classpath.

The `test` directory should be included as an alias.  If the `test` path were in the main `paths` configuration of `deps.edn` then the unit tests would be included in the packaged project, i.e jar or uberjar.

practicalli/clojure-deps-edn defines an environment alias to include the test path.

```clojure
:aliases
{
  :env/test
  {:extra-paths ["test"]}
}
```

## Alias to run a Terminal UI REPL with nREPL support

Run a REPL using nREPL server for access by cider-connect-clj that also includes the `test` directory in the class path

An alias to run a REPL with nREPL support
```clojure
  :middleware/cider-clj
  {:extra-deps {nrepl/nrepl       {:mvn/version "0.8.3"}
                cider/cider-nrepl {:mvn/version "0.25.7"}}
   :main-opts  ["-m" "nrepl.cmdline"
                "--middleware" "[cider.nrepl/cider-middleware]"]}
```

Start a REPL process with nREPL server and Cider support libraries for Cider and Calva

```bash
clojure -M:middleware/cider-clj
```

## Alias to run a Rebel REPL with nREPL support
rebel readline with nrepl for editor connection to REPL

CIDER: run `cider-connect-clj` and expressions evaluated in rebel are also available from CIDER/Emacs/Spacemacs

```clojure
  :repl/rebel-nrepl
  {:extra-deps {nrepl/nrepl                {:mvn/version "0.8.3"}
                cider/cider-nrepl          {:mvn/version "0.25.7"}
                com.bhauman/rebel-readline {:mvn/version "0.1.4"}}
   :main-opts  ["-m" "nrepl.cmdline"
                "--middleware" "[cider.nrepl/cider-middleware]"
                "-i"
                "-f" "rebel-readline.main/-main"]}
```

Start a REPL process with Rebel terminal UI, with nREPL server and Cider support libraries for Cider and Calva.

```bash
clojure -M:repl/rebel-nrepl
```

{% endtabs %}

## Cognitect labs Clojure test runner
`:test/cognitect` is a simple to use test runner for Clojure projects.

```clojure
clojure -M:test/cognitect
```

## kaocha unit test and clojure spec runner
`:test-runner/kaocha` alias unit test runner that also supports Clojure Spec functional tests.  the kaocha test runner on the current project.  Add a `test.edn` file to configure which tests are run by kaocha.
```bash
clojure -M:test/kaocha
```


## Cider Test Runner
Cider test runner is a convenient way to run Clojure unit tests using the REPL.  The `test` directory must be included in the classpath when running the REPL.

`:env/test` alias will add the `test` directory, which Cider test runner requires to locate the test code.

`:middleware/cider-clj` includes the nrepl and cider-nrepl libraries and starts an nREPL server connected to the REPL

Use `cider-connect` to connect to the Clojure REPL process started in a terminal window with the following command:

```bash
clojure -M:env/test:middleware/cider-clj
```

Use the `:repl/rebel-nrepl` alias to also run a Rebel UI for the REPL in the terminal.

```bash
clojure -M:env/test:repl/rebel-nrepl
```

Alternatively, use `cider-jack-in` and create a [`.dir-locals.el` file to configure a default alias](https://practicalli.github.io/spacemacs/testing/unit-testing/cider-test-deps-edn-projects.html) when running deps.edn projects from Emacs CIDER / Spacemacs.

```lisp
((clojure-mode . ((cider-clojure-cli-aliases . ":env/test"))))
```

Ensure the `.dir-locals.el` file is loaded using `revert-buffer` on an existing project buffer or open a new file from the project.


## References
* [Leiningen project configuration for unit testing](/alternative-tools/leiningen/testing/configure-project.md)
* [lambdaisland/kaocha](/testing/test-runners/kaocha-test-runner.md) is a test runner that supports Clojure CLI, Leiningen and Boot project configuration.
