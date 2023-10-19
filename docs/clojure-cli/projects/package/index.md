# Package with Clojure tools.build

The [:globe_with_meridians: Clojure.org tools.build project](https://clojure.org/guides/tools_build) is used to build jar files to deploy libraries and uberjar files to run deployed projects (e.g. in Docker containers or directly on an Operating System with Java JVM installed).

[Clojure tools.build](tools-build.md) is a library to define build related tasks using Clojure code.


!!! HINT "Practicalli Project Templates includes tools.build configuration"
    Clojure projects created with [Practicalli Project Templates](https://practical.li/clojure/clojure-cli/projects/templates/practicalli/) include a `build.clj` configuration to build an uberjar of the project.

    The `make build-jar` runs the `clojure -T:build jar` command to build an uberjar.


??? HINT "Java ARchive - jar file"
    A `.jar` file is a zip archive of the project containing all the files for running a Clojure project.  The archive should contain metatdata files such as Manifest and pom.xml and can contain Clojure sources or compiled class files from the project (or both).

    An ubjerjar is `.jar` file that also contains all the project dependencies including Clojure.  The uberjar is a self-contained file that can be easily deployed and requires only a Java run-time (Java Virtual Machine), using the `java -jar project-uberjar.jar` command, with the option to pass arguments to the Uberjar also.


=== "Practicalli Project Build tasks"
    [:fontawesome-solid-book-open: Practicalli Project templates](/clojure/clojure-cli/projects/templates/) include a `build.clj` configuration with `jar` and `uberjar` tasks.

    Create a runnable Clojure archive

    !!! NOTE ""
        ```shell
        clojure -T:project/build uberjar
        ```

    Create a Clojure library archive

    !!! NOTE ""
        ```shell
        clojure -T:project/build jar
        ```

=== "Clojure tools.build"

    [tools.build](tools-build.md) provides an API for pragmatically defining tasks to build Clojure projects.

    Create a `build.clj` configuration with tasks for building a library jar or runable uberjar.

    [:fontawesome-solid-book-open: Define build.clj configuration for tools.build](tools-build.md){target=_blank .md-button}
