# Transducers

Transducers provide an efficient way to transform values from a collection or stream of data,
eg. core.async channel, java.jdbc database query (0.7.0 upward) or a network stream etc.

Transformations are applied directly to a stream of data without first creating a collection.

Multiple transducers are composed into a single transforming function, walking the data elements only once and without the need for intermediate collections.  

One Transducer benefit is to allow the design to switch from a seq-based implementation to a core.async implementation using channels

[Transducers: Clojure.org](https://clojuredocs.org/clojure.core/transduce){target=_blank .md-button} 
[Transducer use cases](https://clojure.org/guides/faq#transducers_vs_seqs){target=_blank .md-button} 

[Basics Transducer walkthrough](http://eli.thegreenplace.net/2017/reducers-transducers-and-coreasync-in-clojure/){target=_blank .md-button}

[Simple examples of Clojure Transducers](http://ianrumford.github.io/clojure/transducers/reducers/2014/08/08/Some-trivial-examples-of-using-Clojure-Transducers.html){target=_blank .md-button}



<p style="text-align:center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/6mTbuzafcII" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p> 


<p style="text-align:center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/WkHdqg_DBBs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p> 


## Evolving design

Each element of the data collection is acted upon by a composition of each transducer in an expression, making them more efficient than a applying one expression after another (e.g. as with a thread macro or composed list expressions). 

Transducers provide benefits like lazy evaluation and alternative performance trade-offs.


!!! EXAMPLE "Nested calls"
    ```clojure
    (reduce + (filter odd? (map #(+ 2 %) (range 0 10))))
    ```

!!! EXAMPLE "Functional composition"
    ```clojure
    (def xform
      (comp
        (partial filter odd?)
        (partial map #(+ 2 %))))
      (reduce + (xform (range 0 10)))
    ```

!!! EXAMPLE "Thread macro"
    ```clojure
        (defn xform [xs]
          (->> xs
               (map #(+ 2 %))
               (filter odd?)))
        (reduce + (xform (range 0 10)))
    ```

!!! EXAMPLE "Transducer"
    ```clojure
    (def xform
      (comp
        (map #(+ 2 %))
        (filter odd?)))
    (transduce xform + (range 0 10))
    ```

> The order of combinators in a transducer is the same as a thread macro (natural order). 


## core.async

Transducers were introduced into the Clojure language to provide a common abstraction to avoid re-implmentation of clojure.core transformation functions specific to core.async.

in a large part to support processing data to and from a core.async channel.

The Clojure maintainers discovered they were re-implementing filter, map, partition, etc. on core.async and realized it would be better to have an abstraction for the transforms independent of the source and destination of data.


The xform can be used with an core.async channel

!!! EXAMPLE "Transducer with core.async"
    ```clojure
    (chan 1 xform)
    ```

> an optional arg when creating a channel, causing a transform to be applied to all data that goes through the channel


## Database queries

Typical database access involves passing in functions to transform rows and process the transformed result set

`java.jdbc` 0.7.0-beta1 onwards can also apply transducers to “reducible queries” (and reducible result sets).

Create a **reducible query** which is passed to transforming function, e.g. reducers, transducers, plain ol’ `reduce` and `into` etc 


## Simplified description

Transducers are recipes what to do with a sequence of data without knowledge what the underlying sequence is (how to do it). It can be any seq, async channel or maybe observable.

They are composable and polymorphic.

The benefit is, you don't have to implement all standard combinators every time new data source is added. Again and again. As resulting effect you as user are able to reuse those recipes on different data sources.

> <https://stackoverflow.com/questions/26317325/can-someone-explain-clojure-transducers-to-me-in-simple-terms>



??? WARNING "Work In Progress, sorry"
    A very messy brain dump of ideas to tidy up. Pull requests are welcome


Clojure.core functions such as map and filter are lazy, however they also generate containers for lazy values when chained together. 

Without holding onto the head of the collection, large lazy sequences aren't created but intermediate abstractions are still created for each lazy element.


## Reducing functions

Reducing functions are those that take two arguments: 

 - a result so far 
 - an input. 

The reducing function returns a new result (so far). 

For example +: With two arguments, you can think of the first as the result so far and the second as the input.

A transducer could now take the + function and make it a twice-plus function (doubles every input before adding it). This is how that transducer would look like (in most basic terms):

!!! EXAMPLE "Reducing function"
    ```clojure
    (defn double
      [rfn]
      (fn [r i]
        (rfn r (* 2 i))))
    ```

For illustration substitute rfn with + to see how + is transformed into twice-plus:

!!! EXAMPLE "Reducing function - twice plus"
    ```clojure
    (def twice-plus ;; result of (double +)
      (fn [r i]
        (+ r (* 2 i))))

    (twice-plus 1 2)  ;-> 5
    (= (twice-plus 1 2) ((double +) 1 2)) ;-> true
    ```

Calling the reducing function

```clojure
(reduce (double +) 0 [1 2 3])

;; => 12
```

Reducing functions returned by transducers are independent of how the result is accumulated because they accumulate with the reducing function passed to them. 

`conj` takes a collection and a value and returns a new collection with that value appended.

```clojure
(reduce (double conj) [] [1 2 3])
;; => [2 4 6]
```

Transducers are independent of the kind of data is passed.

optimisation goes beyond eliminating intermediate streams; it is possible to perform operations in parallel.


### pmap 

Use `pmap` when mapping an expensive function over a sequence, making the operation parallel.  No other changes to the code are required. 

Transducers will still be faster if the pmap function creates intermedicate data structures.



A transducer clear definition is here:

Transducers are a powerful and composable way to build algorithmic transformations that you can reuse in many contexts.

## Reducing functions

!!! EXAMPLE "Population a local Village"
    The 
    ```clojure
    (def village
      [{:home :north :family "smith" :name "sue" :age 37 :sex :f :role :parent}
       {:home :north :family "smith" :name "stan" :age 35 :sex :m :role :parent}
       {:home :north :family "smith" :name "simon" :age 7 :sex :m :role :child}
       {:home :north :family "smith" :name "sadie" :age 5 :sex :f :role :child}

       {:home :south :family "jones" :name "jill" :age 45 :sex :f :role :parent}
       {:home :south :family "jones" :name "jeff" :age 45 :sex :m :role :parent}
       {:home :south :family "jones" :name "jackie" :age 19 :sex :f :role :child}
       {:home :south :family "jones" :name "jason" :age 16 :sex :f :role :child}
       {:home :south :family "jones" :name "june" :age 14 :sex :f :role :child}

       {:home :west :family "brown" :name "billie" :age 55 :sex :f :role :parent}
       {:home :west :family "brown" :name "brian" :age 23 :sex :m :role :child}
       {:home :west :family "brown" :name "bettie" :age 29 :sex :f :role :child}

       {:home :east :family "williams" :name "walter" :age 23 :sex :m :role :parent}
       {:home :east :family "williams" :name "wanda" :age 3 :sex :f :role :child}])
    ```

    Define a reducing expression to return the number of children in the village.

    ```clojure
    (def children 
      (r/map #(if (= :child (:role %)) 1 0)))
    ```

    Call the expression
    ```clojure
    (r/reduce + 0 (children village))
    ;;=> 8
    ```

Using a transducer to add up all the mapped values

 create the transducers using the new arity for map that takes the function, no collection

```clojure
(def child-numbers (map #(if (= :child (:role %)) 1 0)))
```

Use transduce (c.f r/reduce) with the transducer to get the answer
```clojure
(transduce child-numbers + 0 village)
;;=> 8
```

It is really powerful when taking subgroups in account, e.g to know how many children in the Brown Family

!!! EXAMPLE "Reducer to count children in Brown family"

    Create the reducer to select members of the Brown family

    ```clojure
    (def brown-family-children
      (r/filter #(= "brown" (string/lower-case (:family %)))))
    ```

    compose a composite function to select the Brown family and map children to 1

    ```clojure
    (def count-brown-family-children 
      (comp ex1a-map-children-to-value-1 brown-family-children))
    ```

    reduce to add up all the Brown children
    ```clojure
    (r/reduce + 0 (ex2a-count-brown-family-children village))
    ;;=> 2
    ```


## References

[Transducers - Clojure next big idea](https://bendyworks.com/transducers-clojures-next-big-idea/){target=_blank .md-button}

