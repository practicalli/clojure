# Reader Macros

> #### Todo::Re-write

This is a collection of reader macros (think syntactic sugar) that are valid in Clojure.  These macros are useful for commenting out expressions, defining sets, ...

Many reader macros start with the character **#**, which is infact the _Dispatch macro_ that tells the Clojure reader (the thing that takes a file of Clojure text and parses it for consumption in the compiler) to go and look at another read table for the definition of the next character - in essence this allows extending default reader behaviour.


* **#_** - Discard macro - ignore the next expression.  Often used to comment out code, especially when nested inside other expressions


* **#'** - Var macro - returns the reference to the var.  Used to pass the definition of something rather than the result of evaluating it.

There is a nice list of reader macros in the article: [The weird and wondreful characters of Clojure](https://yobriefca.se/blog/2014/05/19/the-weird-and-wonderful-characters-of-clojure/) by [@kouphax](http://twitter.com/kouphax).

> **Hint** Reader macros are part of the Clojure language specification, so are different to macros, which can be defined by anyone.
