# Lazy Sequences

Sequences are an interface for logical lists, which can be lazy.  "Lazy" means that a sequence can define an infinite series, like so:

```
(range 4)
```

If you evaluate `(range)` just by itself it will return an infinite number of integers, well at least until your computers memory space fills up.

So we dont blow up our memory and just get the values we want we can use `range` in conjunction with other functions that define how many numbers we actually want.

For example, if we just wanted the first four numbers from the infinite sequence of `range` we could specify that with the `take` function

```
(take 4 (range)) ;  (0 1 2 3)
```

Here the range function is being lazy, because it will only generate the first 4 numbers in its sequence.

Clojure (and Lisps in general) often evaluate at the last possible moment, usually when they have been given more specific content.
