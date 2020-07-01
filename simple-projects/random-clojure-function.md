# Random Clojure Function
A simple application that returns a random function from the `clojure.core` namespace, along with the function argument list and its description (from the doc-string)

There are 659 functions in `clojure.core` namespace and 955 in the standard library (as of June 2020).  These functions are learned over time as experience is gained with Clojure.

## Create a project

```shell
clojure -A:new app practicalli/random-clojure-function
```



## REPL experiments
Start a repl and experiment or open `src/practicalli/random-clojure-function.clj` in a Clojure-aware editor

Get a list of all the functions in the clojure.core namespace, preferably just the public functions.

```clojure
(ns-publics 'clojure.core)
(vals (ns-publics 'clojure.core))

(rand-nth standard-library-functions)
(meta (rand-nth standard-library-functions))
```

## Define a name for all functions
Edit the `src/practicalli/random-clojure-function.clj` file and define a name for the collection of all public functions from `clojure.core`

```clojure
(def standard-library-functions
  "Fully qualified function names from clojure.core"
  (vals (ns-publics 'clojure.core)))
```

## Write Unit Tests
From the REPL experiments we have a basic approach for the application design, so codify that design by writing unit tests.  This will also highlight regressions during the course of development.

Edit the file `test/practicalli/random_clojure_core_function_test.clj` and add unit tests.

The first test check th standard-library-functions contains entries.

The second test checks the -main function returns a string (the function name and details).

```clojure
(ns practicalli.random-clojure-core-function-test
  (:require [clojure.test :refer [deftest is testing]]
            [practicalli.random-clojure-core-function :as SUT]))

(deftest -main-test
  (testing "Show random function from Clojure standard library"

    (is (seq SUT/standard-library-functions))

    (is (string? (SUT/-main)))))
```

## Update the main function

Edit the `src/practicalli/random-clojure-function.clj` file.  Change the `-main` function to return a string of the function name and description.

```clojure
(defn -main
  "Return a function name from the Clojure Standard library"
  [& args]
  (let [function-details (meta (rand-nth standard-library-functions))]
    (str (function-details :name) "\n  " (function-details :doc)))
  )
```

Run the tests with the Cognitect Labs test runner

```shell
clojure -A:test-path:test-runner-cognitect
```

The tests should pass.  If the tests fail, check with the (TODO: version of the project).

## Running the application

```shell
clojure -A:new app practicalli/random-clojure-function
```
This should return a random function name and its description.  However, nothing is returned.

## Improving the code
The tests pass, however, no output is shown when the application is run.

The main function returns a string and nothing is being sent to standard out.  The `str` expression could be wrapped in a println, although that would make the result harder to test and not be very clean code.

Also, there is no way to control which library we get the functions from, limiting the ability of our application.

Update the tests to use a separate function for retrieving the random function

```
(deftest random-function-test
  (testing "Show random function from Clojure standard library"
    (is (seq SUT/standard-library-functions))
    (is (string? (SUT/random-function SUT/standard-library-functions)))))
```

Create a new function to return a random function from a given collection of functions.  Then call that from main.

The function extracts the function `:name` and `:doc` from the metadata of the randomly chosen function.

```clojure
(defn random-function
  [function-list]
  (let [function-details (meta (rand-nth function-list))]
    (str (function-details :name) "\n  " (function-details :doc) "\n  " (function-details :arglists))))

```

Update the main function to call this new function.

```clojure
(defn -main
  "Return a function name from the Clojure Standard library"
  [& args]
  (println (random-function standard-library-functions)))
```

Run the tests

Run the application

```shell
 clojure -m practicalli.random-clojure-function
```
A random function and its description are displayed.

## Adding the function signature

Edit the source code and add the funciton signature to the string returned by the application.



## Add more namespaces

`clojure.string`


All current namespaces can be retrieved using the `all-ns` function.  This returns a lazy-seq, `(type (all-ns))`

Bind a name to the list of all namespaces

```clojure
(def available-namespaces (all-ns))
```




## Control which namespaces are consulted
If no arguments are passed then all Clojure standard library function are used to pull a random function from.

Any arguments should be a namespace as a string.  That namespace alone is used to get a random function from.




  (vals (ns-publics 'clojure.string))

  ;; define a function to get

 - (vals (ns-publics 'clojure.repl))


  (mapcat function-list ['clojure.core])

  (mapcat #(function-list (symbol %)) ['clojure.core])
  (mapcat #(function-list (symbol %)) ["clojure.core"])

  (mapcat function-list ['clojure.core 'clojure.string])

  (symbol 'clojure.core)

  (function-list 'clojure.core)

  (-main "clojure.string")


```clojure
(defn -main
  "Return a function name from the Clojure Standard library"
  [& args]
  (if (seq args)
    (println (random-function (mapcat #(function-list (symbol %)) args)))
    (println (random-function standard-library-functions))))
```


## Use the fully qualified name for the namespace


```clojure
(:ns (meta (rand-nth standard-library-functions)))
```

Update the random function to return the domain part of the namespace, separated by a `/`

```clojure
(defn random-function
  [function-list]
  (let [function-details (meta (rand-nth function-list))]
    (str (function-details :ns) "/" (function-details :name)
         "\n  " (function-details :arglists)
         "\n  " (function-details :doc))))
```

## Use all available namespaces by default

Define a name to represent the collection of all available namespaces, in the context of the running REPL.

```clojure
(def available-namespaces
  "Fully qualified function names from available"
  (mapcat #(vals (ns-publics %)) (all-ns)))
```


Update the `-main` function to use all available namespaces if no arguments are passed to the main function.

```clojure
(defn -main
  "Return a random function and its details
  from the available namespaces"
  [& args]
  (if (seq args)
    (println (random-function (mapcat #(function-list (symbol %)) args)))
    (println (random-function available-namespaces))))
```

## Convert to a web service

Add http-kit server and send  information back as a plain text, html, json and edn


## Convert to a library
Convert the project to a library so this feature can be used as a development tool for any project.

Add functionality to list all functions from all namespaces or a specific namespace, or functions from all namespaces of a particular domain, e.g `practicalli` or `practicalli.app`





> #### Hint::Evaluating namepaces on REPL start
> The REPL does not evaluate project code on start-up.  If it did and that code had a error, it may prevent the REPL from starting.
>
> Standard practice is to required the main namespace for the project, then switch the REPL to that namespace.  The functions for the project are now available.
> To require and switch to a namespace on startup, use the `clojure` or `clj` commands with the --eval option to run the specific commands.  The --repl option will ensure the repl starts.
```shell
clj --eval "(require 'practicalli.random-clojure-core-function)" --eval "(in-ns 'practicalli.random-clojure-core-function)" --repl
```
> The --eval approach will be blocked if used with aliases that set the main namespace, such as `:rebel`.
