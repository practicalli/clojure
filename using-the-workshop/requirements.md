# Requirements

> #### TODO::Update to using Clojure CLI tools

Many of the exercises in this book can be done in the pages of the website, reducing the need to set up an environment for Clojure development.

[repl.it](https://repl.it) gives you a web based Clojure environment that can be used to save answers to exercises and other Clojure experiments.


## Choosing an Editor / IDE

The following tools can be used to create a development environment on your computer

  * Java runtime environment (JRE) version 1.8 or 1.11 - test with `java -version` in a command line window
  * [Leiningen](http://leiningen.org/) version 2.8.1 - test with `lein version` in a command line window
  * A Clojure aware editor with REPL support, either:
    - [Emacs](http://www.gnu.org/software/emacs/) 25.3.x and [Spacemacs](http://spacemacs.org/) develop branch
    - [VS Code](https://code.visualstudio.com) and [Calva](https://marketplace.visualstudio.com/items?itemName=betterthantomorrow.calva)
    - [Atom editor](https://atom.io/) and [Proto REPL](https://atom.io/packages/proto-repl) or [Chlorine (Socket REPL)](https://atom.io/packages/chlorine)
    - [IntelliJ](https://www.jetbrains.com/idea/) and [Cursive](https://cursive-ide.com/)
  * A [Git client](http://git-scm.com/) version 2.14.x (optional - to download code examples)
  * A [Github account](https://github.com) - to fork the code examples & submit pull requests (optional)


## Setting up your environment

  See the section on Clojure [Development Environments](../development-environments/) for details on how to set these tools up.


>####HINT::Adding Clojure
> Clojure is a library that is added to the project, just like any other dependency (ie. in Maven, Gradle, etc).
> The Clojure library is very small and Leiningen caches it and oll other libraries locally in the same folder structure that Maven uses, eg ` ~/.m2/repository/`
>
> You can also install Clojure as a command line tool using the [Clojure CLJ tools](https://clojure.org/guides/getting_started)
