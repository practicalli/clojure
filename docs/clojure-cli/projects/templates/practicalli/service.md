# Practicalli Service template

Develop web services and APIs using the `practicalli/service` template.

```shell
clojure -T:project/create :template practicalli/service
```

The `practicalli/services` includes:

- **http-kit** provides an HTTP web server responding to HTTP requests
- **reitit** routing
- **mulog** event logging and publisher
- **Portal** data inspector
- **Makefile** with common Practicalli tasks

A component system can be included by providing the `:component :donut` or `:component integrant` command line arguments.


## Component systems

Components in the system can be managed during development by evaluating functions in the REPL.

- `(start)` starts all components in order
- `(stop)` stops  all components in order
- `(restart)` reload changed namespaces and restart all components in order
- `(system)` prints out the system configuration

The `system-repl.clj` defines the functions to manage components, using the chosen component library, e.g. Donut system, Integrant REPL.

When running the application from the command line, the `src/domain/project/service/-main` function calls the initialisation of components and creates a var called `running-system` that contains the initialised system components.  `-main` contains a shutdown hook that responds to SIGTERM signals, triggering a shutdown of components in the `running-system`.


=== "Donut System"

    Include Donut system configuration and REPL functions

    ```shell
    clojure -T:project/create :template practicalli/service :component :donut
    ```

    - `src/domain/project/system.clj` defines the system components
    - `dev/system-repl.clj` defines funtions to manage the system components

    Each component is defined within the `system` namespace in the `domain.project.system/main` hash-map.  Each component definition has a start and stop function, optionally passing configuration options and environment variables for that component.


=== "Integrant"

    Include Integrant system configuration and Integrant REPL functions to support development

    ```shell
    clojure -T:project/create :template practicalli/service :component :integrant
    ```

    - `src/domain/project/system.clj` defines the system components
    - `dev/system-repl.clj` defines funtions to manage the system components

    Each component is started with an init multi-method with a the specific component name (keyword).  Each `init` multi-method provides the specific Clojure code to start the component.

    A `halt` multi-method is provided for each component that requires shutting down, e.g. http server, database pool, logging publisher, etc.


    During development and testing, the components are managed from the `user` namespace by evaluating the `(start)`, (stop) or `(restart)` functions.



## Using the project

Run the REPL

```shell
make repl
```

The REPL prompt is displayed using Rebel for a rich UI experience.  Portal data inspector window is displayed and all evaluation results and mulog events are automatically sent to Portal.

An nREPL server is running in the background for connecting Clojure aware editors.


Run tests (stopping on first failing test)

```shell
make test
```
