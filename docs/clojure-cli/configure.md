# Configure Clojure CLI

A `deps.edn` file configures the Clojure CLI, using extensible data notation (EDN), the underlying language for Clojure itself.

Configuration is defined using a hash-map with the following top-level keys:

* `:deps` - library dependencies
* `:paths` - directories to search for code and resources (Java classpath)
* `:aliases` - named configuration defining extra paths, extra deps and configuration to run Clojure
* `:mvn/repos` - library dependency sources, remote and local (e.g. Clojars, Maven, Artifactory, etc).

`:aliases` configuration is only included when using the alias name with the Clojure CLI, e.g. `:repl/rebel` alias in [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) adds library dependencies only used during development to run a rich terminal UI REPL.

```shell
clojure -M:repl/rebel
```

??? HINT "Install Practicalli Community Tool aliases"
    [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) provides aliases for a wide range of tools for use with Clojure CLI to support Clojure software development.


## Precedence Order

Clojure CLI Configuration can be used from several different sources.

| Configuration                                     | Description                                                                |
|:--------------------------------------------------|:---------------------------------------------------------------------------|
| Command line arguments                            | string or edn (key value) arguments passed to the `clojure` command        |
| project `deps.edn`                                | Project specific configuration: paths, dependencies, aliases               |
| `.config/clojure/deps.edn` or `.clojure/deps.edn` | User level configuration for use with all projects                         |
| Clojure CLI install                               | Includes Clojure standard library, `src` path and built-in `:deps` aliases |


![Clojure CLI configuration order of precedence](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-cli/clojure-cli-configuration-precedence.png)

!!! Hint "User level configuration location"
    Clojure CLI tools creates a configuration directory called `.clojure`, which [by default](https://clojure.org/reference/deps_and_cli#_deps_edn_sources) is placed in the root of the operating system user account directory, e.g. `$HOME/.clojure`.

    `XDG_CONFIG_HOME` may be set by your operating system and over-rides the default location, e.g. `$HOME/.config/.clojure`

    `CLJ_CONFIG` can be used to over-ride all other location settings

    Run `clojure -Sdescribe` in a terminal and checking the `:user-config` value to see the location of your Clojure configuration directory


The installation of Clojure CLI tools has a built-in configuration that contains a dependency for the Clojure standard library, effectively setting the default version of Clojure so the Clojure CLI tools can run.

`.clojure/deps.edn` is a user level configuration that will apply to all projects used by the operating system user account.  [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) is an example configuration that contains a set of unique aliases to ensure that common tools are available in every Clojure project.


## Scope of configuration files
`~/.clojure/deps.edn` is user scope and is available with all the projects a specific developer works with.

`project-directory/deps.edn` is for project specific configuration, shared by anyone using the project.

The project `deps.edn` is merged into the `~/.clojure/deps.edn`, replacing any keys that are the same with project specific values. The exception is the `:paths` key, where only the last one found is used (they are not combined).

You can use the `-Sverbose` option to see all of the actual directory locations.

```bash
clojure -Sverbose
```

## User deps.edn configuration

A basic example of a user configuration for Clojure CLI

```clojure
{
  :aliases {
    :env/test {:extra-paths ["test"]}

    :project/new
    {:extra-deps {seancorfield/clj-new {:mvn/version "1.0.199"}}
     :main-opts  ["-m" "clj-new.create"]}
  }

  :mvn/repos {
    "central" {:url "https://repo1.maven.org/maven2/"}
    "clojars" {:url "https://repo.clojars.org/"}
  }
}
```

!!! Hint "Clojure Tools install sets Clojure version"
    A default version of Clojure is set by the Clojure tools install, enabling the `clojure` command to know what version of Clojure library to use.  This version will be over-ridden by the user or project specific deps.edn configuration files if set.


## References

* [deps and cli](https://clojure.org/reference/deps_and_cli)
