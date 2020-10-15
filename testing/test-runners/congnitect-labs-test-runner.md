# Cognitect Labs Test Runner
test-runner is a test runner for Clojure projects defined with `deps.edn` and using `clojure.test` library which is part of the Clojure standard library.

test-runner aims to provide a standard way to discover and run unit and property-based tests, in a simple to use and lightweight tool.

## Adding test-runner
Make test-runner available to all projects by adding it to `~/.clojure/deps.edn`.  Or add test-runner to specific projects by adding an alias to the project `deps.edn` file.  Include `:extra-paths` configuration to include the standard `test` directory so that the runner has access to the test code.

```clojure
  :test-runner-cognitect
  {:extra-paths ["test"]
   :extra-deps  {com.cognitect/test-runner
                 {:git/url "https://github.com/cognitect-labs/test-runner.git"
                  :sha     "f7ef16dc3b8332b0d77bc0274578ad5270fbfedd"}}
   :main-opts   ["-m" "cognitect.test-runner"]}
```

> #### Hint::Use practicalli/clojure-deps-edn to add common tools
> Fork and clone the [practicalli/clojure-deps-edn](https://github.com/practicalli/clojure-deps-edn) GitHub repository to instantly have access to dozens of tools for Clojure software development


## Running the test runner
Then, invoke Clojure via the command line, invoking the test alias:

```shell
clojure -M:test-runner-cognitect
```

This calls the `cognitect.test-runner/-main` function which will scan the test directory of the current project for any tests defined using clojure.test and then run all the tests found.

A summary is returned with the results of running the tests.

TODO: screenshot of summary
![Clojure Unit Test - Cognitect Labs test runner example result](/images/clojure-unit-test-cognitect-labs-test-runner-results-example.png)


## Additional command line options:

| Flag                        | Description                                                    |
|-----------------------------|----------------------------------------------------------------|
| -d, --dir DIRNAME           | Name of the directory containing tests. Defaults to "test".    |
| -n, --namespace SYMBOL      | Symbol indicating a specific namespace to test.                |
| -r, --namespace-regex REGEX | Regex for namespaces to test. Defaults to #".*-test$"          |
|                             | (i.e, only namespaces ending in '-test' are evaluated)         |
| -v, --var SYMBOL            | Symbol indicating the fully qualified name of a specific test. |
| -i, --include KEYWORD       | Run only tests that have this metadata keyword.                |
| -e, --exclude KEYWORD       | Exclude tests with this metadata keyword.                      |
| -H, --test-help             | Display this help message                                      |


Options can be used multiple times in one command, for a logical OR effect. For example, the following command runs all tests in the `practicalli.data.survey` and `practicalli.services.survey-report` namespaces that are found in the `src` and `test` directories

```shell
clojure -M:test-runner-cognitect -d test -d src -n practicalli.data.survey -n practicalli.services.survey-report
```

## Categorizing tests for selective test runs
Integration tests tend to take longer to run as they use larger data sets and/run a or more comprehensive set of tests.  Categorizing tests is an approach to using test runners effectively, by selectively running tests at different stages of development.

Use Clojure metadata when defining test functions using `deftest`.

```clojure
(deftest ^:integration test-live-system
  (is (= 200 (:status (http/get "http://example.com")))))

```

Use the `i` inclusion flag with the test runner to specify specific categories of tests

```shell
clojure -M:test-runner-cognitect -i :integration

```

Categories can be used together by using multiple flags. Assuming categories of develop, uat, integration and pre-prod,  use two `-i` inclusion flags to run only integration and pre-production tests:

```shell
clojure -M:test-runner-cognitect -i :integration -i :pre-prod
```

[Clojure Unit Test - categories example integration and develop tests](/images/clojure-unit-test-categories-example-integration-develop.png)


Use the `e` exclusion flag to run all tests except those in specific categories
```shell
clojure -M:test-runner-cognitect -e :integration
```

Exclusions take priority over inclusions if both flags are included.

> #### Hint::Category examples
> On larger projects categories reduce the amount of time spent running tests to ensure regressions have not taken place.
>
> During a project at a large financial institution, tests were oganised in the following categories `:develop`, `:integration`, `data-loading`, `:data-migration`, and `:pre-production`.
