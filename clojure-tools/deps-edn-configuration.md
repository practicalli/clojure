## deps.edn Configuration files
`deps.edn` is a configuration file using extensible data notation (edn), the language that is used to define the structure of Clojure itself.

The installation of Clojure CLI tools has a built-in configuration that contains a dependency for the Clojure standard library, effectively setting the default version of Clojure so the Clojure CLI tools can run.

`.clojure/deps.edn` is a user level configuration that will apply to all projects used by the operating system user account.  [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) is an example configuration that contains a set of unique aliases to ensure that common tools are available in every Clojure project.

`deps.edn` in the root of a Clojure project directory contains configuration specific to that project.

![Clojure CLI Tools - deps.edn configuration order of precedence]({{ book.P9IDeveloperGuides }}clojure/clojure-cli-tools-deps-edn-configuration-precedence.png)

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
