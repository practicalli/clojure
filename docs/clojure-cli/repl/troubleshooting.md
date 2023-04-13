# Troubleshooting the REPL

The aspects to consider when a REPL process fails to run are:

* Some code expressions are not correct
* Dependencies are not available
* Project (or editor) misconfigured


## Code expression failing

All code in the project must compile and be syntactically correct, even if that code is in a rich `(comment ,,,)` block.

A Clojure expression following a Reader comment, `#_` does not have to compile, however it must be syntactically correct, i.e. balanced parentheses.

Add a line comment, `;;`, to any code that is suspected of not compiling or being syntactically incorrect (or delete that code).


## Editor REPL fails to start

If using a **jack-in** approach with the editor to start the repl, run a terminal UI REPL with an nREPL server and try connecting to that REPL from the editor.

[Clojure CLI repl - rebel terminal UI](/clojure/clojure-cli/repl/coding/){target=_blank .md-button}

```bash
clojure -M:repl/rebel
```

Then require the main namespace and see if there are issues, optionally using :verbose to see which libraries are being loaded.

```clojure
(require '[practicalli.service] :verbose)
```

If the REPL runs correctly, it is likely the editor configuration is missing something or is incorrect.  Check the configuration for running a Clojure project with the editor.


## Terminal UI REPL fails in project

If the REPL does not run correctly or the namespace fails to load, run a repl without any extra development dependencies (tooling, dev libraries, etc) and load the main namespace

```shell
clj
```

## REPL doesnt start in any project

Run the `clojure` command in a directory that is not part of any existing Clojure project.  This will run the REPL with only the `org.clojure/clojure` dependency

Run `clojure -Sdescribe` to check that the Clojure CLI is using the correct configuration files and is the expected version.

If a REPL prompt appears, then Clojure CLI is working.  If a REPL prompt does not appear, then reinstall the Clojure CLI or upgrade to a newer version.

[Clojure CLI install - Practicalli Guide](/clojure/install/clojure-cli.md){target=_blank .md-button}


## REPL starts but requiring code fails

Creating a new project is a fast way to check development tooling is working correctly.  A project can be created with `clojure -T:project/create` (with [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](/clojure/install/clojure-cli/) installed)

If a REPL process starts correctly for a new project but not the existing project, then its most likely one or more expressions in the existing project that are causing an error or the project `deps.edn` configuration.

Copy the `deps.edn` configuration from the existing project to the root of the new project (or just the `:deps` section of the `deps.edn` configuration).  Run the REPL again using the `clojure` command.  If the REPL fails then it is likely an issue with the exiting projects `deps.edn` file or one of the dependencies


## Dependency issues

Projects typically depend on many other libraries and sometimes those libraries depend on other libraries too.

When running the `clojure` command to run a terminal UI REPL, libraries are retrieved from remote repositories (Maven Central, Clojars.org) and stored in a local cache `~/.m2/repositories`

If a dependency is not available then a warning should state which library cannot be downloaded and from which repository

Check the extent of the dependencies for the existing project:

```bash
clojure -Stree
```

Use the antq tool to check for a newer version of a dependency

```bash
clojure -T:project/outdated
```

> If libraries are likely to become unavailable (i.e. old versions) then consider creating a local repository service with Artefactory or Nexus, which can share library depenencies between development teams of an organisation.
