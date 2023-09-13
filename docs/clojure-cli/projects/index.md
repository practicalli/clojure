# Clojure projects

Clojure CLI projects use a [`deps.edn` file](/clojure/clojure-cli/#configure-clojure-cli) to specifies source paths and libraries required for the project to run.   

alias are defined in the  `deps.edn` file to support development tasks, providing additional libraries, paths and tools. 

!!! HINT "Generate a project from a template"
    [Create a project from a template](templates/) for a consistent project structure and include commonly used libraries.

    [Practicalli Project Templates](templates/practicalli/) create production grade projects providing a detailed starting point with configuration files for building and deploying the project.


## Create minimal project

Create a `deps.edn` file containing `{}` in the root of a directory for a minimal configuration.

Create a `src` directory as the root of the source code, and `test` directory to contain unit test code.

??? TIP "Linux command to create a minimal clojure project"
    Run these Linux commands in the root of a directory to create a minimal Clojure project structure.
    ```shell
    touch deps.edn && echo '{}' > deps.edn && mkdir src test
    ```

The project can now be run with a REPL via a [terminal UI](../repl/) or [Clojure aware Editor](/clojure/clojure-editors/).


??? TIP "Migrate project to Clojure CLI"
    [Guide to Migrating a project to Clojure CLI](migrate-project.md){target=_blank .md-button}


## Project Structure

The essence of most Clojure CLI projects contains the following files and directories.

| path         | purpose                                                           |
|--------------|-------------------------------------------------------------------|
| deps.edn     | core project configuration, paths, dependencies and aliases       |
| build.clj    | build specific configuration, create jars and uberjars            |
| src          | root directory of Clojure source files                            |
| test         | root directory for Clojure test source files                      |
| README.md    | Description of the project and how to develop / maintain it       |
| CHANGELOG.md | Meaningful history of changes to the project organised by release |
| .git         | Local git repository and configuration                            |
| .gitignore   | Git ignore patterns for the project                               |

??? INFO "Practicalli clojure-app-template example project"
    [practicalli/clojure-app-template](https://github.com/practicalli/clojure-app-template) provides a production grade example of a project starting point, with additional configuration files for building and deploying the project.
