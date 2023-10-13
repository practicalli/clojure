# Practicalli Project Templates

Practicalli Project templates provides tools for a [REPL Reloaded Workflow](/clojure/clojure-cli/repl-reloaded/) and several production grade project configurations. 

`:project/create` alias defined in [:fontawesome-solid-book-open: Practicalli Clojure CLI Config](https://github.com/practicalli/clojure-cli-config) provides` provides seancorfield/deps-new tool for creating projects, including the [:fontawesome-brands-github: Practicalli Project Templates](https://github.com/practicalli/project-templates)

```shell
clojure -T:project/create 
```

## Available Templates

Use the `:template` command line argument to specify a project template to generate the new Clojure project.

- `practicalli/minimal` - essential tools, libraries and example code
- `practicalli/application` - general Clojure production level project template 
- `practicalli/service` - production level web services template with Http-kit, Reitit and Swagger. Optional `: component` management with `:donut` or `:integrant`
- `pracicalli/landing-page` - simple clojurescript website with bulma.io CSS and Figheel-main build tool. 

!!! EXAMPLE "Create service project with      Donut System components"
    ```shell
    clojure -T:project/create :template practicalli/service :name practicalli/todo-list :component :donut
    ```

## Common Template Design

[:fontawesome-brands-github: practicalli/project-templates](https://github.com/practicalli/project-templates){target=_blank} provide production level templates that include Practicalli tools, Docker & Compose configurations, Makefile tasks for a consistent command line UI and GitHub workflows to manage quality of code and configuration.


### Custom user namespace

Practicalli `dev/user.clj` adds tools to the REPL on start up

- `mulog_events.clj` custom publisher sends log events to portal
- `portal.clj` launch portal data inspector and set log global context
- `system_repl.clj` Component services e.g. donut-party/system, integrant REPL
- `user.clj` provides help for custom user namespace, loads portal, mulog and tools.namespace.repl to support reloading Clojure code


### Make tasks

`Makefile` defines targets used across Practicalli projects, following the [:globe_with_meridians: make standard targets for users](https://www.gnu.org/software/make/manual/html_node/Standard-Targets.html)

* `all`  calling all targets to prepare the application to be run. e.g. all: deps test-ci dist clean
* `deps` download library dependencies (depend on `deps.edn` file)
* `dist` create a distribution tar file for this program or zip deployment package for AWS Lambda
* `lint` run lint tools to check code quality  - e.g [MegaLinter](https://oxsecurity.github.io/megalinter/) which provides a wide range of tools
* `format-check` report format and style issues for a specific programming language
* `format-fix` update source code files if there are format and style issues for a specific programming language
* `pre-commit` run unit tests and code quality targets before considering a Git commit
* `repl` run an interactive run-time environment for the programming language
* `test-unit` run all unit tests
* `test-ci` test running in CI build (optionally focus on integration testing)
* `clean` remove files created by any of the commands from other targets (i.e. ensure a clean build each time)

Practicalli Makefile also defines docker targets to build and compose images locally, inspect images and prune containers and images.

- `docker-build` build Clojure project and run with docker compose
- `docker-build-clean` build Clojure project and run with docker compose, removing orphans
- `docker-down` shut down containers in docker compose
- `swagger-editor` start Swagger Editor in Docker
- `swagger-editor-down` stop Swagger Editor in Docker


### Docker

Docker configuration builds and runs the Clojure project in a Docker container, orchestrating with other services including a Database.

The service and application project templates include the following files

- `Dockerfile` multi-stage build and run, with JVM optomisations for a Docker container 
- `.dockerignore` patterns to opomise copying of files to the docker build image
- `compose.yaml` configuration for orchestrating additional services, e.g. postgresql database

