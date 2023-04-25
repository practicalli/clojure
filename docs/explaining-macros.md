# Explaining Macros

<!-- When to write a macro
Extending the clojure language, such as a dsl in a library
Something you will used time and time again over multiple projects

When not to write a macro
just because you want tool
When a function is just fine
its only used in this project
where you want it to be composable (macros are not composable, eg (apply my-macro data) does not work - `apply and` is a good example here)
you dont have time to learn the macro syntax properly and you dont want to write a bad macro
your macro doest do anything you cant do with a function.
-->

The macro system allows you to extend the design of the Clojure language, without waiting for the language designers.

> #### Hint::Clojure macros are quite unique
>
> Many languages have macros, although most are more akin to a template systems.
>
> Clojure macros are a language within the Clojure language that generate Clojure code when the Clojure Reader parses a macro.  In fact the Clojure Reader will pass the macro to the macro reader which does the expansion.

Expose as much of your API as possible as functions so that they can be stored in hash-maps, mapped over sequences of widgets, negated with complement, juxtaposed with juxt, and so on.

Only define your own macros when functions are insufficient or there is a very common abstraction that creates a simpler system.

> #### Hint::Every Macro adds maintenance cost
>
> Adding custom macros adds a higher maintenance cost to a codebase and increased the amount of on-boarding of developers onto a project.
>
> Custom macros are additional abstractions to learn when working with a project that are not common across projects in the same way as clojure.core or common libraries.

## Functional composition and Macros

Macros do not compose functionally

Macros in Clojure aren't values. They can't be passed as arguments to other functions or macros, can't be returned as the result of computations, and can't be stored in data structures.

> If macros were values and used as arguments to functions then the compile cycle of Clojure would need to change, otherwise the results of macro expansion wouldn't be known until runtime and could even vary between function calls.

## Wrapping Macros in functions for composition

It is possible to wrap a macro in a function and then that macro can be used as part of a functionally composed expression.

```clojure
(reduce and [true true false true])
;;=> RuntimeException

(reduce #(and %1 %2) [true true false true])
;;=> false
```

If you are doing this, then its more probably that a simple function would be a better approach.
