# Automation

Automation tools can provide a consistent command line interface across a wide range of projects.

Whilst the Clojure CLI is a very extensible tool that flexibility can also add some complexity to its command line interface.

Automation tools abstract the command line to provide a consistent and simple user experience whilst keeping underlying flexibility.

!!! HINT "Practicalli recommends make"
    A Makefile is not reliant on programming language knowledge so has no barrier to those who are unfamiliar with the Clojure language.

    Make is useful when working with mixed language teams to create a unified tool and command line across a wide range of projects.


## Automation tooling

* [Make](make.md) - ubiquitous task automation tool, programming language agnostic
* Shell Scripts
* Babashka - create task automation tool with Clojure


## Make

Make is very simple to use and has a long history as a build tool and wider task automation tool.

Task are defined in a `Makefile` and task can depend on each other. Any commands or combination of commands that run on the command line can be used as make tasks.

make provides tab completion of tasks defined in the Makefile without additional configuration.

`make` is available for all operating systems.

!!! HINT "Practicalli Project Templates include Makefile"
    Creating new projects with `:project/create` and [Practicalli Project Templates](/clojure/clojure-cli/projects/templates/) provide a Makefile with a wide range of common tasks for Clojure development. 


### Shell Scripts

Shell scripts provide a very common way to create a relatively ubiquitous approach to running tools, even across multiple Shell implementations (Bash, Zsh, fish, etc.) and operating systems.

Shell scripting language is very powerful especially for manipulation of the operating system, although scripts require development and maintenance.


## Babashka

Write automation scripts with Clojure code using the [Babashka task runner](https://book.babashka.org/#tasks){target=_blank}

Babashka can use a wide range of Clojure functions and libraries, although as a general script tool then additional coding and maintenance may be reqiured compared to a dedicated tool.

[Babashka task runner](https://book.babashka.org/#tasks){target=_blank .md-button}
