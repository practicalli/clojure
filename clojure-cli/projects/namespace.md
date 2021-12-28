# Namespaces
Using namespaces  makes code easier to work with by provide levels of abstraction that convey the overall design of the project.  Clearly organized namespaces support a simple design approach for a project and make it easier to maintain.

A namespace is a logical separation of code, usually along features of the projects. Think of all namespaces as creating an API's within the project that communicate the architecture of the system.

## Controlling scope
A namespace contains related data structures and functions, limiting their scope to that function.  Namespaces should limit their interdependence on each other (limited number of required namespaces) to avoid a highly coupled design.

Within a namespace a var (`def`, `defn`) can be called by its name.  Outside of the namespace, a fully qualified name must be used. Vars can be marked as private (`defn- name`, `def ^private name`), so they can be accessed only by functions in their own namespace.


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

> #### Hint::Trying out a namespace
> `(require '[domain/filename])` can be used within you code if testing that namespace functions to see if they are useful to the project.  Using a live linter such as [clj-kondo](https://github.com/borkdude/clj-kondo) will also advise you when to refer namespaces.


## Including specific parts of a namespace
If the library you are including is the predominant purpose of that namespace, a good example is clojure.test, then you can include specific functions from that namespace.

Using `:refer` in the `require` expression provides a way to include specific vars directly in the current namespace, as if it had been defined there. Referring a var means it no longer requires a namespace qualifier.

```clojure
(ns my-namespace.core
  :require [clojure.java.io :refer [reader]])

(defn read-the-file [filename]
  (line-seq (reader filename)))

(read-the-file "project.clj")
```

> #### Info::Including / Excluding / renaming vars
> These other options on required functions are rarely used in practice.  They tend to cause more issues than they solve, so use with care.
>
> `:exclude` will prevent a var from being used from a required namespace.
>
> `:only` will include only that var from the required namespace.
>
> `:rename` changes the name of the original function, if there conflicts


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

> #### Info::Avoid use in Clojure code
>The `use` or `:use` expression should not be used in Clojure code as it pulls in everything the namespace and everything that the included namespace also included.  This can lead to conflicts, especially in larger projects. This is seen as a bad practice especially when writing libraries, as you can end up including a great many unused functions into the namespace.

> As Clojure is typically composed of many libraries, its prudent to only include the specific things you need from another namespace.  This also helps reduce conflicts when including multiple libraries in your project.
