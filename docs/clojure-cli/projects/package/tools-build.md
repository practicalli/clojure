# Clojure tools.build

[:globe_with_meridians: Clojure.org tools.build](https://clojure.org/guides/tools_build) is a library to define build related tasks using Clojure code.

[:globe_with_meridians: tools.build API](https://clojure.github.io/tools.build/) provides a consistent interface to access the project configuration (project basis) and common tasks that facilitate building and packaging projects.

The following files are created in each project that uses tools.build:

* `build.clj` contains a namespace with tasks
* `:project/build` alias containing tools.build library and sets the default namespace

`clojure -T:build task-name` to run any of the tasks defined in the default `build` namespaces.

??? HINT "Practicalli Project Templates include tools.build tasks"
    [:fontawesome-solid-book-open: Practicalli Project templates](/clojure/clojure-cli/projects/templates/) include a `build.clj` configuration with `jar` and `uberjar` tasks.


## Define a build alias

Add an alias to the project `deps.edn` file which includes the `org.clojure/tools.build` project.

!!! EXAMPLE "Alias to include tools.build library"
    ```clojure title="Project deps.edn"
      :project/build
      {:replace-paths ["."]
       :replace-deps {io.github.clojure/tools.build
                      {:git/tag "v0.9.4" :git/sha "76b78fe"}}
       :ns-default build}
    ```

??? INFO "Developing code in the build script"
    `:replace-paths ["."]` includes the `build.clj` file on the class path to allow for REPL development of the build tasks

    Include `:build` alias in the Clojure command when starting the REPL.
    ```shell
    clojure -M:project/build:repl/rebel
    ```

??? INFO "tools.build release information"
    [Clojure.org tools.build release information](:fontawesome-brands-github: https://github.com/clojure/tools.build#release-information) shows the current values for `git/tag` and `:git/sha`


## Build Script

Create a `build.clj` file to contain the build configuration and tasks.

Define the namespace and require the clojure.tools.build.api library

```clojure title="build.clj"
(ns build
  (:require [clojure.tools.build.api :as build-api]))
```

Define a configuration for the build with values used in the build tasks.

```clojure title="build.clj"
;; ---------------------------------------------------------
;; Build configuration

(def project-config
  "Project configuration to support all tasks"
  (let [library-name 'practicalli/clojure-app-template
        version (format "1.0.%s" (build-api/git-count-revs nil))]
    {:library-name    library-name
     :main-namespace  library-name
     :project-version version
     :class-directory "target/classes"
     :project-basis   (build-api/create-basis)
     :jar-file        (format "target/%s-%s.jar" (name library-name) version)
     :uberjar-file    (format "target/%s-%s-standalone.jar" (name library-name) version)}))

;; End of Build configuration
;; ---------------------------------------------------------
```


Define functions to support common tasks `clean`, `jar`, `uberjar`

!!! INFO "Functions are passed command line arguments"
    Function definitions should accept an argument as they are sent command line options when called via the `clojure -T:build` command

    If arguments are not given on the command line, a `nil` value is passed to the called function

    `_` name convention is used when a function definition does not make use of the argument that is passed


!!! EXAMPLE "tools.build tasks configuration"
    ```clojure title="build.clj"
    ;; ---------------------------------------------------------
    ;; Build tasks

    (defn clean
      "Remove a directory
      - `:path '\"directory-name\"'` for a specific directory
      - `nil` (or no command line arguments) to delete `target` directory
      `target` is the default directory for build artefacts"
      [directory]
      (build-api/delete {:path (or (:path directory) "target")}))


    (defn jar
      "Create a build of the project, cleaning existing build assets first"
      [_]
      (let [{:keys [class-directory jar-file library-name project-basis project-version]} project-config]
        (clean nil)
        (pprint/pprint project-config)
        (build-api/write-pom {:class-dir class-directory
                              :lib       library-name
                              :version   project-version
                              :basis     project-basis
                              :src-dirs  ["src"]})
        (build-api/copy-dir {:src-dirs   ["src" "resources"]
                             :target-dir class-directory})
        (build-api/jar {:class-dir class-directory
                        :jar-file  jar-file})))


    (defn uberjar
      "Create an archive containing Clojure and the build of the project"
      [_]
      (let [{:keys [class-directory main-namespace project-basis uberjar-file]} project-config]
        (clean nil)
        (build-api/copy-dir {:src-dirs   ["src" "resources"]
                             :target-dir class-directory})

        (build-api/compile-clj {:basis     project-basis
                                :src-dirs  ["src"]
                                :class-dir class-directory})

        (build-api/uber {:class-dir class-directory
                         :uber-file uberjar-file
                         :basis     project-basis
                         :main      main-namespace})))

    ;; End of Build tasks
    ;; ---------------------------------------------------------
    ```

!!! EXAMPLE "Project configuration"
    Pretty printed Example of a project configuration
    ```clojure
    {:library-name practicalli/clojure-app-template,
     :main-namespace practicalli/clojure-app-template,
     :project-version "1.0.16",
     :class-directory "target/classes",
     :project-basis
     {:paths ["src" "resources"],
      :deps #:org.clojure{clojure #:mvn{:version "1.11.1"}},
      :aliases
      {:deps
       {:replace-paths [],
        :replace-deps
        #:org.clojure{tools.deps.cli #:mvn{:version "0.9.10"}},
        :ns-default clojure.tools.deps.cli.api,
        :ns-aliases {help clojure.tools.deps.cli.help}},
       :test
       {:extra-paths ["test"],
        :extra-deps
        {org.clojure/test.check #:mvn{:version "1.1.1"},
         io.github.cognitect-labs/test-runner
         #:git{:tag "v0.5.0", :sha "48c3c67"}}},
       :env/build {:extra-paths ["."]},
       :run {:main-opts ["-m" "practicalli.clojure-app-template"]},
       :greet
       {:ns-default practicalli.clojure-app-template,
        :exec-fn greet,
        :exec-args {:name "Clojure"}},
       :build
       {:replace-paths ["."],
        :replace-deps
        #:io.github.clojure{tools.build
                            #:git{:tag "v0.9.4", :sha "76b78fe"}},
        :ns-default build}},
      :mvn/repos
      {"central" {:url "https://repo1.maven.org/maven2/"},
       "clojars" {:url "https://repo.clojars.org/"}},
      :libs
      #:org.clojure{clojure
                    {:mvn/version "1.10.3",
                     :deps/manifest :mvn,
                     :parents #{[]},
                     :paths
                     ["/home/practicalli/.m2/repository/org/clojure/clojure/1.10.3/clojure-1.10.3.jar"]},
                    spec.alpha
                    {:mvn/version "0.2.194",
                     :deps/manifest :mvn,
                     :dependents [org.clojure/clojure],
                     :parents #{[org.clojure/clojure]},
                     :paths
                     ["/home/practicalli/.m2/repository/org/clojure/spec.alpha/0.2.194/spec.alpha-0.2.194.jar"]},
                    core.specs.alpha
                    {:mvn/version "0.2.56",
                     :deps/manifest :mvn,
                     :dependents [org.clojure/clojure],
                     :parents #{[org.clojure/clojure]},
                     :paths
                     ["/home/practicalli/.m2/repository/org/clojure/core.specs.alpha/0.2.56/core.specs.alpha-0.2.56.jar"]}},
      :classpath-roots
      ["src"
       "resources"
       "/home/practicalli/.m2/repository/org/clojure/clojure/1.10.3/clojure-1.10.3.jar"
       "/home/practicalli/.m2/repository/org/clojure/core.specs.alpha/0.2.56/core.specs.alpha-0.2.56.jar"
       "/home/practicalli/.m2/repository/org/clojure/spec.alpha/0.2.194/spec.alpha-0.2.194.jar"],
      :classpath
      {"src" {:path-key :paths},
       "resources" {:path-key :paths},
       "/home/practicalli/.m2/repository/org/clojure/clojure/1.10.3/clojure-1.10.3.jar"
       {:lib-name org.clojure/clojure},
       "/home/practicalli/.m2/repository/org/clojure/core.specs.alpha/0.2.56/core.specs.alpha-0.2.56.jar"
       {:lib-name org.clojure/core.specs.alpha},
       "/home/practicalli/.m2/repository/org/clojure/spec.alpha/0.2.194/spec.alpha-0.2.194.jar"
       {:lib-name org.clojure/spec.alpha}},
      :basis-config {:user nil}},
     :jar-file "target/clojure-app-template-1.0.16.jar",
     :uberjar-file "target/clojure-app-template-1.0.16-standalone.jar"}
    ```

## Resources

[:globe_with_meridians: Clojure.org tools.build Guide](https://clojure.org/guides/tools_build){target=_blank .md-button}

[:globe_with_meridians: Clojure.org tools.build API Docs](https://clojure.github.io/tools.build/){target=_blank .md-button}

[:globe_with_meridians: Clojure.org tools.build release information](https://github.com/clojure/tools.build#release-information){target=_blank .md-button}
