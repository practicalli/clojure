# Mapping functions over data structures 

  Map allows you to work over one or more data sets, appying the function to each element of each of the data structures.  
  
  When the data structures are of equal size, then the same sized data structure is returned.

```clojure
(map + [1 2 3] [1 2 3])
;; => (2 4 6)
```

If one data structure is smaller, then the function is only applied up to the last element of the smallest data structure.

```clojure
(map + [1 2 3] [1 2])
;; => (2 4)

(map + [1 2 3] [1])
;; => (2)

(map + [1 2 3] [])
;; => ()

(map + [1 2 3])
;; => (1 2 3)
```

Lets look at another example.  Here we have a pre-defined Fibonacci sequence up to the first 12 values.

```clojure
(def fibonacci-sequence [1 2 3 5 8 13 21 34 55 89 144 278])
```

If we just want the first 10 values of the sequence, we can use the `take` function.

```clojure
(take 10 fibonacci-sequence)
;; => (1 2 3 5 8 13 21 34 55 89)
```

If we want a calculation using the values of the fibonacci-sequence then we can use `map` with a function.  In this case we are going to generate a range of Integer numbers from 0-9 using the function `range`.  That range of numbers is then multiplied element by element with the corresponding element in the fibonacci-sequence.

```clojure
(map * (range 10) fibonacci-sequence)
;; => (0 2 6 15 32 65 126 238 440 801)
```

  So, 
  - 0 times 1 is 0, 
  - 1, times 2 is 2, 
  - 2 times 3 is 6, etc.

If we evaluate the previous expression part by part, its easier to see what is going on.  First lets evaluate the `fibonacci-sequence`

```clojure
(map * (range 10) [1 2 3 5 8 13 21 34 55 89 144 278])
;; => (0 2 6 15 32 65 126 238 440 801)
```

Now lets evaluate the `(range 10)` function call

```clojure
(map * (0 1 2 3 4 5 6 7 8 9) [1 2 3 5 8 13 21 34 55 89 144 278])
;; => (0 2 6 15 32 65 126 238 440 801)
```
We can see the answer is the same, however by evaluating each part of the expression we get an exact view of what is going to happen with the `map` function.
