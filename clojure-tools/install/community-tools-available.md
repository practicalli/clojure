## Community tools available
Once practicalli/clojure-deps-edn user wide configuration is installed, the following tools and aliases are available.

[REPL experience](#repl-experience) | [Projects](#clojure-projects) | [Java sources](#java-sources) | [Databases](#databases-and-drivers) | [Data Inspectors](#data-inspectors) | [Middleware](#middleware) | [Clojure Spec](#clojure-specification) | [Unit Testing](#unit-testing-frameworks) | [Test runners](#test-runners-and-test-coverage-tools) | [Lint tools](#lint-tools) | [Visualize vars and deps](#visualizing-project-vars-and-library-dependencies) | [Performance testing](#performance-testing)


## REPL experience
[Rebel readline](https://github.com/bhauman/rebel-readline) provides a feature rich REPL experience, far beyond the basic `clojure` and `clj` commands.

| Command                            | Description                                                                                                    |
|------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `clojure -M:repl/rebel`            | Run a Clojure REPL using Rebel Readline                                                                        |
| `clojure -M:alias:repl/rebel`      | Run a Clojure REPL using Rebel Readline, including deps and path from alias                                    |
| `clojure -M:env/dev:repl/rebel`    | Run a Clojure REPL using Rebel Readline, including deps and path from `:env/dev` alias to configure REPL start |
| `clojure -M:repl/rebel-nrepl`      | Run a Clojure REPL using Rebel Readline, starting an nREPL server                                              |
| `clojure -M:repl/rebel-cljs`       | Run a ClojureScript REPL using Rebel Readline                                                                  |
| `clojure -M:alias:repl/rebel-cljs` | Run a ClojureScript REPL using Rebel Readline, including deps and path from alias                              |

`:repl/help` in the REPL for help and available commands.  `:repl/quit` to close the REPL.


## Clojure Projects
- Create projects from deps, leiningen and boot templates with [clj-new](https://github.com/seancorfield/clj-new)
- Check and update project dependencies
- Package projects as jar and uberjars
- Deploy projects locally and to Clojars

### Create new projects from templates
Create a new project using a wide range of templates from the community

| Command                                                                                   | Description                                          |
|-------------------------------------------------------------------------------------------|------------------------------------------------------|
| `clojure -X:project/new`                                                                  | library project called playground                    |
| `clojure -X:project/new :name practicalli/my-library`                                     | library project with given name                      |
| `clojure -X:project/new :template app :name practicalli/my-application`                   | App project with given name                          |
| `clojure -X:project/new :template luminus :name practicalli/full-stack-app +http-kit +h2` | Luminus project with given name and template options |


### Running projects
Run project with or without an alias:
```bash
clojure -M:alias -m domain.app-name
clojure -M -m domain.app-name
```

> The `-M` flag is required even if an alias is not included in the running of the application.  A warning will be displayed if the `-M` option is missing.

In the project deps.edn file it could be useful to define an alias to run the project, specifying the main namespace, the function to run and optionally any default arguments that are passed to that function.

```clojure
:project/run
{:ns-default domain.main-namespace
 :exec-fn -main
 :exec-args {:port 8888}}
```
Then the project can be run using `clojure -X:project/run` and arguments can optionally be included in this command line, to complement or replace any default arguments in `exec-args`.

## Project dependencies

| Command                                              | Description                                               |
|------------------------------------------------------|-----------------------------------------------------------|
| `clojure -M:project/check`                           | detailed report of compilation errors for a project       |
| `clojure -M:project/find-deps library-name`          | fuzzy search Maven & Clojars                              |
| `clojure -M:project/find-deps -F:merge library-name` | fuzzy search Maven & Clojars and save to project deps.edn |
| `clojure -M:project/outdated`                        | report newer versions for maven and git dependencies      |
| `clojure -M:project/outdated-mvn`                    | check for newer dependencies (maven only)                 |


### Project packaging
Build a project archive file for deployment

| Command                                                  | Description                                                  |
|----------------------------------------------------------|--------------------------------------------------------------|
| `clojure -X:project/jar :main-class domain.app-name`     | package `project.jar` for deps.edn project (publish library) |
| `clojure -X:project/uberjar :main-class domain.app-name` | package `uber.jar` for deps.edn project (deploy application) |

Additionally specify `:jar` name and if ahead of time compilation should be used (default true)

```clojure
clojure -X:project/jar :jar '"practicalli.app.jar"' :aot false :main-class domain.app-name
```


### Project Deployment
Deploy a project archive file locally or to Clojars.org

| Command                                         | Description                                                              |
|-------------------------------------------------|--------------------------------------------------------------------------|
| `clojure -X:deps mvn-install project.jar`       | [NEW] deploy jar file to local maven repository, i.e. `~/.m2/repository` |
| `clojure -M:project/clojars project.jar`        | deploy jar file to Clojars                                               |
| `clojure -M:project/clojars-signed project.jar` | deploy signed jar file to Clojars                                        |

Set Clojars username/token in `CLOJARS_USERNAME` and `CLOJARS_PASSWORD` environment variables.

Set fully qualified artifact-name and version in project `pom.xml` file

Path to project.jar can also be set in alias to simplify the Clojure command.

> `clojure -X:deps mvn-install project.jar` for local deployment of jars is part of the 1.10.1.697 release of the [Clojure CLI tools](https://clojure.org/guides/getting_started) in September 2020.


## Java Sources
Include Java source on the  classpath to [look up Java Class and method definitions, e.g. `cider-find-var` in Emacs](https://practicalli.github.io/spacemacs/navigating-code/java-definitions.html)
Requires: Java sources installed locally (e.g. "/usr/lib/jvm/openjdk-11/lib/src.zip")

* `:lib/java8-source`
* `:lib/java11-source`

Use the aliases with either `-M` or `-X` flags on the Clojure command line.


## Databases and drivers
Databases and drivers, typically for development time inclusion such as embedded databases

* `:database/h2` - H2 embedded database library and next.jdbc

`clojure -M:database/h2` - run a REPL with an embedded H2 database and next.jdbc libraries

https://cljdoc.org/d/seancorfield/next.jdbc/CURRENT/doc/getting-started#create--populate-a-database

Use the aliases with either `-M` or `-X` flags on the Clojure command line.

## Data Inspectors
REPL driven data inspectors and `tap>` sources for visualizing data.


### [Portal](https://github.com/djblue/portal)
Navigate data in the form of edn, json and transit
[Practicalli Clojure -data browsers section - portal](https://practicalli.github.io/clojure/clojure-tools/data-browsers/portal.html)

| Command                          | Description                                           |
|----------------------------------|-------------------------------------------------------|
| `clojure -M:inspect/portal-cli`  | Clojure REPL with Portal dependency                   |
| `clojure -M:inspect/portal-web`  | ClojureScript web browser REPL with Portal dependency |
| `clojure -M:inspect/portal-node` | ClojureScript node.js REPL with Portal dependency     |

**Using Portal once running**
`(require '[portal.api :as portal])` once the REPL starts.  For `inspect/portal-web` use `(require '[portal.web :as portal])` instead

`(portal/open)` to open the web based inspector window in a browser.

`(portal/tap) `to add portal as a tap target (add-tap)

`(tap> {:accounts [{:name "jen" :email "jen@jen.com"} {:name "sara" :email "sara@sara.com"}]})` to send data to the portal inspector window (or any other data you wish to send)

`(portal/clear)` to clear all values from the portal inspector window.

`(portal/close)` to close the inspector window.


### [Reveal](https://vlaaad.github.io/reveal/) is a repl and data visualization tool
Reveal - read evaluate visualize loop.  A REPL with data visualisation.  Also used as a tap> source

* `inspector/reveal` - repl and data visualization tool
* `inspector/reveal-nrepl` - repl and data visualization tool with nrepl server, for connection from [Clojure aware editors](https://practicalli.github.io/clojure/clojure-editors/)

| Command                                      | Description                                                                        |
|----------------------------------------------|------------------------------------------------------------------------------------|
| `clojure -M:inspect/reveal`                  | start a Reveal repl with data visualization window (clojure.main)                  |
| `clojure -M:inspect/reveal-light`            | as above with light theme and large font                                           |
| `clojure -X:inspect/reveal`                  | start a Reveal repl with data visualization window (clojure exec)                  |
| `clojure -X:inspect/reveal-light`            | as above with light theme and large font                                           |
| `clojure -M:inspect/reveal:repl/rebel`       | Start a Rebel REPL with Reveal dependency. Add reveal as tap> source               |
| `clojure -M:inspect/reveal-light:repl/rebel` | Start a Rebel REPL with Reveal dependency & light theme. Add reveal as tap> source |

**Running different types of repl**

Using Clojure exec `-X` flag, the default repl function can be over-ridden on the command line, supplying the `io-prepl` or `remote-prepl` functions.

* `clojure -X:inspect/reveal io-prepl :title '"I am a prepl repl"`
* `clojure -X:inspect/reveal remote-prepl :title '"I am a remote prepl repl"'`

**Configure theme & font**

Add a custom theme and font via the `-J` command line option or create an alias using `:insepct/reveal-light` as an example.

```bash
clojure -M:inspect/reveal -J-Dvlaaad.reveal.prefs='{:theme :light :font-family "Ubuntu Mono" :font-size 32}'
```

**Rebel Readline & Reveal: Add Reveal as tap> source**

Evaluate `(add-tap ((requiring-resolve 'vlaaad.reveal/ui)))` when using Rebel Readline to add Reveal as a tap source, showing `(tap> ,,,)` expressions in the reveal window, eg. `(tap> (map inc [1 2 3 4 5]))`.

[Practicalli Clojure - data browsers section](/clojure-tools/data-browsers/reveal.md) has more details on using reveal.



## Middleware
Aliases for libraries that combine community tools and REPL protocols (nREPL, SocketREPL).

Run a REPL on the command line for access by `cider-connect-` commands, providing the require cider middleware libraries that are auto-injected in `cider-jack-in-` commands.

### nREPL
Use the aliases with either `-M` or `-X` flags on the Clojure command line.

| Command                             | Description                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| `clojure -M:middleware/nrepl`      | Run a Clojure REPL that includes nREPL server                                         |
| `clojure -M:middleware/cider-clj`  | Run a Clojure REPL that includes nREPL server and CIDER connection dependencies       |
| `clojure -M:middleware/cider-cljs` | Run a ClojureScript REPL that includes nREPL server and CIDER connection dependencies |



### Cognitect REBL with CIDER
Run the REBL REPL with nREPL server so editors such as CIDER and Calva can connect.

```bash
clojure -M:lib/cider-nrepl:inspect/rebl:middleware/nrebl
```

`cider-connect-clj` in Spacemacs / Emacs and CIDER successfully connects to the nREPL port and evaluated code is sent to REBL.

To start a REBL REPL from `cider-jack-in-clj` add a `.dir-locals.el` file to the root of a Clojure project. The `.dir-locals.el` configuration adds the nREBL aliases set via `cider-clojure-cli-global-options` and all other automatically injected configuration is disabled (to prevent those dependencies over-riding the nREBL aliases).
```
((clojure-mode . ((cider-preferred-build-tool . clojure-cli)
                  (cider-clojure-cli-global-options . "-M:lib/cider-nrepl:inspect/rebl:middleware/nrebl")
                  (cider-jack-in-dependencies . nil)
                  (cider-jack-in-nrepl-middlewares . nil)
                  (cider-jack-in-lein-plugins . nil)
                  (cider-clojure-cli-parameters . ""))))
```
* [REBL data visualization: run REBL with nREPL based editors](https://practicalli.github.io/clojure/clojure-tools/data-browsers/rebl-data-visualization.html#run-rebl-for-nrepl-based-editors)


## Clojure Specification
Clojure spec, generators and test.check

* `:lib/spec-test` - generative testing with Clojure test.check
* `:lib/spec2` - experiment with the next version of Clojure spec - alpha: design may change


## Unit Testing frameworks
Unit test libraries and configuration.  The Clojure standard library includes the `clojure.test` namespace, so no alias is required.

* `:env/test` - add `test` directory to classpath
* [`:lib/expectations`](https://github.com/clojure-expectations/clojure-test) - `clojure.test` with expectations
* [`:lib/expectations-classic`](https://github.com/clojure-expectations/expectations) - expectations framework

Use expectations in a project `clojure -M:test:expectations` or from the command line with a test runner, e.g. `clojure -M:lib/expectations:test/runner`


## Test runners and Test Coverage tools
Tools to run unit tests in a project which are defined under `test` path.

Run clojure with the specific test runner alias: `clojure -M:test-runner-alias`

| Command                            | Description                                                                       |
|------------------------------------|-----------------------------------------------------------------------------------|
| `clojure -M:test/cognitect`        | Cognitect Clojure test runner                                                     |
| `clojure -M:test/cljs`             | ClojureScript test runner (Olical)                                                |
| `clojure -M:test/runner`           | Kaocha - comprehensive test runner for Clojure (same as :test/kaocha)             |
| `clojure -M:test/kaocha`           | Kaocha - comprehensive test runner for Clojure                                    |
| `clojure -M:test/kaocha-cljs`      | Kaocha - comprehensive test runner for ClojureScript                              |
| `clojure -M:test/kaocha-cucumber`  | Kaocha - comprehensive test runner with BDD Cucumber tests                        |
| `clojure -M:test/kaocha-junit-xml` | Kaocha - comprehensive test runner with Junit XML reporting for CI dashboards & wallboards |
| `clojure -M:test/kaocha-cloverage` | Kaocha - comprehensive test runner with test coverage reporting                   |
| `clojure -M:test/midje`            | Midje test runner for BDD style tests                                             |
| `clojure -M:test/eftest`           | Fast Clojure test runner, pretty output, parallel tests                           |
| `clojure -M:test/coverage`         | Cloverage clojure.test coverage report                                            |


## Lint tools
Static analysis tools to help maintain code quality and suggest Clojure idioms.

| Command                    | Description                                      |
|----------------------------|--------------------------------------------------|
| `clojure -M:lint/kondo`    | comprehensive and fast static analysis lint tool |
| `clojure -M:lint/eastwood` | classic lint tool for Clojure                    |
| `clojure -M:lint/idiom`    | Suggest idiomatic Clojure code                   |


## Visualizing project vars and library dependencies
Create [Graphviz](https://www.graphviz.org/) graphs of project and library dependencies

Morpheus creates grahps of project vars and their relationships

* [`:graph/vars`](https://github.com/benedekfazekas/morpheus) - generate graph of vars in a project as a .dot file
* [`:graph/vars-png`](https://github.com/benedekfazekas/morpheus) - generate graph of vars in a project as a .png file using `src` and `test` paths
* [`:graph/vars-svg`](https://github.com/benedekfazekas/morpheus) - generate graph of vars in a project as a .svg file using `src` and `test` paths

> Install [Graphviz](https://www.graphviz.org/) to generate PNG and SVG images.  Or use the [Edotor website](https://edotor.net/) to convert .dot files to PNG or SVG images and select different graph layout engines.


[Vizns](https://github.com/SevereOverfl0w/vizns) creates graphs of relationships between library dependencies and project namespaces

* `:graph/deps`
* `:graph/deps-png` - generate a single deps-graph png image

Other options:
* `clojure -M:graph/deps navigate`  # navigable folder of SVGs
* `clojure -M:graph/deps single`    # deps-graph.dot file
* `clojure -M:graph/deps single -o deps-graph.png -f png`
* `clojure -M:graph/deps single -o deps-graph.svg -f svg`
* `clojure -M:graph/deps single --show `  # View graph without saving



## Performance testing
Performance testing tools for the REPL

* [:performance/benchmark](https://github.com/hugoduncan/criterium/)

Use the aliases with either `-M` or `-X` flags on the Clojure command line.

TODO: check these alias combinations are correct
```
clojure -M:performance/benchmark:repl/rebel

(require '[criterium.core :refer [bench quick-bench]])
(bench (adhoc-expression))
```


TODO: check these alias combinations are correct
Performance test a project in the REPL
```
clojure -M:performance/benchmark:repl/rebel

(require '[practicalli/namespace-name]) ; require project code
(in-ns 'practicalli/namespace-name)
(quick-bench (project-function args))
```


*  [:performance/memory-meter](https://github.com/clojure-goes-fast/clj-memory-meter) - memory usage

Use the aliases with either `-M` or `-X` flags on the Clojure command line.

In the REPL:
```
  (require '[clj-memory-meter.core :as memory-meter])
   (memory-meter/measure (your-expression))
```
