# Kaocha
Kaocha (cow-cha) is test runner taking a tool agnostic approch, therefore there is a little bit of configuration to get started.


## deps project alias for Kaocha
Add an alias to `./clojure/deps.edn` to make kaocha available to all projects, or add an alias directly to the project `deps.edn` file.  As this is a test runner tool, the `test` path is included to tests will be found in the standard test directory.


```clojure
  :test-runner-kaocha
  {:extra-paths ["test"]
   :extra-deps  {lambdaisland/kaocha {:mvn/version "1.0-612"}}
   :main-opts   ["-m" "kaocha.runner"]}
```

Kaocha recommends adding a `bin/kaocha` script to the project being tested.  This provides a standard location from which to run kaocha and also include project specific command line options.

```shell
#!/usr/bin/env bash
clojure -A:test-runner-kaocha  "$@"
```

> #### Hint::main namespace
> The main namespace for kaocha can be defined in the alias or asa command line option, but not in both places at the same time.
>
> For deps projects practicalli recommends putting the main namespace in the alias, that way it is not forgotten.


## Configuring Tests with kaocha
As kaocha is designed to be tool agnostic, it uses two ways to configure how tests are run.  A `test.edn` configuration file and command line options, usually added to the script for a specific project.

Create a `test.edn` file in the root of the project directory.

`#kaocha/v1 {}` is the minimum configuration, which will use a default configuration.

The `test.edn` file and command line options combine to make the complete configuration for the projects in the test.

`kaocha --print-config` will print out the complete configuration.

![Clojure Unit Test - kaocha print configuration](/images/clojure-unit-test-kaocha-config-print.png)

Use the default configuration as a basis for customizing any specific project.

## Aero
[juxt/aero](https://github.com/juxt/aero) is used to read the kaocha configuration, so reader literals such as #env, #merge, #ref, and #include can be used.

Set up [profiles for different stages of the development workflow](https://juxt.pro/blog/posts/aero.html), dev, test, prod, etc.  Each profile has a different configuration making it very easy to switch

```clojure
{:port 8000
 :database #profile {:prod "datomic:dev://localhost:4334/my-prod-db2"
                     :test "datomic:dev://localhost:4334/my-test-db"
                     :default "datomic:dev://localhost:4334/my-db"}
 :known-users [{:name "Alice"} {:name "Betty"}]}
```

Then in application startup function or a component lifecycle library (mount, component, integrant) read in a specific profile

```clojure
(aero.core/read-config "config.edn" {:profile :prod})
```


## Running tests
With a `deps.edn` project with tests under the standard `test` directory and using `-test` postfix on test names, then all that is required is the `kaocha` command

```shell
kaocha
```

![Clojure Unit Test - kaocha test runner results](/image/clojure-unit-test-kaocha-run-restuls.png)


If one or more tests fail, then a detailed description of the failure is printed

![Clojure Unit Test - kaocha test failure example](/images/clojure-unit-test-kaocha-fail-example.png)

The report progress plugin gives visual feedback as the tests are running.

```shell
kaocha --reporter kaocha.report.progress/report
```

![Clojure Unit Test - kaocha test runner plugin report progress](/images/clojure-unit-test-kaocha-plugin-report-progress-results.png)

Stop testing on the first failure with the `--fail-fast` flag.  Especially useful when running larger numbers of tests or slower running tests.

```shell
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
```shell
bin/kaocha --plugin kaocha.plugin/profiling
```
or added to the `test.edn` configuration
```clojure
#kaocha/v1
{:plugins [:kaocha.plugin/profiling]}
```
