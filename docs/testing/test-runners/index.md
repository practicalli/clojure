# Test Runners

A test runner is used to run one or more unit tests in a project and report the results.  When there are failing tests, a test runners show details of how the failing test, showing actual and expected values.

Test runners may support specification testing with clojure.spec, checking data and functions conform to their specifications.

Test runners are called from either a Clojure editor, as a command line tool or within a continuous integration workflow.

Regularly run tests in a project to ensure implementations and design decisions made so far have not regressed.



| Test runner                                                                                            | Type      | Summary                                              |
|--------------------------------------------------------------------------------------------------------|-----------|------------------------------------------------------|
| cognitect-labs test runner                                                                             | clj       | Simple test runner                                   |
| [cljs-test-runner](https://github.com/Olical/cljs-test-runner)                                         | cljs      | Run all ClojureScript tests with one simple command. |
| [Kaocha](https://github.com/lambdaisland/kaocha)                                                       | clj, cljs | Full featured test runner                            |
| [CIDER test runner](https://practical.li/spacemacs/testing/unit-testing/running-tests/){target=_blank} | clj       | CIDER built in test runner                           |

[:fontawesome-solid-book-open: CIDER test runner](https://practical.li/spacemacs/testing/unit-testing/running-tests/){target=_blank} is ideal if using Emacs for Clojure development, as its build into CIDER.


!!! HINT "Practicalli Recommends Kaocha test runner"
    Kaocha is a very feature rich test runner for Clojure and ClojureScript, BDD style cucumber tests, coverage and junit style reporting.


!!! INFO ":fontawesome-brands-github: Practicalli Clojure CLI Config - test runner aliases"
    [:fontawesome-brands-github: Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) contains several aliases for test runners

    * `:test/env` adds the `test` directory to the class path and `org.clojure/test.check` library
    * `clojure -X:test/run` run Kaocha test runner
    * `clojure -X:test/watch` run Kaocha test runner in watch mode, running on file changes
    * `clojure -M:test/cljs`  run Kaocha ClojureScript test runner
    * `clojure -X:test/cognitect` simple to use Cognitect test runner
    * `:lib/kaocha` adds Kaocha as a library to the class path, enabling Kaocha to run from an editor, e.g. [Emacs Cider with Kaocha test runner](https://practical.li/spacemacs/testing/kaocha-test-runner/)

    [Practicalli REPL Reloaded](/clojure/clojure-cli/practicalli-config/) aliases `:repl/reloaded` & `:dev/reloaded` also support Kaocha test runner


<!-- ClojureScript specific testing content -->
<!-- ## ClojureScript testing -->
<!-- * [cljs-test-display](https://github.com/bhauman/cljs-test-display) - visual display of in-browser ClojureScript test run -->
<!-- cljs-test-display is a ClojureScript library provide visual system feedback for web-based test runners.  It is already included in figwheel-main -->
<!-- If you have tests written with cljs.test and you can run them in the browser you can use cljs-test-display. -->
