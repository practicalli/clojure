# Cognitect Labs Test Runner

Cognitect Labs test-runner is a test runner for Clojure projects defined with `deps.edn` and using `clojure.test` library which is part of the Clojure standard library.

test-runner aims to provide a standard way to discover and run unit and property-based tests, in a simple to use and lightweight tool.

## Add test-runner

Make test-runner available to all projects by adding it to `~/.clojure/deps.edn`.  Or add test-runner to specific projects by adding an alias to the project `deps.edn` file.  Include `:extra-paths` configuration to include the standard `test` directory so that the runner has access to the test code.

=== "Practicalli Clojure CLI Config"
    [:fontawesome-solid-book-open:  Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) provides aliases for test runner tools, including `:test/congnitect` for running Cognitect Labs test runner

=== "Alias Definition"
    Add an alias to run Cognitect Labs test runner, either in the project or user `deps.edn` configuration file.
    ```clojure
      :test/cognitect
      {:extra-paths ["test"]
       :extra-deps  {com.cognitect/test-runner
                     {:git/url "https://github.com/cognitect-labs/test-runner.git"
                      :sha     "f7ef16dc3b8332b0d77bc0274578ad5270fbfedd"}}
       :main-opts   ["-m" "cognitect.test-runner"]}

```

## Run test runner

Run the Cognitect Labs test runner via the command line

```shell
clojure -M:test/cognitect
```

The `cognitect.test-runner/-main` function is called which scans the `test` directory of the current project tests defined using `clojure.test`,  running all tests found.

A summary is returned with the results of running the tests.

![Clojure Unit Test - Cognitect Labs test runner example result](/images/clojure-unit-test-cognitect-labs-test-runner-results-example.png)

## Command line options

| Flag                        | Description                                                                                                   |
|-----------------------------|---------------------------------------------------------------------------------------------------------------|
| -d, --dir DIRNAME           | Name of the directory containing tests. Defaults to "test".                                                   |
| -n, --namespace SYMBOL      | Symbol indicating a specific namespace to test.                                                               |
| -r, --namespace-regex REGEX | Regex for namespaces to test. Defaults to #".*-test$"  (i.e, only namespaces ending in '-test' are evaluated) |
| -v, --var SYMBOL            | Symbol indicating the fully qualified name of a specific test.                                                |
| -i, --include KEYWORD       | Run only tests that have this metadata keyword.                                                               |
| -e, --exclude KEYWORD       | Exclude tests with this metadata keyword.                                                                     |
| -H, --test-help             | Display this help message                                                                                     |

Options can be used multiple times in one command, for a logical OR effect. For example, the following command runs all tests in the `practicalli.data.survey` and `practicalli.services.survey-report` namespaces that are found in the `src` and `test` directories

```shell
clojure -M:test/cognitect -d test -d src -n practicalli.data.survey -n practicalli.services.survey-report
```

## Test Selectors

Selectively running tests by including and excluding test categories, from the meta-data added to test definitions, i.e. `deftest`.

```clojure
(deftest ^:integration test-live-system
  (is (= 200 (:status (http/get "http://example.com")))))

```

Use the `--include` flag with the test runner to specify specific categories of tests

```shell
clojure -M:test-runner-cognitect --include :integration

```

The `--include` flag can be used multiple times, defining a test category with each include.

```shell
clojure -M:test-runner-cognitect --include :integration --include :persistence
```

[Clojure Unit Test - categories example integration and develop tests](/images/clojure-unit-test-categories-example-integration-develop.png)

`--exclude` flag runs all tests except those in the given category

```shell
clojure -M:test/cognitect --exclude :integration
```

Exclusions take priority over inclusions if both flags are included.
