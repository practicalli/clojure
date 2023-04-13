# Practicalli Clojure CLI Configuration

[:fontawesome-solid-book-open: Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-deps-edn){target=_blank .md-button}

[:fontawesome-solid-book-open: Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-deps-edn){target=_blank} is a user configuration for Clojure CLI tools providing a range of community tools via meaningful aliases, supporting Clojure and ClojureScript development.

Alias names are designed with qualified keywords that provide context for the use of an alias (`env`, `inspect`, `project`, `repl`, `search` `test`). These keywords help with discovery and reduce cognitive load required to remember their purpose.

Commonly used arguments are included in many alias via `:main-opts` or `:exec-args` which can be overridden on the command line.

??? INFO "Minimum Clojure CLI Version - 1.10.3.1040"
    Clojure CLI version 1.10.3.1040 is the minimum version, although the latest available version is recommended.

    Check the version of Clojure CLI currently installed via `clojure --version` or `clojure -Sdescribe`


??? HINT "Remote Environments or Continuous Integration"
    For remote environments or [Continuous Integration services](/continuous-integration/), include [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-deps-edn){target=_blank}) in the environment build or copy specific aliases to the Clojure project `deps.edn` configuration.


## Install

Fork or clone [:fontawesome-brands-github: Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-cli-config){target=_blank} GitHub repository, first removing the `$XDG_CONFIG_HOME/clojure` or `$HOME/.clojure` directory if they exist.

??? HINT "Check Clojure CLI configuration location"
    Check the location of your Clojure configuration directory by running `clojure -Sdescribe` and checking the `:user-config` value.


=== "Free Desktop XDG CONFIG"
    If `XDG_CONFIG_HOME` environment variable is set, clone the repository to `$XDG_CONFIG_HOME/clojure`

    ```shell
    git clone https://github.com/practicalli/clojure-deps-edn.git $XDG_CONFIG_HOME/clojure
    ```

=== "Classic Config"
    Clojure CLI will look for its configuration in `$HOME/.clojure` directory if `$XDG_CONFIG_HOME` and `CLJ_CONFIG` environment variables not set.

    ```shell
    git clone https://github.com/practicalli/clojure-deps-edn.git $HOME/.clojure
    ```


## Community Tools

The Clojure configuration directory contains a `deps.edn` file containing a substantial `:aliases` section with a long list of aliases.  These aliases are described in the [:fontawesome-brands-github: README of the project](https://github.com/practicalli/clojure-cli-config).

All tools are provided via libraries and are only installed on first use.  Unused aliases will therefore not install their libraries.

!!! HINT "Aliases to start with"
    Start with the following aliases to keep things simple

    `clojure -T:project/create :name domain/project-name` to create a new clojure project

    `clojure -M:repl/reloaded` to run a fully loaded REPL and rich terminal UI (which can be connected to from Clojure editors)

    `clojure -X:test/watch` to run tests on file save (or `:test/run` to manually run tests once)

    Use [Clojure tools.build](/clojure/clojure-cli/projects/tools-build/) to create jar and uberjar packages of the project.


### REPL experience

[Rebel REPL terminal UI](/clojure/clojure-cli/repl/) provides a feature rich REPL prompt experience, far beyond the basic `clj` command.

| Command                            | Description                                                                               |
|------------------------------------|-------------------------------------------------------------------------------------------|
| `clojure -M:repl/rebel`            | Rebel terminal UI                                                                         |
| `clojure -M:env/dev:repl/rebel`    | Rebel including deps & path from `:env/dev` alias to configure REPL start                 |
| `clojure -M:repl/reloaded`         | Rebel with `dev` & `test` paths, library hotload, namespace reload, portal data inspector |
| `clojure -M:repl/rebel-cljs`       | Run a ClojureScript REPL using Rebel Readline                                             |

`:repl/help` in the REPL for help and available commands.  `:repl/quit` to close the REPL.


### Clojure Projects

- Create Clojure CLI specific projects using [deps-new](https://github.com/seancorfield/deps-new)
- Create projects from deps, leiningen and boot templates with [clj-new](https://github.com/seancorfield/clj-new)

| Command                                                                                   | Description                                          |
|-------------------------------------------------------------------------------------------|------------------------------------------------------|
| `clojure -T:project/create`                                                               | library project called playground                    |
| `clojure -T:project/create :template app :name practialli/service`                        | Clojure CLI project from app template                |
| `clojure -T:project/new :template luminus :name practicalli/full-stack-app +http-kit +h2` | Luminus project with given name and template options |


### Run projects

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


### Project dependencies

| Command                                             | Description                                               |
|-----------------------------------------------------|-----------------------------------------------------------|
| `clojure -M:project/errors`                         | detailed report of compilation errors for a project       |
| `clojure -M:search/libraries library-name`          | fuzzy search Maven & Clojars                              |
| `clojure -M:search/libraries -F:merge library-name` | fuzzy search Maven & Clojars and save to project deps.edn |
| `clojure -M:search/outdated`                        | report newer versions for maven and git dependencies      |
| `clojure -M:search/unused-vars`                     | search and remove unused vars                             |


### Project Deployment

Deploy a project archive file locally or to Clojars.org

!!! INFO "Package projects into jars using tools.build"
    [Clojure tools.build](/clojure/clojure-cli/projects/tools-build/) is the recommended way to create library jar files and application Uberjar files.

| Command                                         | Description                                                              |
|-------------------------------------------------|--------------------------------------------------------------------------|
| `clojure -X:deps mvn-install project.jar`       | [NEW] deploy jar file to local maven repository, i.e. `~/.m2/repository` |
| `clojure -M:project/clojars project.jar`        | deploy jar file to Clojars                                               |
| `clojure -M:project/clojars-signed project.jar` | deploy signed jar file to Clojars                                        |

Set Clojars username/token in `CLOJARS_USERNAME` and `CLOJARS_PASSWORD` environment variables.

Set fully qualified artifact-name and version in project `pom.xml` file

Path to project.jar can also be set in alias to simplify the Clojure command.

> `clojure -X:deps mvn-install project.jar` for local deployment of jars is part of the 1.10.1.697 release of the [Clojure CLI tools](https://clojure.org/guides/getting_started) in September 2020.


### Java Sources

Include Java source on the  classpath to [look up Java Class and method definitions, e.g. `cider-find-var` in Emacs](https://practicalli.github.io/spacemacs/navigating-code/java-definitions.html)
Requires: Java sources installed locally (e.g. "/usr/lib/jvm/openjdk-11/lib/src.zip")

* `:lib/java17-source`

Use the aliases with either `-M` or `-X` flags on the Clojure command line.


### Format tools

Use formatting tools to support a consistent code style across all Clojure projects

| Command                                         | Description                        |
|-------------------------------------------------|------------------------------------|
| `clojure -M:format/cljstyle check / fix`        | Check or fix code style (cljstyle) |
| `clojure -M:format/cljfmt check / fix`          | Check or fix code style (cljfmt)   |
| `clojure -M:format/zprint filename`             | Format file using zprint           |

> Include `:lib/pprint-sorted` when starting a REPL to pretty print data with sorted keys and set values



### Databases and drivers

Databases and drivers, typically for development time inclusion such as embedded databases

* `:database/h2` - H2 embedded database library and next.jdbc
* `lib/next.jdbc` - include the next.jdbc library

`clojure -M:database/h2` - run a REPL with an embedded H2 database and next.jdbc libraries

https://cljdoc.org/d/seancorfield/next.jdbc/CURRENT/doc/getting-started#create--populate-a-database

Use the aliases with either `-M` or `-X` flags on the Clojure command line.


### Data Science

* `lib/clerk` - [Clerk Notebooks](https://github.com/nextjournal/clerk)


### Visualizing projects

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


### Data Inspector

[Portal](https://github.com/djblue/portal) Navigate data in the form of edn, json and transit

[Practicalli Clojure - data browsers section - portal](https://practicalli.github.io/clojure/clojure-cli/data-browsers/portal.html)

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


### Clojure Specification

Clojure spec, generators and test.check

* `:lib/spec-test` - generative testing with Clojure test.check
* `:lib/spec2` - experiment with the next version of Clojure spec - alpha: design may change


### Unit Testing frameworks

Unit test libraries and configuration.  The Clojure standard library includes the `clojure.test` namespace, so no alias is required.

* `:env/test` - add `test` directory to classpath
* [`:lib/expectations`](https://github.com/clojure-expectations/clojure-test) - `clojure.test` with expectations
* [`:lib/expectations-classic`](https://github.com/clojure-expectations/expectations) - expectations framework

Use expectations in a project `clojure -M:test:expectations` or from the command line with a test runner, e.g. `clojure -M:lib/expectations:test/runner`


### Test runners and Test Coverage

Tools to run unit tests in a project which are defined under `test` path.

Run clojure with the specific test runner alias: `clojure -M:test-runner-alias`

| Command                            | Description                                                                   |
|------------------------------------|-------------------------------------------------------------------------------|
| `clojure -M:test/run`              | Kaocha test runner for Clojure                                                |
| `clojure -M:test/watch`            | Kaocha: watch for changes                                                     |
| `clojure -M:test/cljs`             | Kaocha test runner for ClojureScript                                          |


### Lint tools

Static analysis tools to help maintain code quality and suggest Clojure idioms.

| Command                     | Description                                      |
|-----------------------------|--------------------------------------------------|
| `clojure -M:lint/clj-kondo` | comprehensive and fast static analysis lint tool |
| `clojure -M:lint/eastwood`  | classic lint tool for Clojure                    |
| `clojure -M:lint/idiom`     | Suggest idiomatic Clojure code                   |


### Performance testing

Performance testing tools for the REPL

* [:performance/benchmark](https://github.com/hugoduncan/criterium/)

Use the aliases with either `-M` or `-X` flags on the Clojure command line.

> `:dev/reloaded` and `:repl/reloaded` both include criterium library as well


```shell
clojure -M:performance/benchmark:repl/rebel

(require '[criterium.core :refer [bench quick-bench]])
(bench (adhoc-expression))
```

Performance test a project in the REPL

```shell
clojure -M:performance/benchmark:repl/rebel

(require '[practicalli/namespace-name]) ; require project code
(in-ns 'practicalli/namespace-name)
(quick-bench (project-function args))
```

Use the aliases with either `-M` or `-X` flags on the Clojure command line.

In the REPL:
```clojure
  (require '[clj-memory-meter.core :as memory-meter])
   (memory-meter/measure (your-expression))
```
