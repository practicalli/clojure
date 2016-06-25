# Threading macros

  The following code is written in classic Lisp style.
  
```
(nth (read-string (slurp "project.clj")) 2)
```

  When you come to read Lisp, you start from the inside out.  In this case you start with `(slurp ...)` and what it returns is used as the argument to `(read-string ...)` and so on...

  In our minds we probably constructed the following basic algorithm:
  * Get the contents of the project.clj file using `slurp`
  * Read the text of that file using read-string
  * Select just the third string using nth 2 (using an index starting at 0)

Can we rewrite our Clojure code to fit the way we think?


## Thread first macro

  Using the thread-first macro **->** we can chain Clojure functions together with a terser syntax, passing the result of the first evaluation as the first argument to the next function and so on.  Using this style, we can write code that matches the algorithm in our head.

For example

```
(->
 (clojure.string/lower-case "HELLO")
 (str ", Clojure world"))
```

The value hello is converted to lower case and that result is passed as the first argument to the next function.  The string function is then evaluated with this new argument and the final "hello, Clojure world" string is returned as the result. 


> **Note** Refactor the Clojure code using the thread-first macro 

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->

```clojure
(->
 "./project.clj"
 slurp
 read-string
 (nth 2))
```

> **Hint** The "project.clj" is a string, so when you evalute it as an expression, it simply returns the same string.  That string is then passed as an argument to any following functions.

 Using the threading macro, the result of every function is passed onto the next function in the list.  This can be seen very clearly usng ,,, to denote where the value is passed to the next function

```clojure
(->
 "project.clj"
 slurp ,,,
 read-string ,,,
 (nth ,,, 2))
```

> **Hint** Commas in clojure are treated as whitespace, they are simply ignored when it comes to evaluating code.  Typically commas are rarely used and only to help human readabilty of the code

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

```clojure
(->>
 (str " This")
 (str " is")
 (str " backwards"))
```

```
;; => backwards is This"
```

<!--endsec-->
