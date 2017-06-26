# Vector

Vectors are an indexed sequential collections of data, basically the same as arrays in other languages.  However, there are several differences.  The index for a vector starts at 0, just like arrays in other languages. 

![Vector](../images/vector-concept.png)

Vectors are written using square brackets `[]` with any number of pieces of data inside them, separated by spaces. 

> **Note** Experiment with creating vectors for your data structures

```clj
(vector 1 2 3 4)
[1 2 3 4 5]
[56.9 60.2 61.8 63.1 54.3 66.4 66.5 68.1 70.2 69.2 63.1 57.1]
[]

(def pi 3.1435893)
[1 2.4 pi 11/4 5.0 6 7]
[:cat :dog :rabit :fish]
[{:cat 1} "fish" "potatoes" "oil" (str "who ate my" "fish n chips")]

;; Include other data structures in vectors, in this example a list is an element of the vector
[1 2 3 '(4 5 6)]

;; Are duplicate elements allowed ?
[1 2 3 4 1]
```

> **Note** What can you do with vectors? Vectors are easy to add more items to, delete items from, or pull arbitrary items out of. Here are some functions that operate on vectors.

```clj
(vector? [5 10 15])
(= [] [])
(= [] [1])

(first [5 10 15])
(rest [5 10 15])
(nth [5 10 15] 1)
(count [5 10 15])

(conj [5 10] 15)
```

> **Hint** When a function is effectively asking if a value is true or false, its refered to as a _predicate function_.  Its common practice in Clojure to place a `?` at the end of that functions name.


## Lookup data from a Vector


```clojure
([1 2 3] 1)

;; ([1 2 3] 1 2)  ;; wrong number of arguments, vectors behaving as a function expect one parameter

;; ((1 2 3) 1) ;; you cant treat lists in the same way, there is another approach - assoc
```
  

## Changing vectors 

The next two functions are used to make new vectors. The `vector` function takes any number of items and puts them in a new vector.

 `conj` takes a vector and an item and returns a new vector with that item added to the end. The function name is taken from the verb "conjugate", meaning "to join together.

Remember that  collections in Clojure are _immutable_, so when we say that a function "adds to" or "removes from" a collection, what we mean is that the function returns a new collection with an item added or removed.

> **Note** Using one or more vectors, create a data structure of the high temperatues for the next 7 days in your area. Use the `nth` function to get the high temperature for next Friday
