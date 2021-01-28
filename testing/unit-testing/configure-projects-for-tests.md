## Configuration for Unit Testing deps.edn projects
[`clojure.test` namespace](https://clojure.github.io/clojure/clojure.test-api.html) is part of the Clojure standard library, so no additional dependencies are required.

As tests are defined in files inside the `test` directory, that directory should be included on the classpath for the project.


{% tabs deps="deps.edn projects", lein="Leiningen projects" %}

{% content "deps" %}

To use the test runners with `deps.edn` projects, the `test` should be on the classpath.  Tests are not typically included when Clojure is deployed, so the `test` path is not included in the main `paths` configuration of `deps.edn`.

The recommended approach is to include the test path as an alias, either by itself or with a test runner.

```clojure
{:paths ["src" "resource"]

:aliases
{:test-path
  {:extra-paths ["test"]}}
}
```


## practicalli/clojure-deps-edn
[practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdn }}) contains several test runner tools that each include the `test` directory as an additional path.

> #### Hint::Test runners for all projects
> [Install practicalli/clojure-deps-edn]({{ book.P9IClojureDepsEdnInstall }}) to have access to test runners and many other development tools for `deps.edn` based projects.


## Configure Emacs CIDER test runner
Create a [`.dir-locals.el` file to configure default aliases](https://practicalli.github.io/spacemacs/testing/unit-testing/cider-test-deps-edn-projects.html) when running deps.edn projects from Emacs CIDER / Spacemacs.

```lisp
((clojure-mode . ((cider-clojure-cli-global-options . "-A:test"))))
```

[Project level configuration](https://practicalli.github.io/spacemacs/clojure-projects/project-configuration.html) section contains many example configurations that can be set via `.dir-locals.el` file.  Remember to `revert-buffer` an existing project buffer or open a new buffer to load in changes from the `.dir-locals.el` file.


{% content "lein" %}
Leiningen automatically includes the `test` directory when running, so no additional configuration is required if all tests reside inside the `test` directory.

Run all the tests saved to file:

```shell
lein test
```

The following Leiningen plugins watch the file system and will run tests when a file change is detected in the project files.
* [lein-test-refresh](https://github.com/jakemcc/lein-test-refresh)
* [lein-auto](https://github.com/weavejester/lein-auto)

### Using different paths
`:test-paths` added as a top level key to the `defproject` configuration in the `project.clj` file will configure specific paths for tests

For example, if the tests are defined under `project-name/clj/tests` then the project.clj file would look as follows:

```clojure
(defproject myproject "0.5.0-SNAPSHOT"
  :description "A project for doing things."
  :license "Creative Commons Zero"
  :url "http://github.com/practicalli/myproject"

  :dependencies [[org.clojure/clojure "1.10.1"]]
  :test-paths   ["clj/test" "src/test/clojure"]
  :plugins      [[lein-auto "0.1.3"]])
```

> `:source-paths` can also be used to define the location of the source code files in the same manner.

{% endtabs %}

## References
* [lambdaisland/kaocha](/testing/test-runners/kaocha-test-runner.md) is a test runner that supports Clojure CLI, Leiningen and Boot project configuration.
