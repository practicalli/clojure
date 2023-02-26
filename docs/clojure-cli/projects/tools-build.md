# Clojure tools.build

The [Clojure.org tools.build project](https://clojure.org/guides/tools_build) is used to build jar files to deploy libraries and uberjar files to run deployed projects (e.g. in Docker containers or directly on an Operating System with Java JVM installed).

Tasks are writtend in Clojure code using the [tools.build API](https://clojure.github.io/tools.build/), which provides a consistent interfact to the project configuration and common tasks that facilitate building and packaging projects.

The following are created in each project that uses tools.build:

* `build.clj` contains a namespace with tasks
* `:project/build` alias containing tools.build library and sets the default namespace

`clojure -T:build task-name` to run any of the tasks defined in the default `build` namespaces.


!!! HINT "Java ARchive - jar file"
    A `.jar` file is a zip archive of the project containing all the files for running a Clojure project.  The archive should contain metatdata files such as Manifest and pom.xml and can contain Clojure sources or compiled class files from the project (or both).

    An ubjerjar is `.jar` file that also contains all the project dependencies including Clojure.  The uberjar is a self-contained file that can be easily deployed and requires only a Java run-time (Java Virtual Machine), using the `java -jar project-uberjar.jar` command, with the option to pass arguments to the Uberjar also.


## Define a build alias

Add an alias to the project deps.edn file that includes the org.clojure/tools.build project.

```clojure title="Project deps.edn"
:project/build
{:replace-deps {io.github.clojure/tools.build {:git/tag "v0.9.2" :git/sha "fe6b140"}}
 :ns-default build}
```

> [Clojure.org tools.build release information](https://github.com/clojure/tools.build#release-information) shows the current values for `git/tag` and `:git/sha`


## Build tasks

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

(def config
  (let [library-name 'practicalli/build-me
        version (format "1.0.%s" (build-api/git-count-revs nil))]
    {:library-name    library-name
     :main-ns         library-name
     :version         version
     :class-directory "target/classes"
     :project-basis   (build-api/create-basis)
     :jar-file        (format "target/%s-%s.jar" (name library-name) version)
     :uberjar-file       (format "target/%s-%s-standalone.jar" (name library-name) version)}))

;; End of Build configuration
;; ---------------------------------------------------------
```

Write functions to support common tasks `clean`, `jar`, `uberjar`

```clojure title="build.clj"
;; ---------------------------------------------------------
;; Build tasks

(defn clean
  "Remove the given directory.
  If directory path nil, delect `target` directory used to compile build artefacts"
  [directory]
  (build-api/delete {:path (or (:path directory) "target")}))

(defn jar [_]
  (let [{:keys [class-directory jar-file library-name project-basis version]} config]
    (build-api/write-pom {:class-dir class-directory
                          :lib       library-name
                          :version   version
                          :basis     project-basis
                          :src-dirs  ["src"]})
    (build-api/copy-dir {:src-dirs   ["src" "resources"]
                         :target-dir class-directory})
    (build-api/jar {:class-dir class-directory
                    :jar-file  jar-file})))

(defn uber [_]
  (let [{:keys [class-directory main-ns project-basis uberjar-file]} config]
    (clean nil)
    (build-api/copy-dir {:src-dirs   ["src" "resources"]
                         :target-dir class-directory})
    (build-api/compile-clj {:basis     project-basis
                            :src-dirs  ["src"]
                            :class-dir class-directory})
    (build-api/uber {:class-dir class-directory
                     :uber-file uberjar-file
                     :basis     project-basis
                     :main      main-ns})))

;; End of Build tasks
;; ---------------------------------------------------------
```


## Resources

[Clojure.org tools.build Guide](https://clojure.org/guides/tools_build){target=_blank .md-button}
[Clojure.org tools.build API Docs](https://clojure.github.io/tools.build/){target=_blank .md-button}
[Clojure.org tools.build release information](https://github.com/clojure/tools.build#release-information){target=_blank .md-button}
