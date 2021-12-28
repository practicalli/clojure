# Common Development Tasks
Clojure CLI tools can be used for a number of tasks, especially when combined with the community tools available via [practicalli/clojure-deps-edn configuration](https://practicalli.github.io/clojure/clojure-cli/install/community-tools.html).

- Run a REPL (clj, rebel, reveal)
- Create a new project from a template
- Run a specific function - taking hash-map as argument (simple function, scripts, applications)
- Run a Clojure application, optionally providing arguments
- Download project dependencies (dry run, CI service task)
- Run tests locally and via CI server (using community tools)
- Package an application for deployment
- Run project scripts - database migrations, reports, etc.
- Run a range community tools (~/.clojure/deps.edn)


# Common development tasks

* Built-in tasks require no additional configuration.
* User aliases are from the user level configuration, e.g. `~/.clojure/deps.edn`.
* Project aliases are contained in the project deps.edn file
* User/Project alias can be defined in both user and project deps.edn files (typically added to project deps.edn for external running such as Continuous Integration)

| Task                                                    | Command                                                         | Configuration      |
|---------------------------------------------------------|-----------------------------------------------------------------|--------------------|
| Create project (clojure exec)                           | `clojure -X:project/new :template app :name practicalli/my-app` | User alias         |
| Run REPL (rebel readline)                               | `clojure -M:repl/rebel`                                         | User alias         |
| Run REPL (rebel and nrepl)                              | `clojure -M:repl/rebel-nrepl`                                   | User alias         |
| Run REPL (rebel and reveal data visualization)          | `clojure -M:repl/rebel-reveal`                                  | User alias         |
| Download dependencies                                   | `clojure -Spath` or `clojure -P`  (plus optional aliases)       | Built-in           |
| Find libraries (mvn & git)                              | `clojure -M:project/find-deps library-name`                     | User alias         |
| Generate image of project dependency graph              | `clojure -X:project/graph-deps`                                 | User alias         |
| Check for new dependency versions                       | `clojure -M:project/outdated`                                   | User alias         |
| Run tests                                               | `clojure -M:test/runner`                                        | User/Project alias |
| Run the project                                         | `clojure -M -m domain.main-namespace`                           | Built-in           |
| [Run the project](https://youtu.be/u5VoFpsntXc?t=2166)* | `clojure -X:project/run`                                        | Project alias      |
| Package library                                         | `clojure -X:project/jar`                                        | User/Project alias |
| Deploy library locally                                  | `clojure -X:deps mvn-install`                                   | Built-in           |
| Package application                                     | `clojure -X:project/uberjar`                                    | User/Project alias |

> Add alias `:project/run` to the deps.edn file in the root of a project: `:project/run {:ns-default domain.namespace :exec-fn -main}` - see this video for an example https://youtu.be/u5VoFpsntXc?t=2166

> Most aliases use the `-M` flag.  Only use the `-X` flag when you know it is supported by that task
