# Make

[GNU Make](https://www.gnu.org/software/make/manual/html_node/Standard-Targets.html) provide a simple and consistent way to run any development task for Clojure & ClojureScript projects (or any other languages).

Wrap any combination of tools (building, linting, formatting, testing) with make targets for a simple command line interface, with automatically tab completion, making any Clojure project really easy to work with.  Practicalli also uses make to manage docker images and containers to support Clojure development.

All that is required is [a `Makefile` in the root of the project](https://github.com/practicalli/dotfiles/blob/main/Makefile)


## GNU Make overview

[GNU Make](https://www.gnu.org/software/make/manual/html_node/Standard-Targets.html) is a language agnostic build automation tool which has been an integral part of building Linux/Unix operating system code and applications for decades, providing a consistent way to configure, compile and deploy code for all projects.

A `Makefile` defines targets called via the `make` command. Each target can run one or more commands.  Targets can be dependent on other targets,  e.g the `dist` target that builds a project can be dependent on `deps` & `test` targets.

[GNU Make](https://www.gnu.org/software/make/manual/html_node/Standard-Targets.html) is available on all Linux/Unix based operating systems (and Windows via [chocolatey](https://chocolatey.org/) or [nmake](https://learn.microsoft.com/en-us/cpp/build/reference/nmake-reference)).

> Practicalli also uses `make` to [configure and build the latest versions of Emacs](https://practical.li/blog/posts/build-emacs-28-on-ubuntu/) and other Linux open source software


## Defining tasks

Create a `Makefile` in the root of a project and define a target by typing a suitable name followed by a `:` character, e.g. `test:`

Insert a tab on the next line and type a command to be called.  Further commands can be added on new lines so long as each line is tab indented.

The `repl` target prints out an information message and then uses the [Clojure CLI](https://clojure.org/guides/install_clojure) with aliases from [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) to run a Clojure REPL process with a rich terminal UI ([Rebel Readline](https://github.com/bhauman/rebel-readline))

```makefile
repl:  ## Run Clojure REPL with rich terminal UI (Rebel Readline)
    $(info --------- Run Rebel REPL ---------)
    clojure -M:env/dev:env/test:repl/rebel
```


### Common target naming

Targets used across Practicalli projects follow the [make standard targets for users](https://www.gnu.org/software/make/manual/html_node/Standard-Targets.html)

> `all` , `test-ci` , `deps` and `dist` targets are recommended for use with a CI deployment pipeline and builder stage when using Docker.

* `all`  calling all targets to prepare the application to be run. e.g. all: deps test-ci dist clean
* `deps` download library dependencies (depend on `deps.edn` file)
* `dist` create a distribution tar file for this program or zip deployment package for AWS Lambda
* `lint` run lint tools to check code quality  - e.g [MegaLinter](https://oxsecurity.github.io/megalinter/) which provides a wide range of tools
* `format-check` report format and style issues for a specific programming language
* `format-fix` update source code files if there are format and style issues for a specific programming language
* `pre-commit` run unit tests and code quality targets before considering a Git commit
* `repl` run an interactive run-time environment for the programming language
* `test-unit` run all unit tests
* `test-ci` test running in CI build (optionally focus on integration testing)
* `clean` remove files created by any of the commands from other targets (i.e. ensure a clean build each time)

[practicalli/dotfiles/Makefile](https://github.com/practicalli/dotfiles/blob/main/Makefile) also defines docker targets to build and compose images locally, inspect images and prune containers and images.


## Target dependencies

A `Makefile` target can depend on either a file name or another target in the `Makefile`.

The all target typically depends on several `Makefile` targets to test, compile and package a service.  Add the names of the targets this target depends upon

```makefile
all: deps test-ci dist clean
```

Add the filename of a file after the name of the target, to depend on if that file has changed.  If the file has not changed since make was last run then the task will not run again.

Clojure CLI Example: If the `deps` target depends on `deps.edn` and the file has not changed since last run, the deps target will not run again.


## deps target - depend on a file

The deps target would use Clojure CLI or Leiningen to download dependencies.

Configuring the `deps` target to depend on `deps.edn` or `project.clj` file, then if the file has not changed the deps will not run again.


A Clojure CLI example depends on the `deps.edn` file that defines all the library dependencies for the project, tools for testing and packaging the Clojure service.  The `-P` flag is the prepare option, a dry run that only downloads the dependencies for the given tasks.

```makefile
deps: deps.edn  ## Prepare dependencies for test and dist targets
    $(info --------- Download libraries to test and build the service ---------)
    clojure -P -X:env/test:package/uberjar
```

> `:env/test` adds libraries to run Kaocha and libraries used to run unit tests.  `:package/uberjar` runs a tool that creates an uberjar.


## Clean target - hiding command failure

The clean target should remove files and directories created by the build (compile) process, to ensure a consistent approach to building each time.

On Linux / Unix systems files can be deleted with the `rm` command using `-r` for recursively deleting a directory and its contents. `-f` forces the deleting of files and directories, otherwise a prompt for confirmation of the delete may be shown.

`-` before a command  instructs `make` to ignore an error code, useful if the files to be deleted did not exist (i.e. the build failed part way through and not all files were created).

```makefile
# `-` before the command ignores any errors returned
clean:
    $(info --------- Clean Clojure classpath cache ---------)
    - rm -rf ./.cpcache
```


## MegaLinter target - simplifying a command

The `lint` target is an example of how the `Makefile` simplifies the command line interface.

`lint:` target is used to call the MegaLinter runner, avoiding the need to remember the common options passed when calling MegaLinter command line tool, `mega-linter-runner`

The Java flavor of MegaLinter is less than 2Gb image (full MegaLinter image is 8Gb) and contains all the tools for a Clojure project.  The flavor can only be set via a command line option, so the make file ensures that option is always used and the full MegaLinter docker image is not downloaded by mistake.

When MegaLinter is configured to generate reports (default), `lint-clean:` target is used to clean those reports.

```makefile
# Run MegaLinter with custom configuration
lint:
    $(info --------- MegaLinter Runner ---------)
    mega-linter-runner --flavor java --env 'MEGALINTER_CONFIG=.github/linters/mega-linter.yml'

lint-clean:
    $(info --------- MegaLinter Clean Reports ---------)
    - rm -rf ./megalinter-reports
```


## Enhancing make output

The `info` message is used with each target to enhances the readability of the make output, especially when multiple targets and commands are involved, or if commands are generating excessive output to standard out.

```makefile
 test:
    $(info --------- Runner for unit tests ---------)
    ./bin/test
```

![Makefile showing make all output with info messages to separate the Clojure commands and output](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/makefile-clojure-make-all-output-with-info.png)


## Avoiding file name collisions

Although unlikely, if a filename in the root of a project has the same name as a `Makefile` target, it can be used instead of running the targets command

`.PHONY:` defines the names of targets in the `Makefile` to avoid name clashes

```makefile
.PHONY: all lint deps test test-ci dist clean
```

[phony - MakefileTutorial](https://makefiletutorial.com/#phony){target=_blank .md-button}


## Halt on failure

`.DELETE_ON_ERROR:` halts any further commands if a command returns non-zero exit status.  Useful as short-circuit to stop tasks when further work is not valuable, e.g. if tests fail then it may not be valuable to build the Clojure project.

```makefile
.DELETE_ON_ERROR:
all: deps test-ci dist clean
```

[delete_on_error - MakefileTutorial](https://makefiletutorial.com/#delete_on_error){target=_blank .md-button}


## References

[Makefile Tutorial by Example](https://makefiletutorial.com/){target=_blank .md-button}
[practicalli/dotfiles Makefile](https://github.com/practicalli/dotfiles/blob/main/Makefile){target=_blank .md-button}


## Summary

A `Makefile` can simplify the command line interface for any task with a Clojure project (or any other language and tooling).

Using the same target names across all projects reduces the cognitive load for driving any project.
