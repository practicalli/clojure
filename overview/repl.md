# Read, Evaluate Print Loop (REPL)


#### The Reader

Clojure is a [homoiconic](http://en.wikipedia.org/wiki/Homoiconicity) language, which is a fancy term describing the fact that Clojure programs are represented by Clojure data structures. This is a very important difference between Clojure (and Common Lisp) and most other programming languages - Clojure is defined in terms of the evaluation of data structures and not in terms of the syntax of character streams/files. It is quite common, and easy, for Clojure programs to manipulate, transform and produce other Clojure programs.

That said, most Clojure programs begin life as text files, and it is the task of the reader to parse the text and produce the data structure the compiler will see. This is not merely a phase of the compiler. 

The reader has syntax defined in terms of characters, and the Clojure language has syntax defined in terms of symbols, lists, vectors, maps etc. The reader is represented by the function [read](http://clojure.github.io/clojure/clojure.core-api.html#clojure.core/read), which reads the next form (not character) from a stream, and returns the object represented by that form.



#### Evaluation 



