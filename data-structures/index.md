# Data structures

  Clojure is a very data centric language.  It has many functions for manipulating data structures and has some very powerful built in data structures, refered to as collections (or sequences).
  
  Collections can take any types of elements and types can be mixed.  Collections can even have other collections as an element.

## Collections

So far, we've dealt with discrete pieces of data: one number, one string, one value. When programming, it is more often the case that you want to work with groups of data. Clojure has great facilities for working with these groups, or _collections_, of data. Not only does it provide four different types of collections, but it also provides a uniform way to use all of these collections together.

* Collections
  * Lists - a linked list, sequential access
  * Vectors - an indexed array
  * Maps - key-value pair (hash map)
  * Sets - a unqiue set of values

Clojure data structure share the following characteristics:
* Immutable - once a data structure is defined it cannot be changed.  Any changes you ask for are created in a new data structure which is linked back to the original data structure 

* Persistent 

* Sequences

* Shared 

* contains any value, including functions (as they evaluate to a value) 
* same conceptual functions 
* behaviour - you can ask your data structure for values it contains


## Persistent data structures 

  The collections in Clojure are immutable, so they initially seem similar to constants rather than variables.  Once a collection is created, it cannot be changed.  Any functions that run on a collection do not change the collection, instead they return a new collection with the respective changes.
  
  Creating a new collection each time may seem inefficient, however, the persistent collections use a sharing model.  When a new collection is created, it links to all the relevant elements of the original collection and adds any new elements.

![Persistent data structures](../images/clojure-persistent-data-structures-sharing.png)


> **Hint** Read the InfoQ article on [An In-Depth Look at Clojure Collections](http://www.infoq.com/articles/in-depth-look-clojure-collections).

## Everything is a List

In Clojure everything is a list, after all Clojure is a language based on LISP (which stands for List Processing).

As Clojure is _Homoiconic_ then there is no real distinction between behaviour and data.  Clojure can be thought of as a data driven language.


# Evaluating Lists

Lists are the data structure for the whole language and by default Clojure will use the first element as a function call.  

So when you just have data in a list, then for all elements to be treated as data when evaluated you add the `quote` function or its syntactic sugar ' syntax.

```
(1 2 3 4) ;; => Error: 1 is not a function (Ifn)

(quote (1 2 3 4))
'(1 2 3 4)
```

Using the quote character is the most common practice.  

#### Vectors are fast with indexed access 

Vectors are similar to arrays in other languages in that its an indexed collection.  Therefore random access is fast.


#### Maps to categorise the world in key value pairs 


#### Sets when you want more order in your data structure 


