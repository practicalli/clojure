# Clojure Standard Library

Examples of using the functions from the `clojure.core` namespace and other important functions, macros and special forms that are part of the `org.clojure/clojure` library.

There are approximately 700 functions and macros available in the `clojure.core` namespace.  These are referred to as the Clojure Standard Library.

!!! HINT "Counting functions in `clojure.core`"
    To get an accurate number of functions, call the `ns-publics` function with a namespace name
    ```clojure
    (count (ns-publics 'clojure.core))
    ```
    [Random Function](/clojure/simple-projects/random-clojure-function/) is a simple project that prints out a random function from the given namespace, or from clojure.core by default.

<!-- TODO: identify groups (families) of Clojure functions that a Clojure developer should be aware of -->
<!-- Use the Clojure Cheetsheet as a guide to grouping functions -->
<!-- - general sequence functions - map reduce apply into ,,, -->
<!-- - collection fuctions - list hash-map set ,,, -->
<!-- - transformation functions - partition partition-all group-by sort-by -->

## Functions, Macros and Special forms

The majority of times macros and special forms act just like any other defined function (i.e. `fn`, `defn`)

A macro is a piece of code that evaluates into a function when read by the macro reader, or by the developer using `macroexpand` function.  An expanded macro may also contain macros, so expansion could take place several levels (`macroexpand-all`).

macros are not composable like functions, so functions like `apply` `reduce` `map` cannot use a macro (use a function instead).

Special forms are built into the Clojure runtime, so will not be found in clojure.core

- Special forms: `if` `do` `let` `quote` `var` `fn` `loop` `recur` `throw` `try`
- Special forms for Java interop:  `.` `new` `set!`
