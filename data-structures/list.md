# List

  The list is used extensively in Clojure, it is a List (List Processing) language after all.  The unique thing about lists is that the first element is always evaluated as a function call, therefore lists are most commonly used for defining and calling functions.
  
  Lists are sometimes used as a data structure and have a sequential lookup time.  A list can hold any valid types of data, from numbers and strings to other data structures such as vectors, maps and sets.  Types can be mix as Clojure will dynamically type each element as its evaluated.

  Its more common to use vectors and maps which typically offer quicker access as they can be looked up via an index or key.

> **Note** Explore the list data structure and discover which line of code fails.  Try work out why that line of code fails.

```clojure
(list 1 2 3 4)
(list -1 -0.234 0 1.3 8/5 3.1415926)
(list "cat" "dog" "rabit" "fish")
(list :cat 1 "fish" 22/7 (str "fish" "n" "chips"))
(list 1 2 "three" [4] five '(6 7 8 9))
(list )

( 1 2 3 4)

(quote (1 2 3 4))
'(1 2 3 4)

;; Duplicate elements in a list ?
(list 1 2 3 4 1)
(list "one" "two" "one")
(list :fred :barney :fred)
```

> **Comment** As you read about the List data structure, remember that the first element of a list is evaluated as a function call. 

We can create a list using the `list` function

```clojure
(list 1 2 3 4)
```

This evaluates to `(1 2 3 4)`

We can give this result a name 

```clojure
(def my-list (list 1 2 3 4))
```

Then when we evaluate `my-list` it will return the list as a result

However, if we create a list directly by using `(1 2 3 4)`, this will fail when evaluated as `1` is not a function.  So when we define a data structure as a list we need to use the `quote` function or ' syntax

```clojure
(quote (1 2 3 4))
'(1 2 3 4)
```


<!-- Clojure through code

;; one unique thing about lists is that the first element is always evaluated as a function call,
;; with the remaining elements as arguments.

;; So, defining a list just using () will cause an error

;; This list definition will fail, unless you have defined a function called 1
(1 2 3 4)  ;;fail

;; There is a special function called quote that tells Clojure to just treat the
;; list as data.

(quote (1 2 3 4))

;; This syntax is actually more code to type than (list 1 2 3 4),
;; so there is a shortcut for the quote function using the ' character

'(1 2 3 4)
'(-1 -0.234 0 1.3 8/5 3.1415926)
'("cat" "dog" "rabit" "fish")
'(:cat :dog :rabit :fish)
'(:cat 1 "fish" 22/7 (str "fish" "n" "chips"))

;; The quote shortcust is uses where ever you have a list that you want to treat just as data.
;; Another example is when you are including functions from other namespaces
;;(ns my-namespace.core
;;  use 'my-namespace.library)

 end of clojure through code -->


## Testing for a List

When is a list not a `list?`.  Lists are sometimes created as other types if they are created in ways other than using the `list` function.  If you want to know if something is list like, then you can use the `seq?` function.  If you test with the `list?` function and that returns false, you can use the `type` function to see what its real type is.

See more about the types that list-like structures actually are in the article: [What is a list? The ultimate predicate showdown](http://bytopia.org/2016/03/08/what-is-a-list/)

