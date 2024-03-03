# Clojure CLI Execution options

Execution options (`-A` `-M` `-P` `-T` `-X`) define how aliases are used with the Clojure CLI. Aliases are included via one of these execution options and each option can affect how the alias is used.

??? INFO "Clojure CLI design evolution"
    The [first documented released](https://clojure.org/releases/tools#v1.10.1.510) used the `-A` execution option to include aliases. 

    The design has evolved to provide specific execution options to run code via clojure.main (`-M`) and clojure.exec (`-X`). 

    In July 2021 the ability to run tools (`-T`) independent from the Clojure project classpath was introduced.


## Quick summary

`-M` uses `clojure.main` to call the `-main` function of the specified namespace, passing string-based arguments.

`-X` uses `clojure.exec` to call a fully qualified function, passing arguments as key and value pairs

`-T` runs a tool independent from project dependencies.  Only the libraries in the alias are included in the Class Path.  The path is defined as `"."` by default.

`-P` downloads library dependencies, including those from specified aliases

`-A` in the specific case of running a basic terminal UI REPL with the `clojure` command or `clj` wrapper.


## clojure.main

`-M` flag instructs Clojure CLI tools to use `clojure.main` to run Clojure code.

The `--main` or `-m` flag is an argument to `clojure.main` which specifies the namespace to search for a `-main` function.

`clojure.main/main` function searches for a `-main` function in the given namespace, e.g. `--main pracicalli.gameboard.service`

> If the -main function is not found or the namespace is not specified, then the `clojure` command will run a REPL session.

Run a project with the main namespace `practicalli.sudoku-solver`, without any additional aliases on the command line

!!! NOTE ""
    ```shell
    clojure -M -m practicalli.sudoku-solver
    ```

Add `:project/run` alias to the project `deps.edn` file to provide a simpler way to run the project on the command line

```clojure
:project/run {:main-opts ["--main" "practicalli.sudoku-solver"]}
```

Now the project code can be run using the simple command line form

```shell
clojure -M:project/run
```


### Using clojure.main


> [`clojure.main` namespace](https://clojure.org/reference/repl_and_main) has been the way Clojure code was run (including a REPL) for most of its history.  This is now evolving with the addition of [clojure.exec](#clojureexec).
> [clojure.main has other features, as covered in the REPL and main entrypoints article](https://clojure.org/reference/repl_and_main)) on clojure.org.


### Rebel rich terminal UI

[Rebel readline](/clojure/clojure-cli/repl/) provides a terminal UI REPL, providing auto-completion, function signatures, documentation, etc.

`:repl/rebel` is an alias that includes nrepl, cider-nrepl and rebel-readline libraries, with a `:main-opts` to run the `rebel-readline.main/-main` function via `clojure.main`.

```clojure
:repl/rebel
{:extra-deps {nrepl/nrepl                {:mvn/version "0.9.0"}
              cider/cider-nrepl          {:mvn/version "0.28.2"}
              com.bhauman/rebel-readline {:mvn/version "0.1.4"}}
 :main-opts  ["-m" "nrepl.cmdline"
              "--middleware" "[cider.nrepl/cider-middleware]"
              "--interactive"
              "-f" "rebel-readline.main/-main"]}
```

Use the `:repl/rebel` alias with the `-M` execution option

```shell
clojure -M:repl/rebel
```

Multiple aliases can be specified to include additional paths and libraries. Aliases chained together have their configuration merged

`:env/dev` adds "dev" as an extra path, with the `dev/user.clj` file automatically loading its code into the `user` namespace when the REPL starts

`:lib/hotload` alias adds the `org.clojure/tools.deps.alpha` library to [provide hotloading of dependencies into the running REPL](/clojure/clojure-tools/repl-reloaded/)

Start a REPL process with this alias

```shell
clojure -M:env/dev:lib/hotload:repl/rebel
```

The Rebel REPL UI will start, include the dev directory on the class path and the `org.clojure/tools.deps.alpha` library loaded into the REPL


### Chaining aliases

Alises can be used together by chaining their names on the command line

```shell
clojure -M:env/dev:lib/hotload:repl/rebel
```

The `clojure` command will merge the `:extra-paths` and `:extra-deps` values from each alias in the chain.

The `:main-opts` values from the aliases are not merged. Only the `:main-opts` value from the last alias in the chain is used with `clojure.main` to run the Clojure code.

If the command line includes the `-m` flag with a namespace, then that namespace is passed to `clojure.main`, ignoring all `:main-opts` values from the aliases.  The [`-i` and `-e` flags for clojure.main](https://clojure.org/reference/repl_and_main) also replace `:main-opts` values.


## clojure.exec

`-X` flag provides the flexibility to call any fully qualified function, so Clojure code is no longer tied to `-main`

Any function on the class path can be called and is passed a hash-map as an argument.  The argument hash-map is either specified in an alias using `:exec-args` or assembled into a hash-map from key/value pairs on the command line.  Key/values from the command line are merged into the `:exec-args` map if it exists, with the command line key/values taking precedence.

### clojure.exec arguments

Clojure.exec command takes key value pairs read as EDN values (extensible data notation that is the base syntax of Clojure).

Number values and keywords can be parsed from the command line

Arguments that are vectors and hash maps should be wrapped in single quotes to avoid the command line shell splitting arguments at spaces, e.g. `'[:a :b]'`, `'{:c 1}'`.

The double quotes in an EDN string must be wrapped by single quotes, along with vectors and hash-maps

- `'"strings in double quotes surround by single quotes"'`
- `'[:vectors :with-single-quotes]'`
- `'{:hash-maps :with-single-quotes}'`


### clojure.exec examples

Call the `status` function from the namespace `practicalli.service`, which is on the classpath in the practicalli.service project

```shell
clojure -X practicalli.service/status
```

Pass arguments to a `start` function in the `practicalli.service` namespace

```shell
clojure -X practicalli.service/start :port 8080 :join? false
```

As the arguments are key/value pairs, it does not matter in which order the pairs are used in the command line.

### Built in functions

Clojure CLI tools has some built in tools under the special `:deps` alias (not to be confused with the `:deps` configuration in a `deps.edn` file)

* `-X:deps mvn-install` - install a maven jar to the local repository cache
* `-X:deps find-versions` - Find available versions of a library
* `-X:deps prep` - [prepare source code libraries](https://clojure.org/reference/deps_and_cli#prep) in the dependency tree

> See `clojure --help` for an overview or `man clojure` for detailed descriptions


## Run a Tool

`-T` install, run and remove a tool, by the tool name or an alias.

The `-T` execution option also uses the `clojure.exec` approach, although the `:deps` and `:path` values from a project `deps.edn` file are ignored.  This isolates the tool from the dependencies in a Clojure project.

Calling Tools on the command line has the general form:

```shell
clojure -Ttool-name function-name :key "value" ,,,
```

A tool may provide many functions, so the specific function name is provided when calling the tool.

key/value pairs can be passed as arguments to that function (as with the -X execution option)


`-Ttools` is a built-in tool to `install` and `remove` other tools, with the `:as` directive providing a specific name for the tool.

In this example, the antq tool is installed using the name `antq`

```shell
clojure -Ttools install com.github.liquidz/antq '{:git/tag "1.3.1"}' :as antq
```

Installing a tool adds an EDN configuration file using the name of the tool in `$XDG_HOME/.clojure/tools/` or `$HOME/.clojure/tools/` directory.

Once a tool is installed, run by using the name of the tool.

```shell
clojure -Tantq outdated
```

Options to the tool are passed as key/value pairs (as the tool is called by clojure.exec)

```shell
clojure -Tantq outdated :upgrade true
```

`-Ttools remove` will remove the configuration of the tool of the given name

```shell
clojure -Ttools remove :tool antq
```


### Tools install or aliases

Tools can also be defined in an alias with `:exec-fn` can be run via `-T:alias-name` as they are both executed using `clojure.exec`.

> `-X` execution option can emulate `-T` behaviour when an alias uses `:replace-paths` and `:replace-deps` keys, instead of `:extra-paths` and `:extra-deps`, so project paths and dependencies are not included loaded by the alias.

Using an alias for a tool has the advantage allowing a use to define their preferred default arguments that are passed to the `:exec-fn`, using the `:exec-args` key.

Default arguments could be included in the `deps.edn` of the installed tool itself, although this is controlled by the developer of that tool project.

The `:search/outdated` alias defined in the `practicalli/clojure-deps-edn` user level configuration is an example of a tool alias with default arguments

```clojure
  :search/outdated
  {:replace-paths ["."]
   :replace-deps  {com.github.liquidz/antq {:mvn/version "1.3.1"}
                   org.slf4j/slf4j-nop     {:mvn/version "1.7.32"}}
   :main-opts     ["-m" "antq.core"]
   :exec-fn antq.tool/outdated
   :exec-args {:directory ["."] ; default
               :exclude ["com.cognitect/rebl"
                         "org.openjfx/javafx-base"
                         "org.openjfx/javafx-controls"
                         "org.openjfx/javafx-fxml"
                         "org.openjfx/javafx-swing"
                         "org.openjfx/javafx-web"]
               ;; :focus ["com.github.liquidz/antq"]
               :skip ["boot" "leiningen"]
               :reporter "table" ; json edn format
               :verbose false
               :upgrade false
               :force   false}}
```

This alias is called using `clojure -T:search/outdated` and is the same as calling `clojure -Tantq outdated ,,, ,,,` with a long list of key value options that represent the arguments in the alias.

As the output is a table of results, the command output is typically pushed to a file: `clojure -T:search/outdated > outdated-2021-12-24.txt`

Example tools include

* [liquidz/antq](https://github.com/liquidz/antq) - search dependencies for newer library versions
* [seancorfield/deps-new](https://github.com/seancorfield/deps-new) - create new projects using templates
* [clojure-nvd](https://github.com/rm-hull/nvd-clojure) - check dependencies against National Vunerability Database


## Prepare dependencies

`-P` flag instructs the `clojure` command to download all library dependencies to the local cache and then stop without executing a function call.

The `-P` flag is often used with Continuous Integration workflows and to create pre-populated Container images, to avoid repeatedly downloading the same library jar files.

If used with just a project, then the Maven dependencies defined in the project `deps.edn` file will be downloaded, if not already in the users local cache (`~/.m2/repository/`).

If `:git` or `:local/root` dependencies are defined, the respective code will be downloaded and added to the classpath.

Prepare flag by itself download dependencies defined in the `:deps` section of the `deps.edn` file of the current project.

```shell
clojure -P
```

Including one or more aliases will preparing all the dependencies from every alias specified

```shell
clojure -P -M:env/dev:lib/hotload:repl/cider
```

> `-P` flag must be used before any subsequent arguments, i.e. before `-M`, `-X`, `-T`

As prepare is essentially a dry run, then the `clojure` command does not call `:main-opts` or `:exec-fn` functions, even if they exist in an alias or on the command line.

`-P` will warn if a project has dependencies that [require building from source](https://clojure.org/reference/deps_and_cli#prep) (i.e Java code) or resource file manipulation.  If so then `clojure -X:deps prep` will prepare these source based dependencies.


## Built-in terminal UI REPL

`-A` is stated as the official way to include an alias when running a REPL terminal UI `clojure` or `clj`.

> [Practicalli recommends using Rebel Readline](https://practical.li/clojure/clojure-cli/repl/) which uses -M execution option, so -A execution option is rarely used by Practicalli.

The `:env/dev` alias adds "dev" directory to the class path, [typically used to add a `user.clj` that will automatically load code from the `user` namespace defined in that file](https://practical.li/clojure/clojure-cli/projects/configure-repl-startup.html).

```shell
clojure -A:env/dev
```

The alias definition is `:env/dev {:extra-paths ["dev"]}`

Aliases can be chained together and their configuration will be merged

`:lib/hotload` adds a dependency to [provide hotloading of other dependencies](repl-reloaded/)

```clojure
:lib/hotload
{:extra-deps {org.clojure/tools.deps.alpha
                {:git/url "https://github.com/clojure/tools.deps.alpha"
                 :sha     "d77476f3d5f624249462e275ae62d26da89f320b"}
              org.slf4j/slf4j-nop {:mvn/version "1.7.32"}}}
```

Start a REPL process with this alias

```shell
clojure -A:env/dev:lib/hotload
```

!!! INFO "Use -M for alias definitions including :main-opts"
    Using an alias that contains a `:main-opts` key with `-A` will fail to run a REPL and print a warning to use `-M` execution option
    The `:main-opts` configuration for `-A` execution option is deprecated (although currently works in 1.10.x). To run Clojure code via `clojure.main` the `-M` option should be with aliases that includes `:main-opts`.


## Summary

There are many options when it comes to running Clojure CLI tools that are not covered here, however, this guide gives you the most common options used so far.

Practicalli recommends using the `-X` execution option where possible, as arguments follow the data approach of Clojure design.

The `-J` and `:jvm-opts` are useful to configure the Java Virtual machine and deserve an article to themselves as there are many possible options.

The `-T` tools is an exciting and evolving approach and it will be interesting to see how the Clojure community adopt this model.

See the [Deps and CLI Reference Rationale for more details and description of these options](https://clojure.org/reference/deps_and_cli#prep).


## References

* [Inside Clojure - clj exec](https://insideclojure.org/2020/07/28/clj-exec/)
* [Inside Clojure - clj exec update](https://insideclojure.org/2020/09/04/clj-exec/)
