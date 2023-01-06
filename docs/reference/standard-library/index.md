# Standard Library - clojure.core

Examples of using the functions from the `clojure.core` namespace and other important functions, macros and special forms that are part of the `org.clojure/clojure` library.


## Functions, Macros and Special forms
The majority of times macros and special forms act just like any other defined function (i.e. `fn`, `defn`)

A macro is a piece of code that evaluates into a function when read by the macro reader, or by the developer using `macroexpand` function.  An expanded macro may also contain macros, so expansion could take place several levels (`macroexpand-all`).

macros are not composable like functions, so functions like `apply` `reduce` `map` cannot use a macro (use a function instead).

Special forms are built into the Clojure runtime, so will not be found in clojure.core
* Special forms: `if` `do` `let` `quote` `var` `fn` `loop` `recur` `throw` `try`
* Special forms for Java interop:  `.` `new` `set!`
