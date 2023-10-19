# Package projects with tools.build

??? WARNING "Improved build script examples have been added"
    Please report any issues using the new examples

[:globe_with_meridians: Clojure.org tools.build](https://clojure.org/guides/tools_build) is a library to define build related tasks using Clojure code.

The [:globe_with_meridians: tools.build API](https://clojure.github.io/tools.build/) provides a consistent interface to access the project configuration (project basis) and common tasks that facilitate building and packaging projects.

Include a **build alias** and **build script** in each project to make use of Clojure tools.build:

- `:build/task` alias adding tools.build library to the class path in the project `deps.edn` file
- `build.clj` defines a namespace requiring tools.build, a project configuration and functions as build tasks

??? HINT "Practicalli Project Templates include tools.build tasks"
    [:fontawesome-solid-book-open: Practicalli Project templates](/clojure/clojure-cli/projects/templates/) include a `build.clj` tasks to generate a library `jar` or a service `uberjar`.


## Define build alias

Add an alias to the project `deps.edn` file which includes the `org.clojure/tools.build` project.

!!! EXAMPLE ":build/task alias created by Practicalli Project Templates"
    ```clojure title="Project deps.edn"
      ;; tools.build `build.clj` built script
      :build/task
      {:replace-paths ["."]
       :replace-deps {io.github.clojure/tools.build
                      {:git/tag "v0.9.6" :git/sha "8e78bcc"}}
       :ns-default build}
    ```

Use Clojure CLI to run any of the tasks defined in the `build` namespaces.

```shell
clojure -T:build/task task-name
```

??? INFO "tools.build release information"
    [Clojure.org tools.build release information](:fontawesome-brands-github: https://github.com/clojure/tools.build#release-information) shows the current values for `git/tag` and `:git/sha`


??? INFO "Developing code in the build script"
    `:replace-paths ["."]` includes the `build.clj` file on the class path to allow for REPL development of the build tasks

    Include `:build` alias in the Clojure command when starting the REPL.
    ```shell
    clojure -M:build/task:repl/rebel
    ```


## Build Script

Create a `build.clj` file which defines a namespace requiring tools.build, a project configuration and functions as build tasks

An **Uberjar** file is built to deploy a Clojure service, e.g. in test, staging or production environment.

A **Jar** file is built to published a Clojure library to a Maven repository, e.g. Clojars.org, Maven Central or a private Maven repository.


### Namespace definition

Define the namespace and require the clojure.tools.build.api and any additional libraries.

=== "Service Uberjar"

    !!! EXAMPLE "Namespace definition with tools.build.api and Pretty Print"
        ```clojure title="build.clj"
        (ns build
          (:require
           [clojure.tools.build.api :as build-api]
           [clojure.pprint :as pprint]))
        ```

=== "Library Jar"

    !!! EXAMPLE "Namespace definition with tools.build.api and Pretty Print"
        ```clojure title="build.clj"
        (ns build
          (:require
           [clojure.tools.build.api :as build-api]
           [deps-deploy.deps-deploy :as deploy-api]
           [clojure.pprint :as pprint]))
        ```

### Build configuration

Define a hash-map containing keys and values required to build the project.

=== "Service Uberjar"
    Define a project configuration for building an Uberjar file to run a service using the `java -jar` command.

    The Uberjar can be deployed to run the service in test, staging and production environments.

    !!! EXAMPLE "Clojure Service build tasks"
        ```clojure title="build.clj"
        ;; ---------------------------------------------------------
        ;; Project configuration

        (def project-config
          "Project configuration to support build tasks"
          {:class-directory "target/classes"
           :main-namespace  'practicalli/project-name/service
           :project-basis   (build-api/create-basis)
           :uberjar-file    "target/practicalli-servicename-standalone.jar"})

        (defn config
          "Display build configuration"
          [config]
          (pprint/pprint (or config project-config)))

        ;; End of Build configuration
        ;; ---------------------------------------------------------
        ```


=== "Library Jar"
    Define a project configuration for building a jar file for deployment on Clojars and Maven Central, or a private repository. 

    - `pom-template` is the standard structure for generating a pom.xml file, required by Maven repositories, i.e. Clojars.org and Maven Central
    - `project-config` specific values for building the project, e.g. name, version, etc.
    - `config` function to pretty print the build configuration

    !!! EXAMPLE "Clojure Library build tasks"
        ```clojure title="build.clj"
        ;; ---------------------------------------------------------
        ;; Build configuration

        (defn- pom-template
          "Standard structure for a `pom.xml` file, a Maven project configuration 
          required to deploy libraries to Clojars.org, Maven Central or private Maven repositories
          https://maven.apache.org/guides/introduction/introduction-to-the-pom.html"
          [project-version]
          [[:description "FIXME: add purpose of library."]
           [:url "https://github.com/organisation/project-name"]
           [:licenses
            [:license
             [:name "Creative Commons Attribution-ShareAlike 4.0 International"]
             [:url "https://creativecommons.org/licenses/by-sa/4.0/"]]]
           [:developers
            [:developer
             [:name "Organisation name"]]]
           [:scm
            [:url "https://github.com/organisation/project-name"]
            [:connection "scm:git:https://github.com/organisation/project-name.git"]
            [:developerConnection "scm:git:ssh:git@github.com:organisation/project-name.git"]
            [:tag (str "v" project-version)]]])


        (def project-config
          "Project configuration to support build tasks"
          (let [library-name 'net.clojars.organisation/project-name
                version "0.1.0-SNAPSHOT"]
            {:library-name     library-name
             :project-version  version
             :jar-file         (format "target/%s-%s.jar" (name library-name) version)
             :project-basis    (build-api/create-basis)
             :class-directory  "target/classes"
             :src-directory    ["src"]
             :target-directory "target"
             :pom-config       (pom-template version)}))


        (defn config
          "Display build configuration"
          [config]
          (pprint/pprint (or config project-config)))
        ;; End of Build configuration
        ;; ---------------------------------------------------------
        ```

### Build Task


=== "Service Uberjar"

    Define Clojure functions to run the required build tasks

    - `clean` to remove build artefacts, e.g. `target` directory
    - `Uberjar` creates a Jar file for a Clojure library, ready for publishing

    !!! EXAMPLE "Clojure Service build tasks"
        ```clojure title="build.clj"
        ;; ---------------------------------------------------------
        ;; Build tasks

        (defn clean
          "Remove a directory
          - `:path '\"directory-name\"'` for a specific directory
          - `nil` (or no command line arguments) to delete `target` directory
          `target` is the default directory for build artefacts
          Checks that `.` and `/` directories are not deleted"
          [directory]
          (when
           (not (contains? #{"." "/"} directory))
           (build-api/delete {:path (or (:path directory) "target")})))


        (defn uberjar
          "Create an archive containing Clojure and the build of the project
          Merge command line configuration to the default project config"
          [options]
          (let [config (merge project-config options)
                {:keys [class-directory main-namespace project-basis uberjar-file]} config]
            (clean "target")
            (build-api/copy-dir {:src-dirs   ["src" "resources"]
                                 :target-dir class-directory})

            (build-api/compile-clj {:basis     project-basis
                                    :class-dir class-directory
                                    :src-dirs  ["src"]})

            (build-api/uber {:basis     project-basis
                             :class-dir class-directory
                             :main      main-namespace
                             :uber-file uberjar-file})))

        ;; End of Build tasks
        ;; ---------------------------------------------------------
        ```

=== "Library Jar"

    Define Clojure functions to run the required build tasks

    - `clean` to remove build artefacts, e.g. `target` directory
    - `jar` creates a Jar file for a Clojure library, ready for publishing
    - `install` a built jar into the local Maven repository, e.g. `~/.m2/repository/
    - `publish` a built jar to Clojars.org 

    !!! EXAMPLE "Clojure Library build tasks"
        ```clojure title="build.clj"
        ;; ---------------------------------------------------------
        ;; Build tasks

        (defn clean
          "Remove a directory
          - `:path '\"directory-name\"'` for a specific directory
          - `nil` (or no command line arguments) to delete `target` directory
          `target` is the default directory for build artefacts
          Checks that `.` and `/` directories are not deleted"
          [directory]
          (when (not (contains? #{"." "/"} directory))
            (build-api/delete {:path (or (:path directory) "target")})))

        (defn jar "Run the CI pipeline of tests (and build the JAR)."
          [config]
          (clean "target")
          (let [config (project-config config)
                class-directory (config :class-directory)]
            (println "\nWriting pom.xml...")
            (build-api/write-pom (merge (pom-template config)))
            (println "\nCopying source...")
            (build-api/copy-dir {:src-directory ["resources" "src"] :target-directory class-directory})
            (println "\nBuilding JAR..." (:jar-file config))
            (build-api/jar config))
          config)

        (defn install
          "Install a built JAR in the local Maven repository, e.g. `.m2/repository`"
          [config]
          (let [config (project-config config)]
            (build-api/install config))
          config)

        (defn publish 
          "Publish the built JAR to Clojars." 
          [config]
          (let [{:keys [jar-file] :as config} (project-config config)]
            (deploy-api/deploy
             {:installer :remote :artifact (build-api/resolve-path jar-file)
              :pom-file (build-api/pom-path (select-keys config [:library-name :class-directory]))}))
          config)

        ;; End of Build tasks
        ;; ---------------------------------------------------------
        ```

<!--

??? EXAMPLE "tools.build uberjar task configuration"
    ```clojure title="build.clj"
    ;; ---------------------------------------------------------
    ;; Build Script
    ;;
    ;; Build project and package for deployment
    ;; - `uberjar` - packaged application for deployment
    ;; - `clean` remove all build assets and jar files
    ;;
    ;; All functions are passed command line arguments
    ;; - `nil` is passed if there are no arguments
    ;;
    ;;
    ;; tools.build API commands
    ;; - `create-basis` create a project basis
    ;; - `copy-dir` copy Clojure source and resources into a working dir
    ;; - `compile-clj` compile Clojure source code to classes
    ;; - `delete` - remove path from file space
    ;; - `write-pom` - write pom.xml and pom.properties files
    ;; - `jar` - to jar up the working dir into a jar file
    ;;
    ;; ---------------------------------------------------------

    (ns build
      (:require
       [clojure.tools.build.api :as build-api]
       [clojure.pprint :as pprint]))

    ;; ---------------------------------------------------------
    ;; Project configuration

    (def project-config
      "Project configuration to support all tasks"
      {:class-directory "target/classes"
       :main-namespace  'practicalli/bob-the-builder
       :project-basis   (build-api/create-basis)
       :uberjar-file    "target/practicalli-service-name-standalone.jar"})

    (defn config
      "Display build configuration"
      [config]
      (pprint/pprint (or config project-config)))

    ;; End of Build configuration
    ;; ---------------------------------------------------------

    ;; ---------------------------------------------------------
    ;; Build tasks

    (defn clean
      "Remove a directory
      - `:path '\"directory-name\"'` for a specific directory
      - `nil` (or no command line arguments) to delete `target` directory
      `target` is the default directory for build artefacts
      Checks that `.` and `/` directories are not deleted"
      [directory]
      (when
       (not (contains? #{"." "/"} directory))
       (build-api/delete {:path (or (:path directory) "target")})))


    (defn uberjar
      "Create an archive containing Clojure and the build of the project
      Merge command line configuration to the default project config"
      [options]
      (let [config (merge project-config options)
            {:keys [class-directory main-namespace project-basis uberjar-file]} config]
        (clean "target")
        (build-api/copy-dir {:src-dirs   ["src" "resources"]
                             :target-dir class-directory})

        (build-api/compile-clj {:basis     project-basis
                                :class-dir class-directory
                                :src-dirs  ["src"]})

        (build-api/uber {:basis     project-basis
                         :class-dir class-directory
                         :main      main-namespace
                         :uber-file uberjar-file})))

    ;; End of Build tasks
    ;; ---------------------------------------------------------



??? EXAMPLE "tools.build jar task configuration"
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

??? EXAMPLE "Project configuration"
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

-->

## Resources

[:globe_with_meridians: Clojure.org tools.build Guide](https://clojure.org/guides/tools_build){target=_blank .md-button}

[:globe_with_meridians: Clojure.org tools.build API Docs](https://clojure.github.io/tools.build/){target=_blank .md-button}

[:globe_with_meridians: Clojure.org tools.build release information](https://github.com/clojure/tools.build#release-information){target=_blank .md-button}
