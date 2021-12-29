# Test Runners
A Test runner is a tool to run test in a project and report the results. During development test runners are called from editors or run om the command line and can be configured to run automatically when changes are detected in the code.

Regularly running some or all of the tests in a project checks the design decisions made so far have not regressed by additional development.

Test runners are highly recommeded step as part of continuous integration and should be used in conjunction with a CI Server for every project.

> #### Hint::All code should compile
> All the code in the project should be correct Clojure code and compiled unless commented with `;;`, a `(comment ,,,)` blocks or prefixed with the `#_` reader macro.  If code is know not to be correct, `;;` comment is recommended comment approach.


## Which test runner to use

| Test runner                                                    | Type      | Summary                                              |
|----------------------------------------------------------------|-----------|------------------------------------------------------|
| cognitect-labs test runner                                     | clj       | Defacto test runner for deps.edn projects            |
| [cljs-test-runner](https://github.com/Olical/cljs-test-runner) | cljs      | Run all ClojureScript tests with one simple command. |
| [Kaocha](https://github.com/lambdaisland/kaocha)               | clj, cljs | Full featured next gen test runner                   |
| CIDER test runner                                              | clj       | CIDER built in test runner                           |

CIDER test runner is ideal if using Emacs for Clojure development, as its build into CIDER.

Cognitect test runner is the defacto tool Clojure deps projects on the command line and with CI servers.  cljs-test-runner for ClojureScript deps projects, complementing the Cognitect test runner.  Automatic discover of cljs.test based tests, so no configuration required.

Kaocha is a very feature rich test runner for Clojure and ClojureScript, BDD style cucumber tests, coverage and junit style reporting.  Kaocha takes a little bit more effort to learn due to the additional features it provides.

> #### Hint::deps.edn aliases for test runners
> Aliases for these test runners are provided the [practicalli/clojure-deps.edn]({{ book.P9IClojureDepsEdn }}) configuration.


## Improving test result readability

Include the `:env/test` alias when starting a REPL to include the Humane Test Output library, which will pretty print results

Add the following code to a `user` namespace on the class path (i.e. a `dev/user.clj` file if including the `:env/dev` alias)

```clojure
(require '[pjstadig.humane-test-output :as humane-test-results])
(humane-test-results/activate!)
```

* [humane-test-output](https://github.com/pjstadig/humane-test-output) - more human readable test output with equality assertions diffed



<!-- ClojureScript specific testing content -->
<!-- ## ClojureScript testing -->
<!-- * [cljs-test-display](https://github.com/bhauman/cljs-test-display) - visual display of in-browser ClojureScript test run -->
<!-- cljs-test-display is a ClojureScript library provide visual system feedback for web-based test runners.  It is already included in figwheel-main -->
<!-- If you have tests written with cljs.test and you can run them in the browser you can use cljs-test-display. -->
