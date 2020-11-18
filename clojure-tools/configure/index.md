# Configure Clojure CLI tools
Clojure CLI tools are configured using a `deps.edn` file, written using extensible data notation (edn), the language that is used to define the structure of Clojure itself.



## Levels of configuration

![Clojure CLI Tools - deps.edn configuration order of precedence](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/clojure-cli-tools/clojure-cli-tools-deps-edn-configuration-precedence.png)

| Configuration          | Description                                                              |
| :--                    | :--                                                                      |
| Command line arguments | string or edn arguments passed to the `clojure` command                  |
| `project/deps.edn`     | Project specific configuration: paths, dependencies, aliases             |
| `.clojure/deps.edn`    | User level configuration that will apply to all projects                 |
| CLI tools install      | Dependency for the Clojure standard library and built-in `:deps` aliases |


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
