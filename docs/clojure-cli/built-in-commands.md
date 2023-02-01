# Clojure CLI Built-in commands

The `:deps` alias is used as the root of all built-in commands in the Clojure CLI tools.  `clojure --help` list the available commands.

`-X` execution option is used for all built-in aliases, running them via `clojure.exec`

| aliases                                             | Description                                                                                              |
|:----------------------------------------------------|:---------------------------------------------------------------------------------------------------------|
| `clojure -X:deps list`                              | List full transitive deps set and licenses                                                               |
| `clojure -X:deps tree`                              | download dependencies & print dependency tree, indenting libraries that are dependencies of dependencies |
| `clojure -X:deps find-versions`                     | Find available versions of a given library (domain/name)
| `clojure -X:deps prep`                              | Prepare all unprepped libs in the dep tree
| `clojure -X:deps mvn-install :jar '"/path/to.jar"'` | install a given jar file into the local maven repository, eg. `~/.m2/repository`                         |
| `clojure -X:deps git-resolve-tags`                  | update `deps.edn` git based dependencies that used tags with the equivalent SHA commit values            |


## List full dependencies

Report on the depenencies of a project and any included aliases, including the transitive dependencies (dependencies of dependencies).

Show the full dependencies for the project

```shell
clojure -X:deps list
```

Show the full dependencies for the project and the `:dev/reloaded` alias which could be useful if there are library conflicts when using an alias (unlikely but it could happen).

```shell
clojure -X:dev/reloaded:deps list
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

/* TODO: Clojure CLI resolve Git tags examples */

`-X:deps git-resolve-tags` updates git based dependencies in the project `deps.edn` file which use :git/tags key to the equivalent SHA commit values in the `:git/sha` key

```shell
clojure -X:deps git-resolve-tags
```
