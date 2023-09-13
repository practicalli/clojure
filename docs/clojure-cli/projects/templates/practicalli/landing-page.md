# Practicalli Landing Page

Build simple websites and landing pages using ClojureScript and figwheel-main.

```shell
clojure -T:project/create :template landing-page :name practicalli/website-name
```


## Using the project

Run the REPL

```shell
make repl
```

Run tests (stopping on first failing test)

```shell
make test
```



## Template design

Configuration files

- `deps.edn` project dependencies and aliases defining figwheel builds
- `dev.cljs.edn` development build configuration
- `live.cljs.edn` live build configuration (GitHub pages deployment by default)
- `figwheel-main.edn` general figwheel configuration

Clojure code

- `src/project/landing-page.clj` compose components to render the website
- `src/project/components.clj` functions that define component and associated helper functions
- `src/project/data.clj` data structure passed in part or whole to each component, via the `landing-page`.

> `project.data` namespace defines an example data structure as a static value (def).  Use an atom to contain the data structure if the data should be updated by components in the project.
