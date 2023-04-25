# Testing in Clojure

Testing is supported in Clojure with a range of testing libraries and test runners.

## Unit Test

The unit of test in Clojure is the function, so functions are defined that test other functions.

clojure.test namespace is part of the Clojure standard library and provides assertion based testing and functions to run tests.

[Practicalli Unit Testing Guide](unit-testing/){.md-button}
[Using Test Runners](test-runners/){.md-button}

## Generative testing

Define specifications for values to confirm information coming into and leaving a Clojure service are of the correct form.

Generate test data from value specifications to verify the behaviour of functions, creating diverse sets of data for extensive testing.

Define specifications for functions to validate the correct form of values are passed and returned from a function.

[Define value and function specifications with Cloure Spec](/clojure/clojure-spec/){.md-button}
[Generative Testing with Clojure Spec](/clojure/clojure-spec/testing/){.md-button}

## Performance testing

Test individual expressions through to application and load testing one or more services.

* time - simple results of evaluating an expression
* criterion - a realistic measure of performance for clojure expressions
* [Gatling](https://gatling.io/) - open source & commercial load test tool for web applications
* [clj-gatling](https://github.com/mhjort/clj-gatling) - wrapper around Gatling which enables tests to be expressed in Clojure.

## Behaviour Driven Development frameworks

Although not widely used in the Clojure community, there are several approaches to develop and test software using Behaviour Driven Development.

> BDD: Given, When, Then and scenario approach to outside in software testing

* [Scenari](https://github.com/jgrodziski/scenari) - executable specification / BDD in Clojure
* [kaocha-cucumber](https://github.com/lambdaisland/kaocha-cucumber) - support for Cucumber tests in the gerkin format
* [speclj](https://github.com/slagyr/speclj) - TDD/BDD framework for Clojure and ClojureScript based on RSpec.

Alternative BDD libraries are discussed at <https://github.com/gphilipp/bdd-guide-clojure>

## Articles on testing in Clojure

* [Clojure test runner of my dreams](https://quanttype.net/posts/2017-01-26-clojure-test-runner-of-my-dreams.html)
* [Example based unit testing in Clojure](https://lispcast.com/unit-testing-in-functional-languages/)
* [TDD in Clojure at Funding Circle](https://engineering.fundingcircle.com/blog/2016/01/11/tdd-in-clojure/)
* [Bolth - a more humane test runner](http://yellerapp.com/posts/2015-04-23-bolth.html)
* [Announcing kaocha a new and improved clojure test runner](https://clojureverse.org/t/announcing-kaocha-a-new-and-improved-clojure-test-runner/2903)
* [Scenarios as code](https://www.youtube.com/watch?v=RMgd9nc0yoA) - Clojure Remote presentation
* [Load testing with Gatling and Clojure](https://juxt.pro/blog/posts/load-testing-gatling-clojure.html) - JUXT.pro
