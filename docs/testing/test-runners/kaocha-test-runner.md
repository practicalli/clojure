# Kaocha Test Runner from LambdaIsland

[lambdaisland/kaocha](https://github.com/lambdaisland/kaocha) (cow-cha) is a comprehensive test runner that support unit testing and `clojure.spec` generative testing.  Clojure and ClojureScript languages are supported.


## A minimal starting point

=== "Practicalli Clojure CLI Config"

    Install the [Practicalli Clojure CLI Config]( /clojure/clojure-cli/install/community-tools.md) configuration to call kaocha from the root directory of a project which contains `clojure.test` defined unit tests under a `test` directory structure.

=== "Alias Definition"
    Define an alias in the project or user `deps.edn` configuration.

    For CI services such as CircleCI or GitLabs, add an alias for kaocha to the project `deps.edn` file.

    !!! EXAMPLE "Alias definitions which stop on failed tests"
    ```clojure
    :test/run
    {:extra-paths ["test"]
     :extra-deps {lambdaisland/kaocha {:mvn/version "1.77.1236"}}
     :main-opts   ["-m" "kaocha.runner"]
     :exec-fn kaocha.runner/exec-fn
     :exec-args {:fail-fast? true
                 :randomize? false}}

    ;; Kaocha test runner in watch mode
    ;; clojure -X:test/watch
    :test/watch
    {:extra-paths ["test"]
     :extra-deps {lambdaisland/kaocha {:mvn/version "1.77.1236"}}
     :main-opts   ["-m" "kaocha.runner" "--watch" "--fail-fast" "--skip-meta" ":slow"]
     :exec-fn kaocha.runner/exec-fn
     :exec-args {:watch? true
                 :randomize? false
                 :fail-fast? true}}
    ```


## Run Kaocha

Kaocha can be run via the tasks in the Practicalli Makefile, Clojure CLI, or by creating a `kaocha` script.

=== "Make"

    ```shell
    make test
    ```

    Kaocha stops if there is a failing task. Use the `test-all` target to run all unit tests regardless of failures (execept compiler errors)

    ```bash
    make test-all
    ```

    Continually run tests by watching for changes using the `:test/watch` alias.  If a test fails, Koacha will stop the test run and restart from the failing test when a change is detected.  Use `watch-all` if all tests should run regardless of failure.

    ```bash
    make test-watch
    ```

    ??? EXAMPLE "Practicalli Makefile targets for unit testing"
        Practicalli Makefile includes the following targets for Kaocha test runner
        ```make title="Makefile"
        # ------- Testing -------------------- #

        test-config:  ## Run unit tests - stoping on first error
            $(info --------- Runner Configuration ---------)
            clojure -M:test/env:test/run --print-config

        test:  ## Run unit tests - stoping on first error
            $(info --------- Runner for unit tests ---------)
            clojure -X:test/env:test/run


        test-all:  ## Run all unit tests regardless of failing tests
            $(info --------- Runner for all unit tests ---------)
            clojure -X:test/env:test/run :fail-fast? false

        test-watch:  ## Run tests when changes saved, stopping test run on first error
            $(info --------- Watcher for unit tests ---------)
            clojure -X:test/env:test/run :watch? true

        test-watch-all:  ## Run all tests when changes saved, regardless of failing tests
            $(info --------- Watcher for unit tests ---------)
            clojure -X:test/env:test/run :fail-fast? false :watch? true

        # ------------------------------------ #
        ```


=== "Clojure CLI"

    Run Kaocha using the `clojure` command in a terminal, using the `:test/run` which runs all the tests in a project unless a test fails, then kaocha will stop.

    ```shell
    clojure -M:test/run
    ```

    Pass `:fail-fast? false` as an argument to run all tests regardless of test failure.

    ```bash
    clojure -M:test/run :fail-fast? false
    ```

    Continually run tests by watching for changes using the `:test/watch` alias.  If a test fails, Koacha will stop the test run and restart from the failing test when a change is detected.

    ```bash
    clojure -M:test/watch
    ```


=== "Kaocha script"
    Kaocha recommends adding a `bin/kaocha` script to each project, although this is optional.  The script calls `clojure` with a suitable alias and allows for arguments to be passed to the command using `"$@"`.  Command line options will over-ride the same options in the `tests.edn` file.

    ```bash title="bin/kaocha"
    #!/usr/bin/env bash
    clojure -M:test/runner "$@"
    ```
    Use the `-M` execution option to pass command line flags to the Kaocha test runner.

    ```bash
    kaocha --fail-fast
    ```

![Clojure test runner - Kaocha - watch mode - failing test, detect change, passing test](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/testing/clojure-test-runner-kaocha-watch-fail-reload-pass-test-output-dark.png#only-dark)
![Clojure test runner - Kaocha - watch mode - failing test, detect change, passing test](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/testing/clojure-test-runner-kaocha-watch-fail-reload-pass-test-output-light.png#only-light)


## Configuring test runs

Kaocha can be configure by options in a `tests.edn` configuration file and options passed via the command line (typically added to the `bin/kaocha` script).

Create a `tests.edn` file in the root of the project directory.

`#kaocha/v1 {}` is the minimum configuration, which will use a default configuration.

The `tests.edn` file and command line options combine to make the complete configuration for the projects in the test.

`make test-config` runs `clojure -M:test/run --print-config` to print out the current kaocha configuration.

![Clojure Unit Test - kaocha print configuration](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/testing/clojure-test-runner-kaocha-config-print-light.png#only-light)
![Clojure Unit Test - kaocha print configuration](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/testing/clojure-test-runner-kaocha-config-print-dark.png#only-dark)

Use the default configuration as a basis for customising any specific project.

??? HINT "Alternative kaocha configuration with aero"
    [juxt/aero](https://github.com/juxt/aero) reader literals such as #env, #merge, #ref, and #include can be used to provide different options to the kaocha configuration. For example, a file change watcher can be configured to run unless kaocha is running in CI server environment.

    `:kaocha/watch #profile {:default true :ci false}`


## Run test options

All test code found on the class path will be run, so ensure the `test` directory was added when starting the REPL process and test definitions, `deftest` are using `-test` postfix

```bash
clojure -X:test/run
```

![Clojure Unit Test - kaocha test runner results](/images/clojure-unit-test-kaocha-run-results.png)


If one or more tests fail, then a detailed description of the failure is printed

![Clojure Unit Test - kaocha test failure example](/images/clojure-unit-test-kaocha-fail-example.png)

The report progress plugin gives visual feedback as the tests are running.

```bash
clojure -M:test/run --reporter kaocha.report.progress/report
```

![Clojure Unit Test - kaocha test runner plugin report progress](/images/clojure-unit-test-kaocha-plugin-report-progress-results.png)

Stop testing on the first failure with the `--fail-fast` flag.  Especially useful when running larger numbers of tests or slower running tests.

```bash
clojure -M:test/run --fail-fast
```

Tests are run in a random order, controlled by a seed in the test.edn configuration.  This helps find dependencies between tests where a test is only passing because of another test (or more likely the setup stage or lack of tear down from another test).  The `--no-randomize` flag will run the tests in the same order each time.

`--print-result` will return a hash-map of the test results.  This is a very detailed output, so I assume its more suitable for diagnostic tools or viewing in a data browser (eg. Clojure inspector, REBL, etc.)

`--watch` flag enables watch mode which monitors file changes in source and test paths (from the kaocha configuration), loads in changes and runs tests again.


## Plugins

Much of the functionality of Kaocha is provide by plugins

* profiling - lists the slowest tests for each test category
* cucumber - bdd style test
* junit-xml reports - format used by Continuous Integration servers to display results


### Profiling

Show the 3 slowest tests for each category of test, after the test results

As a command line option:
```bash
bin/kaocha --plugin kaocha.plugin/profiling
```
or added to the `test.edn` configuration
```clojure
#kaocha/v1
{:plugins [:kaocha.plugin/profiling]}
```

## Example: banking-on-clojure project

The practicalli/banking-on-clojure project is a web application backed by a relational database, using kaocha as the test runner.

`:kaocha/tests` defines two types of tests.  The hash-map containing `:kaocha.testable/id :unit` defines the configuration for unit tests using `clojure.test`.  The hash-map containing `:kaocha.testable/id :generative-fdef-checks` are generative tests using clojure spec.

`:kaocha/color?` and `:kaocha/watch` use a value dependent on the `#profile` kaocha is run under.

!!! EXAMPLE "Banking on Clojure project - Kaocha test.edn configuration"
    ```clojure
    #kaocha/v1
    {:kaocha/tests
     [{:kaocha.testable/id      :unit
       :kaocha.testable/type    :kaocha.type/clojure.test
       :kaocha/ns-patterns      ["-test$"],
       :kaocha/source-paths     ["src"],
       :kaocha/test-paths       ["test"],
       :kaocha.filter/skip-meta [:kaocha/skip]}

      {:kaocha.testable/id            :generative-fdef-checks
       :kaocha.testable/type          :kaocha.type/spec.test.check
       :kaocha/source-paths           ["src"]
       :kaocha.spec.test.check/checks [{:kaocha.spec.test.check/syms            :all-fdefs
                                        :clojure.spec.test.check/instrument?    true
                                        :clojure.spec.test.check/check-asserts? true
                                        :clojure.spec.test.check/opts           {:num-tests 10}}]}
      ]

     :kaocha/reporter [kaocha.report/documentation]

     :kaocha/color? #profile {:default true
                              :ci      false}

     ;; Run tests of file changes, unless running in CI server
     :kaocha/watch #profile {:default true :ci false}

     :kaocha/fail-fast? true

     :kaocha.plugin.randomize/randomize? false

     :kaocha/plugins
     [:kaocha.plugin/randomize
      :kaocha.plugin/filter
      :kaocha.plugin/capture-output
      :kaocha.plugin.alpha/spec-test-check]

     :kaocha.plugin.capture-output/capture-output? true
     }
    ```
    > The above configuration could be streamlined and rely on more of the default values, but does show examples of how to configure different sections explicitly.
