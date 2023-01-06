# Homoiconicity

Clojure is a homoiconic language, which is a term describing the fact that Clojure programs are represented by Clojure data structures. 

In Clojure you write your business logic as functions.  A function is defined using a list structure.  A function is called using a list structure, as the first element of a list is evaluated as a function call.

> **Hint** Everything in Clojure is a _List_ (or vector, map, set).

This is a very important difference between Clojure (and Common Lisp) and most other programming languages - Clojure is defined in terms of the evaluation of data structures and not in terms of the syntax of character streams/files. 

It is quite easy for Clojure programs to manipulate, transform and produce other Clojure programs.  This is essentially what macros do in Clojure, they re-write Clojure for you.

> **Hint** If you were going to create Skynet, it would be so much easier to do in Clojure

![Skynet logo](https://truthernews.files.wordpress.com/2015/04/skynet_wallpaper.jpg)

## An example 

Consider the following expression:

```
(let [x 1] 
    (inc x))
```

Evaluating the above code in the REPL returns `2` because the repl compiles and executes any code entered into it. But `[x 1]` is also a literal vector data structure when it appears in a different context.

All Clojure code can be interpreted as data in this way. In fact, Clojure is a superset of EDN – Extensible Data Notation, a data transfer format similar to JSON. EDN supports numbers, strings, lists (1 2 3), vectors [1 2 3], maps {"key" "value"}. 

If this sounds and looks a lot like Clojure syntax, it’s because it is. The relationship between Clojure and EDN is similar to that of Javascript and JSON, but much more powerful.

In Clojure, unlike JavaScript, all code is written in this data format. We can look at our let statement not as Clojure code, but an EDN data structure. Let’s take a closer look:

```
(let [x 1] 
    (inc x))
```

In this data structure, there are four different types of data.

* 1 is a literal integer.
* let, x, and inc are symbols. A symbol is an object representing a name – think a string, but as an atomic object and not a sequence of characters.
* [x 1] is a vector containing two elements: symbol, x, and an integer, 1. Square brackets always signify vectors when talking about EDN data structures.
* (inc x) is a list (a linked list data structure) containing two symbols, inc and x.

When thinking about a piece of Clojure code as a data structure, we say we are talking about the form. Clojure programmers don’t normally talk about EDN, there are just two ways to think about any bit of Clojure: 1) as code that will execute or 2) as a form, a data structure composed of numbers, symbols, keywords, strings, vectors, lists, maps, etc.

Symbols are particularly important. They are first class names. In Clojure, we distinguish between a variable and the name of that variable. When our code is executing, x refers to the variable established by our let binding. But when we deal with that code as a form, x is just a piece of data, it’s a name, which in Clojure is called a symbol.

This is why Clojure is homoiconic. Code forms are data structures and data structures can be thought of as forms and executed as code. This transformation is quite literal, and two core operations, quote and eval are key ingredients to this potion.

## References

* [The Reader - Clojure. org](http://clojure.org/reference/reader)
* [Homoiconicity - Wikipedia](https://en.wikipedia.org/wiki/Homoiconicity)
* [Is Clojure Homoiconic - muhuk.com](http://blog.muhuk.com/2014/09/28/is_clojure_homoiconic.html)
* [Understanding Homoiconicity in Clojure - Drew Colthorp](https://spin.atomicobject.com/2013/07/23/homoiconicity-clojure-macros/)
