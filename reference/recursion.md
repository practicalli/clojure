# Recursion

Recursion is a highly valuable tool in functional programming as it provides an idiomatic way of processing collections of data.


## normal recursion is more idiomatic

On average it tends to give you clearer, more functional code whereas loop/recur tens to push you more towards an imperative, iterative style.



## Recursive functions



> ####Warning::Recursion can hit the limit of your heap/stack and cause a ... exception


## Tail-call Optomisation with `recur`

Tail-call optomisation is where a part of memory is over-written by additional calls during recursive calls.  By using the same memory segment each time, then the memory footprint of your code does not increase.

> ####Info::
> Using the `recur` function as the last line of a `loop` or function will enable tail call optomisation.

Therefore `recur` is good choice for deeply nested recursion or when manipulating larger (non-lazy) data structures.

Without tail-call optomisation the code may otherwise cause a StackOverflow / Heap out of memory Error


## Fast

Using `loop` and `recur` it's one of the most efficient constructs in Clojure, match the speed of an equivalent for loop in Java code.


## Restrictions

you can only recur in tail position, you can't do mutual recursion between two different function etc.

Sometime it simply isn't possible to use loop/recur or it may require the contort of code to something very unmanageable to do so.

> ####Hint::Use recur once you have created a new recursive function
> By calling a recursive function by name rather than using `recur` can prevent your code from remaining in an infinite loop if you get a terminating condition wrong.  Without recur you memory space will be eaten up and your code will stop.
> Once your function is working correctly, then you can replace the call to itself with `recur`.



## Examples

Here are two examples using two different recursion approaches. What are the guidelines of usage of one over another?


This example recursively calls itself

```clojure
(defn take-while
  "Returns a lazy sequence of successive items from coll while
  (pred item) returns true. pred must be free of side-effects."
  {:added "1.0"
   :static true}
  [pred coll]
  (lazy-seq
   (when-let [s (seq coll)]
       (when (pred (first s))
         (cons (first s) (take-while pred (rest s)))))))
```

> ####Hint::
> The above example could not use `recur` instead of the recursive call to `take-while` as that call is not in the last position.
> The `cons` function is in the last position of this function.


This example uses `loop` and `recur` for recursively processing the collection.

```clojure
(defn take-last
  "Returns a seq of the last n items in coll.  Depending on the type
  of coll may be no better than linear time.  For vectors, see also subvec."
  {:added "1.1"
   :static true}
  [n coll]
  (loop [s (seq coll), lead (seq (drop n coll))]
    (if lead
      (recur (next s) (next lead))
      s)))
```



## Misc

The only one reason to use lazy-seq/lazy-cons mechanism is generating lazy sequences. If you don't need them then loop/recur should undoubtedly be used.
