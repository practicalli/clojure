# Clojure Tools overview
Clojure tools are the newer approach to working with Clojure.  These tools provide the ability to:

* evaluate Clojure expressions
* run Clojure programs
* run an interactive command line REPL (Read-Eval-Print Loop)
* managing dependencies (via tools.deps) and download from maven and git repositories

## Adding Libraries of code
Clojure CLI tools allow you to use other libraries to, referred to as dependencies or 'deps'. These may be libraries you are writing locally, projects in git (e.g. on GitHub) or libraries published to Maven Central or [Clojars](https://clojars.org/).

Clojure is packaged as a complete library, a Java Virtual machine JAR file (zip file format), that is simply included in the project like any other library you would use.

## Hosted Language
Clojure is a hosted language and requires a [Java runtime environment](https://adoptopenjdk.net/).

When Clojure expressions are evaluated, the Clojure code is turned into Java Bytecode and run in the Java Virtual Machine.  This process happens in the background and the developer is not exposed to a separate code-compile-run cycle.

Installing Clojure guides cover how to install Java 11 for various operating systems, although it may already be installed.


## Alternative tools
[Leiningen]({{ Leiningen }}) is a build automation tool for Clojure that as been widely used and extended via plugins.  Many existing projects use [Leiningen]({{ Leiningen }}), although many new projects are created with Clojure tools.
