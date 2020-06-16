# Clojure CLI Tools overview

Clojure CLI tools provide:
* Running an interactive REPL (Read-Eval-Print Loop)
* Running Clojure programs
* Evaluating Clojure expressions
* Managing dependencies via tools.deps

Clojure CLI tools allow you to use other libraries to, referred to as dependencies or 'deps'. These may be libraries you are writing locally, projects in git (e.g. on GitHub) or libraries published to Maven Central or [Clojars](https://clojars.org/).

The Clojure CLI tools can cover the essential features of Clojure Build tools Leiningen and Boot, but are not designed as a complete replacement.  Both these build tools are mature and may have features you would otherwise need to script in Clojure CLI tools.


Clojure is packaged as a complete library, a Java Virtual machine JAR file, that is simply included in the project like any other library you would use.

## Hosted Language
Clojure is a hosted language and requires a Java runtime environment (Java JRE or SDK) and I recommend installing this from [Adopt OpenJDK](https://adoptopenjdk.net/).  Installation guides for Java are covered on the [ClojureBridge London website](https://clojurebridgelondon.github.io/workshop/development-tools/java.html)

The [Clojure.org getting started guide](https://clojure.org/guides/getting_started) covers instructions for Linux and MacOXS operating systems.  There is also an early access release of clj for windows
