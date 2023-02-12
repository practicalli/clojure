# Add libraries to a project

The project `deps.edn` file is used to add specific versions of libraries to a project.

The `:deps` top-level key defines libraries that are always included, e.g when starting the REPL or packaging a project in an Uberjar.

Aliases are defined to include libraries only when the alias name is included, e.g. `:dev/reloaded` alias includes several libraries only relevant during development of a Clojure project.

There are thousands of community Clojure and ClojureScript libraries available via [clojars.org](https://clojars.org) and Maven Central.

`:deps` top level key contains a hash-map of dependencies, each dependency of the form `domain/name {:mvn/version "version-number"}`

```clojure title="Project deps.edn"
{:deps
 {org.clojure/clojure {:mvn/version "1.11.1"}
  hiccup/hiccup       {:mvn/version "2.0.0-alpha2"}}}
```

??? HINT "Use Clojure CLI to search for libraries by name"
    `clojure -M:search/libraries pattern` where pattern is the name of the library to search for.  Copy the relevant results into the project `deps.edn` file.

    `clojure -M:search/libraries --format:merge pattern` will automatically add the library into the `deps.edn` file.

    Or visit [the Clojure Toolbox](https://www.clojure-toolbox.com/) to browse some of the community libraries available


## Alias libraries

`:aliases` top-level key contains a hash-map of alias definitions.

Each alias has a unique name with `:aliases` and is represented by a Clojure keyword associated with a Clojure hash-map, `{}`

`:extra-deps` keyword is associated with hash-map that contains one or more fully qualified library names and the version of the library to use.  The version of the library is defined with the maven form `{:mvn/version "0.4.2"}` or Git form `{:git/url "https://github.com/clojure/tools.deps.alpha" :git/sha "e4fb92eef724fa39e29b39cc2b1a850567d490dd"}`

The following example can be added to a project `deps.edn`, within the `:aliases {}` form.

```clojure title="deps.edn alias definition with maven and git versions"
:dev/reloaded
{:extra-deps {djblue/portal {:mvn/version "0.34.2"}
              lambdaisland/kaocha {:mvn/version "1.71.1119"}
              org.clojure/test.check {:mvn/version "1.1.1"}
              org.clojure/tools.namespace {:mvn/version "1.3.0"}
              org.clojure/tools.deps.alpha {:git/url "https://github.com/clojure/tools.deps.alpha"
                                            :git/sha "e4fb92eef724fa39e29b39cc2b1a850567d490dd"}}}
```

When the alias is included in the command to start the REPL, the libraries are placed on the class path and can be required for use.

```shell
clojure -M:dev/reloaded:repl/rebel
```


## Hotload libraries

Use a rich comment block or [a `dev/user.clj` file](/clojure-cli/projects/configure-repl-startup.md) to require the `clojure.tools.deps.alpha.repl` namespace and write `add-libs` expressions to hot-load libraries.

A rich comment block ensures `add-libs` code is only evaluated manually by a developer.

```clojure
(comment
  (require '[clojure.tools.deps.alpha.repl :refer [add-libs]])
  (add-libs '{http-kit/http-kit {:mvn/version "2.5.1"}})
)
```

??? HINT "Clojure LSP snippets"
    [Snippets provided by Clojure LSP](https://clojure-lsp.io/features/#snippets) include `rich-comment-hotload`, to add a rich comment block with a require for `clojure.tools.deps.alpha` and an `add-libs` expression, making it very quick to add this code.

    `deps-maven` and `deps-git` snippets help ensure the correct syntax is used for the `add-libs` expression for each library dependency to be added.


### Hotload Example

Create a web server from scratch, serving pages generated from hiccup, with all libraries hot-loaded as the code is being written.  Demonstrates that it is possible to write an application when only starting the REPL once.

```clojure
(comment
  ;; run REPL with :lib/hotload alias
  (require '[clojure.tools.deps.alpha.repl :refer [add-libs]])
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

