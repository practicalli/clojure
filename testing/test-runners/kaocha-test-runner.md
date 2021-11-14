# Kaocha Test Runner from LambdaIsland
[lambdaisland/kaocha](https://github.com/lambdaisland/kaocha) (cow-cha) is a comprehensive test runner that support unit testing and clojure.spe generative testing.  Clojure and ClojureScript languages are supported.

## A minimal starting point
Install the [practicalli/clojure-deps-edn]( {{ book.P9IClojureDepsEdnInstall }}) configuration to call kaocha from the root directory of a project which contains `clojure.test` defined unit tests under a `test` directory structure.

```bash
clojure -M:test/kaocha
```


## Add kaocha binary to the project project
Kaocha recommends adding a `bin/kaocha` script to the project, providing a standard location from which to run kaocha and to include project command line options.  Command line options will over-ride the same options in the `tests.edn` file.

```bash
#!/usr/bin/env bash
clojure -M:test/runner "$@"
```


## Continuous Integraion support
For CI services such as CircleCI or GitLabs, add an alias for kaocha to the project `deps.edn` file.

```clojure
  :test/runner
  {:extra-paths ["test"]
   :extra-deps  {lambdaisland/kaocha {:mvn/version "1.0.700"}}
   :main-opts   ["-m" "kaocha.runner"]}
```


## Configuring test runs
Kaocha can be configure by options in a `test.edn` configuration file and options passed via the command line (typically added to the bin/kaocha script).

Create a `test.edn` file in the root of the project directory.

`#kaocha/v1 {}` is the minimum configuration, which will use a default configuration.

The `tests.edn` file and command line options combine to make the complete configuration for the projects in the test.

`kaocha --print-config` will print out the complete configuration.

![Clojure Unit Test - kaocha print configuration](/images/clojure-unit-test-kaocha-config-print.png)

Use the default configuration as a basis for customizing any specific project.

> #### Hint::Alternative kaocha configuration with aero
> [juxt/aero](https://github.com/juxt/aero) reader literals such as #env, #merge, #ref, and #include can be used to provide different options to the kaocha configuration. For example, a file change watcher can be configured to run unless kaocha is running in CI server environment.
>
> `:kaocha/watch #profile {:default true :ci false}`


## Running tests
With a `deps.edn` project with tests under the standard `test` directory and using `-test` postfix on test names, then all that is required is the `kaocha` command

```bash
kaocha
```

![Clojure Unit Test - kaocha test runner results](/images/clojure-unit-test-kaocha-run-results.png)


If one or more tests fail, then a detailed description of the failure is printed

![Clojure Unit Test - kaocha test failure example](/images/clojure-unit-test-kaocha-fail-example.png)

The report progress plugin gives visual feedback as the tests are running.

```bash
kaocha --reporter kaocha.report.progress/report
```

![Clojure Unit Test - kaocha test runner plugin report progress](/images/clojure-unit-test-kaocha-plugin-report-progress-results.png)

Stop testing on the first failure with the `--fail-fast` flag.  Especially useful when running larger numbers of tests or slower running tests.

```bash
kaocha --fail-fast
```

Tests are run in a random order, controlled by a seed in the test.edn configuration.  This helps find dependencies between tests where a test is only passing because of another test (or more likely the setup stage or lack of tear down from another test).  The `--no-randomize` flag will run the tests in the same order each time.

`--print-results` will return a hash-map of the test results.  This is a very detailed output, so I assume its more suitable for diagnostic tools or viewing in a data browser (eg. Clojure inspector, REBL, etc.)


`--watch` flag enables watch mode which monitors file changes in source and test paths (from the kaocha configuration), loads in changes and runs tests again.  TODO: rerun just the tests that changed ??

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
