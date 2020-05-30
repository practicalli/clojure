# List Comprehension

In general terms, list comprehensions should:

* be distinct from (nested) for loops and the use of map & filter functions within the syntax of the language.
* return either a list or an iterator (an iterating being something that returns successive members of a collection, in order),

In Clojure, list comprehension is via the `for` function.  This is different to the for in other languages as you will see.

```
(for [number [1 2 3]] (* number 2))
```

The `for` function should be read as follows:

"for each number in the collection [1 2 3], apply the function (* number 2)"

Couldnt we just do this with map?  Yes, we could.

```
(map #(* % 2) [1 2 3])
```

So why do we need `for` function?  It really shows its value when you are working with multiple collections

```
(for [number [1 2 3]
      letter [:a :b :c]]
  (str number letter))
```

Again we could use `map` function for this as follows

```
(mapcat (fn [number] (map (fn [letter] (str number letter)))))
```

So with the `for` function we can do the same calculation with much easier code to reason about.

## Filtering results with predicates

With the `for` function we can add a filter on the results by using a predicate, to test if a condition is true or false.  Any values that meet the condition as true are returned, values that are false are ommitted.

```
(for [x (range 10) :when (odd? x)] x)

(for [x (range 10) :while (even? x)] x)
```

To do this kind of filtering with maps would be possible, however the code would be harder for humans to parse and understand.


> **Note** Create a 3-tumbler combination padlock, with each tumbler having a range of 0 to 9. Count the number of possible combinations.  Then add a predicate that filters out some of the combinations

<!--sec data-title="Reveal answer" data-id="answer001" data-collapse=true ces-->

Lets just model all the possible combinations

```
(for [tumbler-1 (range 10)
      tumbler-2 (range 10)
      tumbler-3 (range 10)]
 [tumbler-1 tumbler-2 tumbler-3])
```

Now lets count the combinations

```
(count (for [tumbler-1 (range 10)
             tumbler-2 (range 10)
             tumbler-3 (range 10)]
         [tumbler-1 tumbler-2 tumbler-3]))
```

Now add a predicate using `:when` to filter out the combinations that do not match.

```
(count (for [tumbler-1 (range 10)
             tumbler-2 (range 10)
             tumbler-3 (range 10)
             :when (or (= tumbler-1 tumbler-2)
                       (= tumbler-2 tumbler-3)
                       (= tumbler-3 tumbler-1))]
         [tumbler-1 tumbler-2 tumbler-3]))
```

<!--endsec-->


> **Note** Create a 2 character prefix for tickets, using capital letters from the English alphabet.  However, exclude I and O as they can be mistaken for numbers

<!--sec data-title="Reveal answer" data-id="answer002" data-collapse=true ces-->

Lets just model all the possible combinations

```
(for [letter-1 capital-letters
      letter-2 capital-letters
      :when (and (not (blacklisted letter-1))
                 (not (blacklisted letter-2)))]
  (str letter-1 letter-2))
```

<!--endsec-->


