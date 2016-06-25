# Other Development tools for Clojure 

  There are several development tools you can use to support your Clojure development.
  
  My current choice of development environment is Spacemacs, a feature rich configuration for Emacs.  See my article on **[Spacemacs for Clojure development](http://jr0cket.co.uk/2015/09/spacemacs-for-clojure-development-configure-clojure.html)**
  
  Some common setups I have seen in use for Clojure development are:

* **Modern** - [LightTable](http://lighttable.com/), [Leiningen](http://leiningen.org/), Git
* **Modern Classic** - [Spacemacs](http://spacemacs.org) with Clojure layer, [Leiningen](http://leiningen.org/), magit
* **Classic** - [Emacs](http://www.gnu.org/software/emacs/) with [Cider](https://github.com/clojure-emacs/cider), [Leiningen](http://leiningen.org/), magit
* **Java (InteliJ)** - [Cursive Clojure](https://cursiveclojure.com/)
* **Java (Eclipse)** - [Counterclockwise documentation site](http://doc.ccw-ide.org/)
* **Ubiquitous** - Vim, nailgun, [Leiningen](http://leiningen.org/), Git 
* **Simple** - [Nightcode](https://nightcode.info/), [Leiningen](http://leiningen.org/), Git 
* **Lightweight** - Atom, Protorepl, [Leiningen](http://leiningen.org/), Git 

There may be many more variations, however you should find a development environment with at minimum the following features:
  
  * starting & using a REPL, with in-line evaluation 
  * syntax highlighting & coloured brackets (eg. rainbow-delimiters in Emacs)
  * autocomplete of  names (functions, symbols, keywords, etc)
  * snippets / templates


## Tools for developers with a Java background

Clojure runs on the Java Virtual Machine so its not surprising that there is good support for Clojure in the major Java IDEs.

## Eclipse

Counterclockwise is an Eclipse IDE plugin to provide an integrated development environment for Clojure.  Take a look at the [Counterclockwise documentation site](http://doc.ccw-ide.org/) for installation instructions

## InteliJ

![Cursive Clojure](/images/cursive-clojure-logo.svg)

[Cursive](https://cursiveclojure.com/) is a Clojure IDE that aims to understands your code.  Advanced structural editing, refactorings, VCS integration and much more, all out of the box.  It is currently a standalone tool, although will eventually become an IntelliJ plugin.

[La Clojure](http://plugins.jetbrains.com/plugin/4050) is a plugin for IntelliJ IDEA.  Provides Clojure language support: syntax and error highlighting, completion, navigation and refactorings.

## Netbeans 

Netbeans did have great support for Clojure, but unfortunately at the time of writing the Clojure plugin has been unmaintained for so long it is not a viable tool to use for Cojure development.

