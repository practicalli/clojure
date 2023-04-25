# Functors

> **Fixme** work in progress

Put simply, a function that takes a value and a function as its arguments, eg `map`.  The argument pass as a value is most commonly a collection type (vector, map, string, list).

> From Wikipedia

> In mathematics, a functor is a type of mapping between categories which is applied in category theory. Functors can be thought of as homomorphisms between categories. In the category of small categories, functors can be thought of more generally as morphisms.

A functor applies the given function to each element in the the collection by unpacking and each element from the collection and passing it to the function as an argument.  The result from each application of the function from the element of the collection is put into a new collection.  This new collection is returned once all elements of the original collection have been processed.

The function, eg. + is applied in turn to each value and returns a structured value as a result,
eg. a list or vector

```
(map inc [1 2 3 4 5])

(inc 1 )
```
