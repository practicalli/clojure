# Shared memory with Persistent data structures 

  The Clojure data structures are immutable, so they initially seem similar to constants rather than variables.  Once a collection is created, it cannot be changed.  Any functions that run on a collection do not change the collection, instead they return a new collection with the respective changes.
  
  Creating a new collection each time may seem inefficient, however, the persistent collections use a sharing model.  When a new collection is created, it links to all the relevant elements of the original collection and adds any new elements.

![Persistent data structures](../images/clojure-persistent-data-structures-sharing.png)

> **Hint** Read the InfoQ article on [An In-Depth Look at Clojure Collections](http://www.infoq.com/articles/in-depth-look-clojure-collections).

