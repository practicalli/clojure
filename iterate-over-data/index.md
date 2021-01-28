# Iterate over data

> #### TODO::work in progress, sorry

Clojure data is typically within one or more of the built in collection types (vector, map, list, set).

We can use some functions in Clojure core directly on these collection types.  Other clojure core functions need a little help.


## map
Used to create a new collection by applying a given function to each element of the collection in turn.

```clojure
(map inc [1 2 3])
```

If there are multiple collections, map returns a new collection with values created by calling the function with a value from each of the collections.  Once map reaches the end of one collection it stops and returns the result.

```clojure
(map + [1 2 3] [4 5 6] [7 8 9])
```

## apply
Used to remove all the values from a collection so they are treated as individual arguments to the function given to apply.

```clojure
(= (apply + [1 2 3])
   (+ 1 2 3))
```

## reduce
reduce can be used in a similar way as apply, to transform a collection into a different value.

reduce can also take an argument referred to as an accumulator, used to keep local state as reduce iterates through the values in the collection.

A function used with reduce is called a reducing function and is a more abstract approach to loop/recur although its possible to give your reducing function a name so is more reusable.


## threading macros
Write code that reads as a sequential series of function calls, rather that the nested function calls typical in lisp.

A threaing macro is often used to thread a collection through a number of function calls and expressions.


## comp
Compose functions together that work over a collection.  It can be seen as a more abstract approach to a threading macro or nested function calls.

## transduce
Used like comp to create a pipeline of function calls, however, each function call or expression must return a transducer (transforming reduction).  Many `clojure.core` functions return a transducer if you do not provide the collection argument.
