# Namespaces

Using namespaces  makes code easier to work with by provide levels of abstraction that convey the overall design of the project.  Clearly organized namespaces support a simple design approach for a project and make it easier to maintain.

A namespace is a logical separation of code, usually along features of the projects. Think of all namespaces as creating an API's within the project that communicate the architecture of the system.

![Example of namespace segregation - banking on clojure full stack web service](https://raw.githubusercontent.com/practicalli/graphic-design/live/clojure-web-services/banking-on-clojure-design-namespace-segregation.svg){loading=lazy}


## Controlling scope

Logically related data structures and functions are defined within a namespace, limiting their default scope to that namespace.

Namespaces should limit their interdependence on each other (limited number of required namespaces) to avoid a highly coupled design.

Within a namespace a var (`def`, `defn`) can be called by its short-form name.  Outside of the namespace, a fully qualified name must be used, or required via an alias or directly referred.

Vars can be marked as private, `def ^private name`, so they can be accessed only by functions in their own namespace (athough there are ways to by-pass that scope restiction).


## Including another namespace

`(ns namespace.name (:require [domain/filename :as purpose]))` is used to enable access to the functions & named data structures in another namespace than the current one.  The included namespace is given an alias so its clear which code comes from that namespace.

Practicalli recommends using a meaningful alias that defines the purpose of the library you are including.  This helps with the understanding and maintainability of the code, especially if you wish to refactor and replace the included library with an alternative.  An alias name should be meaningful and you should avoid single character and cryptic aliases.

```clojure
(ns my-namespace.core
  :require [clojure.java.io :as java-io])

(defn read-the-file [filename]
  (line-seq (java-io/reader filename)))

(read-the-file "project.clj")
```

!!! HINT "Trying out a namespace"
    `(require '[domain/filename])` can be used within you code if testing that namespace functions to see if they are useful to the project.  Using a live linter such as clj-kondo, part of [Clojure LSP](/clojure/clojure-editors/clojure-lsp/), will highlight missing namespaces.


## Including specific parts of a namespace

`:refer` in the `require` expression includes one or more specific vars directly in the current namespace, as if it had been defined there. Referring a var means it no longer requires a namespace qualifier.

Use `:refer` when the library being required the predominant focus of that namespace. A good example is `clojure.test` which is included to specifically write unit tests.

```clojure
(ns practicalli.gameboard.handler-test
  :require
    [clojure.test :refer [deftest is testing]]
    [practicalli.gameboard.handler :as handler])

(deftest highscore-test
  (testing "A description of the test"
    (is (true? (handler/public-function 42)))))
```

(deftest public-function-in-namespace-test
  (testing "A description of the test"
    (is (= 1 (public-function arg)))
    (is (predicate-function? arg))))


??? WARNING "Rarely used options - include exclude rename vars"
    These other options on required functions are rarely used in practice.  They tend to cause more issues than they solve, so use with care.

    `:exclude` will prevent a var from being used from a required namespace.

    `:only` will include only that var from the required namespace.

    `:rename` changes the name of the original function, if there conflicts


## Adding multiple namespaces

The idiom in Clojure is to include multiple namespaces with just one `:require` statement

Here is an example namespace expression with multiple require statements from the [duct](https://github.com/duct-framework/duct) web framework template

```clojure
(ns duct-test.main
  (:require [clojure.java.io :as io]
            [com.stuartsierra.component :as component]
            [duct.middleware.errors :refer [wrap-hide-errors]]
            [meta-merge.core :refer [meta-merge]]
            [duct-test.config :as config]
            [duct-test.system :refer [new-system]]))

```

!!! INFO "Avoid use form - require should be used"
    The `use` or `:use` form is not recommended as it pulls in everything the namespace and everything that the included namespace also included.  This can lead to conflicts, especially in larger projects.

    As Clojure is typically composed of many libraries, its prudent to only include the specific things you need from another namespace.


## Design & Refactor

When starting a new project all the code is typically in one namespace, unless you are using a template that creates multiple namespaces with sample code.

Practicalli recommends adding comment sections as the code is developed, grouping code by its purpose.  As the namespace grows in size and complexity, these groups can be moved into their own namespaces as necessary.  A code refactor is much simpler as the code is already grouped logically by purpose.

??? EXAMPLE "Code comment sections"
    ```clojure
    ;; --------------------------------------------------
    ;; State

    ;; --------------------------------------------------

    ;; --------------------------------------------------
    ;; Helper functions

    ;; --------------------------------------------------

    ;; --------------------------------------------------
    ;; System / Lifecycle

    ;; --------------------------------------------------
    ```

!!! HINT "Clojure LSP Snippets"
    [Practicalli Clojure LSP Config](https://github.com/practicalli/clojure-lsp-config) defines snippets to create sections within a Clojure file

    `comment-header` to describe the overall purpose of the namespace

    `comment-section` creates a start and end comment line and text comment

!!! INFO "One pass evaluation"
    A Clojure file is evaluated from top to bottom, so var (`def`, `defn`) definitions should come before they are used in the code.
