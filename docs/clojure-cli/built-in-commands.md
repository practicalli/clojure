# Clojure CLI Built-in commands

`clojure` without any other arguments will run a REPL with a basic terminal prompt.  `clj` is a wrapper for the `clojure` command that uses `rlwrap` to add command history to the basic REPL prompt.

`clojure -T:deps` to run one of several built-in commands to help work with Clojure CLI projects and libraries.  `clojure --help` list the available commands.

`-X` execution option is used for the  `:deps` aliases, running them via `clojure.exec` and limiting the class path to the current directory.

| aliases                                               | Description                                                                                                |
| :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `clojure -X:deps list`                                | List full transitive deps set and licenses                                                                 |
| `clojure -X:deps tree`                                | download dependencies & print dependency tree, indenting libraries that are dependencies of dependencies   |
| `clojure -X:deps find-versions`                       | Find available versions of a given library (domain/name)                                                   |
| `clojure -X:deps prep`                                | Prepare all unprepped libs in the dep tree                                                                 |
| `clojure -X:deps mvn-pom`                             | Generate or update pom.xml with deps and paths                                                             |
| `clojure -X:deps mvn-install :jar '"/path/to.jar"'`   | install a given jar file into the local maven repository, eg. `~/.m2/repository`                           |
| `clojure -X:deps git-resolve-tags`                    | update `deps.edn` git based dependencies that used tags with the equivalent SHA commit values              |

[tools.deps.alpha API Reference](https://clojure.github.io/tools.deps.alpha/){target=_blank .md-button}


## List full dependencies

List the library depenencies of a project, including the library version and software licence for each library.

The list includes the transitive dependencies, library dependencies of the project library dependencies.

The `aliases` argument will also list library dependencies from a given alias, either project alias or user alias. 

```shell
clojure -X:deps list
```

??? EXAMPLE "Dependency list from Practicalli Service project template"
    ```shell
     ❯ clojure -X:deps list
    aero/aero 1.1.6  (MIT)
    amalloy/ring-buffer 1.3.1  (EPL-1.0)
    aysylu/loom 1.0.2  (EPL-1.0)
    borkdude/dynaload 0.2.2  (EPL-1.0)
    borkdude/edamame 0.0.18  (EPL-1.0)
    com.bhauman/spell-spec 0.1.2  (EPL-1.0)
    com.brunobonacci/mulog 0.9.0  (Apache-2.0)
    com.brunobonacci/mulog-adv-console 0.9.0  (Apache-2.0)
    com.brunobonacci/mulog-json 0.9.0  (Apache-2.0)
    com.cnuernber/charred 1.010 
    com.cognitect/transit-clj 1.0.324  (Apache-2.0)
    com.cognitect/transit-java 1.0.343  (Apache-2.0)
    com.fasterxml.jackson.core/jackson-annotations 2.12.1  (Apache-2.0)
    com.fasterxml.jackson.core/jackson-core 2.12.1  (Apache-2.0)
    com.fasterxml.jackson.core/jackson-databind 2.12.1  (Apache-2.0)
    com.fasterxml.jackson.datatype/jackson-datatype-jsr310 2.12.0  (Apache-2.0)
    com.google.javascript/closure-compiler v20151015  (Apache-2.0)
    com.googlecode.json-simple/json-simple 1.1.1  (Apache-2.0)
    commons-codec/commons-codec 1.15  (Apache-2.0)
    commons-fileupload/commons-fileupload 1.4  (Apache-2.0)
    commons-io/commons-io 2.6  (Apache-2.0)
    crypto-equality/crypto-equality 1.0.0  (EPL-1.0)
    crypto-random/crypto-random 1.2.0  (EPL-1.0)
    expound/expound 0.9.0  (EPL-1.0)
    fipp/fipp 0.6.25  (EPL-1.0)
    http-kit/http-kit 2.6.0  (Apache-2.0)
    javax.xml.bind/jaxb-api 2.3.0  (CDDL 1.1)
    lambdaisland/deep-diff 0.0-47  (EPL-1.0)
    meta-merge/meta-merge 1.0.0  (EPL-1.0)
    metosin/jsonista 0.3.1  (EPL-1.0)
    metosin/malli 0.7.5  (EPL-2.0)
    metosin/muuntaja 0.6.8  (EPL-1.0)
    metosin/reitit 0.5.13  (EPL-1.0)
    metosin/reitit-core 0.5.18  (EPL-1.0)
    metosin/reitit-dev 0.5.18  (EPL-1.0)
    metosin/reitit-frontend 0.5.13  (EPL-1.0)
    metosin/reitit-http 0.5.13  (EPL-1.0)
    metosin/reitit-interceptors 0.5.13  (EPL-1.0)
    metosin/reitit-malli 0.5.13  (EPL-1.0)
    metosin/reitit-middleware 0.5.13  (EPL-1.0)
    metosin/reitit-ring 0.5.13  (EPL-1.0)
    metosin/reitit-schema 0.5.13  (EPL-1.0)
    metosin/reitit-sieppari 0.5.13  (EPL-1.0)
    metosin/reitit-spec 0.5.13  (EPL-1.0)
    metosin/reitit-swagger 0.5.13  (EPL-1.0)
    metosin/reitit-swagger-ui 0.5.13  (EPL-1.0)
    metosin/ring-swagger-ui 3.36.0  (EPL-1.0)
    metosin/schema-tools 0.12.3  (EPL-1.0)
    metosin/sieppari 0.0.0-alpha13  (EPL-1.0)
    metosin/spec-tools 0.10.5  (EPL-1.0)
    mvxcvi/arrangement 2.0.0  (Public Domain)
    mvxcvi/puget 1.1.2  (Public Domain)
    org.clojure/clojure 1.11.1  (EPL-1.0)
    org.clojure/clojurescript 1.7.170  (EPL-1.0)
    org.clojure/core.rrb-vector 0.0.14  (EPL-1.0)
    org.clojure/core.specs.alpha 0.2.62  (EPL-1.0)
    org.clojure/data.json 0.2.6  (EPL-1.0)
    org.clojure/data.priority-map 0.0.5  (EPL-1.0)
    org.clojure/google-closure-library 0.0-20151016-61277aea  (Apache-2.0)
    org.clojure/google-closure-library-third-party 0.0-20151016-61277aea  (Apache-2.0)
    org.clojure/java.classpath 1.0.0  (EPL-1.0)
    org.clojure/spec.alpha 0.3.218  (EPL-1.0)
    org.clojure/test.check 1.1.1  (EPL-1.0)
    org.clojure/tools.namespace 1.3.0  (EPL-1.0)
    org.clojure/tools.reader 1.3.6  (EPL-1.0)
    org.javassist/javassist 3.18.1-GA  (MPL 1.1)
    org.mozilla/rhino 1.7R5  (Mozilla Public License, Version 2.0)
    org.msgpack/msgpack 0.6.12  (Apache-2.0)
    party.donut/system 0.0.202 
    prismatic/schema 1.1.12  (EPL-1.0)
    ring/ring-codec 1.1.3  (MIT)
    ring/ring-core 1.9.1  (MIT)
    tailrecursion/cljs-priority-map 1.2.1  (EPL-1.0)
    tech.droit/clj-diff 1.0.1  (EPL-1.0)
    ```

Use the `:aliases` option to also include the dependencies from a project or user alias.  Showing the dependencies from an aliase can useful to identify conflicting dependencies when using an alias (unlikely but it could happen).

```shell
clojure -X:deps list :aliases '[:dev/reloaded]'
```

??? EXAMPLE "Dependency list from project and Practicalli :dev/reloaded alias"
    ```shell
    ❯ clojure -X:deps list :aliases '[:dev/reloaded]'
    aero/aero 1.1.6  (MIT)
    amalloy/ring-buffer 1.3.1  (EPL-1.0)
    clj-commons/clj-yaml 1.0.27  (EPL-1.0)
    com.brunobonacci/mulog 0.9.0  (Apache-2.0)
    com.cognitect/transit-clj 1.0.333  (Apache-2.0)
    com.cognitect/transit-cljs 0.8.280  (Apache-2.0)
    com.cognitect/transit-java 1.0.371  (Apache-2.0)
    com.cognitect/transit-js 0.8.874  (Apache-2.0)
    com.fasterxml.jackson.core/jackson-core 2.14.2  (Apache-2.0)
    com.google.code.gson/gson 2.10.1  (Apache-2.0)
    com.googlecode.json-simple/json-simple 1.1.1  (Apache-2.0)
    com.nextjournal/beholder 1.0.2 
    criterium/criterium 0.4.6  (EPL-1.0)
    djblue/portal 0.49.0  (MIT)
    expound/expound 0.9.0  (EPL-1.0)
    fipp/fipp 0.6.26  (EPL-1.0)
    hawk/hawk 0.2.11  (EPL-1.0)
    http-kit/http-kit 2.7.0  (Apache-2.0)
    io.methvin/directory-watcher 0.17.3  (Apache-2.0)
    javax.activation/javax.activation-api 1.2.0  (CDDL/GPLv2+CE)
    javax.xml.bind/jaxb-api 2.4.0-b180830.0359  (CDDL 1.1)
    lambdaisland/clj-diff 1.4.78  (EPL-1.0)
    lambdaisland/deep-diff2 2.10.211  (EPL-1.0)
    lambdaisland/kaocha 1.87.1366  (EPL-1.0)
    lambdaisland/tools.namespace 0.3.256  (EPL-1.0)
    meta-merge/meta-merge 1.0.0  (EPL-1.0)
    mvxcvi/arrangement 2.1.0  (Public Domain)
    net.incongru.watchservice/barbary-watchservice 1.0  (GPLv2 + Classpath Exception)
    net.java.dev.jna/jna 5.12.1  (LGPL-2.1-or-later)
    org.clojure/clojure 1.11.1  (EPL-1.0)
    org.clojure/core.rrb-vector 0.1.2  (EPL-1.0)
    org.clojure/core.specs.alpha 0.2.62  (EPL-1.0)
    org.clojure/data.json 2.4.0  (EPL-1.0)
    org.clojure/java.classpath 1.0.0  (EPL-1.0)
    org.clojure/spec.alpha 0.3.218  (EPL-1.0)
    org.clojure/test.check 1.1.1  (EPL-1.0)
    org.clojure/tools.cli 1.0.219  (EPL-1.0)
    org.clojure/tools.namespace 1.4.4  (EPL-1.0)
    org.clojure/tools.reader 1.3.6  (EPL-1.0)
    org.clojure/tools.trace 0.7.11  (EPL-1.0)
    org.flatland/ordered 1.15.11  (EPL-1.0)
    org.javassist/javassist 3.18.1-GA  (MPL 1.1)
    org.msgpack/msgpack 0.6.12  (Apache-2.0)
    org.slf4j/slf4j-api 2.0.9  (MIT)
    org.slf4j/slf4j-nop 2.0.9  (MIT)
    org.tcrawley/dynapath 1.1.0  (EPL-1.0)
    org.yaml/snakeyaml 2.1  (Apache-2.0)
    progrock/progrock 0.1.2  (EPL-1.0)
    slingshot/slingshot 0.12.2  (EPL-1.0)
    ```

The `:aliases` option can be used to inspect the dependencies of a user alias, listing only dependencies from the specified aliases when run outside of a Clojure project.

??? EXAMPLE "Dependency list from Practicalli :repl/rebel alias only"
    ```shell
    ❯ clojure -X:deps list :aliases '[:repl/rebel]'
    cider/cider-nrepl 0.42.1  (EPL-1.0)
    cider/orchard 0.18.0  (EPL-1.0)
    cljfmt/cljfmt 0.5.7  (EPL-1.0)
    com.bhauman/rebel-readline 0.1.4  (EPL-1.0)
    com.google.javascript/closure-compiler v20151216  (Apache-2.0)
    compliment/compliment 0.3.6  (EPL-1.0)
    mx.cider/logjam 0.1.1  (EPL-1.0)
    nrepl/nrepl 1.1.0  (EPL-1.0)
    org.clojure/clojure 1.11.1  (EPL-1.0)
    org.clojure/clojurescript 1.7.228  (EPL-1.0)
    org.clojure/core.specs.alpha 0.2.62  (EPL-1.0)
    org.clojure/data.json 0.2.6  (EPL-1.0)
    org.clojure/google-closure-library 0.0-20151016-61277aea  (Apache-2.0)
    org.clojure/google-closure-library-third-party 0.0-20151016-61277aea  (Apache-2.0)
    org.clojure/spec.alpha 0.3.218  (EPL-1.0)
    org.clojure/tools.reader 1.0.0-alpha4  (EPL-1.0)
    org.fusesource.jansi/jansi 1.16  (Apache-2.0)
    org.jline/jline-reader 3.5.1  (The BSD License)
    org.jline/jline-terminal 3.5.1  (The BSD License)
    org.jline/jline-terminal-jansi 3.5.1  (The BSD License)
    org.mozilla/rhino 1.7R5  (Mozilla Public License, Version 2.0)
    rewrite-clj/rewrite-clj 0.5.2  (MIT)
    rewrite-cljs/rewrite-cljs 0.4.3  (MIT)
    ```


## Dependency tree

Run the `:deps tree` command in the root of a Clojure project to see all the dependencies

```shell
clojure -X:deps tree
```

> Libraries to satisfy the dependencies are downloaded if they are not in the local Maven cache, i.e. `$HOME/.m2/repository`, so the command may take a little time.


!!! HINT "Use Clojure CLI -P flag to download libraries"
    `clojure -P` is the recommended way to download libraries, which can also be used with aliases, e.g. `clojure -P -M:dev/reloaded:project/build`


Show the full dependencies for the project and the `:dev/reloaded` alias which could be useful if there are library conflicts when using an alias (unlikely but it could happen).

```shell
clojure -X:dev/reloaded:deps tree
```

If run outside of a Clojure CLI project, then the user configuration and Clojure CLI install dependencies are shown (could be useful if there are development tool issues from the user configuration aliases used)

```shell
❯ clojure -X:deps tree
org.clojure/clojure 1.11.1
  . org.clojure/spec.alpha 0.3.218
  . org.clojure/core.specs.alpha 0.2.62
```


## Local library install

Add a jar file for a library to the local Maven repository, e.g. `~/.m2/repository`, making that library accessible to all other local projects.

```shell
clojure -X:deps mvn-install :jar '"/path/to.jar"'`
```


## Find Library Versions

Find the available versions of a given library in the form domain/library-name (domain is typically the company name or Git Service user or organisation name).

```clojure
clojure -X:deps find-versions :lib clojure.java-time/clojure.java-time
```


## Prepare Source dependencies

Some dependencies will require a preparation step before they can be used on the classpath.

Projects that require preparation would have a configuration of the form:

```clojure
{:paths ["src" "target/classes"]
 :deps/prep-lib {:alias :build
                 :fn compile
                 :ensure "target/classes"}}
```

Including the top-level key `:deps/prep-lib` tells the tools.deps classpath construction that something extra is needed to prepare this lib and that can be performed by invoking the compile function in the :build alias. Once the prepare step has been done, it should create the path "target/classes" and that can be checked for completion.

Add a library dependency as with any other library (git or local/root):

```clojure
{:deps {practicalli/library-name {:local/root "../needs-prep"}
        practicalli/library-name {:git/sha "../needs-prep"}}}
```


`:deps prep` will built the library of any dependency that requires it

```shell
clojure -X:deps prep
```


## Resolve Git tags

<!-- TODO: Clojure CLI resolve Git tags examples -->

`-X:deps git-resolve-tags` updates git based dependencies in the project `deps.edn` file which use :git/tags key to the equivalent SHA commit values in the `:git/sha` key

```shell
clojure -X:deps git-resolve-tags
```


## References

[tools.deps and cli guide](https://clojure.org/reference/deps_and_cli){target=_blank .md-button}
[clojure.main guide](https://clojure.org/reference/repl_and_main){target=_blank .md-button}
[clojure.main API Reference](https://clojure.github.io/clojure/clojure.main-api.html){target=_blank .md-button}
[tools.deps.alpha API Reference](https://clojure.github.io/tools.deps.alpha/){target=_blank .md-button}
