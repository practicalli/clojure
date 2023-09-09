# LambdaIsland Kaocha Test Runner

[:fontawesome-brands-github: lambdaisland/kaocha](https://github.com/lambdaisland/kaocha) (cow-cha) is a comprehensive test runner that support unit testing and `clojure.spec` generative testing.  Clojure and ClojureScript languages are supported.

Kaocha is highly configurable via a `tests.edn` configuration file in the root of the project.

## Clojure CLI Config

=== "Practicalli Clojure CLI Config"

    [:fontawesome-solid-book-open:  Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) configuration contains aliases to run kaocha test runner, using either the `-X` or `-M` execution flag.

    * `:test/run` - run all tests in the project, stopping on first failing test
    * `:test/watch` - watching for file changes and run all tests in the project, stopping on first failing test
    * `:test/env` - add supporting paths and libraries for testing projects

    Each alias includes `:extra-paths ["test"]` to include the `test` directory on the class path, enabling Koacha test runner to find the unit test code.

=== "Alias Definition"
    Define an alias in the project or user `deps.edn` configuration.

    For CI services such as CircleCI or GitLabs, add an alias for kaocha to the project `deps.edn` file.

    !!! EXAMPLE "Alias definitions for LambdaIsland/Kaocha test runner"
        Aliases support the `-M` (clojure.main) and `-X` (clojure.exec) [execution options with Clojure CLI](/clojure/clojure-cli/execution-options/).
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

        Libraries and directories containing code to support testing projects can be added to the `:test/env` alias
        ```clojure
        :test/env
        {:extra-paths ["test"]
         :extra-deps  {org.clojure/test.check {:mvn/version "1.1.1"}}}
        ```

        Alias definitions should include `:extra-paths ["test"]` to add the `test` directory on the class path, enabling Koacha test runner to find the unit test code.

## Run Kaocha

Kaocha can be run via make tasks, Clojure CLI, or by creating a `kaocha` script.

> [Babashka task runner](https://book.babashka.org/#tasks) could also be used to develop tasks to run kaocha

=== "Make"
    [:fontawesome-solid-book-open:  Practialli Makefile](/clojure/automation/make/) contains tasks for testing Clojure projects with Kaocha (and many other common Clojure development tasks)

    ??? EXAMPLE "Practicalli Makefile targets for unit testing"
        Practicalli Makefile includes the following targets for Kaocha test runner
        ```make title="Makefile"
        # ------- Testing -------------------- #

        test-config:  ## Run unit tests - stoping on first error
            $(info --------- Runner Configuration ---------)
            clojure -M:test/env:test/run --print-config

        test-profile:  ## Profile unit test speed, showing 3 slowest tests
            $(info --------- Runner Profile Tests ---------)
            clojure -M:test/env:test/run --plugin  kaocha.plugin/profiling

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

    Run all tests using the following command from the root of the Clojure project. Kaocha stops if there is a failing task, saving time on running the whole test suite.
    ```shell
    make test
    ```

    Use the `test-all` target to run all unit tests regardless of failures (execept compiler errors)

    ```bash
    make test-all
    ```

    Continually run tests by watching for changes using the `:test/watch` alias.  If a test fails, Koacha will stop the test run and restart from the failing test when a change is detected.  Use `watch-all` if all tests should run regardless of failure.

    ```bash
    make test-watch
    ```

    ![Clojure test runner - Kaocha - watch mode - failing test, detect change, passing test](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/testing/clojure-test-runner-kaocha-watch-fail-reload-pass-test-output-dark.png#only-dark)
    ![Clojure test runner - Kaocha - watch mode - failing test, detect change, passing test](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/testing/clojure-test-runner-kaocha-watch-fail-reload-pass-test-output-light.png#only-light)

=== "Clojure CLI"
    [:fontawesome-solid-book-open:  Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) configuration contains aliases to run kaocha test runner, using either the `-X` or `-M` execution flag.

    Run Kaocha using the `clojure` command in a terminal, using the `:test/run` which runs all the tests in a project unless a test fails, then kaocha will stop.

    ```shell
    clojure -X:test/run
    ```

    Pass `:fail-fast? false` as an argument to run all tests regardless of test failure.

    ```bash
    clojure -X:test/run :fail-fast? false
    ```

    Continually run tests by watching for changes using the `:test/watch` alias.  If a test fails, Koacha will stop the test run and restart from the failing test when a change is detected.

    ```bash
    clojure -X:test/watch
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

## Configuring Kaocha

Kaocha can be configure by options in a `tests.edn` configuration file and options passed via the command line (typically added to the `bin/kaocha` script).

Create a `tests.edn` file in the root of the project directory and add the default configuration.

```clojure title="tests.edn"
#kaocha/v1 {}
```

The `tests.edn` file and command line options combine to make the complete configuration for the projects in the test.

`make test-config` runs `clojure -M:test/run --print-config` to print out the current kaocha configuration.

![Clojure Unit Test - kaocha print configuration](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/testing/clojure-test-runner-kaocha-config-print-light.png#only-light)
![Clojure Unit Test - kaocha print configuration](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure/testing/clojure-test-runner-kaocha-config-print-dark.png#only-dark)

Use the default configuration as the basis for customising kaocha test runner for the current project.

??? HINT "Alternative kaocha configuration with aero"
    [juxt/aero](https://github.com/juxt/aero) reader literals such as #env, #merge, #ref, and #include can be used to provide different options to the kaocha configuration. For example, a file change watcher can be configured to run unless kaocha is running in CI server environment.

    `:kaocha/watch #profile {:default true :ci false}`

## Plugins

Much of the functionality of Kaocha is provide by plugins

* profiling - lists the slowest tests for each test category
* cucumber - bdd style test
* junit-xml reports - format used by Continuous Integration servers to display results

### Profiling

Show the 3 slowest tests for each category of test, after the test results

=== "Make"
    As a command line option:
    ```shell
    make test-profile
    ```

=== "Clojure CLI"
    Pass the profiling plugin as an argument to the Clojure CLI alias using the `-M` (clojure.main) execution option
    ```shell
    clojure -M:test/env:test/run --plugin kaocha.plugin/profiling
    ```

=== "Kaocha Script"
    As a command line option:
    ```shell
    bin/kaocha --plugin kaocha.plugin/profiling
    ```

Or add the profile plugin to the `test.edn` configuration

```clojure
#kaocha/v1
{:plugins [:kaocha.plugin/profiling]}
```

<!-- ## Reporter -->
<!-- TODO: add exmaples of using kaocha reporter plugin -->
<!-- ```bash -->
<!-- clojure -M:test/run --reporter kaocha.report.progress/report -->
<!-- ``` -->

<!-- ![Clojure Unit Test - kaocha test runner plugin report progress](/images/clojure-unit-test-kaocha-plugin-report-progress-results.png) -->

## Example tests.edn

[:fontawesome-solid-book-open: Practicalli Banking-on-Clojure project](https://practical.li/clojure-web-services/projects/banking-on-clojure/) is a web application backed by a relational database, using kaocha as the test runner.

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
    > The configuration shows how to explicitly configure different sections, although configuration could be streamlined by using more default values.
