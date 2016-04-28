# Requirements

  There are just a few requirements for this workshop: 
  
  * A working Java runtime environment (JRE) - test with `java -version` in a command line window
  * [Leiningen](http://leiningen.org/) - test with `lein version` in a command line window
  * A Clojure aware editor with REPL
    - [LightTable](http://lighttable.com/)
    - [Emacs](http://www.gnu.org/software/emacs/) (with [Emacs Live](http://overtone.github.io/emacs-live/))
  * A [Git client](http://git-scm.com/) (optional)


  See the section on [Development Environments](/development-environment/) for Clojure for more options

> **Hint** You may notice that there is no actual Clojure installation.  Clojure is a library that is added to the project, just like any other dependency (ie. in Maven, Gradle, etc).  

> The Clojure library is very small and Leiningen caches it and oll other libraries locally in the same folder structure that Maven uses, eg ` ~/.m2/repository/`

