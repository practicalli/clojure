# Reference: Threading macros
 Using the threading macro, the result of every function is passed onto the next function in the list.  This can be seen very clearly usng ,,, to denote where the value is passed to the next function

```clojure
(->
 "project.clj"
 slurp ,,,
 read-string ,,,
 (nth ,,, 2))
```

> #### Hint::Commas in clojure are whitespace
> Commas are simply ignored when the Clojure Reader parses code.  Commas are rarely used and only to help human readability of the code

To make this really simple lets create a contrived example of the threading macro.  Here we use the `str` function to join strings together.  Each individual `str` function joins its own strings together, passing the resuting string as the first argument to the next function.

```clojure
(->
 (str "This" " " "is" " ")
 (str "the" " " "threading" " " "macro")
 (str "in" " " "action."))
```

Output

```
;; => "This is the threading macro in action"
```

## Thread-last macro

  Using the thread-last macro, **->>**, the result of a function is passed as the last argument of the next function call.  So in another simple series of str function calls, our text comes out backwards.
```eval-clojure
(->>  " this"
 (str " is")
 (str " backwards"))
```
