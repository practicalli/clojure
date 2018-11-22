# Testing in Clojure

Testing is well supported in Clojure and there are numerous testing libraries and test runners you can use.


## Unit Test style frameworks

* `clojure.test`
* [Midge](https://github.com/marick/Midje) - a more advanced version of clojure.test with mocking, nested checkers, etc.
* [fudje](https://github.com/jimpil/fudje) - a lightweight version of Midge
* `clojure.alpha.spec` which included generative testing

## Behaviour Driven Development frameworks

* [Scenari](https://github.com/jgrodziski/scenari) - executable specification / BDD in Clojure
* [kaocha-cucumber](https://github.com/lambdaisland/kaocha-cucumber) - support for Cucumber tests in the gerkin format

 some other BDD libraries are discussed at https://github.com/gphilipp/bdd-guide-clojure


## Test runners and related plugins

Leiningen and book build tools provide test runners and also have plugins to add more features.  There are also standalone test runners available as libraries.

* [eftest](https://github.com/weavejester/eftest) - James Reeves fast and pretty test runner for clojure.test and compatable test libraries (midge, etc)
* [Kaocha](https://github.com/lambdaisland/kaocha) - full featured next gen test runner for Clojure
* [cljs-test-display](https://github.com/bhauman/cljs-test-display) - visual display of in-browser ClojureScript test run
* [lein-test-refresh](https://github.com/jakemcc/lein-test-refresh) - Leiningen plugin to run tests on file changes
* [humane-test-output](https://github.com/pjstadig/humane-test-output) - Leiningen plugin for more human readable test output with equality assertions diffed.
* [Bolth](https://github.com/yeller/bolth) - a more humane test runner
* [bat-test](https://github.com/metosin/bat-test) - test runner for boot projects


## Articles on testing in Clojure
* [Clojure test runner of my dreams](https://quanttype.net/posts/2017-01-26-clojure-test-runner-of-my-dreams.html)
* [Example based unit testing in Clojure](https://lispcast.com/unit-testing-in-functional-languages/)
* [TDD in Clojure at Funding Circle](https://engineering.fundingcircle.com/blog/2016/01/11/tdd-in-clojure/)
* [Bolth - a more humane test runner](http://yellerapp.com/posts/2015-04-23-bolth.html)
* [Announcing kaocha a new and improved clojure test runner](https://clojureverse.org/t/announcing-kaocha-a-new-and-improved-clojure-test-runner/2903)
