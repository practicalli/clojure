# Test Runners

A Test runner is a tool to run one or more tests in a project and reports the results.  If there are failing tests, test runners show details of how the test failed. 

Test runners are called from either a Clojure editor, as a command line tool or in a continuous integration workflow.

Regularly running some or all the tests in a project checks the design decisions made so far have not regressed.

Test runners are highly recommended step as part of continuous integration and should be used in conjunction with a CI Server for every project.

??? HINT "Code should compile or be commented"
    All the code in the project should be correct Clojure code and compiled unless commented with a line comment, `;;`.


| Test runner                                                    | Type      | Summary                                              |
|----------------------------------------------------------------|-----------|------------------------------------------------------|
| cognitect-labs test runner                                     | clj       | Simple test runner                                   |
| [cljs-test-runner](https://github.com/Olical/cljs-test-runner) | cljs      | Run all ClojureScript tests with one simple command. |
| [Kaocha](https://github.com/lambdaisland/kaocha)               | clj, cljs | Full featured test runner                            |
| CIDER test runner                                              | clj       | CIDER built in test runner                           |

CIDER test runner is ideal if using Emacs for Clojure development, as its build into CIDER.


!!! HINT "Practicalli Recommends Kaocha test runner"
    Kaocha is a very feature rich test runner for Clojure and ClojureScript, BDD style cucumber tests, coverage and junit style reporting.  
    

!!! INFO "Practicalli aliases for test runners"
    [Practicalli Clojure CLI Config](/clojure/clojure-cli/practicalli-config/) contains several aliases for test runners

    * `:env/test` adds the `test` directory to the class path
    * `clojure -X:test/run` run Kaocha test runner 
    * `clojure -X:test/watch` run Kaocha test runner in watch mode, running on file changes 
    * `clojure -M:test/cljs`  run Kaocha ClojureScript test runner 
    * `clojure -X:test/cognitect` simple to use Cognitect test runner
    * `:lib/kaocha` adds Kaocha as a library to the class path, enabling Kaocha to run from an editor, e.g. Emacs Cider
    
    [Practicalli REPL Reloaded](/clojure/clojure-cli/practicalli-config/) aliases `:repl/reloaded` & `:dev/reloaded` also support Kaocha test runner


<!-- ClojureScript specific testing content -->
<!-- ## ClojureScript testing -->
<!-- * [cljs-test-display](https://github.com/bhauman/cljs-test-display) - visual display of in-browser ClojureScript test run -->
<!-- cljs-test-display is a ClojureScript library provide visual system feedback for web-based test runners.  It is already included in figwheel-main -->
<!-- If you have tests written with cljs.test and you can run them in the browser you can use cljs-test-display. -->
