# Read, Evaluate Print Loop (REPL)

The REPL provides a fast, powerful and fun way to develop code.  Some newer languages have a REPL, but most C-like languages do not, slowing down the development cycle.

Once you start using a REPL as part of you developement cycle you will feel lost without one.

**Definition from BraveClojure.com**

Clojure (like all Lisps) has an evaluation model that differs from most other languages: it has a two-phase system where it reads textual source code, producing Clojure data structures. These data structures are then evaluated: Clojure traverses the data structures and performs actions like function application or var lookup based on the type of the data structure. 

For example, when Clojure reads the text (+ 1 2), the result is a list data structure whose first element is a + symbol, followed by the numbers 1 and 2. This data structure is passed to Clojure’s evaluator, which looks up the function corresponding to + and applies that function to 1 and 2.

[![REPL process diagram](http://www.braveclojure.com/assets/images/cftbat/read-and-eval/lisp-eval.png)](http://www.braveclojure.com/read-and-eval/)

## The Reader

Clojure is a [homoiconic](http://en.wikipedia.org/wiki/Homoiconicity) language, which is a fancy term describing the fact that Clojure programs are represented by Clojure data structures. This is a very important difference between Clojure and most other programming languages.  It means that Clojure is defined in terms of the evaluation of data structures and not in terms of the syntax of character streams/files. 

It is quite common, and easy, for Clojure programs to manipulate, transform and produce other Clojure programs.

That said, most Clojure programs begin life as text files, and it is the task of the reader to parse the text and produce the data structure the compiler will see. This is not merely a phase of the compiler. 

The reader has syntax defined in terms of characters, and the Clojure language has syntax defined in terms of symbols, lists, vectors, maps etc. The reader is represented by the function [read](http://clojure.github.io/clojure/clojure.core-api.html#clojure.core/read), which reads the next form (not character) from a stream, and returns the object represented by that form.

There are also [Reader Macros](/resources/reader-macros.html) that define special rules on top of the Clojure syntax.  They give the language some additional syntax sugar, making your Clojure code compact.  See the [reference section on reader macros](/resources/reader-macros.html) for more information



## Evaluator

The Evaluator takes a data structure as an argument (from the Reader) and processes it using rules corresponding to the data structure’s type, returning the result. 

To evaluate a symbol, Clojure looks up what the symbol refers to. 

To evaluate a list, Clojure looks at the first element of the list and calls a function, macro, or special form. 

Any other values including strings, numbers and keywords simply evaluate to themselves.


> **Hint** Read the section on [Reading, Evaluation and Macros from BraveClojure](http://www.braveclojure.com/read-and-eval/) to see examples of the REPL process.
