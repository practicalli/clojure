# Data structures

  Clojure is a very data centric language.  It has many functions for manipulating data structures and has some very powerful built in data structures, refered to as collections (or sequences).
  
  Collections can take any types of elements and types can be mixed.  Collections can even have other collections as an element.

## Clojure's built in data structures

So far, we've dealt with discrete pieces of data: one number, one string, one value. When programming, it is more often the case that you want to work with groups of data. Clojure has great facilities for working with these groups, or _collections_, of data. Not only does it provide four different types of data strucutres, but it also provides a uniform way to use all of these data structures together.

Clojure's built in persistent data structures:

* **Lists** - a linked list, sequential access
* **Vectors** - an indexed array
* **Maps** - key-value pair (hash map)
* **Sets** - a unqiue set of values

Clojure data structure share the following characteristics:

* **Immutable** - once a data structure is defined it cannot be changed.
* **Persistent** - changes to data structures are created in a new data structure which is linked back to the original data structure 
* **Shared memory** - copies create during a change to a data structure share memory for the common elements
* **Dynamically typed** - contains any value, including functions (as they evaluate to a value) 

This section will cover the Clojure built in persistent data structures in more detail.
