# Add libraries to a project

The project `deps.edn` file is used to add specific versions of libraries to a project.

The `:deps` top-level key defines libraries that are always included, e.g when starting the REPL or packaging a project in an Uberjar.

Aliases are defined to include libraries only when the alias name is included, e.g. `:dev/reloaded` alias includes several libraries only relevant during development of a Clojure project.

There are thousands of community Clojure and ClojureScript libraries available via [clojars.org](https://clojars.org) and Maven Central.

`:deps` top level key contains a hash-map of dependencies, each dependency of the form `domain/name {:mvn/version "version-number"}`

```clojure title="Project deps.edn"
{:deps
 {org.clojure/clojure {:mvn/version "1.12.1"}
  hiccup/hiccup       {:mvn/version "2.0.0-alpha2"}}}
```

??? HINT "Finding libraries"
    Search for community libraries via the [Clojars.org website](https://clojars.org/) or visit [the Clojure Toolbox](https://www.clojure-toolbox.com/) to browse some of the community libraries available

    `clojure -M:search/libraries pattern` where pattern is the name of the library to search for. Copy the relevant results into the project `deps.edn` file.

    `clojure -M:search/libraries --format:merge pattern` will automatically add the library into the `deps.edn` file.

    `clojure -X:deps find-versions :lib fully.qualified/library-name :n 5` returns the last 5 versions of the given library.


## Alias libraries

`:aliases` top-level key contains a hash-map of alias definitions.

Each alias has a unique name with `:aliases` and is represented by a Clojure keyword associated with a Clojure hash-map, `{}`

`:extra-deps` keyword is associated with hash-map that contains one or more fully qualified library names and the version of the library to use.

The version of the library can be defined as the maven release or a Git repository

- **Maven**   `qualified/name {:mvn/version "release"}`
- **Git SHA** `qualified/name {:git/tag "tag-id" :git/sha "sha-short"}`
- **Git URL** `qualified/name {:git/url "qualified/name" :git/sha "sha-full"}`
- **Local Project** `qualified/name {:local/root "full/path/to/project/root/"}`


The following example can be added to a project `deps.edn`, within the `:aliases {}` form.

??? EXAMPLE "deps.edn aliases with maven, git and local root"
    ```clojure title="deps.edn"
    :aliases {

      ;; Local testing of Practicalli Project Templates
      :project/create-local
      {:replace-deps {io.github.seancorfield/deps-new
                      {:git/tag "v0.14.1" :git/sha "39d257c"}
                      practicalli/project-templates
                      {:local/root "/home/practicalli/projects/practicalli/code/project-templates/"}}
       :exec-fn      org.corfield.new/create
       :exec-args    {:template practicalli/minimal
                      :name practicalli/playground}}

      ;; deps-new and Practicalli Project Teamplates
      ;; clojure -T:project/create :template template/name :name project/name
      :project/create
      {:replace-deps {io.github.seancorfield/deps-new
                      {:git/tag "v0.14.1" :git/sha "39d257c"}
                      io.github.practicalli/project-templates
                      {:git/tag "2026-02-05" :git/sha "d414973"}}
       :exec-fn      org.corfield.new/create
       :exec-args    {:template practicalli/minimal
                      :name practicalli/playground}}

      :search/unused-vars
      {:extra-deps {borkdude/carve
                    {:git/url "https://github.com/borkdude/carve"
                     :sha     "fdd1d0bc432f63db69e3a72167ef5e46f10dfba7"}}
       :main-opts  ["--main" "carve.main"]}
    }
    ```

Start `clojure` with the alias name and the dependencies defined are included in the JVM classpath and can be required via the Clojure REPL.

```shell
clojure -M:search/unused-vars
```



## Excluding dependencies

Adding several libraries as dependencies to a project may cause conflicts. The `:exclusions`  key will prevent libraries within a library dependency from being included in the project

For example, library-a and library-b both have a dependency on library-c, as defined in the project configuration for library-a and library-b.  When including library-a and library-b in the project as dependencies, there could be a conflict if the both libraries use a different version of library-c.  Adding an exclude to library-a or library-b will stop library-c being included twice.

A Library that is self-contained and does not itself include any dependencies on any other libraries is unlikely to cause conflicts.  Using these self-contained libraries simplifies the overall application design.

```clojure
{:deps {:org.clojure/clojure {:mvn/version "1.10.2"}
        :cheshire/cheshire  {:mvn/version "5.10.0"
            :exclusions "com.fasterxml.jackson.core/jackson-core"}}}
```
