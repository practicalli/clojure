# Configure Clojure CLI tools
Clojure CLI tools are configured using a `deps.edn` file, written using extensible data notation (edn), the language that is used to define the structure of Clojure itself.

> #### Hint::Skip this section until you need to write your own aliases
> If using practicalli/clojure-deps-edn this section can be skipped as it provides a collection of aliases that provide a wide range of community tools.  Take a look at the [Terminal REPL](/clojure-tools/repl/) or [creating projects](/clojure-tools/projects/create.md).

## Levels of configuration

![Clojure CLI Tools - deps.edn configuration order of precedence](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-cli-tools/clojure-cli-tools-deps-edn-configuration-precedence.png)

| Configuration          | Description                                                              |
| :--                    | :--                                                                      |
| Command line arguments | string or edn arguments passed to the `clojure` command                  |
| `project/deps.edn`     | Project specific configuration: paths, dependencies, aliases             |
| `.clojure/deps.edn`    | User level configuration that will apply to all projects                 |
| CLI tools install      | Dependency for the Clojure standard library and built-in `:deps` aliases |


> #### Hint::User level configuration location
> Clojure CLI tools creates a configuration directory called `.clojure`, which [by default](https://clojure.org/reference/deps_and_cli#_deps_edn_sources) is placed in the root of the operating system user account directory, e.g. `$HOME/.clojure`.
>
> `XDG_CONFIG_HOME` may be set by your operating system and over-rides the default location, e.g. `$HOME/.config/.clojure`
>
> `CLJ_CONFIG` can be used to over-ride all other location settings
>
> Run `clojure -Sdescribe` in a terminal and checking the `:user-config` value to see the location of your Clojure configuration directory


The installation of Clojure CLI tools has a built-in configuration that contains a dependency for the Clojure standard library, effectively setting the default version of Clojure so the Clojure CLI tools can run.

`.clojure/deps.edn` is a user level configuration that will apply to all projects used by the operating system user account.  [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) is an example configuration that contains a set of unique aliases to ensure that common tools are available in every Clojure project.


## Clojure CLI Tools built-in deps aliases
The `:deps` alias is used as the root of all built-in commands in the Clojure CLI tools.

| deps aliases                                        | Description                                                                                              |
| :--                                                 | :--                                                                                                      |
| `clojure -X:deps tree`                              | download dependencies & print dependency tree, indenting libraries that are dependencies of dependencies |
| `clojure -X:deps mvn-pom`                           | generate / update `pom.xml` with the dependencies and class path for the current project                 |
| `clojure -X:deps git-resolve-tags`                  | update `deps.edn` git based dependencies that used tags with the equivalent SHA commit values            |
| `clojure -X:deps mvn-install :jar '"/path/to.jar"'` | install a given jar file into the local maven repository, eg. `~/.m2/repository`                         |

<!-- > TODO: using `clojure -X:deps` download dependencies and seems to try and run a function (internal `:exec-fn`) or command line argument (behavior observed in tests) -->


## Configuration sections
Configuration is defined using a hash-map with the following top-level keys:

* `:deps` - library dependencies
* `:paths` - directories to search for code and resources (Java classpath)
* `:aliases` - to define optional paths, deps and namespaces
* `:mvn/repos` - library dependency sources (e.g. Clojars, Maven, Artifactory, etc).

> #### Hint::practicalli/clojure-deps-edn adds common aliases and tools
> [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) provides aliases for a wide range of tools to support Clojure software development.


## Scope of configuration files
`~/.clojure/deps.edn` is user scope and is available with all the projects a specific developer works with.

`project-directory/deps.edn` is for project specific configuration, shared by anyone using the project.

The project `deps.edn` is merged into the `~/.clojure/deps.edn`, replacing any keys that are the same with project specific values. The exception is the `:paths` key, where only the last one found is used (they are not combined).

You can use the `-Sverbose` option to see all of the actual directory locations.

```shell
clojure -Sverbose
```

## Example of a deps.edn configuration.

```clojure
{
  :paths
  ["src"]

  :deps {
    org.clojure/clojure {:mvn/version "1.10.1"}
  }

  :aliases {
    :test {:extra-paths ["test"]}

    :new
    {:extra-deps {seancorfield/clj-new {:mvn/version "1.0.199"}}
     :main-opts  ["-m" "clj-new.create"]}
  }

  :mvn/repos {
    "central" {:url "https://repo1.maven.org/maven2/"}
    "clojars" {:url "https://repo.clojars.org/"}
  }
}
```

> #### Hint::Clojure Tools install sets Clojure version
> A default version of Clojure is set by the Clojure tools install, enabling the `clojure` command to know what version of Clojure library to use.  This version will be over-ridden by the user or project specific deps.edn configuration files if set.




## References
* [deps and cli](https://clojure.org/reference/deps_and_cli)
