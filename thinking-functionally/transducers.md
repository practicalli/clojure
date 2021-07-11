# Transducers

In Clojure everything is a value, as even a function is a value potential which returns that value when evaluated.

Transducers provide an efficient way to transform values which can be simple values, collections, core.async channels and java.jdbc (0.7.0 upwards).


> #### TODO::work in progress, sorry
> A very messy brain dump of ideas to tidy up.
> Pull requests are welcome


https://www.youtube.com/watch?v=WkHdqg_DBBs

### From slack - beginners channel

Transducers are a functional design to compose operations on data collections, whereby the operations you describe through your transducers, aren't applied each on the entire input collection as in normal plain clojure code, but rather every element in the collection gets acted upon by a composition of what you specify in your transducers. Meaning, the input collection gets walked only once!


Transducers provide an alternative way to act on data collections, which requires of you to stray from the plain clojure API you'd normally would, but brings along some benefits like lazy evaluation and/or different performance trade-offs.

In addition, some advantages in terms of affording greater modularity in applying transformations on  data, are mentioned in the linked SO question above ― although not really well elucidated in code examples there.

Using Transducers eliminates the need for intermediate structures.

[A walk through the basics of Transducers](http://eli.thegreenplace.net/2017/reducers-transducers-and-coreasync-in-clojure/)


Items coming from a collection are a common case with transducers, but a big motivation for making transducers was the ability to apply transformation directly to the source of data, without forcing it into a collection first (eg. a core.async channel or a network stream etc.)

the fact that you can chain transducing functions without intermediate collections comes from this - the context of another transducer is one of the data sources you can apply a transducer to

you can use (map f), as one example of a transducing function, directly on a channel

it's an optional arg when you create the channel, and causes that transform to be applied to all data that goes through the channel

channels are part of why transducers were added to Clojure. The Clojure maintainers discovered they were re-implementing filter, map, partition, etc. etc. on core.async and realized it would be better to have an abstraction for the transforms independent of the source and destination of data

As of `java.jdbc` 0.7.0-beta1, you can also apply transducers to “reducible queries” (and reducible result sets).

Instead of passing in functions to transform rows and process the transformed result set, you can now just create a “reducible query” and hand it off to anything that knows how to reduce it: reducers, transducers, plain ol’ `reduce` and `into` etc…




### from stackoverflow

https://stackoverflow.com/questions/26317325/can-someone-explain-clojure-transducers-to-me-in-simple-terms

Transducers are recipes what to do with a sequence of data without knowledge what the underlying sequence is (how to do it). It can be any seq, async channel or maybe observable.

They are composable and polymorphic.

The benefit is, you don't have to implement all standard combinators every time new data source is added. Again and again. As resulting effect you as user are able to reuse those recipes on different data sources.

Ad Update

Prior version 1.7 of Clojure you had three ways how to write dataflow queries:

nested calls
```clojure
(reduce + (filter odd? (map #(+ 2 %) (range 0 10))))
```

functional composition

```clojure
(def xform
  (comp
    (partial filter odd?)
    (partial map #(+ 2 %))))
  (reduce + (xform (range 0 10)))
```
threading macro

```clojure
    (defn xform [xs]
      (->> xs
           (map #(+ 2 %))
           (filter odd?)))
    (reduce + (xform (range 0 10)))
```

With transducers you will write it like:

```clojure
(def xform
  (comp
    (map #(+ 2 %))
    (filter odd?)))
(transduce xform + (range 0 10))
```
They all do the same. The difference is that you never call Transducers directly, you pass them to another function. Transducers know what to do, the function that gets transducer knows how. The order of combinators is like you write it with threading macro (natural order). Now you can reuse xform with channel:

```clojure
(chan 1 xform)
```



## Business case

Transducers seem to be a useful way of abstracting over various forms of iterable objects. These can be non-consumable, such as Clojure seqs, or consumable (such as async channels). In this respect, it seems to me you would benefit greatly from using transducers if, e.g., you switch from a seq-based implementation to a core.async implementation using channels. Transducers should allow you to keep the core of your logic unchanged. Using traditional sequence-based processing you would have to convert this to use either transducers or some core-async analog. That's the business case

Transducers improve efficiency, and allow you to write efficient code in a more modular way.

[Trivial examples of using Clojure Transducers](http://ianrumford.github.io/clojure/transducers/reducers/2014/08/08/Some-trivial-examples-of-using-Clojure-Transducers.html)

Compared to composing calls to the old map, filter, reduce etc. you get better performance because you don't need to build intermediate collections between each step, and repeatedly walk those collections.

Compared to reducers, or manually composing all your operations into a single expression, you get easier to use abstractions, better modularity and reuse of processing functions.

Just curious, you said above: "to build intermediate collections between each step". But doesn't "intermediate collections" sound like an anti-pattern? .NET offers lazy enumerables, Java offers lazy streams or Guava-driven iterables, lazy Haskell must have something lazy too. None of these requires map/reduce to use intermediate collections because all of them build an iterator chain. Where am I wrong here? – Lyubomyr Shaydariv Oct 11 '14 at 21:01
1
Clojure map and filter create intermediate collections when nested. – noisesmith Oct 11 '14 at 22:59
2
And at least regarding Clojure's version of laziness, the issue of laziness is orthogonal here. Yes, map and filter are lazy, the also generate containers for lazy values when you chain them. If you don't hold onto the head, you don't build up large lazy sequences that aren't needed, but you still build those intermediate abstractions for each lazy element. – noisesmith Oct 12 '14 at 0:59

An example woud be nice. – Zubair Oct 13 '14 at 6:56
2
@LyubomyrShaydariv By "intermediate collection", noisesmith doesn't mean "iterate/reify an entire collection, then iterate/reify another entire collection". He or she means that when you nest function calls that return sequentials, each function call results in the creation of a new sequential. The actual iteration still only happens once, but there is additional memory consumption and object allocation due to the nested sequentials



Transducers are a means of combination for reducing functions.

Example: Reducing functions are functions that take two arguments: A result so far and an input. They return a new result (so far). For example +: With two arguments, you can think of the first as the result so far and the second as the input.

A transducer could now take the + function and make it a twice-plus function (doubles every input before adding it). This is how that transducer would look like (in most basic terms):

(defn double
  [rfn]
  (fn [r i]
    (rfn r (* 2 i))))
For illustration substitute rfn with + to see how + is transformed into twice-plus:

(def twice-plus ;; result of (double +)
  (fn [r i]
    (+ r (* 2 i))))

(twice-plus 1 2)  ;-> 5
(= (twice-plus 1 2) ((double +) 1 2)) ;-> true
So

(reduce (double +) 0 [1 2 3])
would now yield 12.

Reducing functions returned by transducers are independent of how the result is accumulated because they accumulate with the reducing function passed to them, unknowingly how. Here we use conj instead of +. Conj takes a collection and a value and returns a new collection with that value appended.

(reduce (double conj) [] [1 2 3])
would yield [2 4 6]

They are also independent of what kind of source the input is.

Multiple transducers can be chained as a (chainable) recipe to transform reducing functions.

Update: Since there now is an official page about it, I highly recommend to read it: http://clojure.org/transducers



Say you want to use a series of functions to transform a stream of data. The Unix shell lets you do this kind of thing with the pipe operator, e.g.

cat /etc/passwd | tr '[:lower:]' '[:upper:]' | cut -d: -f1| grep R| wc -l
(The above command counts the number of users with the letter r in either upper- or lowercase in their username). This is implemented as a set of processes, each of which reads from the previous processes's output, so there are four intermediate streams. You could imagine a different implementation that composes the five commands into a single aggregate command, which would read from its input and write its output exactly once. If intermediate streams were expensive, and composition were cheap, that might be a good trade-off.

The same kind of thing holds for Clojure. There are multiple, concise ways to express a pipeline of transformations, but depending on how you do it, you can end up with intermediate streams passing from one function to the next. If you have a lot of data, it's faster to compose those functions into a single function. Transducers make it easy to do that. An earlier Clojure innovation, reducers, let you do that too, but with some restrictions. Transducers remove some of those restrictions.

So to answer your question, transducers won't necessarily make your code shorter or more understandable, but your code probably won't be longer or less understandable either, and if you're working with a lot of data, transducers can make your code faster.

https://bendyworks.com/transducers-clojures-next-big-idea/



Ah, so transducers are mostly a performance optimisation, is that what you are saying? – Zubair Oct 13 '14 at 9:10

@Zubair Yes, that's right. Note that the optimization goes beyond eliminating intermediate streams; you may also be able to perform operations in parallel. – user100464 Oct 14 '14 at 19:17

It's worth mentioning pmap, which doesn't seem to get enough attention. If you are mapping an expensive function over a sequence, making the operation parallel is as easy as adding "p". No need to change anything else in your code, and it's available now--not alpha, not beta. (If the function creates intermediate sequences, then transducers might be faster, I would guess.) – Mars Oct 30 '14 at 15:13



Rich Hickey gave a 'Transducers' talk at the Strange Loop 2014 conference (45 min).

He explains in simple way what transducers are, with real world examples - processing bags in an airport. He clearly separates the different aspects and contrasts them with the current approaches. Towards the end, he gives the rationale for their existence.

Video: https://www.youtube.com/watch?v=6mTbuzafcII




5
down vote
A transducer clear definition is here:

Transducers are a powerful and composable way to build algorithmic transformations that you can reuse in many contexts, and they’re coming to Clojure core and core.async.
To understand it, let's consider the following simple example:

;; The Families in the Village

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
What about it we want to know how many children are in the village? We can easily find it out with the following reducer:

;; Example 1a - using a reducer to add up all the mapped values

(def ex1a-map-children-to-value-1 (r/map #(if (= :child (:role %)) 1 0)))

(r/reduce + 0 (ex1a-map-children-to-value-1 village))
;;=>
8
Here is another way to do it:

;; Example 1b - using a transducer to add up all the mapped values

;; create the transducers using the new arity for map that
;; takes just the function, no collection

(def ex1b-map-children-to-value-1 (map #(if (= :child (:role %)) 1 0)))

;; now use transduce (c.f r/reduce) with the transducer to get the answer
(transduce ex1b-map-children-to-value-1 + 0 village)
;;=>
8
Besides, it is really powerful when taking subgroups in account as well. For instance, if we would like to know how many children are in Brown Family, we can execute:

;; Example 2a - using a reducer to count the children in the Brown family

;; create the reducer to select members of the Brown family
(def ex2a-select-brown-family (r/filter #(= "brown" (string/lower-case (:family %)))))

;; compose a composite function to select the Brown family and map children to 1
(def ex2a-count-brown-family-children (comp ex1a-map-children-to-value-1 ex2a-select-brown-family))

;; reduce to add up all the Brown children
(r/reduce + 0 (ex2a-count-brown-family-children village))
;;=>
2
I hope you can find helpful these examples. You can find more here

Hope it helps.

Clemencio Morales Lucas.
