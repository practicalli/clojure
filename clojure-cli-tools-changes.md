# Clojure CLI Tools


## Clojure CLI main flag options
| Flag            | Purpose                                                  | Config used                                          |
|-----------------|----------------------------------------------------------|------------------------------------------------------|
| `-M`            | Run Clojure project with clojure.main                    | deps, path, `:main-opts` & command line args         |
| `-P`            | Prepare / dry run (CI servers, Containers)               | deps, path                                           |
| `-P -M:aliases` | Prepare / dry run including alias deps and paths         | deps, path                                           |
| `-P -X:aliases` | Prepare / dry run including alias deps and paths         | deps, path                                           |
| `-X`            | Execute a qualified function, optional default arguments | deps, path, `:exec-fn`, `:exec-args` & :key val args |
| `-J`            | Java Virtual Machine specific options (menory size, etc) |                                                      |

* deps = `:deps`, `:extra-deps`, `replace-deps`
* path = `:path`, `:extra-paths`, `replace-paths`


## Clojure CLI Tools built-in commands

* `-X:deps tree` downloads dependencies and prints out the dependency tree.  Libraries that are dependencies of dependencies are indented in the tree.
* `-X:deps mvn-pom` generate / update `pom.xml` with the dependencies and class path for the current project.
* `-X:deps git-resolve-tags` update `deps.edn` git based dependencies that used tags with the equivalent SHA commit values.
* `-X:deps mvn-install :jar '"/path/to.jar"'` will install a given jar file into the local maven repository, eg. `~/.m2/repository`.  An alias can be defined to provide jar location as a key/value pair using the

> TODO: using `clojure -X:deps` download dependencies and seems to try and run a function (internal `:exec-fn`) or command line argument (behavior observed in tests)


## Tasks - what do we want to do
Clojure CLI tools can be used for a number of tasks, especially when combined with community tools.

- Run a REPL (Clojure, Rebel, Reveal, REBL)
- Create a new project from a template
- Run a specific function - taking hash-map as argument (simple function, scripts, applications)
- Run a Clojure application, optionally providing arguments
- Download project dependencies (support CI servers)
- Run tests locally and via CI server (using community tools)
- Package an application for deployment
- Run project scripts - database migrations, reports, etc.
- Run a range community tools (~/.clojure/deps.edn)


## Task: Run a REPL
`clojure` and `clj` (requires rlwrap) will run a REPL if given no other arguments.

Running either command from the root directory of a project will merge the `deps.edn` configuration with `~/.clojure/deps.edn`.


## Task: Run a REPL with additional dependencies and paths
`clojure -M:alias` will run a repl if the alias does not contain a main namespace defined in `:main-opts`, e.g. `:main-opts ["-m" "namespace.main"]`.  The deps and path values are included from the alias.

If the following alias is defined in the project `deps.edn` file

```clojure
:env/dev
{:extra-paths ["resources"]
 :extra-deps {com.h2database/h2 {:mvn/version "1.4.200"}}}
```
`clojure -M:env-dev` will add `resources` directory to the path and the h2 database library to the dependencies, then runs a REPL.

Including the `-r` option in the command line forces a REPL to run, even if a main namespace is provided via `:main-opts` or the command line.

```clojure
clojure -r -M:alias1:alias2
```
The dependencies and paths will be merged from the alias from left to right, with each successive alias over-riding the value of any matching keys in the dependencies.


## Task: Create a new project from template
The `clj-new` community tool can be used to create a Clojure / ClojureScript project, using a template to provide a project structure and example source code and tests.

Using the `-main-opts` approach, an alias for `clj-new` would be defined as follows

```clojure
  :project/new
  {:extra-deps {seancorfield/clj-new {:mvn/version "1.0.215"}}
   :main-opts  ["-m" "clj-new.create"]}
```

The `clj-new` tool can be run using the `-M` flag, passing the template and project names as arguments.

`clojure -M:project/new template-name project-domain/application-name`

To create a project as an application (to be run via the command line) for the practicalli domain with the application called banking-on-clojure

```shell
clojure -M:new app practicalli/banking-on-clojure
```

The latest version of the `clj-new` project also supports using the `-X` flag and default arguments.

Adding the `:exec-fn` to the `clj-new` alias, the `-X` flag can be used instead of the `-M`.  Arguments are supplied as key/value pairs

```clojure
  :project/new
  {:extra-deps {seancorfield/clj-new {:mvn/version "1.1.215"}}
   :exec-fn clj-new/create}
```
Use this alias with the `-X` flag

```shell
clojure -X:project/new :template template-name :name practicalli/banking-on-clojure
```

Default values can be added using the `:exec-args` key to the alias

```clojure
:project/new
{:extra-deps {seancorfield/clj-new {:mvn/version "1.1.215"}}
 :exec-fn clj-new.create
 :exec-args {:template lib :name practicalli/playground}}
```
`clojure -M:project/new :name practicalli/awesome-webapp` will create a new project using the `{:template lib :name practicalli/awesome-webapp}` argument.



## Task: Executing a specific function
Clojure can run a specific function, useful for one off tasks or timed batch processing (via cron or similar tool) as well as complete applications.

Arguments to the function are passed as a hash-map, defined in either an aliases `:exec-args` key or as key value pairs on the command line.  Command line key value pairs are merged with the `:exec-arg` hash-map, replacing the values from the command line if there are matching keys.

**Scenarios**

`clojure -X namespace/fn` runs the function specified on the command line, passing an empty hash-map as an argument

`clojure -X:alias fn` runs the function if the `:ns-default` is set to the namespace that contains the function, otherwise "Unqualified function can't be resolved: fn-name" error is returned.

`clojure -X:alias` runs the function specified by `:exec-fn` in the alias.  The function must include its namespace or have that namespace defined in `:ns-default`. If `:exec-args` is defined in the alias, its value is passed to the function, otherwise an empty hash-map is passed to the function as an argument.

`clojure -X:alias namesapace/fn` will run the function specified on the command line, over-riding `:exec-fn` if it is defined in the alias.  `:exec-args` will be passed to the command line function if defined in the alias. Dependencies and paths will be used from the alias. Assumption: the command line namespace also overrides the `:ns-default** value if set.

`clojure -X:alias :key1 val1 :key2 val2` will execute the function defined in `:exec-fn` and pass it the key value pairs from the command line as a hash map.  If the alias has `:exec-args` defined, command line args are merged into the `:exec-fn` hash-map, replacing the default values in `:exec-args` where keys match.

Assuming there is an alias called `database/migrate` defined in the project `deps.edn`

```clojure
:database/migrate
{:exec-fn practicalli.banking-on-clojure.database/migrate
 :exec-args {:db-type "h2" :database "banking-on-clojure"}}
```

`clojure -X:database/migrate :database "specs-repository"` would merge the command line args with `:exec-args` to create the hash-map `{:db-type "h2" :database "specs-repository"}` which is passed to the `practicalli.banking-on-clojure.database/migrate` function as an argument.


## Task: Executing a range of functions

`:ns-default` in an alias defines the namespace that contains the functions that could be executed.

```clojure
{:aliases
  {:project/run
    {:ns-default practicalli/banking-on-clojure}}}
```
Specific functions from the namespace can be called via the command line

```shell
clojure -X:project/run migrate-db :db-type h2 :database banking-on-clojure
clojure -X:project/run server-start :port 8080
```


## Task: Dry Run or Prepare for CI / Containers
`clojure -P` will download the libraries defined in `:deps` in the project `deps.edn` and do nothing else.  Standard out shows downloading of dependencies not already cached locally, including name and versions and repository downloaded from.

![Clojure CLI tools - using -P flag to download project dependencies](/images/clojure-cli-tools-dependencies-p-flag.png)

> #### Hint::Qualified namespaces required
> If an unqualified library name is used, eg. `compojure`, then a warning is sent to the standard out.  Change the name of the library to be fully qualified eg. `weavejester/compojure`
>
>In a future version of the Clojure CLI tools unqualified namespaces will not be downloaded.

The `-P` flag can be used to modify an existing command to ensure no execution takes place, ensuring a prepare only (dry run) action.

`clojure -P -M:alias-name` downloads the dependencies for the specific aliases and multiple aliases can be chained together, e.g. `clojure -P -M:env/dev:test-runner/kaocha`

The `-P` flag uses everything from an alias not related to execution.

> The classic way to download deps was to run `clojure -A:aliases -Spath`, where `-Spath` prevented execution of repl or main.


## Run a Clojure application
`clojure -m full.namespace.to.dash-main` calls the `-main` function from the given namespace. Arguments to the function are simply added to the end of the command line and passed to the `-main` function in the given namespace.

> The `-m` flag in the CLI tools pre-release returns a warning that `-M` should be used.

Using `-M` and `-m` works, but seems redundant.  Using `-M` by itself runs the REPL.
```shell
clojure -M -m full.namespace.to.dash-main
```

`-M` seems useful when including an alias with extra configuration (eg. `:extra-deps`, `:extra-paths`, `:main-opts`).  As `:main-opts` is no different to the `-m` option, creating an alias just to avoid the warning seems excessive.



## Task: Executing a project - using Edn style args
Clojure CLI tools is encouraging a move to functions that take a hash-map for their arguments.  Passing arguments in as an edn data structure has more rigure than options and strings on the command line.

The simplest form is to define an alias to run the project, specifying just the function to execute using `:exec-fn`
```clojure
 :aliases
 {:project/run
   {:exec-fn practicalli.banking-on-clojure/server-start}
 } ;; End of Aliases
```
Then the project can be run using this alias.

```shell
clojure -X:project/run
```

Arguments can be passed to the function as key/value pairs on the command line.

```shell
clojure -X:project/run  :port 8080 :host "localhost"
```


`:exec-args` provides a way to define default arguments for the function, regardless of if it is defined in `;:exec-fn` or passed via the command line.

`:exec-args` defines a hash-map of arguments so the function must support taking a hash-map as an argument.

> A function may take variable args, especially if it is supporting both hash-maps and strings as options.


```clojure
 :aliases
 {:project/run
   {:exec-fn fully.qualified/namespace
    :exec-args {:default "arguments" :can-be-over-ridden-by "command-line-args"} }
 } ;; End of Aliases
```

Adding `:exec-args` to the `:run-project`

```clojure
 :aliases
 {:project/run
   {:exec-fn practicalli.banking-on-clojure/server-start
    :exec-args {:port 8888 :host "localhost"}}
 } ;; End of Aliases
```



#### Example of running a Clojure project - hello-world
In this example I use the hello-world example from https://clojure.org/guides/deps_and_cli#_writing_a_program
A project `deps.edn` file was created containing the dependency for clojure.java-time and the source code from that page copied into `src/hello.clj`

`clojure -m` hello runs the project and returns the time from running the -main function.
However this gives a warning:
```shell
WARNING: When invoking clojure.main, use -M
```

`clojure -M` runs a REPL

`clojure -M -m hello` runs the project and returns the time.  But then I ask myself what is the purpose of -M

Creating an alias to run the project seems an interesting idea, as I could also set default arguments.

Adding an `:project-run` alias to the project `deps.edn` works when calling with clojure `-M:project-run`
```clojure
 :aliases
 {:project-run {:main-opts ["-m" "hello"]}}
```

Changing the `:project-run` alias to use `:exec-fn` and a fully qualified function (-main by default) should work when calling with `clojure -X:project-run`.
 :aliases
 {:run-project {:exec-fn hello]}}

However, the `hello-world` project has an unqualified function and cannot be resolved.

Moving the source code to `src/practicalli/hello.clj` and calling `clojure -X:run-project` gives an execution error, `(ArityException)` as the `-main` function does not take any arguments, `(defn -main [] ,,,)`.

Changing the `-main` function to `(defn -main [& args] ,,,)` fixes the arity exception and calling `clojure -X:run-project` works.



## Local Maven install
Install a jar into the local Maven cache, typically `~/.m2/repository/` directory, organised by groupId

```clojure
clojure -M:deps mvn-install :jar '"/path/to.jar"'
```
> edn strings must be in double quotes, and then single-quoted for the shell

`mvn-install` uses the `.pom` file contained in the jar (if it exists) to determine the _groupId_, _artifactId_, and _version coordinates_ to use when the jar is installed.

The `.pom` file can also be specifice using the  `:pom` argument.

The install argmap takes the following options:

| key           | Required | Description                                            |
|---------------|----------|--------------------------------------------------------|
| `:jar`        | required | path to the jar file to install                        |
| `:pom`        | optional | path to .pom file (if .jar file does not contain .pom) |
| `:lib`        | optional | qualified symbol e.g `my.org/lib`                      |
| `:version`    | optional | Version number of library (string type)                |
| `:classifier` | optional | (string type)                                          |
| `:local-repo` | optional | path to local repo (default = ~/.m2/repository)        |


**mvn-install - define default configuration - using in templates for example**
Rather than pass details via the command line, use an alias to pass in default arguments.  This is especially useful when the project deps.edn is generated from a template.


> TODO: Is it possible to define `:exec-args` with the built-in `-X:deps mvn-install` command?

An alias can be defined in the project `deps.edn` file including default arguments via `:exec-args`

```clojure
{:aliases
 {:deploy/local-install
  {:exec-fn clojure.tools.deps.alpha.tools.install/install
  :exec-args {:jar "./project-name.jar" :pom "./project-name.pom"}
  }}}
```
Install the jar using the default arguments using the command:

```shell
clojure -X:deploy/local-install
```


**How it works**
`clojure.tools.deps.alpha.tools.install/install` is a function to install a jar into the local Maven cache, i.e. `~/.m2/repository`. An alias called `:deps` is built into Clojure CLI tools and includes the `tools.deps.alpha` library on the classpath,

`:exec-args` optionally includes a hash-map of key/values options that can also be passed on command line











# Following content to be dropped
The following content is more of a discussion and results of experimenting to help aid understanding.  Most of the content will be dropped or used to update other content.



## Concerns & Opportunities

**Simplifying alias configuration - using edn**
the `-X` flag moves clojure functions to using a hash-map as the default argument.  This is a very beneficial approach for functions that should be configurable, such as functions that are entry points into applications, services, tasks or scripts.

`exec-fn` and `:exec-arg` support the "EDN over strings" approach.


<!-- ## Using different entry points to an application or library -->
<!-- https://insideclojure.org/2020/07/28/clj-exec/ in the next release of the Clojure CLI tools allows a more flexible approach to running Clojure code and using Edn data structures for arguments over strings. -->

<!-- The `:exec-fn` defines a fully qualified -->

<!-- ## Adapting ~/.clojure/deps.edn aliases -->
<!-- For most aliases defined there seems to be little impact, simply switching from the generic `-A` alias to the more specific `-M` alias with a main namespace to execute `-main`. -->

<!-- To run a community tool, use `-M` with an alias instead of the generic `-A` -->

<!-- So to generate a new Clojure project with `clj-new`: -->

<!-- ```shell -->
<!-- clojure -M:new app practicalli/new-world-order -->
<!-- ``` -->

<!-- The `-X` flag can be used if the `:exec-fn` option is added to the alias (optionally replacing a `:main-opts` that only sets the main namespace using the `-m` option) -->


<!-- An example from `clj-new` -->
<!-- ```clojure -->
<!--   :new {:extra-deps {seancorfield/clj-new {:mvn/version "RELEASE"}} -->
<!--         :exec-fn clj-new/create -->
<!--         :exec-args {:template lib} ; default -->
<!--         :main-opts ["-m" "clj-new.create"]} -->
<!-- ``` -->

<!-- Run Clojure with the -M flag to use the `:main-opts` namespace and call the `-main` function from that namespace. -->
<!-- ```shell -->
<!-- clojure -M:new -->
<!-- ``` -->

<!-- > If multiple aliases with :main-opts are provided, the `:main-opts` of last alias in the chain is used. -->

<!-- Run Clojure with the `-X` flag which calls the `-main` function from the namespace defined in `:exec-fn` -->

<!-- With the `:exec-fn` in the alias defining a fully qualified namespace, then the `-X` option flag -->

<!-- ```shell -->
<!-- clojure -X:new -->
<!-- ``` -->


## Edge Case - Multiple aliases containing main namespaces
REBL with CIDER / Calva uses several aliases in order to connect those editors to the REBL REPL using nREPL. Several aliases are used but only the `:nrebl` alias should use the `:main-opts` namespace.  `:cognitect-rebl` includes a main-opts section that should not be called.


**Option 1: Separate aliases**
Keep the aliases separate, providing the option of composing aliases for different purposes.

As `:cognitect-rebl` and `:nrebl` both have a namespace, the command line relies on the last alias being the only namespace that is used.  Relying on alias order seems to be optimism rather than engineering.

```shell
clojure -M:nrepl:cider-nrepl:cognitect-rebl:
```

Should the -M option call the main namespace of :cognitect-rebl, the intent of the command will fail as `:nrebl` main namespace will only run after `:congnitect-repl` main has exited (meaning there is no REBL REPL to connect with nREPL).


```clojure
  :nrepl
  {:extra-deps {nrepl/nrepl {:mvn/version "0.8.1"}}}

  :cider-nrepl
  {:extra-deps {cider/cider-nrepl             {:mvn/version "0.25.0"}
                refactor-nrepl/refactor-nrepl {:mvn/version "2.5.0"}}}

  ;; nREBL middleware to connect Cider with REBL REPL
  ;; clojure -M:nrepl:cider-nrepl::cognitect-rebl:nrebl

  :nrebl
  {:extra-deps {rickmoynihan/nrebl.middleware {:mvn/version "0.3.1"}}
   :main-opts  ["-e" "((requiring-resolve,'cognitect.rebl/ui))"
                "-m" "nrepl.cmdline"
                "-i"
                "--middleware" "[nrebl.middleware/wrap-nrebl,cider.nrepl/cider-middleware]"]}


  :cognitect-rebl
  {:extra-deps {com.cognitect/rebl          {:mvn/version "0.9.241"}
                org.clojure/core.async      {:mvn/version "1.3.610"}
                org.openjfx/javafx-fxml     {:mvn/version "11.0.1"}
                org.openjfx/javafx-controls {:mvn/version "11.0.1"}
                org.openjfx/javafx-swing    {:mvn/version "11.0.1"}
                org.openjfx/javafx-base     {:mvn/version "11.0.1"}
                org.openjfx/javafx-web      {:mvn/version "11.0.1"}}
   :main-opts  ["-m" "cognitect.rebl"]}
```

Option 2: separate aliases with duplication
Duplicate the REBL alias to create a REBL alias with only the :extra-deps, ensuring there is no conflict as to which main namespace is used

```shell
clojure -M:nrepl:cider-nrepl:cognitect-rebl-deps:nrebl
```

```clojure
  :nrepl
  {:extra-deps {nrepl/nrepl {:mvn/version "0.8.1"}}}

  :cider-nrepl
  {:extra-deps {cider/cider-nrepl             {:mvn/version "0.25.0"}
                refactor-nrepl/refactor-nrepl {:mvn/version "2.5.0"}}}

  :nrebl
  {:extra-deps {rickmoynihan/nrebl.middleware {:mvn/version "0.3.1"}}
   :main-opts  ["-e" "((requiring-resolve,'cognitect.rebl/ui))"
                "-m" "nrepl.cmdline"
                "-i"
                "--middleware" "[nrebl.middleware/wrap-nrebl,cider.nrepl/cider-middleware]"]}

  ;; Cognitect REBL deps only
  :cognitect-rebl-deps
  {:extra-deps {com.cognitect/rebl          {:mvn/version "0.9.241"}
                org.clojure/core.async      {:mvn/version "1.3.610"}
                org.openjfx/javafx-fxml     {:mvn/version "11.0.1"}
                org.openjfx/javafx-controls {:mvn/version "11.0.1"}
                org.openjfx/javafx-swing    {:mvn/version "11.0.1"}
                org.openjfx/javafx-base     {:mvn/version "11.0.1"}
                org.openjfx/javafx-web      {:mvn/version "11.0.1"}}}

  :cognitect-rebl
  {:extra-deps {com.cognitect/rebl          {:mvn/version "0.9.241"}
                org.clojure/core.async      {:mvn/version "1.3.610"}
                org.openjfx/javafx-fxml     {:mvn/version "11.0.1"}
                org.openjfx/javafx-controls {:mvn/version "11.0.1"}
                org.openjfx/javafx-swing    {:mvn/version "11.0.1"}
                org.openjfx/javafx-base     {:mvn/version "11.0.1"}
                org.openjfx/javafx-web      {:mvn/version "11.0.1"}}
   :main-opts  ["-m" "cognitect.rebl"]}
```

**Option 3: Uber-deps aliases - REJECTED**
Add all the required deps to the :nrebl alias.  This simplifies the command line call, although the alias content is much larger and there is no opportunity for re-using the rebl deps without copying them.  The verbosity of this approach is compounded if also defining a socket repl connection as well as nrepl.

The `:cognitect-rebl` alias is required when running REBL without nrepl.

```shell
clojure -M::nrebl
```

```clojure
  :nrebl
  {:extra-deps {nrepl/nrepl                   {:mvn/version "0.8.1"}
                cider/cider-nrepl             {:mvn/version "0.25.0"}
                refactor-nrepl/refactor-nrepl {:mvn/version "2.5.0"}
                rickmoynihan/nrebl.middleware {:mvn/version "0.3.1"}
                com.cognitect/rebl          {:mvn/version "0.9.241"}
                org.clojure/core.async      {:mvn/version "1.3.610"}
                org.openjfx/javafx-fxml     {:mvn/version "11.0.1"}
                org.openjfx/javafx-controls {:mvn/version "11.0.1"}
                org.openjfx/javafx-swing    {:mvn/version "11.0.1"}
                org.openjfx/javafx-base     {:mvn/version "11.0.1"}
                org.openjfx/javafx-web      {:mvn/version "11.0.1"}}
   :main-opts  ["-e" "((requiring-resolve,'cognitect.rebl/ui))"
                "-m" "nrepl.cmdline"
                "-i"
                "--middleware" "[nrebl.middleware/wrap-nrebl,cider.nrepl/cider-middleware]"]}


  :cognitect-rebl
  {:extra-deps {com.cognitect/rebl          {:mvn/version "0.9.241"}
                org.clojure/core.async      {:mvn/version "1.3.610"}
                org.openjfx/javafx-fxml     {:mvn/version "11.0.1"}
                org.openjfx/javafx-controls {:mvn/version "11.0.1"}
                org.openjfx/javafx-swing    {:mvn/version "11.0.1"}
                org.openjfx/javafx-base     {:mvn/version "11.0.1"}
                org.openjfx/javafx-web      {:mvn/version "11.0.1"}}
   :main-opts  ["-m" "cognitect.rebl"]}
```


**Option 4: Using :exec-fn and -X flag - FUTURE APPROACH**
`-X` will pull in the `:extra-deps` from all aliases in the chain (`-X:nrepl:cider-nrepl:cognitect-rebl:nrebl`).

`:exec-fn nrepl.cmdline` would be the fully qualified function that is called.

What about the other values in `:main-opts`?  If these are included I assume they are not used by `-X`




## Community Suggested flags
CLI tools flags suggested by the community:

- `-R` run the REPL with deps, paths (Sean Corfield )

- `-D` load dependencies and paths only (ignore `:main-opts`, :exec-fn) - a bit of an edge case for minimising duplication of dependencies and combining aliases even if they have :main-opts.  Chaining aliases with `-X` and then specifying the function to run with :exec-fn seems to make this flag obsolete (suggested by John Stevenson)







<!-- ## :ns-aliases -->

<!-- Do ns-aliases work like `:alias/foo`? -->

<!-- alexmiller  17:57 -->
<!-- no, they are aliases like namespace aliases -->
<!-- it's a map of alias to namespace, and you can use the alias in place of the namespace in your function name -->

<!-- dominicm  17:58 -->
<!-- Ohh, it's not for keys in the arguments.  It's for the function name. -->
<!-- I see now "symbol" in the reference, my mistake :slightly_smiling_face: -->

<!-- alexmiller  17:59 -->
<!-- right.  in your deps.edn {:aliases {:mine {:ns-aliases {foo my.other.thing}}}}  and then clj -X:mine foo/bar to invoke my.other.thing/bar -->
<!-- and may be used for other things in the future -->





<!-- ## Breaking Changes - discussion on slack -->

<!-- `-S` options replaced by `-X:deps` options -->

<!-- `-A` to be deprecated over time, use `-M` (`:main-opts`) or `-X` (`:exec-fn`, `:exec-args`). -->

<!-- `-R` and `-O` removed immediately -->


<!-- coax tools into providing -X friendly entry points -->


<!-- Recommended replacement for clojure -R:foo -C:foo -Spath ? -->
<!-- - break foo up into multiple aliases and use -A -->
<!-- if you want just parts of an alias, you should break that into multiple aliases and combine the parts you want -->

<!-- clj -Spath -M:foo -P -->
<!-- Because -P suppresses :main-opts? -->
<!-- it suppresses execution -->
<!-- it may be that -Spath should imply -P, I haven't thought about that much -->

<!-- What’s the reasoning for -Spath to continue to exist but -Stree to move to -X:deps tree? -->
<!-- Because -Spath is handled in the script and doesn't need to run a program. -->
<!-- that's not entirely true though? -Spath uses the tools jar which is a JVM program -->
<!-- Only if it isn't cached -- it's related to just the first "part" of the CLI: build classpath etc. -->
<!-- we originally had it in the list of things to change but just didn't make sense (-Sdescribe is similar) -->
<!-- seancorfield  19:31 -->
<!-- I think my biggest concern here is that several things that work in stable will simply break in the next version. -->
<!-- borkdude  19:31 -->
<!-- I view clojure as a tool for creating classpaths, and incidentally also executing them ;) -->
<!-- alexmiller  19:32 -->
<!-- yes, there are breaking changes -->
<!-- seancorfield  19:32 -->
<!-- Which means that if you use CLI tooling across a team and across various servers/CI/etc, you have to have a coordinated upgrade of the scripts, JARs, and all the changes to your code/tooling. -->
<!-- alexmiller  19:33 -->
<!-- I've spent a week deciding which migration strategy to take on each of these settings. I tried to make what I judged to be the common things continue to work -->
<!-- 19:34 -->
<!-- none of these is a final decision, that's why it's out here as a prerelease for feedback -->
<!-- 19:34 -->
<!-- the only thing I've heard that is actually breaking you now is the -Spom I think? -->
<!-- 19:35 -->
<!-- well let me flip it and say, please give me a list of what is breaking you -->
<!-- seancorfield  19:36 -->
<!-- It breaks our "outdated dependency" script, which relies on -Stree and now there's no compatible way to run that script across multiple versions of the CLI. -->
<!-- alexmiller  19:37 -->
<!-- making -Stree or -Spom continue to work is an easy thing to do -->
<!-- 19:38 -->
<!-- (by internally rewriting as -X) -->
<!-- seancorfield  19:39 -->
<!-- We don't use -R/-C but that will be a breakage for others with no compatible way to do it across multiple versions of the CLI. -->
<!-- alexmiller  19:39 -->
<!-- I don't believe there are more than a handful of people doing that -->
<!-- 19:39 -->
<!-- (but I will be watching to see if I'm wrong) -->
<!-- borkdude  19:40 -->
<!-- False if old, true if new, just dropping this here :) -->


<!-- $ clojure -Sdescribe | bb '(-> *input* :version (str/split #"\.") (->> (mapv #(Integer. %))) (compare [1 10 1 672]) nat-int?)' -->
<!-- false -->

<!-- (edited) -->
<!-- alexmiller  19:41 -->
<!-- what am I reading? -->
<!-- seancorfield  19:41 -->
<!-- CLI version sniffing :slightly_smiling_face: -->
<!-- alexmiller  19:42 -->
<!-- oh, ok -->
<!-- 19:44 -->
<!-- @seancorfield do you use -Stree with other args like -A/R/C? -->
<!-- seancorfield  19:48 -->
<!-- We use it with -A -->
<!-- 19:50 -->
<!-- Currently, we use -A everywhere in our scripts that drive CLI stuff, because we have :main-opts in "separate" aliases -- but those :main-opts are mostly accompanied by :extra-deps to bring in deps for those mains. -->
<!-- 19:50 -->
<!-- The latter means we can't switch to anything that portably runs across multiple CLI versions that doesn't also produce warnings that might interfere with any output parsing we might do. -->
<!-- borkdude  19:52 -->
<!-- What about a CLJ_VERSION variable that invokes the right version of your CLI tool? -->
<!-- alexmiller  19:52 -->
<!-- if the warnings were all stderr, would you not care? -->
<!-- 19:53 -->
<!-- (right now they are not all stderr, but they could be) -->




<!-- ## Suggested refinement to the change -->

<!-- seancorfield Yesterday at 08:44 -->
<!-- Proposal: -->
<!-- * Recommend authors change -A:stuff to -A:stuff -M:stuff for compatibility with both versions where they want :main-opts executed. -->
<!-- * Keep -R and expand it to include :extra-paths and :jvm-opts so it mnemonically matches REPL: -R/REPL, -X/eXecute, -M/Main. -->
<!-- * Undocument -A for now, officially deprecate it later (and add that warning about using -M instead), and eventually drop it altogether. -->
<!-- 16 replies -->
<!-- alexmiller  1 day ago -->
<!-- I think this is pretty good. I'll have to go back through my spreadsheets to evaluate more. I think the first bullet recommendation could even be for tool authors to do nothing, wait until most people are using a new version, then change their recommendation. -->




<!-- ## Adding distributionMnagement section to pom.xml -->

<!-- Is it possible to add functionality of generation distributionManagement section to 'clj -X:deps mvn-pom' command? -->
<!-- I need to distribute my artefacts written in Clojure  to corporate  Nexus. To do this I need section in pom.xml: -->
<!-- ```xml -->
<!-- <distributionManagement> -->
<!--   <repository> -->
<!--     <id>releases</id> -->
<!--     <url>http://mycompany/nexus/content/repositories/releases</url> -->
<!--   </repository> -->
<!--   <snapshotRepository> -->
<!--     <id>snapshots</id> -->
<!--     <url>http://mycompany/nexus/content/repositories/snapshots</url> -->
<!--   </snapshotRepository> -->
<!-- </distributionManagement> -->
<!-- ``` -->
<!-- Building and deploying artefacts is performed in corporate Jenkins, where I can't manually add this section. -->

<!-- seancorfield  06:02 -->
<!-- @mike_ananev Since clj -X:deps mvn-pom only updates dependencies and a few other bits, so what I tend to do is generate an initial POM, augment it manually, check it in to version control, then just run that command as needed to update the dependencies section (and it leaves all the rest intact). -->
<!-- 06:02 -->
<!-- So you could manually add that section, and clj will not overwrite it. -->



# Commentry from Sean

clojure -P:alias-name -- this is not a correct usage. -P is a flag option that prevents actual execution (i.e., :exec-fn and :main-opts are ignored). It will also prevent -Spath execution which surprised me a bit clojure -P -Spath does not print the classpath.
1 reply
Today at 13:35View thread
seancorfield  20:01
You have "The function must be fully qualified, eg. have a domain. The function must also take a variable number arguments, e.g. (defn fn-name [& args] ,,,)" in the section about -X but this isn't true. You can use an unqualified function name if you add the :ns-default to the alias. Also, such functions that a single argument that is a hash map (the merged value of the hash map specified by :exec-args).
20:06
I'm confused by this:

    Changing the :project-run alias to use :exec-fn and a fully qualified function (-main by default) should work when calling with clojure -X:project-run. :aliases {:run-project {:exec-fn hello]}}

so I suspect you're confused too.
-main is not the default for -X. hello is your namespace, hello/-main would be your main function but -main typically expects zero or more strings as arguments whereas -X passes a single argument -- a hash map. So attempting to invoke hello/-main via -X will not work in general (if you make it accept a single argument -- which & args would allow for -- and just ignore args then it would work but, to be clear, -X is passing a single hash map here whereas -m hello will invoke hello/-main and pass any further command-line values as strings.
20:09

    There seems commonality in using -M to represent the :main namespace in Leiningen as both will look to execute the -main function when running an app.

That's not really true. The -m option to clojure.main aligns with :main in Leiningen, so you can use :main-opts to specify it under an alias, e.g., :run and then clojure -M:run behaves like lein run, where :main hello in project.clj becomes :aliases {:run {:main-opts ["-m" "hello"]}} in deps.edn
seancorfield  20:15

    Run Clojure with the -X flag which calls the -main function from the namespace defined in :exec-fn

No. -X executes the actual function specified in :exec-fn, not -main. This seems to be the same confusion as above. The reason clj-new allows for both styles of usage is that it has clj-new/create (a function in the clj-new namespace that can be invoked via -X) and it has clj-new.create/-main so you can use -M, and the alias has :main-opts ["-m" "clj-new.create"] which will invoke clj-new.create/-main. The former (clj-new/create) accepts a single hash map as its argument -- from :exec-args and any command-line overrides; the latter (clj-new.create/-main) accepts zero or more strings from any command-line arguments provided. It requires at least two (template name and project name). Under the hood, both clj-new/create and clj-new.create/-main call a common function (that takes a single hash map argument) that does the work -- clj-new/create is just "sugar" for that so you can use a shorter name.
20:17
"should use the :main-opts namespace" -- I assume you mean the "-m" "<namespace>" form of :main-opts? The :main-opts vector can contain any "main opts" that clojure.main understands: -i, -e, -r, -m (technically the first two are considered "init opts" but in deps.edn those are part of the :main-opts vector).
20:20
:main-opts can also just contain a script name to be executed by clojure.main:

(! 641)-> cat script.clj
(println "Hello from script")
(! 642)-> clojure script.clj
WARNING: When invoking clojure.main, use -M
Hello from script
(! 643)-> clojure -M script.clj
Hello from script
(! 644)-> cat deps.edn
{:aliases
 {:script {:main-opts ["script.clj"]}}
(! 645)-> clojure -M:script
Hello from script
(! 646)->

20:21

    Relying on alias order seems to be optimism rather than engineering.

The behavior of invoking multiple aliases containing :main-opts has always been well-specified in the docs, and behaves the same in stable CLI as in prerelease CLI.
seancorfield  20:31
":exec-fn nrepl.cmdline would be the fully qualified function that is called.What about the other values in :main-opts? If these are included I assume they are not used by -X"
No, :exec-fn nrepl.cmdline is not a "fully qualified function". -X does not pay any attention to :main-opts. -M does not pay any attention to :exec-fn/:exec-args.Just like multiple aliases with -M -- where the last :main-opts wins -- you can have multiple aliases with -X but they merge

(! 652)-> clojure -X:a:b:c
called b-fn with {:a 1, :c 3}
(! 653)-> clojure -X:a:b
called b-fn with {:a 1}
(! 654)-> clojure -X:a:c
called a-fn with {:a 1, :c 3}
(! 655)-> clojure -X:b:c
called b-fn with {:c 3}
(! 656)-> cat src/cli/example.clj
(ns cli.example)(defn a-fn [data] (println "called a-fn with" data))
(defn b-fn [data] (println "called b-fn with" data))
(defn c-fn [data] (println "called c-fn with" data))
(! 657)-> cat deps.edn
{:aliases
 {:a {:exec-fn cli.example/a-fn :exec-args {:a 1}}
  :b {:exec-fn cli.example/b-fn}
  :c {:exec-args {:c 3}}}}

20:32
Because they merge, those aliases are order sensitive:

(! 658)-> clojure -X:b:a
called a-fn with {:a 1}

c.f. clojure -X:a:b above which calls b-fn.
seancorfield  20:37

    -R run the REPL with deps, paths (Sean Corfield - not clear on its purpose)

Instead of using -A to run a REPL with options (which is what the CLI prerelease docs say), expand the current -R option to respect more than just resolve-args, and use it instead of -A. You get the alliteration of -R for REPL and you wouldn't have the confusion that -A still runs :main-opts if they are present! That's intended to be a "backward compatibility" bridge from stable CLI to prerelease CLI with the intention that lets people continue with their legacy behavior, but gives a warning so you switch over to -M. But it makes it harder to do things that should not run :main-opts -- and at some future point, -A would stop running :main-opts. That's the context for why I proposed -R (and leaving -A exactly as it in stable CLI -- no warning -- but just no longer documenting -A... and eventually adding a warning to use -M... and eventually removing it altogether.
20:40

    -D load dependencies and paths only (ignore :main-opts, :exec-fn) - a bit of an edge case for minimising duplication of dependencies and combining aliases even if they have :main-opts. Chaining aliases with -X and then specifying the function to run with :exec-fn seems to make this flag obsolete (suggested by John Stevenson)

This is what the -P option is for. clojure -P -M:bunch:of:aliases would gather up all the dependencies etc and then ignore :main-opts and :exec-fn. And, again, it's why I suggested -R instead of -A because, today/stable CLI, -R means that in most cases (because most folks use resolve-args, and fewer folks use classpath-args).
20:42
(I've copied all this to a file, let me know if you want it pasted into your gist as a comment, or whether you'd rather go through and discuss it here)
practicalli:speech_bubble:  21:14
Lots of feedback, thanks.  I'll have a read through this tomorrow morning (it should survive on slack that long)
