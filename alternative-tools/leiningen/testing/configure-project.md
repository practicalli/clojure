# Configure Leiningen for Unit Testing
Leiningen automatically includes the `test` directory when running, so no additional configuration is required if all tests reside inside the `test` directory.

Run all the tests saved to file:

```shell
lein test
```

Run just the unit tests in a specific namepsace.

```shell
lein test :only domain.namespace-test
```

## Test related Plugins
The following Leiningen plugins watch the file system and will run tests when a file change is detected in the project files.
* [lein-test-refresh](https://github.com/jakemcc/lein-test-refresh)
* [lein-auto](https://github.com/weavejester/lein-auto)


## Using different test paths
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
