# Automation

Using an automation tool can provide a consistent command line interface across a wide range of projects

Whilst the Clojure CLI is a very extensible tool that flexibility can also add some complexity to its command line interface.

Using a consistent set of user aliases can help manage the command line interface, however, automation tools can abstract the command line task even further to provide a consistent and simple to use experience whilst keeping the underlying flexibility

## Automation tooling

* [Make](make.md) - ubiquitous task automation tool, programming language agnostic
* Shell Scripts
* Babashka - create task automation tool with Clojure


### Shell Scripts

Shell scripts provide a very common way to create a relatively ubiquitous approach to running tools, even across multiple Shell implementations (Bash, Zsh, fish, etc.) and operating systems.

Shell scripting language is very powerful especially for manipulation of the operating system.


## Make

Make has a long history as a build tool and wider task automation tool.

Make is very simple to use.

Task are defined in a `Makefile` and task can depend on each other.

Any commands or combination of commands that run on the command line can be used as make tasks.

make provides tab completion of tasks defined in the Makefile without additional configuration.

`make` is available for all operating systems.


## Babashka

Write Clojure code using the [Babashka task runner](https://book.babashka.org/#tasks){target=_blank}

Babashka reqiures more coding than make, although has the ability to use a wide range of Clojure functions and libraries.

[Babashka task runner](https://book.babashka.org/#tasks){target=_blank .md-button}
