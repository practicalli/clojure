# Threading macros
  The thread-first `->` and thread-last `->>` macros allow Clojure code to be written in a more sequential style and with a more terse syntax.  This can sometimes make code easier to understand by humans.

  Using the thread-first macro, `->`, the result of the first evaluation is passed as the **first argument** to the next function and so on.

  ```clojure
(->
 (clojure.string/lower-case "HELLO")
 (str ", Clojure world"))
```

The value hello is converted to lower case and that result is passed as the first argument to the next function.  The string function is then evaluated with this new argument and the final "hello, Clojure world" string is returned as the result.

  The thread-last macro `->>` passes the result of the first evaluation as the **last argument** to the next expression.

```clojure
(->>  " this"
 (str " is")
 (str " backwards"))
```

> #### Hint::Parens optional
> function calls that only take one argument, the one passed by earlier expressions, can be included in the threading macro code without the surrounding `()` parens.


## Reading Clojure code
 To read Clojure it is common to start from the inside out, as this is how the Clojure reader also works.  This style is inherited from Lisp of which Clojure is an implementation.

  The following code is written in classic Lisp style.

```clojure
(reverse
  (sort-by val (frequencies
                 (remove common-english-words
                   (map #(clojure.string/lower-case %)
                        (re-seq #"[a-zA-Z0-9|']+"
                                (slurp book.txt)))))))
```

Reading inside out:
1. slurp in the contents of the book.txt file, converting it to a string.
2. use a regular expression to create a new sequence where the book is a sequence of individual strings for each word.
3. convert each string in the sequence by mapping the lower-case function over each element of the sequence.
4. remove common english words such as the and and from the sequence.
5. count how many times each word occurs and pair the string with its frequency in the book.
6. reverse the order of the sequence by the value of frequency, so the most used word is at the start of the sequence.

This function uses the var `common-english-words` which is defined as:

```clojure
(def (set
       (clojure.string/split (slurp "common-english-words.txt") #"," )))
```

This takes a comma separated file of words and splits them.  The words are put into a set so only one instance of each word is included.


## Rewriting the code with threading macros

```clojure
(->> (slurp book.txt)
     (re-seq #"[a-zA-Z0-9|']+" ,,,)
     (map #(clojure.string/lower-case %))
     (remove common-english-words)
     frequencies
     (sort-by val)
     reverse)
```

`frequencies` and `reverse` only take one argument, so they do not require surrounding `()` inside the threading macro.

  The common-english-words var is fairly easy to read, so probably doesn't need to be written using a threading macro, however, for completeness here is a thread-first example.
```clojure
(def common-english-words
  (-> (slurp "common-english-words.txt")
      (clojure.string/split #",")
      set))
```

> #### Hint::Macroexpand
> use `macroexpand-1` around the threading macro code to show resulting lisp style Clojure code.  Clojure editors also provide evaluation functions that will macroexpand.
