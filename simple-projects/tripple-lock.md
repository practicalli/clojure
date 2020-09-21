## Triple Lock

> #### TODO::work in progress, sorry

You have just bought a new safe too keep all the richest you will gain from becoming a Clojure developer (hopefully).  The safe has a 3 combination lock to protect your new found wealth, but just how safe is the safe?

## Create a new Clojure project
Use [Clojure CLI tools and clj-new](/clojure-tools/install/install-clojure.html#clojure-cli-tools-common-aliases) to create a new Clojure project.

```shell
clojure -A:new app practicalli/triple-lock
```

## Designing the combination lock
Lets consider how we would create such a combination lock in Clojure.

- The combination is managed by three tumbler wheels
- Each tumbler wheel has the same range of numbers on then, 0 to 9

Each tumbler wheel could have all the numbers it contains within a _Collection_ in Clojure.  The simplest approach would be to put the numbers 0 to 9 into a Vector (an array-like collection).

```eval-clojure
[0 1 2 3 4 5 6 7 8 9]
```

As the numbers on the tumbler wheel are just a range between 0 and 9, then rather than type out all the numbers we can use the `range` function to generate all the numbers for us.

When we give the range function one argument, it will create all the whole numbers from 0 to the number before that of the argument.  In the following example, we give `range` the argument of 10 and we receive the numbers from 0 to 9.

```eval-clojure
(range 10)
```

You can also give `range` two arguments, such as '(range 5 15)'.

> Be careful not to call the `range` function by itself, or it will try and generate an infinite range of numbers (until your computer memory is all used up).


## Create all the Combinations
**Complete the following code (replacing the ,,,) to generate all the possible combinations of the lock**

```eval-clojure
(for [tumbler-1 (range 10)
      ,,,     ,,,
      ,,,     ,,,]
 [tumbler-1 ,,,   ,,,])
```

Instead of showing all the possible combinations, count all the combinations and return the total number of combinations

**Take the code from the combinations and wrap it in the count function**

```eval-clojure
;; now count the possible combinations
(count

         )
```

To make our lock harder to break into, we should only allow the combinations where each tumbler wheel has a different number.  So you cannot have combinations like 1-1-1, 1-2-2, 1-2-1, etc.

How many combinations does that give us?

**Complete the following code to create a 3-tumbler wheel combination lock, where none of the numbers are the same**

> Hint: Beware not to enter (range) without an argument as Clojure may try and evaluate infinity

```eval-clojure
(count (for [tumbler-1 (range 10)
             ,,,     ,,,
             ,,,     ,,,
             :when (or (= tumbler-1 tumbler-2)
                       ,,,
                       ,,,)]
         [tumbler-1 ,,,   ,,,]))
```

Here is a [suggested example](https://gist.github.com/ab1f8d4561cc2b8b3e51887dd2519a18) of the completed 3-lock challenges.
