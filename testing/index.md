# Testing in Clojure
Testing is supported in Clojure with a range of testing libraries and test runners.

## Unit Test style frameworks
Unit testing is part of the Clojure standard library and provides assertion based testing
* `clojure.test`
* [Midge](https://github.com/marick/Midje) - a more advanced version of clojure.test with mocking, nested checkers, etc.
* [fudje](https://github.com/jimpil/fudje) - a lightweight version of Midge

## Clojure Spec and Generative testing
Define specifications for data and functions, generating extensive test data from specifications and using that data to verify behavior of functions in generative testing.
* clojure.spec.alpha
* clojure.spec.test.alpha
* clojure.spec.gen.alpha


## Behaviour Driven Development frameworks
Given, When, Then and scenario approach to outside in software testing
* [Scenari](https://github.com/jgrodziski/scenari) - executable specification / BDD in Clojure
* [kaocha-cucumber](https://github.com/lambdaisland/kaocha-cucumber) - support for Cucumber tests in the gerkin format
* [speclj](https://github.com/slagyr/speclj) - TDD/BDD framework for Clojure and ClojureScript based on RSpec.

Alternative BDD libraries are discussed at https://github.com/gphilipp/bdd-guide-clojure


## Performance testing
Testing individual expressions through to application and load testing.
* time - simple results of evaluating an expression
* criterion - a realistic measure of performance for clojure expressions
* [Gatling](https://gatling.io/) - open source & commercial load test tool for web applications
* [clj-gatling](https://github.com/mhjort/clj-gatling) - wrapper around Gatling which enables tests to be expressed in Clojure.


## Articles on testing in Clojure
* [Clojure test runner of my dreams](https://quanttype.net/posts/2017-01-26-clojure-test-runner-of-my-dreams.html)
* [Example based unit testing in Clojure](https://lispcast.com/unit-testing-in-functional-languages/)
* [TDD in Clojure at Funding Circle](https://engineering.fundingcircle.com/blog/2016/01/11/tdd-in-clojure/)
* [Bolth - a more humane test runner](http://yellerapp.com/posts/2015-04-23-bolth.html)
* [Announcing kaocha a new and improved clojure test runner](https://clojureverse.org/t/announcing-kaocha-a-new-and-improved-clojure-test-runner/2903)
* [Scenarios as code](https://www.youtube.com/watch?v=RMgd9nc0yoA) - Clojure Remote presentation
* [Load testing with Gatling and Clojure](https://juxt.pro/blog/posts/load-testing-gatling-clojure.html) - JUXT.pro
