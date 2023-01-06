# Data structures

Clojure is a very data-centric language.  `clojure.core` contains a great number of functions for manipulating data structures, especially the immutable built in data structures, referred to generically as collections.

Collections can take any types of elements and types can be mixed.  Collections can even have other collections as an element.

Collections are passed as arguments to function (either in part or in full) and functions often return collections as a result.


## Built-in collections

Values can be represented as a collection of discrete pieces of data: number, string, boolean value.

Clojure has great facilities for working with collections of data, providing many types of data structures and a uniform way to use all of these data structures.

The 4 commonly used built-in data structures

| Name     | syntax           | Description                                                                          |
|:---------|:-----------------|:-------------------------------------------------------------------------------------|
| list     | `()`             | A linked list, optomised for sequential access from the front (head)                 |
| vector   | `[]`             | An indexed array optimised for random access                                         |
| hash-map | `{:key "value"}` | Associative collection of key / value pairs, keys must be unique. Keys are the index |
| set      | `#{}`            | A unique set of values                                                               |

Vector and hash-map are the most commonly collections used to model information with Clojure.

Lists are not explicitly used to model data, although data may be returned by a function as a list (referred to as a sequence)


## Collection Characteristics

Clojure data structure share the following characteristics:

* **Immutable** - once a data structure is defined it cannot be changed
* **Persistent** - functions may return an altered copy of a data structure which will share common values with the original data structure for efficient memory use (structural sharing)
* **Dynamically typed** - a data structure can contain any value, including functions (as they evaluate to a value) and other data structures (nested data structures)

This section will cover the Clojure built in persistent data structures in more detail.
