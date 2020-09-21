## Requiring Namespaces
A test namespace has a singular purpose to test a matching application namespace.  Therefore the idiomatic approach is to `:refer` specific functions from `clojure.test` as those functions are used.

The namespace to be tested is referred using the alias `SUT` meaning system under test.

![Clojure Unit Testining - require software under testa using SUT alias](/images/clojure-unit-test-require-sut.png)

The alias highlight the exact functions being tested in the body of the code.  This provides a visual way to separate functions under test with other test functions, especially if there are helper functions or vars used for test data.

![Clojure Unit Testining - using SUT alias](/images/clojure-unit-test-alias-sut.png)

In the above example it is easy to see which namespaces the functions being tested are from.  The `dictionary` namespace is a source of data for those tests.


{% tabs repl="In the REPL", project="In a Clojure Project" %}

{% content "repl" %}
```clojure
(require '[clojure.test :refer [are deftest is testing]])
```

The namespace under test should be referred, typically using the alias SUT for software under test.

```clojure
(require '[practicalli.playground :as SUT])
```


{% content "project" %}

Add `clojure.test` to the namespace definition along with the namespace under test.

```clojure
(ns practicalli.app-namespace-test
  (:require '[clojure.test :refer [are deftest is testing]]
             [practicalli.app-namespace :as SUT]))
```

{% endtabs %}

> #### Hint::SUT alias - system under test
> The alias `SUT`, meaning system under test, is [a common convention in software testing](https://en.wikipedia.org/wiki/System_under_test).  Using the SUT alias makes it easier for developers to see which functions from the application are being tested at a glance.
