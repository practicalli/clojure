# Explaining Macros

The macro system allows you to extend the design of the Clojure language, without waiting for the language designers.

> #### Hint::Clojure macros are quite unique
> Many languages have macros, although most are more akin to templating systems.
>
> Clojure macros are a language within the Clojure language that generate Clojure code when the Clojure Reader parses a macro.  In fact the Clojure Reader will pass the macro to the macro reader which does the expansion.

Use macros when functions alone lead to unneccessay complexity or to reduce repetition or you can achieve a higher abstraction that creates a simpler system.

Expose as much of your API as possible as functions so that they can be stored in hash-maps, mapped over sequences of widgets, negated with complement, juxtaposed with juxt, and so on.


## Functional composition and Macros

Macros are not values in themselves, as functions are, so marcos cannot be used as functional arguments in the same way that functions can.

So marcros do not compose functionally

Macros in Clojure aren't values. They can't be passed as arguments to other functions or macros, can't be returned as the result of computations, and can't be stored in data structures.

If macros were values and used as arguments to functions then the compile cycle of Clojure would need to change, otherwise the results of macro expansion wouldn't be known until runtime and could even vary between function calls.


## Wrapping Macros in functions for composition

It is possible to wrap a macro in a function and then that macro can be used as part of a functionally composed expression.

```clojure
(reduce and [true true false true])
;;=> RuntimeException

(reduce #(and %1 %2) [true true false true])
;;=> false
```
