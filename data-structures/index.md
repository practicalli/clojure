# Data structures

  Clojure is a very data centric language.  It has many functions for manipulating data structures and has some very powerful built in data structures, referred to generically as collections.

  Collections can take any types of elements and types can be mixed.  Collections can even have other collections as an element.

  Data structures are passed as arguments to function (either in part or in full) and functions often return data structures as a result.

## Built-in data structures

So far, we've dealt with discrete pieces of data: one number, one string, one value. When programming, it is more often the case that you want to work with groups of data. Clojure has great facilities for working with these groups, or _collections_, of data. Not only does it provide four different types of data structures, but it also provides a uniform way to use all of these data structures together.

Clojure's built in persistent data structures:


There are 4 commonly used built-in data structures which are used to model information with Clojure

| Name     | syntax           | Description                                                                                               |
| :-----   | :-------         | :------------                                                                                             |
| list     | `()`             | A linked list, optomised for sequential access from the front (head), first element read as function call |
| vector   | `[]`             | An indexed array optimised for random access                                                              |
| hash-map | `{:key "value"}` | Associative collection of key / value pairs, keys must be unique                                          |
| set      | `#{}`            |  a unique set of values                                                                                                         |



## Characters
Clojure data structure share the following characteristics:

* **Immutable** - once a data structure is defined it cannot be changed
* **Persistent** - functions may return an altered copy of a data structure which will share common values with the original data structure for efficient memory use (structural sharing)
* **Dynamically typed** - a data structure can contain any value, including functions (as they evaluate to a value) and other data structures (nested data structures)

This section will cover the Clojure built in persistent data structures in more detail.
