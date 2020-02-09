# Read, Evaluate Print Loop (REPL)

The REPL provides a fast, powerful and fun way to develop code and is the hard of the Clojure developers workflow.  The REPL allows you to quicky test out designs and your domain knowlege of the system you are building, easily accomodating multiple designs to help you evaluate the best approach.

Starting a REPL is the first thing you do after creating or downloading a project.

The REPL allows you to run any existing code, write new code and change code.  Each time you can see the results of your code instantly.

The REPL can run all of your code or simply get the result of an individual expression.  You can inspect runtime values and continually develop your code without having to restart each time.


> **Hint** If you are not using the REPL for your Clojure development you are missing out on a highly productive workflow.  Once you start using a REPL as part of you developement cycle you will feel lost without one.



# How the REPL works (simple version)

A Clojure REPL has 4 stages:

* Read - read in the code
* Evaluate - evaluate the code
* Print - show the results
* Loop - on to the next expression

Its useful to understand the difference between Read and Evaluate, especially when you get as far as writing macro's for Clojure.

## The Reader

The Reader parses the Clojure source code, form by form, producing the Clojure data structures an [Abstract Syntax Tree] (AST). 

Due to the syntax of Clojure, much of the source code is aready in the right structure.  Any macros will be expanded into its Clojure structure. 

These data structures are then evaluated: Clojure traverses the data structures and performs actions like function application or var lookup based on the type of the data structure. 

For example, when Clojure reads the text (+ 1 2), the result is a list data structure whose first element is a + symbol, followed by the numbers 1 and 2. This data structure is passed to Clojure’s evaluator, which looks up the function corresponding to + and applies that function to 1 and 2.

[![REPL process diagram](http://www.braveclojure.com/assets/images/cftbat/read-and-eval/lisp-eval.png)](http://www.braveclojure.com/read-and-eval/)

## The Reader




> **Hint** Clojure is a [homoiconic](http://en.wikipedia.org/wiki/Homoiconicity) language, which is a fancy term describing the fact that Clojure programs are represented by Clojure data structures. This is a very important difference between Clojure and most other programming languages.  It means that Clojure is defined in terms of the evaluation of data structures and not in terms of the syntax of character streams/files. 

> It is quite common, and easy, for Clojure programs to manipulate, transform and produce other Clojure programs.

The reader has syntax defined in terms of characters, and the Clojure language has syntax defined in terms of symbols, lists, vectors, maps etc. The reader is represented by the function [read](http://clojure.github.io/clojure/clojure.core-api.html#clojure.core/read), which reads the next form (not character) from a stream, and returns the object represented by that form.

There are also [Reader Macros](/resources/reader-macros.html) that define special rules on top of the Clojure syntax.  They give the language some additional syntax sugar, making your Clojure code compact.  See the [reference section on reader macros](/resources/reader-macros.html) for more information



## Evaluator

The Evaluator takes the data structure as an argument (from the Reader) and processes it using rules corresponding to the data structure’s type, returning the result. 

To evaluate a symbol, Clojure looks up what the symbol refers to. 

To evaluate a list, Clojure looks at the first element of the list and calls a function, macro, or special form. 

Any other values including strings, numbers and keywords simply evaluate to themselves.


> **Hint** Read the section on [Reading, Evaluation and Macros from BraveClojure](http://www.braveclojure.com/read-and-eval/) to see examples of the REPL process.

