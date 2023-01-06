# Clojure Tools overview

## Adding Libraries of code
Clojure CLI tools allow you to use other libraries to, referred to as dependencies or 'deps'. These may be libraries you are writing locally, projects in git (e.g. on GitHub) or libraries published to Maven Central or [Clojars](https://clojars.org/).

Clojure is packaged as a complete library, a Java Virtual machine JAR file (zip file format), that is simply included in the project like any other library you would use.

## Hosted Language
Clojure is a hosted language and requires a [Java runtime environment](https://adoptopenjdk.net/).

When Clojure expressions are evaluated, the Clojure code is turned into Java Bytecode and run in the Java Virtual Machine.  This process happens in the background and the developer is not exposed to a separate code-compile-run cycle.

Installing Clojure guides cover how to install Java 11 for various operating systems, although it may already be installed.
