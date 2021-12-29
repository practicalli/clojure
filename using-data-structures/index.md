# Using data structures

Data structures in Clojure are used to model information and data, within a particular namespace.  Functions are used to run behaviour over the data structures.

Lets look at some of the common functions that are used in Clojure with data structures





> **fixme** the below content is work in progress, sorry.


# Managing Return values

  If you run a function over a data structure, you may not always get back the type of value you want.  It easy to wrap a function around to give you the desired value type.

> **Note** Use the `str` function to get a string from person, rather than a set of characters

```clojure
(first person)
(rest person)

(str (first person))

;; How do we return the rest of the string as a string ?
(str (rest person))
(map str (rest person))
(str (map str (rest person)))
(apply str (rest person))
```

You can get the value of this map

```
(def luke {:name "Luke Skywalker" :skill "Targeting Swamp Rats"})
(def darth {:name "Darth Vader"    :skill "Crank phone calls"})
(def jarjar {:name "JarJar Binks"   :skill "Upsetting a generation of fans"})

(get luke :skill)
```




## Immutability

When you use functions on data structures, although they can return a new value they do not change the original data structure.

Lets define a name for a data structure

```
(def name1 [1 2 3 4])
```

when we evaluate that name we get the original data we set

```
name1
```

Now we use a function called conj to adds (conjoin) another number to our data structure

```
(conj name1 5)
```

This returns a new value without changing the original data structre

```
name1
```

We cant change the original data structure, it is immutable.  Once it is set it cant be changed. However, if we give a name to the resultl of changing the original data structure, we can refer to that new data structure

```
(def name2(conj name1 5))
```

Now name2 is the new data structure, but name1 remains unchanged

```
name2
name1
```

So we cannot change the data structure, however we can achieve something that looks like we have changed it.  We can re-assign the original name to the result of changing the original data structure

```
(def name2(conj name1 5))
```

Now name1 and name2 are the same result

```
name2
name1
```

> **Hint** An analogy (thanks to Chris Ford) 

> You have the number 2.  If you add 1 to 2, what value is the number 2?
> The number 2 is still 2 no mater that you add 1 to it, however, you get the value 3 in return


# Creating new data structures

Use concat to add lists or vectors together

```
(concat [1 2] '(3 4)) ; => (1 2 3 4)
```

Use filter, map to interact with collections

```
(map inc [1 2 3]) ; => (2 3 4)
(filter even? [1 2 3]) ; => (2)
```

Use reduce to reduce them

```
(reduce + [1 2 3 4])
; = (+ (+ (+ 1 2) 3) 4)
; => 10
```

Reduce can take an initial-value argument too

```
(reduce conj [] '(3 2 1))
; = (conj (conj (conj [] 3) 2) 1)
; => [3 2 1]
```



Use cons to add an item to the beginning of a list or vector

```
(cons 4 [1 2 3]) ; => (4 1 2 3)
(cons 4 '(1 2 3)) ; => (4 1 2 3)
```

Use conj to add an item to the beginning of a list, or the end of a vector

```
(conj [1 2 3] 4) ; => [1 2 3 4]
(conj '(1 2 3) 4) ; => (4 1 2 3)
```
