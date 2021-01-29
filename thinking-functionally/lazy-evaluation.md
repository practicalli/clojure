# Lazy Evaluation

> **Fixme** work in progress

In the most basic way possible, laziness is the ability to evaluate an expression only when it's actually needed.  Taken further, laziness is also evaluating an expression only to the extent required.



# Laziness in definition




# Laziness in evaluation



# Laziness in partial evaluation



Clojure is not entirely lazy, only the majority of sequence operations like map, reduce, filter or repeatedly are lazy evaluated.

The most common use of laziness are infinite lists or streams. For example, we could define a list of all prime numbers. In case you didn't know, that's a lot of prime numbers (infinitely many).

If we would define such list in a language like C++ or Python then the language would try to calculate all prime numbers immediately, which would run literally forever.

If we define such list in Haskell or Clojure, then nothing is calculated just yet. As a matter of fact we could happily print out the first 1000 prime numbers from that list without running into a problem. Again, because lazy evaluation only calculates what is really needed, and nothing more.




# Laziness in number calculation - Ratio type

Dividing an integer value by another results in a Ratio type if the result would otherwise result in a decimal number.  Clojure only partially evaluates this expression.

```clojure
(/ 22 7)
```

We can also just express a value as a ratio.  This works because of the prefix notation of Clojure

```clojure
22/7
```

The laziness can be overridden by specifying a precision, eg coercing the result into a specific type

```clojure
(/  22 7.0)
(double (/ 22 7))
(float (/ 22 7))
```

# Making something lazy 

The `range` function returns a sequence of numbers limited by any arguments given when calling the range function.

Calling the range function without arguments will force an infinite sequence of numbers to be generated, quickly resulting in an out of memory error in the heap.

Instead, we can either pass arguments to the range function that limit the sequence size or wrap the range function in another function

```clojure
(take 7 (range))
```

The `take` function defines how much of a sequence that `range` should generate.  So we can call range without arguments and it will generate only those numbers in the sequence as specified by `take`.



# References
* [Being lazy in Clojure](http://noobtuts.com/clojure/being-lazy-in-clojure) - lazily generating monsters
