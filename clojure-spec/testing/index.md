# Testing with Specifications

> #### TODO::work in progress, sorry

## During development
Create specifications for data and functions

Selectively instrument function definitions to check function call arguments against the function specification.

* clojure.spec.test.alpha/instrument - check fdef :args


## Unit and integration testing
Add specification checks along with unit testing and integration testing to provide a very wide range of data values to be tested (with a minimal amount of code).

* clojure.spec.test.alpha/check - use :args to generate tests to check fdef :ret and :fn

run a suite of spec-generative tests on an entire ns with `check`.  Just one namespace per `check` expression?

control the number of values check creates for each check expression.  As the default is 1000 the checks can take a noticeable time to run (see [practicalli/spec-generative-testing](https://github.com/practicalli/spec-generative-testing))


Many built-in generators for `clojure.core` data predicates

composite specifications can build generators upon predicate generators.

Pass generator-returning functions to spec, supplying generators for things spec does not know about.
Pass an override map to `gen` in order to supply alternative generators for one or more subpaths of a spec.

Define your own generators


## At run time
Use specifications for run time checking, typically using `conform` and `valid?` functions.

Specification are typically the minimal checks required for the system, compared to more extensive checks during test and system integration.

Create lightweight private specifications for tests that run in the production environment.
