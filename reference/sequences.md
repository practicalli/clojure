# Reference: Clojure from the ground up: sequences

In Chapter 3, we discovered functions as a way to abstract expressions; to rephrase a particular computation with some parts missing. We used functions to transform a single value. But what if we want to apply a function to more than one value at once? What about sequences?

For example, we know that (inc 2) increments the number 2. What if we wanted to increment every number in the vector [1 2 3], producing [2 3 4]?

user=> (inc [1 2 3])
ClassCastException clojure.lang.PersistentVector cannot be cast to java.lang.Number  clojure.lang.Numbers.inc (Numbers.java:110)
Clearly inc can only work on numbers, not on vectors. We need a different kind of tool.

A direct approach
Let’s think about the problem in concrete terms. We want to increment each of three elements: the first, second, and third. We know how to get an element from a sequence by using nth, so let’s start with the first number, at index 0:

user=> (def numbers [1 2 3])
#'user/numbers
user=> (nth numbers 0)
1
user=> (inc (nth numbers 0))
2
So there’s the first element incremented. Now we can do the second:

user=> (inc (nth numbers 1))
3
user=> (inc (nth numbers 2))
4
And it should be straightforward to combine these into a vector…

user=> [(inc (nth numbers 0)) (inc (nth numbers 1)) (inc (nth numbers 2))]
[2 3 4]
Success! We’ve incremented each of the numbers in the list! How about a list with only two elements?

user=> (def numbers [1 2])
#'user/numbers
user=> [(inc (nth numbers 0)) (inc (nth numbers 1)) (inc (nth numbers 2))]

IndexOutOfBoundsException   clojure.lang.PersistentVector.arrayFor (PersistentVector.java:107)
Shoot. We tried to get the element at index 2, but couldn’t, because numbers only has indices 0 and 1. Clojure calls that “index out of bounds”.

We could just leave off the third expression in the vector; taking only elements 0 and 1. But the problem actually gets much worse, because we’d need to make this change every time we wanted to use a different sized vector. And what of a vector with 1000 elements? We’d need 1000 (inc (nth numbers ...)) expressions! Down this path lies madness.

Let’s back up a bit, and try a slightly smaller problem.

Recursion
What if we just incremented the first number in the vector? How would that work? We know that first finds the first element in a sequence, and rest finds all the remaining ones.

user=> (first [1 2 3])
1
user=> (rest [1 2 3])
(2 3)
So there’s the pieces we’d need. To glue them back together, we can use a function called cons, which says “make a list beginning with the first argument, followed by all the elements in the second argument”.

user=> (cons 1 [2])
(1 2)
user=> (cons 1 [2 3])
(1 2 3)
user=> (cons 1 [2 3 4])
(1 2 3 4)
OK so we can split up a sequence, increment the first part, and join them back together. Not so hard, right?

(defn inc-first [nums]
  (cons (inc (first nums))
        (rest nums)))
user=> (inc-first [1 2 3 4])
(2 2 3 4)
Hey, there we go! First element changed. Will it work with any length list?

user=> (inc-first [5])
(6)
user=> (inc-first [])

NullPointerException   clojure.lang.Numbers.ops (Numbers.java:942)
Shoot. We can’t increment the first element of this empty vector, because it doesn’t have a first element.

user=> (first [])
nil
user=> (inc nil)

NullPointerException   clojure.lang.Numbers.ops (Numbers.java:942)
So there are really two cases for this function. If there is a first element in nums, we’ll increment it as normal. If there’s no such element, we’ll return an empty list. To express this kind of conditional behavior, we’ll use a Clojure special form called if:

user=> (doc if)
-------------------------
if
  (if test then else?)
Special Form
  Evaluates test. If not the singular values nil or false,
  evaluates and yields then, otherwise, evaluates and yields else. If
  else is not supplied it defaults to nil.

  Please see http://clojure.org/special_forms#if
To confirm our intuition:

user=> (if true :a :b)
:a
user=> (if false :a :b)
:b
Seems straightforward enough.

(defn inc-first [nums]
  (if (first nums)
    ; If there's a first number, build a new list with cons
    (cons (inc (first nums))
          (rest nums))
    ; If there's no first number, just return an empty list
    (list)))

user=> (inc-first [])
()
user=> (inc-first [1 2 3])
(2 2 3)
Success! Now we can handle both cases: empty sequences, and sequences with things in them. Now how about incrementing that second number? Let’s stare at that code for a bit.

(rest nums)
Hang on. That list–(rest nums)–that’s a list of numbers too. What if we… used our inc-first function on that list, to increment its first number? Then we’d have incremented both the first and the second element.

(defn inc-more [nums]
  (if (first nums)
    (cons (inc (first nums))
          (inc-more (rest nums)))
    (list)))
user=> (inc-more [1 2 3 4])
(2 3 4 5)
Odd. That didn’t just increment the first two numbers. It incremented all the numbers. We fell into the complete solution entirely by accident. What happened here?

Well first we… yes, we got the number one, and incremented it. Then we stuck that onto (inc-first [2 3 4]), which got two, and incremented it. Then we stuck that two onto (inc-first [3 4]), which got three, and then we did the same for four. Only that time around, at the very end of the list, (rest [4]) would have been empty. So when we went to get the first number of the empty list, we took the second branch of the if, and returned the empty list.

Having reached the bottom of the function calls, so to speak, we zip back up the chain. We can imagine this function turning into a long string of cons calls, like so:

(cons 2 (cons 3 (cons 4 (cons 5 '()))))
(cons 2 (cons 3 (cons 4 '(5))))
(cons 2 (cons 3 '(4 5)))
(cons 2 '(3 4 5))
'(2 3 4 5)
This technique is called recursion, and it is a fundamental principle in working with collections, sequences, trees, or graphs… any problem which has small parts linked together. There are two key elements in a recursive program:

Some part of the problem which has a known solution
A relationship which connects one part of the problem to the next
Incrementing the elements of an empty list returns the empty list. This is our base case: the ground to build on. Our inductive case, also called the recurrence relation, is how we broke the problem up into incrementing the first number in the sequence, and incrementing all the numbers in the rest of the sequence. The if expression bound these two cases together into a single function; a function defined in terms of itself.

Once the initial step has been taken, every step can be taken.

user=> (inc-more [1 2 3 4 5 6 7 8 9 10 11 12])
(2 3 4 5 6 7 8 9 10 11 12 13)
This is the beauty of a recursive function; folding an unbounded stream of computation over and over, onto itself, until only a single step remains.

Generalizing from inc
We set out to increment every number in a vector, but nothing in our solution actually depended on inc. It just as well could have been dec, or str, or keyword. Let’s parameterize our inc-more function to use any transformation of its elements:

(defn transform-all [f xs]
  (if (first xs)
    (cons (f (first xs))
          (transform-all f (rest xs)))
    (list)))
Because we could be talking about any kind of sequence, not just numbers, we’ve named the sequence xs, and its first element x. We also take a function f as an argument, and that function will be applied to each x in turn. So not only can we increment numbers…

user=> (transform-all inc [1 2 3 4])
(2 3 4 5)
…but we can turn strings to keywords…

user=> (transform-all keyword ["bell" "hooks"])
(:bell :hooks)
…or wrap every element in a list:

user=> (transform-all list [:codex :book :manuscript])
((:codex) (:book) (:manuscript))
In short, this function expresses a sequence in which each element is some function applied to the corresponding element in the underlying sequence. This idea is so important that it has its own name, in mathematics, Clojure, and other languages. We call it map.

user=> (map inc [1 2 3 4])
(2 3 4 5)
You might remember maps as a datatype in Clojure, too–they’re dictionaries that relate keys to values.

{:year  1969
 :event "moon landing"}
The function map relates one sequence to another. The type map relates keys to values. There is a deep symmetry between the two: maps are usually sparse, and the relationships between keys and values may be arbitrarily complex. The map function, on the other hand, usually expresses the same type of relationship, applied to a series of elements in fixed order.

Building sequences
Recursion can do more than just map. We can use it to expand a single value into a sequence of values, each related by some function. For instance:

(defn expand [f x count]
  (if (pos? count)
    (cons x (expand f (f x) (dec count)))))
Our base case is x itself, followed by the sequence beginning with (f x). That sequence in turn expands to (f (f x)), and then (f (f (f x))), and so on. Each time we call expand, we count down by one using dec. Once the count is zero, the if returns nil, and evaluation stops. If we start with the number 0 and use inc as our function:

user=> user=> (expand inc 0 10)
(0 1 2 3 4 5 6 7 8 9)
Clojure has a more general form of this function, called iterate.

user=> (take 10 (iterate inc 0))
(0 1 2 3 4 5 6 7 8 9)
Since this sequence is infinitely long, we’re using take to select only the first 10 elements. We can construct more complex sequences by using more complex functions:

user=> (take 10 (iterate (fn [x] (if (odd? x) (+ 1 x) (/ x 2))) 10))
(10 5 6 3 4 2 1 2 1 2)
Or build up strings:

user=> (take 5 (iterate (fn [x] (str x "o")) "y"))
("y" "yo" "yoo" "yooo" "yoooo")
iterate is extremely handy for working with infinite sequences, and has some partners in crime. repeat, for instance, constructs a sequence where every element is the same.

user=> (take 10 (repeat :hi))
(:hi :hi :hi :hi :hi :hi :hi :hi :hi :hi)
user=> (repeat 3 :echo)
(:echo :echo :echo)
And its close relative repeatedly simply calls a function (f) to generate an infinite sequence of values, over and over again, without any relationship between elements. For an infinite sequence of random numbers:

user=> (rand)
0.9002678382322784
user=> (rand)
0.12375594203332863
user=> (take 3 (repeatedly rand))
(0.44442397843046755 0.33668691162169784 0.18244875487846746)
Notice that calling (rand) returns a different number each time. We say that rand is an impure function, because it cannot simply be replaced by the same value every time. It does something different each time it’s called.

There’s another very handy sequence function specifically for numbers: range, which generates a sequence of numbers between two points. (range n) gives n successive integers starting at 0. (range n m) returns integers from n to m-1. (range n m step) returns integers from n to m, but separated by step.

user=> (range 5)
(0 1 2 3 4)
user=> (range 2 10)
(2 3 4 5 6 7 8 9)
user=> (range 0 100 5)
(0 5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95)
To extend a sequence by repeating it forever, use cycle:

user=> (take 10 (cycle [1 2 3]))
(1 2 3 1 2 3 1 2 3 1)
Transforming sequences
Given a sequence, we often want to find a related sequence. map, for instance, applies a function to each element–but has a few more tricks up its sleeve.

user=> (map (fn [n vehicle] (str "I've got " n " " vehicle "s"))
         [0 200 9]
         ["car" "train" "kiteboard"])
("I've got 0 cars" "I've got 200 trains" "I've got 9 kiteboards")
If given multiple sequences, map calls its function with one element from each sequence in turn. So the first value will be (f 0 "car"), the second (f 200 "train"), and so on. Like a zipper, map folds together corresponding elements from multiple collections. To sum three vectors, column-wise:

user=> (map + [1 2 3]
              [4 5 6]
              [7 8 9])
(12 15 18)
If one sequence is bigger than another, map stops at the end of the smaller one. We can exploit this to combine finite and infinite sequences. For example, to number the elements in a vector:

user=> (map (fn [index element] (str index ". " element))
            (iterate inc 0)
            ["erlang" "ruby" "haskell"])
("0. erlang" "1. ruby" "2. haskell")
Transforming elements together with their indices is so common that Clojure has a special function for it: map-indexed:

user=> (map-indexed (fn [index element] (str index ". " element))
                    ["erlang" "ruby" "haskell"])
("0. erlang" "1. ruby" "2. haskell")
You can also tack one sequence onto the end of another, like so:

user=> (concat [1 2 3] [:a :b :c] [4 5 6])
(1 2 3 :a :b :c 4 5 6)
Another way to combine two sequences is to riffle them together, using interleave.

user=> (interleave [:a :b :c] [1 2 3])
(:a 1 :b 2 :c 3)
And if you want to insert a specific element between each successive pair in a sequence, try interpose:

user=> (interpose :and [1 2 3 4])
(1 :and 2 :and 3 :and 4)
To reverse a sequence, use reverse.

user=> (reverse [1 2 3])
(3 2 1)
user=> (reverse "woolf")
(\f \l \o \o \w)
Strings are sequences too! Each element of a string is a character, written \f. You can rejoin those characters into a string with apply str:

user=> (apply str (reverse "woolf"))
"floow"
…and break strings up into sequences of chars with seq.

user=> (seq "sato")
(\s \a \t \o)
To randomize the order of a sequence, use shuffle.

user=> (shuffle [1 2 3 4])
[3 1 2 4]
user=> (apply str (shuffle (seq "abracadabra")))
"acaadabrrab"
Subsequences
We’ve already seen take, which selects the first n elements. There’s also drop, which removes the first n elements.

user=> (range 10)
(0 1 2 3 4 5 6 7 8 9)
user=> (take 3 (range 10))
(0 1 2)
user=> (drop 3 (range 10))
(3 4 5 6 7 8 9)
And for slicing apart the other end of the sequence, we have take-last and drop-last:

user=> (take-last 3 (range 10))
(7 8 9)
user=> (drop-last 3 (range 10))
(0 1 2 3 4 5 6)
take-while and drop-while work just like take and drop, but use a function to decide when to cut.

user=> (take-while pos? [3 2 1 0 -1 -2 10])
(3 2 1)
In general, one can cut a sequence in twain by using split-at, and giving it a particular index. There’s also split-with, which uses a function to decide when to cut.

(split-at 4 (range 10))
[(0 1 2 3) (4 5 6 7 8 9)]
user=> (split-with number? [1 2 3 :mark 4 5 6 :mark 7])
[(1 2 3) (:mark 4 5 6 :mark 7)]
Notice that because indexes start at zero, sequence functions tend to have predictable numbers of elements. (split-at 4) yields four elements in the first collection, and ensures the second collection begins at index four. (range 10) has ten elements, corresponding to the first ten indices in a sequence. (range 3 5) has two (since 5 - 3 is two) elements. These choices simplify the definition of recursive functions as well.

We can select particular elements from a sequence by applying a function. To find all positive numbers in a list, use filter:

user=> (filter pos? [1 5 -4 -7 3 0])
(1 5 3)
filter looks at each element in turn, and includes it in the resulting sequence only if (f element) returns a truthy value. Its complement is remove, which only includes those elements where (f element) is false or nil.

user=> (remove string? [1 "turing" :apple])
(1 :apple)
Finally, one can group a sequence into chunks using partition, partition-all, or partition-by. For instance, one might group alternating values into pairs:

user=> (partition 2 [:cats 5 :bats 27 :crocodiles 0])
((:cats 5) (:bats 27) (:crocodiles 0))
Or separate a series of numbers into negative and positive runs:

(user=> (partition-by neg? [1 2 3 2 1 -1 -2 -3 -2 -1 1 2])
((1 2 3 2 1) (-1 -2 -3 -2 -1) (1 2))
Collapsing sequences
After transforming a sequence, we often want to collapse it in some way; to derive some smaller value. For instance, we might want the number of times each element appears in a sequence:

user=> (frequencies [:meow :mrrrow :meow :meow])
{:meow 3, :mrrrow 1}
Or to group elements by some function:

user=> (pprint (group-by :first [{:first "Li"    :last "Zhou"}
                                 {:first "Sarah" :last "Lee"}
                                 {:first "Sarah" :last "Dunn"}
                                 {:first "Li"    :last "O'Toole"}]))
{"Li"    [{:last "Zhou", :first "Li"}   {:last "O'Toole", :first "Li"}],
 "Sarah" [{:last "Lee", :first "Sarah"} {:last "Dunn", :first "Sarah"}]}
Here we’ve taken a sequence of people with first and last names, and used the :first keyword (which can act as a function!) to look up those first names. group-by used that function to produce a map of first names to lists of people–kind of like an index.

In general, we want to combine elements together in some way, using a function. Where map treated each element independently, reducing a sequence requires that we bring some information along. The most general way to collapse a sequence is reduce.

user=> (doc reduce)
-------------------------
clojure.core/reduce
([f coll] [f val coll])
  f should be a function of 2 arguments. If val is not supplied,
  returns the result of applying f to the first 2 items in coll, then
  applying f to that result and the 3rd item, etc. If coll contains no
  items, f must accept no arguments as well, and reduce returns the
  result of calling f with no arguments.  If coll has only 1 item, it
  is returned and f is not called.  If val is supplied, returns the
  result of applying f to val and the first item in coll, then
  applying f to that result and the 2nd item, etc. If coll contains no
  items, returns val and f is not called.
That’s a little complicated, so we’ll start small. We need a function, f, which combines successive elements of the sequence. (f state element) will return the state for the next invocation of f. As f moves along the sequence, it carries some changing state with it. The final state is the return value of reduce.

user=> (reduce + [1 2 3 4])
10
reduce begins by calling (+ 1 2), which yields the state 3. Then it calls (+ 3 3), which yields 6. Then (+ 6 4), which returns 10. We’ve taken a function over two elements, and used it to combine all the elements. Mathematically, we could write:

1 + 2 + 3 + 4
    3 + 3 + 4
        6 + 4
           10
So another way to look at reduce is like sticking a function between each pair of elements. To see the reducing process in action, we can use reductions, which returns a sequence of all the intermediate states.

user=> (reductions + [1 2 3 4])
(1 3 6 10)
Oftentimes we include a default state to start with. For instance, we could start with an empty set, and add each element to it as we go along:

user=> (reduce conj #{} [:a :b :b :b :a :a])
#{:a :b}
Reducing elements into a collection has its own name: into. We can conj [key value] vectors into a map, for instance, or build up a list:

user=> (into {} [[:a 2] [:b 3]])
{:a 2, :b 3}
user=> (into (list) [1 2 3 4])
(4 3 2 1)
Because elements added to a list appear at the beginning, not the end, this expression reverses the sequence. Vectors conj onto the end, so to emit the elements in order, using reduce, we might try:

user=> (reduce conj [] [1 2 3 4 5])
(reduce conj [] [1 2 3 4 5])
[1 2 3 4 5]
Which brings up an interesting thought: this looks an awful lot like map. All that’s missing is some kind of transformation applied to each element.

(defn my-map [f coll]
  (reduce (fn [output element]
            (conj output (f element)))
          []
          coll))
user=> (my-map inc [1 2 3 4])
[2 3 4 5]
Huh. map is just a special kind of reduce. What about, say, take-while?

(defn my-take-while [f coll]
  (reduce (fn [out elem]
            (if (f elem)
              (conj out elem)
              (reduced out)))
          []
          coll))
We’re using a special function here, reduced, to indicate that we’ve completed our reduction early and can skip the rest of the sequence.

user=> (my-take-while pos? [2 1 0 -1 0 1 2])
[2 1]
reduce really is the uberfunction over sequences. Almost any operation on a sequence can be expressed in terms of a reduce–though for various reasons, many of the Clojure sequence functions are not written this way. For instance, take-while is actually defined like so:

user=> (source take-while)
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
There’s a few new pieces here, but the structure is essentially the same as our initial attempt at writing map. When the predicate matches the first element, cons the first element onto take-while, applied to the rest of the sequence. That lazy-seq construct allows Clojure to compute this sequence as required, instead of right away. It defers execution to a later time.

Most of Clojure’s sequence functions are lazy. They don’t do anything until needed. For instance, we can increment every number from zero to infinity:

user=> (def infseq (map inc (iterate inc 0)))
#'user/infseq
user=> (realized? infseq)
false
That function returned immediately. Because it hasn’t done any work yet, we say the sequence is unrealized. It doesn’t increment any numbers at all until we ask for them:

user=> (take 10 infseq)
(1 2 3 4 5 6 7 8 9 10)
user=> (realized? infseq)
true
Lazy sequences also remember their contents, once evaluated, for faster access.

Putting it all together
We’ve seen how recursion generalizes a function over one thing into a function over many things, and discovered a rich landscape of recursive functions over sequences. Now let’s use our knowledge of sequences to solve a more complex problem: find the sum of the products of consecutive pairs of the first 1000 odd integers.

First, we’ll need the integers. We can start with 0, and work our way up to infinity. To save time printing an infinite number of integers, we’ll start with just the first 10.

user=> (take 10 (iterate inc 0))
(0 1 2 3 4 5 6 7 8 9)
Now we need to find only the ones which are odd. Remember, filter pares down a sequence to only those elements which pass a test.

user=> (take 10 (filter odd? (iterate inc 0)))
(1 3 5 7 9 11 13 15 17 19)
For consecutive pairs, we want to take [1 3 5 7 ...] and find a sequence like ([1 3] [3 5] [5 7] ...). That sounds like a job for partition:

user=> (take 3 (partition 2 (filter odd? (iterate inc 0))))
((1 3) (5 7) (9 11))
Not quite right–this gave us non-overlapping pairs, but we wanted overlapping ones too. A quick check of (doc partition) reveals the step parameter:

user=> (take 3 (partition 2 1 (filter odd? (iterate inc 0))))
((1 3) (3 5) (5 7))
Now we need to find the product for each pair. Given a pair, multiply the two pieces together… yes, that sounds like map:

user=> (take 3 (map (fn [pair] (* (first pair) (second pair)))
                    (partition 2 1 (filter odd? (iterate inc 0)))))
(3 15 35)
Getting a bit unwieldy, isn’t it? Only one final step: sum all those products. We’ll adjust the take to include the first 1000, not the first 3, elements.

user=> (reduce +
               (take 1000
                     (map (fn [pair] (* (first pair) (second pair)))
                          (partition 2 1
                                    (filter odd?
                                            (iterate inc 0)))))
1335333000
The sum of the first thousand products of consecutive pairs of the odd integers starting at 0. See how each part leads to the next? This expression looks a lot like the way we phrased the problem in English–but both English and Lisp expressions are sort of backwards, in a way. The part that happens first appears deepest, last, in the expression. In a chain of reasoning like this, it’d be nicer to write it in order.

user=> (->> 0
            (iterate inc)
            (filter odd?)
            (partition 2 1)
            (map (fn [pair]
                   (* (first pair) (second pair))))
            (take 1000)
            (reduce +))
1335333000
Much easier to read: now everything flows in order, from top to bottom, and we’ve flattened out the deeply nested expressions into a single level. This is how object-oriented languages structure their expressions: as a chain of function invocations, each acting on the previous value.

But how is this possible? Which expression gets evaluated first? (take 1000) isn’t even a valid call–where’s its second argument? How are any of these forms evaluated?

What kind of arcane function is ->>?

All these mysteries, and more, in Chapter 5: Macros.

Problems
Write a function to find out if a string is a palindrome–that is, if it looks the same forwards and backwards.
Find the number of ‘c’s in “abracadabra”.
Write your own version of filter.
Find the first 100 prime numbers: 2, 3, 5, 7, 11, 13, 17, ….

