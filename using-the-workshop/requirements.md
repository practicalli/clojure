# Requirements

  There are just a few requirements for this workshop. Please test you have the following tools working at the version numbers suggested (or greater):
  
  * Java runtime environment (JRE) version 1.8 - test with `java -version` in a command line window
  * [Leiningen](http://leiningen.org/) version 2.6 - test with `lein version` in a command line window
  * A Clojure aware editor with REPL, either:
    - [LightTable](http://lighttable.com/) version 8 **(recommended for beginners)**
    - [Emacs](http://www.gnu.org/software/emacs/) 24.4.x & [Spacemacs](http://spacemacs.org/) 0.105.19
  * A [Git client](http://git-scm.com/) version 2.7.x (optional - to download code examples)

## Setting up your enviornment
  See the section on Clojure [Development Environments](/development-environments/) for details on how to set these tools up.


> **Hint** You may notice that there is no actual Clojure installation.  Clojure is a library that is added to the project, just like any other dependency (ie. in Maven, Gradle, etc).

> The Clojure library is very small and Leiningen caches it and oll other libraries locally in the same folder structure that Maven uses, eg ` ~/.m2/repository/`

