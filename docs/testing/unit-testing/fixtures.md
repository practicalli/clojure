# Test Fixtures

Unit tests may require the system to be in a particular state before running a test.  The state may need to be reset after running a test such as a database

Fixtures allow you to run code before and after tests, to set up the context in which tests should be run.  Consider when fixtures should be run, especially fixtures that take a noticeable time to setup or tear down.

Slow running unit tests lead to unit tests not being run so often and therefore limit their value.

!!! HINT "Organise tests with test selectors"
    Tests with fixtures may be slower to run so separate them by [using a test selector](test-selectors.md), a piece of meta data attached to a `deftest` definition. For example, add the `^:persistence` meta data to test that require database fixtures  (deftest ^:database db-bulk-upload).  The test runner can be instructed to skip or focus on tests with specific meta data.


## Defining a fixture

Require the `use-fixtures` function in the require expression for `clojure.test`

```clojure
(ns domain.application-test
  (:require [clojure.test :refer [deftest is testing use-fixtures]]))
```

A fixture is a standard Clojure function which takes a function as an argument.  The function passed as an argument is either an individual test or all tests in the namespace, depending on how the fixture is used.

```clojure
(defn my-fixture [test-run]
   ;; Setup: define bindings, create state, etc.

  (test-run) ;; Run the relevant tests for the fixture (see `use-fixtures`)

   ;; Tear-down: reset state to a known value
 )
```


## When to run fixtures

The `use-fixtures` function defines when a fixture should be called when running the unit tests in each namespace.  All Clojure unit test runners should support the `use-fixtures` definitions when running the tests.

| When                                     | Description                                          |
|------------------------------------------|------------------------------------------------------|
| `(use-fixtures :once fixture1 fixture2)` | Run the fixtures once for the namespace.             |
| `(use-fixtures :each fixture1 fixture2)` | Run the fixtures for each `deftest` in the namespace |


**Once**

The setup in the fixture is run, followed by all the `deftest` functions in the namespace, then the fixture tear-down is run.

Running a fixture once per namespace is useful for establishing a database connection or creating a particular state of data for all the unit tests to use.


**Each**

The fixture setup is run before each `deftest` function in the namespace. The fixture tear-down is run after each `deftest` function.


## Anonymous function fixture

The `use-fixtures` function can also include anonymous function as well as a namespace scoped functions (`deftest`).

```clojure
(use-fixtures :each (fn [f] #_setup... (f) #_teardown))
```

`defn` functions are usually recommended unless the fixture code is relatively terse.


!!! EXAMPLE "Development database"
    Define a fixture to reset the database before running a test and clear the database after each test.

    The `create-database` and `delete-database` are helper functions that are part of the namespace under test.

    ```clojure
    (defn database-reset-fixture
      "Setup: drop all tables, creates new tables
       Teardown: drop all tables
      SQL schema code has if clauses to avoid errors running SQL code.
      Arguments:
      test-function - a function to run a specific test"
      [test-function]
      (SUT/create-database)
      (test-function)
      (SUT/delete-database))
    ```

    The fixture should be used for each unit test (`deftest`) that is defined in the namespace the `database-reset-fixture` is defined in.

    ```clojure
    (use-fixtures :each database-reset-fixture)
    ```


## References

* [`use-fixtures` - Clojuredocs.org](https://clojuredocs.org/clojure.test/use-fixtures)
* [Kaocha - focusing and skipping](https://cljdoc.org/d/lambdaisland/kaocha/1.0.700/doc/6-focusing-and-skipping)
* [Clojure Test Fixtures - astrocaribe](https://astrocaribe.github.io/dev/2017/08/08/clojure-test-fixtures.html)
